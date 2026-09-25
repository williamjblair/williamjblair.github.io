import { useEffect, useRef, type RefObject } from "react";
import { useFinePointer, useInView, usePageVisible, useReducedMotion } from "../motion/hooks";

/*
Live starlight. A field has up to two zones: an open night above the painting (uniform, a little
denser near the zenith) and the painting itself, where stars appear only where the density mask
(scripts/build-art.py) says the watercolor is dark navy, so they thin out before the paper.

With `trace`, the same canvas carries connect-the-dots: as the pointer passes from star to star it
leaves hairline gold segments that fade away. With `emerge`, stars come out one at a time, the way
they do while your eyes adjust to the dark. All of it is decoration, hidden from assistive technology.
*/

type Zone = "night" | "paint";

type Star = {
  zone: Zone;
  u: number;
  v: number;
  radius: number;
  base: number;
  period: number;
  phase: number;
  depth: number;
  tint: string;
  lit: number;
  appear: number;
};

type Link = { a: number; b: number; born: number };

type StarFieldProps = {
  maskSrc: string;
  /** Element whose box is the painting; the mask maps onto it. */
  stageRef: RefObject<HTMLElement | null>;
  /** Optional open night above the painting. */
  nightRef?: RefObject<HTMLElement | null>;
  /** How far down the painting stars may appear, as a fraction of its height. */
  band: number;
  count: { wide: number; compact: number };
  /** Fraction of stars placed in the open night. */
  nightShare?: number;
  trace?: boolean;
  meteor?: boolean;
  emerge?: boolean;
  dimmed?: boolean;
  className?: string;
};

const LINK_LIFE = 3200;
const CAPTURE = 64;
const MAX_REACH = 190;
const REST_BREAK = 1100;
const TINTS = ["246 240 226", "246 240 226", "246 240 226", "222 230 246", "238 216 168"];

// Module scope so the single shooting star survives effect re-runs (tab switches, resizes).
let meteorShown = false;
const meteorAt = performance.now() + 20000 + Math.random() * 40000;

function seededRandom(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function placeStars(mask: ImageData, count: number, band: number, nightShare: number): Star[] {
  const random = seededRandom(1987);
  const stars: Star[] = [];
  const nightCount = Math.round(count * nightShare);

  const make = (zone: Zone, u: number, v: number): Star => {
    // Most stars are faint; a few carry the light.
    const magnitude = random() ** 2.4;
    return {
      zone,
      u,
      v,
      radius: 0.4 + magnitude * 1.1,
      base: 0.26 + magnitude * 0.64,
      period: 6000 + random() * 8000,
      phase: random() * Math.PI * 2,
      depth: 0.25 + random() * 0.75,
      tint: TINTS[Math.floor(random() * TINTS.length)],
      lit: 0,
      appear: 250 + random() ** 1.3 * 2600,
    };
  };

  for (let i = 0; i < nightCount; i += 1) {
    stars.push(make("night", random(), random()));
  }

  let guard = 0;
  while (stars.length < count && guard < count * 80) {
    guard += 1;
    const u = random();
    const v = random() * band;
    const mx = Math.min(mask.width - 1, Math.floor(u * mask.width));
    const my = Math.min(mask.height - 1, Math.floor(v * mask.height));
    const density = mask.data[(my * mask.width + mx) * 4] / 255;
    if (random() > density ** 1.6) continue;
    stars.push(make("paint", u, v));
  }
  return stars;
}

/** One soft glow per tint, drawn once and stamped per star; far cheaper than a gradient per frame. */
function makeGlowSprites(ratio: number) {
  const size = Math.ceil(24 * ratio);
  return Object.fromEntries(
    [...new Set(TINTS)].map((tint) => {
      const sprite = document.createElement("canvas");
      sprite.width = size;
      sprite.height = size;
      const context = sprite.getContext("2d");
      if (context) {
        const glow = context.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
        glow.addColorStop(0, `rgb(${tint} / 0.55)`);
        glow.addColorStop(0.35, `rgb(${tint} / 0.16)`);
        glow.addColorStop(1, `rgb(${tint} / 0)`);
        context.fillStyle = glow;
        context.fillRect(0, 0, size, size);
      }
      return [tint, sprite];
    }),
  ) as Record<string, HTMLCanvasElement>;
}

function loadMask(src: string): Promise<ImageData> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      const context = canvas.getContext("2d");
      if (!context) return reject(new Error("no 2d context"));
      context.drawImage(image, 0, 0);
      resolve(context.getImageData(0, 0, canvas.width, canvas.height));
    };
    image.onerror = reject;
    image.src = src;
  });
}

export default function StarField({
  maskSrc,
  stageRef,
  nightRef,
  band,
  count,
  nightShare = 0,
  trace = false,
  meteor: allowMeteor = false,
  emerge = false,
  dimmed = false,
  className = "star-field",
}: StarFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();
  const finePointer = useFinePointer();
  const visible = usePageVisible();
  const inView = useInView(canvasRef, "80px");
  const dimRef = useRef(dimmed);
  useEffect(() => {
    dimRef.current = dimmed;
  }, [dimmed]);

  const starsRef = useRef<Star[] | null>(null);
  const bornRef = useRef<number | null>(null);
  const running = !reduced && visible && inView;
  const { wide, compact } = count;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    let frame = 0;
    let cancelled = false;
    let width = 0;
    let height = 0;
    const layout = { nightHeight: 0, stageLeft: 0, stageTop: 0, stageWidth: 0, stageHeight: 0 };
    const links: Link[] = [];
    const pointer = { x: 0, y: 0, active: false, lastMove: 0, star: -1 };
    const parallax = { x: 0, y: 0 };
    let meteor: { start: number; x: number; y: number; angle: number; length: number } | null = null;
    let sprites: Record<string, HTMLCanvasElement> = {};
    let lastDraw = 0;

    const measure = () => {
      const rect = canvas.getBoundingClientRect();
      const stage = stageRef.current?.getBoundingClientRect();
      const night = nightRef?.current?.getBoundingClientRect();
      layout.nightHeight = night ? night.height : 0;
      if (stage) {
        layout.stageLeft = stage.left - rect.left;
        layout.stageTop = stage.top - rect.top;
        layout.stageWidth = stage.width;
        layout.stageHeight = stage.height;
      }
      return rect;
    };

    const resize = () => {
      const rect = measure();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      sprites = makeGlowSprites(ratio);
      if (!running) draw(performance.now());
    };

    const position = (star: Star) => {
      const x = star.zone === "night" ? star.u * width : layout.stageLeft + star.u * layout.stageWidth;
      const y = star.zone === "night" ? star.v * layout.nightHeight : layout.stageTop + star.v * layout.stageHeight;
      return { x: x + parallax.x * star.depth, y: y + parallax.y * star.depth };
    };

    const draw = (now: number) => {
      const stars = starsRef.current;
      context.clearRect(0, 0, width, height);
      if (!stars) return;
      const dim = dimRef.current ? 0.55 : 1;
      const born = bornRef.current ?? now;

      for (let i = links.length - 1; i >= 0; i -= 1) {
        const link = links[i];
        const age = now - link.born;
        if (age > LINK_LIFE) {
          links.splice(i, 1);
          continue;
        }
        const fadeIn = Math.min(1, age / 260);
        const fadeOut = 1 - Math.max(0, (age - 900) / (LINK_LIFE - 900));
        const a = position(stars[link.a]);
        const b = position(stars[link.b]);
        const reveal = Math.min(1, age / 420);
        context.strokeStyle = `rgb(214 180 108 / ${0.46 * fadeIn * fadeOut})`;
        context.lineWidth = 0.7;
        context.lineCap = "round";
        context.beginPath();
        context.moveTo(a.x, a.y);
        context.lineTo(a.x + (b.x - a.x) * reveal, a.y + (b.y - a.y) * reveal);
        context.stroke();
      }

      for (const star of stars) {
        const presence = emerge && running ? Math.min(1, Math.max(0, (now - born - star.appear) / 900)) : 1;
        if (presence <= 0) continue;
        const { x, y } = position(star);
        const wave = running ? 0.5 + 0.5 * Math.sin((now / star.period) * Math.PI * 2 + star.phase) : 0.7;
        star.lit = Math.max(0, star.lit - 0.012);
        const alpha = Math.min(1, (star.base * (0.45 + 0.55 * wave * wave) + star.lit * 0.6) * dim * presence);
        const radius = star.radius * (1 + star.lit * 0.6);
        const sprite = sprites[star.tint];
        if (sprite && (radius > 1.05 || star.lit > 0.05)) {
          const reach = radius * 5;
          context.globalAlpha = alpha;
          context.drawImage(sprite, x - reach, y - reach, reach * 2, reach * 2);
          context.globalAlpha = 1;
        }
        context.fillStyle = `rgb(${star.tint} / ${alpha})`;
        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.fill();
      }

      if (meteor) {
        const t = (now - meteor.start) / 900;
        if (t >= 1) {
          meteor = null;
        } else {
          const ease = 1 - (1 - t) ** 3;
          const headX = meteor.x + Math.cos(meteor.angle) * meteor.length * ease;
          const headY = meteor.y + Math.sin(meteor.angle) * meteor.length * ease;
          const tail = meteor.length * 0.28;
          const tailX = headX - Math.cos(meteor.angle) * tail;
          const tailY = headY - Math.sin(meteor.angle) * tail;
          const gradient = context.createLinearGradient(tailX, tailY, headX, headY);
          const fade = Math.sin(t * Math.PI);
          gradient.addColorStop(0, "rgb(246 240 226 / 0)");
          gradient.addColorStop(1, `rgb(246 240 226 / ${0.75 * fade})`);
          context.strokeStyle = gradient;
          context.lineWidth = 1;
          context.beginPath();
          context.moveTo(tailX, tailY);
          context.lineTo(headX, headY);
          context.stroke();
        }
      }
    };

    const tick = (now: number) => {
      if (cancelled) return;
      bornRef.current ??= now;
      // Ease the parallax toward the pointer; at most a few pixels.
      const targetX = pointer.active ? (pointer.x / width - 0.5) * -8 : 0;
      const targetY = pointer.active ? (pointer.y / height - 0.3) * -5 : 0;
      parallax.x += (targetX - parallax.x) * 0.04;
      parallax.y += (targetY - parallax.y) * 0.04;

      if (allowMeteor && !meteorShown && now > meteorAt) {
        meteorShown = true;
        const top = layout.nightHeight || height * 0.3;
        meteor = {
          start: now,
          x: width * (0.15 + Math.random() * 0.45),
          y: top * (0.08 + Math.random() * 0.3),
          angle: Math.PI * (0.12 + Math.random() * 0.1),
          length: Math.min(280, width * 0.2),
        };
      }

      if (pointer.star >= 0 && now - pointer.lastMove > REST_BREAK) pointer.star = -1;
      // Twinkling alone is slow enough for 30fps; emerging, tracing and the meteor get every frame.
      const emerging = emerge && now - (bornRef.current ?? now) < 3800;
      const busy = links.length > 0 || meteor !== null || pointer.active || emerging;
      if (busy || now - lastDraw >= 33) {
        lastDraw = now;
        draw(now);
      }
      frame = requestAnimationFrame(tick);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      pointer.active = y >= 0 && y <= rect.height && x >= 0 && x <= rect.width;
      pointer.x = x;
      pointer.y = y;
      const stars = starsRef.current;
      if (!pointer.active || !stars || !trace || !finePointer) return;
      const now = performance.now();
      pointer.lastMove = now;

      let nearest = -1;
      let best = CAPTURE;
      stars.forEach((star, index) => {
        const p = position(star);
        const distance = Math.hypot(p.x - x, p.y - y);
        if (distance < best) {
          best = distance;
          nearest = index;
        }
      });
      if (nearest < 0 || nearest === pointer.star) return;

      const previous = pointer.star;
      pointer.star = nearest;
      stars[nearest].lit = 1;
      if (previous < 0) return;
      const a = position(stars[previous]);
      const b = position(stars[nearest]);
      if (Math.hypot(a.x - b.x, a.y - b.y) > MAX_REACH) return;
      const degree = (index: number) => links.filter((link) => link.a === index || link.b === index).length;
      if (degree(previous) >= 3 || degree(nearest) >= 3) return;
      links.push({ a: previous, b: nearest, born: now });
    };

    const onPointerLeave = () => {
      pointer.active = false;
      pointer.star = -1;
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    if (stageRef.current) observer.observe(stageRef.current);

    loadMask(maskSrc)
      .then((mask) => {
        if (cancelled) return;
        if (!starsRef.current) {
          const isCompact = window.matchMedia("(max-width: 48rem)").matches;
          starsRef.current = placeStars(mask, isCompact ? compact : wide, band, nightShare);
        }
        resize();
      })
      .catch(() => undefined);

    if (running) {
      frame = requestAnimationFrame(tick);
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onPointerLeave);
    }

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [running, finePointer, maskSrc, stageRef, nightRef, band, wide, compact, nightShare, trace, allowMeteor, emerge]);

  return <canvas className={className} ref={canvasRef} aria-hidden="true" />;
}

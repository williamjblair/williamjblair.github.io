import { useEffect, useState, type RefObject } from "react";

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [query]);

  return matches;
}

export function useReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/** True for a mouse or trackpad, false for touch-first devices. */
export function useFinePointer(): boolean {
  return useMediaQuery("(hover: hover) and (pointer: fine)");
}

export function usePageVisible(): boolean {
  const [visible, setVisible] = useState(() => document.visibilityState === "visible");

  useEffect(() => {
    const update = () => setVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  return visible;
}

export function useInView(ref: RefObject<Element | null>, rootMargin = "0px"): boolean {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin });
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, rootMargin]);

  return inView;
}

const ARRIVAL_KEY = "wjb:arrived";

/**
 * Whether the homepage arrival sequence should play. It plays once per browser session,
 * and never when storage is unavailable, so a blocked store degrades to a still page.
 */
export function shouldPlayArrival(): boolean {
  try {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
    if (window.sessionStorage.getItem(ARRIVAL_KEY)) return false;
    window.sessionStorage.setItem(ARRIVAL_KEY, "1");
    return true;
  } catch {
    return false;
  }
}

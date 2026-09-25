"""Derive the published artwork from the masters in art-source/.

Run once after changing a master:  python3 scripts/build-art.py
Needs Pillow, cwebp and avifenc on PATH. Outputs land in public/artwork/.
"""

import io
import random
import subprocess
import tempfile
from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "art-source"
OUT = ROOT / "public" / "artwork"

# master path -> (published stem, widths)
PICTURES = {
    "homepage-sky-watercolor.png": ("homepage-sky", [768, 1536]),
    "constellations/constellations-hero-no-text.png": ("constellations/hero", [768, 1448]),
    "constellations/deep-field-watercolor.png": ("constellations/deep-field", [768, 1536]),
    "constellations/chi-chi-cottage-memory.png": ("constellations/cottage-memory", [768, 1536]),
    "constellations/victory-swim-watercolor.png": ("constellations/victory-swim", [640, 1254]),
    "constellations/borrowed-light-closing.png": ("constellations/borrowed-light", [768, 1536]),
}

OCEAN = "homepage-ocean-final.jpeg"
# The sailboat and its reflection in the ocean master, in master pixels.
BOAT_BOX = (1552, 64, 1664, 326)
BOAT_WATERLINE = 232
PATCH_SHIFT = -170
# The ocean master was painted on yellower paper than the site now uses; scale it onto the site paper.
MASTER_PAPER = (246, 237, 220)
SITE_PAPER = (242, 238, 230)


def encode(image: Image.Image, stem: str, width: int, *, webp_q: int = 80, avif_q: int = 58) -> None:
    target = OUT / f"{stem}-{width}"
    target.parent.mkdir(parents=True, exist_ok=True)
    resized = image if image.width == width else image.resize(
        (width, round(image.height * width / image.width)), Image.LANCZOS
    )
    with tempfile.NamedTemporaryFile(suffix=".png") as tmp:
        resized.save(tmp.name)
        subprocess.run(
            ["cwebp", "-quiet", "-q", str(webp_q), "-alpha_q", "90", "-m", "6", tmp.name, "-o", f"{target}.webp"],
            check=True,
        )
        subprocess.run(
            ["avifenc", "-q", str(avif_q), "--qalpha", "80", "-s", "4", "-j", "all", tmp.name, f"{target}.avif"],
            check=True,
            stdout=subprocess.DEVNULL,
        )


def split_boat(ocean: Image.Image) -> tuple[Image.Image, Image.Image, Image.Image]:
    """Return (plate without boat, boat layer, reflection layer)."""
    x0, y0, x1, y1 = BOAT_BOX
    plate = ocean.copy()
    patch = ocean.crop((x0 + PATCH_SHIFT, y0, x1 + PATCH_SHIFT, y1))

    # Feather the patch edges so the replaced strip has no seam.
    feather = 14
    mask = Image.new("L", patch.size, 255)
    px = mask.load()
    for x in range(patch.width):
        edge = min(x, patch.width - 1 - x)
        value = 255 if edge >= feather else round(255 * edge / feather)
        for y in range(patch.height):
            edge_y = min(y, patch.height - 1 - y)
            vy = 255 if edge_y >= feather else round(255 * edge_y / feather)
            px[x, y] = min(value, vy)
    plate.paste(patch, (x0, y0), mask)

    original = ocean.crop(BOAT_BOX).convert("RGB")
    background = plate.crop(BOAT_BOX).convert("RGB")
    layer = Image.new("RGBA", original.size)
    o, b, out = original.load(), background.load(), layer.load()
    threshold = 38.0
    for y in range(original.height):
        for x in range(original.width):
            orig = o[x, y]
            back = b[x, y]
            dist = sum((a - c) ** 2 for a, c in zip(orig, back)) ** 0.5
            alpha = max(0.0, min(1.0, (dist - 15) / threshold))
            if alpha <= 0:
                out[x, y] = (0, 0, 0, 0)
                continue
            color = tuple(
                max(0, min(255, round((oc - bc * (1 - alpha)) / alpha))) for oc, bc in zip(orig, back)
            )
            out[x, y] = (*color, round(alpha * 255))

    layer = layer.filter(ImageFilter.SMOOTH)
    split = BOAT_WATERLINE - y0
    boat = layer.crop((0, 0, layer.width, split))
    reflection = layer.crop((0, split, layer.width, layer.height))
    return plate, boat, reflection


def repaper(image: Image.Image) -> Image.Image:
    """Scale each channel so the master's paper lands exactly on the site paper."""
    scale = [site / master for site, master in zip(SITE_PAPER, MASTER_PAPER)]
    bands = list(image.split())
    for i in range(3):
        bands[i] = bands[i].point(lambda v, k=scale[i]: min(255, round(v * k)))
    return Image.merge(image.mode, bands)


def density_mask(sky: Image.Image, name: str) -> None:
    """A tiny grayscale map of where the painted sky is dark navy.

    StarField samples it to decide where live stars may appear.
    """
    rgba = sky.convert("RGBA").resize((96, 64), Image.LANCZOS)
    mask = Image.new("L", rgba.size)
    src, dst = rgba.load(), mask.load()
    for y in range(rgba.height):
        for x in range(rgba.width):
            r, g, b, a = src[x, y]
            luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255
            darkness = max(0.0, min(1.0, (0.62 - luminance) / 0.45))
            dst[x, y] = round(255 * darkness * (a / 255) ** 1.4)
    mask.save(OUT / name, optimize=True)


def serif(size: int, opsz: int) -> ImageFont.FreeTypeFont:
    """Source Serif 4 at a given optical size, from the woff2 the site ships."""
    from fontTools.ttLib import TTFont
    from fontTools.varLib import instancer

    font = TTFont(ROOT / "public" / "fonts" / "source-serif-4-latin-roman.woff2")
    font = instancer.instantiateVariableFont(font, {"opsz": opsz})
    font.flavor = None
    buffer = io.BytesIO()
    font.save(buffer)
    buffer.seek(0)
    return ImageFont.truetype(buffer, size)


def social_card() -> None:
    """1200 × 630 share image: the open night, the painting rising into it, the name in starlight."""
    width, height = 1200, 630
    card = Image.new("RGBA", (width, height))
    draw = ImageDraw.Draw(card)
    for y in range(height):
        t = y / height
        draw.line([(0, y), (width, y)], fill=tuple(round(a + (b - a) * t) for a, b in zip((4, 5, 10), (10, 11, 16))))

    sky = ImageEnhance.Color(Image.open(SRC / "homepage-sky-watercolor.png").convert("RGBA")).enhance(0.58)
    sky = sky.resize((width, round(sky.height * width / sky.width)), Image.LANCZOS)
    channel = sky.getchannel("A")
    alpha = channel.load()
    for y in range(min(220, sky.height)):
        for x in range(sky.width):
            alpha[x, y] = round(alpha[x, y] * (y / 220) ** 1.6)
    sky.putalpha(channel)
    card.alpha_composite(sky, (0, 230))

    stars = random.Random(7)
    for _ in range(140):
        x, y = stars.random() * width, stars.random() * 310
        r = stars.random() ** 3 * 1.6 + 0.4
        draw.ellipse([x - r, y - r, x + r, y + r], fill=(246, 240, 226, round(80 + stars.random() ** 2 * 170)))

    draw.text((96, 146), "William Blair", font=serif(96, 60), fill=(243, 236, 220, 255))
    draw.text((100, 272), "Science, poetry, and life.", font=serif(30, 24), fill=(228, 224, 214, 215))
    card.convert("RGB").save(ROOT / "public" / "og.jpg", quality=86, optimize=True, progressive=True)


def main() -> None:
    for master, (stem, widths) in PICTURES.items():
        image = Image.open(SRC / master)
        for width in widths:
            encode(image, stem, width)
        print("encoded", stem)

    density_mask(Image.open(SRC / "homepage-sky-watercolor.png"), "homepage-sky-density.png")
    density_mask(Image.open(SRC / "constellations/constellations-hero-no-text.png"), "constellations/hero-density.png")
    print("wrote density masks")

    ocean = repaper(Image.open(SRC / OCEAN).convert("RGB"))
    plate, boat, reflection = split_boat(ocean)
    for width in (1086, 2172):
        encode(plate, "homepage-ocean", width, webp_q=78, avif_q=56)
    scale_widths = {"homepage-boat": boat, "homepage-boat-reflection": reflection}
    for stem, layer in scale_widths.items():
        encode(layer, stem, layer.width, webp_q=86, avif_q=66)
    print("split boat", boat.size, reflection.size)

    sail = Image.open(SRC / "william-blair-sail.png")
    encode(sail, "william-blair-sail", 120, webp_q=90, avif_q=70)
    print("encoded sail mark")

    social_card()
    print("wrote social card")


if __name__ == "__main__":
    main()

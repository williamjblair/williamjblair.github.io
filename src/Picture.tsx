import type { ImgHTMLAttributes } from "react";

type PictureProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet"> & {
  /** Path without width or extension, e.g. "/artwork/homepage-sky". */
  stem: string;
  /** Encoded widths from scripts/build-art.py, smallest first. */
  widths: readonly number[];
  sizes: string;
};

/** AVIF with a WebP fallback, at every width scripts/build-art.py produced. */
export default function Picture({ stem, widths, sizes, alt = "", ...img }: PictureProps) {
  const set = (ext: string) => widths.map((w) => `${stem}-${w}.${ext} ${w}w`).join(", ");
  const largest = widths[widths.length - 1];

  return (
    <picture>
      <source type="image/avif" srcSet={set("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={set("webp")} sizes={sizes} />
      <img src={`${stem}-${largest}.webp`} alt={alt} {...img} />
    </picture>
  );
}

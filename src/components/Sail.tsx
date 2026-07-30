import clsx from 'clsx'

/* The sail, transcribed exactly from packages/brand/marks/source/vela-symbol-full.svg
   in the vela-web workspace. Per docs/WEB.md there: do not redraw or reinterpret
   it. Only the two brand hexes are swapped for currentColor and the gold token,
   so the mark inherits the masthead's ink. If the master ever changes, this must
   be re-transcribed. */
export function Sail({
  size = 36,
  className,
}: {
  size?: number
  className?: string
}) {
  return (
    <svg
      viewBox="0 0 1000 800"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={clsx('block flex-none overflow-visible', className)}
      style={{ width: size, height: Math.round(size * 0.8) }}
    >
      <path
        fill="currentColor"
        d="M80 650 C300 646 560 610 800 82 C742 286 638 506 520 650 Z"
      />
      <path
        fill="currentColor"
        d="M520 650 C628 590 724 392 800 82 C770 322 734 516 690 650 Z"
      />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="12"
        d="M818 116 L818 650"
      />
      <path
        stroke="var(--color-teal-500)"
        strokeLinecap="round"
        strokeWidth="12"
        d="M65 657 C320 651 585 623 915 670"
      />
    </svg>
  )
}

import type { ReactNode } from "react";
import Picture from "../Picture";

export function SailHomeLink() {
  return (
    <a className="sail-home" href="/" aria-label="Back to home">
      <Picture stem="/artwork/william-blair-sail" widths={[120]} sizes="2.85rem" width="120" height="96" />
    </a>
  );
}

export function InteriorShell({ children }: { children: ReactNode }) {
  return (
    <div className="interior-shell">
      <SailHomeLink />
      {children}
    </div>
  );
}

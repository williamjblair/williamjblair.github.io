import Picture from "../Picture";
import { InteriorShell } from "./Shell";

export default function NotFound() {
  return (
    <InteriorShell>
      <main className="not-found">
        <h1>Nothing is charted here.</h1>
        <p>
          <a className="brush-link" href="/">Return home</a>
        </p>
      </main>
      <div className="not-found__sea" aria-hidden="true">
        <Picture stem="/artwork/homepage-ocean" widths={[1086, 2172]} sizes="max(100vw, 96rem)" width="2172" height="424" />
      </div>
    </InteriorShell>
  );
}

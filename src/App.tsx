import ConstellationsEssay from "./ConstellationsEssay";
import Home from "./home/Home";
import CvPage from "./shell/CvPage";
import NotFound from "./shell/NotFound";
import { InteriorShell } from "./shell/Shell";

export default function App() {
  const pathname = window.location.pathname.replace(/\/+$/, "");

  if (pathname === "/cv") {
    document.title = "CV — William Blair";
    return <CvPage />;
  }
  if (pathname === "/constellations-of-borrowed-light") {
    document.title = "Constellations of Borrowed Light — William Blair";
    return (
      <InteriorShell>
        <ConstellationsEssay />
      </InteriorShell>
    );
  }

  if (pathname === "") {
    document.title = "William Blair";
    return <Home />;
  }

  document.title = "Not found — William Blair";
  return <NotFound />;
}

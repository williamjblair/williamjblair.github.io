import ConstellationsEssay from "./ConstellationsEssay";
import Home from "./home/Home";
import AboutPage from "./about/AboutPage";
import NotFound from "./shell/NotFound";
import { InteriorShell } from "./shell/Shell";

export default function App() {
  const pathname = window.location.pathname.replace(/\/+$/, "");

  if (pathname === "/cv") {
    // The CV became the About page; the PDF is offered at its foot.
    window.location.replace("/about/");
    return null;
  }
  if (pathname === "/about") {
    document.title = "How I got here — William Blair";
    return <AboutPage />;
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

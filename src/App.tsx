import { useEffect, type ReactNode } from "react";
import ConstellationsEssay from "./ConstellationsEssay";
import Home from "./home/Home";
import AboutPage from "./about/AboutPage";
import NotFound from "./shell/NotFound";
import { InteriorShell } from "./shell/Shell";

type Route = { title: string; page: ReactNode; redirect?: string };

// Titles match scripts/postbuild.mjs, which also writes them into each route's static HTML.
function resolve(pathname: string): Route {
  switch (pathname) {
    case "":
      return { title: "William Blair", page: <Home /> };
    case "/about":
      return { title: "How I got here — William Blair", page: <AboutPage /> };
    case "/constellations-of-borrowed-light":
      return {
        title: "Constellations of Borrowed Light — William Blair",
        page: (
          <InteriorShell>
            <ConstellationsEssay />
          </InteriorShell>
        ),
      };
    case "/cv":
      // The CV became the About page. index.html normally leaves before React runs; this is the fallback.
      return { title: "William Blair", page: null, redirect: "/about/" };
    default:
      return { title: "Not found — William Blair", page: <NotFound /> };
  }
}

const route = resolve(window.location.pathname.replace(/\/+$/, ""));

export default function App() {
  useEffect(() => {
    document.title = route.title;
    if (route.redirect) window.location.replace(route.redirect);
  }, []);

  return route.page;
}

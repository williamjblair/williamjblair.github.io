import cvData from "../cv-data.json";
import { InteriorShell } from "./Shell";

type CvEntry = {
  title: string;
  date?: string;
  subtitle?: string;
  description?: string;
  href?: string;
};

type CvSection = {
  title: string;
  entries: CvEntry[];
};

export default function CvPage() {
  return (
    <InteriorShell>
      <main className="cv-page">
        <header className="cv-header">
          <h1 className="cv-header__title">CV</h1>
          <p className="cv-header__subtitle">{cvData.subtitle}</p>
          <nav className="cv-downloads" aria-label="Download CV">
            <span>Download CV</span>
            <a href="/downloads/William-Blair-CV.pdf" download>PDF <span aria-hidden="true">↓</span></a>
            <a href="/downloads/William-Blair-CV.docx" download>DOCX <span aria-hidden="true">↓</span></a>
          </nav>
        </header>

        <div className="cv-sections">
          {(cvData.sections as CvSection[]).map((section) => {
            const sectionId = `cv-${section.title.toLowerCase().replace(/[^a-z]+/g, "-")}`;
            return (
              <section className="cv-section" aria-labelledby={sectionId} key={section.title}>
                <h2 id={sectionId}>{section.title}</h2>
                <ul className="cv-entry-list">
                  {section.entries.map((entry) => (
                    <li className="cv-entry" key={`${entry.title}-${entry.date ?? ""}`}>
                      <div className="cv-entry__heading">
                        <h3>
                          {entry.href ? <a href={entry.href}>{entry.title}</a> : entry.title}
                        </h3>
                        {entry.date ? <span>{entry.date}</span> : null}
                      </div>
                      {entry.subtitle ? <p className="cv-entry__subtitle">{entry.subtitle}</p> : null}
                      {entry.description ? <p className="cv-entry__description">{entry.description}</p> : null}
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </main>
    </InteriorShell>
  );
}

import Image from "next/image";
import Link from "next/link";
import { LocationSection } from "@/components/location-section";
import { PageShell } from "@/components/page-shell";
import { ArrowLink, FactGrid, MediaPlaceholder, Note, SectionIndex } from "@/components/primitives";
import { getNextProject, type DevelopmentProject } from "@/lib/assets";
import { brand, localePath, ui, type SiteLocale } from "@/lib/site-data";

const copy = {
  ro: { back: "Dezvoltare", introIndex: "Proiect", factsIndex: "Date cheie", enquiryIndex: "Solicitare" },
  ru: { back: "Девелопмент", introIndex: "Проект", factsIndex: "Ключевые данные", enquiryIndex: "Запрос" },
  en: { back: "Development", introIndex: "Project", factsIndex: "Key facts", enquiryIndex: "Enquiry" },
} as const;

/** Development project / concept page. Image-led when photography exists, typographic otherwise. */
export function ProjectDetailPage({ locale, project }: { locale: SiteLocale; project: DevelopmentProject }) {
  const c = copy[locale];
  const next = getNextProject(project.slug);
  const p = (path: string) => localePath(locale, path);
  let section = 0;
  const no = () => String(++section).padStart(2, "0");

  return (
    <PageShell locale={locale} mainClassName="project">
      <section className={`project-hero${project.image ? "" : " project-hero--typographic"}`}>
        {project.image ? (
          <div className="project-hero__media" aria-hidden="true">
            <Image
              src={project.image}
              alt=""
              fill
              priority
              fetchPriority="high"
              sizes="100vw"
              className="project-hero__image"
              data-depth="28"
              style={{ objectPosition: "50% 62%" }}
            />
            <div className="project-hero__veil" />
          </div>
        ) : (
          <div className="project-hero__media" aria-hidden="true">
            <MediaPlaceholder title={project.place[locale]} note={project.status[locale]} compact />
          </div>
        )}
        <div className="shell project-hero__top">
          <Link href={p("/development")} className="back-link back-link--light">← {c.back}</Link>
          <span>{project.kind[locale]} / {project.place[locale]}</span>
        </div>
        <div className="shell project-hero__copy" data-reveal>
          <p className="eyebrow eyebrow--red">{project.status[locale]}</p>
          <h1>{project.name}</h1>
          <p className="project-hero__lead">{project.lead[locale]}</p>
        </div>
      </section>

      <section className="project-intro paper">
        <div className="shell">
          <SectionIndex no={no()}>{c.introIndex}</SectionIndex>
          <div className="copy-grid" data-reveal>
            <h2>
              {project.name}
              <br />
              <span className="muted-ink">{project.place[locale]}</span>
            </h2>
            <div>
              <p className="lead">{project.intro[locale]}</p>
              {project.disclaimer ? <Note>{project.disclaimer[locale]}</Note> : null}
            </div>
          </div>
          {project.facts.length ? (
            <div className="asset-detail__facts" data-reveal>
              <SectionIndex no={no()}>{c.factsIndex}</SectionIndex>
              <FactGrid facts={project.facts} locale={locale} />
            </div>
          ) : null}
        </div>
      </section>

      {project.location ? (
        <LocationSection
          locale={locale}
          no={no()}
          place={project.place[locale]}
          area={project.map ? project.map.address : project.place[locale]}
          text={project.location[locale]}
          points={project.connectivity}
          map={project.map}
        />
      ) : null}

      {project.sections.map((block, index) => (
        <section key={block.title.en} className={index % 2 === 0 ? "stages ink" : "stages paper stages--paper"}>
          <div className="shell">
            <SectionIndex no={no()} inverse={index % 2 === 0}>{block.title[locale]}</SectionIndex>
            <div className="stages__grid">
              <div className="stages__heading" data-reveal>
                <h2>{block.title[locale]}</h2>
                <p className="stages__text">{block.text[locale]}</p>
              </div>
              {block.items ? (
                <ol className="stages__list">
                  {block.items.map((item, i) => {
                    const [head, ...rest] = item[locale].split(" — ");
                    return (
                      <li key={item.en} data-reveal>
                        <span className="stages__no">0{i + 1}</span>
                        <div>
                          <h3>{head}</h3>
                          {rest.length ? <p>{rest.join(" — ")}</p> : null}
                        </div>
                      </li>
                    );
                  })}
                </ol>
              ) : null}
            </div>
          </div>
        </section>
      ))}

      {project.image ? (
        <section className="vatra-depth" aria-label={project.statement[locale]}>
          <div className="vatra-depth__media">
            <Image
              src={project.image}
              alt=""
              fill
              sizes="100vw"
              className="vatra-depth__image"
              data-depth="30"
              style={{ objectPosition: "50% 82%" }}
            />
            <div className="vatra-depth__veil" />
          </div>
          <div className="shell vatra-depth__content" data-reveal>
            <span className="label label--light">{brand.name} · {project.name}</span>
            <p>{project.statement[locale]}</p>
          </div>
        </section>
      ) : (
        <section className="statement ink">
          <div className="shell statement__inner" data-reveal>
            <span className="label label--light">{brand.name} · {project.name}</span>
            <p>{project.statement[locale]}</p>
            {project.disclaimer ? <Note light>{project.disclaimer[locale]}</Note> : null}
          </div>
        </section>
      )}

      <section className="enquiry paper enquiry--paper">
        <div className="shell">
          <SectionIndex no={no()}>{c.enquiryIndex}</SectionIndex>
          <div className="enquiry__grid" data-reveal>
            <h2>{project.name}</h2>
            <div className="enquiry__actions">
              <ArrowLink href={p("/contact")}>{ui.discussProject[locale]}</ArrowLink>
              <ArrowLink href={p("/development")}>{ui.backToDevelopment[locale]}</ArrowLink>
            </div>
          </div>
          <Link href={p(`/development/${next.slug}`)} className="next-asset" data-reveal>
            <span className="label">{ui.nextProject[locale]}</span>
            <span className="next-asset__name">{next.name}</span>
            <span className="next-asset__meta">{next.status[locale]} · {next.place[locale]}</span>
            <span className="next-asset__arrow" aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </PageShell>
  );
}

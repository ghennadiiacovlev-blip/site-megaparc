import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { ArrowLink, MediaPlaceholder, PageHero, SectionIndex } from "@/components/primitives";
import { developmentProjects, portfolioAssets } from "@/lib/assets";
import { localePath, ui, type SiteLocale } from "@/lib/site-data";

const copy = {
  ro: {
    eyebrow: "Active deținute / administrate",
    title: ["Portofoliu.", "Active reale."],
    lead: "Activele prezentate sunt deținute sau administrate de MEGAPARC. Portofoliul public separă activele operaționale de proiectele în dezvoltare și de disponibilitățile comerciale.",
    operatingIndex: "Active operaționale",
    developmentIndex: "Dezvoltare",
    developmentTitle: ["Proiecte gândite", "ca active."],
    developmentText: "Proiectele și conceptele de dezvoltare sunt prezentate numai cu materiale și date aprobate pentru comunicare publică.",
    closingIndex: "Disponibilități",
    closing: "Spațiile disponibile pentru închiriere sunt prezentate separat de portofoliul instituțional.",
    closingCta: "Vezi disponibilitățile",
  },
  ru: {
    eyebrow: "Активы во владении / управлении",
    title: ["Портфель.", "Реальные активы."],
    lead: "Представленные активы находятся во владении или управлении MEGAPARC. Публичный портфель разделяет операционные активы, девелоперские проекты и коммерческие предложения.",
    operatingIndex: "Операционные активы",
    developmentIndex: "Девелопмент",
    developmentTitle: ["Проекты, задуманные", "как активы."],
    developmentText: "Девелоперские проекты и концепции представлены только с материалами и данными, утверждёнными для публичной коммуникации.",
    closingIndex: "Предложения",
    closing: "Помещения, доступные для аренды, представлены отдельно от институционального портфеля.",
    closingCta: "Смотреть предложения",
  },
  en: {
    eyebrow: "Owned / managed assets",
    title: ["Portfolio.", "Real assets."],
    lead: "The assets shown are owned or managed by MEGAPARC. The public portfolio separates operating assets from development projects and commercial availability.",
    operatingIndex: "Operating assets",
    developmentIndex: "Development",
    developmentTitle: ["Projects conceived", "as assets."],
    developmentText: "Development projects and concepts are presented only with material and data approved for public communication.",
    closingIndex: "Availability",
    closing: "Spaces available for lease are presented separately from the institutional portfolio.",
    closingCta: "View availability",
  },
} as const;

export function PortfolioIndexPage({ locale }: { locale: SiteLocale }) {
  const c = copy[locale];
  const p = (path: string) => localePath(locale, path);

  return (
    <PageShell locale={locale}>
      <PageHero
        index="02"
        eyebrow={c.eyebrow}
        title={
          <>
            {c.title[0]}
            <br />
            <span className="muted-ink">{c.title[1]}</span>
          </>
        }
        lead={c.lead}
      />

      <section className="portfolio-index paper">
        <div className="shell">
          <SectionIndex no="03">{c.operatingIndex}</SectionIndex>
          <div className="portfolio-index__grid">
            {portfolioAssets.map((asset, index) => (
              <Link
                key={asset.slug}
                href={p(`/portfolio/${asset.slug}`)}
                className={`portfolio-index__card portfolio-index__card--${index + 1}`}
                data-reveal
              >
                <div className="portfolio-index__visual">
                  {asset.image ? (
                    <Image
                      src={asset.imageSmall ?? asset.image}
                      alt={`${asset.name} — MEGAPARC`}
                      fill
                      priority={index === 0}
                      sizes={index === 0 ? "(max-width: 720px) 92vw, 62vw" : "(max-width: 720px) 92vw, 42vw"}
                      style={{ objectPosition: asset.imagePosition ?? "center" }}
                      className="portfolio-index__image"
                      data-depth="16"
                    />
                  ) : (
                    <MediaPlaceholder title={asset.name} note={ui.photoPending[locale]} compact />
                  )}
                  <span className="portfolio-index__line" aria-hidden="true" />
                </div>
                <div className="portfolio-index__caption">
                  <div>
                    <span>0{index + 1}</span>
                    <div>
                      <h2>{asset.name}</h2>
                      <span className="portfolio-index__positioning">{asset.positioning[locale]}</span>
                    </div>
                  </div>
                  <div>
                    <span>{asset.district.en === asset.city.en ? asset.city[locale] : `${asset.district[locale]} · ${asset.city[locale]}`}</span>
                    {asset.availability ? <span>{ui.availability[locale]} · {asset.availability.area[locale]}</span> : null}
                    <span className="portfolio-index__cta">{ui.exploreAsset[locale]} ↗</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="portfolio-development ink">
        <div className="shell">
          <SectionIndex no="04" inverse>{c.developmentIndex}</SectionIndex>
          <div className="portfolio-development__heading" data-reveal>
            <h2>
              {c.developmentTitle[0]}
              <br />
              {c.developmentTitle[1]}
            </h2>
            <p>{c.developmentText}</p>
          </div>
          <div className="pipeline">
            {developmentProjects.map((project, index) => (
              <Link key={project.slug} href={p(`/development/${project.slug}`)} className="pipeline__card" data-reveal>
                <div className="pipeline__visual">
                  {project.image ? (
                    <Image
                      src={project.imageSmall ?? project.image}
                      alt={`${project.name} — MEGAPARC`}
                      fill
                      sizes="(max-width: 720px) 92vw, 46vw"
                      className="pipeline__image"
                      data-depth="18"
                      style={{ objectPosition: "50% 62%" }}
                    />
                  ) : (
                    <MediaPlaceholder title={project.name} note={project.status[locale]} compact />
                  )}
                  <span className="asset-media__line" aria-hidden="true" />
                </div>
                <div className="pipeline__caption">
                  <div>
                    <span className="pipeline__no">0{index + 1}</span>
                    <h3>{project.name}</h3>
                  </div>
                  <div>
                    <span>{project.status[locale]}</span>
                    <span>{project.place[locale]}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="closing paper">
        <div className="shell closing__grid" data-reveal>
          <span className="label label--red">05 / {c.closingIndex}</span>
          <div>
            <p className="closing__statement">{c.closing}</p>
            <ArrowLink href={p("/opportunities")}>{c.closingCta}</ArrowLink>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

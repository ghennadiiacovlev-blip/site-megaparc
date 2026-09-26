import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { ArrowLink, MediaPlaceholder, PageHero, SectionHead, SectionIndex } from "@/components/primitives";
import { availableAssets, developmentProjects, portfolioAssets } from "@/lib/assets";
import { localePath, ui, type SiteLocale } from "@/lib/site-data";

const copy = {
  ro: {
    eyebrow: "Portofoliu",
    title: ["Portofoliul imobiliar", "MEGAPARC"],
    lead: "Obiecte comerciale în funcțiune și proiecte de dezvoltare în Chișinău. Fiecare obiect este prezentat cu descriere, date cheie și informații despre spațiile disponibile, fără publicarea condițiilor comerciale.",
    categories: ["Obiecte în funcțiune", "Proiecte de dezvoltare", "Spații disponibile"],
    operatingIndex: "Obiecte în funcțiune",
    operatingTitle: "Activele MEGAPARC",
    operatingText: "Patru obiecte în funcțiune în Chișinău: o clădire de birouri, spații comerciale și un obiect ale cărui informații publice vor fi completate.",
    developmentIndex: "Proiecte de dezvoltare",
    developmentTitle: ["Dezvoltăm proiecte", "de la idee la realizare."],
    developmentText: "Proiectele și conceptele sunt prezentate numai cu materiale și date aprobate pentru publicare.",
    developmentCta: "Vezi Dezvoltare",
    opportunitiesIndex: "Spații disponibile și noi oportunități",
    opportunitiesTitle: "Spații disponibile, propuneri de obiecte și parteneriat.",
    opportunitiesText: "Condițiile se discută direct.",
    opportunitiesCta: "Colaborare",
    available: "obiecte cu disponibilitate confirmată",
  },
  ru: {
    eyebrow: "Портфель",
    title: ["Портфель недвижимости", "MEGAPARC"],
    lead: "Действующие коммерческие объекты и проекты развития в Кишинёве. Каждый объект представлен с описанием, ключевыми данными и информацией о доступных площадях — без публикации коммерческих условий.",
    categories: ["Действующие объекты", "Проекты развития", "Доступные площади"],
    operatingIndex: "Действующие объекты",
    operatingTitle: "Активы MEGAPARC",
    operatingText: "Четыре действующих объекта в Кишинёве: офисное здание, торговые помещения и объект, информация о котором будет дополнена.",
    developmentIndex: "Проекты развития",
    developmentTitle: ["Развиваем проекты", "от идеи до реализации."],
    developmentText: "Проекты и концепции представлены только с утверждёнными для публикации материалами и данными.",
    developmentCta: "Смотреть девелопмент",
    opportunitiesIndex: "Доступные площади и новые возможности",
    opportunitiesTitle: "Доступные площади, предложение объектов и партнёрство.",
    opportunitiesText: "Условия обсуждаются напрямую.",
    opportunitiesCta: "Сотрудничество",
    available: "объекта с подтверждённой доступностью",
  },
  en: {
    eyebrow: "Portfolio",
    title: ["The MEGAPARC", "real estate portfolio"],
    lead: "Operating commercial properties and development projects in Chișinău. Each property is presented with a description, key facts and information on available space, without publishing commercial terms.",
    categories: ["Operating properties", "Development projects", "Available space"],
    operatingIndex: "Operating properties",
    operatingTitle: "MEGAPARC assets",
    operatingText: "Four operating properties in Chișinău: an office building, retail spaces and a property whose public information will be added.",
    developmentIndex: "Development projects",
    developmentTitle: ["We take projects", "from idea to completion."],
    developmentText: "Projects and concepts are presented only with material and data approved for publication.",
    developmentCta: "View Development",
    opportunitiesIndex: "Available space and new opportunities",
    opportunitiesTitle: "Available space, property proposals and partnership.",
    opportunitiesText: "Terms are discussed directly.",
    opportunitiesCta: "Work with us",
    available: "properties with confirmed availability",
  },
} as const;

export function PortfolioIndexPage({ locale }: { locale: SiteLocale }) {
  const c = copy[locale];
  const p = (path: string) => localePath(locale, path);

  return (
    <PageShell locale={locale}>
      <PageHero
        index="01"
        eyebrow={c.eyebrow}
        title={
          <>
            {c.title[0]}
            <br />
            <span className="muted-ink">{c.title[1]}</span>
          </>
        }
        lead={c.lead}
      >
        <nav className="portfolio__categories" aria-label={c.eyebrow}>
          <a href="#operating" className="is-active">{c.categories[0]}<b>{String(portfolioAssets.length).padStart(2, "0")}</b></a>
          <a href="#development">{c.categories[1]}<b>{String(developmentProjects.length).padStart(2, "0")}</b></a>
          <Link href={p("/opportunities")}>{c.categories[2]}<b>{String(availableAssets.length).padStart(2, "0")}</b></Link>
        </nav>
      </PageHero>

      <section className="portfolio-index paper" id="operating">
        <div className="shell">
          <SectionIndex no="02">{c.operatingIndex}</SectionIndex>
          <SectionHead title={c.operatingTitle} text={c.operatingText} />
          <div className="portfolio-index__grid">
            {portfolioAssets.map((asset, index) => (
              <Link key={asset.slug} href={p(`/portfolio/${asset.slug}`)} className={`portfolio-index__card portfolio-index__card--${index + 1}`} data-reveal>
                <div className="portfolio-index__visual">
                  {asset.media ? (
                    <Image
                      src={index === 0 ? asset.media.src : asset.media.card}
                      alt={`${asset.name} — ${asset.positioning[locale]}`}
                      fill
                      priority={index === 0}
                      sizes={index === 0 ? "(max-width: 720px) 92vw, 62vw" : "(max-width: 720px) 92vw, 42vw"}
                      style={{ objectPosition: asset.media.position ?? "center" }}
                      className="portfolio-index__image"
                      data-depth="16"
                    />
                  ) : (
                    <MediaPlaceholder title={asset.name} note={ui.photoPending[locale]} compact />
                  )}
                  <span className="asset-media__line" aria-hidden="true" />
                </div>
                <div className="portfolio-index__caption">
                  <div>
                    <span>0{index + 1}</span>
                    <div>
                      <h2>{asset.name}</h2>
                      <span className="portfolio-index__positioning">{asset.headline[locale]}</span>
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

      <section className="portfolio-development ink" id="development">
        <div className="shell">
          <SectionIndex no="03" inverse>{c.developmentIndex}</SectionIndex>
          <div className="portfolio-development__heading" data-reveal>
            <h2>
              {c.developmentTitle[0]}
              <br />
              {c.developmentTitle[1]}
            </h2>
            <div className="section-head__aside">
              <p>{c.developmentText}</p>
              <ArrowLink href={p("/development")} inverse>{c.developmentCta}</ArrowLink>
            </div>
          </div>
          <div className="pipeline">
            {developmentProjects.map((project, index) => (
              <Link key={project.slug} href={p(`/development/${project.slug}`)} className="pipeline__card" data-reveal>
                <div className="pipeline__visual">
                  {project.media ? (
                    <Image src={project.media.card} alt={`${project.name} — ${project.status[locale]}`} fill sizes="(max-width: 720px) 92vw, 46vw" className="pipeline__image" data-depth="18" style={{ objectPosition: "50% 60%" }} />
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

      <section className="closing stone" id="opportunities">
        <div className="shell closing__grid" data-reveal>
          <span className="label label--red">04 / {c.opportunitiesIndex}</span>
          <div>
            <p className="closing__statement">{c.opportunitiesTitle}</p>
            <p className="note" style={{ marginBottom: "2rem" }}>{c.opportunitiesText} {String(availableAssets.length).padStart(2, "0")} {c.available}.</p>
            <ArrowLink href={p("/opportunities")}>{c.opportunitiesCta}</ArrowLink>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

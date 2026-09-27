import Image from "next/image";
import Link from "next/link";
import { ClosingFrame, Movement, Opening, PropertyList, PropertyRow, Statement } from "@/components/editorial";
import { PageShell } from "@/components/page-shell";
import { ArrowLink } from "@/components/primitives";
import { availableAssets, developmentProjects, portfolioAssets } from "@/lib/assets";
import { localePath, ui, type SiteLocale } from "@/lib/site-data";

/**
 * PORTFOLIO — premium real-estate stories, not a catalogue.
 * Moscova 9 large (62 %), Moscova 20 vertical, Dacia 31 as a wide
 * architectural strip, Creangă 78 as a typographic row; development as rows.
 */
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
    developmentTitle: "Dezvoltăm proiecte de la idee la realizare.",
    developmentText: "Proiectele și conceptele sunt prezentate numai cu materiale și date aprobate pentru publicare.",
    developmentCta: "Vezi Dezvoltare",
    concept: "Concept în evaluare",
    opportunitiesIndex: "Spații disponibile și noi oportunități",
    opportunitiesTitle: "Spații disponibile, propuneri de obiecte și parteneriat.",
    opportunitiesText: (n: string) => `Condițiile se discută direct. ${n} obiecte cu disponibilitate confirmată.`,
    opportunitiesCta: "Colaborare",
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
    developmentTitle: "Развиваем проекты от идеи до реализации.",
    developmentText: "Проекты и концепции представлены только с утверждёнными для публикации материалами и данными.",
    developmentCta: "Смотреть девелопмент",
    concept: "Концепция на стадии оценки",
    opportunitiesIndex: "Доступные площади и новые возможности",
    opportunitiesTitle: "Доступные площади, предложение объектов и партнёрство.",
    opportunitiesText: (n: string) => `Условия обсуждаются напрямую. ${n} объекта с подтверждённой доступностью.`,
    opportunitiesCta: "Сотрудничество",
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
    developmentTitle: "We take projects from idea to completion.",
    developmentText: "Projects and concepts are presented only with material and data approved for publication.",
    developmentCta: "View Development",
    concept: "Concept under evaluation",
    opportunitiesIndex: "Available space and new opportunities",
    opportunitiesTitle: "Available space, property proposals and partnership.",
    opportunitiesText: (n: string) => `Terms are discussed directly. ${n} properties with confirmed availability.`,
    opportunitiesCta: "Work with us",
  },
} as const;

export function PortfolioIndexPage({ locale }: { locale: SiteLocale }) {
  const c = copy[locale];
  const p = (path: string) => localePath(locale, path);
  const [dacia, moscova9, moscova20, creanga] = portfolioAssets;
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <PageShell locale={locale}>
      <Opening eyebrow={c.eyebrow} title={<>{c.title[0]} <span className="muted-ink">{c.title[1]}</span></>} lead={c.lead}>
        <nav className="anchors" aria-label={c.eyebrow}>
          <a href="#operating">{c.categories[0]}<b>{pad(portfolioAssets.length)}</b></a>
          <a href="#development">{c.categories[1]}<b>{pad(developmentProjects.length)}</b></a>
          <Link href={p("/opportunities")}>{c.categories[2]}<b>{pad(availableAssets.length)}</b></Link>
        </nav>
      </Opening>

      {/* Operating — three stories + one typographic row */}
      <Movement tone="white" id="operating">
        <div className="shell">
          <Statement no="02" kicker={c.operatingIndex} title={c.operatingTitle} text={c.operatingText} />
          <div className="stories stories--index">
            {[
              { asset: moscova9, src: moscova9.media!.src, cls: "stories__item--main", sizes: "(max-width: 900px) 100vw, 62vw", priority: true },
              { asset: moscova20, src: moscova20.media!.mobile, cls: "stories__item--tall", sizes: "(max-width: 900px) 100vw, 34vw", priority: false },
              { asset: dacia, src: dacia.media!.wide, cls: "stories__item--strip", sizes: "100vw", priority: false },
            ].map(({ asset, src, cls, sizes, priority }) => (
              <Link key={asset.slug} href={p(`/portfolio/${asset.slug}`)} className={`stories__item ${cls}`} data-reveal>
                <span className="stories__visual">
                  <Image src={src} alt={`${asset.name} — ${asset.positioning[locale]}`} fill priority={priority} sizes={sizes} style={{ objectPosition: asset.media!.position }} data-depth="12" />
                  <i className="stories__line" aria-hidden="true" />
                </span>
                <span className="stories__caption">
                  <span className="stories__name">{asset.name}</span>
                  <span className="stories__meta">
                    {asset.district[locale]} · {asset.city[locale]} · {asset.positioning[locale]}
                    {asset.availability ? ` · ${ui.availability[locale]} ${asset.availability.area[locale]}` : ""}
                  </span>
                  <span className="stories__text">{asset.headline[locale]}</span>
                  <i className="stories__arrow" aria-hidden="true">↗</i>
                </span>
              </Link>
            ))}
          </div>
          <PropertyList>
            <PropertyRow
              href={p(`/portfolio/${creanga.slug}`)}
              index="04"
              placeholder={ui.photoPending[locale]}
              name={creanga.name}
              place={creanga.city[locale]}
              kind={creanga.status[locale]}
              line={creanga.headline[locale]}
              meta={ui.onRequest[locale]}
              cta={ui.exploreAsset[locale]}
            />
          </PropertyList>
        </div>
      </Movement>

      {/* Development — rows on black */}
      <Movement tone="ink" id="development">
        <div className="shell">
          <Statement no="03" kicker={c.developmentIndex} title={c.developmentTitle} text={c.developmentText} inverse>
            <ArrowLink href={p("/development")} inverse>{c.developmentCta}</ArrowLink>
          </Statement>
          <PropertyList inverse>
            {developmentProjects.map((project, index) => (
              <PropertyRow
                key={project.slug}
                inverse
                href={p(`/development/${project.slug}`)}
                index={pad(index + 1)}
                image={project.media ? { src: project.media.card, alt: "", position: "50% 60%" } : undefined}
                placeholder={c.concept}
                name={project.name}
                place={project.place[locale]}
                kind={project.media ? project.kind[locale] : c.concept}
                line={project.headline[locale]}
                meta={project.status[locale]}
                cta={ui.exploreProject[locale]}
              />
            ))}
          </PropertyList>
        </div>
      </Movement>

      <ClosingFrame
        id="opportunities"
        tone="stone"
        kicker={c.opportunitiesIndex}
        title={c.opportunitiesTitle}
        text={c.opportunitiesText(pad(availableAssets.length))}
        links={[
          { href: p("/opportunities"), label: c.opportunitiesCta, strong: true },
          { href: `${p("/contact")}#occupier`, label: ui.requestDetails[locale] },
        ]}
      />
    </PageShell>
  );
}

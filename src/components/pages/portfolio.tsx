import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { Button, Head, Hero, Intro, Quote, Section, Story, TextLink } from "@/components/ui";
import { developmentProjects, portfolioAssets } from "@/lib/assets";
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
  const availableAssets = portfolioAssets.filter((asset) => asset.availability);
  const pad = (n: number) => String(n).padStart(2, "0");
  const meta = (asset: typeof dacia) => [asset.district[locale], asset.city[locale], asset.positioning[locale], asset.availability ? `${ui.availability[locale]} ${asset.availability.area[locale]}` : ""];

  return (
    <PageShell locale={locale}>
      <Hero size="page" media={{ src: moscova9.media!.wide, alt: `${moscova9.name} — ${moscova9.positioning[locale]}`, position: moscova9.media!.position }} title={<>{c.title[0]} {c.title[1]}</>} line={c.eyebrow} />
      <Intro kicker={c.eyebrow} statement={c.lead}>
        <ul className="chips">
          <li><a href="#operating">{c.categories[0]}<b>{pad(portfolioAssets.length)}</b></a></li>
          <li><a href="#development">{c.categories[1]}<b>{pad(developmentProjects.length)}</b></a></li>
          <li><Link href={p("/opportunities")}>{c.categories[2]}<b>{pad(availableAssets.length)}</b></Link></li>
        </ul>
      </Intro>

      {/* OPERATING — four editorial stories */}
      <Section id="operating">
        <div className="shell">
          <Head kicker={c.operatingIndex} title={c.operatingTitle} text={c.operatingText} />
          <div className="stories">
            <Story layout="wide" href={p(`/portfolio/${moscova9.slug}`)} media={{ src: moscova9.media!.wide, alt: `${moscova9.name} — ${moscova9.positioning[locale]}`, position: moscova9.media!.position, priority: true }} name={moscova9.name} meta={meta(moscova9)} line={moscova9.headline[locale]} cta={ui.exploreAsset[locale]} />
            <Story layout="right" href={p(`/portfolio/${moscova20.slug}`)} media={{ src: moscova20.media!.mobile, alt: `${moscova20.name} — ${moscova20.positioning[locale]}`, position: moscova20.media!.position }} name={moscova20.name} meta={meta(moscova20)} line={moscova20.headline[locale]} cta={ui.exploreAsset[locale]} />
            <Story layout="left" href={p(`/portfolio/${dacia.slug}`)} media={{ src: dacia.media!.card, alt: `${dacia.name} — ${dacia.positioning[locale]}`, position: dacia.media!.position }} name={dacia.name} meta={meta(dacia)} line={dacia.headline[locale]} cta={ui.exploreAsset[locale]} />
            <Story layout="row" href={p(`/portfolio/${creanga.slug}`)} placeholder={ui.photoPending[locale]} name={creanga.name} meta={[creanga.city[locale], creanga.status[locale], ui.onRequest[locale]]} line={creanga.headline[locale]} cta={ui.exploreAsset[locale]} />
          </div>
        </div>
      </Section>

      {/* DEVELOPMENT — VATRA large, concept secondary */}
      <Section tone="ink" id="development">
        <div className="shell">
          <Head kicker={c.developmentIndex} title={c.developmentTitle} text={c.developmentText}>
            <TextLink href={p("/development")} className="tlink--light">{c.developmentCta}</TextLink>
          </Head>
          <div className="stories">
            {developmentProjects.map((project) => (
              <Story
                key={project.slug}
                layout={project.media ? "wide" : "row"}
                href={p(`/development/${project.slug}`)}
                media={project.media ? { src: project.media.wide, alt: `${project.name} — ${project.status[locale]}`, position: project.media.position } : undefined}
                placeholder={c.concept}
                name={project.name}
                meta={[project.place[locale], project.media ? project.kind[locale] : c.concept, project.status[locale]]}
                line={project.headline[locale]}
                cta={ui.exploreProject[locale]}
              />
            ))}
          </div>
        </div>
      </Section>

      <Quote tone="paper" id="opportunities" kicker={c.opportunitiesIndex} statement={c.opportunitiesTitle} text={c.opportunitiesText(pad(availableAssets.length))} action={<><Button href={p("/opportunities")}>{c.opportunitiesCta}</Button><TextLink href={`${p("/contact")}#occupier`}>{ui.requestDetails[locale]}</TextLink></>} />
    </PageShell>
  );
}

import { CountUp } from "@/components/count-up";
import { Head, Section, TextLink } from "@/components/ui";
import { developmentProjects, portfolioAssets } from "@/lib/assets";
import { signatureWords } from "@/lib/brand";
import { scaleMetrics } from "@/lib/metrics";
import { historyAnchors, historyCopy } from "@/lib/strategy";
import { brand, localePath, type SiteLocale } from "@/lib/site-data";

/**
 * COMPANY FACTS — dark fact board on Home (2026-09-27).
 *
 * Seven cards in black / graphite / burgundy / MEGAPARC red:
 *   1995 · 2005 · 2020 (the fixed public chronology from `historyAnchors`),
 *   the verified scale counts from `scaleMetrics()` (operating properties,
 *   development projects, development land) and one red field carrying the
 *   business-model signature. A closing strip names the categories we work
 *   with and links to About.
 *
 * Factual rules: every year, count and area comes from the shared data
 * modules; nothing is typed into JSX. "30+ years" / "20+ years" are derived
 * from the approved 1995 (group heritage) and 2005 (MEGAPARC established)
 * anchors, rounded down to a multiple of five so the line stays true for
 * years. The review-only financial figures are intentionally NOT shown here.
 */

const copy = {
  ro: {
    id: "fapte",
    kicker: "MEGAPARC în fapte",
    title: "O companie construită pe experiența grupului din 1995.",
    text: "Investiții, dezvoltare și administrare imobiliară: obiecte în funcțiune în Chișinău, proiecte în lucru și o abordare de proprietar pe termen lung.",
    years: (n: number) => `${n}+ ani`,
    portfolio: "Portofoliu",
    development: "Dezvoltare",
    model: "Modelul nostru",
    with: "Lucrăm cu",
    partners: ["chiriași", "proprietari de obiecte", "bănci", "investitori", "dezvoltatori", "parteneri profesioniști"],
    cta: "Despre MEGAPARC",
  },
  ru: {
    id: "fakty",
    kicker: "MEGAPARC в фактах",
    title: "Компания, выросшая из опыта группы с 1995 года.",
    text: "Инвестиции, девелопмент и управление недвижимостью: действующие объекты в Кишинёве, проекты в работе и долгосрочный подход собственника.",
    years: (n: number) => `${n}+ лет`,
    portfolio: "Портфель",
    development: "Девелопмент",
    model: "Наша модель",
    with: "Работаем с",
    partners: ["арендаторами", "собственниками объектов", "банками", "инвесторами", "девелоперами", "профессиональными партнёрами"],
    cta: "О компании",
  },
  en: {
    id: "facts",
    kicker: "MEGAPARC in facts",
    title: "A company built on the group's experience since 1995.",
    text: "Real estate investment, development and asset management: operating properties in Chișinău, projects under way and a long-term owner's approach.",
    years: (n: number) => `${n}+ years`,
    portfolio: "Portfolio",
    development: "Development",
    model: "Our model",
    with: "We work with",
    partners: ["tenants", "property owners", "banks", "investors", "developers", "professional partners"],
    cta: "About MEGAPARC",
  },
} as const;

/** Whole years since an anchor, rounded down to a multiple of five ("30+"). */
function yearsSince(year: string) {
  const elapsed = new Date().getFullYear() - Number(year);
  return Math.max(5, Math.floor(elapsed / 5) * 5);
}

export function CompanyFacts({ locale }: { locale: SiteLocale }) {
  const c = copy[locale];
  const [heritage, established, focus] = historyAnchors;
  const metrics = scaleMetrics();
  const operating = metrics.find((metric) => metric.key === "operating");
  const projects = metrics.find((metric) => metric.key === "projects");
  const land = metrics.find((metric) => metric.key === "land");
  const city = portfolioAssets[0]?.city[locale];
  const projectNames = developmentProjects.map((project) => project.name).join(" · ");
  const landProject = developmentProjects.find((project) => project.slug === "drochia-gateway")?.name;

  return (
    <Section tone="ink" id={c.id} className="keyfacts" label={c.kicker}>
      <div className="shell">
        <Head kicker={c.kicker} title={c.title} text={c.text} />

        <ul className="kf">
          {/* 1995 — group heritage */}
          <li className="kf__card kf__card--burgundy kf__card--lead" data-reveal>
            <span className="kf__scope">{historyCopy.group[locale]} · {c.years(yearsSince(heritage.year))}</span>
            <span className="kf__value">{heritage.year}</span>
            <span className="kf__title">{heritage.title[locale]}</span>
            <p className="kf__text">{heritage.text[locale]}</p>
          </li>

          {/* 2005 — MEGAPARC established */}
          <li className="kf__card kf__card--ink" data-reveal>
            <span className="kf__scope">{brand.name} · {c.years(yearsSince(established.year))}</span>
            <span className="kf__value kf__value--red">{established.year}</span>
            <span className="kf__title">{established.title[locale]}</span>
            <p className="kf__text">{established.text[locale]}</p>
          </li>

          {/* 2020 — strategic real-estate focus */}
          <li className="kf__card kf__card--graphite" data-reveal>
            <span className="kf__scope">{brand.name}</span>
            <span className="kf__value">{focus.year}</span>
            <span className="kf__title">{focus.title[locale]}</span>
            <p className="kf__text">{focus.text[locale]}</p>
          </li>

          {/* Verified scale — counts come from the asset registers */}
          {operating ? (
            <li className="kf__card kf__card--graphite" data-reveal>
              <span className="kf__scope">{c.portfolio}</span>
              <span className="kf__value"><CountUp value={operating.value} locale={locale} pad={operating.pad} /></span>
              <span className="kf__title">{operating.label[locale]}</span>
              <p className="kf__text">{city}</p>
            </li>
          ) : null}

          {projects ? (
            <li className="kf__card kf__card--ink" data-reveal>
              <span className="kf__scope">{c.development}</span>
              <span className="kf__value"><CountUp value={projects.value} locale={locale} pad={projects.pad} /></span>
              <span className="kf__title">{projects.label[locale]}</span>
              <p className="kf__text">{projectNames}</p>
            </li>
          ) : null}

          {land ? (
            <li className="kf__card kf__card--graphite kf__card--wide" data-reveal>
              <span className="kf__scope">{c.development}</span>
              <span className="kf__value">
                <CountUp value={land.value} locale={locale} />
                {land.plus ? <b>+</b> : null}
                {land.unit ? <small>{land.unit[locale]}</small> : null}
              </span>
              <span className="kf__title">{land.label[locale]}</span>
              <p className="kf__text">{[land.secondary?.[locale], landProject].filter(Boolean).join(" · ")}</p>
            </li>
          ) : null}

          {/* The one red field on the page — business-model signature */}
          <li className="kf__card kf__card--red kf__card--wide" data-reveal>
            <span className="kf__scope">{c.model}</span>
            <span className="kf__words" aria-label={signatureWords[locale].join(" ")}>
              {signatureWords[locale].map((word) => (
                <span key={word}>{word}</span>
              ))}
            </span>
          </li>
        </ul>

        <div className="kf__foot" data-reveal>
          <span className="kf__with">{c.with}</span>
          <ul className="kf__list">
            {c.partners.map((partner) => (
              <li key={partner}>{partner}</li>
            ))}
          </ul>
          <TextLink href={localePath(locale, "/about")} className="tlink--light">{c.cta}</TextLink>
        </div>
      </div>
    </Section>
  );
}

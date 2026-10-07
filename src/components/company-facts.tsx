import { CountUp } from "@/components/count-up";
import { DemoLegend, DemoMark } from "@/components/experience";
import { portfolioFigures } from "@/data/demo-content";
import { Head, Section, TextLink } from "@/components/ui";
import { developmentProjects, portfolioAssets } from "@/lib/assets";
import { signatureWords } from "@/lib/brand";
import { scaleMetrics } from "@/lib/metrics";
import { historyAnchors, historyCopy } from "@/lib/strategy";
import { brand, localePath, type SiteLocale } from "@/lib/site-data";

/**
 * COMPANY FACTS — editorial fact board on Home (final visual pass 2026-09-27).
 *
 * Asymmetric twelve-column board, annual-report tone:
 *   row 1  1995 group heritage (burgundy, six columns, the dominant fact) ·
 *          2005 MEGAPARC established (black) · 2020 real-estate focus (graphite)
 *   row 2  04 operating properties (black) · 02 development projects (graphite) ·
 *          20 000+ m² development land (deep graphite, six columns)
 *   row 3  the one red field of the page: Invest · Develop · Manage · Create value
 * plus a "we work with" sequence and a link to About.
 *
 * Factual rules: every year, count and area comes from the shared data modules;
 * nothing numeric is typed into JSX. "30+ years" / "20+ years" are derived from
 * the approved 1995 (group heritage) and 2005 (MEGAPARC established) anchors,
 * rounded down to a multiple of five. Descriptors are shortened from the
 * approved chronology texts. The review-only financial figures are NOT shown.
 */

const copy = {
  ro: {
    id: "fapte",
    kicker: "MEGAPARC în fapte",
    title: (group: number, mp: number, focus: string) => [
      `${group}+ ani de experiență antreprenorială.`,
      `${mp}+ ani MEGAPARC.`,
      `Imobiliarele — focus strategic din ${focus}.`,
    ],
    years: (n: number) => `${n}+ ani`,
    heritageText: "Retail, investiții, producție, servicii financiare.",
    establishedText: "Achiziția și modernizarea obiectelor comerciale.",
    focusText: "Administrarea obiectelor, dezvoltare, mediu urban.",
    portfolio: "Portofoliu",
    development: "Dezvoltare",
    operatingTitle: "obiecte în funcțiune",
    projectsTitle: "proiecte de dezvoltare",
    landTitle: "teren pentru dezvoltare",
    model: "Modelul nostru",
    with: "Lucrăm cu",
    partners: ["chiriași", "proprietari", "bănci", "investitori", "dezvoltatori", "parteneri"],
    cta: "Despre MEGAPARC",
    indicators: "Indicatori de portofoliu",
    gla: "suprafață închiriabilă",
    tenants: "chiriași",
    occupancy: "grad de ocupare",
  },
  ru: {
    id: "fakty",
    kicker: "MEGAPARC в фактах",
    title: (group: number, mp: number, focus: string) => [
      `${group}+ лет предпринимательского опыта.`,
      `${mp}+ лет MEGAPARC.`,
      `Недвижимость — стратегический фокус с ${focus} года.`,
    ],
    years: (n: number) => `${n}+ лет`,
    heritageText: "Розница, инвестиции, производство, финансовые услуги.",
    establishedText: "Покупка и модернизация коммерческих объектов.",
    focusText: "Управление объектами, девелопмент, городская среда.",
    portfolio: "Портфель",
    development: "Девелопмент",
    operatingTitle: "действующих объекта",
    projectsTitle: "проекта развития",
    landTitle: "земля под развитие",
    model: "Наша модель",
    with: "Работаем с",
    partners: ["арендаторами", "собственниками", "банками", "инвесторами", "девелоперами", "партнёрами"],
    cta: "О компании",
    indicators: "Показатели портфеля",
    gla: "арендуемая площадь",
    tenants: "арендаторов",
    occupancy: "заполняемость",
  },
  en: {
    id: "facts",
    kicker: "MEGAPARC in facts",
    title: (group: number, mp: number, focus: string) => [
      `${group}+ years of entrepreneurial experience.`,
      `${mp}+ years of MEGAPARC.`,
      `Real estate as the strategic focus since ${focus}.`,
    ],
    years: (n: number) => `${n}+ years`,
    heritageText: "Retail, investment, manufacturing, financial services.",
    establishedText: "Acquiring and modernising commercial properties.",
    focusText: "Property management, development, urban renewal.",
    portfolio: "Portfolio",
    development: "Development",
    operatingTitle: "operating properties",
    projectsTitle: "development projects",
    landTitle: "development land",
    model: "Our model",
    with: "We work with",
    partners: ["tenants", "owners", "banks", "investors", "developers", "partners"],
    cta: "About MEGAPARC",
    indicators: "Portfolio indicators",
    gla: "lettable area",
    tenants: "tenants",
    occupancy: "occupancy",
  },
} as const;

/** Whole years since an anchor, rounded down to a multiple of five ("30+"). */
function yearsSince(year: string) {
  const elapsed = new Date().getFullYear() - Number(year);
  return Math.max(5, Math.floor(elapsed / 5) * 5);
}

/**
 * tone="light" (full-experience prototype 2026-10-07): warm field, the years keep
 * their burgundy / black / graphite cards, counts and land turn light, and a row
 * of DEMO portfolio indicators (src/data/demo-content.ts) follows the verified
 * scale — each value with its demo ring and the legend.
 */
export function CompanyFacts({ locale, tone = "dark" }: { locale: SiteLocale; tone?: "dark" | "light" }) {
  const light = tone === "light";
  const f = portfolioFigures;
  const c = copy[locale];
  const [heritage, established, focus] = historyAnchors;
  const metrics = scaleMetrics();
  const operating = metrics.find((metric) => metric.key === "operating");
  const projects = metrics.find((metric) => metric.key === "projects");
  const land = metrics.find((metric) => metric.key === "land");
  const city = portfolioAssets[0]?.city[locale];
  const projectNames = developmentProjects.map((project) => project.name).join(" · ");
  const landProject = developmentProjects.find((project) => project.slug === "drochia-gateway")?.name;
  const groupYears = yearsSince(heritage.year);
  const megaparcYears = yearsSince(established.year);
  const titleLines = c.title(groupYears, megaparcYears, focus.year);

  return (
    <Section tone={light ? "paper" : "ink"} id={c.id} className={`keyfacts${light ? " keyfacts--light" : ""}`} label={c.kicker}>
      <div className="shell">
        <Head
          kicker={c.kicker}
          title={
            <>
              {titleLines[0]}
              <br />
              {titleLines[1]}
              <br />
              {titleLines[2]}
            </>
          }
        />

        <ul className="kf">
          {/* ROW 1 — 1995 group heritage: the dominant fact */}
          <li className="kf__card kf__card--burgundy kf__card--heritage kf__card--wide" data-reveal>
            <span className="kf__scope">{historyCopy.group[locale]} · {c.years(groupYears)}</span>
            <span className="kf__value kf__value--xl">{heritage.year}</span>
            <div className="kf__body">
              <span className="kf__title">{heritage.title[locale]}</span>
              <p className="kf__text">{c.heritageText}</p>
            </div>
          </li>

          {/* 2005 — MEGAPARC established */}
          <li className="kf__card kf__card--black kf__card--est" data-reveal>
            <span className="kf__scope">{brand.name}<span className="kf__scope-extra"> · {c.years(megaparcYears)}</span></span>
            <span className="kf__value kf__value--lg kf__value--red">{established.year}</span>
            <div className="kf__body">
              <span className="kf__title">{established.title[locale]}</span>
              <p className="kf__text">{c.establishedText}</p>
            </div>
          </li>

          {/* 2020 — strategic real-estate focus: a transition, not a hero */}
          <li className="kf__card kf__card--graphite kf__card--focus" data-reveal>
            <span className="kf__scope">{brand.name}</span>
            <span className="kf__value kf__value--lg">{focus.year}</span>
            <div className="kf__body">
              <span className="kf__title">{focus.title[locale]}</span>
              <p className="kf__text">{c.focusText}</p>
            </div>
          </li>

          {/* ROW 2 — verified scale from the asset registers */}
          {operating ? (
            <li className={`kf__card ${light ? "kf__card--paper" : "kf__card--black"} kf__card--count`} data-reveal>
              <span className="kf__scope">{c.portfolio}</span>
              <span className="kf__value kf__value--lg"><CountUp value={operating.value} locale={locale} pad={operating.pad} /></span>
              <div className="kf__body">
                <span className="kf__title kf__title--caps">{c.operatingTitle}</span>
                <p className="kf__text">{city}</p>
              </div>
            </li>
          ) : null}

          {projects ? (
            <li className={`kf__card ${light ? "kf__card--paper" : "kf__card--graphite"} kf__card--count`} data-reveal>
              <span className="kf__scope">{c.development}</span>
              <span className="kf__value kf__value--lg"><CountUp value={projects.value} locale={locale} pad={projects.pad} /></span>
              <div className="kf__body">
                <span className="kf__title kf__title--caps">{c.projectsTitle}</span>
                <p className="kf__text">{projectNames}</p>
              </div>
            </li>
          ) : null}

          {land ? (
            <li className={`kf__card ${light ? "kf__card--stone" : "kf__card--deep"} kf__card--land kf__card--wide`} data-reveal>
              <span className="kf__scope">{c.development}</span>
              <span className="kf__value kf__value--land">
                <CountUp value={land.value} locale={locale} />
                {land.plus ? <b>+</b> : null}
                {land.unit ? <small>{land.unit[locale]}</small> : null}
              </span>
              <div className="kf__body">
                <span className="kf__title kf__title--caps">{c.landTitle}</span>
                <p className="kf__text">{[land.secondary?.[locale], landProject].filter(Boolean).join(" · ")}</p>
              </div>
            </li>
          ) : null}

          {/* ROW 2b — DEMO portfolio indicators (light board only) */}
          {light
            ? [
                [f.gla, c.gla],
                [f.tenants, c.tenants],
                [f.occupancy, c.occupancy],
              ].map(([point, title]) => (
                <li key={(point as typeof f.gla).key} className={`kf__card kf__card--paper kf__card--demo${point === f.gla ? " kf__card--demo-lead" : ""}`} data-reveal>
                  <span className="kf__scope">{c.indicators}</span>
                  <span className="kf__value kf__value--lg">
                    {(point as typeof f.gla).value[locale]}
                    <DemoMark />
                  </span>
                  <div className="kf__body">
                    <span className="kf__title kf__title--caps">{title as string}</span>
                  </div>
                </li>
              ))
            : null}

          {/* ROW 3 — the one red field on the page: business-model signature */}
          <li className="kf__card kf__card--red kf__card--model" data-reveal>
            <span className="kf__scope">{c.model}</span>
            <p className="kf__words" aria-label={signatureWords[locale].join(" ")}>
              {signatureWords[locale].map((word) => (
                <span key={word}>{word}</span>
              ))}
            </p>
          </li>
        </ul>

        <div className="kf__foot" data-reveal>
          <span className="kf__with">{c.with}</span>
          <ul className="kf__list">
            {c.partners.map((partner) => (
              <li key={partner}>{partner}</li>
            ))}
          </ul>
          <TextLink href={localePath(locale, "/about")} className={light ? undefined : "tlink--light"}>{c.cta}</TextLink>
        </div>
        {light ? <DemoLegend locale={locale} /> : null}
      </div>
    </Section>
  );
}

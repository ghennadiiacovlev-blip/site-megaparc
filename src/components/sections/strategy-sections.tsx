import Link from "next/link";
import { ArrowLink, SectionHead, SectionIndex } from "@/components/primitives";
import { brandLayers, signatureWords } from "@/lib/brand";
import { capitalCopy, publicFinancialMetrics } from "@/lib/public-financial-metrics";
import {
  capabilities,
  cycleOutcomes,
  investmentMandate,
  investmentPrinciples,
  megaparc2030,
  ownerMindset,
  philosophy,
  valueCycle,
  valueCycleCopy,
} from "@/lib/strategy";
import { brand, localePath, ui, type Localized, type SiteLocale } from "@/lib/site-data";

type Surface = "paper" | "stone" | "ink" | "graphite";
const isDark = (surface: Surface) => surface === "ink" || surface === "graphite";

/* ------------------------------------------------------------------ */
/* Philosophy — compact (home)                                          */
/* ------------------------------------------------------------------ */

const philosophyCopy = {
  cta: { ro: "Cum gândim", ru: "Как мы мыслим", en: "How we think" },
} satisfies Record<string, Localized>;

export function PhilosophySection({ locale, no, id }: { locale: SiteLocale; no: string; id?: string }) {
  const title = philosophy.title[locale];
  const [first, ...rest] = title.split(". ");
  return (
    <section className="philosophy paper" id={id}>
      <div className="shell">
        <SectionIndex no={no}>{philosophy.kicker[locale]}</SectionIndex>
        <div className="philosophy__grid" data-reveal>
          <div>
            <p className="philosophy__kicker">{brandLayers.statement[locale]}</p>
            <p className="philosophy__idea">{brandLayers.strategicIdea[locale]}</p>
          </div>
          <h2>
            {first}.
            <br />
            <em>{rest.join(". ")}</em>
          </h2>
          <div className="philosophy__copy">
            <div className="prose">
              <p>{philosophy.paragraphs[locale][1]}</p>
            </div>
            <ArrowLink href={localePath(locale, "/approach")}>{philosophyCopy.cta[locale]}</ArrowLink>
          </div>
        </div>
        <ol className="philosophy__lenses" data-reveal>
          {philosophy.lenses[locale].map((lens, index) => (
            <li key={lens}>
              <span>0{index + 1}</span>
              {lens}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Full philosophy manifesto (Our Approach). */
export function ManifestoSection({ locale, no, surface = "ink" }: { locale: SiteLocale; no: string; surface?: Surface }) {
  const title = philosophy.title[locale];
  const [first, ...rest] = title.split(". ");
  return (
    <section className={`manifesto ${surface}`} id="philosophy">
      <div className="shell">
        <SectionIndex no={no} inverse={isDark(surface)}>{philosophy.kicker[locale]}</SectionIndex>
        <div className="manifesto__grid" data-reveal>
          <h2 className="manifesto__title">
            {first}.
            <br />
            <em>{rest.join(". ")}</em>
          </h2>
          <div className="manifesto__text">
            {philosophy.paragraphs[locale].map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Capital at work — temporary review-only figures                     */
/* ------------------------------------------------------------------ */

export function CapitalSection({ locale, no, surface = "ink", id, compact = false }: { locale: SiteLocale; no: string; surface?: Surface; id?: string; compact?: boolean }) {
  return (
    <section className={`capital ${surface}${compact ? " capital--compact" : ""}`} id={id ?? "capital"} aria-label={capitalCopy.kicker[locale]}>
      <div className="shell">
        {compact ? <span className="label label--light">{capitalCopy.kicker[locale]}</span> : <SectionIndex no={no} inverse={isDark(surface)}>{capitalCopy.kicker[locale]}</SectionIndex>}
        {compact ? null : <SectionHead title={capitalCopy.title[locale]} text={capitalCopy.text[locale]} />}
        <dl className="capital__grid">
          {publicFinancialMetrics.map((metric) => {
            const [amount, suffix] = splitDisplay(metric.display);
            return (
              <div key={metric.key} className="capital__item" data-reveal>
                <dt className="capital__label">{metric.label[locale]}</dt>
                <dd>
                  <span className="capital__value" data-temporary={metric.temporary ? "true" : undefined}>
                    {amount}
                    <b>{suffix}</b>
                  </span>
                  <p className="capital__note">{metric.note[locale]}</p>
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}

/** "€25M+" → ["€25M", "+"] so the plus carries the signature red. */
function splitDisplay(display: string): [string, string] {
  return display.endsWith("+") ? [display.slice(0, -1), "+"] : [display, ""];
}

/* ------------------------------------------------------------------ */
/* Integrated platform — INVESTMENT · DEVELOPMENT · ASSET MANAGEMENT    */
/* ------------------------------------------------------------------ */

const platformCopy = {
  kicker: { ro: "Platformă integrată", ru: "Интегрированная платформа", en: "Integrated platform" },
  title: { ro: "Trei capabilități. O singură decizie de investiție.", ru: "Три компетенции. Одно инвестиционное решение.", en: "Three capabilities. One investment decision." },
  text: {
    ro: "Investiția, dezvoltarea și administrarea activelor nu sunt departamente separate, ci un singur ciclu de proprietate.",
    ru: "Инвестиции, девелопмент и управление активами — не отдельные департаменты, а единый цикл владения.",
    en: "Investment, development and asset management are not separate departments, but one ownership cycle.",
  },
} satisfies Record<string, Localized>;

export function PlatformSection({ locale, no, surface = "paper", links = true }: { locale: SiteLocale; no: string; surface?: Surface; links?: boolean }) {
  const targets = ["/approach", "/development", "/portfolio"];
  return (
    <section className={`platform ${surface}`} id="platform">
      <div className="shell">
        <SectionIndex no={no} inverse={isDark(surface)}>{platformCopy.kicker[locale]}</SectionIndex>
        <SectionHead title={platformCopy.title[locale]} text={platformCopy.text[locale]} />
        <div className="platform__rows">
          {capabilities.map((capability, index) => {
            const inner = (
              <>
                <span className="platform-row__no">{capability.no}</span>
                <h3>{capability.title[locale]}</h3>
                <p>{capability.text[locale]}</p>
                <span className="platform-row__arrow" aria-hidden="true">↗</span>
              </>
            );
            return links ? (
              <Link key={capability.no} href={localePath(locale, targets[index])} className="platform-row" data-reveal>
                {inner}
              </Link>
            ) : (
              <article key={capability.no} className="platform-row" data-reveal>
                {inner}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Signature red moment                                                 */
/* ------------------------------------------------------------------ */

const signatureCopy = {
  text: {
    ro: "Modelul de afaceri MEGAPARC, în patru cuvinte. Fiecare este o decizie de capital, nu o promisiune.",
    ru: "Бизнес-модель MEGAPARC в четырёх словах. Каждое — решение о капитале, а не обещание.",
    en: "The MEGAPARC business model in four words. Each one is a capital decision, not a promise.",
  },
} satisfies Record<string, Localized>;

export function SignatureSection({ locale }: { locale: SiteLocale }) {
  return (
    <section className="signature red-field" data-reveal aria-label={brandLayers.model[locale]}>
      <span className="signature__line" aria-hidden="true" />
      <div className="shell signature__grid">
        <h2 className="signature__words">
          {signatureWords[locale].map((word) => (
            <span key={word}><i>{word}</i></span>
          ))}
        </h2>
        <div className="signature__aside">
          <span className="label" lang="en">{brand.since}</span>
          <p>{signatureCopy.text[locale]}</p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Value creation cycle                                                 */
/* ------------------------------------------------------------------ */

export function ValueCycleSection({ locale, no, surface = "paper" }: { locale: SiteLocale; no: string; surface?: Surface }) {
  return (
    <section className={`cycle ${surface}`} id="cycle">
      <div className="shell">
        <SectionIndex no={no} inverse={isDark(surface)}>{valueCycleCopy.kicker[locale]}</SectionIndex>
        <SectionHead title={valueCycleCopy.title[locale]} text={valueCycleCopy.text[locale]} />
        <div className="cycle__track">
          <span className="cycle__progress" aria-hidden="true" />
          <ol className="cycle__list">
            {valueCycle.map((stage) => (
              <li key={stage.key} className="cycle__stage" data-reveal>
                <span className="cycle__no">{stage.no}</span>
                <h3>{stage.title[locale]}</h3>
                <p>{stage.text[locale]}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className="cycle__outcomes" data-reveal>
          <span className="label">{valueCycleCopy.outcomesLabel[locale]}</span>
          {cycleOutcomes[locale].map((outcome) => (
            <span key={outcome}>{outcome}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Investment principles                                                */
/* ------------------------------------------------------------------ */

const principlesCopy = {
  kicker: { ro: "Principiile noastre de investiție", ru: "Наши инвестиционные принципы", en: "Our investment principles" },
  title: { ro: "Cinci principii. Nicio excepție.", ru: "Пять принципов. Без исключений.", en: "Five principles. No exceptions." },
} satisfies Record<string, Localized>;

export function PrinciplesSection({ locale, no, surface = "ink", cta }: { locale: SiteLocale; no: string; surface?: Surface; cta?: { href: string; label: string } }) {
  return (
    <section className={`principles ${surface}`} id="principles">
      <div className="shell">
        <SectionIndex no={no} inverse={isDark(surface)}>{principlesCopy.kicker[locale]}</SectionIndex>
        <SectionHead title={principlesCopy.title[locale]} />
        <div className="principles__grid">
          {investmentPrinciples.map((principle) => (
            <article key={principle.no} data-reveal>
              <span>{principle.no}</span>
              <h3>{principle.title[locale]}</h3>
              <p>{principle.text[locale]}</p>
            </article>
          ))}
        </div>
        {cta ? (
          <div className="principles__foot" data-reveal>
            <ArrowLink href={cta.href} inverse={isDark(surface)}>{cta.label}</ArrowLink>
          </div>
        ) : null}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Owner's mindset                                                      */
/* ------------------------------------------------------------------ */

export function MindsetSection({ locale, no, surface = "stone" }: { locale: SiteLocale; no: string; surface?: Surface }) {
  return (
    <section className={`mindset ${surface}`} id="mindset">
      <div className="shell">
        <SectionIndex no={no} inverse={isDark(surface)}>{ownerMindset.title[locale]}</SectionIndex>
        <div className="mindset__grid">
          <p className="mindset__statement" data-reveal>{ownerMindset.statement[locale]}</p>
          <ul className="mindset__traits" data-reveal>
            {ownerMindset.traits[locale].map((trait, index) => (
              <li key={trait}>
                <span>0{index + 1}</span>
                {trait}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* MEGAPARC 2030                                                        */
/* ------------------------------------------------------------------ */

export function Strategy2030Section({ locale, no, surface = "ink" }: { locale: SiteLocale; no: string; surface?: Surface }) {
  return (
    <section className={`strategy ${surface}`} id="megaparc-2030">
      <div className="shell">
        <SectionIndex no={no} inverse={isDark(surface)}>{megaparc2030.name}</SectionIndex>
        <div className="strategy__head" data-reveal>
          <div>
            <span className="strategy__name">{megaparc2030.name}</span>
            <span className="strategy__year" aria-hidden="true">20<b>30</b></span>
          </div>
          <div>
            <h2 className="strategy__subtitle">{megaparc2030.subtitle[locale]}</h2>
            <p className="strategy__intro">{megaparc2030.intro[locale]}</p>
          </div>
        </div>
        <ol className="pillars">
          {megaparc2030.pillars.map((pillar) => (
            <li key={pillar.no} className="pillar" data-reveal>
              <span className="pillar__no">{pillar.no}</span>
              <div>
                <h3>{pillar.title[locale]}</h3>
                {pillar.idea ? <span className="pillar__idea">{pillar.idea[locale]}</span> : null}
              </div>
              <div className="pillar__body">
                <p>{pillar.text[locale]}</p>
                <ul className={`pillar__points${pillar.no === "02" ? " pillar__points--flow" : ""}`}>
                  {pillar.points[locale].map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
        <div className="strategy__equation" data-reveal>
          <p>{renderEquation(megaparc2030.equation[locale])}</p>
          <span className="label label--red" lang="en">{brand.since}</span>
        </div>
      </div>
    </section>
  );
}

function renderEquation(text: string) {
  const [name, rest] = text.split(" = ");
  return (
    <>
      <b>{name}</b> = {rest}
    </>
  );
}

const teaserCopy = {
  text: {
    ro: "Direcția strategică publică a MEGAPARC: de la deținerea de proprietăți la o platformă imobiliară instituțională, în șapte piloni.",
    ru: "Публичное стратегическое направление MEGAPARC: от владения недвижимостью к институциональной платформе, в семи опорах.",
    en: "MEGAPARC's public strategic direction: from property ownership to an institutional real estate platform, in seven pillars.",
  },
  cta: { ro: "Vezi MEGAPARC 2030", ru: "Смотреть MEGAPARC 2030", en: "See MEGAPARC 2030" },
  pillar: { ro: "Pilon", ru: "Опора", en: "Pillar" },
} satisfies Record<string, Localized>;

export function Strategy2030Teaser({ locale, no }: { locale: SiteLocale; no: string }) {
  return (
    <section className="strategy-teaser graphite" id="megaparc-2030">
      <div className="shell">
        <SectionIndex no={no} inverse>{megaparc2030.name}</SectionIndex>
        <div className="strategy-teaser__grid">
          <div data-reveal>
            <span className="strategy__name">{megaparc2030.name}</span>
            <span className="strategy__year" aria-hidden="true">20<b>30</b></span>
            <h2 className="strategy__subtitle" style={{ marginTop: "2rem" }}>{megaparc2030.subtitle[locale]}</h2>
            <p className="strategy__intro">{teaserCopy.text[locale]}</p>
          </div>
          <div data-reveal>
            <ol className="strategy-teaser__list">
              {megaparc2030.pillars.map((pillar) => (
                <li key={pillar.no}>
                  <span>{pillar.no}</span>
                  <span>{pillar.title[locale]}</span>
                  <span>{teaserCopy.pillar[locale]}</span>
                </li>
              ))}
            </ol>
            <div style={{ marginTop: "2.4rem" }}>
              <ArrowLink href={`${localePath(locale, "/approach")}#megaparc-2030`} inverse>{teaserCopy.cta[locale]}</ArrowLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Where we invest — MOLDOVA operating base · opportunities WORLDWIDE     */
/* ------------------------------------------------------------------ */

const mandateCopy = {
  operating: { ro: "Active operaționale", ru: "Операционные активы", en: "Operating assets" },
  projects: { ro: "Proiecte de dezvoltare", ru: "Девелоперские проекты", en: "Development projects" },
  verified: { ro: "Verificat", ru: "Подтверждено", en: "Verified" },
  universe: { ro: "La nivel internațional", ru: "По всему миру", en: "Worldwide" },
} satisfies Record<string, Localized>;

export function MandateSection({
  locale,
  no,
  surface = "graphite",
  counts,
}: {
  locale: SiteLocale;
  no: string;
  surface?: Surface;
  counts: { operating: number; projects: number };
}) {
  const dark = isDark(surface);
  const m = investmentMandate;
  return (
    <section className={`mandate ${surface}`} id="mandate">
      <div className="shell">
        <SectionIndex no={no} inverse={dark}>{m.kicker[locale]}</SectionIndex>
        <div className="mandate__head" data-reveal>
          <h2 className="mandate__title">
            {m.statement[locale].map((line, index) => (
              <span key={line} className={index === 1 ? "mandate__title-accent" : undefined}>{line}</span>
            ))}
          </h2>
          <div className="section-head__aside">
            <p className="mandate__expression">{m.expression[locale]}</p>
            <p className="mandate__text">{m.text[locale]}</p>
          </div>
        </div>
        <div className="mandate__fields">
          <article className="mandate__field mandate__field--base" data-reveal>
            <span className="mandate__tag">{mandateCopy.verified[locale]}</span>
            <h3>{m.base.title[locale]}</h3>
            <p className="mandate__role">{m.base.role[locale]}</p>
            <dl className="mandate__counts">
              <div><dd>{String(counts.operating).padStart(2, "0")}</dd><dt>{mandateCopy.operating[locale]}</dt></div>
              <div><dd>{String(counts.projects).padStart(2, "0")}</dd><dt>{mandateCopy.projects[locale]}</dt></div>
            </dl>
            <ul className="mandate__list">
              {m.base.points[locale].map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
          <article className="mandate__field mandate__field--global" data-reveal>
            <span className="mandate__tag">{mandateCopy.universe[locale]}</span>
            <h3>{m.global.title[locale]}</h3>
            <p className="mandate__role">{m.global.role[locale]}</p>
            <ul className="mandate__list mandate__list--large">
              {m.global.points[locale].map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <ArrowLink href={`${localePath(locale, "/contact")}#opportunity`} inverse={dark} strong>{m.cta[locale]}</ArrowLink>
          </article>
        </div>
        <div className="mandate__criteria" data-reveal>
          <span className="label label--red">{m.criteria.label[locale]}</span>
          <ul className="journey__steps">
            {m.criteria.points[locale].map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          <p className="mandate__note">{m.note[locale]}</p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Shared CTA labels                                                    */
/* ------------------------------------------------------------------ */

export const sectionCta = {
  approach: ui.viewApproach,
  portfolio: ui.viewPortfolio,
};

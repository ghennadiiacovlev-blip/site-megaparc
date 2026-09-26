import { CountUp } from "@/components/count-up";
import { SectionIndex } from "@/components/primitives";
import { portfolioMetrics, scaleMetrics } from "@/lib/metrics";
import { brand, type Localized, type SiteLocale } from "@/lib/site-data";

const copy = {
  title: { ro: "MEGAPARC la scară", ru: "Масштаб MEGAPARC", en: "MEGAPARC at scale" },
  statement: {
    ro: "Active reale, teren de dezvoltare și trei decenii de experiență.",
    ru: "Реальные активы, земля под девелопмент и три десятилетия опыта.",
    en: "Real assets, development land and three decades of experience.",
  },
  note: {
    ro: "Suprafețele sunt prezentate pe tipuri distincte și nu sunt însumate. Terenul pentru dezvoltare include amplasamentul Drochia Gateway.",
    ru: "Площади показаны по отдельным категориям и не суммируются. Земля под девелопмент включает участок Drochia Gateway.",
    en: "Areas are presented by type and are not added together. Development land includes the Drochia Gateway site.",
  },
} satisfies Record<string, Localized>;

/** Editorial institutional-scale band. Renders only metrics that are not null. */
export function ScaleSection({ locale, no, surface = "paper" }: { locale: SiteLocale; no: string; surface?: "paper" | "stone" }) {
  const metrics = scaleMetrics();
  return (
    <section className={`scale ${surface}`} id="scale" aria-label={copy.title[locale]}>
      <div className="shell">
        <SectionIndex no={no}>{copy.title[locale]}</SectionIndex>
        <div className="scale__heading" data-reveal>
          <p className="scale__statement">{copy.statement[locale]}</p>
        </div>
        <dl className="scale__list">
          {metrics.map((metric) => (
            <div key={metric.key} className="scale__item" data-reveal>
              <dt className="scale__label">{metric.label[locale]}</dt>
              <dd className="scale__value">
                <CountUp value={metric.value} locale={locale} pad={metric.pad} />
                {metric.plus ? <span className="scale__plus">+</span> : null}
                {metric.unit ? <span className="scale__unit">{metric.unit[locale]}</span> : null}
                {metric.secondary ? <span className="scale__secondary">{metric.secondary[locale]}</span> : null}
              </dd>
            </div>
          ))}
          <div className="scale__item scale__item--since" data-reveal>
            <dt className="scale__label">{brand.name}</dt>
            <dd className="scale__value" lang="en">
              <span className="scale__since">Since</span>
              <span>{portfolioMetrics.heritageSince}</span>
            </dd>
          </div>
        </dl>
        <p className="scale__note">{copy.note[locale]}</p>
      </div>
    </section>
  );
}

import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { ArrowLink, Note, PageHero, SectionIndex } from "@/components/primitives";
import { availableAssets } from "@/lib/assets";
import { localePath, ui, type SiteLocale } from "@/lib/site-data";

const copy = {
  ro: {
    eyebrow: "Disponibilități comerciale",
    title: ["Spațiul potrivit", "pentru următoarea etapă."],
    lead: "Spații de birouri și retail disponibile în prezent în portofoliul MEGAPARC din Chișinău. Această secțiune este separată de portofoliul instituțional și prezintă numai disponibilități confirmate.",
    listIndex: "Disponibil în prezent",
    note: "Suprafețele finale, durata contractului, data predării și condițiile tehnice se stabilesc prin negociere. Informații suplimentare la cerere.",
    distinctionIndex: "Două prezentări distincte",
    distinction: [
      ["Portofoliu instituțional", "Active deținute sau administrate de MEGAPARC, prezentate ca profil de activ: arhitectură, utilizare, status, abordare."],
      ["Disponibilități comerciale", "Spații concrete disponibile pentru închiriere, cu informații confirmate: suprafață, chirie solicitată, disponibilitate."],
    ],
    closingIndex: "Portofoliu",
    closing: "Activele MEGAPARC sunt prezentate ca profil de activ, nu ca anunț.",
    closingCta: "Vezi portofoliul",
    details: "Detalii",
  },
  ru: {
    eyebrow: "Коммерческие предложения",
    title: ["Подходящее пространство", "для следующего этапа."],
    lead: "Офисные и торговые помещения, доступные сейчас в портфеле MEGAPARC в Кишинёве. Раздел отделён от институционального портфеля и показывает только подтверждённые предложения.",
    listIndex: "Доступно сейчас",
    note: "Итоговая площадь, срок аренды, дата передачи и технические условия согласовываются в ходе переговоров. Дополнительная информация по запросу.",
    distinctionIndex: "Две разные презентации",
    distinction: [
      ["Институциональный портфель", "Активы во владении или управлении MEGAPARC, представленные как профиль объекта: архитектура, назначение, статус, подход."],
      ["Коммерческие предложения", "Конкретные помещения, доступные для аренды, с подтверждённой информацией: площадь, арендная ставка, доступность."],
    ],
    closingIndex: "Портфель",
    closing: "Активы MEGAPARC представлены как профиль объекта, а не как объявление.",
    closingCta: "Смотреть портфель",
    details: "Подробнее",
  },
  en: {
    eyebrow: "Commercial opportunities",
    title: ["The right space", "for what comes next."],
    lead: "Office and retail space currently available in the MEGAPARC Chișinău portfolio. This section is separate from the institutional portfolio and presents confirmed availability only.",
    listIndex: "Currently available",
    note: "Final areas, lease term, handover date and technical conditions are agreed through negotiation. Additional information available on request.",
    distinctionIndex: "Two distinct presentations",
    distinction: [
      ["Institutional portfolio", "Assets owned or managed by MEGAPARC, presented as asset profiles: architecture, use, status, approach."],
      ["Commercial availability", "Specific spaces available for lease, with confirmed information: area, asking rent, availability."],
    ],
    closingIndex: "Portfolio",
    closing: "MEGAPARC assets are presented as asset profiles, not as listings.",
    closingCta: "View the portfolio",
    details: "Details",
  },
} as const;

export function OpportunitiesPage({ locale }: { locale: SiteLocale }) {
  const c = copy[locale];
  const p = (path: string) => localePath(locale, path);

  return (
    <PageShell locale={locale}>
      <PageHero
        index="04"
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

      <section className="offers ink">
        <div className="shell">
          <SectionIndex no="05" inverse>{c.listIndex}</SectionIndex>
          <div className="offers__list">
            {availableAssets.map((asset, index) => {
              const a = asset.availability!;
              return (
                <article key={asset.slug} className="offer-row" data-reveal>
                  <span className="offer-row__no">0{index + 1}</span>
                  <div className="offer-row__identity">
                    <h2>{asset.name}</h2>
                    <span>{asset.positioning[locale]}</span>
                    <span>{asset.district[locale]} · {asset.city[locale]}</span>
                  </div>
                  <p className="offer-row__headline">{a.headline[locale]}</p>
                  <dl className="offer-row__facts">
                    <div>
                      <dt>{ui.totalArea[locale]}</dt>
                      <dd>{a.area[locale]}</dd>
                    </div>
                    <div>
                      <dt>{ui.askingRent[locale]}</dt>
                      <dd>{a.rent[locale]}</dd>
                    </div>
                    {a.from ? (
                      <div>
                        <dt>{ui.availableFrom[locale]}</dt>
                        <dd>{a.from[locale]}</dd>
                      </div>
                    ) : null}
                  </dl>
                  <div className="offer-row__actions">
                    <Link className="arrow-link arrow-link--inverse" href={`${p(`/portfolio/${asset.slug}`)}#availability`}>
                      <span>{c.details}</span>
                      <span className="arrow-link__icon" aria-hidden="true">↗</span>
                    </Link>
                    <Link className="arrow-link arrow-link--inverse" href={p("/contact")}>
                      <span>{ui.enquire[locale]}</span>
                      <span className="arrow-link__icon" aria-hidden="true">↗</span>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
          <Note light>{c.note}</Note>
        </div>
      </section>

      <section className="distinction paper">
        <div className="shell">
          <SectionIndex no="06">{c.distinctionIndex}</SectionIndex>
          <div className="distinction__grid">
            {c.distinction.map(([title, text], index) => (
              <article key={title} data-reveal className={index === 1 ? "is-current" : undefined}>
                <span className="label label--red">0{index + 1}</span>
                <h2>{title}</h2>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="closing paper">
        <div className="shell closing__grid" data-reveal>
          <span className="label label--red">07 / {c.closingIndex}</span>
          <div>
            <p className="closing__statement">{c.closing}</p>
            <ArrowLink href={p("/portfolio")}>{c.closingCta}</ArrowLink>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

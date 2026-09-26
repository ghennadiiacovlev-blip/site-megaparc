import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { ArrowLink, Note, PageHero, SectionIndex } from "@/components/primitives";
import { availableAssets } from "@/lib/assets";
import { clientJourneys, journeysCopy } from "@/lib/client-journeys";
import { investmentMandate } from "@/lib/strategy";
import { localePath, ui, type SiteLocale } from "@/lib/site-data";

const copy = {
  ro: {
    eyebrow: "Colaborare",
    title: ["Oportunități", "de colaborare"],
    lead: "Dacă căutați un spațiu, doriți să propuneți un obiect sau să discutați un proiect comun, contactați-ne.",
    availableIndex: "Spații disponibile",
    availableNote: "Suprafețele și datele de disponibilitate sunt confirmate. Condițiile comerciale și tehnice se discută direct și nu se publică.",
    considerLabel: "Ce analizăm",
    partnerLabel: "Formate de colaborare",
    closing: "Contactați-ne și discutăm solicitarea dumneavoastră.",
    closingCta: "Contact",
  },
  ru: {
    eyebrow: "Сотрудничество",
    title: ["Возможности", "для сотрудничества"],
    lead: "Если вы ищете помещение, хотите предложить объект или обсудить совместный проект — свяжитесь с нами.",
    availableIndex: "Доступные площади",
    availableNote: "Площади и даты доступности подтверждены. Коммерческие и технические условия обсуждаются напрямую и не публикуются.",
    considerLabel: "Что рассматриваем",
    partnerLabel: "Форматы сотрудничества",
    closing: "Свяжитесь с нами — обсудим ваш запрос.",
    closingCta: "Контакты",
  },
  en: {
    eyebrow: "Working with MEGAPARC",
    title: ["Opportunities", "to work together"],
    lead: "If you are looking for a space, want to offer a property or discuss a joint project, get in touch.",
    availableIndex: "Available space",
    availableNote: "Areas and availability dates are confirmed. Commercial and technical terms are discussed directly and are not published.",
    considerLabel: "What we consider",
    partnerLabel: "Forms of cooperation",
    closing: "Get in touch and we will discuss your enquiry.",
    closingCta: "Contact",
  },
} as const;

export function OpportunitiesPage({ locale }: { locale: SiteLocale }) {
  const c = copy[locale];
  const p = (path: string) => localePath(locale, path);
  const [findSpace, submit, partnership] = clientJourneys;

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
        <nav className="portfolio__categories" aria-label={journeysCopy.kicker[locale]}>
          {clientJourneys.map((journey) => (
            <a key={journey.key} href={`#${journey.key}`}>{journey.no} {journey.title[locale]}</a>
          ))}
        </nav>
      </PageHero>

      <section className="pathway paper" id={findSpace.key}>
        <div className="shell">
          <SectionIndex no="02">{findSpace.no} · {findSpace.title[locale]}</SectionIndex>
          <div className="pathway__grid" data-reveal>
            <div>
              <h2 className="pathway__title">{findSpace.title[locale]}</h2>
              <p className="pathway__audience">{findSpace.audience[locale]}</p>
            </div>
            <div className="pathway__body">
              <p>{findSpace.lead[locale]}</p>
              <ul className="pathway__scope">
                {findSpace.scope[locale].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <SectionIndex no="">{c.availableIndex}</SectionIndex>
          <div className="pathway__list" data-reveal>
            {availableAssets.map((asset, index) => (
              <Link key={asset.slug} href={p(`/portfolio/${asset.slug}`)} className="pathway__row">
                <span>0{index + 1}</span>
                <span className="pathway__name">{asset.name}</span>
                <span className="pathway__meta">{asset.headline[locale]} · {asset.district[locale]}</span>
                <span className="pathway__area">{asset.availability!.area[locale]}</span>
                <span className="pathway__from">{asset.availability!.from ? `${ui.availableFrom[locale]} ${asset.availability!.from[locale]}` : asset.availability!.headline[locale]}</span>
                <span className="pathway__arrow" aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>
          <Note>{c.availableNote}</Note>
          <div style={{ marginTop: "2.5rem" }}>
            <ArrowLink href={`${p("/contact")}#${findSpace.anchor}`}>{ui.requestDetails[locale]}</ArrowLink>
          </div>
        </div>
      </section>

      <section className="pathway stone" id={submit.key}>
        <div className="shell">
          <SectionIndex no="03">{submit.no} · {submit.title[locale]}</SectionIndex>
          <div className="pathway__grid" data-reveal>
            <div>
              <h2 className="pathway__title">{submit.title[locale]}</h2>
              <p className="pathway__audience">{submit.audience[locale]}</p>
            </div>
            <div className="pathway__body">
              <p>{submit.lead[locale]}</p>
              <span className="label label--red">{investmentMandate.expression[locale]}</span>
              <p className="note" style={{ margin: 0 }}>{investmentMandate.note[locale]}</p>
              <span className="label label--red">{c.considerLabel}</span>
              <ul className="pathway__scope">
                {submit.scope[locale].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <ArrowLink href={`${p("/contact")}#${submit.anchor}`} strong>{submit.cta[locale]}</ArrowLink>
            </div>
          </div>
        </div>
      </section>

      <section className="pathway ink" id={partnership.key}>
        <div className="shell">
          <SectionIndex no="04" inverse>{partnership.no} · {partnership.title[locale]}</SectionIndex>
          <div className="pathway__grid" data-reveal>
            <div>
              <h2 className="pathway__title">{partnership.title[locale]}</h2>
              <p className="pathway__audience">{partnership.audience[locale]}</p>
            </div>
            <div className="pathway__body">
              <p>{partnership.lead[locale]}</p>
              <span className="label label--red">{c.partnerLabel}</span>
              <ul className="pathway__scope">
                {partnership.scope[locale].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <ArrowLink href={`${p("/contact")}#${partnership.anchor}`} inverse strong>{partnership.cta[locale]}</ArrowLink>
            </div>
          </div>
        </div>
      </section>

      <section className="closing paper">
        <div className="shell closing__grid" data-reveal>
          <span className="label label--red">05 / {c.closingCta}</span>
          <div>
            <p className="closing__statement">{c.closing}</p>
            <ArrowLink href={p("/contact")}>{ui.contactUs[locale]}</ArrowLink>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

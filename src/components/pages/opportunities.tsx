import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { ArrowLink, Note, PageHero, SectionIndex } from "@/components/primitives";
import { JourneysSection } from "@/components/sections/company-sections";
import { availableAssets } from "@/lib/assets";
import { clientJourneys, journeysCopy } from "@/lib/client-journeys";
import { investmentMandate } from "@/lib/strategy";
import { localePath, ui, type SiteLocale } from "@/lib/site-data";

const copy = {
  ro: {
    eyebrow: "Oportunități",
    title: ["Moduri de a lucra", "cu MEGAPARC."],
    lead: "Trei drumuri, pentru trei tipuri de interlocutori: companii care caută un spațiu, proprietari care propun o oportunitate și parteneri de capital sau de dezvoltare.",
    availableIndex: "Active cu disponibilitate confirmată",
    availableNote: "Suprafețele și datele de disponibilitate sunt confirmate. Condițiile comerciale și tehnice se discută direct, nu se publică.",
    routeLabel: "Traseu",
    considerLabel: "Ce poate lua în considerare MEGAPARC",
    partnerLabel: "Ce este prezentat public înainte de discuție",
    closing: "Un activ, o proprietate sau un parteneriat încep cu o discuție.",
    closingCta: "Contact",
  },
  ru: {
    eyebrow: "Возможности",
    title: ["Способы работать", "с MEGAPARC."],
    lead: "Три пути для трёх типов собеседников: компании, которые ищут помещение, владельцы, которые предлагают объект, и партнёры по капиталу или девелопменту.",
    availableIndex: "Активы с подтверждённой доступностью",
    availableNote: "Площади и даты доступности подтверждены. Коммерческие и технические условия обсуждаются напрямую и не публикуются.",
    routeLabel: "Маршрут",
    considerLabel: "Что может рассматривать MEGAPARC",
    partnerLabel: "Что представлено публично до разговора",
    closing: "Актив, объект или партнёрство начинаются с разговора.",
    closingCta: "Контакты",
  },
  en: {
    eyebrow: "Opportunities",
    title: ["Ways to work", "with MEGAPARC."],
    lead: "Three routes for three kinds of counterparty: companies looking for a space, owners submitting an opportunity, and capital or development partners.",
    availableIndex: "Assets with confirmed availability",
    availableNote: "Areas and availability dates are confirmed. Commercial and technical conditions are discussed directly and are not published.",
    routeLabel: "Route",
    considerLabel: "What MEGAPARC may consider",
    partnerLabel: "What is presented publicly before a conversation",
    closing: "An asset, a property or a partnership begins with a conversation.",
    closingCta: "Contact",
  },
} as const;

const partnerRoutes = ["/", "/approach", "/approach#megaparc-2030", "/portfolio", "/development", "/approach#capital", "/about#organisation", "/contact#partnership"];

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

      <JourneysSection locale={locale} no="02" id="routes" />

      <section className="pathway paper" id={findSpace.key}>
        <div className="shell">
          <SectionIndex no="03">{findSpace.no} · {findSpace.title[locale]}</SectionIndex>
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
          <SectionIndex no="04">{submit.no} · {submit.title[locale]}</SectionIndex>
          <div className="pathway__grid" data-reveal>
            <div>
              <h2 className="pathway__title">{submit.title[locale]}</h2>
              <p className="pathway__audience">{submit.audience[locale]}</p>
            </div>
            <div className="pathway__body">
              <p>{submit.lead[locale]}</p>
              <span className="label label--red">{investmentMandate.expression[locale]}</span>
              <p className="note" style={{ margin: 0 }}>{investmentMandate.text[locale]}</p>
              <span className="label label--red">{c.considerLabel}</span>
              <ul className="pathway__scope">
                {submit.scope[locale].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <span className="label">{c.routeLabel}</span>
              <ol className="journey__steps">
                {submit.steps[locale].map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
              <ArrowLink href={`${p("/contact")}#${submit.anchor}`} strong>{submit.cta[locale]}</ArrowLink>
            </div>
          </div>
        </div>
      </section>

      <section className="pathway ink" id={partnership.key}>
        <div className="shell">
          <SectionIndex no="05" inverse>{partnership.no} · {partnership.title[locale]}</SectionIndex>
          <div className="pathway__grid" data-reveal>
            <div>
              <h2 className="pathway__title">{partnership.title[locale]}</h2>
              <p className="pathway__audience">{partnership.audience[locale]}</p>
            </div>
            <div className="pathway__body">
              <p>{partnership.lead[locale]}</p>
              <span className="label label--red">{c.partnerLabel}</span>
              <ol className="pathway__scope">
                {partnership.steps[locale].map((step, index) => (
                  <li key={step}>
                    <Link href={p(partnerRoutes[index])} className="arrow-link arrow-link--inverse" style={{ borderBottom: 0, paddingBottom: 0, textTransform: "none", letterSpacing: "-.01em", fontSize: "1rem", fontWeight: 400 }}>
                      <span>{step}</span>
                    </Link>
                  </li>
                ))}
              </ol>
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
          <span className="label label--red">06 / {c.closingCta}</span>
          <div>
            <p className="closing__statement">{c.closing}</p>
            <ArrowLink href={p("/contact")}>{ui.contactUs[locale]}</ArrowLink>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

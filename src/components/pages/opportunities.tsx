import { ClosingFrame, Index, Movement, Opening, PropertyList, PropertyRow, Split, Statement } from "@/components/editorial";
import { PageShell } from "@/components/page-shell";
import { ArrowLink, Note } from "@/components/primitives";
import { availableAssets } from "@/lib/assets";
import { clientJourneys, journeysCopy } from "@/lib/client-journeys";
import { investmentMandate } from "@/lib/strategy";
import { localePath, publicAsset, ui, type SiteLocale } from "@/lib/site-data";

/**
 * OPPORTUNITIES — three situations, three formats:
 * I am looking for a space (property rows) · I have a property to offer
 * (image split) · Investment and partnership (black statement).
 */
const copy = {
  ro: {
    eyebrow: "Colaborare",
    title: ["Oportunități", "de colaborare"],
    lead: "Există trei motive principale pentru a contacta MEGAPARC: căutați un spațiu, aveți un obiect de propus sau doriți să discutați o investiție sau un parteneriat.",
    availableIndex: "Spații disponibile",
    availableNote: "Suprafețele și datele de disponibilitate sunt confirmate. Condițiile comerciale și tehnice se discută direct și nu se publică.",
    considerLabel: "Ce analizăm",
    partnerLabel: "Formate de colaborare",
    submitAlt: "Front comercial pe bulevard, Chișinău",
    closing: "Contactați-ne și discutăm solicitarea dumneavoastră.",
    closingCta: "Contact",
  },
  ru: {
    eyebrow: "Сотрудничество",
    title: ["Возможности", "для сотрудничества"],
    lead: "Есть три основные причины связаться с MEGAPARC: вы ищете помещение, хотите предложить объект или обсудить инвестиции и партнёрство.",
    availableIndex: "Доступные площади",
    availableNote: "Площади и даты доступности подтверждены. Коммерческие и технические условия обсуждаются напрямую и не публикуются.",
    considerLabel: "Что рассматриваем",
    partnerLabel: "Форматы сотрудничества",
    submitAlt: "Торговый фасад на бульваре, Кишинёв",
    closing: "Свяжитесь с нами — обсудим ваш запрос.",
    closingCta: "Контакты",
  },
  en: {
    eyebrow: "Working with MEGAPARC",
    title: ["Opportunities", "to work together"],
    lead: "There are three main reasons to contact MEGAPARC: you are looking for a space, you have a property to offer, or you want to discuss investment and partnership.",
    availableIndex: "Available space",
    availableNote: "Areas and availability dates are confirmed. Commercial and technical terms are discussed directly and are not published.",
    considerLabel: "What we consider",
    partnerLabel: "Forms of cooperation",
    submitAlt: "Boulevard retail frontage, Chișinău",
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
      <Opening eyebrow={c.eyebrow} title={<>{c.title[0]} <span className="muted-ink">{c.title[1]}</span></>} lead={c.lead}>
        <nav className="anchors" aria-label={journeysCopy.kicker[locale]}>
          {clientJourneys.map((journey) => (
            <a key={journey.key} href={`#${journey.key}`}>{journey.scenario[locale]}<b>{journey.no}</b></a>
          ))}
        </nav>
      </Opening>

      {/* 01 I am looking for a space — property rows */}
      <Movement tone="white" id={findSpace.key}>
        <div className="shell">
          <Statement no={findSpace.no} kicker={findSpace.scenario[locale]} title={findSpace.scenario[locale]} text={findSpace.lead[locale]} size="lg">
            <ul className="dash-list">
              {findSpace.scope[locale].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Statement>
          <Index>{c.availableIndex}</Index>
          <PropertyList>
            {availableAssets.map((asset, index) => (
              <PropertyRow
                key={asset.slug}
                href={p(`/portfolio/${asset.slug}`)}
                index={`0${index + 1}`}
                image={asset.media ? { src: asset.media.card, alt: "", position: asset.media.position } : undefined}
                name={asset.name}
                place={asset.district[locale]}
                kind={asset.positioning[locale]}
                line={asset.headline[locale]}
                meta={`${asset.availability!.area[locale]}${asset.availability!.from ? ` · ${ui.availableFrom[locale]} ${asset.availability!.from[locale]}` : ""}`}
                cta={ui.exploreAsset[locale]}
              />
            ))}
          </PropertyList>
          <div className="mv__foot mv__foot--split" data-reveal>
            <Note>{c.availableNote}</Note>
            <ArrowLink href={`${p("/contact")}#${findSpace.anchor}`} strong>{ui.requestDetails[locale]}</ArrowLink>
          </div>
        </div>
      </Movement>

      {/* 02 I have a property to offer — image split */}
      <Movement tone="stone" id={submit.key}>
        <Split media={{ src: publicAsset("/assets/home/focus-income.webp"), alt: c.submitAlt }} ratio="4 / 5" align="start">
          <Index no={submit.no}>{submit.scenario[locale]}</Index>
          <h2 className="split__title">{submit.scenario[locale]}</h2>
          <p className="split__text">{submit.lead[locale]}</p>
          <p className="split__kicker">{investmentMandate.expression[locale]} {investmentMandate.note[locale]}</p>
          <span className="idx idx--plain"><span className="idx__no">{c.considerLabel}</span></span>
          <ul className="dash-list">
            {submit.scope[locale].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <ArrowLink href={`${p("/contact")}#${submit.anchor}`} strong>{submit.cta[locale]}</ArrowLink>
        </Split>
      </Movement>

      {/* 03 Investment and partnership — black statement */}
      <Movement tone="ink" id={partnership.key}>
        <div className="shell">
          <Statement no={partnership.no} kicker={partnership.scenario[locale]} title={partnership.lead[locale]} size="xl" inverse>
            <p>{partnership.audience[locale]}</p>
            <span className="idx idx--plain idx--inverse"><span className="idx__no">{c.partnerLabel}</span></span>
            <ul className="dash-list dash-list--inverse">
              {partnership.scope[locale].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <ArrowLink href={`${p("/contact")}#${partnership.anchor}`} inverse strong>{partnership.cta[locale]}</ArrowLink>
          </Statement>
        </div>
      </Movement>

      <ClosingFrame tone="paper" kicker={c.closingCta} title={c.closing} links={[{ href: p("/contact"), label: ui.contactUs[locale], strong: true }]} />
    </PageShell>
  );
}

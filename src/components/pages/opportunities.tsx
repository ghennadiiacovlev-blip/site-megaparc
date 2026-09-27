import { PageShell } from "@/components/page-shell";
import { Button, Head, Hero, Intro, Kicker, Quote, Section, Split, Story, TextLink } from "@/components/ui";
import { portfolioAssets } from "@/lib/assets";
import { clientJourneys } from "@/lib/client-journeys";
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
  const availableAssets = portfolioAssets.filter((asset) => asset.availability && asset.media);

  return (
    <PageShell locale={locale}>
      <Hero size="page" media={{ src: publicAsset("/assets/home/hero-land.webp"), alt: c.submitAlt, position: "50% 60%" }} title={<>{c.title[0]} {c.title[1]}</>} line={c.eyebrow} />
      <Intro kicker={c.eyebrow} statement={c.lead}>
        <ul className="chips">
          {clientJourneys.map((journey) => (
            <li key={journey.key}><a href={`#${journey.key}`}>{journey.scenario[locale]}<b>{journey.no}</b></a></li>
          ))}
        </ul>
      </Intro>

      {/* 01 I AM LOOKING FOR A SPACE */}
      <Section id={findSpace.key}>
        <div className="shell">
          <Head kicker={`${findSpace.no} · ${findSpace.scenario[locale]}`} title={findSpace.lead[locale]} text={findSpace.scope[locale].join(" · ")} />
          <Kicker>{c.availableIndex}</Kicker>
          <div className="stories stories--list">
            {availableAssets.map((asset) => (
              <Story
                key={asset.slug}
                layout="row"
                href={p(`/portfolio/${asset.slug}`)}
                media={{ src: asset.media!.card, alt: `${asset.name} — ${asset.positioning[locale]}`, position: asset.media!.position }}
                name={asset.name}
                meta={[asset.district[locale], asset.positioning[locale], `${asset.availability!.area[locale]}${asset.availability!.from ? ` · ${ui.availableFrom[locale]} ${asset.availability!.from[locale]}` : ""}`]}
                line={asset.headline[locale]}
                cta={ui.exploreAsset[locale]}
              />
            ))}
          </div>
          <div className="sec__foot sec__foot--split" data-reveal>
            <p className="note">{c.availableNote}</p>
            <Button href={`${p("/contact")}#${findSpace.anchor}`}>{ui.requestDetails[locale]}</Button>
          </div>
        </div>
      </Section>

      {/* 02 I HAVE A PROPERTY TO OFFER */}
      <Split media={{ src: publicAsset("/assets/home/focus-income.webp"), alt: c.submitAlt }} tone="paper" id={submit.key} ratio="4 / 5">
        <Kicker>{submit.no} · {submit.scenario[locale]}</Kicker>
        <h2 className="h2">{submit.lead[locale]}</h2>
        <p>{investmentMandate.expression[locale]} {investmentMandate.note[locale]}</p>
        <p className="meta">{c.considerLabel}</p>
        <ul className="list list--plain">
          {submit.scope[locale].map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <Button href={`${p("/contact")}#${submit.anchor}`}>{submit.cta[locale]}</Button>
      </Split>

      {/* 03 INVESTMENT AND PARTNERSHIP */}
      <Section tone="ink" id={partnership.key}>
        <div className="shell fields" data-reveal>
          <div>
            <Kicker className="kicker--light">{partnership.no} · {partnership.scenario[locale]}</Kicker>
            <h2 className="h2">{partnership.lead[locale]}</h2>
            <p className="intro__text">{partnership.audience[locale]}</p>
          </div>
          <div>
            <span className="kicker kicker--light">{c.partnerLabel}</span>
            <ul className="list list--plain">
              {partnership.scope[locale].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <Button href={`${p("/contact")}#${partnership.anchor}`} variant="light">{partnership.cta[locale]}</Button>
          </div>
        </div>
      </Section>

      <Quote tone="paper" kicker={c.closingCta} statement={c.closing} action={<><Button href={p("/contact")}>{ui.contactUs[locale]}</Button><TextLink href={p("/portfolio")}>{ui.viewPortfolio[locale]}</TextLink></>} />
    </PageShell>
  );
}

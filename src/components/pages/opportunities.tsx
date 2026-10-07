import Link from "next/link";
import type { CSSProperties } from "react";
import { DemoLegend, DemoMark, Ledger, Opening, Val } from "@/components/experience";
import { AudienceRouterBlock, OwnerCompassBlock, SpaceMatcherBlock, propertyImage } from "@/components/journey-blocks";
import { PageShell } from "@/components/page-shell";
import { Button, Icon, TextLink } from "@/components/ui";
import { assetProfiles, creangaProfile, leasingProcess, mandate, tenantFit } from "@/data/demo-content";
import { audienceIntro, partnerCategories, partnerRelevance, partnerSteps } from "@/data/journeys";
import { portfolioAssets } from "@/lib/assets";
import { localePath, type SiteLocale } from "@/lib/site-data";

/**
 * OPPORTUNITIES — effortless routing (2026-10-07). The visitor never wonders
 * where to click: the page opens on the audience index, then each journey in
 * its own movement — space matching (#occupier), the owner compass (#owners),
 * investment and finance (#capital, links to the investor ladder), partnership
 * (#partners). Every journey ends in a prefilled, qualified enquiry.
 */
const copy = {
  ro: {
    label: "Colaborare",
    spaceLabel: "Am nevoie de un spațiu",
    spaceTitle: "Ce trebuie să facă spațiul pentru afacerea dumneavoastră?",
    spaceLead: "Nu pornim de la metri pătrați, ci de la ce deschideți. Alegeți formatul și ce este critic — vă arătăm ce se potrivește și de ce.",
    availLabel: "Disponibil acum și în curând",
    noPrice: "Condițiile comerciale se discută direct și nu se publică.",
    ownersLabel: "Am un obiect sau un teren",
    ownersTitle: "Vindeți, dezvoltați sau căutați un partener — mai întâi evaluăm.",
    ownersLead: "Spuneți-ne ce aveți și ce luați în calcul. Vă arătăm cum gândim și ce verificăm.",
    capitalLabel: "Investiții și finanțare",
    capitalTitle: "Capital pentru imobiliare care lucrează.",
    capitalLead: "Pentru bănci, investitori și family offices: cum luăm decizii, cum gestionăm riscul și ce raportăm.",
    ticket: "Volum per tranzacție",
    structures: "Structuri",
    geography: "Geografie",
    reply: "Primul răspuns",
    ladder: "Cum luăm decizii — pas cu pas",
    discussCapital: "Discută finanțarea",
    partnersLabel: "Parteneriat",
    partnersTitle: "Unde colaborăm.",
    partnersLead: "Fără logo-uri și fără promisiuni generale: categoriile cu care lucrăm și felul în care începe o discuție.",
    relevance: "Ce face un proiect relevant",
    how: "Cum începe o discuție",
    discussPartner: "Începe discuția",
    closeLabel: "Altceva?",
    closeTitle: "Căutați un loc de muncă sau doriți doar să ne scrieți?",
    routes: [["Cariere la MEGAPARC", "/careers", "work"], ["Formular de contact", "/contact", ""]],
  },
  ru: {
    label: "Сотрудничество",
    spaceLabel: "Мне нужно помещение",
    spaceTitle: "Что помещение должно делать для вашего бизнеса?",
    spaceLead: "Мы начинаем не с квадратных метров, а с того, что вы открываете. Выберите формат и что критично — покажем, что подходит и почему.",
    availLabel: "Доступно сейчас и в ближайшее время",
    noPrice: "Коммерческие условия обсуждаются напрямую и не публикуются.",
    ownersLabel: "У меня есть объект или земля",
    ownersTitle: "Продать, развивать или найти партнёра — сначала оценим.",
    ownersLead: "Расскажите, что у вас есть и что вы рассматриваете. Покажем, как мы думаем и что проверяем.",
    capitalLabel: "Инвестиции и финансирование",
    capitalTitle: "Капитал для недвижимости, которая работает.",
    capitalLead: "Для банков, инвесторов и семейных офисов: как мы принимаем решения, управляем риском и что отчитываем.",
    ticket: "Объём сделки",
    structures: "Структуры",
    geography: "География",
    reply: "Первичный ответ",
    ladder: "Как мы принимаем решения — шаг за шагом",
    discussCapital: "Обсудить финансирование",
    partnersLabel: "Партнёрство",
    partnersTitle: "Где мы сотрудничаем.",
    partnersLead: "Без логотипов и общих обещаний: с кем мы работаем и как начинается разговор.",
    relevance: "Что делает проект интересным",
    how: "Как начинается разговор",
    discussPartner: "Начать разговор",
    closeLabel: "Что-то другое?",
    closeTitle: "Ищете работу или просто хотите написать нам?",
    routes: [["Карьера в MEGAPARC", "/careers", "work"], ["Форма обращения", "/contact", ""]],
  },
  en: {
    label: "Work with us",
    spaceLabel: "I need a space",
    spaceTitle: "What does the space need to do for your business?",
    spaceLead: "We don't start from square metres but from what you are opening. Choose the format and what is critical — we show what fits and why.",
    availLabel: "Available now and soon",
    noPrice: "Commercial terms are discussed directly and are not published.",
    ownersLabel: "I have a property or land",
    ownersTitle: "Sell, develop or find a partner — first we assess.",
    ownersLead: "Tell us what you have and what you are considering. We show how we think and what we check.",
    capitalLabel: "Investment and finance",
    capitalTitle: "Capital for real estate that works.",
    capitalLead: "For banks, investors and family offices: how we decide, how we manage risk and what we report.",
    ticket: "Deal size",
    structures: "Structures",
    geography: "Geography",
    reply: "First response",
    ladder: "How we decide — step by step",
    discussCapital: "Discuss financing",
    partnersLabel: "Partnership",
    partnersTitle: "Where we collaborate.",
    partnersLead: "No logos and no general promises: who we work with and how a conversation starts.",
    relevance: "What makes a project relevant",
    how: "How a conversation starts",
    discussPartner: "Start the conversation",
    closeLabel: "Something else?",
    closeTitle: "Looking for a job, or just want to write to us?",
    routes: [["Careers at MEGAPARC", "/careers", "work"], ["Enquiry form", "/contact", ""]],
  },
} as const;

export function OpportunitiesPage({ locale }: { locale: SiteLocale }) {
  const c = copy[locale];
  const p = (path: string) => localePath(locale, path);

  return (
    <PageShell locale={locale} experience>
      {/* ROUTER — the page starts with the visitor's situation */}
      <section className="xp-pagehero" id="start">
        <div className="xp-shell">
          <Opening as="h1" no="00" label={c.label} title={audienceIntro.title[locale]} lead={audienceIntro.text[locale]} className="xp-opening--split xp-opening--hero" />
          <AudienceRouterBlock locale={locale} />
        </div>
      </section>

      {/* 01 SPACE — need-based matching */}
      <section className="xp-sec" id="occupier">
        <div className="xp-shell">
          <Opening no="01" label={c.spaceLabel} title={c.spaceTitle} lead={c.spaceLead} className="xp-opening--split" />
          <SpaceMatcherBlock locale={locale} />
          <div className="xp-block" data-reveal>
            <p className="xp-label">{c.availLabel}</p>
            <ul className="xp-avail">
              {portfolioAssets.map((asset) => {
                const profile = assetProfiles[asset.slug];
                return (
                  <li key={asset.slug}>
                    <Link href={p(`/portfolio/${asset.slug}`)}>
                      <figure className="xp-fig">{propertyImage(asset.slug, locale, "8rem", "opportunities.matcher.creanga-78")}</figure>
                      <strong>{asset.name}</strong>
                      <span>
                        {profile.area.value[locale]} · {profile.availability.value[locale]}
                        {profile.availability.status === "DEMO" ? <DemoMark /> : null}
                        <br />
                        {tenantFit[asset.slug].reason[locale]}
                      </span>
                      <Icon name="arrow" size={18} />
                    </Link>
                  </li>
                );
              })}
            </ul>
            <p className="xp-muted xp-note">{c.noPrice} <Val point={leasingProcess.reply} locale={locale} /></p>
            {creangaProfile.district.status === "DEMO" ? <DemoLegend locale={locale} /> : null}
          </div>
        </div>
      </section>

      {/* 02 OWNERS — compass */}
      <section className="xp-sec xp-sec--warm" id="owners">
        <div className="xp-shell">
          <Opening no="02" label={c.ownersLabel} title={c.ownersTitle} lead={c.ownersLead} className="xp-opening--split" />
          <OwnerCompassBlock locale={locale} />
        </div>
      </section>

      {/* 03 CAPITAL — a burgundy moment */}
      <section className="xp-sec xp-sec--burgundy" id="capital">
        <div className="xp-shell">
          <Opening no="03" label={c.capitalLabel} title={c.capitalTitle} lead={c.capitalLead} tone="dark" className="xp-opening--split" />
          <div data-reveal>
            <Ledger locale={locale} tone="dark" items={[
              { label: c.ticket, point: mandate.ticket },
              { label: c.structures, point: mandate.structures },
              { label: c.geography, point: mandate.geography },
              { label: c.reply, point: mandate.reply },
            ]} />
            <div className="xp-actions xp-actions--top">
              <Button href={`${p("/contact")}?subject=capital#investors`} variant="light">{c.discussCapital}</Button>
              <TextLink href={`${p("/approach")}#investors`} className="tlink--light">{c.ladder}</TextLink>
            </div>
          </div>
        </div>
      </section>

      {/* 04 PARTNERS */}
      <section className="xp-sec" id="partners">
        <div className="xp-shell">
          <Opening no="04" label={c.partnersLabel} title={c.partnersTitle} lead={c.partnersLead} className="xp-opening--split" />
          <ul className="xp-cells" data-reveal>
            {partnerCategories.map((cat) => (
              <li key={cat.key}>
                <strong>{cat.label[locale]}</strong>
                <span>{cat.how[locale]}</span>
              </li>
            ))}
          </ul>
          <div className="xp-split xp-split--text xp-block">
            <div data-reveal>
              <p className="xp-label">{c.relevance}</p>
              <ul className="xp-ticks">
                {partnerRelevance.map((line) => (
                  <li key={line.en}>{line[locale]}</li>
                ))}
              </ul>
            </div>
            <div data-reveal>
              <p className="xp-label">{c.how}</p>
              <ol className="xp-process xp-process--stack" style={{ "--n": partnerSteps.length } as CSSProperties}>
                {partnerSteps.map((step) => (
                  <li key={step.title.en}>
                    <h3>{step.title[locale]}</h3>
                    <p>{step.text[locale]}</p>
                  </li>
                ))}
              </ol>
              <div className="xp-actions xp-actions--top">
                <Button href={`${p("/contact")}?subject=partnership#partnership`}>{c.discussPartner}</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CLOSE */}
      <section className="xp-sec xp-sec--stone xp-sec--tight">
        <div className="xp-shell xp-close">
          <div data-reveal>
            <p className="xp-eyebrow"><span className="xp-eyebrow__no">05</span><span>{c.closeLabel}</span></p>
            <h2 className="xp-close__title">{c.closeTitle}</h2>
          </div>
          <nav className="xp-close__routes" aria-label={c.closeLabel} data-reveal>
            {c.routes.map(([label, path, anchor]) => (
              <Link key={label} href={anchor ? `${p(path)}#${anchor}` : p(path)}>
                {label}
                <Icon name="arrow" size={18} />
              </Link>
            ))}
          </nav>
        </div>
      </section>
    </PageShell>
  );
}


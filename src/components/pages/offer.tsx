import Link from "next/link";
import type { CSSProperties } from "react";
import { ConceptImage, MaskTitle, Opening, Val } from "@/components/experience";
import { EnquiryFormBlock, OwnerCompassBlock } from "@/components/journey-blocks";
import { PageShell } from "@/components/page-shell";
import { Button, Icon, TextLink } from "@/components/ui";
import { acquisitionProcess, company } from "@/data/demo-content";
import { acquisitionCriteria, acquisitionTypes, geography } from "@/lib/business";
import { isPreviewBuild, localePath, publicAsset, type SiteLocale } from "@/lib/site-data";

/**
 * OFFER A PROPERTY — MEGAPARC buys real estate and land (OWNER correction
 * 2026-10-08; journey C: "I have land for sale — can I understand that
 * MEGAPARC buys / develops land and submit it?").
 * What we buy → what we check → the owner compass (sell · develop together ·
 * not sure) → a real example → the process → the form (property subject only).
 * Nothing here offers to manage someone else's property.
 */
const copy = {
  ro: {
    label: "Propune un obiect",
    title: ["Aveți o clădire sau un teren?", "MEGAPARC cumpără."],
    lead: "Cumpărăm clădiri comerciale, clădiri care cer o nouă viață și terenuri pentru dezvoltare — și le dezvoltăm noi. Trimiteți obiectul și primiți o primă evaluare.",
    send: "Trimite obiectul",
    how: "Ce verificăm",
    buyLabel: "Ce cumpărăm",
    buyTitle: "Patru tipuri de obiecte.",
    checkLabel: "Ce verificăm",
    checkTitle: "Șase întrebări înainte de orice ofertă.",
    compassLabel: "Situația dumneavoastră",
    compassTitle: "Spuneți ce aveți — vă arătăm cum gândim.",
    processLabel: "Cum decurge",
    processTitle: "De la primul mesaj la decizie.",
    steps: [["Trimiteți obiectul", "Adresa, suprafața, documentele pe care le aveți."], ["Prima discuție", "Vă sună persoana care evaluează obiectul."], ["Vizita și documentele", "Pe obiect; materialele se schimbă sub acord de confidențialitate."], ["Evaluarea", "Juridic, tehnic, piață — și ce poate deveni obiectul."], ["Decizia", "O ofertă argumentată sau un răspuns clar."]],
    reply: "Primul răspuns",
    mailbox: "Propunerile ajung la",
    formLabel: "Formular",
    formTitle: "Descrieți obiectul.",
    closeLabel: "Altceva?",
    closeTitle: "Căutați un spațiu sau vreți să lucrați la MEGAPARC?",
    routes: [["Spații de închiriat", "/leasing"], ["Proiectele noastre", "/projects"], ["Cariere", "/careers"]],
  },
  ru: {
    label: "Предложить объект",
    title: ["Есть здание или земля?", "MEGAPARC покупает."],
    lead: "Мы покупаем коммерческие здания, здания, которым нужна новая жизнь, и землю под развитие — и развиваем их сами. Отправьте объект и получите первичную оценку.",
    send: "Отправить объект",
    how: "Что мы проверяем",
    buyLabel: "Что покупаем",
    buyTitle: "Четыре типа объектов.",
    checkLabel: "Что проверяем",
    checkTitle: "Шесть вопросов до любого предложения.",
    compassLabel: "Ваша ситуация",
    compassTitle: "Расскажите, что у вас есть, — покажем, как мы думаем.",
    processLabel: "Как это происходит",
    processTitle: "От первого сообщения до решения.",
    steps: [["Отправьте объект", "Адрес, площадь, документы, которые есть."], ["Первый разговор", "Звонит тот, кто оценивает объект."], ["Выезд и документы", "На объекте; материалы — под соглашение о конфиденциальности."], ["Оценка", "Право, техника, рынок — и чем объект может стать."], ["Решение", "Аргументированное предложение или ясный ответ."]],
    reply: "Первичный ответ",
    mailbox: "Предложения получает",
    formLabel: "Форма",
    formTitle: "Опишите объект.",
    closeLabel: "Другое?",
    closeTitle: "Ищете помещение или хотите работать в MEGAPARC?",
    routes: [["Помещения в аренду", "/leasing"], ["Наши проекты", "/projects"], ["Вакансии", "/careers"]],
  },
  en: {
    label: "Offer a property",
    title: ["Own a building or land?", "MEGAPARC buys."],
    lead: "We buy commercial buildings, buildings that need a new life and land for development — and develop them ourselves. Send us the property and get a first assessment.",
    send: "Send the property",
    how: "What we check",
    buyLabel: "What we buy",
    buyTitle: "Four kinds of property.",
    checkLabel: "What we check",
    checkTitle: "Six questions before any offer.",
    compassLabel: "Your situation",
    compassTitle: "Tell us what you have — we show how we think.",
    processLabel: "How it works",
    processTitle: "From the first message to a decision.",
    steps: [["Send the property", "Address, area, the documents you have."], ["A first call", "From the person who assesses the property."], ["Site visit and documents", "On site; materials exchanged under a confidentiality agreement."], ["Assessment", "Legal, technical, market — and what the property could become."], ["Decision", "A reasoned offer or a clear answer."]],
    reply: "First reply",
    mailbox: "Offers go to",
    formLabel: "Form",
    formTitle: "Describe the property.",
    closeLabel: "Something else?",
    closeTitle: "Looking for a space, or want to work at MEGAPARC?",
    routes: [["Space to lease", "/leasing"], ["Our projects", "/projects"], ["Careers", "/careers"]],
  },
} as const;

export function OfferPage({ locale }: { locale: SiteLocale }) {
  const c = copy[locale];
  const p = (path: string) => localePath(locale, path);

  return (
    <PageShell locale={locale} variant="overlay" experience mainClassName="of-page">
      {/* HERO */}
      <section className="xp-hero xp-hero--page" data-xp-hero>
        <div className="xp-hero__media">
          <div className="xp-hero__frame is-active">
            <ConceptImage id="offer.hero" locale={locale} priority />
          </div>
        </div>
        <div className="xp-hero__veil" aria-hidden="true" />
        <div className="xp-shell xp-hero__copy">
          <span className="xp-flag xp-flag--light">{c.label}</span>
          <MaskTitle as="h1" className="xp-hero__title" lines={[...c.title]} />
          <p className="xp-hero__lead">{c.lead}</p>
          <div className="xp-actions">
            <Button href="#form" variant="light">{c.send}</Button>
            <TextLink href="#check" className="tlink--light">{c.how}</TextLink>
          </div>
        </div>
      </section>

      {/* WHAT WE BUY */}
      <section className="xp-sec">
        <div className="xp-shell">
          <Opening no="01" label={c.buyLabel} title={c.buyTitle} lead={geography.text[locale]} className="xp-opening--split" />
          <div className="of-buy">
            <ol className="of-buy__list">
              {acquisitionTypes.map((type, index) => (
                <li key={type.key} data-reveal>
                  <span className="of-buy__no">{String(index + 1).padStart(2, "0")}</span>
                  <h3>{type.title[locale]}</h3>
                  <p>{type.text[locale]}</p>
                </li>
              ))}
            </ol>
            <figure className="xp-fig of-buy__figure" style={{ "--ratio": "4 / 5" } as CSSProperties} data-reveal>
              <ConceptImage id="offer.land" locale={locale} sizes="(min-width: 1024px) 40vw, 100vw" />
            </figure>
          </div>
        </div>
      </section>

      {/* WHAT WE CHECK */}
      <section className="xp-sec xp-sec--stone" id="check">
        <div className="xp-shell xp-split xp-split--text">
          <div data-reveal>
            <p className="xp-eyebrow"><span className="xp-eyebrow__no">02</span><span>{c.checkLabel}</span></p>
            <h2 className="xp-split__title xp-split__title--gap">{c.checkTitle}</h2>
          </div>
          <ol className="xp-numbered" data-reveal>
            {acquisitionCriteria.map((item) => (
              <li key={item.en}><h3>{item[locale]}</h3></li>
            ))}
          </ol>
        </div>
      </section>

      {/* OWNER COMPASS */}
      <section className="xp-sec xp-sec--warm">
        <div className="xp-shell">
          <Opening no="03" label={c.compassLabel} title={c.compassTitle} />
          {/* Plain link (full reload): add the base path and the export's trailing slash ourselves. */}
          <OwnerCompassBlock locale={locale} formHref={`${publicAsset(p("/offer"))}${isPreviewBuild ? "/" : ""}`} />
        </div>
      </section>

      {/* PROCESS */}
      <section className="xp-sec">
        <div className="xp-shell">
          <Opening no="04" label={c.processLabel} title={c.processTitle} className="xp-opening--split" />
          <ol className="xp-process" style={{ "--n": c.steps.length } as CSSProperties} data-reveal>
            {c.steps.map(([title, text]) => (
              <li key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
          <dl className="lx-facts" data-reveal>
            <div><dt>{c.reply}</dt><dd><Val point={acquisitionProcess.reply} locale={locale} /></dd></div>
            <div><dt>{c.mailbox}</dt><dd><Val point={company.emails.acquisitions} locale={locale} /></dd></div>
          </dl>
        </div>
      </section>

      {/* FORM */}
      <section className="xp-sec xp-sec--warm" id="form">
        <div className="xp-shell">
          <Opening no="05" label={c.formLabel} title={c.formTitle} />
          <EnquiryFormBlock locale={locale} initial="property" only={["property"]} />
        </div>
      </section>

      {/* CLOSE */}
      <section className="xp-sec xp-sec--ink">
        <div className="xp-shell xp-close">
          <div data-reveal>
            <p className="xp-eyebrow"><span className="xp-eyebrow__no">06</span><span>{c.closeLabel}</span></p>
            <h2 className="xp-close__title">{c.closeTitle}</h2>
          </div>
          <nav className="xp-close__routes" aria-label={c.closeLabel} data-reveal>
            {c.routes.map(([label, path]) => (
              <Link key={path} href={p(path)}>
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

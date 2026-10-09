import Link from "next/link";
import { DemoLegend, Opening, Val } from "@/components/experience";
import { EnquiryFormBlock } from "@/components/journey-blocks";
import { PageShell } from "@/components/page-shell";
import { company, leasingProcess } from "@/data/demo-content";
import { Icon } from "@/components/ui";
import { brand, localePath, type SiteLocale } from "@/lib/site-data";

/**
 * CONTACT — calm, routing first (final craft pass 2026-10-08).
 * The first screen is a statement and three routes (leasing · offer a property
 * or land · vacancies); the form follows as the fourth way in, adapting to its
 * subject (space · property or land · careers · partnership or other), with the
 * details and what happens next. Mailboxes and telephone are DEMO
 * and shown as plain text — no mailto, no tel, nothing is routed anywhere.
 */
const copy = {
  ro: {
    label: "Contact",
    title: "Să stăm de vorbă.",
    lead: "Alegeți direcția — sau scrieți-ne mai jos.",
    routes: [["Închiriere", "Găsiți un spațiu", "/leasing#available"], ["Parteneriat investițional", "Discutăm o oportunitate", "#partnership"], ["Propuneți un obiect sau un teren", "Trimiteți informațiile", "/offer#form"], ["Cariere", "Vezi posturile", "/careers#positions"], ["Întrebare generală", "Scrieți-ne", "#question"]],
    formLabel: "Scrieți-ne",
    formTitle: "Sau descrieți sarcina — răspunde echipa potrivită.",
    details: "Date de contact",
    company: "Companie",
    office: "Birou",
    general: "General",
    acquisitions: "Propuneri de obiecte",
    leasing: "Închiriere",
    careers: "Cariere",
    phone: "Telefon",
    hours: "Program",
    nextLabel: "Ce urmează",
    next: [["Citim solicitarea", "O persoană din echipa responsabilă, nu un robot."], ["Vă răspundem", "Cu întrebări concrete sau o primă propunere."], ["Ne întâlnim", "Pe obiect, la birou sau online — cum vă este comod."]],
  },
  ru: {
    label: "Контакты",
    title: "Поговорим о задаче.",
    lead: "Выберите направление — или опишите задачу в форме ниже.",
    routes: [["Аренда", "Найти помещение", "/leasing#available"], ["Инвестиционное партнёрство", "Обсудить возможность", "#partnership"], ["Предложить объект или землю", "Отправить информацию", "/offer#form"], ["Вакансии", "Смотреть вакансии", "/careers#positions"], ["Общий вопрос", "Написать нам", "#question"]],
    formLabel: "Написать нам",
    formTitle: "Или опишите задачу — ответит нужная команда.",
    details: "Контактные данные",
    company: "Компания",
    office: "Офис",
    general: "Общие вопросы",
    acquisitions: "Предложения объектов",
    leasing: "Аренда",
    careers: "Карьера",
    phone: "Телефон",
    hours: "Часы работы",
    nextLabel: "Что будет дальше",
    next: [["Читаем запрос", "Его читает человек из ответственной команды, а не робот."], ["Отвечаем", "С конкретными вопросами или первым предложением."], ["Встречаемся", "На объекте, в офисе или онлайн — как вам удобно."]],
  },
  en: {
    label: "Contact",
    title: "Let's talk it through.",
    lead: "Choose a route — or write to us below.",
    routes: [["Leasing", "Find a space", "/leasing#available"], ["Investment partnership", "Discuss an opportunity", "#partnership"], ["Offer a property or land", "Send the details", "/offer#form"], ["Careers", "See vacancies", "/careers#positions"], ["General question", "Write to us", "#question"]],
    formLabel: "Write to us",
    formTitle: "Or describe the task — the right team replies.",
    details: "Contact details",
    company: "Company",
    office: "Office",
    general: "General",
    acquisitions: "Property offers",
    leasing: "Leasing",
    careers: "Careers",
    phone: "Telephone",
    hours: "Hours",
    nextLabel: "What happens next",
    next: [["We read your request", "A person from the team responsible, not a robot."], ["We reply", "With specific questions or a first proposal."], ["We meet", "On site, at the office or online — as suits you."]],
  },
} as const;

export function ContactPage({ locale }: { locale: SiteLocale }) {
  const c = copy[locale];
  const rows = [
    [c.company, company.legalName],
    [c.office, company.city],
    [c.general, company.emails.office],
    [c.leasing, company.emails.leasing],
    [c.acquisitions, company.emails.acquisitions],
    [c.careers, company.emails.careers],
    [c.hours, company.hours],
  ] as const;

  return (
    <PageShell locale={locale} experience mainClassName="xp-contact">
      <section className="xp-pagehero xp-sh">
        <div className="xp-shell xp-sh__grid">
          <p className="xp-eyebrow xp-sh__eyebrow"><span className="xp-eyebrow__no">{brand.name}</span><span>{c.label}</span></p>
          <h1 className="xp-display-title xp-sh__title">{c.title}</h1>
          <p className="xp-pagehero__lead xp-sh__lead">{c.lead}</p>
          <nav className="xp-sh__aside xp-routes" aria-label={c.label}>
            {c.routes.map(([label, action, href]) => {
              const [path, hash] = href.split("#");
              return (
                <Link key={label} href={path ? `${localePath(locale, path)}${hash ? `#${hash}` : ""}` : `#${hash}`}>
                  <span className="xp-routes__label">{label}</span>
                  <span className="xp-routes__action">{action}<Icon /></span>
                </Link>
              );
            })}
          </nav>
        </div>
      </section>

      <section className="xp-sec xp-sec--warm xp-contact__form" id="write">
        <div className="xp-shell">
          <Opening no="01" label={c.formLabel} title={c.formTitle} />
        </div>
        <div className="xp-shell xp-contact__grid">
          <EnquiryFormBlock locale={locale} />
          <aside className="xp-contact__aside">
            <p className="xp-label">{c.details}</p>
            <dl className="xp-details">
              {rows.map(([label, point]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd><Val point={point} locale={locale} /></dd>
                </div>
              ))}
            </dl>
            <DemoLegend locale={locale} />
            <p className="xp-label xp-label--gap">{c.nextLabel}</p>
            <ol className="xp-process xp-process--stack">
              {c.next.map(([title, text], index) => (
                <li key={title}>
                  <h3>{title}</h3>
                  <p>{text}{index === 1 ? <> <Val point={leasingProcess.reply} locale={locale} /></> : null}</p>
                </li>
              ))}
            </ol>
          </aside>
        </div>
      </section>
    </PageShell>
  );
}

import { DemoLegend, Val } from "@/components/experience";
import { EnquiryFormBlock } from "@/components/journey-blocks";
import { PageShell } from "@/components/page-shell";
import { company, leasingProcess } from "@/data/demo-content";
import { brand, type SiteLocale } from "@/lib/site-data";

/**
 * CONTACT — extremely clean, almost no motion (2026-10-07).
 * One light screen: the routing (four subjects: space · property or land ·
 * careers · partnership or other — OWNER correction 2026-10-08), the form that adapts to the
 * subject, the details and what happens next. Mailboxes and telephone are DEMO
 * and shown as plain text — no mailto, no tel, nothing is routed anywhere.
 */
const copy = {
  ro: {
    label: "Contact",
    title: "Scrieți-ne despre ce aveți nevoie.",
    lead: "Alegeți subiectul — formularul se adaptează solicitării, iar mesajul ajunge direct la echipa responsabilă.",
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
    next: [["Citim solicitarea", "O persoană din echipa responsabilă, nu un robot."], ["Vă răspundem", "Cu întrebări concrete sau o primă propunere."], ["Ne întâlnim", "Pe obiect, la birou sau online — cum vă este comod."]],
  },
  ru: {
    label: "Контакты",
    title: "Напишите, что вам нужно.",
    lead: "Выберите тему — форма подстроится, а сообщение попадёт сразу к нужной команде.",
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
    next: [["Читаем запрос", "Его читает человек из ответственной команды, а не робот."], ["Отвечаем", "С конкретными вопросами или первым предложением."], ["Встречаемся", "На объекте, в офисе или онлайн — как вам удобно."]],
  },
  en: {
    label: "Contact",
    title: "Tell us what you need.",
    lead: "Choose the subject — the form adapts to your request, and the message goes straight to the team responsible.",
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
    next: [["We read your request", "A person from the team responsible, not a robot."], ["We reply", "With specific questions or a first proposal."], ["We meet", "On site, at the office or online — as suits you."]],
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
    [c.phone, company.phone],
    [c.hours, company.hours],
  ] as const;

  return (
    <PageShell locale={locale} experience mainClassName="xp-contact">
      <section className="xp-pagehero xp-pagehero--contact">
        <div className="xp-shell xp-pagehero__grid">
          <p className="xp-eyebrow"><span className="xp-eyebrow__no">{brand.name}</span><span>{c.label}</span></p>
          <div>
            <h1 className="xp-pagehero__title">{c.title}</h1>
            <p className="xp-pagehero__lead xp-pagehero__lead--gap">{c.lead}</p>
          </div>
        </div>
      </section>

      <section className="xp-sec xp-sec--flush-top xp-sec--warm">
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

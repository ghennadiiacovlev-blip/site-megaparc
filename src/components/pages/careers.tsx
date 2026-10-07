import { existsSync } from "node:fs";
import { join } from "node:path";
import Link from "next/link";
import type { CSSProperties } from "react";
import { CareersFilm } from "@/components/careers-film";
import { ConceptImage, DemoMark, MaskTitle, Opening, conceptMedia } from "@/components/experience";
import { disciplineLabel } from "@/components/journey-blocks";
import { PageShell } from "@/components/page-shell";
import { ArtImage } from "@/components/primitives";
import { Button, Icon, TextLink } from "@/components/ui";
import { company, cultureStatement, roleStories } from "@/data/demo-content";
import { developmentProjects, portfolioAssets } from "@/lib/assets";
import { employerBrand, openVacancies } from "@/lib/careers";
import { localePath, publicAsset, type SiteLocale } from "@/lib/site-data";

/**
 * CAREERS — emotional contrast to the institutional pages (2026-10-07).
 * The candidate's real question — "what will I actually work on?" — is
 * answered with the real properties and projects first, then four pillars in a
 * walking rhythm, then role stories (DEMO: work described, never a person),
 * then the real Rabota.md vacancies as a clean list.
 */
const FILM = "/assets/careers/megaparc-careers-film.mp4";

const copy = {
  ro: {
    title: ["Construim echipa", "care construiește viitorul."],
    lead: "Obiecte reale, proiecte reale, responsabilitate reală — de la șantier la decizia de investiție.",
    roles: "Posturi deschise",
    work: "Ce veți face",
    workLabel: "La ce veți lucra",
    workTitle: "Pe obiecte și proiecte pe care le puteți vizita mâine.",
    workLines: {
      "dacia-31": "Pregătirea clădirii pentru un nou utilizator din 2027: audit, instalații, planificare.",
      "moscova-9": "Lucrul cu un brand-chiriaș: fațadă, logistică, exploatare.",
      "moscova-20": "Lansarea spațiului pentru un nou format din august 2026.",
      "creanga-78": "Administrarea unei clădiri cu mulți chiriași.",
      vatra: "Construcție: calitate, buget, grafic.",
      "drochia-gateway": "Evaluarea terenului: urbanism, concepte, economie.",
    } as Record<string, string>,
    pillars: [
      ["Echipă", "Investiții, finanțe, dezvoltare, construcție și exploatare stau la aceeași masă. O decizie bună are nevoie de toate cinci."],
      ["Responsabilitate pe proiect", "Fiecare proiect are un om care răspunde de el — de buget, de termene și de calitatea care rămâne după predare."],
      ["Dezvoltare profesională", "Lucrați pe toată durata de viață a unui obiect: de la analiză la construcție și exploatare. Asta formează specialiști compleți."],
      ["Teren + birou", "O parte a zilei pe șantier sau în clădire, o parte la calcule și decizii. Rezultatul se vede pe stradă, nu doar în raport."],
    ],
    pillarsLabel: "Cum se lucrează la MEGAPARC",
    storiesLabel: "Roluri — cum arată munca",
    storiesTitle: "Patru roluri, descrise prin ce faceți, nu prin titluri.",
    storiesNote: "Exemple de roluri pentru previzualizare: descriu munca, nu persoane reale.",
    owns: "Răspundeți de",
    positionsLabel: "Posturi deschise",
    positionsTitle: (n: number) => `${String(n).padStart(2, "0")} posturi deschise acum.`,
    view: "Vezi postul pe Rabota.md",
    applyLabel: "Candidatură",
    applyTitle: "Nu ați găsit rolul potrivit?",
    applyText: "Trimiteți un CV și spuneți-ne direcția care vă interesează. Ne întoarcem la el când apare un rol potrivit.",
    applyCta: "Trimite CV-ul",
  },
  ru: {
    title: ["Строим команду,", "которая строит будущее."],
    lead: "Реальные объекты, реальные проекты, реальная ответственность — от стройплощадки до инвестиционного решения.",
    roles: "Открытые вакансии",
    work: "Чем вы будете заниматься",
    workLabel: "Над чем вы будете работать",
    workTitle: "На объектах и проектах, которые можно увидеть завтра.",
    workLines: {
      "dacia-31": "Подготовка здания к новому пользователю с 2027 года: аудит, инженерия, планировки.",
      "moscova-9": "Работа с брендом-арендатором: фасад, логистика, эксплуатация.",
      "moscova-20": "Запуск помещения под новый формат с августа 2026 года.",
      "creanga-78": "Управление многоарендным зданием.",
      vatra: "Строительство: качество, бюджет, график.",
      "drochia-gateway": "Оценка участка: градостроительство, концепции, экономика.",
    } as Record<string, string>,
    pillars: [
      ["Команда", "Инвестиции, финансы, девелопмент, строительство и эксплуатация — за одним столом. Хорошему решению нужны все пять."],
      ["Ответственность за проект", "У каждого проекта есть человек, который за него отвечает: за бюджет, сроки и качество, которое остаётся после сдачи."],
      ["Профессиональный рост", "Вы работаете на всём жизненном цикле объекта — от анализа до строительства и эксплуатации. Так вырастают специалисты широкого профиля."],
      ["Объект + офис", "Часть дня — на площадке или в здании, часть — над расчётами и решениями. Результат виден на улице, а не только в отчёте."],
    ],
    pillarsLabel: "Как работают в MEGAPARC",
    storiesLabel: "Роли — как выглядит работа",
    storiesTitle: "Четыре роли — через то, что вы делаете, а не через должности.",
    storiesNote: "Примеры ролей для превью: описывают работу, а не реальных людей.",
    owns: "Вы отвечаете за",
    positionsLabel: "Открытые вакансии",
    positionsTitle: (n: number) => `${String(n).padStart(2, "0")} открытых вакансий сейчас.`,
    view: "Вакансия на Rabota.md",
    applyLabel: "Отклик",
    applyTitle: "Не нашли свою роль?",
    applyText: "Отправьте резюме и укажите интересующее направление. Мы вернёмся к нему, когда появится подходящая позиция.",
    applyCta: "Отправить резюме",
  },
  en: {
    title: ["We build the team", "that builds the future."],
    lead: "Real properties, real projects, real responsibility — from the building site to the investment decision.",
    roles: "Open vacancies",
    work: "What you would work on",
    workLabel: "What you will work on",
    workTitle: "On properties and projects you could visit tomorrow.",
    workLines: {
      "dacia-31": "Preparing the building for a new occupier from 2027: audit, services, layouts.",
      "moscova-9": "Working with a brand tenant: facade, logistics, operations.",
      "moscova-20": "Launching the space for a new format from August 2026.",
      "creanga-78": "Running a multi-tenant building.",
      vatra: "Construction: quality, budget, schedule.",
      "drochia-gateway": "Assessing the site: planning, concepts, economics.",
    } as Record<string, string>,
    pillars: [
      ["Team", "Investment, finance, development, construction and operations at one table. A good decision needs all five."],
      ["Project responsibility", "Every project has a person accountable for it — for budget, schedule and the quality that stays after handover."],
      ["Career development", "You work across a property's whole life: from analysis to construction and operation. That is how all-round specialists grow."],
      ["Field + office", "Part of the day on site or in the building, part on numbers and decisions. The result shows on the street, not only in a report."],
    ],
    pillarsLabel: "How work is done at MEGAPARC",
    storiesLabel: "Roles — what the work looks like",
    storiesTitle: "Four roles, described by what you do, not by titles.",
    storiesNote: "Example roles for the preview: they describe the work, not real people.",
    owns: "You own",
    positionsLabel: "Open vacancies",
    positionsTitle: (n: number) => `${String(n).padStart(2, "0")} open vacancies right now.`,
    view: "View the role on Rabota.md",
    applyLabel: "Application",
    applyTitle: "Didn't find your role?",
    applyText: "Send a CV and tell us which area interests you. We come back to it when a suitable role opens.",
    applyCta: "Send a CV",
  },
};

const pillarImages = ["careers.team", "careers.responsibility", "careers.growth", "careers.field"];

function filmSource() {
  return existsSync(join(process.cwd(), "public", FILM)) ? publicAsset(FILM) : null;
}

export function CareersPage({ locale }: { locale: SiteLocale }) {
  const c = copy[locale];
  const p = (path: string) => localePath(locale, path);
  const film = filmSource();
  const work = [
    ...portfolioAssets.map((asset) => ({ key: asset.slug, name: asset.name, href: p(`/portfolio/${asset.slug}`), media: asset.media })),
    ...developmentProjects.map((project) => ({ key: project.slug, name: project.name, href: p(`/development/${project.slug}`), media: project.media })),
  ];

  return (
    <PageShell locale={locale} variant="overlay" experience>
      {/* HERO — people and architecture (brand film when supplied) */}
      <section className="xp-hero" data-xp-hero id="careers-hero">
        <div className="xp-hero__media">
          <div className="xp-hero__frame is-active">
            {film ? <CareersFilm src={film} poster={conceptMedia("cv-hall").src} alt="" /> : <ConceptImage id="careers.hero" locale={locale} priority />}
          </div>
        </div>
        <div className="xp-hero__veil" aria-hidden="true" />
        <div className="xp-shell xp-hero__copy">
          <p className="xp-hero__line">{employerBrand.kicker[locale]}</p>
          <MaskTitle as="h1" className="xp-hero__title xp-hero__title--soft" lines={[...c.title]} />
          <p className="xp-hero__lead">{c.lead}</p>
          <div className="xp-actions">
            <Button href="#positions" variant="light">{c.roles}</Button>
            <Button href="#work" variant="ghost-light">{c.work}</Button>
          </div>
        </div>
      </section>

      {/* WHAT YOU WILL WORK ON — real assets and projects */}
      <section className="xp-sec xp-sec--warm" id="work">
        <div className="xp-shell">
          <p className="xp-statement xp-culture" data-reveal>{cultureStatement.value[locale]}<DemoMark /></p>
          <Opening no="01" label={c.workLabel} title={c.workTitle} lead={employerBrand.lead[locale]} className="xp-opening--split" />
          <ul className="xp-index" data-reveal>
            {work.map((item) => (
              <li key={item.key}>
                <Link href={item.href}>
                  <figure className="xp-fig">
                    {item.media ? <ArtImage media={item.media} alt="" sizes="6rem" /> : <span className="xp-index__mono" aria-hidden="true">{item.name.split(" ").map((w) => w[0]).join("")}</span>}
                  </figure>
                  <strong>{item.name}</strong>
                  <span>{c.workLines[item.key]}</span>
                  <Icon name="arrow" size={18} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FOUR PILLARS — walking rhythm */}
      <section className="xp-sec" id="how">
        <div className="xp-shell">
          <p className="xp-eyebrow xp-eyebrow--gap" data-reveal><span className="xp-eyebrow__no">02</span><span>{c.pillarsLabel}</span></p>
          <div className="xp-rhythm">
            {c.pillars.map(([title, text], i) => (
              <article key={title} className={`xp-split${i % 2 ? " xp-split--flip" : ""}`}>
                <figure className="xp-fig" style={{ "--ratio": i % 2 ? "4 / 5" : "3 / 2" } as CSSProperties} data-reveal>
                  <ConceptImage id={pillarImages[i]} locale={locale} sizes="(min-width: 1024px) 50vw, 100vw" depth={10} />
                </figure>
                <div className="xp-split__copy" data-reveal>
                  <span className="xp-trio__no">0{i + 1}</span>
                  <h2 className="xp-split__title">{title}</h2>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ROLE STORIES — DEMO */}
      <section className="xp-sec xp-sec--stone" id="roles">
        <div className="xp-shell">
          <Opening no="03" label={c.storiesLabel} title={c.storiesTitle} lead={c.storiesNote} className="xp-opening--split" />
          <div className="xp-roles" data-reveal>
            {roleStories.map((story) => (
              <article key={story.key}>
                <small>{story.where[locale]}</small>
                <h3>{story.title.value[locale]}<DemoMark /></h3>
                <p>{story.text[locale]}</p>
                <p><b>{c.owns}:</b> {story.owns[locale]}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* VACANCIES — real, Rabota.md */}
      <section className="xp-sec" id="positions">
        <div className="xp-shell">
          <Opening no="04" label={c.positionsLabel} title={c.positionsTitle(openVacancies.length)} lead={employerBrand.positions.sourceNote[locale]} className="xp-opening--split" />
          {openVacancies.length ? null : (
            <div className="xp-split__copy" data-reveal>
              <h3 className="xp-split__title">{employerBrand.positions.emptyTitle[locale]}</h3>
              <p>{employerBrand.positions.emptyText[locale]}</p>
            </div>
          )}
          <ul className="xp-vacancies" data-reveal>
            {openVacancies.map((vacancy) => (
              <li key={vacancy.slug}>
                <a href={vacancy.externalUrl} target="_blank" rel="noopener noreferrer">
                  <span className="xp-vacancies__meta"><b>{disciplineLabel(vacancy.area, locale)}</b><span>{vacancy.location[locale]}</span></span>
                  <h3>{vacancy.title[locale]}</h3>
                  <p>{vacancy.summary[locale]}</p>
                  <span className="xp-vacancies__go" aria-hidden="true"><Icon name="up-right" size={18} /></span>
                  <span className="sr-only">{c.view}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="xp-actions xp-actions--top" data-reveal>
            <TextLink href={employerBrand.positions.allRolesUrl} external>{employerBrand.positions.allRoles[locale]}</TextLink>
          </div>
        </div>
      </section>

      {/* APPLY */}
      <section className="xp-sec xp-sec--warm" id="apply">
        <div className="xp-shell xp-close">
          <div data-reveal>
            <p className="xp-eyebrow"><span className="xp-eyebrow__no">05</span><span>{c.applyLabel}</span></p>
            <h2 className="xp-close__title">{c.applyTitle}</h2>
          </div>
          <div className="xp-split__copy" data-reveal>
            <p className="xp-lead">{c.applyText}</p>
            <p className="xp-muted">{company.emails.careers.value[locale]}<DemoMark /></p>
            <Button href={`${p("/contact")}?subject=careers#careers`}>{c.applyCta}</Button>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

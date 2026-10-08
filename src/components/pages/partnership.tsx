import Link from "next/link";
import type { CSSProperties } from "react";
import { DirectionsLine } from "@/components/business-stage";
import { ConceptImage, HeroFigures, Ledger, MaskTitle, Opening } from "@/components/experience";
import { PageShell } from "@/components/page-shell";
import { ProjectFacts } from "@/components/project-facts";
import { ArtImage } from "@/components/primitives";
import { Button, Icon, TextLink } from "@/components/ui";
import { getProject, listProjects } from "@/content/source";
import { drochiaProfile, portfolioFigures, vatraProfile } from "@/data/demo-content";
import { localePath, type SiteLocale } from "@/lib/site-data";

/**
 * INVESTMENT PARTNERSHIP — the investor / bank / partner journey (OWNER brief
 * 2026-10-08, "TRUST, SCALE & DESIRE"): track record → operating assets →
 * development pipeline → how value is created → how projects are evaluated →
 * who we work with → discuss a project.
 * Language rule: MEGAPARC offers no regulated or public investment product —
 * "investment partnership", "project opportunities", "discuss a project" only;
 * terms are always discussed per project. No returns, prices or promises.
 */
const N = " ";
const copy = {
  ro: {
    label: "Parteneriat",
    title: ["Parteneriat", "investițional."],
    lead: "Pentru investitori, bănci și parteneri interesați de proiecte în imobiliare comerciale: achiziția, dezvoltarea și închirierea obiectelor proprii MEGAPARC.",
    cta: "Discutăm un proiect",
    projects: "Proiectele",
    note: "MEGAPARC nu oferă produse de investiții publice. Fiecare parteneriat se discută separat, pentru un proiect concret.",
    recordLabel: "Experiență",
    recordTitle: "În spatele MEGAPARC — istorie, obiecte și execuție.",
    record: { years: "ani de experiență a grupului", founded: "este fondată MEGAPARC", operating: "obiecte în funcțiune", development: "proiecte de dezvoltare", gla: "suprafață închiriabilă" },
    history: "Cronica grupului",
    assetsLabel: "Obiecte în funcțiune",
    assetsTitle: "Imobile care funcționează deja.",
    open: "Vezi proiectul",
    devLabel: "Dezvoltare",
    devTitle: "Proiectele în care merge capitalul.",
    stage: "Etapă",
    site: "Teren",
    completion: "Finalizare",
    status: "Statut",
    valueLabel: "Cum se creează valoarea",
    valueTitle: "Trei direcții ale aceleiași afaceri.",
    checksLabel: "Cum evaluăm proiectele",
    checksTitle: "Șase verificări înainte de decizie.",
    checks: [
      ["Economie", "Cererea, viitorii chiriași, costurile și termenele — calculate înainte de decizie."],
      ["Juridic", "Drepturile asupra terenului și clădirii, restricțiile, documentația de autorizare."],
      ["Tehnic", "Structura, instalațiile, puterile și starea clădirii."],
      ["Dezvoltare", "Ce poate deveni obiectul: funcție, suprafață, etape și costul lucrărilor."],
      ["Închiriere", "Cine va închiria, ce formate cere zona, cât de repede se va ocupa obiectul."],
      ["Exploatare", "Cum va funcționa clădirea ani la rând: întreținere, costuri, calitate."],
    ],
    partnersLabel: "Cu cine lucrăm",
    partnersTitle: "Parteneriatul se construiește în jurul unui proiect concret.",
    partners: [
      ["Investitori", "Participare la un proiect concret MEGAPARC; condițiile se discută individual.", "/contact?subject=partnership#partnership"],
      ["Bănci", "Finanțarea achiziției și dezvoltării obiectelor proprii.", "/contact?subject=partnership#partnership"],
      ["Proprietari de obiecte și terenuri", "Vânzare sau dezvoltare comună a imobilului.", "/offer"],
      ["Constructori și proiectanți", "Lucru pe șantierele noastre: proiectare, construcție, inginerie.", "/contact?subject=partnership#partnership"],
    ],
    closeLabel: "Contact",
    closeTitle: "Discutăm un proiect.",
    routes: [["Discutăm parteneriatul", "/contact?subject=partnership#partnership"], ["Propuneți un obiect sau un teren", "/offer"], ["Proiectele", "/projects"], ["Istoricul grupului", "/history"]],
  },
  ru: {
    label: "Партнёрство",
    title: ["Инвестиционное", "партнёрство."],
    lead: `Для инвесторов, банков и${N}партнёров, которым интересны проекты в${N}коммерческой недвижимости: приобретение, девелопмент и${N}аренда собственных объектов MEGAPARC.`,
    cta: "Обсудить проект",
    projects: "Проекты",
    note: `MEGAPARC не${N}предлагает публичных инвестиционных продуктов. Каждое партнёрство обсуждается отдельно, по${N}конкретному проекту.`,
    recordLabel: "Опыт",
    recordTitle: `За${N}MEGAPARC — история, объекты и${N}исполнение.`,
    record: { years: "лет опыта группы", founded: "основана MEGAPARC", operating: "действующих объекта", development: "проекта развития", gla: "арендуемая площадь" },
    history: "Хроника группы",
    assetsLabel: "Действующие объекты",
    assetsTitle: "Недвижимость, которая уже работает.",
    open: "Открыть проект",
    devLabel: "Развитие",
    devTitle: `Проекты, в${N}которые идёт капитал.`,
    stage: "Стадия",
    site: "Участок",
    completion: "Завершение",
    status: "Статус",
    valueLabel: "Как создаётся стоимость",
    valueTitle: "Три направления одного бизнеса.",
    checksLabel: "Как мы оцениваем проекты",
    checksTitle: "Шесть проверок до решения.",
    checks: [
      ["Экономика", `Спрос, будущие арендаторы, затраты и${N}сроки считаем до${N}решения.`],
      ["Право", `Права на${N}землю и${N}здание, ограничения, разрешительная документация.`],
      ["Техника", `Конструкции, инженерные системы, мощности и${N}состояние здания.`],
      ["Девелопмент", `Чем может стать объект: функция, площадь, этапы и${N}стоимость работ.`],
      ["Аренда", `Кто будет арендовать, какие форматы нужны району, как быстро заполнится объект.`],
      ["Эксплуатация", `Как здание будет работать годами: обслуживание, расходы, качество.`],
    ],
    partnersLabel: "С кем мы работаем",
    partnersTitle: `Партнёрство строится вокруг конкретного проекта.`,
    partners: [
      ["Инвесторы", `Участие в${N}конкретном проекте MEGAPARC; условия обсуждаются индивидуально.`, "/contact?subject=partnership#partnership"],
      ["Банки", `Финансирование приобретения и${N}девелопмента собственных объектов.`, "/contact?subject=partnership#partnership"],
      [`Собственники объектов и${N}земли`, `Продажа или совместное развитие недвижимости.`, "/offer"],
      [`Подрядчики и${N}проектировщики`, `Работа на${N}наших площадках: проектирование, строительство, инженерия.`, "/contact?subject=partnership#partnership"],
    ],
    closeLabel: "Контакты",
    closeTitle: "Обсудим проект.",
    routes: [["Обсудить партнёрство", "/contact?subject=partnership#partnership"], [`Предложить объект или${N}землю`, "/offer"], ["Проекты", "/projects"], ["История группы", "/history"]],
  },
  en: {
    label: "Partnership",
    title: ["Investment", "partnership."],
    lead: "For investors, banks and partners interested in commercial real estate projects: the acquisition, development and leasing of MEGAPARC's own properties.",
    cta: "Discuss a project",
    projects: "Projects",
    note: "MEGAPARC does not offer public investment products. Every partnership is discussed separately, around a specific project.",
    recordLabel: "Experience",
    recordTitle: "Behind MEGAPARC — history, property and execution.",
    record: { years: "years of the group's experience", founded: "MEGAPARC founded", operating: "operating properties", development: "development projects", gla: "lettable area" },
    history: "The group's chronicle",
    assetsLabel: "Operating properties",
    assetsTitle: "Real estate that already works.",
    open: "View the project",
    devLabel: "Development",
    devTitle: "The projects capital goes into.",
    stage: "Stage",
    site: "Site",
    completion: "Completion",
    status: "Status",
    valueLabel: "How value is created",
    valueTitle: "Three directions of one business.",
    checksLabel: "How we evaluate projects",
    checksTitle: "Six checks before a decision.",
    checks: [
      ["Economics", "Demand, future tenants, costs and timing — worked out before the decision."],
      ["Legal", "Title to land and building, restrictions, permits."],
      ["Technical", "Structure, building services, power and condition."],
      ["Development", "What the property can become: use, area, phases and cost of works."],
      ["Leasing", "Who will lease, which formats the area needs, how fast the property fills."],
      ["Operations", "How the building will run for years: upkeep, costs, quality."],
    ],
    partnersLabel: "Who we work with",
    partnersTitle: "Partnership is built around a specific project.",
    partners: [
      ["Investors", "Taking part in a specific MEGAPARC project; terms are discussed individually.", "/contact?subject=partnership#partnership"],
      ["Banks", "Financing the acquisition and development of our own properties.", "/contact?subject=partnership#partnership"],
      ["Owners of property and land", "Sale or joint development of real estate.", "/offer"],
      ["Contractors and designers", "Work on our sites: design, construction, engineering.", "/contact?subject=partnership#partnership"],
    ],
    closeLabel: "Contact",
    closeTitle: "Let's discuss a project.",
    routes: [["Discuss a partnership", "/contact?subject=partnership#partnership"], ["Offer a property or land", "/offer"], ["Projects", "/projects"], ["The group's history", "/history"]],
  },
} as const;

const groupYears = Math.floor((2026 - 1991) / 5) * 5;

export function PartnershipPage({ locale }: { locale: SiteLocale }) {
  const c = copy[locale];
  const p = (path: string) => localePath(locale, path);
  const href = (value: string) => {
    const [pathQuery, hash] = value.split("#");
    const [path, query] = pathQuery.split("?");
    return `${p(path)}${query ? `?${query}` : ""}${hash ? `#${hash}` : ""}`;
  };
  const projects = listProjects();
  const operating = projects.filter((project) => project.kind === "operating");
  const development = projects.filter((project) => project.kind !== "operating");
  const vatra = getProject("vatra")!;
  const drochia = getProject("drochia-gateway")!;

  return (
    <PageShell locale={locale} variant="overlay" experience>
      {/* HERO — execution on site, one statement, one action */}
      <section className="xp-hero xp-hero--page pt-hero" data-xp-hero>
        <div className="xp-hero__media">
          <div className="xp-hero__frame is-active">
            <ConceptImage id="partnership.hero" locale={locale} priority />
          </div>
        </div>
        <div className="xp-hero__veil" aria-hidden="true" />
        <div className="xp-shell xp-hero__copy">
          <span className="xp-flag xp-flag--light">MEGAPARC · {c.label}</span>
          <MaskTitle as="h1" className="xp-hero__title pt-hero__title" lines={[...c.title]} />
          <p className="xp-hero__lead">{c.lead}</p>
          <div className="xp-actions">
            <Button href={href("/contact?subject=partnership#partnership")} variant="light">{c.cta}</Button>
            <TextLink href={p("/projects")} className="tlink--light">{c.projects}</TextLink>
          </div>
        </div>
      </section>

      {/* 01 TRACK RECORD */}
      <section className="xp-sec">
        <div className="xp-shell">
          <Opening no="01" label={c.recordLabel} title={c.recordTitle} />
          <div data-reveal>
            <HeroFigures className="pt-figures" items={[
              { value: `${groupYears}+`, label: c.record.years },
              { value: "2005", label: c.record.founded },
              { value: portfolioFigures.operating.value[locale], label: c.record.operating },
              { value: String(development.length).padStart(2, "0"), label: c.record.development },
              { value: portfolioFigures.gla.value[locale], label: c.record.gla },
            ]} />
          </div>
          <p className="pt-note" data-reveal>{c.note}</p>
          <TextLink href={p("/history")}>{c.history}</TextLink>
        </div>
      </section>

      {/* 02 OPERATING ASSETS */}
      <section className="xp-sec xp-sec--warm">
        <div className="xp-shell">
          <Opening no="02" label={c.assetsLabel} title={c.assetsTitle} />
          <ul className="pt-assets">
            {operating.map((project) => (
              <li key={project.slug} data-reveal>
                <Link href={p(`/projects/${project.slug}`)} className="pt-asset al-hover">
                  <figure className="xp-fig" style={{ "--ratio": "4 / 3" } as CSSProperties}>
                    {project.media ? (
                      <ArtImage media={project.media} alt={`${project.name} — ${project.format[locale]}`} sizes="(min-width: 1024px) 25vw, (min-width: 720px) 50vw, 100vw" position={project.slug === "moscova-20" ? "50% 74%" : undefined} />
                    ) : (
                      <ConceptImage id={project.conceptUse!} locale={locale} sizes="(min-width: 1024px) 25vw, 100vw" />
                    )}
                  </figure>
                  <span className="pt-asset__name">{project.name}</span>
                  <ProjectFacts project={project} locale={locale} />
                  <span className="pt-asset__cta">{c.open}<Icon name="arrow" size={16} /></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 03 DEVELOPMENT PIPELINE — dark signature */}
      <section className="xp-sec xp-sec--ink">
        <div className="xp-shell">
          <Opening no="03" label={c.devLabel} title={c.devTitle} tone="dark" />
          <div className="pt-pipeline">
            <Link href={p(`/projects/${vatra.slug}`)} className="pt-pipe al-reveal" data-reveal>
              <figure className="xp-fig" style={{ "--ratio": "16 / 10" } as CSSProperties}>
                <ArtImage media={vatra.media!} alt={`${vatra.name} — ${vatra.format[locale]}`} sizes="(min-width: 1024px) 50vw, 100vw" position="50% 70%" />
              </figure>
              <span className="pt-pipe__name">{vatra.name}</span>
              <Ledger locale={locale} tone="dark" className="xp-ledger--pair" items={[
                { label: c.stage, point: vatraProfile.stage },
                { label: c.site, point: vatraProfile.site },
                { label: c.completion, point: vatraProfile.completion },
              ]} />
            </Link>
            <Link href={p(`/projects/${drochia.slug}`)} className="pt-pipe al-reveal" data-reveal>
              <figure className="xp-fig" style={{ "--ratio": "16 / 10" } as CSSProperties}>
                <ConceptImage id="project.drochia.hero" locale={locale} sizes="(min-width: 1024px) 50vw, 100vw" />
              </figure>
              <span className="pt-pipe__name">{drochia.name}</span>
              <Ledger locale={locale} tone="dark" className="xp-ledger--pair" items={[
                { label: c.site, point: drochiaProfile.site },
                { label: c.status, point: drochiaProfile.status },
              ]} />
            </Link>
          </div>
        </div>
      </section>

      {/* 04 HOW VALUE IS CREATED */}
      <section className="xp-sec">
        <div className="xp-shell">
          <Opening no="04" label={c.valueLabel} title={c.valueTitle} />
          <DirectionsLine locale={locale} />
        </div>
      </section>

      {/* 05 DISCIPLINE — how projects are evaluated */}
      <section className="xp-sec xp-sec--warm">
        <div className="xp-shell">
          <Opening no="05" label={c.checksLabel} title={c.checksTitle} />
          <ol className="pt-checks">
            {c.checks.map(([title, text], index) => (
              <li key={title} data-reveal style={{ "--i": index } as CSSProperties}>
                <span className="pt-checks__no">{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 06 WHO WE WORK WITH */}
      <section className="xp-sec">
        <div className="xp-shell">
          <Opening no="06" label={c.partnersLabel} title={c.partnersTitle} />
          <ul className="pt-partners">
            {c.partners.map(([title, text, to]) => (
              <li key={title} data-reveal>
                <Link href={href(to)}>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <Icon name="arrow" size={18} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 07 DISCUSS A PROJECT */}
      <section className="xp-sec xp-sec--red">
        <div className="xp-shell xp-close">
          <div data-reveal>
            <p className="xp-eyebrow"><span className="xp-eyebrow__no">07</span><span>{c.closeLabel}</span></p>
            <h2 className="xp-close__title">{c.closeTitle}</h2>
          </div>
          <nav className="xp-close__routes" aria-label={c.closeLabel} data-reveal>
            {c.routes.map(([label, to]) => (
              <Link key={label} href={href(to)}>
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

import Link from "next/link";
import type { CSSProperties } from "react";
import { DirectionsLine } from "@/components/business-stage";
import { ConceptImage, HeroFigures, Ledger, MaskTitle, Opening } from "@/components/experience";
import { PageShell } from "@/components/page-shell";
import { ProjectFacts, ProjectStatus } from "@/components/project-facts";
import { ArtImage } from "@/components/primitives";
import { Button, Icon, TextLink } from "@/components/ui";
import { getProject, kindLabel, listLand, listProjects, publicSpaces, spacesFor } from "@/content/source";
import { caseStudy, daciaDevelopment, drochiaProfile, partnershipProcess, portfolioFigures, vatraProfile } from "@/data/demo-content";
import { acquisitionTypes, developmentStages } from "@/lib/business";
import { localePath, type SiteLocale } from "@/lib/site-data";

/**
 * INVESTMENT PARTNERSHIP — the proof page for investors, banks and capital
 * partners (OWNER briefs "TRUST, SCALE & DESIRE" and "TRUST & PROOF PASS",
 * 2026-10-08/09). Sequence: hero → real assets → case study (Moscova 9) → how
 * value is created → current development → what we look for and how we
 * evaluate → how a project is reviewed → discuss an opportunity. Contractors
 * and designers are a secondary cooperation route under the three primary
 * audiences; the no-public-product statement is a restrained legal note
 * (OWNER trust copy patch 2026-10-09).
 * Language rule: no regulated or public investment product — "investment
 * partnership", "opportunity", "discuss"; no returns, prices or promises.
 * Case and process are governed points (CONFIRMED or DEMO) in
 * src/data/demo-content.ts.
 */
const N = " ";
const copy = {
  ro: {
    label: "Parteneriat",
    title: ["Parteneriat", "investițional."],
    lead: "Pentru investitori, bănci și parteneri interesați de proiecte în imobiliare comerciale: achiziția, dezvoltarea și închirierea obiectelor proprii MEGAPARC.",
    cta: "Discutăm o oportunitate",
    projects: "Proiectele",
    assetsLabel: "Imobile proprii",
    assetsTitle: "Activele MEGAPARC în funcțiune.",
    record: { years: "ani de experiență a grupului", founded: "este fondată MEGAPARC", operating: "obiecte în funcțiune", development: "proiecte de dezvoltare", area: "suprafața obiectelor în funcțiune" },
    owned: "Proprietate MEGAPARC",
    spaces: (n: number) => (n === 1 ? "1 spațiu liber" : `${n} spații libere`),
    leased: "Spațiile sunt închiriate",
    open: "Vezi obiectul",
    caseLabel: "Studiu de caz",
    caseTitle: "Moscova 9 · logica creării valorii.",
    caseLead: "De la punctul de plecare la strategia ulterioară.",
    caseOpen: "Vezi Moscova 9",
    caseSpace: "Spațiul disponibil",
    valueLabel: "Cum se creează valoarea",
    valueTitle: "Trei direcții de creare a valorii.",
    devLabel: "Dezvoltare",
    landPlots: "Terenuri",
    devTitle: "Proiectele de dezvoltare în curs.",
    devLead: "Fiecare proiect trece prin aceleași șase etape; mai jos — unde se află astăzi.",
    stage: "Etapă",
    site: "Teren",
    completion: "Finalizare",
    status: "Statut",
    lookLabel: "Ce analizăm și cum evaluăm",
    lookTitle: "Criterii de selecție și verificare investițională.",
    lookTypes: "Ce analizăm",
    lookChecks: "Cum evaluăm",
    checks: [
      ["Economie", "Cererea, viitorii chiriași, costurile și termenele — calculate înainte de decizie."],
      ["Juridic", "Drepturile asupra terenului și clădirii, restricțiile, documentația de autorizare."],
      ["Tehnic", "Structura, instalațiile, puterile și starea clădirii."],
      ["Dezvoltare", "Ce poate deveni obiectul: funcție, suprafață, etape și costul lucrărilor."],
      ["Închiriere", "Cine va închiria, ce formate cere zona, cât de repede se va ocupa obiectul."],
      ["Exploatare", "Cum va funcționa clădirea ani la rând: întreținere, costuri, calitate."],
    ],
    talkLabel: "Parteneriat și finanțare",
    talkTitle: "Etapele analizei unui proiect.",
    note: "MEGAPARC nu oferă produse de investiții publice. Fiecare parteneriat se discută separat, pentru un proiect concret.",
    partners: [
      ["Investitori", "Participare la un proiect concret MEGAPARC; condițiile se discută individual.", "/contact?subject=partnership#partnership"],
      ["Bănci și parteneri financiari", "Finanțarea achiziției și dezvoltării obiectelor proprii.", "/contact?subject=partnership#partnership"],
      ["Proprietari de imobile și terenuri", "Vânzare sau dezvoltare comună a imobilului.", "/offer"],
    ],
    coop: { title: "Constructori și proiectanți", text: "Lucru pe șantierele noastre: proiectare, construcție, inginerie.", cta: "Scrieți despre colaborare", to: "/contact#question" },
    closeLabel: "Contact",
    closeTitle: "Discutăm o oportunitate.",
    routes: [["Discutați o oportunitate", "/contact?subject=partnership#partnership"], ["Propuneți un obiect sau un teren", "/offer"], ["Proiectele", "/projects"], ["Istoricul grupului", "/history"]],
  },
  ru: {
    label: "Партнёрство",
    title: ["Инвестиционное", "партнёрство."],
    lead: `Для инвесторов, банков и${N}партнёров, которым интересны проекты в${N}коммерческой недвижимости: приобретение, девелопмент и${N}аренда собственных объектов MEGAPARC.`,
    cta: "Обсудить возможность",
    projects: "Проекты",
    assetsLabel: "Собственная недвижимость",
    assetsTitle: "Действующие активы MEGAPARC.",
    record: { years: "лет опыта группы", founded: "основана MEGAPARC", operating: "действующих объекта", development: "проекта развития", area: "площадь действующих объектов" },
    owned: "Собственность MEGAPARC",
    spaces: (n: number) => (n === 1 ? "1 свободное помещение" : n < 5 ? `${n} свободных помещения` : `${n} свободных помещений`),
    leased: "Помещения сданы",
    open: "Открыть объект",
    caseLabel: "Кейс",
    caseTitle: `Moscova${N}9${N}· логика создания стоимости.`,
    caseLead: `От исходной точки до${N}дальнейшей стратегии.`,
    caseOpen: "Открыть Moscova 9",
    caseSpace: "Свободное помещение",
    valueLabel: "Как создаётся стоимость",
    valueTitle: "Три направления создания стоимости.",
    devLabel: "Развитие",
    landPlots: "Земельные участки",
    devTitle: "Текущие проекты развития.",
    devLead: `Каждый проект проходит одни и${N}те${N}же шесть стадий; ниже — где они сейчас.`,
    stage: "Стадия",
    site: "Участок",
    completion: "Завершение",
    status: "Статус",
    lookLabel: `Что рассматриваем и${N}как оцениваем`,
    lookTitle: `Критерии отбора и${N}инвестиционная проверка.`,
    lookTypes: "Что рассматриваем",
    lookChecks: "Как оцениваем",
    checks: [
      ["Экономика", `Спрос, будущие арендаторы, затраты и${N}сроки считаем до${N}решения.`],
      ["Право", `Права на${N}землю и${N}здание, ограничения, разрешительная документация.`],
      ["Техника", `Конструкции, инженерные системы, мощности и${N}состояние здания.`],
      ["Девелопмент", `Чем может стать объект: функция, площадь, этапы и${N}стоимость работ.`],
      ["Аренда", `Кто будет арендовать, какие форматы нужны району, как быстро заполнится объект.`],
      ["Эксплуатация", `Как здание будет работать годами: обслуживание, расходы, качество.`],
    ],
    talkLabel: "Партнёрство и финансирование",
    talkTitle: "Порядок рассмотрения проекта.",
    note: `MEGAPARC не${N}предлагает публичных инвестиционных продуктов. Каждое партнёрство обсуждается отдельно, по${N}конкретному проекту.`,
    partners: [
      ["Инвесторы", `Участие в${N}конкретном проекте MEGAPARC; условия обсуждаются индивидуально.`, "/contact?subject=partnership#partnership"],
      [`Банки и${N}финансовые партнёры`, `Финансирование приобретения и${N}девелопмента собственных объектов.`, "/contact?subject=partnership#partnership"],
      [`Собственники недвижимости и${N}земли`, `Продажа или совместное развитие недвижимости.`, "/offer"],
    ],
    coop: { title: `Подрядчики и${N}проектировщики`, text: `Работа на${N}наших площадках: проектирование, строительство, инженерия.`, cta: `Написать о${N}сотрудничестве`, to: "/contact#question" },
    closeLabel: "Контакты",
    closeTitle: "Обсудим возможность.",
    routes: [["Обсудить возможность", "/contact?subject=partnership#partnership"], [`Предложить объект или${N}землю`, "/offer"], ["Проекты", "/projects"], ["История группы", "/history"]],
  },
  en: {
    label: "Partnership",
    title: ["Investment", "partnership."],
    lead: "For investors, banks and partners interested in commercial real estate projects: the acquisition, development and leasing of MEGAPARC's own properties.",
    cta: "Discuss an opportunity",
    projects: "Projects",
    assetsLabel: "Our own real estate",
    assetsTitle: "MEGAPARC's operating assets.",
    record: { years: "years of the group's experience", founded: "MEGAPARC founded", operating: "operating properties", development: "development projects", area: "operating property area" },
    owned: "Owned by MEGAPARC",
    spaces: (n: number) => (n === 1 ? "1 space available" : `${n} spaces available`),
    leased: "Spaces leased",
    open: "View the property",
    caseLabel: "Case study",
    caseTitle: "Moscova 9 · the logic of value creation.",
    caseLead: "From the starting point to the further strategy.",
    caseOpen: "View Moscova 9",
    caseSpace: "The available space",
    valueLabel: "How value is created",
    valueTitle: "Three directions of value creation.",
    devLabel: "Development",
    landPlots: "Land plots",
    devTitle: "Current development projects.",
    devLead: "Every project goes through the same six stages; below — where each stands today.",
    stage: "Stage",
    site: "Site",
    completion: "Completion",
    status: "Status",
    lookLabel: "What we consider and how we evaluate",
    lookTitle: "Selection criteria and investment due diligence.",
    lookTypes: "What we consider",
    lookChecks: "How we evaluate",
    checks: [
      ["Economics", "Demand, future tenants, costs and timing — worked out before the decision."],
      ["Legal", "Title to land and building, restrictions, permits."],
      ["Technical", "Structure, building services, power and condition."],
      ["Development", "What the property can become: use, area, phases and cost of works."],
      ["Leasing", "Who will lease, which formats the area needs, how fast the property fills."],
      ["Operations", "How the building will run for years: upkeep, costs, quality."],
    ],
    talkLabel: "Partnership and financing",
    talkTitle: "How a project is reviewed.",
    note: "MEGAPARC does not offer public investment products. Every partnership is discussed separately, around a specific project.",
    partners: [
      ["Investors", "Taking part in a specific MEGAPARC project; terms are discussed individually.", "/contact?subject=partnership#partnership"],
      ["Banks and financial partners", "Financing the acquisition and development of our own properties.", "/contact?subject=partnership#partnership"],
      ["Owners of real estate and land", "Sale or joint development of real estate.", "/offer"],
    ],
    coop: { title: "Contractors and designers", text: "Work on our sites: design, construction, engineering.", cta: "Write about cooperation", to: "/contact#question" },
    closeLabel: "Contact",
    closeTitle: "Let's discuss an opportunity.",
    routes: [["Discuss an opportunity", "/contact?subject=partnership#partnership"], ["Offer a property or land", "/offer"], ["Projects", "/projects"], ["The group's history", "/history"]],
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
  const development = projects.filter((project) => project.kind === "development");
  const vatra = getProject("vatra")!;
  const drochia = getProject("drochia-gateway")!;
  const daciaDev = getProject("dacia-31-development")!;
  const caseProject = getProject(caseStudy.slug)!;
  const caseSpace = publicSpaces.find((space) => space.project === caseStudy.slug);
  const stageOf = (slug: string) => getProject(slug)!.development!.stage;
  const discuss = href("/contact?subject=partnership#partnership");

  return (
    <PageShell locale={locale} variant="overlay" experience>
      {/* HERO — a plot under works, one statement, one action */}
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
            <Button href={discuss} variant="light">{c.cta}</Button>
            <TextLink href={p("/projects")} className="tlink--light">{c.projects}</TextLink>
          </div>
        </div>
      </section>

      {/* 01 REAL ASSETS — what MEGAPARC owns, with the track record */}
      <section className="xp-sec">
        <div className="xp-shell">
          <Opening no="01" label={c.assetsLabel} title={c.assetsTitle} />
          <div data-reveal>
            <HeroFigures className="pt-figures" items={[
              { value: `${groupYears}+`, label: c.record.years },
              { value: "2005", label: c.record.founded },
              { value: portfolioFigures.operating.value[locale], label: c.record.operating },
              { value: String(development.length).padStart(2, "0"), label: c.record.development },
              { value: portfolioFigures.area.value[locale], label: c.record.area },
            ]} />
          </div>
          <ul className="pt-assets">
            {operating.map((project) => {
              const own = spacesFor(project.slug);
              return (
                <li key={project.slug} data-reveal>
                  <Link href={p(`/projects/${project.slug}`)} className="pt-asset al-hover">
                    <figure className="xp-fig" style={{ "--ratio": "4 / 3" } as CSSProperties}>
                      {project.media ? (
                        <ArtImage media={project.media} alt={`${project.name} — ${project.format[locale]}`} sizes="(min-width: 1100px) 25vw, (min-width: 720px) 50vw, 100vw" position={project.slug === "moscova-20" ? "50% 74%" : undefined} />
                      ) : (
                        <ConceptImage id={project.conceptUse!} locale={locale} sizes="(min-width: 1100px) 25vw, 100vw" />
                      )}
                    </figure>
                    <span className="pt-asset__owned">{c.owned}</span>
                    <span className="pt-asset__name">{project.name}</span>
                    <ProjectFacts project={project} locale={locale} />
                    <ProjectStatus project={project} locale={locale} />
                    <span className="pt-asset__status">
                      <i aria-hidden="true" className={own.length ? "is-open" : undefined} />
                      {own.length ? c.spaces(own.length) : c.leased}
                    </span>
                    <span className="pt-asset__cta">{c.open}<Icon name="arrow" size={16} /></span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* 02 CASE STUDY — Moscova 9, from starting point to next option */}
      <section className="xp-sec xp-sec--warm" id="case">
        <div className="xp-shell">
          <Opening no="02" label={c.caseLabel} title={c.caseTitle} lead={c.caseLead} className="xp-opening--split" />
          <div className="pt-case">
            <div className="pt-case__aside">
              <figure className="pt-case__media al-reveal" data-reveal>
                <ArtImage media={caseProject.media!} alt={`${caseProject.name} — ${caseProject.format[locale]}`} sizes="(min-width: 1024px) 45vw, 100vw" position="50% 60%" />
              </figure>
              <div className="pt-case__facts" data-reveal>
                <span className="pt-case__name">{caseProject.name}</span>
                <ProjectFacts project={caseProject} locale={locale} />
                <div className="pt-case__links">
                  <TextLink href={p(`/projects/${caseProject.slug}`)}>{c.caseOpen}</TextLink>
                  {caseSpace ? <TextLink href={p(`/leasing/${caseSpace.id}`)}>{c.caseSpace}</TextLink> : null}
                </div>
              </div>
            </div>
            <ol className="pt-case__stages">
              {caseStudy.stages.map((stage, index) => (
                <li key={stage.key} data-reveal style={{ "--i": index } as CSSProperties}>
                  <span className="pt-case__no">{String(index + 1).padStart(2, "0")}</span>
                  <h3>{stage.label[locale]}</h3>
                  <p>{stage.text.value[locale]}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* 03 HOW VALUE IS CREATED */}
      <section className="xp-sec">
        <div className="xp-shell">
          <Opening no="03" label={c.valueLabel} title={c.valueTitle} />
          <DirectionsLine locale={locale} />
        </div>
      </section>

      {/* 04 CURRENT DEVELOPMENT — dark signature, with the six stages */}
      <section className="xp-sec xp-sec--ink">
        <div className="xp-shell">
          <Opening no="04" label={c.devLabel} title={c.devTitle} lead={c.devLead} tone="dark" className="xp-opening--split" />
          <ol className="xp-process xp-process--stages pt-stages" style={{ "--n": developmentStages.length } as CSSProperties} data-reveal>
            {developmentStages.map((stage, index) => {
              const here = [vatra, drochia].filter((project) => stageOf(project.slug) === index);
              const current = here.length > 0;
              return (
                <li key={stage.no} className={current ? "is-current" : index < stageOf("vatra") ? "is-done" : undefined}>
                  <h3>{stage.title[locale]}</h3>
                  <p>{stage.text[locale]}</p>
                  {here.map((project) => (
                    <span key={project.slug} className="xp-scene__tag">{project.name}</span>
                  ))}
                </li>
              );
            })}
          </ol>
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
          {/* Also in the portfolio (OWNER 2026-10-09): Dacia 31 · Development (programme only, no stage published) and the land plots */}
          <div className="pt-more" data-reveal>
            <Link href={p(`/projects/${daciaDev.slug}`)} className="pt-more__item">
              <span className="pt-more__kind">{kindLabel.development[locale]}</span>
              <span className="pt-more__name">{daciaDev.name}</span>
              <span className="pt-more__value">{daciaDevelopment.buildings.value[locale]} × {daciaDevelopment.each.value[locale]} · {daciaDevelopment.total.value[locale]}</span>
            </Link>
            <div className="pt-more__item">
              <span className="pt-more__kind">{kindLabel.land[locale]}</span>
              <span className="pt-more__name">{c.landPlots}</span>
              <span className="pt-more__value">{listLand().map((plot) => `${plot.name[locale]} · ${plot.point.value[locale].split(" · ")[0]}`).join(" — ")}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 05 WHAT WE LOOK FOR + HOW WE EVALUATE */}
      <section className="xp-sec xp-sec--warm">
        <div className="xp-shell">
          <Opening no="05" label={c.lookLabel} title={c.lookTitle} />
          <div className="pt-look">
            <div data-reveal>
              <p className="xp-label">{c.lookTypes}</p>
              <ul className="pt-types">
                {acquisitionTypes.map((type) => (
                  <li key={type.key}>
                    <h3>{type.title[locale]}</h3>
                    <p>{type.text[locale]}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div data-reveal>
              <p className="xp-label">{c.lookChecks}</p>
              <ol className="pt-checks">
                {c.checks.map(([title, text], index) => (
                  <li key={title}>
                    <span className="pt-checks__no">{String(index + 1).padStart(2, "0")}</span>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* 06 PARTNERSHIP AND FINANCING — how a conversation starts */}
      <section className="xp-sec">
        <div className="xp-shell">
          <Opening no="06" label={c.talkLabel} title={c.talkTitle} />
          <div className="pt-talk">
            <ol className="pt-steps" data-reveal>
              {partnershipProcess.map((step, index) => (
                <li key={step.key}>
                  <span className="pt-checks__no">{String(index + 1).padStart(2, "0")}</span>
                  <p>{step.value[locale]}</p>
                </li>
              ))}
            </ol>
            <div data-reveal>
              <ul className="pt-partners">
                {c.partners.map(([title, text, to]) => (
                  <li key={title}>
                    <Link href={href(to)}>
                      <h3>{title}</h3>
                      <p>{text}</p>
                      <Icon name="arrow" size={18} />
                    </Link>
                  </li>
                ))}
              </ul>
              {/* Contractors and designers — a secondary cooperation route, not an investment-partnership audience (OWNER copy patch 2026-10-09). */}
              <p className="pt-coop">
                <span className="pt-coop__title">{c.coop.title}</span>
                <span>{c.coop.text}</span>
                <TextLink href={href(c.coop.to)}>{c.coop.cta}</TextLink>
              </p>
            </div>
          </div>
          <p className="pt-note" data-reveal>{c.note}</p>
          <div className="xp-actions" data-reveal>
            <Button href={discuss}>{c.cta}</Button>
          </div>
        </div>
      </section>

      {/* 07 DISCUSS AN OPPORTUNITY */}
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

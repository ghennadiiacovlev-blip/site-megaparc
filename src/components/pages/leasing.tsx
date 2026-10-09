import Link from "next/link";
import type { CSSProperties } from "react";
import { DemoMark, Opening, Val, plural } from "@/components/experience";
import { LeasingInventory, type InventoryCopy } from "@/components/leasing/inventory";
import { TenantAdvisor, type AdvisorCopy } from "@/components/leasing/tenant-advisor";
import { AvailabilityChip, SpaceImage, UnitCard, viewingHref } from "@/components/leasing/unit-card";
import { PageShell } from "@/components/page-shell";
import { Icon } from "@/components/ui";
import { availabilityLabel, availabilityOf, formatArea, formatAreaRange, getProject, listProjects, publicSpaces, sortSpaces, spacesFor } from "@/content/source";
import { leasingProcess } from "@/data/demo-content";
import { areaBands, leasingSteps, needOrder, needs, noPrice, uses } from "@/lib/leasing";
import { brand, localePath, type SiteLocale } from "@/lib/site-data";

/**
 * LEASING — a top-level product, not a subsection (OWNER correction 2026-10-08).
 * The tenant sees WHAT IS AVAILABLE NOW first: a compact practical hero with the
 * live count and two shortcuts (journey A "about 200 m²", journey B "a
 * restaurant"), the inventory with filters, the tenant advisor, the buildings
 * with space, the process, the waiting list. Only published spaces (available
 * or reserved) appear — a space marked LEASED in the CMS disappears everywhere.
 */
const copy = {
  ro: {
    label: "Închiriere",
    title: "Spații pentru afaceri.",
    lead: "Spațiile libere din clădirile MEGAPARC — cu planuri, caracteristici și statut actualizat.",
    spaces: ["spațiu", "spații", "spații"],
    now: "libere acum",
    boardLabel: "Liber acum",
    boardAll: "Toate spațiile",
    buildings: ["obiect", "obiecte", "obiecte"],
    shortcutArea: "Spații de 120–300 m²",
    shortcutFood: "Pentru cafenea sau restaurant",
    shortcutAll: "Toate spațiile",
    availableLabel: "Acum se închiriază",
    availableTitle: "Ce este liber — cu toate datele.",
    advisorLabel: "Ce deschideți?",
    advisorTitle: "Spuneți-ne ce trebuie să facă spațiul. Vă arătăm ce se potrivește și de ce.",
    buildingsLabel: "Clădirile",
    buildingsTitle: "Unde sunt spațiile.",
    spacesIn: (n: number) => (n === 1 ? "1 spațiu" : `${n} spații`),
    processLabel: "Cum închiriem",
    processTitle: "Cinci pași, de la cerere la deschidere.",
    reply: "Răspuns",
    viewing: "Vizionare",
    closeLabel: "N-ați găsit?",
    closeTitle: "Spuneți-ne ce căutați. Vă anunțăm când se eliberează.",
    routes: [["Lăsați o cerere de spațiu", "/contact?subject=lease#occupier"], ["Toate proiectele", "/projects"], ["Propuneți un obiect sau un teren", "/offer"]],
  },
  ru: {
    label: "Аренда",
    title: "Помещения для бизнеса.",
    lead: "Свободные площади в объектах MEGAPARC — с планами, характеристиками и актуальным статусом.",
    spaces: ["помещение", "помещения", "помещений"],
    now: "свободно сейчас",
    boardLabel: "Свободно сейчас",
    boardAll: "Все помещения",
    buildings: ["объект", "объекта", "объектов"],
    shortcutArea: "Помещения 120–300 м²",
    shortcutFood: "Для кафе и ресторана",
    shortcutAll: "Все помещения",
    availableLabel: "Сейчас сдаётся",
    availableTitle: "Всё, что свободно, — с полными данными.",
    advisorLabel: "Что вы открываете?",
    advisorTitle: "Расскажите о своём бизнесе — покажем, что подходит и почему.",
    buildingsLabel: "Здания",
    buildingsTitle: "Где находятся помещения.",
    spacesIn: (n: number) => (n === 1 ? "1 помещение" : n < 5 ? `${n} помещения` : `${n} помещений`),
    processLabel: "Как мы сдаём",
    processTitle: "Пять шагов — от запроса до открытия.",
    reply: "Ответ",
    viewing: "Просмотр",
    closeLabel: "Не нашли?",
    closeTitle: "Расскажите, что ищете. Сообщим, когда освободится.",
    routes: [["Оставить запрос на помещение", "/contact?subject=lease#occupier"], ["Все проекты", "/projects"], ["Предложить объект или землю", "/offer"]],
  },
  en: {
    label: "Leasing",
    title: "Space for business.",
    lead: "Available space in MEGAPARC properties — with plans, specifications and up-to-date status.",
    spaces: ["space", "spaces", "spaces"],
    now: "available now",
    boardLabel: "Available now",
    boardAll: "All spaces",
    buildings: ["property", "properties", "properties"],
    shortcutArea: "Spaces of 120–300 m²",
    shortcutFood: "For a café or restaurant",
    shortcutAll: "All spaces",
    availableLabel: "Available now",
    availableTitle: "What is free — with every detail.",
    advisorLabel: "What are you opening?",
    advisorTitle: "Tell us what the space must do. We show what fits and why.",
    buildingsLabel: "The buildings",
    buildingsTitle: "Where the spaces are.",
    spacesIn: (n: number) => (n === 1 ? "1 space" : `${n} spaces`),
    processLabel: "How we lease",
    processTitle: "Five steps, from request to opening.",
    reply: "Reply",
    viewing: "Viewing",
    closeLabel: "Nothing yet?",
    closeTitle: "Tell us what you need — we'll let you know.",
    routes: [["Leave a space request", "/contact?subject=lease#occupier"], ["All projects", "/projects"], ["Offer a property or land", "/offer"]],
  },
} as const;

const inventoryCopy: Record<SiteLocale, InventoryCopy> = {
  ro: { label: "Filtre", use: "Ce deschideți?", area: "Ce suprafață vă trebuie?", project: "Clădirea", all: "Toate", anyArea: "Oricare", allProjects: "Toate clădirile", nowOnly: "Doar libere acum", found: ["spațiu găsit", "spații găsite", "spații găsite"], reset: "Resetează filtrele", emptyTitle: "Acum nu avem exact acest spațiu.", emptyText: "Lăsați o cerere — vă scriem când se eliberează un spațiu potrivit.", emptyCta: "Lasă o cerere" },
  ru: { label: "Фильтры", use: "Что вы открываете?", area: "Какая площадь нужна?", project: "Здание", all: "Все", anyArea: "Любая", allProjects: "Все здания", nowOnly: "Только свободные сейчас", found: ["помещение", "помещения", "помещений"], reset: "Сбросить фильтры", emptyTitle: "Сейчас именно такого помещения нет.", emptyText: "Оставьте запрос — напишем, когда освободится подходящее помещение.", emptyCta: "Оставить запрос" },
  en: { label: "Filters", use: "What are you opening?", area: "How much space do you need?", project: "Building", all: "All", anyArea: "Any", allProjects: "All buildings", nowOnly: "Available now only", found: ["space", "spaces", "spaces"], reset: "Reset filters", emptyTitle: "We don't have exactly this space right now.", emptyText: "Leave a request — we write when a suitable space frees up.", emptyCta: "Leave a request" },
};

const advisorCopy: Record<SiteLocale, AdvisorCopy> = {
  ro: { stepUse: "Ce deschideți?", stepNeeds: "Ce contează pentru afacere?", stepArea: "Ce suprafață?", typical: "Pentru „{type}” contează de obicei punctele marcate cu roșu.", anyArea: "Nu contează", result: "Recomandare", more: "Alte variante", why: "De ce se potrivește", check: "De verificat împreună", quality: { strong: "Potrivire puternică", good: "Potrivire bună", partial: "Potrivire parțială" }, useFits: "Spațiul este gândit pentru: {type}", useMiss: "", areaFits: "Suprafața se încadrează", areaMiss: "", reserved: "Spațiul este rezervat — vă anunțăm dacă se eliberează", details: "Vezi spațiul", viewing: "Solicită o vizionare", emptyTitle: "Acum nu avem un spațiu potrivit.", emptyText: "Lăsați cerințele — vă scriem când se eliberează un spațiu sau apare un obiect nou.", emptyCta: "Lasă o cerere", demo: "Datele acestui spațiu sunt demonstrative." },
  ru: { stepUse: "Что вы открываете?", stepNeeds: "Что важно для бизнеса?", stepArea: "Какая площадь?", typical: "Для формата «{type}» обычно важны пункты, отмеченные красным.", anyArea: "Неважно", result: "Рекомендация", more: "Ещё варианты", why: "Почему подходит", check: "Что проверить вместе", quality: { strong: "Сильное совпадение", good: "Хорошее совпадение", partial: "Частичное совпадение" }, useFits: "Подходит для формата «{type}»", useMiss: "", areaFits: "Площадь подходит", areaMiss: "", reserved: "Помещение забронировано — сообщим, если освободится", details: "Смотреть помещение", viewing: "Запросить просмотр", emptyTitle: "Сейчас подходящего помещения нет.", emptyText: "Опишите требования — напишем, когда освободится помещение или появится новый объект.", emptyCta: "Оставить запрос", demo: "Данные этого помещения — демонстрационные." },
  en: { stepUse: "What are you opening?", stepNeeds: "What matters for the business?", stepArea: "How much space?", typical: "For “{type}”, the points marked in red usually matter most.", anyArea: "Doesn't matter", result: "Recommendation", more: "Other options", why: "Why it fits", check: "To check together", quality: { strong: "Strong fit", good: "Good fit", partial: "Partial fit" }, useFits: "The space is designed for: {type}", useMiss: "", areaFits: "The area fits", areaMiss: "", reserved: "The space is reserved — we tell you if it frees up", details: "View the space", viewing: "Request a viewing", emptyTitle: "We have no suitable space right now.", emptyText: "Describe your requirements — we write when a space frees up or a new property arrives.", emptyCta: "Leave a request", demo: "This space's data is a demonstration." },
};

export function LeasingPage({ locale }: { locale: SiteLocale }) {
  const c = copy[locale];
  const p = (path: string) => localePath(locale, path);
  const list = sortSpaces(publicSpaces);
  const nowCount = list.filter((s) => availabilityOf(s).key === "now").length;
  const withSpace = listProjects().filter((project) => spacesFor(project.slug).length);

  return (
    <PageShell locale={locale} experience mainClassName="lx-page">
      {/* HERO — a short statement, the live count, two shortcuts (journeys A and B) */}
      <section className="xp-pagehero xp-sh">
        <div className="xp-shell xp-sh__grid">
          <p className="xp-eyebrow xp-sh__eyebrow" data-reveal><span className="xp-eyebrow__no">{brand.name}</span><span>{c.label}</span></p>
          <h1 className="xp-display-title xp-sh__title" data-reveal>{c.title}</h1>
          <p className="xp-pagehero__lead xp-sh__lead" data-reveal>{c.lead}</p>
          {/* WHAT CAN I RENT NOW? — a live board of the first spaces, before any filter (OWNER brief 2026-10-08) */}
          <div className="xp-sh__aside lx-board" data-reveal>
            <p className="lx-board__head">
              <span><i aria-hidden="true" />{c.boardLabel}</span>
              <span>{String(list.length).padStart(2, "0")} {plural(list.length, c.spaces, locale)} · {String(nowCount).padStart(2, "0")} {c.now} · {String(withSpace.length).padStart(2, "0")} {plural(withSpace.length, c.buildings, locale)}</span>
            </p>
            <ul className="lx-board__list">
              {list.slice(0, 4).map((space, index) => {
                const project = getProject(space.project)!;
                return (
                  <li key={space.id} style={{ "--i": index } as CSSProperties}>
                    <Link href={p(`/leasing/${space.id}`)} className="lx-board__row">
                      <figure className="lx-board__media">
                        <SpaceImage photo={space.photos[0]} space={space} locale={locale} sizes="9rem" priority={index === 0} />
                      </figure>
                      <span className="lx-board__main">
                        <span className="lx-board__where">{project.name} · {project.district[locale]}</span>
                        <span className="lx-board__unit">{space.unit[locale]}</span>
                        <span className="lx-board__why">{space.headline[locale]}</span>
                      </span>
                      <span className="lx-board__side">
                        <span className="lx-board__area">{formatAreaRange(space.areaMin, space.area, locale)}</span>
                        <AvailabilityChip space={space} locale={locale} />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <a className="lx-board__all" href="#available">{c.boardAll} · {String(list.length).padStart(2, "0")}<Icon name="down" /></a>
          </div>
          {/* Same page, new filter: plain relative links reload the page so the inventory and the advisor read the URL. */}
          <nav className="xp-sh__foot lx-hero__shortcuts" aria-label={c.label} data-reveal>
            <a href="?area=120-300#available">{c.shortcutArea}<Icon /></a>
            <a href="?use=fnb#advisor">{c.shortcutFood}<Icon /></a>
            <a href="#available">{c.shortcutAll}<Icon name="down" /></a>
          </nav>
        </div>
      </section>

      {/* AVAILABLE NOW — inventory */}
      <section className="xp-sec lx-available" id="available">
        <div className="xp-shell">
          <Opening no="01" label={c.availableLabel} title={c.availableTitle} lead={noPrice[locale]} className="xp-opening--split" />
          <LeasingInventory
            locale={locale}
            items={list.map((s) => ({ id: s.id, uses: s.uses, area: s.area, areaMin: s.areaMin ?? s.area, project: s.project, avail: availabilityOf(s).key }))}
            uses={uses.map((u) => ({ key: u.key, label: u.label[locale] }))}
            bands={areaBands.map((b) => ({ key: b.key, label: b.label[locale], min: b.min, max: b.max }))}
            projects={withSpace.map((project) => ({ key: project.slug, label: project.name }))}
            copy={inventoryCopy[locale]}
            contactHref={`${p("/contact")}?subject=lease#occupier`}
          >
            {list.map((space, i) => (
              <UnitCard key={space.id} space={space} locale={locale} priority={i < 2} />
            ))}
          </LeasingInventory>
        </div>
      </section>

      {/* TENANT ADVISOR */}
      <section className="xp-sec xp-sec--warm" id="advisor">
        <div className="xp-shell">
          <Opening no="02" label={c.advisorLabel} title={c.advisorTitle} className="xp-opening--split" />
          <TenantAdvisor
            items={list.map((space) => ({
              id: space.id,
              project: getProject(space.project)!.name,
              unit: space.unit[locale],
              areaLabel: formatAreaRange(space.areaMin, space.area, locale),
              area: space.area,
              areaMin: space.areaMin ?? space.area,
              uses: space.uses,
              fit: space.fit,
              demo: space.dataStatus === "DEMO",
              avail: availabilityOf(space).key,
              availLabel: availabilityLabel(space, locale),
              href: p(`/leasing/${space.id}`),
              viewing: viewingHref(locale, space),
              media: <SpaceImage photo={space.photos[0]} space={space} locale={locale} sizes="(min-width: 1024px) 40vw, 100vw" />,
            }))}
            uses={uses.map((u) => ({ key: u.key, label: u.label[locale], goal: u.goal[locale], typical: u.typical }))}
            needs={needOrder.map((key) => ({ key, label: needs[key].label[locale], why: needs[key].why[locale] }))}
            bands={areaBands.map((b) => ({ key: b.key, label: b.label[locale], min: b.min, max: b.max }))}
            copy={advisorCopy[locale]}
            contactHref={p("/contact")}
          />
        </div>
      </section>

      {/* BUILDINGS WITH SPACE */}
      <section className="xp-sec">
        <div className="xp-shell">
          <Opening no="03" label={c.buildingsLabel} title={c.buildingsTitle} />
          <ul className="lx-buildings">
            {withSpace.map((project) => {
              const own = spacesFor(project.slug);
              return (
                <li key={project.slug} data-reveal>
                  <Link href={p(`/projects/${project.slug}`)}>
                    <figure className="xp-fig" style={{ "--ratio": "4 / 3" } as CSSProperties}>
                      <SpaceImage photo={own[0].photos[0]} space={own[0]} locale={locale} sizes="(min-width: 1024px) 25vw, 50vw" />
                    </figure>
                    <span className="lx-buildings__name">{project.name}</span>
                    <span className="lx-buildings__meta">
                      {project.district[locale]} · {c.spacesIn(own.length)} · {own.map((s) => formatArea(s.area, locale)).join(", ")}
                      {own.some((s) => s.dataStatus === "DEMO") ? <DemoMark /> : null}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* PROCESS */}
      <section className="xp-sec xp-sec--stone">
        <div className="xp-shell">
          <Opening no="04" label={c.processLabel} title={c.processTitle} lead={noPrice[locale]} className="xp-opening--split" />
          <ol className="xp-process" style={{ "--n": leasingSteps.length } as CSSProperties} data-reveal>
            {leasingSteps.map((step) => (
              <li key={step.title.en}>
                <h3>{step.title[locale]}</h3>
                <p>{step.text[locale]}</p>
              </li>
            ))}
          </ol>
          <dl className="lx-facts" data-reveal>
            <div><dt>{c.reply}</dt><dd><Val point={leasingProcess.reply} locale={locale} /></dd></div>
            <div><dt>{c.viewing}</dt><dd><Val point={leasingProcess.viewing} locale={locale} /></dd></div>
          </dl>
        </div>
      </section>

      {/* CLOSE — waiting list */}
      <section className="xp-sec xp-sec--ink">
        <div className="xp-shell xp-close">
          <div data-reveal>
            <p className="xp-eyebrow"><span className="xp-eyebrow__no">05</span><span>{c.closeLabel}</span></p>
            <h2 className="xp-close__title">{c.closeTitle}</h2>
          </div>
          <nav className="xp-close__routes" aria-label={c.closeLabel} data-reveal>
            {c.routes.map(([label, href]) => {
              const [path, hash] = href.split("#");
              const [route, query] = path.split("?");
              return (
                <Link key={label} href={`${p(route)}${query ? `?${query}` : ""}${hash ? `#${hash}` : ""}`}>
                  {label}
                  <Icon name="arrow" size={18} />
                </Link>
              );
            })}
          </nav>
        </div>
      </section>
    </PageShell>
  );
}

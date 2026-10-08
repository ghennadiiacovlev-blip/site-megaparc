import Link from "next/link";
import type { CSSProperties } from "react";
import { DemoMark, Ledger, Opening, Val } from "@/components/experience";
import { LeasingInventory, type InventoryCopy } from "@/components/leasing/inventory";
import { TenantAdvisor, type AdvisorCopy } from "@/components/leasing/tenant-advisor";
import { SpaceImage, UnitCard, viewingHref } from "@/components/leasing/unit-card";
import { PageShell } from "@/components/page-shell";
import { Icon } from "@/components/ui";
import { availabilityLabel, availabilityOf, formatArea, formatAreaRange, getProject, listProjects, publicSpaces, sortSpaces, spacesFor } from "@/content/source";
import { leasingProcess } from "@/data/demo-content";
import { areaBands, leasingSteps, needOrder, needs, noPrice, uses } from "@/lib/leasing";
import { localePath, type SiteLocale } from "@/lib/site-data";

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
    title: "Spațiile MEGAPARC pe care le puteți închiria acum.",
    lead: "Retail, birouri, showroom, servicii, clinici, cafenele — în clădirile noastre din Chișinău. Fiecare spațiu cu suprafața, etajul, accesul, parcarea și planul lui.",
    spaces: "Spații publicate",
    range: "Suprafețe",
    now: "Libere acum",
    buildings: "Clădiri",
    shortcutArea: "Am nevoie de circa 200 m²",
    shortcutFood: "Deschid un restaurant",
    shortcutAll: "Toate spațiile",
    availableLabel: "Acum se închiriază",
    availableTitle: "Ce este liber — cu toate datele.",
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
    routes: [["Lăsați o cerere de spațiu", "/contact?subject=lease#occupier"], ["Toate proiectele", "/projects"], ["Propuneți un obiect", "/offer"]],
  },
  ru: {
    label: "Аренда",
    title: "Помещения MEGAPARC, которые можно арендовать сейчас.",
    lead: "Магазины, офисы, шоурумы, сервисы, клиники, кафе — в наших зданиях в Кишинёве. По каждому помещению — площадь, этаж, вход, парковка и план.",
    spaces: "Помещений на сайте",
    range: "Площади",
    now: "Свободно сейчас",
    buildings: "Зданий",
    shortcutArea: "Мне нужно около 200 м²",
    shortcutFood: "Я открываю ресторан",
    shortcutAll: "Все помещения",
    availableLabel: "Сейчас сдаётся",
    availableTitle: "Что свободно — со всеми данными.",
    advisorLabel: "Что вы открываете?",
    advisorTitle: "Расскажите, что должно делать помещение. Покажем, что подходит и почему.",
    buildingsLabel: "Здания",
    buildingsTitle: "Где находятся помещения.",
    spacesIn: (n: number) => (n === 1 ? "1 помещение" : n < 5 ? `${n} помещения` : `${n} помещений`),
    processLabel: "Как мы сдаём",
    processTitle: "Пять шагов — от запроса до открытия.",
    reply: "Ответ",
    viewing: "Просмотр",
    closeLabel: "Не нашли?",
    closeTitle: "Расскажите, что ищете. Сообщим, когда освободится.",
    routes: [["Оставить запрос на помещение", "/contact?subject=lease#occupier"], ["Все проекты", "/projects"], ["Предложить объект", "/offer"]],
  },
  en: {
    label: "Leasing",
    title: "MEGAPARC spaces you can lease now.",
    lead: "Retail, offices, showrooms, services, clinics, cafés — in our buildings in Chișinău. Every space with its area, floor, access, parking and plan.",
    spaces: "Spaces listed",
    range: "Areas",
    now: "Available now",
    buildings: "Buildings",
    shortcutArea: "I need about 200 m²",
    shortcutFood: "I am opening a restaurant",
    shortcutAll: "All spaces",
    availableLabel: "Available now",
    availableTitle: "What is free — with every detail.",
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
    closeTitle: "Tell us what you are looking for. We let you know when it frees up.",
    routes: [["Leave a space request", "/contact?subject=lease#occupier"], ["All projects", "/projects"], ["Offer a property", "/offer"]],
  },
} as const;

const inventoryCopy: Record<SiteLocale, InventoryCopy> = {
  ro: { label: "Filtre", use: "Ce deschideți", area: "Suprafața", project: "Clădirea", all: "Toate", anyArea: "Oricare", allProjects: "Toate clădirile", nowOnly: "Doar libere acum", found: ["spațiu găsit", "spații găsite", "spații găsite"], reset: "Resetează filtrele", emptyTitle: "Acum nu avem exact acest spațiu.", emptyText: "Lăsați o cerere — vă scriem când se eliberează un spațiu potrivit.", emptyCta: "Lasă o cerere" },
  ru: { label: "Фильтры", use: "Что вы открываете", area: "Площадь", project: "Здание", all: "Все", anyArea: "Любая", allProjects: "Все здания", nowOnly: "Только свободные сейчас", found: ["помещение", "помещения", "помещений"], reset: "Сбросить фильтры", emptyTitle: "Сейчас именно такого помещения нет.", emptyText: "Оставьте запрос — напишем, когда освободится подходящее помещение.", emptyCta: "Оставить запрос" },
  en: { label: "Filters", use: "What you are opening", area: "Area", project: "Building", all: "All", anyArea: "Any", allProjects: "All buildings", nowOnly: "Available now only", found: ["space", "spaces", "spaces"], reset: "Reset filters", emptyTitle: "We don't have exactly this space right now.", emptyText: "Leave a request — we write when a suitable space frees up.", emptyCta: "Leave a request" },
};

const advisorCopy: Record<SiteLocale, AdvisorCopy> = {
  ro: { stepUse: "Ce deschideți?", stepNeeds: "Ce contează pentru afacere?", stepArea: "Ce suprafață?", typical: "Pentru „{type}” contează de obicei punctele marcate cu roșu.", anyArea: "Nu contează", result: "Recomandare", more: "Alte variante", why: "De ce se potrivește", check: "De verificat împreună", quality: { strong: "Potrivire puternică", good: "Potrivire bună", partial: "Potrivire parțială" }, useFits: "Spațiul este gândit pentru: {type}", useMiss: "", areaFits: "Suprafața se încadrează", areaMiss: "", reserved: "Spațiul este rezervat — vă anunțăm dacă se eliberează", details: "Vezi spațiul", viewing: "Solicită o vizionare", emptyTitle: "Acum nu avem un spațiu potrivit.", emptyText: "Lăsați cerințele — vă scriem când se eliberează un spațiu sau apare un obiect nou.", emptyCta: "Lasă o cerere", demo: "Datele acestui spațiu sunt demonstrative." },
  ru: { stepUse: "Что вы открываете?", stepNeeds: "Что важно для бизнеса?", stepArea: "Какая площадь?", typical: "Для формата «{type}» обычно важны пункты, отмеченные красным.", anyArea: "Неважно", result: "Рекомендация", more: "Ещё варианты", why: "Почему подходит", check: "Что проверить вместе", quality: { strong: "Сильное совпадение", good: "Хорошее совпадение", partial: "Частичное совпадение" }, useFits: "Помещение рассчитано на формат: {type}", useMiss: "", areaFits: "Площадь подходит", areaMiss: "", reserved: "Помещение забронировано — сообщим, если освободится", details: "Подробнее о помещении", viewing: "Запросить просмотр", emptyTitle: "Сейчас подходящего помещения нет.", emptyText: "Опишите требования — напишем, когда освободится помещение или появится новый объект.", emptyCta: "Оставить запрос", demo: "Данные этого помещения — демонстрационные." },
  en: { stepUse: "What are you opening?", stepNeeds: "What matters for the business?", stepArea: "How much space?", typical: "For “{type}”, the points marked in red usually matter most.", anyArea: "Doesn't matter", result: "Recommendation", more: "Other options", why: "Why it fits", check: "To check together", quality: { strong: "Strong fit", good: "Good fit", partial: "Partial fit" }, useFits: "The space is designed for: {type}", useMiss: "", areaFits: "The area fits", areaMiss: "", reserved: "The space is reserved — we tell you if it frees up", details: "View the space", viewing: "Request a viewing", emptyTitle: "We have no suitable space right now.", emptyText: "Describe your requirements — we write when a space frees up or a new property arrives.", emptyCta: "Leave a request", demo: "This space's data is a demonstration." },
};

export function LeasingPage({ locale }: { locale: SiteLocale }) {
  const c = copy[locale];
  const p = (path: string) => localePath(locale, path);
  const list = sortSpaces(publicSpaces);
  const min = Math.min(...list.map((s) => s.areaMin ?? s.area));
  const max = Math.max(...list.map((s) => s.area));
  const nowCount = list.filter((s) => availabilityOf(s).key === "now").length;
  const withSpace = listProjects().filter((project) => spacesFor(project.slug).length);
  const anyDemo = list.some((s) => s.dataStatus === "DEMO");

  return (
    <PageShell locale={locale} experience mainClassName="lx-page">
      {/* HERO — practical, the count first */}
      <section className="xp-pagehero lx-hero">
        <div className="xp-shell xp-pagehero__grid">
          <p className="xp-eyebrow" data-reveal><span className="xp-eyebrow__no">01</span><span>{c.label}</span></p>
          <div data-reveal>
            <h1 className="xp-pagehero__title">{c.title}</h1>
            <p className="xp-pagehero__lead xp-pagehero__lead--gap">{c.lead}</p>
            {/* Same page, new filter: plain relative links reload the page so the inventory and the advisor read the URL. */}
            <nav className="lx-hero__shortcuts" aria-label={c.label}>
              <a href="?area=120-300#available">{c.shortcutArea}<Icon /></a>
              <a href="?use=fnb#advisor">{c.shortcutFood}<Icon /></a>
              <a href="#available">{c.shortcutAll}<Icon name="down" /></a>
            </nav>
          </div>
          <div className="xp-pagehero__aside" data-reveal>
            <Ledger locale={locale} className="xp-ledger--pair" items={[
              { label: c.spaces, value: String(list.length).padStart(2, "0") },
              { label: c.now, value: String(nowCount).padStart(2, "0") },
              { label: c.range, value: `${formatAreaRange(min, max, locale)}` },
              { label: c.buildings, value: String(withSpace.length).padStart(2, "0") },
            ]} />
            {anyDemo ? <p className="xp-demo-legend"><span className="xp-demo-mark" aria-hidden="true"><span /></span>{locale === "ru" ? "Часть помещений — демонстрационные записи для превью." : locale === "ro" ? "O parte din spații sunt înregistrări demonstrative pentru previzualizare." : "Some spaces are demonstration records for the preview."}</p> : null}
          </div>
        </div>
      </section>

      {/* AVAILABLE NOW — inventory */}
      <section className="xp-sec lx-available" id="available">
        <div className="xp-shell">
          <Opening no="02" label={c.availableLabel} title={c.availableTitle} lead={noPrice[locale]} className="xp-opening--split" />
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
          <Opening no="03" label={c.advisorLabel} title={c.advisorTitle} className="xp-opening--split" />
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
          <Opening no="04" label={c.buildingsLabel} title={c.buildingsTitle} />
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
          <Opening no="05" label={c.processLabel} title={c.processTitle} lead={noPrice[locale]} className="xp-opening--split" />
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

      {/* CLOSE — waiting list */}
      <section className="xp-sec xp-sec--ink">
        <div className="xp-shell xp-close">
          <div data-reveal>
            <p className="xp-eyebrow"><span className="xp-eyebrow__no">06</span><span>{c.closeLabel}</span></p>
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

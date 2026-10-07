import Link from "next/link";
import type { CSSProperties } from "react";
import { CollectionFilter } from "@/components/collection-filter";
import { ConceptImage, DemoMark, Ledger, Opening } from "@/components/experience";
import { PageShell } from "@/components/page-shell";
import { ArtImage } from "@/components/primitives";
import { Button, Icon, TextLink } from "@/components/ui";
import { assetProfiles, creangaProfile, drochiaProfile, portfolioFigures, tenantFit, vatraProfile, type AssetCategory } from "@/data/demo-content";
import { businessTypes } from "@/data/journeys";
import { developmentProjects, portfolioAssets, type PortfolioAsset } from "@/lib/assets";
import { localePath, type SiteLocale } from "@/lib/site-data";

/**
 * PORTFOLIO — a curated collection, architecture first (2026-10-07).
 * Every property leads with a reason to care, then who it suits, then two
 * numbers. Four scales: Moscova 9 as a wide frame, Dacia 31 as a split,
 * Moscova 20 compact and offset, Creangă 78 flipped with its labelled concept
 * image. A quiet filter (office / retail / mixed) sits above the collection.
 */
const copy = {
  ro: {
    label: "Portofoliu",
    numeral: "obiecte în funcțiune",
    lead: "Clădiri pentru sedii, spații comerciale pe prima linie și o clădire de birouri și servicii — în Chișinău. Fiecare este administrată ca o afacere.",
    gla: "Suprafață închiriabilă",
    tenants: "Chiriași",
    occupancy: "Grad de ocupare",
    land: "Teren pentru dezvoltare",
    find: "Găsește spațiul potrivit",
    dev: "Proiecte de dezvoltare",
    filter: "Filtrează după format",
    all: "Toate",
    cats: { office: "Birouri", retail: "Retail", mixed: "Mixt" } as Record<AssetCategory, string>,
    collectionLabel: "Colecția",
    collectionTitle: "Patru obiecte, patru moduri de a lucra.",
    best: "Potrivit pentru",
    area: "Suprafață",
    availability: "Disponibilitate",
    open: "Vezi obiectul",
    check: "Verifică disponibilitatea",
    devLabel: "Dezvoltare",
    devTitle: "Ce construim mai departe.",
    devLead: "Un proiect în realizare și un teren în evaluare — prezentate la etapa lor reală.",
    stage: "Etapă",
    site: "Teren",
    concept: "Concept · în evaluare",
    closeLabel: "Nu sunteți sigur?",
    closeTitle: "Spuneți ce trebuie să facă spațiul. Vă arătăm ce se potrivește și de ce.",
    routes: [["Găsește spațiul potrivit", "/opportunities", "occupier"], ["Discută cerințele", "/contact", "occupier"], ["Propune un obiect", "/opportunities", "owners"]],
  },
  ru: {
    label: "Портфель",
    numeral: "действующих объекта",
    lead: "Здания под штаб-квартиры, торговые помещения первой линии и офисно-сервисное здание — в Кишинёве. Каждым управляем как бизнесом.",
    gla: "Арендуемая площадь",
    tenants: "Арендаторы",
    occupancy: "Заполняемость",
    land: "Земля под развитие",
    find: "Подобрать помещение",
    dev: "Проекты развития",
    filter: "Фильтр по формату",
    all: "Все",
    cats: { office: "Офисы", retail: "Ритейл", mixed: "Смешанный" } as Record<AssetCategory, string>,
    collectionLabel: "Коллекция",
    collectionTitle: "Четыре объекта — четыре способа работать.",
    best: "Подходит для",
    area: "Площадь",
    availability: "Доступность",
    open: "Открыть объект",
    check: "Проверить доступность",
    devLabel: "Девелопмент",
    devTitle: "Что мы строим дальше.",
    devLead: "Проект в стадии реализации и участок на стадии оценки — показаны на их реальном этапе.",
    stage: "Стадия",
    site: "Участок",
    concept: "Концепция · на стадии оценки",
    closeLabel: "Не уверены?",
    closeTitle: "Расскажите, что должно делать помещение. Покажем, что подходит и почему.",
    routes: [["Подобрать помещение", "/opportunities", "occupier"], ["Обсудить требования", "/contact", "occupier"], ["Предложить объект", "/opportunities", "owners"]],
  },
  en: {
    label: "Portfolio",
    numeral: "operating properties",
    lead: "Headquarters buildings, first-line retail space and an office and services building — in Chișinău. Each one is managed as a business.",
    gla: "Lettable area",
    tenants: "Tenants",
    occupancy: "Occupancy",
    land: "Development land",
    find: "Find the right space",
    dev: "Development projects",
    filter: "Filter by format",
    all: "All",
    cats: { office: "Office", retail: "Retail", mixed: "Mixed" } as Record<AssetCategory, string>,
    collectionLabel: "The collection",
    collectionTitle: "Four properties, four ways of working.",
    best: "Best for",
    area: "Area",
    availability: "Availability",
    open: "View the property",
    check: "Check availability",
    devLabel: "Development",
    devTitle: "What we build next.",
    devLead: "One project in delivery and one site under evaluation — each shown at its real stage.",
    stage: "Stage",
    site: "Site",
    concept: "Concept · under evaluation",
    closeLabel: "Not sure?",
    closeTitle: "Tell us what the space has to do. We show what fits and why.",
    routes: [["Find the right space", "/opportunities", "occupier"], ["Discuss my requirements", "/contact", "occupier"], ["Submit a property", "/opportunities", "owners"]],
  },
} as const;

type Layout = "feature" | "split" | "compact" | "flip";
const order: { slug: PortfolioAsset["slug"]; layout: Layout; ratio: string }[] = [
  { slug: "moscova-9", layout: "feature", ratio: "21 / 9" },
  { slug: "dacia-31", layout: "split", ratio: "4 / 5" },
  { slug: "moscova-20", layout: "compact", ratio: "3 / 4" },
  { slug: "creanga-78", layout: "flip", ratio: "4 / 5" },
];

export function PortfolioIndexPage({ locale }: { locale: SiteLocale }) {
  const c = copy[locale];
  const p = (path: string) => localePath(locale, path);
  const f = portfolioFigures;
  const [vatra, drochia] = developmentProjects;
  const count = (cat: AssetCategory) => portfolioAssets.filter((a) => assetProfiles[a.slug].category === cat).length;
  const typeLabel = (key: string) => businessTypes.find((t) => t.key === key)!.label[locale];

  return (
    <PageShell locale={locale} experience>
      {/* HERO — the collection in one number */}
      <section className="xp-pagehero">
        <div className="xp-shell xp-pagehero__grid">
          <p className="xp-eyebrow" data-reveal><span className="xp-eyebrow__no">01</span><span>{c.label}</span></p>
          <div data-reveal>
            <h1 className="xp-numeral">{f.operating.value[locale]}<small>{c.numeral}</small></h1>
            <p className="xp-pagehero__lead xp-pagehero__lead--gap">{c.lead}</p>
          </div>
          <div className="xp-pagehero__aside" data-reveal>
            <Ledger locale={locale} className="xp-ledger--pair" items={[
              { label: c.gla, point: f.gla },
              { label: c.tenants, point: f.tenants },
              { label: c.occupancy, point: f.occupancy },
              { label: c.land, point: f.land },
            ]} />
            <div className="xp-actions">
              <Button href={`${p("/opportunities")}#occupier`}>{c.find}</Button>
              <TextLink href="#development">{c.dev}</TextLink>
            </div>
          </div>
        </div>
      </section>

      {/* COLLECTION */}
      <section className="xp-sec" id="operating">
        <div className="xp-shell">
          <Opening no="02" label={c.collectionLabel} title={c.collectionTitle} />
          <CollectionFilter label={c.filter} options={[{ key: "all", label: c.all, count: portfolioAssets.length }, ...(["office", "retail", "mixed"] as AssetCategory[]).map((cat) => ({ key: cat, label: c.cats[cat], count: count(cat) }))]}>
            <div className="xp-collection">
              {order.map(({ slug, layout, ratio }) => {
                const asset = portfolioAssets.find((a) => a.slug === slug)!;
                const fit = tenantFit[slug];
                const profile = assetProfiles[slug];
                const href = p(`/portfolio/${slug}`);
                const place = asset.media ? asset.district[locale] : creangaProfile.district.value[locale];
                return (
                  <article key={slug} className={`xp-piece xp-piece--${layout}`} data-category={profile.category}>
                    <Link href={href} className="xp-piece__figure" aria-label={`${asset.name} — ${c.open}`} data-reveal>
                      <figure className="xp-fig" style={{ "--ratio": ratio } as CSSProperties}>
                        {asset.media ? (
                          <ArtImage media={asset.media} alt={`${asset.name} — ${asset.positioning[locale]}`} sizes={layout === "feature" ? "100vw" : "(min-width: 1024px) 55vw, 100vw"} depth={14} priority={layout === "feature"} />
                        ) : (
                          <ConceptImage id="portfolio.creanga-78" locale={locale} sizes="(min-width: 1024px) 55vw, 100vw" depth={14} />
                        )}
                      </figure>
                    </Link>
                    <div className="xp-piece__copy" data-reveal>
                      <p className="xp-eyebrow"><span>{place} · {profile.format.value[locale]}{profile.format.status === "DEMO" ? <DemoMark /> : null}</span></p>
                      <h2 className="xp-piece__name"><Link href={href}>{asset.name}</Link></h2>
                      <p className="xp-piece__reason">{fit.reason[locale]}</p>
                      <div className="xp-piece__best">
                        <span>{c.best}</span>
                        <ul className="xp-tags">
                          {fit.bestFor.map((key) => (
                            <li key={key}>{typeLabel(key)}</li>
                          ))}
                        </ul>
                      </div>
                      <Ledger locale={locale} items={[
                        { label: c.area, point: profile.area },
                        { label: c.availability, point: profile.availability },
                      ]} />
                      <div className="xp-actions">
                        <Button href={href}>{c.open}</Button>
                        <TextLink href={`${p("/contact")}?subject=lease&property=${slug}#occupier`}>{c.check}</TextLink>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </CollectionFilter>
        </div>
      </section>

      {/* DEVELOPMENT — light */}
      <section className="xp-sec xp-sec--warm" id="development">
        <div className="xp-shell">
          <Opening no="03" label={c.devLabel} title={c.devTitle} lead={c.devLead} className="xp-opening--split" />
          <div className="xp-pair">
            <Link href={p(`/development/${vatra.slug}`)} data-reveal>
              <figure className="xp-fig" style={{ "--ratio": "16 / 10" } as CSSProperties}>
                <ArtImage media={vatra.media!} alt={`${vatra.name} — ${vatra.status[locale]}`} sizes="(min-width: 720px) 58vw, 100vw" depth={12} position="50% 70%" />
              </figure>
              <h3>{vatra.name}</h3>
              <p>{vatra.status[locale]} · {c.stage} {vatraProfile.stage.value[locale]}</p>
            </Link>
            <Link href={p(`/development/${drochia.slug}`)} data-reveal>
              <figure className="xp-fig" style={{ "--ratio": "4 / 5" } as CSSProperties}>
                <ConceptImage id="development.drochia" locale={locale} sizes="(min-width: 720px) 40vw, 100vw" depth={12} />
              </figure>
              <h3>{drochia.name}</h3>
              <p>{c.concept} · {c.site} {drochiaProfile.site.value[locale]}</p>
            </Link>
          </div>
        </div>
      </section>

      {/* CLOSE — routes to the matcher */}
      <section className="xp-sec xp-sec--stone">
        <div className="xp-shell xp-close">
          <div data-reveal>
            <p className="xp-eyebrow"><span className="xp-eyebrow__no">04</span><span>{c.closeLabel}</span></p>
            <h2 className="xp-close__title">{c.closeTitle}</h2>
          </div>
          <nav className="xp-close__routes" aria-label={c.closeLabel} data-reveal>
            {c.routes.map(([label, path, anchor]) => (
              <Link key={label} href={`${p(path)}#${anchor}`}>
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

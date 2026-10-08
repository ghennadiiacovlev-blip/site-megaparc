import Link from "next/link";
import type { CSSProperties } from "react";
import { ConceptImage, DemoMark, Ledger, Opening } from "@/components/experience";
import { UnitCard } from "@/components/leasing/unit-card";
import { UnitPlan } from "@/components/leasing/unit-plan";
import { LocationSection } from "@/components/location-section";
import { PageShell } from "@/components/page-shell";
import { PhotoStoryboard } from "@/components/photo-storyboard";
import { ArtImage, FactList } from "@/components/primitives";
import { Button, Icon, TextLink } from "@/components/ui";
import { isDemoField, nextProject, spacesFor, type ProjectEntry } from "@/content/source";
import { assetProfiles, creangaProfile, imageUses, tenantFit, type Requirement } from "@/data/demo-content";
import type { AssetSlug } from "@/lib/assets";
import { fitCopy, needs as needCopy, uses as useTaxonomy } from "@/lib/leasing";
import { localePath, type Localized, type SiteLocale } from "@/lib/site-data";

/**
 * INCOME PROPERTY PAGE — beautiful but practical (OWNER correction 2026-10-08):
 * why this property → location → photography → key facts → available now →
 * who it fits → technical information → gallery → plan → request a viewing.
 * Confirmed copy from src/lib/assets.ts; profile values from
 * src/data/demo-content.ts and spaces from the content source, each with its
 * status (DEMO values carry the ring). No rent or commercial term is shown.
 */
const copy = {
  back: { ro: "Proiecte", ru: "Проекты", en: "Projects" },
  viewing: { ro: "Solicită o vizionare", ru: "Запросить просмотр", en: "Request a viewing" },
  spaces: { ro: "Vezi spațiile libere", ru: "Смотреть свободные помещения", en: "See the available spaces" },
  whyLabel: { ro: "De ce acest obiect", ru: "Почему этот объект", en: "Why this property" },
  locationLabel: { ro: "Localizare", ru: "Расположение", en: "Location" },
  placeLabel: { ro: "Vizibilitate, intrare, parcare", ru: "Видимость, вход, парковка", en: "Visibility, entrance, parking" },
  photoLabel: { ro: "Fotografie", ru: "Фотография", en: "Photography" },
  factsLabel: { ro: "Date cheie", ru: "Ключевые факты", en: "Key facts" },
  availableLabel: { ro: "Acum se închiriază", ru: "Сейчас сдаётся", en: "Available now" },
  availableTitle: { ro: "Spațiile libere în această clădire.", ru: "Свободные помещения в этом здании.", en: "The available spaces in this building." },
  noneTitle: { ro: "Acum toate spațiile sunt închiriate.", ru: "Сейчас все помещения сданы.", en: "All spaces are currently leased." },
  noneText: { ro: "Lăsați o cerere — vă scriem când se eliberează un spațiu aici.", ru: "Оставьте запрос — напишем, когда здесь освободится помещение.", en: "Leave a request — we write when a space frees up here." },
  noneCta: { ro: "Lasă o cerere", ru: "Оставить запрос", en: "Leave a request" },
  fitLabel: { ro: "Cui i se potrivește", ru: "Кому подходит", en: "Who it fits" },
  fitTitle: { ro: "Pentru cine lucrează această clădire.", ru: "Для кого работает это здание.", en: "Who this building works for." },
  whyItWorks: { ro: "De ce funcționează", ru: "Почему это работает", en: "Why it works" },
  techLabel: { ro: "Informații tehnice", ru: "Техническая информация", en: "Technical information" },
  techTitle: { ro: "Ce suportă clădirea.", ru: "Технические возможности здания.", en: "What the building can take." },
  improveLabel: { ro: "Ce îmbunătățim ca proprietar", ru: "Что мы улучшаем как собственник", en: "What we improve as the owner" },
  galleryLabel: { ro: "Galerie", ru: "Галерея", en: "Gallery" },
  planLabel: { ro: "Plan", ru: "План", en: "Plan" },
  format: { ro: "Format", ru: "Формат", en: "Format" },
  area: { ro: "Suprafață", ru: "Площадь", en: "Area" },
  land: { ro: "Teren", ru: "Участок", en: "Land plot" },
  parking: { ro: "Parcare", ru: "Парковка", en: "Parking" },
  acquired: { ro: "Cumpărat", ru: "Куплен", en: "Acquired" },
  repositioned: { ro: "Renovat", ru: "Обновлён", en: "Renovated" },
  nextLabel: { ro: "Următorul proiect", ru: "Следующий проект", en: "Next project" },
  closeTitle: { ro: "Vedeți clădirea cu ochii dumneavoastră.", ru: "Посмотрите здание своими глазами.", en: "See the building for yourself." },
  closeText: { ro: "Spuneți-ne ce deschideți și ce este critic — pregătim vizionarea cu răspunsurile tehnice la îndemână.", ru: "Расскажите, что вы открываете и что для вас важно, — к просмотру подготовим ответы на технические вопросы.", en: "Tell us what you are opening and what is critical — we prepare the viewing with the technical answers at hand." },
} satisfies Record<string, Localized>;

const placeKeys: Requirement[] = ["visibility", "parking", "entrance"];
const techKeys: Requirement[] = ["ground", "power", "ventilation", "delivery", "flexible"];

function CapabilityRows({ slug, keys, locale }: { slug: AssetSlug; keys: Requirement[]; locale: SiteLocale }) {
  const fit = tenantFit[slug];
  return (
    <div className="xp-cap">
      {keys.map((key) => {
        const capability = fit.capabilities[key];
        return (
          <div key={key} className="xp-cap__row">
            <span className="xp-cap__label">{needCopy[key].label[locale]}</span>
            <span className={`xp-cap__level xp-cap__level--${capability.level}`}>
              {fitCopy[capability.level][locale]}
              <i aria-hidden="true"><b /><b /><b /></i>
            </span>
            <p className="xp-cap__note">
              {capability.note[locale]}
              {capability.status === "DEMO" ? <DemoMark /> : null}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export function IncomeProjectPage({ locale, project }: { locale: SiteLocale; project: ProjectEntry }) {
  const asset = project.asset!;
  const slug = asset.slug;
  const next = nextProject(project.slug);
  const p = (path: string) => localePath(locale, path);
  const fit = tenantFit[slug];
  const profile = assetProfiles[slug];
  const isCreanga = !asset.media;
  const place = project.district[locale];
  const story = isCreanga ? creangaProfile.story.value[locale].split("\n\n") : asset.story[locale];
  const lead = isCreanga ? creangaProfile.lead.value[locale] : asset.lead[locale];
  const narrative = isCreanga ? creangaProfile.narrative.value[locale] : asset.narrative[locale];
  const location = isCreanga ? creangaProfile.location.value[locale] : asset.location[locale];
  const own = spacesFor(slug);
  const viewing = `${p("/contact")}?subject=lease&property=${slug}#occupier`;
  const gallery = imageUses.filter((use) => use.id.startsWith(`asset.${slug}.gallery`));
  const typeOf = (key: string) => useTaxonomy.find((t) => t.key === key);
  const firstPlan = own[0];
  let n = 0;
  const no = () => String(++n).padStart(2, "0");

  return (
    <PageShell locale={locale} experience mainClassName="xp-asset">
      {/* 01 WHY THIS PROPERTY */}
      <section className="xp-asset-hero">
        <div className="xp-asset-hero__media" data-reveal>
          {isCreanga ? <ConceptImage id="asset.creanga-78.hero" locale={locale} priority depth={18} /> : <ArtImage media={asset.media!} alt={`${asset.name} — ${asset.positioning[locale]}`} priority depth={18} />}
        </div>
        <div className="xp-shell xp-asset-hero__panel" data-reveal>
          <div className="xp-asset-hero__top">
            <Link href={p("/projects")} className="back-link"><Icon name="left" /> {copy.back[locale]}</Link>
            <p className="xp-eyebrow"><span>{place} · {asset.city[locale]} · {profile.format.value[locale]}{profile.format.status === "DEMO" ? <DemoMark /> : null}</span></p>
          </div>
          <h1 className="xp-asset-hero__name">{asset.name}</h1>
          <p className="xp-asset-hero__reason">{fit.reason[locale]}</p>
          <div className="xp-actions">
            {own.length ? <Button href="#available">{copy.spaces[locale]}</Button> : null}
            <TextLink href={viewing}>{copy.viewing[locale]}</TextLink>
          </div>
        </div>
      </section>

      <section className="xp-sec xp-sec--warm">
        <div className="xp-shell xp-split xp-split--text">
          <div data-reveal>
            <p className="xp-eyebrow"><span className="xp-eyebrow__no">{no()}</span><span>{copy.whyLabel[locale]}</span></p>
            <h2 className="xp-split__title xp-split__title--gap">{narrative}{isCreanga ? <DemoMark /> : null}</h2>
          </div>
          <div className="xp-prose" data-reveal>
            <p className="xp-lead">{lead}</p>
            {story.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      {/* 02 LOCATION */}
      <LocationSection locale={locale} no={no()} place={place} area={asset.city[locale]} text={location} points={asset.connectivity} map={asset.map} />
      <section className="xp-sec xp-sec--paper xp-sec--flush-top">
        <div className="xp-shell" data-reveal>
          <p className="xp-label xp-label--gap">{copy.placeLabel[locale]}</p>
          <CapabilityRows slug={slug} keys={placeKeys} locale={locale} />
        </div>
      </section>

      {/* 03 PHOTOGRAPHY — the real photograph wide, then the photo direction (preview) */}
      <section className="xp-band xp-band--photo" aria-label={copy.photoLabel[locale]}>
        {isCreanga ? <ConceptImage id="asset.creanga-78.hero" locale={locale} depth={18} /> : <ArtImage media={asset.media!} alt={`${asset.name} — ${asset.positioning[locale]}`} variant="wide" depth={18} />}
        <div className="xp-shell xp-band__copy">
          <p className="xp-eyebrow"><span className="xp-eyebrow__no">{no()}</span><span>{copy.photoLabel[locale]}</span></p>
          <p className="xp-band__title">{asset.name}</p>
        </div>
      </section>
      <PhotoStoryboard slug={slug} locale={locale} media={asset.media} no={no()} />

      {/* 04 KEY FACTS */}
      <section className="xp-sec xp-sec--stone xp-sec--tight">
        <div className="xp-shell" data-reveal>
          <p className="xp-eyebrow xp-eyebrow--gap"><span className="xp-eyebrow__no">{no()}</span><span>{copy.factsLabel[locale]}</span></p>
          <Ledger locale={locale} className="xp-ledger--cols-3" items={[
            { label: copy.format[locale], point: profile.format },
            { label: copy.area[locale], point: profile.area },
            { label: copy.land[locale], point: profile.land },
            { label: copy.parking[locale], point: profile.parking },
            { label: copy.acquired[locale], point: profile.acquired },
            { label: copy.repositioned[locale], point: profile.repositioned },
          ]} />
          {asset.keyFacts.length ? <FactList facts={asset.keyFacts} locale={locale} /> : null}
        </div>
      </section>

      {/* 05 AVAILABLE NOW */}
      <section className="xp-sec" id="available">
        <div className="xp-shell">
          <Opening no={no()} label={copy.availableLabel[locale]} title={own.length ? copy.availableTitle[locale] : copy.noneTitle[locale]} lead={own.length ? undefined : copy.noneText[locale]} className="xp-opening--split" />
          {own.length ? (
            <div className="lx-rail">
              {own.map((space) => (
                <UnitCard key={space.id} space={space} locale={locale} />
              ))}
            </div>
          ) : (
            <Button href={viewing}>{copy.noneCta[locale]}</Button>
          )}
        </div>
      </section>

      {/* 06 WHO IT FITS */}
      <section className="xp-sec xp-sec--warm">
        <div className="xp-shell">
          <Opening no={no()} label={copy.fitLabel[locale]} title={copy.fitTitle[locale]} />
          <div className="xp-fit">
            <ul className="xp-fit__types" data-reveal>
              {fit.bestFor.map((key) => (
                <li key={key}>
                  {typeOf(key)?.label[locale]}
                  <span>{typeOf(key)?.goal[locale]}{fit.bestForStatus === "DEMO" ? <DemoMark /> : null}</span>
                </li>
              ))}
            </ul>
            <div data-reveal>
              <p className="xp-label">{copy.whyItWorks[locale]}</p>
              <ol className="xp-numbered">
                {fit.why.map((line) => (
                  <li key={line.en}><h3>{line[locale]}</h3></li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* 07 TECHNICAL INFORMATION */}
      <section className="xp-sec">
        <div className="xp-shell">
          <Opening no={no()} label={copy.techLabel[locale]} title={copy.techTitle[locale]} lead={asset.caveat?.[locale]} className="xp-opening--split" />
          <div className="xp-split xp-split--text">
            <div data-reveal>
              <CapabilityRows slug={slug} keys={techKeys} locale={locale} />
              {asset.building.programme.length ? <FactList facts={asset.building.programme} locale={locale} /> : null}
            </div>
            <div data-reveal>
              <p className="xp-label">{copy.improveLabel[locale]}</p>
              <ol className="xp-numbered">
                {profile.levers.map((lever) => (
                  <li key={lever.title.key}>
                    <h3>{lever.title.value[locale]}<DemoMark /></h3>
                    <p>{lever.text[locale]}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* 08 GALLERY */}
      <section className="xp-sec xp-sec--warm xp-sec--tight">
        <div className="xp-shell">
          <p className="xp-eyebrow xp-eyebrow--gap" data-reveal><span className="xp-eyebrow__no">{no()}</span><span>{copy.galleryLabel[locale]}</span></p>
          <div className="xp-gallery">
            <figure className="xp-fig" data-reveal>
              {isCreanga ? <ConceptImage id="asset.creanga-78.hero" locale={locale} sizes="100vw" depth={10} /> : <ArtImage media={asset.media!} alt={`${asset.name} — ${asset.positioning[locale]}`} variant="wide" sizes="100vw" depth={10} />}
            </figure>
            {gallery.map((use) => (
              <figure key={use.id} className="xp-fig" data-reveal>
                <ConceptImage id={use.id} locale={locale} sizes="(min-width: 720px) 50vw, 100vw" depth={8} />
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* 09 PLAN */}
      {firstPlan ? (
        <section className="xp-sec">
          <div className="xp-shell xp-split xp-split--text">
            <div data-reveal>
              <p className="xp-eyebrow"><span className="xp-eyebrow__no">{no()}</span><span>{copy.planLabel[locale]}</span></p>
              <h2 className="xp-split__title xp-split__title--gap">{firstPlan.unit[locale]}</h2>
              <TextLink href={p(`/leasing/${firstPlan.id}`)}>{copy.spaces[locale]}</TextLink>
            </div>
            <div data-reveal style={{ "--plan-max": "40rem" } as CSSProperties}>
              <UnitPlan plan={firstPlan.plan} locale={locale} demo={isDemoField(firstPlan, "plan")} title={`${asset.name} — ${firstPlan.unit[locale]}`} uid={`project-${firstPlan.id}`} />
            </div>
          </div>
        </section>
      ) : null}

      {/* 10 REQUEST A VIEWING */}
      <section className="xp-sec xp-sec--ink">
        <div className="xp-shell xp-close">
          <div data-reveal>
            <p className="xp-eyebrow"><span className="xp-eyebrow__no">{no()}</span><span>{asset.name}</span></p>
            <h2 className="xp-close__title">{copy.closeTitle[locale]}</h2>
            <p className="xp-lead xp-lead--gap xp-lead--light">{copy.closeText[locale]}</p>
            <div className="xp-actions xp-actions--top">
              <Button href={viewing} variant="light">{copy.viewing[locale]}</Button>
              {own.length ? <TextLink href={`${p("/leasing")}?project=${slug}#available`} className="tlink--light">{copy.spaces[locale]}</TextLink> : null}
            </div>
          </div>
          <nav className="xp-close__routes" aria-label={copy.nextLabel[locale]} data-reveal>
            <Link href={p(`/projects/${next.slug}`)}>
              <span><small className="xp-label">{copy.nextLabel[locale]}</small><br />{next.name}</span>
              <Icon name="arrow" size={18} />
            </Link>
            <Link href={p("/projects")}>
              {copy.back[locale]}
              <Icon name="arrow" size={18} />
            </Link>
          </nav>
        </div>
      </section>
    </PageShell>
  );
}

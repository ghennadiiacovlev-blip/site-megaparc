import Link from "next/link";
import type { CSSProperties } from "react";
import { ConceptImage, DemoMark, Ledger, Opening } from "@/components/experience";
import { LocationSection } from "@/components/location-section";
import { PageShell } from "@/components/page-shell";
import { ArtImage, FactList } from "@/components/primitives";
import { Button, Icon, TextLink } from "@/components/ui";
import { assetProfiles, creangaProfile, imageUses, leasingProcess, tenantFit, type Requirement } from "@/data/demo-content";
import { businessTypes, fitLevelCopy, requirementCopy } from "@/data/journeys";
import { getNextAsset, type PortfolioAsset } from "@/lib/assets";
import { localePath, type Localized, type SiteLocale } from "@/lib/site-data";

/**
 * PROPERTY PAGE — a decision sequence, not a wall of statistics
 * (OWNER addendum 2026-10-07):
 *   why this property → who it is for → what business problem it solves →
 *   location · visibility · access · parking → space options → technical
 *   capability → operating environment → technical data → availability and
 *   commercial process → gallery → request a viewing.
 * Confirmed copy from src/lib/assets.ts; fit, profile and process values from
 * src/data/demo-content.ts with their status (DEMO values carry the ring).
 */
const copy = {
  back: { ro: "Portofoliu", ru: "Портфель", en: "Portfolio" },
  viewing: { ro: "Solicită o vizionare", ru: "Запросить просмотр", en: "Request a viewing" },
  fits: { ro: "Se potrivește afacerii mele?", ru: "Подходит ли моему бизнесу?", en: "Does it fit my business?" },
  whoLabel: { ro: "Cui i se potrivește", ru: "Кому подходит", en: "Who it is for" },
  whoTitle: { ro: "Pentru cine lucrează acest obiect.", ru: "Для кого работает этот объект.", en: "Who this property works for." },
  whyLabel: { ro: "De ce funcționează", ru: "Почему это работает", en: "Why it works" },
  problemLabel: { ro: "Ce problemă rezolvă", ru: "Какую задачу решает", en: "The problem it solves" },
  placeLabel: { ro: "Loc, vizibilitate, acces", ru: "Место, видимость, доступ", en: "Place, visibility, access" },
  spaceLabel: { ro: "Variante de spațiu", ru: "Варианты площади", en: "Space options" },
  spaceTitle: { ro: "Cum poate fi folosit spațiul.", ru: "Как можно использовать площадь.", en: "How the space can be used." },
  techLabel: { ro: "Capacitate tehnică", ru: "Технические возможности", en: "Technical capability" },
  techTitle: { ro: "Ce suportă clădirea.", ru: "Что выдерживает здание.", en: "What the building can take." },
  operateLabel: { ro: "Mediu de exploatare", ru: "Как устроена эксплуатация", en: "Operating environment" },
  leversLabel: { ro: "Cum îl îmbunătățim", ru: "Как мы его улучшаем", en: "How we improve it" },
  dataLabel: { ro: "Date tehnice", ru: "Технические данные", en: "Technical data" },
  processLabel: { ro: "Disponibilitate și proces", ru: "Доступность и процесс", en: "Availability and process" },
  galleryLabel: { ro: "Galerie", ru: "Галерея", en: "Gallery" },
  nextLabel: { ro: "Următorul obiect", ru: "Следующий объект", en: "Next property" },
  closeTitle: { ro: "Vedeți spațiul cu ochii dumneavoastră.", ru: "Посмотрите помещение своими глазами.", en: "See the space for yourself." },
  closeText: { ro: "Spuneți-ne ce deschideți și ce este critic — pregătim vizionarea cu răspunsurile tehnice la îndemână.", ru: "Расскажите, что вы открываете и что для вас критично, — подготовим просмотр с техническими ответами под рукой.", en: "Tell us what you are opening and what is critical — we prepare the viewing with the technical answers at hand." },
  ask: { ro: "Întreabă despre acest spațiu", ru: "Задать вопрос об этом помещении", en: "Ask about this space" },
  format: { ro: "Format", ru: "Формат", en: "Format" },
  area: { ro: "Suprafață", ru: "Площадь", en: "Area" },
  land: { ro: "Teren", ru: "Участок", en: "Land plot" },
  parking: { ro: "Parcare", ru: "Парковка", en: "Parking" },
  tenants: { ro: "Chiriași", ru: "Арендаторы", en: "Tenants" },
  occupancy: { ro: "Ocupare", ru: "Заполняемость", en: "Occupancy" },
  acquired: { ro: "Achiziționat", ru: "Приобретён", en: "Acquired" },
  repositioned: { ro: "Repoziționat", ru: "Обновлён", en: "Repositioned" },
  availability: { ro: "Disponibilitate", ru: "Доступность", en: "Availability" },
  options: { ro: "Suprafața închiriabilă", ru: "Сдаваемая площадь", en: "Leasable area" },
  reply: { ro: "Răspuns", ru: "Ответ", en: "Reply" },
  viewingTime: { ro: "Vizionare", ru: "Просмотр", en: "Viewing" },
  noPrice: { ro: "Condițiile comerciale se discută direct și nu se publică.", ru: "Коммерческие условия обсуждаются напрямую и не публикуются.", en: "Commercial terms are discussed directly and are not published." },
} satisfies Record<string, Localized>;

const steps: { title: Localized; text: Localized }[] = [
  { title: { ro: "Cerințele", ru: "Требования", en: "Requirements" }, text: { ro: "Ce deschideți, ce suprafață, ce este critic.", ru: "Что открываете, какая площадь, что критично.", en: "What you open, how much space, what is critical." } },
  { title: { ro: "Vizionarea", ru: "Просмотр", en: "Viewing" }, text: { ro: "Pe obiect, cu specialistul tehnic.", ru: "На объекте, вместе с техническим специалистом.", en: "On site, with the technical specialist." } },
  { title: { ro: "Verificare tehnică", ru: "Техническая проверка", en: "Technical check" }, text: { ro: "Putere, ventilație, acces, amenajare.", ru: "Мощность, вентиляция, доступ, отделка.", en: "Power, ventilation, access, fit-out." } },
  { title: { ro: "Propunerea", ru: "Предложение", en: "Proposal" }, text: { ro: "Condiții adaptate formatului dumneavoastră.", ru: "Условия под ваш формат.", en: "Terms adapted to your format." } },
  { title: { ro: "Contract și amenajare", ru: "Договор и отделка", en: "Lease and fit-out" }, text: { ro: "Predarea spațiului și deschiderea.", ru: "Передача помещения и открытие.", en: "Handover and opening." } },
];

const placeKeys: Requirement[] = ["visibility", "parking", "entrance"];
const techKeys: Requirement[] = ["ground", "power", "ventilation", "delivery", "flexible"];

function CapabilityRows({ slug, keys, locale }: { slug: PortfolioAsset["slug"]; keys: Requirement[]; locale: SiteLocale }) {
  const fit = tenantFit[slug];
  return (
    <div className="xp-cap">
      {keys.map((key) => {
        const capability = fit.capabilities[key];
        return (
          <div key={key} className="xp-cap__row">
            <span className="xp-cap__label">{requirementCopy[key].label[locale]}</span>
            <span className={`xp-cap__level xp-cap__level--${capability.level}`}>
              {fitLevelCopy[capability.level][locale]}
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

export function AssetDetailPage({ locale, asset }: { locale: SiteLocale; asset: PortfolioAsset }) {
  const next = getNextAsset(asset.slug);
  const p = (path: string) => localePath(locale, path);
  const fit = tenantFit[asset.slug];
  const profile = assetProfiles[asset.slug];
  const isCreanga = !asset.media;
  const place = isCreanga ? creangaProfile.district.value[locale] : asset.district[locale];
  const story = isCreanga ? creangaProfile.story.value[locale].split("\n\n") : asset.story[locale];
  const lead = isCreanga ? creangaProfile.lead.value[locale] : asset.lead[locale];
  const narrative = isCreanga ? creangaProfile.narrative.value[locale] : asset.narrative[locale];
  const location = isCreanga ? creangaProfile.location.value[locale] : asset.location[locale];
  const viewing = `${p("/contact")}?subject=lease&property=${asset.slug}#occupier`;
  const gallery = imageUses.filter((use) => use.id.startsWith(`asset.${asset.slug}.gallery`));
  const typeLabel = (key: string) => businessTypes.find((t) => t.key === key)!;
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
            <Link href={p("/portfolio")} className="back-link"><Icon name="left" /> {copy.back[locale]}</Link>
            <p className="xp-eyebrow"><span>{place} · {asset.city[locale]} · {profile.format.value[locale]}{profile.format.status === "DEMO" ? <DemoMark /> : null}</span></p>
          </div>
          <h1 className="xp-asset-hero__name">{asset.name}</h1>
          <p className="xp-asset-hero__reason">{fit.reason[locale]}</p>
          <div className="xp-actions">
            <Button href={viewing}>{copy.viewing[locale]}</Button>
            <TextLink href={`${p("/opportunities")}?type=${fit.bestFor[0]}#occupier`}>{copy.fits[locale]}</TextLink>
          </div>
        </div>
      </section>

      {/* 02 WHO IT IS FOR + WHY IT WORKS */}
      <section className="xp-sec xp-sec--warm">
        <div className="xp-shell">
          <Opening no={no()} label={copy.whoLabel[locale]} title={copy.whoTitle[locale]} />
          <div className="xp-fit">
            <ul className="xp-fit__types" data-reveal>
              {fit.bestFor.map((key) => (
                <li key={key}>
                  {typeLabel(key).label[locale]}
                  <span>{typeLabel(key).goal[locale]}{fit.bestForStatus === "DEMO" ? <DemoMark /> : null}</span>
                </li>
              ))}
            </ul>
            <div data-reveal>
              <p className="xp-label">{copy.whyLabel[locale]}</p>
              <ol className="xp-numbered">
                {fit.why.map((line) => (
                  <li key={line.en}><h3>{line[locale]}</h3></li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* 03 THE BUSINESS PROBLEM IT SOLVES */}
      <section className="xp-sec">
        <div className="xp-shell xp-split xp-split--text">
          <div data-reveal>
            <p className="xp-eyebrow"><span className="xp-eyebrow__no">{no()}</span><span>{copy.problemLabel[locale]}</span></p>
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

      {/* 04 PLACE · VISIBILITY · ACCESS · PARKING */}
      <LocationSection
        locale={locale}
        no={no()}
        place={place}
        area={asset.city[locale]}
        text={location}
        points={asset.connectivity}
        map={asset.map}
      />
      <section className="xp-sec xp-sec--paper xp-sec--flush-top">
        <div className="xp-shell" data-reveal>
          <p className="xp-label xp-label--gap">{copy.placeLabel[locale]}</p>
          <CapabilityRows slug={asset.slug} keys={placeKeys} locale={locale} />
        </div>
      </section>

      {/* 05 SPACE OPTIONS */}
      <section className="xp-sec">
        <div className="xp-shell xp-split xp-split--text">
          <div data-reveal>
            <p className="xp-eyebrow"><span className="xp-eyebrow__no">{no()}</span><span>{copy.spaceLabel[locale]}</span></p>
            <h2 className="xp-split__title xp-split__title--gap">{copy.spaceTitle[locale]}</h2>
          </div>
          <div className="xp-prose" data-reveal>
            <Ledger locale={locale} className="xp-ledger--pair" items={[
              { label: copy.options[locale], point: profile.area, hint: fit.area.note?.[locale] },
              { label: copy.availability[locale], point: profile.availability },
            ]} />
            {asset.building.text[locale] ? <p>{asset.building.text[locale]}</p> : null}
            {asset.building.programme.length ? <FactList facts={asset.building.programme} locale={locale} /> : null}
          </div>
        </div>
      </section>

      {/* 06 TECHNICAL CAPABILITY */}
      <section className="xp-sec xp-sec--warm">
        <div className="xp-shell">
          <Opening no={no()} label={copy.techLabel[locale]} title={copy.techTitle[locale]} lead={asset.caveat?.[locale]} className="xp-opening--split" />
          <div data-reveal>
            <CapabilityRows slug={asset.slug} keys={techKeys} locale={locale} />
          </div>
        </div>
      </section>

      {/* 07 OPERATING ENVIRONMENT + LEVERS */}
      <section className="xp-sec">
        <div className="xp-shell xp-split xp-split--text">
          <div data-reveal>
            <p className="xp-eyebrow"><span className="xp-eyebrow__no">{no()}</span><span>{copy.operateLabel[locale]}</span></p>
            <p className="xp-lead xp-lead--gap">{asset.operatingLogic.text[locale] || creangaProfile.audience.value[locale]}</p>
            {asset.operatingLogic.points.length ? (
              <ul className="xp-ticks xp-ticks--gap">
                {asset.operatingLogic.points.map((point) => (
                  <li key={point.en}>{point[locale]}</li>
                ))}
              </ul>
            ) : null}
          </div>
          <div data-reveal>
            <p className="xp-label">{copy.leversLabel[locale]}</p>
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
      </section>

      {/* 08 TECHNICAL DATA — after the reasons, never before */}
      <section className="xp-sec xp-sec--stone xp-sec--tight">
        <div className="xp-shell" data-reveal>
          <p className="xp-eyebrow xp-eyebrow--gap"><span className="xp-eyebrow__no">{no()}</span><span>{copy.dataLabel[locale]}</span></p>
          <Ledger locale={locale} items={[
            { label: copy.format[locale], point: profile.format },
            { label: copy.area[locale], point: profile.area },
            { label: copy.land[locale], point: profile.land },
            { label: copy.parking[locale], point: profile.parking },
            { label: copy.tenants[locale], point: profile.tenants },
            { label: copy.occupancy[locale], point: profile.occupancy },
            { label: copy.acquired[locale], point: profile.acquired },
            { label: copy.repositioned[locale], point: profile.repositioned },
          ]} />
        </div>
      </section>

      {/* 09 AVAILABILITY + COMMERCIAL PROCESS */}
      <section className="xp-sec" id="availability">
        <div className="xp-shell">
          <Opening no={no()} label={copy.processLabel[locale]} title={<>{profile.availability.value[locale]}{profile.availability.status === "DEMO" ? <DemoMark /> : null}</>} lead={copy.noPrice[locale]} className="xp-opening--split" />
          <ol className="xp-process" style={{ "--n": steps.length } as CSSProperties} data-reveal>
            {steps.map((step) => (
              <li key={step.title.en}>
                <h3>{step.title[locale]}</h3>
                <p>{step.text[locale]}</p>
              </li>
            ))}
          </ol>
          <Ledger locale={locale} className="xp-ledger--pair xp-ledger--gap" items={[
            { label: copy.reply[locale], point: leasingProcess.reply },
            { label: copy.viewingTime[locale], point: leasingProcess.viewing },
          ]} />
        </div>
      </section>

      {/* 10 GALLERY — real photograph + labelled photo direction */}
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

      {/* 11 REQUEST A VIEWING */}
      <section className="xp-sec xp-sec--ink">
        <div className="xp-shell xp-close">
          <div data-reveal>
            <p className="xp-eyebrow"><span className="xp-eyebrow__no">{no()}</span><span>{asset.name}</span></p>
            <h2 className="xp-close__title">{copy.closeTitle[locale]}</h2>
            <p className="xp-lead xp-lead--gap xp-lead--light">{copy.closeText[locale]}</p>
            <div className="xp-actions xp-actions--top">
              <Button href={viewing} variant="light">{copy.viewing[locale]}</Button>
              <TextLink href={`${p("/contact")}?subject=lease&property=${asset.slug}#occupier`} className="tlink--light">{copy.ask[locale]}</TextLink>
            </div>
          </div>
          <nav className="xp-close__routes" aria-label={copy.nextLabel[locale]} data-reveal>
            <Link href={p(`/portfolio/${next.slug}`)}>
              <span><small className="xp-label">{copy.nextLabel[locale]}</small><br />{next.name}</span>
              <Icon name="arrow" size={18} />
            </Link>
            <Link href={p("/portfolio")}>
              {copy.back[locale]}
              <Icon name="arrow" size={18} />
            </Link>
          </nav>
        </div>
      </section>
    </PageShell>
  );
}

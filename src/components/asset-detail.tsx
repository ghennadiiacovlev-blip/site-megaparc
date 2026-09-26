import Image from "next/image";
import Link from "next/link";
import { LocationSection } from "@/components/location-section";
import { PageShell } from "@/components/page-shell";
import { ArrowLink, ArtImage, FactGrid, FactList, MediaPlaceholder, Note, SectionIndex } from "@/components/primitives";
import { getNextAsset, type PortfolioAsset } from "@/lib/assets";
import { localePath, ui, type Localized, type SiteLocale } from "@/lib/site-data";

const copy = {
  back: { ro: "Portofoliu", ru: "Портфель", en: "Portfolio" },
  positioning: { ro: "Poziționare", ru: "Позиционирование", en: "Positioning" },
  story: { ro: "Povestea activului", ru: "История актива", en: "Asset story" },
  facts: { ro: "Date cheie", ru: "Ключевые данные", en: "Key facts" },
  building: { ro: "Clădire / Spațiu", ru: "Здание / Пространство", en: "Building / Space" },
  programme: { ro: "Program pe niveluri", ru: "Поэтажная программа", en: "Floor programme" },
  logic: { ro: "Logica de operare", ru: "Логика эксплуатации", en: "Operating logic" },
  character: { ro: "Caracterul activului", ru: "Характер актива", en: "Asset character" },
  distinctive: { ro: "Ce îl face distinct", ru: "Что делает его особенным", en: "What makes it distinctive" },
  relevance: { ro: "Cum rămâne relevant", ru: "Как он остаётся актуальным", en: "How it stays relevant" },
  availability: { ro: "Disponibilitate", ru: "Доступность", en: "Availability" },
  availabilityNote: {
    ro: "Condițiile comerciale și tehnice se discută direct și nu sunt publicate.",
    ru: "Коммерческие и технические условия обсуждаются напрямую и не публикуются.",
    en: "Commercial and technical conditions are discussed directly and are not published.",
  },
  enquiry: { ro: "Discută despre acest activ", ru: "Обсудить этот объект", en: "Discuss this asset" },
  architecture: { ro: "Arhitectură", ru: "Архитектура", en: "Architecture" },
} satisfies Record<string, Localized>;

const country = { ro: "Republica Moldova", ru: "Республика Молдова", en: "Republic of Moldova" } as const;

export function AssetDetailPage({ locale, asset }: { locale: SiteLocale; asset: PortfolioAsset }) {
  const next = getNextAsset(asset.slug);
  const p = (path: string) => localePath(locale, path);
  const place = asset.district.en === asset.city.en ? asset.city[locale] : `${asset.district[locale]} · ${asset.city[locale]}`;
  const hasBuilding = Boolean(asset.building.text.en);
  const hasLogic = Boolean(asset.operatingLogic.text.en);
  const hasCharacter = Boolean(asset.character.en);
  let section = 0;
  const no = () => String(++section).padStart(2, "0");

  return (
    <PageShell locale={locale} mainClassName="asset-detail">
      <section className="asset-detail__identity paper">
        <div className="shell">
          <div className="asset-detail__top">
            <Link href={p("/portfolio")} className="back-link">← {copy.back[locale]}</Link>
            <span>{ui.portfolioLine[locale]} · {asset.status[locale]}</span>
          </div>
          <div className="asset-detail__title" data-reveal>
            <p className="eyebrow eyebrow--red">{place.toUpperCase()}</p>
            <h1>{asset.name}</h1>
            <p className="asset-detail__positioning">{asset.headline[locale]}</p>
          </div>
          <dl className="asset-detail__meta" data-reveal>
            <div>
              <dt>{ui.status[locale]}</dt>
              <dd>{asset.status[locale]}</dd>
            </div>
            <div>
              <dt>{ui.location[locale]}</dt>
              <dd>{place}</dd>
            </div>
            <div>
              <dt>{ui.use[locale]}</dt>
              <dd>{asset.use[locale]}</dd>
            </div>
            <div>
              <dt>{ui.role[locale]}</dt>
              <dd>{ui.portfolioLine[locale]}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="asset-detail__visual" data-reveal aria-label={copy.architecture[locale]}>
        {asset.media ? (
          <ArtImage media={asset.media} alt={`${asset.name} — ${asset.headline[locale]}`} priority depth={22} />
        ) : (
          <MediaPlaceholder title={ui.photoPending[locale]} note={`${asset.name} · ${asset.city[locale]}`} compact />
        )}
        <div className="asset-detail__visual-label">
          <span>{copy.architecture[locale]}</span>
          <span>{asset.name} · {asset.city[locale]}</span>
        </div>
      </section>

      <section className="asset-detail__story paper">
        <div className="shell">
          <SectionIndex no={no()}>{copy.positioning[locale]}</SectionIndex>
          <div className="copy-grid" data-reveal>
            <div>
              <p className="asset-detail__narrative">{asset.narrative[locale]}</p>
              <h2>{asset.headline[locale]}</h2>
            </div>
            <div>
              <p className="lead">{asset.lead[locale]}</p>
              <span className="label label--red">{copy.story[locale]}</span>
              <div className="prose" style={{ marginTop: "1.2rem" }}>
                {asset.story[locale].map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              {asset.keyFacts.length ? null : <Note>{ui.onRequest[locale]}</Note>}
            </div>
          </div>
          {asset.keyFacts.length ? (
            <div className="asset-detail__facts" data-reveal>
              <SectionIndex no={no()}>{copy.facts[locale]}</SectionIndex>
              <FactGrid facts={asset.keyFacts} locale={locale} />
              {asset.caveat ? <Note>{asset.caveat[locale]}</Note> : null}
            </div>
          ) : null}
        </div>
      </section>

      {asset.media ? (
        <section className="asset-detail__band" aria-hidden="true">
          <Image src={asset.media.wide} alt="" fill sizes="100vw" data-depth="18" style={{ objectPosition: "50% 50%" }} />
        </section>
      ) : null}

      <LocationSection
        locale={locale}
        no={no()}
        place={asset.district[locale]}
        area={asset.district.en === asset.city.en ? country[locale] : asset.city[locale]}
        text={asset.location[locale]}
        points={asset.connectivity}
        map={asset.map}
      />

      {hasBuilding ? (
        <section className="asset-detail__building stone">
          <div className="shell">
            <SectionIndex no={no()}>{copy.building[locale]}</SectionIndex>
            <div className="copy-grid" data-reveal>
              <h2>{asset.building.programme.length ? copy.programme[locale] : copy.building[locale]}</h2>
              <div>
                <p className="lead">{asset.building.text[locale]}</p>
                {asset.building.programme.length ? <FactList facts={asset.building.programme} locale={locale} /> : null}
              </div>
            </div>
            {asset.building.features.length ? (
              <ul className="characteristics" data-reveal>
                {asset.building.features.map((item) => (
                  <li key={item.en}>{item[locale]}</li>
                ))}
              </ul>
            ) : null}
          </div>
        </section>
      ) : null}

      {hasLogic ? (
        <section className="asset-detail__logic graphite">
          <div className="shell">
            <SectionIndex no={no()} inverse>{copy.logic[locale]}</SectionIndex>
            <div className="logic__grid" data-reveal>
              <h2>{asset.narrative[locale]}</h2>
              <div>
                <p className="logic__text">{asset.operatingLogic.text[locale]}</p>
                <ul className="logic__points">
                  {asset.operatingLogic.points.map((point) => (
                    <li key={point.en}>{point[locale]}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {hasCharacter ? (
        <section className="character paper">
          <div className="shell">
            <SectionIndex no={no()}>{copy.character[locale]}</SectionIndex>
            <div className="character__grid">
              <div data-reveal>
                <h3>{copy.distinctive[locale]}</h3>
                <p>{asset.character[locale]}</p>
              </div>
              <div data-reveal>
                <h3>{copy.relevance[locale]}</h3>
                <p>{asset.relevance[locale]}</p>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {asset.availability ? (
        <section className="availability-band stone" id="availability">
          <div className="shell">
            <SectionIndex no={no()}>{copy.availability[locale]}</SectionIndex>
            <div className="availability-band__grid" data-reveal>
              <h2>{asset.availability.headline[locale]}</h2>
              <div>
                <dl className="availability-band__facts">
                  <div>
                    <dt>{ui.totalArea[locale]}</dt>
                    <dd>{asset.availability.area[locale]}</dd>
                  </div>
                  {asset.availability.from ? (
                    <div>
                      <dt>{ui.availableFrom[locale]}</dt>
                      <dd>{asset.availability.from[locale]}</dd>
                    </div>
                  ) : null}
                </dl>
                <Note>{copy.availabilityNote[locale]}</Note>
                <div className="availability-band__actions">
                  <ArrowLink href={`${p("/contact")}#occupier`} strong>{ui.requestDetails[locale]}</ArrowLink>
                  <ArrowLink href={`${p("/contact")}#occupier`}>{ui.contactUs[locale]}</ArrowLink>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section className="enquiry ink">
        <div className="shell">
          <SectionIndex no={no()} inverse>{copy.enquiry[locale]}</SectionIndex>
          <div className="enquiry__grid" data-reveal>
            <h2>{asset.name}</h2>
            <div className="enquiry__actions">
              <ArrowLink href={`${p("/contact")}#occupier`} inverse strong>{ui.discussAsset[locale]}</ArrowLink>
              <ArrowLink href={p("/opportunities")} inverse>{ui.viewOpportunities[locale]}</ArrowLink>
            </div>
          </div>
          <Link href={p(`/portfolio/${next.slug}`)} className="next-asset" data-reveal>
            <span className="label">{ui.nextAsset[locale]}</span>
            <span className="next-asset__name">{next.name}</span>
            <span className="next-asset__meta">{next.positioning[locale]} · {next.city[locale]}</span>
            <span className="next-asset__arrow" aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </PageShell>
  );
}


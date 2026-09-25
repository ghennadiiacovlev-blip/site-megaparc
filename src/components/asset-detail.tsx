import Image from "next/image";
import Link from "next/link";
import { LocationSection } from "@/components/location-section";
import { PageShell } from "@/components/page-shell";
import { ArrowLink, FactGrid, FactList, MediaPlaceholder, Note, SectionIndex } from "@/components/primitives";
import { getNextAsset, type PortfolioAsset } from "@/lib/assets";
import { localePath, ui, type SiteLocale } from "@/lib/site-data";

const copy = {
  ro: {
    back: "Portofoliu",
    eyebrow: "MEGAPARC / Activ operațional",
    architecture: "Arhitectură",
    locationIndex: "Localizare și poziționare",
    profileIndex: "Profilul activului",
    factsIndex: "Date cheie",
    programmeIndex: "Program pe niveluri",
    characteristicsIndex: "Caracteristici",
    approachIndex: "Abordarea MEGAPARC",
    approachLead: "Activul este administrat cu perspectiva proprietarului: calitate fizică, utilizare relevantă și valoare pe termen lung.",
    steps: [
      ["Înțelegem activul", "Locație, utilizare, structură și context urban."],
      ["Protejăm calitatea", "Întreținere, investiții și standard fizic pe termen lung."],
      ["Administrăm utilizarea", "Leasing, operare și relația cu utilizatorii ca decizie de investiție."],
      ["Construim relevanță", "Adaptăm activul înainte ca utilizarea să devină învechită."],
    ],
    availabilityIndex: "Oportunitate comercială",
    availabilityTitle: "Disponibil în prezent",
    enquiryIndex: "Solicitare",
  },
  ru: {
    back: "Портфель",
    eyebrow: "MEGAPARC / Операционный актив",
    architecture: "Архитектура",
    locationIndex: "Расположение и позиционирование",
    profileIndex: "Профиль объекта",
    factsIndex: "Ключевые данные",
    programmeIndex: "Поэтажная программа",
    characteristicsIndex: "Характеристики",
    approachIndex: "Подход MEGAPARC",
    approachLead: "Актив управляется с позиции собственника: физическое качество, востребованное назначение и долгосрочная стоимость.",
    steps: [
      ["Понимаем актив", "Расположение, назначение, конструкция и городской контекст."],
      ["Сохраняем качество", "Обслуживание, инвестиции и физический стандарт на долгий срок."],
      ["Управляем использованием", "Аренда, эксплуатация и отношения с арендаторами как инвестиционное решение."],
      ["Формируем актуальность", "Адаптируем актив до того, как его использование устареет."],
    ],
    availabilityIndex: "Коммерческое предложение",
    availabilityTitle: "Доступно сейчас",
    enquiryIndex: "Запрос",
  },
  en: {
    back: "Portfolio",
    eyebrow: "MEGAPARC / Operating asset",
    architecture: "Architecture",
    locationIndex: "Location and positioning",
    profileIndex: "Asset profile",
    factsIndex: "Key facts",
    programmeIndex: "Floor programme",
    characteristicsIndex: "Characteristics",
    approachIndex: "MEGAPARC approach",
    approachLead: "The asset is managed with an owner's perspective: physical quality, relevant use and long-term value.",
    steps: [
      ["Understand the asset", "Location, use, structure and urban context."],
      ["Protect quality", "Maintenance, capital expenditure and physical standard over the long term."],
      ["Manage use", "Leasing, operations and the occupier relationship as an investment decision."],
      ["Build relevance", "We adapt the asset before its use becomes outdated."],
    ],
    availabilityIndex: "Commercial opportunity",
    availabilityTitle: "Currently available",
    enquiryIndex: "Enquiry",
  },
} as const;

const country = { ro: "Republica Moldova", ru: "Республика Молдова", en: "Republic of Moldova" } as const;

export function AssetDetailPage({ locale, asset }: { locale: SiteLocale; asset: PortfolioAsset }) {
  const c = copy[locale];
  const next = getNextAsset(asset.slug);
  const p = (path: string) => localePath(locale, path);
  const place = asset.district.en === asset.city.en ? asset.city[locale] : `${asset.district[locale]} · ${asset.city[locale]}`;
  let section = 0;
  const no = () => String(++section).padStart(2, "0");

  return (
    <PageShell locale={locale} mainClassName="asset-detail">
      <section className="asset-detail__identity paper">
        <div className="shell">
          <div className="asset-detail__top">
            <Link href={p("/portfolio")} className="back-link">← {c.back}</Link>
            <span>{asset.status[locale]}</span>
          </div>
          <div className="asset-detail__title" data-reveal>
            <p className="eyebrow eyebrow--red">{place.toUpperCase()}</p>
            <h1>{asset.name}</h1>
            <p className="asset-detail__positioning">{asset.positioning[locale]}</p>
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
              <dd>{ui.ownedManaged[locale]}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="asset-detail__visual" data-reveal aria-label={c.architecture}>
        {asset.image ? (
          <Image
            src={asset.image}
            alt={`${asset.name} — MEGAPARC`}
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            style={{ objectPosition: asset.imagePosition ?? "center" }}
            className="asset-detail__image"
            data-depth="22"
          />
        ) : (
          <MediaPlaceholder title={ui.photoPending[locale]} note={`${asset.name} · ${asset.city[locale]}`} compact />
        )}
        <div className="asset-detail__visual-label">
          <span>{c.architecture}</span>
          <span>{asset.name} · {asset.city[locale]}</span>
        </div>
      </section>

      <section className="asset-detail__profile paper">
        <div className="shell">
          <SectionIndex no={no()}>{c.profileIndex}</SectionIndex>
          <div className="copy-grid" data-reveal>
            <h2>{asset.positioning[locale]}</h2>
            <div>
              <p className="lead">{asset.intro[locale]}</p>
              {asset.facts.length ? null : <Note>{ui.onRequest[locale]}</Note>}
            </div>
          </div>
          {asset.facts.length ? (
            <div className="asset-detail__facts" data-reveal>
              <SectionIndex no={no()}>{c.factsIndex}</SectionIndex>
              <FactGrid facts={asset.facts} locale={locale} />
            </div>
          ) : null}
        </div>
      </section>

      <LocationSection
        locale={locale}
        no={no()}
        place={asset.district[locale]}
        area={asset.district.en === asset.city.en ? country[locale] : asset.city[locale]}
        text={asset.location[locale]}
        points={asset.connectivity}
        map={asset.map}
      />

      {asset.programme.length || asset.characteristics.length ? (
        <section className="asset-detail__architecture ink">
          <div className="shell">
            <SectionIndex no={no()} inverse>{c.architecture}</SectionIndex>
            <div className="copy-grid" data-reveal>
              <h2>{asset.programme.length ? c.programmeIndex : c.characteristicsIndex}</h2>
              <div>
                <p className="lead">{asset.architecture[locale]}</p>
                {asset.programme.length ? <FactList facts={asset.programme} locale={locale} light /> : null}
              </div>
            </div>
            {asset.characteristics.length ? (
              <ul className="characteristics" data-reveal>
                {asset.characteristics.map((item) => (
                  <li key={item.en}>{item[locale]}</li>
                ))}
              </ul>
            ) : null}
          </div>
        </section>
      ) : null}

      {asset.image ? (
        <section className="asset-detail__band" aria-hidden="true">
          <Image
            src={asset.image}
            alt=""
            fill
            sizes="100vw"
            className="asset-detail__band-image"
            data-depth="18"
            style={{ objectPosition: "56% 44%" }}
          />
        </section>
      ) : null}

      <section className="approach paper approach--paper">
        <div className="shell">
          <SectionIndex no={no()}>{c.approachIndex}</SectionIndex>
          <p className="approach__lead" data-reveal>{c.approachLead}</p>
          <div className="approach__grid">
            {c.steps.map(([title, text], index) => (
              <article key={title} data-reveal>
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {asset.availability ? (
        <section className="offer ink" id="availability">
          <div className="shell">
            <SectionIndex no={no()} inverse>{c.availabilityIndex}</SectionIndex>
            <div className="offer__grid" data-reveal>
              <div>
                <p className="eyebrow eyebrow--red">{c.availabilityTitle}</p>
                <h2>{asset.availability.headline[locale]}</h2>
              </div>
              <div>
                <dl className="offer__facts">
                  <div>
                    <dt>{ui.totalArea[locale]}</dt>
                    <dd>{asset.availability.area[locale]}</dd>
                  </div>
                  <div>
                    <dt>{ui.askingRent[locale]}</dt>
                    <dd>{asset.availability.rent[locale]}</dd>
                  </div>
                  {asset.availability.from ? (
                    <div>
                      <dt>{ui.availableFrom[locale]}</dt>
                      <dd>{asset.availability.from[locale]}</dd>
                    </div>
                  ) : null}
                </dl>
                <Note light>{asset.availability.terms[locale]}</Note>
                <ArrowLink href={p("/contact")} inverse>{ui.enquire[locale]}</ArrowLink>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section className={`enquiry ${asset.availability ? "paper enquiry--paper" : "ink"}`}>
        <div className="shell">
          <SectionIndex no={no()} inverse={!asset.availability}>{c.enquiryIndex}</SectionIndex>
          <div className="enquiry__grid" data-reveal>
            <h2>{asset.name}</h2>
            <div className="enquiry__actions">
              <ArrowLink href={p("/contact")} inverse={!asset.availability}>{ui.discussAsset[locale]}</ArrowLink>
              <ArrowLink href={p("/opportunities")} inverse={!asset.availability}>{ui.viewAvailability[locale]}</ArrowLink>
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

import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { ArrowLink, DataPending, MediaPlaceholder, SectionIndex } from "@/components/primitives";
import { getNextAsset, localePath, ui, type PortfolioAsset, type SiteLocale } from "@/lib/site-data";

const copy = {
  ro: {
    back: "Portofoliu",
    eyebrow: "MEGAPARC / Activ operațional",
    architecture: "Arhitectură",
    operatingIndex: "Status operațional",
    profileIndex: "Profilul activului",
    profileLead: "Prezentarea publică a activului este construită în jurul utilizării, calității și perspectivei pe termen lung.",
    profileText: "Datele comerciale și tehnice apar numai după aprobarea pentru publicare. Nu afișăm estimări sau date interne pentru completarea vizuală a paginii.",
    approachIndex: "Abordarea MEGAPARC",
    steps: [
      ["Înțelegem activul", "Locație, utilizare, structură și context urban."],
      ["Protejăm calitatea", "Întreținere, investiții și standard fizic pe termen lung."],
      ["Administrăm utilizarea", "Leasing, operare și relația cu utilizatorii ca decizie de investiție."],
      ["Construim relevanță", "Adaptăm activul înainte ca utilizarea să devină învechită."],
    ],
    approvedIndex: "Informații aprobate",
    approvedText: "Structura publică este pregătită pentru informațiile aprobate despre acest activ.",
    approvedFields: ["Locație și acces", "Utilizare", "Caracteristici", "Disponibilități"],
    enquiryIndex: "Solicitare",
    enquiry: "Discută despre acest activ",
    availability: "Vezi disponibilitățile",
  },
  en: {
    back: "Portfolio",
    eyebrow: "MEGAPARC / Operating asset",
    architecture: "Architecture",
    operatingIndex: "Operating status",
    profileIndex: "Asset profile",
    profileLead: "The public asset profile is built around use, quality and a long-term perspective.",
    profileText: "Commercial and technical data appear only after publication approval. We do not publish estimates or internal data merely to fill the layout.",
    approachIndex: "MEGAPARC approach",
    steps: [
      ["Understand the asset", "Location, use, structure and urban context."],
      ["Protect quality", "Maintenance, capital expenditure and physical standard over the long term."],
      ["Manage use", "Leasing, operations and the occupier relationship as an investment decision."],
      ["Build relevance", "We adapt the asset before its use becomes outdated."],
    ],
    approvedIndex: "Approved information",
    approvedText: "The public structure is ready for the approved information about this asset.",
    approvedFields: ["Location and access", "Use", "Characteristics", "Availability"],
    enquiryIndex: "Enquiry",
    enquiry: "Discuss this asset",
    availability: "View availability",
  },
} as const;

export function AssetDetailPage({ locale, asset }: { locale: SiteLocale; asset: PortfolioAsset }) {
  const c = copy[locale];
  const next = getNextAsset(asset.slug);
  const p = (path: string) => localePath(locale, path);

  return (
    <PageShell locale={locale} mainClassName="asset-detail">
      <section className="asset-detail__identity paper">
        <div className="shell">
          <div className="asset-detail__top">
            <Link href={p("/portfolio")} className="back-link">← {c.back}</Link>
            <span>{asset.status[locale]}</span>
          </div>
          <div className="asset-detail__title" data-reveal>
            <p className="eyebrow eyebrow--red">{c.eyebrow}</p>
            <h1>{asset.name}</h1>
          </div>
          <dl className="asset-detail__meta" data-reveal>
            <div>
              <dt>{ui.status[locale]}</dt>
              <dd>{asset.status[locale]}</dd>
            </div>
            <div>
              <dt>{ui.location[locale]}</dt>
              <dd>{asset.city}</dd>
            </div>
            <div>
              <dt>{ui.role[locale]}</dt>
              <dd>{ui.ownedManaged[locale]}</dd>
            </div>
            <div>
              <dt>{ui.assetType[locale]}</dt>
              <dd>{asset.image ? asset.kind[locale] : ui.dataPending[locale]}</dd>
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
          <MediaPlaceholder title={ui.photoPending[locale]} note={`${asset.name} · ${asset.city}`} compact />
        )}
        <div className="asset-detail__visual-label">
          <span>{c.architecture}</span>
          <span>{asset.name} · {asset.city}</span>
        </div>
      </section>

      <section className="asset-detail__profile paper">
        <div className="shell">
          <SectionIndex no="01">{c.profileIndex}</SectionIndex>
          <div className="copy-grid" data-reveal>
            <h2>{c.profileIndex}</h2>
            <div>
              <p className="lead">{c.profileLead}</p>
              <p>{c.profileText}</p>
              <DataPending>{ui.dataPending[locale]}</DataPending>
            </div>
          </div>
        </div>
      </section>

      <section className="approach ink">
        <div className="shell">
          <SectionIndex no="02" inverse>{c.approachIndex}</SectionIndex>
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

      <section className="approved paper">
        <div className="shell">
          <SectionIndex no="03">{c.approvedIndex}</SectionIndex>
          <div className="copy-grid" data-reveal>
            <h2>{c.approvedIndex}</h2>
            <div>
              <p className="lead">{c.approvedText}</p>
              <ul className="approved__list">
                {c.approvedFields.map((field) => (
                  <li key={field}>
                    <span>{field}</span>
                    <span className="approved__state">{ui.dataPending[locale]}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="enquiry ink">
        <div className="shell">
          <SectionIndex no="04" inverse>{c.enquiryIndex}</SectionIndex>
          <div className="enquiry__grid" data-reveal>
            <h2>{asset.name}</h2>
            <div className="enquiry__actions">
              <ArrowLink href={p("/contact")} inverse>{c.enquiry}</ArrowLink>
              <ArrowLink href={p("/opportunities")} inverse>{c.availability}</ArrowLink>
            </div>
          </div>
          <Link href={p(`/portfolio/${next.slug}`)} className="next-asset" data-reveal>
            <span className="label label--light">{ui.nextAsset[locale]}</span>
            <span className="next-asset__name">{next.name}</span>
            <span className="next-asset__meta">{next.status[locale]} · {next.city}</span>
            <span className="next-asset__arrow" aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </PageShell>
  );
}

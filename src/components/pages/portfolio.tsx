import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { ArrowLink, MediaPlaceholder, PageHero, SectionIndex } from "@/components/primitives";
import { developmentProject, localePath, portfolioAssets, ui, type SiteLocale } from "@/lib/site-data";

const copy = {
  ro: {
    eyebrow: "Portofoliu de active",
    title: ["Portofoliu.", "Active reale."],
    lead: "Activele prezentate fac parte din portofoliul public MEGAPARC. Portofoliul separă activele operaționale de proiectele în dezvoltare și de disponibilitățile comerciale.",
    operatingIndex: "Active operaționale",
    developmentIndex: "Dezvoltare",
    developmentTitle: ["Un proiect gândit", "ca activ."],
    developmentText: "Proiectele în dezvoltare sunt prezentate numai cu materiale și date aprobate pentru comunicare publică.",
    developmentCta: "Explorează VATRA",
    closingIndex: "Disponibilități",
    closing: "Spațiile disponibile pentru închiriere sunt prezentate separat de portofoliul instituțional.",
    closingCta: "Vezi disponibilitățile",
  },
  en: {
    eyebrow: "Asset portfolio",
    title: ["Portfolio.", "Real assets."],
    lead: "The assets shown form part of the public MEGAPARC portfolio. The portfolio separates operating assets from development projects and commercial availability.",
    operatingIndex: "Operating assets",
    developmentIndex: "Development",
    developmentTitle: ["A project conceived", "as an asset."],
    developmentText: "Development projects are presented only with material and data approved for public communication.",
    developmentCta: "Explore VATRA",
    closingIndex: "Availability",
    closing: "Spaces available for lease are presented separately from the institutional portfolio.",
    closingCta: "View availability",
  },
} as const;

export function PortfolioIndexPage({ locale }: { locale: SiteLocale }) {
  const c = copy[locale];
  const p = (path: string) => localePath(locale, path);

  return (
    <PageShell locale={locale}>
      <PageHero
        index="02"
        eyebrow={c.eyebrow}
        title={
          <>
            {c.title[0]}
            <br />
            <span className="muted-ink">{c.title[1]}</span>
          </>
        }
        lead={c.lead}
      />

      <section className="portfolio-index paper">
        <div className="shell">
          <SectionIndex no="03">{c.operatingIndex}</SectionIndex>
          <div className="portfolio-index__grid">
            {portfolioAssets.map((asset, index) => (
              <Link
                key={asset.slug}
                href={p(`/portfolio/${asset.slug}`)}
                className={`portfolio-index__card portfolio-index__card--${index + 1}`}
                data-reveal
              >
                <div className="portfolio-index__visual">
                  {asset.image ? (
                    <Image
                      src={asset.imageSmall ?? asset.image}
                      alt={`${asset.name} — MEGAPARC`}
                      fill
                      priority={index === 0}
                      sizes={index === 0 ? "(max-width: 720px) 92vw, 62vw" : "(max-width: 720px) 92vw, 42vw"}
                      style={{ objectPosition: asset.imagePosition ?? "center" }}
                      className="portfolio-index__image"
                      data-depth="16"
                    />
                  ) : (
                    <MediaPlaceholder title={asset.name} note={ui.photoPending[locale]} compact />
                  )}
                  <span className="portfolio-index__line" aria-hidden="true" />
                </div>
                <div className="portfolio-index__caption">
                  <div>
                    <span>0{index + 1}</span>
                    <h2>{asset.name}</h2>
                  </div>
                  <div>
                    <span>{asset.status[locale]} · {asset.city}</span>
                    <span className="portfolio-index__cta">{ui.exploreAsset[locale]} ↗</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="portfolio-development ink">
        <div className="shell">
          <SectionIndex no="04" inverse>{c.developmentIndex}</SectionIndex>
          <Link href={p("/development/vatra")} className="portfolio-development__card" data-reveal>
            <div className="portfolio-development__visual">
              <Image
                src={developmentProject.image}
                alt={`${developmentProject.name} — MEGAPARC`}
                fill
                sizes="92vw"
                className="portfolio-development__image"
                data-depth="20"
                style={{ objectPosition: "50% 62%" }}
              />
              <span className="asset-media__line" aria-hidden="true" />
            </div>
            <div className="portfolio-development__caption">
              <div>
                <span className="eyebrow eyebrow--red">{developmentProject.status[locale]}</span>
                <h2>
                  {c.developmentTitle[0]}
                  <br />
                  {c.developmentTitle[1]}
                </h2>
              </div>
              <div>
                <p>{c.developmentText}</p>
                <span className="arrow-link arrow-link--inverse">
                  <span>{c.developmentCta}</span>
                  <span className="arrow-link__icon" aria-hidden="true">↗</span>
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      <section className="closing paper">
        <div className="shell closing__grid" data-reveal>
          <span className="label label--red">05 / {c.closingIndex}</span>
          <div>
            <p className="closing__statement">{c.closing}</p>
            <ArrowLink href={p("/opportunities")}>{c.closingCta}</ArrowLink>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

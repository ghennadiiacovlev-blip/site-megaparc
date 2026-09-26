import { PageShell } from "@/components/page-shell";
import { ArrowLink, ImageBreak, Note, SectionHead, SectionIndex } from "@/components/primitives";
import { portfolioAssets } from "@/lib/assets";
import { employerBrand, openVacancies } from "@/lib/careers";
import { organisationAreas } from "@/lib/team";
import { brand, localePath, type SiteLocale } from "@/lib/site-data";

export function CareersPage({ locale }: { locale: SiteLocale }) {
  const e = employerBrand;
  const image = portfolioAssets[0];
  const p = (path: string) => localePath(locale, path);

  return (
    <PageShell locale={locale}>
      <section className="employer-hero paper">
        <div className="shell">
          <div className="page-hero__meta">
            <span>01</span>
            <span>{e.kicker[locale]}</span>
          </div>
          <div className="employer-hero__grid" data-reveal>
            <h1>
              {e.direction[locale].map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h1>
            <div className="employer-hero__aside">
              <p>{e.lead[locale]}</p>
              <ArrowLink href="#positions">{e.positions.kicker[locale]}</ArrowLink>
            </div>
          </div>
        </div>
        <span className="page-hero__signature" aria-hidden="true" />
      </section>

      <section className="why stone" id="why">
        <div className="shell">
          <SectionIndex no="02">{e.why.kicker[locale]}</SectionIndex>
          <SectionHead title={e.why.title[locale]} />
          <div className="why__grid">
            {e.why.points.map((point) => (
              <article key={point.title.en} data-reveal>
                <h3>{point.title[locale]}</h3>
                <p>{point.text[locale]}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="principles stone" id="how">
        <div className="shell">
          <SectionIndex no="03">{e.how.kicker[locale]}</SectionIndex>
          <div className="principles__grid">
            {e.how.themes.map((theme, index) => (
              <article key={theme.title.en} data-reveal>
                <span>0{index + 1}</span>
                <h3>{theme.title[locale]}</h3>
                <p>{theme.text[locale]}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ImageBreak media={image.media!} alt={`${image.name} — ${image.positioning[locale]}`} caption={`${image.name} · ${brand.name}`} short />

      <section className="organisation paper" id="areas">
        <div className="shell">
          <SectionIndex no="04">{e.areas.kicker[locale]}</SectionIndex>
          <SectionHead title={e.areas.title[locale]} />
          <div className="organisation__grid">
            {organisationAreas.map((area) => (
              <article key={area.key} className="org-area" data-reveal>
                <div className="org-area__visual" aria-hidden="true">
                  <span>{brand.name} · {area.no}</span>
                  <strong>{area.no}</strong>
                </div>
                <div className="org-area__body">
                  <h3>{area.title[locale]}</h3>
                  <p className="org-area__lead">{area.lead[locale]}</p>
                  <ul className="org-area__list">
                    {area.responsibilities[locale].map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="positions ink" id="positions">
        <div className="shell">
          <SectionIndex no="05" inverse>{e.positions.kicker[locale]}</SectionIndex>
          <p className="positions__source-note">{e.positions.sourceNote[locale]}</p>
          {openVacancies.length ? (
            <div className="positions__list">
              {openVacancies.map((vacancy, index) => (
                <article key={vacancy.slug} className="positions__row" data-reveal>
                  <span>0{index + 1}</span>
                  <h3>{vacancy.title[locale]}</h3>
                  <p>{vacancy.summary[locale]}</p>
                  <a className="arrow-link arrow-link--inverse" href={vacancy.externalUrl} target="_blank" rel="noopener noreferrer">
                    <span>{e.positions.viewRole[locale]}</span>
                    <span className="arrow-link__icon" aria-hidden="true">↗</span>
                  </a>
                </article>
              ))}
              <div className="positions__all">
                <a className="arrow-link arrow-link--inverse" href={e.positions.allRolesUrl} target="_blank" rel="noopener noreferrer">
                  <span>{e.positions.allRoles[locale]}</span>
                  <span className="arrow-link__icon" aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="positions__grid" data-reveal>
              <h2>{e.positions.emptyTitle[locale]}</h2>
              <div>
                <Note light>{e.positions.emptyText[locale]}</Note>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="apply paper" id="apply">
        <div className="shell">
          <SectionIndex no="06">{e.apply.kicker[locale]}</SectionIndex>
          <div className="apply__grid" data-reveal>
            <h2>{e.apply.title[locale]}</h2>
            <div>
              <p>{e.apply.text[locale]}</p>
              <ArrowLink href={`${p("/contact")}#careers`} strong>{e.apply.cta[locale]}</ArrowLink>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

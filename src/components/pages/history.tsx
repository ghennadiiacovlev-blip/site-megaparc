import Link from "next/link";
import { MaskTitle } from "@/components/experience";
import { HistoryMap } from "@/components/history-map";
import { HistoryChronometer } from "@/components/history-motion";
import { PageShell } from "@/components/page-shell";
import { ArtImage } from "@/components/primitives";
import { Icon } from "@/components/ui";
import { getProject } from "@/content/source";
import { demoContentPresent } from "@/data/demo-content";
import { entries, eras, historyCopy, historyImages, sectorLabel, type Era, type HistoryEntry, type HistoryImageKey } from "@/lib/history";
import { localePath, publicAsset, type SiteLocale } from "@/lib/site-data";

/**
 * HISTORY — the business chronicle as a signature section (OWNER correction
 * 2026-10-08, "HISTORY MUST BECOME A SIGNATURE SECTION").
 *
 * Visual language: documentary and archival, never generic skyscrapers —
 * warm paper, catalogue cards with year stamps, documentary maps (Natural
 * Earth), monochrome era illustrations from a public archive (each captioned
 * as NOT the group's archive), designed archive frames where an original
 * photograph of the group is still awaited — then the chronicle turns into the
 * colour photographs of MEGAPARC's real buildings for TODAY.
 * Hierarchy: business origins 1991 → group investment structure 1995 →
 * MEGAPARC 2005 → the wider group 2006–2016 → consolidation 2017–2020 →
 * real-estate focus 2020 → today. Copy and claims: src/lib/history.ts.
 */

const entryImages: Partial<Record<string, HistoryImageKey>> = { romitech: "era-port", brp: "era-bottling" };
const todaySlugs = ["dacia-31", "moscova-9", "moscova-20", "vatra"];

function EraPhoto({ image, locale, className = "" }: { image: HistoryImageKey; locale: SiteLocale; className?: string }) {
  const meta = historyImages[image];
  return (
    <figure className={`hs-photo ${className}`.trim()} data-reveal>
      <picture>
        <source media="(min-width: 721px)" srcSet={publicAsset(`/assets/history/${image}.webp`)} />
        <img src={publicAsset(`/assets/history/${image}-mobile.webp`)} alt="" loading="lazy" decoding="async" />
      </picture>
      <figcaption>{historyCopy.illustration(meta.subject[locale], meta.year, locale)}</figcaption>
    </figure>
  );
}

function ArchiveFrame({ caption, locale }: { caption: string; locale: SiteLocale }) {
  return (
    <figure className="hs-frame" role="img" aria-label={`${historyCopy.archiveLabel[locale]}: ${caption}`}>
      <span className="hs-frame__marks" aria-hidden="true"><i /><i /><i /><i /></span>
      <span className="hs-frame__label" aria-hidden="true">{historyCopy.archiveLabel[locale]}</span>
      <span className="hs-frame__caption" aria-hidden="true">{caption}</span>
    </figure>
  );
}

function ArchiveCard({ entry, locale }: { entry: HistoryEntry; locale: SiteLocale }) {
  const image = entryImages[entry.id];
  return (
    <li className={`hs-card hs-card--${entry.sector}${entry.scope === "megaparc" ? " is-megaparc" : ""}`} data-reveal>
      <span className="hs-card__stamp" aria-hidden="true"><span>{entry.year}</span></span>
      <p className="hs-card__file">
        <span className="hs-card__year">{entry.year}</span>
        <span>{sectorLabel[entry.sector][locale]}</span>
        <span>{entry.place[locale]}</span>
      </p>
      <h3 className="hs-card__title">{entry.title[locale]}</h3>
      <p className="hs-card__text">{entry.text[locale]}</p>
      {image ? <EraPhoto image={image} locale={locale} className="hs-photo--card" /> : null}
      {entry.archive ? <ArchiveFrame caption={entry.archive[locale]} locale={locale} /> : null}
    </li>
  );
}

function ScopeTag({ era, locale }: { era: Era; locale: SiteLocale }) {
  return <span className={`hs-scope${era.scope === "megaparc" ? " is-megaparc" : ""}`}>{era.scope === "megaparc" ? historyCopy.scopeMegaparc[locale] : historyCopy.scopeGroup[locale]}</span>;
}

/** Two lines of one story: the group from 1991 (structure 1995), MEGAPARC from 2005, focus 2020. */
function LinesDiagram({ locale }: { locale: SiteLocale }) {
  const x = (year: number) => 40 + ((year - 1991) / (2026 - 1991)) * 920;
  const groupYears = Array.from(new Set(entries.filter((e) => e.scope === "group").map((e) => Number(e.year.slice(0, 4)))));
  return (
    <figure className="hs-lines__figure" data-xp-progress>
      <svg viewBox="0 0 1000 330" role="img" aria-label={`${historyCopy.lineGroup[locale]} · ${historyCopy.lineMegaparc[locale]} · ${historyCopy.lineFocus[locale]}`}>
        <line x1={x(1991)} y1="272" x2={x(2026)} y2="272" className="hs-lines__axis" />
        {[1991, 1995, 2005, 2020, 2026].map((year) => (
          <g key={year} className="hs-lines__tick">
            <line x1={x(year)} y1="264" x2={x(year)} y2="280" />
            <text x={x(year)} y="314" textAnchor={year === 2026 ? "end" : year === 1991 ? "start" : "middle"}>{year}</text>
          </g>
        ))}
        <path d={`M${x(1991)} 80 L${x(2017)} 80 C${x(2019)} 80 ${x(2019.5)} 200 ${x(2020)} 200`} pathLength={1} className="hs-lines__group" data-xp-term />
        <path d={`M${x(2005)} 200 L${x(2026)} 200`} pathLength={1} className="hs-lines__megaparc" data-xp-term />
        {groupYears.map((year) => (
          <circle key={year} cx={x(year)} cy="80" r={year === 1995 ? 9 : 6} className={`hs-lines__dot${year === 1995 ? " is-holding" : ""}`} />
        ))}
        <circle cx={x(2005)} cy="200" r="9" className="hs-lines__dot is-megaparc" />
        <circle cx={x(2020)} cy="200" r="11" className="hs-lines__dot is-focus" />
        <text x={x(1991)} y="46" className="hs-lines__label">{historyCopy.lineGroup[locale]}</text>
        <text x={x(1995)} y="114" className="hs-lines__note">{historyCopy.lineHolding[locale]}</text>
        <text x={x(2005)} y="176" className="hs-lines__label is-megaparc">{historyCopy.lineMegaparc[locale]}</text>
        <text x={x(2026)} y="240" textAnchor="end" className="hs-lines__note is-focus">{historyCopy.lineFocus[locale]}</text>
      </svg>
    </figure>
  );
}

export function HistoryPage({ locale }: { locale: SiteLocale }) {
  const h = historyCopy;
  const p = (path: string) => localePath(locale, path);
  const year = String(new Date().getFullYear());
  const chapters = eras.filter((era) => era.key !== "today");
  const today = eras.find((era) => era.key === "today")!;
  const byEra = (key: string) => entries.filter((entry) => entry.era === key);

  return (
    <PageShell locale={locale} variant="overlay" experience mainClassName="hs">
      <HistoryChronometer eras={eras.map((era) => ({ key: era.key, no: era.no, range: era.range || year, label: era.label[locale], scope: era.scope }))} label={h.index[locale]} />

      {/* HERO */}
      <section className="hs-hero" data-xp-hero>
        <div className="hs-hero__map" aria-hidden="true">
          <picture>
            <img src={publicAsset("/assets/history/map-region.svg")} alt="" decoding="async" />
          </picture>
        </div>
        <span className="hs-hero__year" aria-hidden="true">1991</span>
        <div className="xp-shell hs-hero__copy">
          <p className="hs-kicker">{h.kicker[locale]}</p>
          <MaskTitle as="h1" className="hs-hero__title" lines={[...h.title[locale]]} />
          <p className="hs-hero__lead" data-reveal>{h.lead[locale]}</p>
          {demoContentPresent ? <p className="hs-draft">{h.draft[locale]}</p> : null}
        </div>
        <nav className="xp-shell hs-index" aria-label={h.index[locale]}>
          <ol>
            {eras.map((era) => (
              <li key={era.key} className={era.scope === "megaparc" ? "is-megaparc" : undefined}>
                <a href={`#${era.key}`}>
                  <span>{era.no}</span>
                  <b>{era.range || year}</b>
                  <small>{era.label[locale]}</small>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </section>

      {/* TWO LINES OF ONE STORY */}
      <section className="hs-lines" id="lines">
        <div className="xp-shell hs-lines__grid">
          <div className="hs-lines__copy" data-reveal>
            <p className="hs-kicker hs-kicker--ink">{h.scopeGroup[locale]} · MEGAPARC</p>
            <h2 className="hs-h2">{h.linesTitle[locale]}</h2>
            <p>{h.linesText[locale]}</p>
            <p className="hs-rule">{h.rule[locale]}</p>
          </div>
          <LinesDiagram locale={locale} />
        </div>
      </section>

      {/* CHAPTERS I–VI */}
      {chapters.map((era) => {
        const list = byEra(era.key);
        if (era.key === "megaparc") {
          return (
            <section key={era.key} className="hs-era hs-era--founding" id={era.key} data-hs-era={era.key}>
              <div className="xp-shell hs-founding">
                <header className="hs-era__head" data-reveal>
                  <span className="hs-era__no">{era.range.slice(0, 4)}</span>
                  <p className="hs-era__meta"><span>{h.chapter[locale]} {era.no} · {era.range}</span><span>{era.label[locale]}</span><ScopeTag era={era} locale={locale} /></p>
                  <h2 className="hs-era__title">{era.title[locale]}</h2>
                  <p className="hs-era__lead">{era.lead[locale]}</p>
                </header>
                <p className="hs-founding__statement" data-reveal>
                  {h.megaparcStatement[locale].map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </p>
                <ol className="hs-cards hs-cards--two">
                  {list.map((entry) => (
                    <ArchiveCard key={entry.id} entry={entry} locale={locale} />
                  ))}
                </ol>
              </div>
            </section>
          );
        }
        if (era.key === "focus") {
          return (
            <section key={era.key} className="hs-era hs-era--focus" id={era.key} data-hs-era={era.key}>
              <div className="xp-shell">
                <header className="hs-era__head" data-reveal>
                  <span className="hs-era__no">{era.range.slice(0, 4)}</span>
                  <p className="hs-era__meta"><span>{h.chapter[locale]} {era.no} · {era.range}</span><span>{era.label[locale]}</span><ScopeTag era={era} locale={locale} /></p>
                  <h2 className="hs-era__title">{era.title[locale]}</h2>
                  <p className="hs-era__lead">{era.lead[locale]}</p>
                </header>
                <p className="hs-focus__statement" data-reveal>
                  {h.focusStatement[locale].map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </p>
                <ol className="hs-cards hs-cards--one">
                  {list.map((entry) => (
                    <ArchiveCard key={entry.id} entry={entry} locale={locale} />
                  ))}
                </ol>
              </div>
            </section>
          );
        }
        return (
          <section key={era.key} className={`hs-era hs-era--${era.key}`} id={era.key} data-hs-era={era.key}>
            <div className="xp-shell">
              <header className="hs-era__head" data-reveal>
                <span className="hs-era__no">{era.range.slice(0, 4)}</span>
                <p className="hs-era__meta"><span>{h.chapter[locale]} {era.no} · {era.range}</span><span>{era.label[locale]}</span><ScopeTag era={era} locale={locale} /></p>
                <h2 className="hs-era__title">{era.title[locale]}</h2>
                <p className="hs-era__lead">{era.lead[locale]}</p>
              </header>
              {era.image || era.map ? (
                <div className={`hs-era__visuals${era.image && era.map ? " hs-era__visuals--two" : ""}`}>
                  {era.image ? <EraPhoto image={era.image} locale={locale} /> : null}
                  {era.map ? <HistoryMap kind={era.map} locale={locale} /> : null}
                </div>
              ) : null}
              <ol className="hs-cards">
                {list.map((entry) => (
                  <ArchiveCard key={entry.id} entry={entry} locale={locale} />
                ))}
              </ol>
              {era.close ? <p className="hs-era__close" data-reveal>{era.close[locale]}</p> : null}
            </div>
          </section>
        );
      })}

      {/* VII TODAY — into colour: MEGAPARC's real buildings */}
      <section className="hs-today" id="today" data-hs-era="today">
        <div className="xp-shell">
          <header className="hs-era__head" data-reveal>
            <span className="hs-era__no">{year}</span>
            <p className="hs-era__meta"><span>{h.chapter[locale]} {today.no}</span><span>{today.label[locale]}</span><ScopeTag era={today} locale={locale} /></p>
            <h2 className="hs-era__title hs-today__title">{today.title[locale]}</h2>
            <p className="hs-era__lead">{today.lead[locale]}</p>
          </header>
          <ul className="hs-today__grid">
            {todaySlugs.map((slug) => {
              const project = getProject(slug)!;
              return (
                <li key={slug} data-reveal>
                  <Link href={p(`/projects/${slug}`)}>
                    <figure className="xp-fig">
                      <ArtImage media={project.media!} alt={`${project.name} — ${project.format[locale]}`} sizes="(min-width: 1024px) 25vw, 50vw" position={slug === "vatra" ? "50% 70%" : undefined} />
                    </figure>
                    <span className="hs-today__name">{project.name}</span>
                    <span className="hs-today__caption">{h.todayCaption[locale]}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <nav className="hs-today__links" aria-label={today.label[locale]}>
            {h.todayLinks.map(([path, label]) => (
              <Link key={path} href={p(path)}>{label[locale]}<Icon /></Link>
            ))}
          </nav>
        </div>
      </section>

      {/* INDEX — the whole chronicle on one page */}
      <section className="hs-register" id="index">
        <div className="xp-shell">
          <h2 className="hs-h2" data-reveal>{h.indexTitle[locale]}</h2>
          <table className="hs-register__table">
            <tbody>
              {entries.map((entry) => (
                <tr key={entry.id} className={entry.scope === "megaparc" ? "is-megaparc" : undefined}>
                  <th scope="row">{entry.year}</th>
                  <td>{entry.title[locale]}</td>
                  <td>{sectorLabel[entry.sector][locale]}</td>
                  <td>{entry.place[locale]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* CLOSE */}
      <section className="xp-sec xp-sec--red">
        <div className="xp-shell xp-close">
          <div data-reveal>
            <p className="xp-eyebrow"><span className="xp-eyebrow__no">{today.no}</span><span>MEGAPARC</span></p>
            <h2 className="xp-close__title">{h.closeTitle[locale]}</h2>
          </div>
          <nav className="xp-close__routes" aria-label={today.label[locale]} data-reveal>
            {[...h.todayLinks, ["/careers", { ro: "Cariere", ru: "Вакансии", en: "Careers" }] as const].map(([path, label]) => (
              <Link key={path} href={p(path)}>
                {label[locale]}
                <Icon name="arrow" size={18} />
              </Link>
            ))}
          </nav>
        </div>
      </section>
    </PageShell>
  );
}

import Link from "next/link";
import { MaskTitle } from "@/components/experience";
import { HistoryMap } from "@/components/history-map";
import { PageShell } from "@/components/page-shell";
import { ArtImage } from "@/components/primitives";
import { Icon } from "@/components/ui";
import { getProject } from "@/content/source";
import { chapters, entries, episodeImage, episodePlace, heritage, historyCopy, internationalPlaces, sectorLabel, type Chapter, type HistoryEntry } from "@/lib/history";
import { localePath, publicAsset, type SiteLocale } from "@/lib/site-data";

/**
 * HISTORY — a premium business chronicle (OWNER brief 2026-10-08, "HISTORY /
 * ABOUT — FINAL HISTORY VISUAL + EDITORIAL CORRECTION").
 *
 * Nine chapters (src/lib/history.ts → chapters): origins 1991–1994 · group 1995 ·
 * finance and agribusiness 1996–1997 · MEGAPARC 2005 · expansion 2006–2016 ·
 * international experience · consolidation 2017–2020 · real-estate focus 2020 ·
 * today. Every episode is image-first with one metadata line —
 * YEAR · BUSINESS DIRECTION · LOCATION — then a headline and a short text.
 * The page evolves visually: archival monochrome → expansion → international
 * (map of confirmed places) → MEGAPARC 2005 (a real building, muted colour) →
 * 2020 focus → today in full colour. No provenance captions, no placeholders,
 * no oversized decorative years on the page (provenance: historyImages).
 */

const todaySlugs = ["dacia-31", "moscova-9", "moscova-20", "vatra"];
const byId = (id: string) => entries.find((entry) => entry.id === id)!;

function EpisodeImage({ entry, locale, sizes, eager = false }: { entry: HistoryEntry; locale: SiteLocale; sizes: string; eager?: boolean }) {
  const image = episodeImage[entry.id];
  if (image.kind === "asset") {
    const project = getProject(image.slug)!;
    return <ArtImage media={project.media!} alt={`${project.name} — ${entry.title[locale]}`} sizes={sizes} />;
  }
  return (
    <picture>
      <source media="(min-width: 721px)" srcSet={`${publicAsset(`/assets/history/${image.key}-card.webp`)} 900w, ${publicAsset(`/assets/history/${image.key}.webp`)} 1800w`} sizes={sizes} />
      <img src={publicAsset(`/assets/history/${image.key}-card.webp`)} alt="" loading={eager ? "eager" : "lazy"} decoding="async" />
    </picture>
  );
}

function Meta({ entry, locale }: { entry: HistoryEntry; locale: SiteLocale }) {
  return (
    <p className="hc-ep__meta">
      <span>{entry.year}</span>
      <span>{sectorLabel[entry.sector][locale]}</span>
      <span>{episodePlace[entry.id][locale]}</span>
    </p>
  );
}

function Episode({ entry, locale, sizes }: { entry: HistoryEntry; locale: SiteLocale; sizes: string }) {
  return (
    <li className="hc-ep" data-reveal>
      <figure className="hc-ep__media">
        <EpisodeImage entry={entry} locale={locale} sizes={sizes} />
      </figure>
      <div className="hc-ep__body">
        <Meta entry={entry} locale={locale} />
        <h3 className="hc-ep__title">{entry.title[locale]}</h3>
        <p className="hc-ep__text">{entry.text[locale]}</p>
      </div>
    </li>
  );
}

function ChapterHead({ chapter, locale, year }: { chapter: Chapter; locale: SiteLocale; year: string }) {
  return (
    <header className="hc-ch__head" data-reveal>
      <p className="hc-ch__meta">
        <span className="hc-ch__no">{historyCopy.chapter[locale]} {chapter.no}</span>
        <span>{chapter.range || year}</span>
        <span>{chapter.label[locale]}</span>
      </p>
      <h2 className="hc-ch__title">{chapter.title[locale]}</h2>
      <p className="hc-ch__lead">{chapter.lead[locale]}</p>
    </header>
  );
}

function EpisodeGrid({ ids, locale }: { ids: string[]; locale: SiteLocale }) {
  const layout = ids.length >= 5 ? "three" : ids.length === 4 ? "two" : "magazine";
  const sizes = layout === "three" ? "(min-width: 1024px) 33vw, (min-width: 720px) 50vw, 100vw" : "(min-width: 1024px) 50vw, 100vw";
  return (
    <ol className={`hc-eps hc-eps--${layout}`}>
      {ids.map((id) => (
        <Episode key={id} entry={byId(id)} locale={locale} sizes={sizes} />
      ))}
    </ol>
  );
}

export function HistoryPage({ locale }: { locale: SiteLocale }) {
  const h = historyCopy;
  const p = (path: string) => localePath(locale, path);
  const year = String(new Date().getFullYear());

  return (
    <PageShell locale={locale} experience mainClassName="hc">
      {/* OPENING — warm, editorial, documentary */}
      <section className="hc-open">
        <div className="xp-shell hc-open__grid">
          <div className="hc-open__copy">
            <p className="xp-eyebrow" data-reveal><span className="xp-eyebrow__no">MEGAPARC</span><span>{h.kicker[locale]}</span></p>
            <MaskTitle as="h1" className="hc-open__title" lines={[...h.title[locale]]} />
            <p className="hc-open__lead" data-reveal>{h.lead[locale]}</p>
            <dl className="hc-heritage" data-reveal>
              {heritage.map((item) => (
                <div key={item.year} className={item.year === "2005" ? "is-megaparc" : undefined}>
                  <dt>{item.year}</dt>
                  <dd>{item.label[locale]}</dd>
                </div>
              ))}
            </dl>
          </div>
          <figure className="hc-open__media" data-reveal>
            <picture>
              <source media="(min-width: 721px)" srcSet={publicAsset("/assets/history/era-port.webp")} />
              <img src={publicAsset("/assets/history/era-port-mobile.webp")} alt="" decoding="async" fetchPriority="high" />
            </picture>
          </figure>
        </div>
        <nav className="xp-shell hc-index" aria-label={h.index[locale]}>
          <ol>
            {chapters.map((chapter) => (
              <li key={chapter.key} className={chapter.tone === "megaparc" || chapter.tone === "focus" || chapter.tone === "today" ? "is-megaparc" : undefined}>
                <a href={`#${chapter.key}`}>
                  <span>{chapter.no}</span>
                  <b>{chapter.label[locale]}</b>
                  <small>{chapter.range || year}</small>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </section>

      {chapters.map((chapter) => {
        if (chapter.key === "megaparc") {
          const main = byId("megaparc");
          const same = byId("imc-market");
          return (
            <section key={chapter.key} className="hc-ch hc-ch--megaparc" id={chapter.key}>
              <div className="xp-shell hc-turn">
                <figure className="hc-turn__media" data-reveal>
                  <EpisodeImage entry={main} locale={locale} sizes="(min-width: 1024px) 58vw, 100vw" />
                </figure>
                <div className="hc-turn__copy" data-reveal>
                  <p className="hc-ch__meta"><span className="hc-ch__no">{h.chapter[locale]} {chapter.no}</span><span>{chapter.range}</span><span>{chapter.label[locale]}</span></p>
                  <p className="hc-turn__year">2005</p>
                  <h2 className="hc-turn__title">{chapter.title[locale]}</h2>
                  <p className="hc-turn__lead">{chapter.lead[locale]}</p>
                  <p className="hc-turn__quote">
                    {h.megaparcStatement[locale].map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </p>
                  <p className="hc-turn__text">{main.text[locale]}</p>
                </div>
              </div>
              <div className="xp-shell">
                <ol className="hc-eps hc-eps--aside">
                  <Episode entry={same} locale={locale} sizes="(min-width: 1024px) 33vw, 100vw" />
                </ol>
              </div>
            </section>
          );
        }
        if (chapter.key === "international") {
          return (
            <section key={chapter.key} className="hc-ch hc-ch--international" id={chapter.key}>
              <div className="xp-shell">
                <ChapterHead chapter={chapter} locale={locale} year={year} />
                <div className="hc-world" data-reveal>
                  <HistoryMap kind="international" locale={locale} />
                  <ul className="hc-places">
                    {internationalPlaces.map((place) => (
                      <li key={place.key}>
                        <b>{historyCopy.places[place.key as keyof typeof historyCopy.places][locale]}</b>
                        <span>{place.years}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <EpisodeGrid ids={chapter.ids} locale={locale} />
              </div>
            </section>
          );
        }
        if (chapter.key === "focus") {
          const main = byId("focus-2020");
          return (
            <section key={chapter.key} className="hc-ch hc-ch--focus" id={chapter.key}>
              <div className="xp-shell hc-turn hc-turn--flip">
                <figure className="hc-turn__media" data-reveal>
                  <EpisodeImage entry={main} locale={locale} sizes="(min-width: 1024px) 58vw, 100vw" />
                </figure>
                <div className="hc-turn__copy" data-reveal>
                  <p className="hc-ch__meta"><span className="hc-ch__no">{h.chapter[locale]} {chapter.no}</span><span>{chapter.range}</span><span>{chapter.label[locale]}</span></p>
                  <h2 className="hc-turn__title">{chapter.title[locale]}</h2>
                  <p className="hc-turn__lead">{chapter.lead[locale]}</p>
                  <p className="hc-turn__quote">
                    {h.focusStatement[locale].map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </p>
                  <p className="hc-turn__text">{main.text[locale]}</p>
                </div>
              </div>
            </section>
          );
        }
        if (chapter.key === "today") {
          return (
            <section key={chapter.key} className="hc-ch hc-ch--today" id={chapter.key}>
              <div className="xp-shell">
                <ChapterHead chapter={chapter} locale={locale} year={year} />
                <ul className="hc-today">
                  {todaySlugs.map((slug) => {
                    const project = getProject(slug)!;
                    return (
                      <li key={slug} data-reveal>
                        <Link href={p(`/projects/${slug}`)}>
                          <figure className="hc-today__media">
                            <ArtImage media={project.media!} alt={`${project.name} — ${project.format[locale]}`} sizes="(min-width: 1024px) 25vw, 50vw" position={slug === "vatra" ? "50% 70%" : undefined} />
                          </figure>
                          <span className="hc-today__name">{project.name}</span>
                          <span className="hc-today__format">{project.format[locale]}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                <nav className="hc-today__links" aria-label={chapter.label[locale]}>
                  {h.todayLinks.map(([path, label]) => (
                    <Link key={path} href={p(path)}>{label[locale]}<Icon /></Link>
                  ))}
                </nav>
              </div>
            </section>
          );
        }
        return (
          <section key={chapter.key} className={`hc-ch hc-ch--${chapter.tone}`} id={chapter.key}>
            <div className="xp-shell">
              <ChapterHead chapter={chapter} locale={locale} year={year} />
              <EpisodeGrid ids={chapter.ids} locale={locale} />
            </div>
          </section>
        );
      })}

      {/* INDEX — the whole chronicle on one page */}
      <section className="hc-register" id="index">
        <div className="xp-shell">
          <h2 className="hc-register__title" data-reveal>{h.indexTitle[locale]}</h2>
          <table className="hc-register__table">
            <tbody>
              {entries.map((entry) => (
                <tr key={entry.id} className={entry.scope === "megaparc" ? "is-megaparc" : undefined}>
                  <th scope="row">{entry.year}</th>
                  <td>{entry.title[locale]}</td>
                  <td>{sectorLabel[entry.sector][locale]}</td>
                  <td>{episodePlace[entry.id][locale]}</td>
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
            <p className="xp-eyebrow"><span className="xp-eyebrow__no">MEGAPARC</span><span>{chapters[chapters.length - 1].label[locale]}</span></p>
            <h2 className="xp-close__title">{h.closeTitle[locale]}</h2>
          </div>
          <nav className="xp-close__routes" aria-label={h.index[locale]} data-reveal>
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

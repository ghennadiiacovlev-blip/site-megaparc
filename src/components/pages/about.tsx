import type { CSSProperties, ReactNode } from "react";
import { HistoryMotion } from "@/components/history-motion";
import { PageShell } from "@/components/page-shell";
import { ArtImage } from "@/components/primitives";
import { Button, TextLink } from "@/components/ui";
import { developmentProjects, portfolioAssets, type AssetMedia } from "@/lib/assets";
import { brandLayers } from "@/lib/brand";
import { companyHistory, historyPeriods, type StoryBlock } from "@/lib/company-history";
import { historyAnchors, historyCopy } from "@/lib/strategy";
import { brand, localePath, publicAsset, type SiteLocale } from "@/lib/site-data";

/**
 * ABOUT — the full MEGAPARC company history as a long-form editorial feature
 * (OWNER-approved RU master copy, 2026-10-07) with a restrained cinematic
 * motion layer (HistoryMotion + MotionController, no dependency).
 *
 * Movements: hero (three-frame crossfade, line-mask headline) · intro +
 * chronology · 1995 (sticky year, burgundy = group) · 1996–1997 · image
 * interlude · red wipe → 2005 (sticky red year = MEGAPARC, manifesto) ·
 * story stage 2006–2007 / international / 2014 / 2017–2019 (sticky frame,
 * crossfade per chapter) · the turn ("В недвижимости.") · 2020 (sticky year,
 * pinned scene: three disciplines → red statement) · today (current
 * portfolio crossfade) · value creation (scroll-linked progression) ·
 * verdict · closing (WE BUILD THE FUTURE; the footer omits it here).
 *
 * Copy lives in src/lib/company-history.ts and is rendered in full. Years
 * come from historyAnchors / historyCopy.supporting / historyPeriods.
 * Brand frames are atmosphere (warm monochrome, never captioned as assets or
 * archive); real MEGAPARC photographs are captioned as the current portfolio.
 * No review-only financial figures on this page.
 */

function brandMedia(key: string, { single = false, position }: { single?: boolean; position?: string } = {}): AssetMedia {
  const src = publicAsset(`/assets/brand/${key}.webp`);
  return { src, card: src, wide: src, mobile: single ? src : publicAsset(`/assets/brand/${key}-mobile.webp`), position };
}

const tradePortrait = publicAsset("/assets/brand/about-trade-mobile.webp");

const img = {
  hero: [brandMedia("about-hero", { position: "50% 50%" }), brandMedia("about-hero-2", { position: "50% 50%" }), brandMedia("about-hero-3", { position: "50% 50%" })],
  heritage: brandMedia("about-1995", { single: true }),
  pause: brandMedia("about-break", { position: "50% 60%" }),
  stage: [
    brandMedia("about-stage-2006", { single: true }),
    { src: tradePortrait, card: tradePortrait, wide: tradePortrait, mobile: tradePortrait } satisfies AssetMedia,
    brandMedia("about-stage-2014", { single: true }),
    brandMedia("about-stage-2017", { single: true }),
  ],
};

/* ---------------------------------------------------------------- */
/* Typographic helpers                                                */
/* ---------------------------------------------------------------- */

/** Editorial line breaks from 720px; below, the lines run on as one sentence. */
function Lines({ lines }: { lines: readonly string[] }) {
  return (
    <>
      {lines.map((line, i) => (
        <span key={line}>
          {line}
          {i < lines.length - 1 ? " " : null}
        </span>
      ))}
    </>
  );
}

/** Year as a graphic object: masked vertical reveal. Decorative; chapter headings carry the year for assistive tech. */
function Year({ children, size, tone }: { children: ReactNode; size: "xl" | "lg" | "md"; tone?: "burgundy" | "red" }) {
  return (
    <p className={`hx-year hx-year--${size}${tone ? ` hx-year--${tone}` : ""}`} aria-hidden="true">
      <span className="hx-mask" data-reveal>
        <span>{children}</span>
      </span>
    </p>
  );
}

function Block({ block }: { block: StoryBlock }) {
  switch (block.kind) {
    case "p":
      return (
        <>
          {block.note ? <span className="hx-note">{block.note}</span> : null}
          <p>{block.text}</p>
        </>
      );
    case "emph":
      return <p className="hx-emph">{block.text}</p>;
    case "terms":
      return (
        <ul className="hx-terms">
          {block.items.map((item) => (
            <li key={item.term}>
              <strong>{item.term}</strong>
              {item.rest}
            </li>
          ))}
        </ul>
      );
    case "lines":
      return (
        <ul className="hx-lines">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
  }
}

/** Paragraphs revealed in semantic groups of two or three, never one by one. */
function groupBlocks(blocks: StoryBlock[]) {
  const groups: StoryBlock[][] = [];
  let current: StoryBlock[] = [];
  let length = 0;
  const flush = () => {
    if (current.length) groups.push(current);
    current = [];
    length = 0;
  };
  for (const block of blocks) {
    if (block.kind !== "p") {
      flush();
      groups.push([block]);
      continue;
    }
    current.push(block);
    length += block.text.length;
    if (current.length === 3 || length > 520) flush();
  }
  flush();
  return groups;
}

function Prose({ blocks, className = "" }: { blocks: StoryBlock[]; className?: string }) {
  return (
    <div className={`hx-prose ${className}`.trim()}>
      {groupBlocks(blocks).map((group, i) => (
        <div key={i} className="hx-group" data-reveal>
          {group.map((block, j) => (
            <Block key={j} block={block} />
          ))}
        </div>
      ))}
    </div>
  );
}

function Statement({ lines, className = "" }: { lines: readonly string[]; className?: string }) {
  return (
    <p className={`hx-statement ${className}`.trim()} data-reveal>
      <Lines lines={lines} />
    </p>
  );
}

function ChapterTitle({ id, year, children, className = "hx-title" }: { id: string; year: string; children: ReactNode; className?: string }) {
  return (
    <h2 className={className} id={id}>
      <span className="sr-only">{year}. </span>
      {children}
    </h2>
  );
}

/* ---------------------------------------------------------------- */
/* Page                                                               */
/* ---------------------------------------------------------------- */

export function AboutPage({ locale }: { locale: SiteLocale }) {
  const c = companyHistory[locale];
  const p = (path: string) => localePath(locale, path);

  const [heritage, established, focus] = historyAnchors;
  const [early, expansionPeriod, consolidationPeriod] = historyCopy.supporting;
  const today = historyCopy.today[locale];
  const earlyYears = early.year.split("–");

  const moscova9 = portfolioAssets.find((asset) => asset.slug === "moscova-9")!;
  const dacia31 = portfolioAssets.find((asset) => asset.slug === "dacia-31")!;
  const vatra = developmentProjects.find((project) => project.slug === "vatra")!;

  const stage = [
    { id: "y2006", year: expansionPeriod.year, chapter: c.expansion, media: img.stage[0] },
    { id: "y2007", year: c.international.period, chapter: c.international, media: img.stage[1] },
    { id: "y2014", year: historyPeriods.knowhow, chapter: c.knowhow, media: img.stage[2] },
    { id: "y2017", year: consolidationPeriod.year, chapter: c.consolidation, media: img.stage[3] },
  ];

  const todayFrames = [
    { media: moscova9.media!, name: moscova9.name, status: moscova9.status[locale], alt: `${moscova9.name} — ${moscova9.positioning[locale]}` },
    { media: { ...vatra.media!, position: "50% 88%" }, name: vatra.name, status: vatra.status[locale], alt: `${vatra.name} — ${vatra.status[locale]}` },
    { media: dacia31.media!, name: dacia31.name, status: dacia31.status[locale], alt: `${dacia31.name} — ${dacia31.positioning[locale]}` },
  ];

  const chapters = [
    { id: "y1995", mark: heritage.year },
    { id: "y1996", mark: early.year },
    { id: "y2005", mark: established.year },
    ...stage.map((item) => ({ id: item.id, mark: item.year })),
    { id: "y2020", mark: focus.year },
    { id: "today", mark: today },
  ];

  return (
    <PageShell locale={locale} variant="overlay" footerStatement={false} mainClassName="hx-page">
      <HistoryMotion />

      {/* 01 HERO — three architectural frames crossfading, line-mask headline */}
      <section className="hx-hero" data-hx-hero aria-labelledby="hx-title">
        <div className="hx-hero__media" data-hx-sequence data-interval="6500">
          {img.hero.map((media, i) => (
            <div key={media.src} className={`hx-hero__frame${i === 0 ? " is-active" : " is-deferred"}`} data-hx-frame>
              <ArtImage media={media} alt={i === 0 ? c.alt.hero : ""} priority={i === 0} position={media.position} />
            </div>
          ))}
        </div>
        <span className="hx-hero__veil" aria-hidden="true" />
        <div className="shell hx-hero__copy">
          <p className="hx-kicker hx-kicker--light hx-hero__kicker">{c.kicker}</p>
          <h1 className="hx-hero__title" id="hx-title">
            {c.title.map((line, i) => (
              <span key={line} className="hx-line" style={{ "--i": i } as CSSProperties}>
                <span>
                  {line}
                  {i < c.title.length - 1 ? " " : null}
                </span>
              </span>
            ))}
          </h1>
          <p className="hx-hero__lead">{c.intro.lead}</p>
        </div>
      </section>

      {/* INTRO — the opening essay and the chronology */}
      <section className="hx-ch hx-ch--ink hx-intro" aria-label={c.kicker}>
        <div className="shell hx-grid">
          <nav className="hx-aside hx-index" aria-label={c.index}>
            <p className="hx-scope">{c.index}</p>
            <ol>
              {chapters.map((chapter) => (
                <li key={chapter.id}>
                  <a href={`#${chapter.id}`}>{chapter.mark}</a>
                </li>
              ))}
            </ol>
          </nav>
          <div className="hx-main">
            <Prose blocks={c.intro.body} />
            <p className="hx-closeline" data-reveal>{c.intro.close}</p>
          </div>
        </div>
      </section>

      {/* 02 1995 — group heritage: sticky burgundy year beside the narrative */}
      <section id="y1995" className="hx-ch hx-ch--paper hx-major" aria-labelledby="t-y1995">
        <div className="shell hx-grid">
          <header className="hx-aside hx-aside--sticky">
            <p className="hx-scope">{c.heritage.label}</p>
            <Year size="xl" tone="burgundy">{heritage.year}</Year>
            <ChapterTitle id="t-y1995" year={heritage.year}>{c.heritage.title}</ChapterTitle>
          </header>
          <div className="hx-main">
            <Prose blocks={c.heritage.body} />
          </div>
        </div>
        <div className="shell hx-pair">
          <figure className="hx-fig hx-pair__fig" data-reveal>
            <div className="hx-media hx-media--portrait">
              <ArtImage media={img.heritage} alt={c.alt.heritage} depth={28} sizes="(min-width: 900px) 40vw, 90vw" />
            </div>
          </figure>
          <Statement lines={c.heritage.statement} className="hx-pair__statement" />
        </div>
      </section>

      {/* 03 1996–1997 — quieter chapter, vertical date object, annotations */}
      <section id="y1996" className="hx-ch hx-ch--white" aria-labelledby="t-y1996">
        <div className="shell hx-grid">
          <header className="hx-aside">
            <p className="hx-scope">{c.finance.label}</p>
            <p className="hx-year hx-year--stack" aria-hidden="true">
              <span className="hx-mask" data-reveal>
                <span>{earlyYears[0]}</span>
              </span>
              <span className="hx-year__dash">—</span>
              <span className="hx-mask" data-reveal>
                <span>{earlyYears[1]}</span>
              </span>
            </p>
            <ChapterTitle id="t-y1996" year={early.year}>{c.finance.title}</ChapterTitle>
          </header>
          <div className="hx-main">
            <Prose blocks={c.finance.body} />
          </div>
        </div>
        <div className="shell">
          <Statement lines={c.finance.statement} className="hx-statement--wide" />
        </div>
      </section>

      {/* 04 INTERLUDE — a visual pause */}
      <figure className="hx-band">
        <ArtImage media={img.pause} alt={c.alt.pause} depth={18} position={img.pause.position} />
      </figure>

      {/* 05 2005 — red wipe into the dark: MEGAPARC is established */}
      <div className="hx-wipe" data-reveal aria-hidden="true" />
      <section id="y2005" className="hx-ch hx-ch--graphite hx-major" aria-labelledby="t-y2005">
        <div className="shell hx-grid">
          <header className="hx-aside hx-aside--sticky">
            <p className="hx-scope">{c.established.label}</p>
            <Year size="lg" tone="red">{established.year}</Year>
            <ChapterTitle id="t-y2005" year={established.year}>{c.established.title}</ChapterTitle>
          </header>
          <div className="hx-main">
            <Prose blocks={c.established.body.slice(0, 2)} />
            <div className="hx-boundary" data-reveal aria-hidden="true">
              <div>
                <span className="hx-boundary__year hx-boundary__year--group">{heritage.year}</span>
                <span>{c.established.boundary.group}</span>
              </div>
              <div>
                <span className="hx-boundary__year">{established.year}</span>
                <span>{c.established.boundary.megaparc}</span>
              </div>
            </div>
            <Prose blocks={c.established.body.slice(2)} />
          </div>
        </div>
        <div className="shell hx-manifesto">
          {c.established.manifesto.map((line, i) => (
            <p key={line} className={i === c.established.manifesto.length - 1 ? "hx-manifesto__final" : undefined} data-reveal>
              {line}
            </p>
          ))}
        </div>
      </section>

      {/* 06 2006–2019 — story stage: narrative left, sticky crossfading frame right */}
      <section className="hx-ch hx-ch--paper hx-stage" data-hx-stage data-active="0" aria-label={stage.map((item) => item.year).join(" · ")}>
        <div className="shell hx-stage__grid">
          <div className="hx-stage__story">
            {stage.map((item, i) => (
              <article key={item.id} id={item.id} className="hx-step" data-hx-stage-step={i} aria-labelledby={`t-${item.id}`}>
                <figure className="hx-fig hx-step__fig">
                  <div className="hx-media hx-media--portrait hx-media--bleed">
                    <ArtImage media={item.media} alt={c.alt.stage[i]} sizes="100vw" />
                  </div>
                </figure>
                <header className="hx-step__head">
                  <p className={`hx-scope${item.id === "y2007" ? " hx-scope--history" : ""}`}>{item.chapter.label}</p>
                  <Year size="md">{item.year}</Year>
                  <ChapterTitle id={`t-${item.id}`} year={item.year}>{item.chapter.title}</ChapterTitle>
                </header>
                <Prose blocks={item.chapter.body} />
                {item.id === "y2014" ? <Statement lines={c.knowhow.aphorism} className="hx-aphorism" /> : null}
              </article>
            ))}
          </div>
          <div className="hx-stage__frame" aria-hidden="true">
            <div className="hx-stage__sticky">
              {stage.map((item, i) => (
                <div key={item.id} className="hx-stage__image" data-frame={i}>
                  <ArtImage media={item.media} alt="" sizes="(min-width: 768px) 42vw, 1px" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 08 THE TURN — the question, then, after a pause, the answer */}
      <section className="hx-ch hx-ch--white hx-turn" aria-label={c.consolidation.question}>
        <div className="shell hx-turn__inner">
          <p className="hx-turn__question" data-reveal>{c.consolidation.question}</p>
          <p className="hx-turn__lead" data-reveal>{c.consolidation.answerLead}</p>
          <p className="hx-turn__answer">
            <span className="hx-mask" data-reveal>
              <span>{c.consolidation.answer}</span>
            </span>
          </p>
        </div>
      </section>

      {/* 10 2020 — sticky year, full narrative, then the pinned scene */}
      <section id="y2020" className="hx-ch hx-ch--ink hx-major" aria-labelledby="t-y2020">
        <div className="shell hx-grid">
          <header className="hx-aside hx-aside--sticky">
            <p className="hx-scope">{c.focus.label}</p>
            <Year size="xl">{focus.year}</Year>
            <ChapterTitle id="t-y2020" year={focus.year}>{c.focus.title}</ChapterTitle>
          </header>
          <div className="hx-main">
            <Prose blocks={c.focus.body} />
          </div>
        </div>
      </section>
      <section className="hx-scene" data-hx-scene data-steps="4" data-step="0" aria-label={c.focus.words.join(" ")}>
        <div className="hx-scene__pin">
          <div className="hx-scene__media">
            <ArtImage media={dacia31.media!} alt={`${dacia31.name} — ${dacia31.positioning[locale]}`} position={dacia31.media!.position} />
          </div>
          <span className="hx-scene__veil" aria-hidden="true" />
          <p className="hx-scene__caption">{dacia31.name} · {c.caption.today}</p>
          <div className="shell hx-scene__copy">
            <ol className="hx-scene__words">
              {c.focus.words.map((word, i) => (
                <li key={word} data-word={i + 1} data-reveal>{word}</li>
              ))}
            </ol>
            <p className="hx-scene__statement" data-reveal>
              <Lines lines={c.focus.statement} />
            </p>
          </div>
        </div>
      </section>

      {/* 11 TODAY — the present: current portfolio, calm crossfade */}
      <section id="today" className="hx-ch hx-ch--white hx-today" aria-labelledby="t-today">
        <div className="shell">
          <header className="hx-today__head">
            <p className="hx-scope">{c.today.label}</p>
            <h2 className="hx-today__title" id="t-today">
              <span className="hx-mask" data-reveal>
                <span>{c.today.title}</span>
              </span>
            </h2>
            <p className="hx-today__subtitle" data-reveal>{c.today.subtitle}</p>
          </header>
          <div className="hx-today__frame" data-hx-sequence data-interval="6000">
            {todayFrames.map((frame, i) => (
              <figure key={frame.name} className={`hx-today__slide${i === 0 ? " is-active" : ""}`} data-hx-frame>
                <ArtImage media={frame.media} alt={frame.alt} sizes="(min-width: 900px) 90vw, 100vw" position={frame.media.position} />
                <figcaption>{frame.name} · {frame.status}</figcaption>
              </figure>
            ))}
          </div>
          <div className="hx-grid hx-today__grid">
            <div className="hx-aside" />
            <div className="hx-main">
              <Prose blocks={c.today.body} />
              <ul className="hx-criteria" data-reveal>
                {c.today.criteria.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              <div className="hx-links" data-reveal>
                {c.today.links.map(([path, label]) => (
                  <TextLink key={path} href={p(path)}>{label}</TextLink>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 12 VALUE CREATION — scroll-linked progression, then the verdict */}
      <section id="value" className="hx-ch hx-ch--paper hx-value" aria-labelledby="t-value">
        <div className="shell hx-grid">
          <header className="hx-aside">
            <p className="hx-scope">{c.value.label}</p>
            <h2 className="hx-value__title" id="t-value">{c.value.title}</h2>
          </header>
          <div className="hx-main">
            <Prose blocks={c.value.body} />
          </div>
        </div>
        <div className="shell hx-progression" data-hx-progress aria-hidden="true">
          <span className="hx-progression__line" />
          <ol>
            {c.value.progression.map((term) => (
              <li key={term} data-hx-term>{term}</li>
            ))}
          </ol>
        </div>
        <div className="shell hx-grid">
          <div className="hx-aside" />
          <div className="hx-main hx-prose">
            <ul className="hx-steps" data-reveal>
              {c.value.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
            <p className="hx-emph" data-reveal>{c.value.refusal}</p>
          </div>
        </div>
      </section>
      <section className="hx-ch hx-ch--graphite hx-verdict" aria-label={c.value.statement.join(" ")}>
        <div className="shell">
          <Statement lines={c.value.statement} className="hx-verdict__text" />
        </div>
      </section>

      {/* 13 CLOSING — experience of the past, focus on the future */}
      <section className="hx-ch hx-ch--ink hx-close" aria-labelledby="t-close">
        <div className="shell">
          <h2 className="hx-close__title" id="t-close">
            {c.closing.title.map((line, i) => (
              <span key={line} className="hx-mask hx-close__line" data-reveal>
                <span>
                  {line}
                  {i < c.closing.title.length - 1 ? " " : null}
                </span>
              </span>
            ))}
          </h2>
          <div className="hx-grid">
            <div className="hx-aside" />
            <div className="hx-main">
              <Prose blocks={c.closing.body} />
              <div className="hx-prose">
                <p className="hx-group" data-reveal>{c.closing.positionsLead}</p>
              </div>
              <ul className="hx-positions" data-reveal>
                {c.closing.positions.map((item) => (
                  <li key={item.term}>
                    <strong>{item.term}</strong>
                    {item.rest}
                  </li>
                ))}
              </ul>
              <Prose blocks={c.closing.after} />
            </div>
          </div>
          <ul className="hx-audiences">
            {c.closing.audiences.map((audience, i) => (
              <li key={audience} data-reveal style={{ "--i": i } as CSSProperties}>{audience}</li>
            ))}
          </ul>
          <div className="hx-grid">
            <div className="hx-aside" />
            <div className="hx-main hx-prose">
              <p className="hx-emph hx-next" data-reveal>{c.closing.next}</p>
            </div>
          </div>
          <div className="hx-finale" data-reveal>
            <p className="hx-finale__brand" lang="en">{brandLayers.statement.en}</p>
            {locale !== "en" ? <p className="hx-finale__local">{brand.tagline[locale]}.</p> : null}
            <div className="hx-finale__actions">
              <Button href={`${p("/contact")}#partnership`} variant="light">{c.closing.contact}</Button>
              <TextLink href={p("/careers")} className="tlink--light">{c.closing.careers}</TextLink>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

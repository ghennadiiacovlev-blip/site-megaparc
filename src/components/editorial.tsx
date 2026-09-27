import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { ArrowLink } from "@/components/primitives";

/**
 * Editorial system — Art Direction v6 (Yellow Tree level, 2026-09-27).
 *
 * One vocabulary of movements instead of one card language:
 *   Opening        page opening: index, display title, lead, optional full-bleed media
 *   Statement      large statement + small supporting text
 *   Bleed          full-bleed architecture image, caption below or statement over
 *   Split          asymmetric two-column: media that bleeds to the viewport edge + copy
 *   PropertyRow    horizontal property / project row
 *   ImageFacts     large image with a floating facts panel
 *   Figures        numbers as typographic objects
 *   Triptych       three images, three proportions
 *   Timeline       thin architectural timeline (years or stages)
 *   RowList        numbered editorial rows (principles, areas, enquiry subjects)
 *   ClosingFrame   large CTA closing frame
 *   Moment         red micro moment
 *
 * Every component is server-rendered, semantic, keyboard-usable and static
 * under prefers-reduced-motion (see globals.css).
 */

export type Tone = "white" | "paper" | "stone" | "ink" | "graphite";
export const isDarkTone = (tone: Tone) => tone === "ink" || tone === "graphite";

export type Media = { src: string; alt: string; position?: string; priority?: boolean; sizes?: string };

/* ------------------------------------------------------------------ */
/* Section wrapper                                                      */
/* ------------------------------------------------------------------ */

export function Movement({
  tone = "white",
  id,
  className = "",
  children,
  tight = false,
  flush = false,
  label,
}: {
  tone?: Tone;
  id?: string;
  className?: string;
  children: ReactNode;
  /** Shorter vertical rhythm. */
  tight?: boolean;
  /** No vertical padding (media-only movements). */
  flush?: boolean;
  label?: string;
}) {
  const classes = ["mv", tone, tight ? "mv--tight" : "", flush ? "mv--flush" : "", className].filter(Boolean).join(" ");
  return (
    <section className={classes} id={id} aria-label={label}>
      {children}
    </section>
  );
}

/** Quiet index marker: red number + micro label. No rule, no box. */
export function Index({ no, children, inverse = false }: { no?: string; children: ReactNode; inverse?: boolean }) {
  return (
    <p className={`idx${inverse ? " idx--inverse" : ""}`}>
      {no ? <span className="idx__no">{no}</span> : null}
      <span>{children}</span>
    </p>
  );
}

/* ------------------------------------------------------------------ */
/* Opening                                                              */
/* ------------------------------------------------------------------ */

export function Opening({
  index = "01",
  eyebrow,
  title,
  lead,
  children,
  media,
  caption,
  tone = "paper",
  compact = false,
}: {
  index?: string;
  eyebrow: string;
  title: ReactNode;
  lead?: string;
  children?: ReactNode;
  /** Full-bleed image under the title. */
  media?: Media;
  caption?: string;
  tone?: Tone;
  compact?: boolean;
}) {
  return (
    <section className={`opening ${tone}${compact ? " opening--compact" : ""}${media ? " opening--media" : ""}`}>
      <div className="shell">
        <div className="opening__meta">
          <span>{index}</span>
          <span>{eyebrow}</span>
        </div>
        <h1 className="opening__title" data-reveal>{title}</h1>
        {lead || children ? (
          <div className="opening__foot" data-reveal>
            {lead ? <p className="opening__lead">{lead}</p> : <span />}
            {children ? <div className="opening__aside">{children}</div> : null}
          </div>
        ) : null}
      </div>
      {media ? (
        <figure className="opening__media" data-reveal>
          <Image src={media.src} alt={media.alt} fill priority sizes="100vw" style={{ objectPosition: media.position }} />
          {caption ? <figcaption className="shell">{caption}</figcaption> : null}
        </figure>
      ) : null}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Statement                                                            */
/* ------------------------------------------------------------------ */

export function Statement({
  kicker,
  no,
  title,
  text,
  children,
  size = "lg",
  inverse = false,
  wide = false,
  as: Tag = "h2",
}: {
  kicker?: string;
  no?: string;
  title: ReactNode;
  text?: string;
  children?: ReactNode;
  size?: "md" | "lg" | "xl";
  inverse?: boolean;
  /** Statement spans the full width; supporting text below. */
  wide?: boolean;
  as?: "h1" | "h2" | "h3" | "p";
}) {
  return (
    <div className={`stmt stmt--${size}${wide ? " stmt--wide" : ""}`} data-reveal>
      {kicker ? <Index no={no} inverse={inverse}>{kicker}</Index> : null}
      <div className="stmt__grid">
        <Tag className="stmt__title">{title}</Tag>
        {text || children ? (
          <div className="stmt__aside">
            {text ? <p>{text}</p> : null}
            {children}
          </div>
        ) : null}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Bleed — full-bleed image                                             */
/* ------------------------------------------------------------------ */

export function Bleed({
  media,
  caption,
  meta,
  statement,
  label,
  height = "tall",
  depth = 20,
  children,
}: {
  media: Media;
  /** Small caption row under the image (inside the shell). */
  caption?: string;
  meta?: string;
  /** Large statement over the image. */
  statement?: string;
  label?: string;
  height?: "tall" | "short" | "screen";
  depth?: number;
  children?: ReactNode;
}) {
  return (
    <figure className={`bleed bleed--${height}${statement ? " bleed--statement" : ""}`} data-reveal>
      <div className="bleed__media">
        <Image src={media.src} alt={media.alt} fill priority={media.priority} sizes="100vw" data-depth={depth} style={{ objectPosition: media.position }} />
        {statement ? <span className="bleed__veil" aria-hidden="true" /> : null}
      </div>
      {statement ? (
        <div className="shell bleed__statement">
          {label ? <span className="bleed__label">{label}</span> : null}
          <p>{statement}</p>
          {children}
        </div>
      ) : null}
      {caption || meta ? (
        <figcaption className="shell bleed__caption">
          <span>{caption}</span>
          {meta ? <span>{meta}</span> : null}
        </figcaption>
      ) : null}
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* Split — asymmetric two-column                                        */
/* ------------------------------------------------------------------ */

export function Split({
  media,
  ratio = "4 / 5",
  flip = false,
  bleed = true,
  align = "end",
  caption,
  children,
  href,
}: {
  media: Media;
  ratio?: string;
  /** Media on the right. */
  flip?: boolean;
  /** Media runs to the viewport edge. */
  bleed?: boolean;
  align?: "start" | "center" | "end";
  caption?: string;
  children: ReactNode;
  href?: string;
}) {
  const figure = (
    <figure className="split__media" style={{ "--ratio": ratio } as CSSProperties}>
      <Image src={media.src} alt={media.alt} fill priority={media.priority} sizes={media.sizes ?? "(max-width: 900px) 100vw, 58vw"} data-depth="14" style={{ objectPosition: media.position }} />
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
  return (
    <div className={`split${flip ? " split--flip" : ""}${bleed ? " split--bleed" : ""} split--${align}`} data-reveal>
      {href ? <Link href={href} className="split__link" aria-label={media.alt}>{figure}</Link> : figure}
      <div className="split__copy">{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* PropertyRow — horizontal editorial row                               */
/* ------------------------------------------------------------------ */

export function PropertyRow({
  href,
  index,
  image,
  placeholder,
  name,
  place,
  kind,
  line,
  meta,
  cta,
  inverse = false,
  external = false,
  compact = false,
}: {
  href: string;
  index?: string;
  image?: Media;
  /** Typographic fallback when no approved photography exists. */
  placeholder?: string;
  name: string;
  place?: string;
  kind?: string;
  line?: string;
  meta?: string;
  cta?: string;
  inverse?: boolean;
  external?: boolean;
  /** Text-only row (no visual column). */
  compact?: boolean;
}) {
  const inner = (
    <>
      <span className="prow__index">{index}</span>
      {compact ? null : (
        <span className="prow__visual" aria-hidden="true">
          {image ? (
            <Image src={image.src} alt="" fill sizes="(max-width: 720px) 100vw, 30vw" style={{ objectPosition: image.position }} />
          ) : (
            <span className="prow__placeholder"><i>{placeholder ?? name}</i></span>
          )}
          <span className="prow__line" />
        </span>
      )}
      <span className="prow__body">
        <span className="prow__name">{name}</span>
        {place || kind ? <span className="prow__meta">{[place, kind].filter(Boolean).join(" · ")}</span> : null}
        {line ? <span className="prow__text">{line}</span> : null}
      </span>
      <span className="prow__end">
        {meta ? <span className="prow__facts">{meta}</span> : null}
        <span className="prow__cta">{cta ? <span>{cta}</span> : null}<i aria-hidden="true">↗</i></span>
      </span>
    </>
  );
  const cls = `prow${inverse ? " prow--inverse" : ""}${compact ? " prow--compact" : ""}`;
  return external ? (
    <a className={cls} href={href} target="_blank" rel="noopener noreferrer" data-reveal>{inner}</a>
  ) : (
    <Link className={cls} href={href} data-reveal>{inner}</Link>
  );
}

export function PropertyList({ children, inverse = false }: { children: ReactNode; inverse?: boolean }) {
  return <div className={`prow-list${inverse ? " prow-list--inverse" : ""}`}>{children}</div>;
}

/* ------------------------------------------------------------------ */
/* ImageFacts — large image + floating facts                            */
/* ------------------------------------------------------------------ */

export function ImageFacts({
  media,
  facts,
  label,
  title,
  text,
  href,
  cta,
  ratio = "16 / 9",
  panel = "end",
}: {
  media: Media;
  facts: { label: string; value: string }[];
  label?: string;
  title: string;
  text?: string;
  href?: string;
  cta?: string;
  ratio?: string;
  panel?: "start" | "end";
}) {
  return (
    <div className={`imgfacts imgfacts--${panel}`} data-reveal>
      <figure className="imgfacts__media" style={{ "--ratio": ratio } as CSSProperties}>
        <Image src={media.src} alt={media.alt} fill priority={media.priority} sizes="100vw" data-depth="18" style={{ objectPosition: media.position }} />
      </figure>
      <div className="imgfacts__panel">
        {label ? <span className="idx idx--plain"><span className="idx__no">{label}</span></span> : null}
        <h3>{title}</h3>
        {text ? <p>{text}</p> : null}
        <dl>
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
        {href && cta ? <ArrowLink href={href}>{cta}</ArrowLink> : null}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Figures — numbers as typographic objects                             */
/* ------------------------------------------------------------------ */

export type Figure = { key: string; value: ReactNode; label: string; note?: string; small?: boolean };

export function Figures({ items, inverse = false, columns }: { items: Figure[]; inverse?: boolean; columns?: number }) {
  return (
    <dl className={`figures${inverse ? " figures--inverse" : ""}`} style={columns ? ({ "--cols": columns } as CSSProperties) : undefined}>
      {items.map((item) => (
        <div key={item.key} className={`figure${item.small ? " figure--small" : ""}`} data-reveal>
          <dd className="figure__value">{item.value}</dd>
          <dt className="figure__label">{item.label}</dt>
          {item.note ? <dd className="figure__note">{item.note}</dd> : null}
        </div>
      ))}
    </dl>
  );
}

/* ------------------------------------------------------------------ */
/* Triptych                                                             */
/* ------------------------------------------------------------------ */

export function Triptych({ images, caption }: { images: [Media, Media, Media]; caption?: string }) {
  return (
    <figure className="triptych" data-reveal>
      {images.map((image, i) => (
        <span key={image.src} className={`triptych__frame triptych__frame--${i + 1}`}>
          <Image src={image.src} alt={image.alt} fill sizes={i === 0 ? "(max-width: 720px) 100vw, 50vw" : "(max-width: 720px) 50vw, 25vw"} style={{ objectPosition: image.position }} />
        </span>
      ))}
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* Timeline — thin architectural timeline                               */
/* ------------------------------------------------------------------ */

export type TimelineItem = { key: string; mark: string; title: string; text?: string; scope?: string; current?: boolean; tag?: string };

export function Timeline({
  items,
  inverse = false,
  large = false,
  label,
}: {
  items: TimelineItem[];
  inverse?: boolean;
  /** Large marks (years). */
  large?: boolean;
  label?: string;
}) {
  return (
    <ol className={`tl${inverse ? " tl--inverse" : ""}${large ? " tl--large" : ""}`} aria-label={label} style={{ "--n": items.length } as CSSProperties}>
      {items.map((item) => (
        <li key={item.key} className={`tl__item${item.current ? " is-current" : ""}`} data-reveal>
          <span className="tl__tick" aria-hidden="true" />
          {item.scope ? <span className="tl__scope">{item.scope}</span> : null}
          <span className="tl__mark">{item.mark}</span>
          <h3 className="tl__title">{item.title}</h3>
          {item.text ? <p className="tl__text">{item.text}</p> : null}
          {item.tag ? <span className="tl__tag">{item.tag}</span> : null}
        </li>
      ))}
    </ol>
  );
}

/* ------------------------------------------------------------------ */
/* RowList — numbered editorial rows                                    */
/* ------------------------------------------------------------------ */

export type Row = { key: string; no?: string; title: string; text?: string; meta?: string; items?: string[]; itemsLabel?: string; href?: string; cta?: string; id?: string };

export function RowList({ rows, inverse = false, large = false, headingLevel = "h3" }: { rows: Row[]; inverse?: boolean; large?: boolean; headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <ol className={`rows${inverse ? " rows--inverse" : ""}${large ? " rows--large" : ""}`}>
      {rows.map((row, i) => (
        <li key={row.key} className="row" id={row.id} data-reveal>
          <span className="row__no">{row.no ?? String(i + 1).padStart(2, "0")}</span>
          <div className="row__head">
            <H className="row__title">{row.title}</H>
            {row.meta ? <span className="row__meta">{row.meta}</span> : null}
          </div>
          <div className="row__body">
            {row.text ? <p>{row.text}</p> : null}
            {row.items?.length ? (
              <ul className="row__items" aria-label={row.itemsLabel}>
                {row.itemsLabel ? <li className="row__items-label" aria-hidden="true">{row.itemsLabel}</li> : null}
                {row.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
            {row.href && row.cta ? <ArrowLink href={row.href} inverse={inverse}>{row.cta}</ArrowLink> : null}
          </div>
        </li>
      ))}
    </ol>
  );
}

/* ------------------------------------------------------------------ */
/* ClosingFrame — large CTA closing                                     */
/* ------------------------------------------------------------------ */

export function ClosingFrame({
  kicker,
  title,
  text,
  links,
  tone = "ink",
  note,
  id,
}: {
  kicker?: string;
  title: ReactNode;
  text?: string;
  links: { href: string; label: string; strong?: boolean; external?: boolean }[];
  tone?: Tone;
  note?: string;
  id?: string;
}) {
  const dark = isDarkTone(tone);
  return (
    <section className={`frame ${tone}`} id={id}>
      <div className="shell frame__grid" data-reveal>
        <div className="frame__copy">
          {kicker ? <Index inverse={dark}>{kicker}</Index> : null}
          <h2 className="frame__title">{title}</h2>
          {text ? <p className="frame__text">{text}</p> : null}
        </div>
        <ul className="frame__links">
          {links.map((link) => (
            <li key={link.href + link.label}>
              {link.external ? (
                <a className={`arrow-link${dark ? " arrow-link--inverse" : ""}${link.strong ? " arrow-link--strong" : ""}`} href={link.href} target="_blank" rel="noopener noreferrer">
                  <span>{link.label}</span>
                  <span className="arrow-link__icon" aria-hidden="true">↗</span>
                </a>
              ) : (
                <ArrowLink href={link.href} inverse={dark} strong={link.strong}>{link.label}</ArrowLink>
              )}
            </li>
          ))}
        </ul>
        {note ? <p className="frame__note">{note}</p> : null}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Moment — red micro moment                                            */
/* ------------------------------------------------------------------ */

export function Moment({ words, label, text, large = false }: { words: string[]; label?: string; text?: string; large?: boolean }) {
  return (
    <section className={`moment red-field${large ? " moment--large" : ""}`} aria-label={words.join(" ")} data-reveal>
      <div className="shell moment__grid">
        <p className="moment__words">
          {words.map((word) => (
            <span key={word}>{word}</span>
          ))}
        </p>
        <div className="moment__aside">
          {label ? <span className="moment__label">{label}</span> : null}
          {text ? <p>{text}</p> : null}
        </div>
      </div>
    </section>
  );
}

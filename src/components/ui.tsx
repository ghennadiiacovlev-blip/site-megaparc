import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

/**
 * Presentation primitives — benchmark rebuild (2026-09-27).
 *
 * Mobile-first, media-led, compact copy. One small vocabulary:
 *   Icon · Button · TextLink · Section · Kicker · Hero · Intro · Band ·
 *   Split · Story · Rows · Facts · Quote · Stages
 * Every arrow is an inline SVG with stroke="currentColor" — never a glyph.
 */

export type Tone = "white" | "paper" | "ink" | "graphite";
export const dark = (tone: Tone) => tone === "ink" || tone === "graphite";

/* ---------------------------------------------------------------- */
/* Icons                                                              */
/* ---------------------------------------------------------------- */

export function Icon({ name = "arrow", size = 14, className = "" }: { name?: "arrow" | "up-right" | "left" | "down"; size?: number; className?: string }) {
  const d =
    name === "up-right"
      ? "M5 19 19 5M8 5h11v11"
      : name === "left"
        ? "M19 12H5m7-7-7 7 7 7"
        : name === "down"
          ? "M12 5v14m-7-7 7 7 7-7"
          : "M5 12h14m-7-7 7 7-7 7";
  return (
    <svg className={`icon ${className}`.trim()} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d={d} />
    </svg>
  );
}

/* ---------------------------------------------------------------- */
/* Actions                                                            */
/* ---------------------------------------------------------------- */

export function Button({
  href,
  children,
  variant = "solid",
  icon = "arrow",
  external = false,
}: {
  href: string;
  children: ReactNode;
  /** solid = ink on light; light = white on dark / over media; ghost = outline. */
  variant?: "solid" | "light" | "ghost" | "ghost-light";
  icon?: "arrow" | "up-right" | "none";
  external?: boolean;
}) {
  const cls = `btn btn--${variant}`;
  const inner = (
    <>
      <span>{children}</span>
      {icon !== "none" ? <Icon name={icon} /> : null}
    </>
  );
  return external ? (
    <a className={cls} href={href} target="_blank" rel="noopener noreferrer">{inner}</a>
  ) : (
    <Link className={cls} href={href}>{inner}</Link>
  );
}

export function TextLink({ href, children, external = false, className = "" }: { href: string; children: ReactNode; external?: boolean; className?: string }) {
  const cls = `tlink ${className}`.trim();
  const inner = (
    <>
      <span>{children}</span>
      <Icon name={external ? "up-right" : "arrow"} />
    </>
  );
  return external ? (
    <a className={cls} href={href} target="_blank" rel="noopener noreferrer">{inner}</a>
  ) : (
    <Link className={cls} href={href}>{inner}</Link>
  );
}

/* ---------------------------------------------------------------- */
/* Layout                                                             */
/* ---------------------------------------------------------------- */

export function Section({ tone = "white", id, className = "", tight = false, flush = false, children, label }: { tone?: Tone; id?: string; className?: string; tight?: boolean; flush?: boolean; children: ReactNode; label?: string }) {
  return (
    <section id={id} aria-label={label} className={["sec", `sec--${tone}`, tight ? "sec--tight" : "", flush ? "sec--flush" : "", className].filter(Boolean).join(" ")}>
      {children}
    </section>
  );
}

export function Kicker({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`kicker ${className}`.trim()}>{children}</p>;
}

export type Media = { src: string; alt: string; position?: string; priority?: boolean; sizes?: string };

/** Fill image inside a positioned frame. */
export function Img({ media, sizes = "100vw", depth }: { media: Media; sizes?: string; depth?: number }) {
  return <Image src={media.src} alt={media.alt} fill priority={media.priority} sizes={media.sizes ?? sizes} data-depth={depth} style={{ objectFit: "cover", objectPosition: media.position }} />;
}

/* ---------------------------------------------------------------- */
/* Hero — full-viewport media with the headline over it                */
/* ---------------------------------------------------------------- */

export function Hero({
  media,
  title,
  line,
  action,
  size = "full",
  children,
  id,
  caption,
}: {
  media: Media;
  title: ReactNode;
  /** Short uppercase line under / above the title. */
  line?: string;
  action?: ReactNode;
  /** full = first viewport (home, careers); page = 70svh interior opening. */
  size?: "full" | "page";
  children?: ReactNode;
  id?: string;
  caption?: string;
}) {
  return (
    <section className={`hero hero--${size}`} id={id}>
      <div className="hero__media">{children ?? <Img media={{ ...media, priority: true }} depth={10} />}</div>
      <div className="hero__veil" aria-hidden="true" />
      <div className="shell hero__copy" data-reveal>
        {line ? <p className="hero__line">{line}</p> : null}
        <h1 className="hero__title">{title}</h1>
        {action ? <div className="hero__actions">{action}</div> : null}
      </div>
      {caption ? <p className="hero__caption">{caption}</p> : null}
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Intro — kicker + statement + short paragraph                        */
/* ---------------------------------------------------------------- */

export function Intro({ kicker, statement, text, children, tone = "white", id, align = "left" }: { kicker?: string; statement: ReactNode; text?: string; children?: ReactNode; tone?: Tone; id?: string; align?: "left" | "center" }) {
  return (
    <Section tone={tone} id={id}>
      <div className={`shell intro${align === "center" ? " intro--center" : ""}`} data-reveal>
        {kicker ? <Kicker>{kicker}</Kicker> : null}
        <div className="intro__body">
          <p className="statement">{statement}</p>
          {text ? <p className="intro__text">{text}</p> : null}
          {children}
        </div>
      </div>
    </Section>
  );
}

/* ---------------------------------------------------------------- */
/* Band — full-width architecture image                                */
/* ---------------------------------------------------------------- */

export function Band({ media, caption, height = "tall", statement, action }: { media: Media; caption?: string; height?: "tall" | "short"; statement?: string; action?: ReactNode }) {
  return (
    <figure className={`band band--${height}${statement ? " band--statement" : ""}`}>
      <Img media={media} depth={16} />
      {statement ? (
        <>
          <span className="band__veil" aria-hidden="true" />
          <div className="shell band__statement" data-reveal>
            <p>{statement}</p>
            {action}
          </div>
        </>
      ) : null}
      {caption ? <figcaption className="band__caption">{caption}</figcaption> : null}
    </figure>
  );
}

/* ---------------------------------------------------------------- */
/* Split — media + copy                                                */
/* ---------------------------------------------------------------- */

export function Split({ media, flip = false, ratio, tone = "white", id, href, children, caption }: { media: Media; flip?: boolean; ratio?: string; tone?: Tone; id?: string; href?: string; children: ReactNode; caption?: string }) {
  const figure = (
    <figure className="split__media" style={ratio ? ({ "--ratio": ratio } as CSSProperties) : undefined}>
      <Img media={media} sizes="(min-width: 900px) 50vw, 100vw" depth={12} />
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
  return (
    <Section tone={tone} id={id}>
      <div className={`shell split${flip ? " split--flip" : ""}`} data-reveal>
        {href ? <Link href={href} className="split__link" aria-label={media.alt}>{figure}</Link> : figure}
        <div className="split__copy">{children}</div>
      </div>
    </Section>
  );
}

/* ---------------------------------------------------------------- */
/* Story — one property as an editorial story                          */
/* ---------------------------------------------------------------- */

export function Story({ href, media, name, meta, line, cta, layout = "wide", placeholder }: { href: string; media?: Media; name: string; meta: string[]; line?: string; cta: string; layout?: "wide" | "left" | "right" | "row"; placeholder?: string }) {
  return (
    <Link href={href} className={`story story--${layout}`} data-reveal>
      <span className="story__media">
        {media ? <Img media={media} sizes={layout === "wide" ? "100vw" : "(min-width: 900px) 66vw, 100vw"} depth={12} /> : <span className="story__placeholder"><span>{placeholder ?? name}</span></span>}
      </span>
      <span className="story__caption">
        <span className="story__head">
          <span className="story__name">{name}</span>
          <Icon name="arrow" size={18} className="story__arrow" />
        </span>
        <span className="story__meta">{meta.filter(Boolean).join(" · ")}</span>
        {line ? <span className="story__line">{line}</span> : null}
        <span className="story__cta">{cta}</span>
      </span>
    </Link>
  );
}

/* ---------------------------------------------------------------- */
/* Rows — numbered compact rows                                        */
/* ---------------------------------------------------------------- */

export type Row = { key: string; no?: string; title: string; text?: string; meta?: string; items?: string[]; href?: string; cta?: string; external?: boolean; id?: string };

export function Rows({ rows, large = false, headingLevel = "h3" }: { rows: Row[]; large?: boolean; headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <ol className={`rows${large ? " rows--large" : ""}`}>
      {rows.map((row, i) => (
        <li key={row.key} className="row" id={row.id} data-reveal>
          <span className="row__no">{row.no ?? String(i + 1).padStart(2, "0")}</span>
          <div className="row__main">
            <H className="row__title">{row.title}</H>
            {row.meta ? <span className="row__meta">{row.meta}</span> : null}
          </div>
          {row.text || row.items || (row.href && row.cta) ? (
            <div className="row__body">
              {row.text ? <p>{row.text}</p> : null}
              {row.items?.length ? (
                <ul className="row__items">
                  {row.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
              {row.href && row.cta ? <TextLink href={row.href} external={row.external}>{row.cta}</TextLink> : null}
            </div>
          ) : null}
        </li>
      ))}
    </ol>
  );
}

/* ---------------------------------------------------------------- */
/* Facts — label / value list                                          */
/* ---------------------------------------------------------------- */

export function Facts({ items, className = "" }: { items: { label: string; value: string }[]; className?: string }) {
  return (
    <dl className={`facts ${className}`.trim()}>
      {items.map((item) => (
        <div key={item.label}>
          <dt>{item.label}</dt>
          <dd>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/* ---------------------------------------------------------------- */
/* Quote — dark centred brand moment                                   */
/* ---------------------------------------------------------------- */

export function Quote({ kicker, statement, text, action, tone = "graphite", id }: { kicker?: string; statement: ReactNode; text?: string; action?: ReactNode; tone?: Tone; id?: string }) {
  return (
    <Section tone={tone} id={id}>
      <div className="shell quote" data-reveal>
        {kicker ? <Kicker>{kicker}</Kicker> : null}
        <p className="quote__statement">{statement}</p>
        {text ? <p className="quote__text">{text}</p> : null}
        {action ? <div className="quote__actions">{action}</div> : null}
      </div>
    </Section>
  );
}

/* ---------------------------------------------------------------- */
/* Stages — compact process indicator                                  */
/* ---------------------------------------------------------------- */

export function Stages({ items, label }: { items: { key: string; no: string; title: string; text?: string; current?: boolean; tag?: string }[]; label?: string }) {
  return (
    <ol className="steps" aria-label={label} style={{ "--n": items.length } as CSSProperties}>
      {items.map((item) => (
        <li key={item.key} className={`steps__item${item.current ? " is-current" : ""}`} data-reveal>
          <span className="steps__no">{item.no}</span>
          <span className="steps__title">{item.title}</span>
          {item.text ? <span className="steps__text">{item.text}</span> : null}
          {item.tag ? <span className="steps__tag">{item.tag}</span> : null}
        </li>
      ))}
    </ol>
  );
}

/* ---------------------------------------------------------------- */
/* Heading pair — kicker + h2 + optional text (section head)           */
/* ---------------------------------------------------------------- */

export function Head({ kicker, title, text, children, as: Tag = "h2" }: { kicker?: string; title: ReactNode; text?: string; children?: ReactNode; as?: "h1" | "h2" | "h3" }) {
  return (
    <div className="head" data-reveal>
      {kicker ? <Kicker>{kicker}</Kicker> : null}
      <Tag className="head__title">{title}</Tag>
      {text ? <p className="head__text">{text}</p> : null}
      {children}
    </div>
  );
}

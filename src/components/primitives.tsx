import Image, { getImageProps } from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { AssetMedia, Fact } from "@/lib/assets";
import type { SiteLocale } from "@/lib/site-data";

/** Text-led call to action: `Label ↗`. `strong` renders the boxed variant. */
export function ArrowLink({
  href,
  children,
  inverse = false,
  strong = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  inverse?: boolean;
  strong?: boolean;
  className?: string;
}) {
  const classes = ["arrow-link", inverse ? "arrow-link--inverse" : "", strong ? "arrow-link--strong" : "", className].filter(Boolean).join(" ");
  return (
    <Link className={classes} href={href}>
      <span>{children}</span>
      <span className="arrow-link__icon" aria-hidden="true">↗</span>
    </Link>
  );
}

/** Numbered section marker with a hairline. */
export function SectionIndex({ no, children, inverse = false }: { no: string; children: ReactNode; inverse?: boolean }) {
  return (
    <div className={`section-index${inverse ? " section-index--inverse" : ""}`}>
      <span>{no}</span>
      <span>{children}</span>
    </div>
  );
}

/** Section heading pattern: title on the left, text and actions on the right. */
export function SectionHead({
  title,
  text,
  children,
  wide = false,
}: {
  title: ReactNode;
  text?: string;
  children?: ReactNode;
  wide?: boolean;
}) {
  return (
    <div className={`section-head${wide ? " section-head--wide" : ""}`} data-reveal>
      <h2>{title}</h2>
      {text || children ? (
        <div className="section-head__aside">
          {text ? <p>{text}</p> : null}
          {children}
        </div>
      ) : null}
    </div>
  );
}

/** Interior page opening: index, eyebrow, display title and lead. */
export function PageHero({
  index,
  eyebrow,
  title,
  lead,
  children,
}: {
  index: string;
  eyebrow: string;
  title: ReactNode;
  lead: string;
  children?: ReactNode;
}) {
  return (
    <section className="page-hero paper">
      <div className="shell">
        <div className="page-hero__meta">
          <span>{index}</span>
          <span>{eyebrow}</span>
        </div>
        <div className="page-hero__grid" data-reveal>
          <h1>{title}</h1>
          <div className="page-hero__aside">
            <p>{lead}</p>
            {children}
          </div>
        </div>
      </div>
      <span className="page-hero__signature" aria-hidden="true" />
    </section>
  );
}

/** Quiet editorial note (used for "available on request" and disclaimers). Never an internal label. */
export function Note({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <p className={`note${light ? " note--light" : ""}`}>{children}</p>;
}

/** Editorial fact grid: large values, small labels. */
export function FactGrid({ facts, locale, light = false }: { facts: Fact[]; locale: SiteLocale; light?: boolean }) {
  if (!facts.length) return null;
  return (
    <dl className={`fact-grid${light ? " fact-grid--light" : ""}`}>
      {facts.map((fact) => (
        <div key={fact.label.en}>
          <dt>{fact.label[locale]}</dt>
          <dd>{fact.value[locale]}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Hairline list of label / value rows (floor programme, details). */
export function FactList({ facts, locale, light = false }: { facts: Fact[]; locale: SiteLocale; light?: boolean }) {
  if (!facts.length) return null;
  return (
    <dl className={`fact-list${light ? " fact-list--light" : ""}`}>
      {facts.map((fact) => (
        <div key={fact.label.en}>
          <dt>{fact.label[locale]}</dt>
          <dd>{fact.value[locale]}</dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * Art-directed cover image: portrait crop on phones, master on larger screens.
 * Uses getImageProps so both sources go through the same loader. On the
 * unoptimised static export the srcSet is empty and the plain src is used.
 */
export function ArtImage({
  media,
  alt,
  priority = false,
  depth,
  className = "",
  position,
  sizes = "100vw",
  variant = "master",
}: {
  media: AssetMedia;
  alt: string;
  priority?: boolean;
  depth?: number;
  className?: string;
  position?: string;
  sizes?: string;
  /** Which large source to use above 720px. */
  variant?: "master" | "wide";
}) {
  const large = variant === "wide" ? media.wide : media.src;
  const { props: desktop } = getImageProps({ alt, sizes, priority, src: large, width: 2200, height: 1400 });
  const { props: mobile } = getImageProps({ alt, sizes, priority, src: media.mobile, width: 1000, height: 1250 });
  const { srcSet: mobileSet, ...img } = mobile;
  return (
    <picture>
      <source media="(min-width: 721px)" srcSet={desktop.srcSet ?? large} />
      {mobileSet ? <source srcSet={mobileSet} /> : null}
      <img
        {...img}
        alt={alt}
        className={className}
        data-depth={depth}
        style={{ objectPosition: position ?? media.position }}
      />
    </picture>
  );
}

/** Cover image with reveal veil, depth and hover line (grid / card use). */
export function AssetMediaBlock({
  src,
  alt,
  priority = false,
  position,
  depth = 18,
  sizes = "(max-width: 760px) 100vw, (max-width: 1200px) 80vw, 68vw",
  children,
}: {
  src: string;
  alt: string;
  priority?: boolean;
  position?: string;
  depth?: number;
  sizes?: string;
  children?: ReactNode;
}) {
  return (
    <div className="asset-media" data-media>
      <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="asset-media__image" data-depth={depth} style={{ objectPosition: position }} />
      <span className="asset-media__veil" aria-hidden="true" />
      <span className="asset-media__line" aria-hidden="true" />
      {children}
    </div>
  );
}

/** Typographic placeholder for an asset without approved photography. */
export function MediaPlaceholder({ title, note, compact = false }: { title: string; note: string; compact?: boolean }) {
  return (
    <div className={`media-placeholder${compact ? " media-placeholder--compact" : ""}`} role="img" aria-label={`${title} — ${note}`}>
      <span className="media-placeholder__grid" aria-hidden="true" />
      <span className="media-placeholder__mark" aria-hidden="true">
        <i />
        <i />
      </span>
      <span className="media-placeholder__title" aria-hidden="true">{title}</span>
      <span className="media-placeholder__note" aria-hidden="true">{note}</span>
    </div>
  );
}

/** Full-bleed editorial image break with optional statement. */
export function ImageBreak({
  media,
  alt,
  caption,
  statementLabel,
  statement,
  short = false,
  position,
}: {
  media: AssetMedia;
  alt: string;
  caption?: string;
  statementLabel?: string;
  statement?: string;
  short?: boolean;
  position?: string;
}) {
  return (
    <section className={`image-break${short ? " image-break--short" : ""}`} aria-label={statement ?? caption}>
      <Image src={media.wide} alt={alt} fill sizes="100vw" className="image-break__image" data-depth="22" style={{ objectPosition: position ?? media.position }} />
      <div className="image-break__veil" />
      {statement ? (
        <div className="shell image-break__statement" data-reveal>
          {statementLabel ? <span>{statementLabel}</span> : null}
          <p>{statement}</p>
        </div>
      ) : caption ? (
        <div className="shell image-break__caption">
          <span>{caption}</span>
        </div>
      ) : null}
    </section>
  );
}

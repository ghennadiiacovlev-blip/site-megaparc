import type { CSSProperties, ReactNode } from "react";
import { ArtImage } from "@/components/primitives";
import { conceptVisuals, demoContentPresent, imageUse, type DataPoint, type VisualKey } from "@/data/demo-content";
import { getAsset, type AssetMedia } from "@/lib/assets";
import { publicAsset, type Localized, type SiteLocale } from "@/lib/site-data";

/**
 * Experience system — shared building blocks of the full-experience prototype
 * (2026-10-07). Class prefix `xp-`, tokens and rules in globals.css section
 * "EXPERIENCE SYSTEM". Everything here is server-rendered; behaviour lives in
 * ExperienceMotion and the small client journey components.
 */

/* ---------------------------------------------------------------- */
/* Media                                                              */
/* ---------------------------------------------------------------- */

/** Concept visual as an art-directed media object (portrait-only visuals reuse the master on phones). */
export function conceptMedia(key: VisualKey, position?: string): AssetMedia {
  const src = publicAsset(`/assets/brand/${key}.webp`);
  const mobile = conceptVisuals[key].mobile ? publicAsset(`/assets/brand/${key}-mobile.webp`) : src;
  return { src, card: src, wide: src, mobile, position };
}

/** Real MEGAPARC photograph of a portfolio property. */
export function assetMedia(slug: string): AssetMedia | null {
  return getAsset(slug)?.media ?? null;
}

export const photoDirectionLabel = "Photo direction · Concept";

/** Small label carried by every concept image that stands in for a named property. */
export function PhotoLabel({ className = "" }: { className?: string }) {
  return (
    <span className={`xp-photo-label ${className}`.trim()} lang="en">
      {photoDirectionLabel}
    </span>
  );
}

/**
 * A registered concept-image placement (src/data/demo-content.ts → imageUses).
 * PROPERTY_DIRECTION placements always show PHOTO DIRECTION · CONCEPT.
 */
export function ConceptImage({ id, locale, priority = false, depth, sizes, className = "" }: { id: string; locale: SiteLocale; priority?: boolean; depth?: number; sizes?: string; className?: string }) {
  const use = imageUse(id);
  const media = conceptMedia(use.visual, use.position);
  return (
    <>
      <ArtImage media={media} alt={use.alt[locale]} priority={priority} depth={depth} sizes={sizes} className={className} />
      {use.scope === "PROPERTY_DIRECTION" ? <PhotoLabel /> : null}
    </>
  );
}

export function isPropertyDirection(id: string) {
  return imageUse(id).scope === "PROPERTY_DIRECTION";
}

/* ---------------------------------------------------------------- */
/* Typography                                                         */
/* ---------------------------------------------------------------- */

/** Display heading revealed line by line behind a mask (reduced motion: static). */
export function MaskTitle({ lines, as: Tag = "h2", className = "" }: { lines: ReactNode[]; as?: "h1" | "h2" | "h3" | "p"; className?: string }) {
  return (
    <Tag className={`xp-mask ${className}`.trim()} data-reveal>
      {lines.map((line, index) => (
        <span key={index} className="xp-mask__line" style={{ "--i": index } as CSSProperties}>
          <span>{line}</span>
        </span>
      ))}
    </Tag>
  );
}

/** Section opening: index number, label, title, optional lead — the one heading pattern of the system. */
export function Opening({ no, label, title, lead, tone = "light", children, as = "h2", className = "" }: { no?: string; label: string; title: ReactNode; lead?: ReactNode; tone?: "light" | "dark"; children?: ReactNode; as?: "h1" | "h2"; className?: string }) {
  const Tag = as;
  return (
    <div className={`xp-opening${tone === "dark" ? " xp-opening--dark" : ""} ${className}`.trim()} data-reveal>
      <p className="xp-eyebrow">
        {no ? <span className="xp-eyebrow__no">{no}</span> : null}
        <span>{label}</span>
      </p>
      <Tag className="xp-opening__title">{title}</Tag>
      {lead ? <p className="xp-opening__lead">{lead}</p> : null}
      {children}
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Facts                                                              */
/* ---------------------------------------------------------------- */

const demoLegend: Localized = {
  ro: "Valori demonstrative pentru previzualizare — vor fi înlocuite cu date aprobate.",
  ru: "Демонстрационные значения для превью — будут заменены утверждёнными данными.",
  en: "Demonstration values for the preview — to be replaced with approved data.",
};

export type LedgerItem = { label: string; point?: DataPoint; value?: ReactNode; hint?: string };

/**
 * Fact ledger: label over value, hairline columns. A DEMO value carries a small
 * ring and the ledger adds a one-line legend — invented figures are never
 * presented as silent facts.
 */
export function Ledger({ items, locale, tone = "light", size = "md", className = "" }: { items: LedgerItem[]; locale: SiteLocale; tone?: "light" | "dark"; size?: "md" | "lg"; className?: string }) {
  const hasDemo = items.some((item) => item.point?.status === "DEMO");
  return (
    <div className={`xp-ledger xp-ledger--${size}${tone === "dark" ? " xp-ledger--dark" : ""} ${className}`.trim()}>
      <dl>
        {items.map((item) => (
          <div key={item.label} className="xp-ledger__item">
            <dt>{item.label}</dt>
            <dd>
              {item.value ?? item.point?.value[locale]}
              {item.point?.status === "DEMO" ? <DemoMark /> : null}
            </dd>
            {item.hint ? <span className="xp-ledger__hint">{item.hint}</span> : null}
          </div>
        ))}
      </dl>
      {hasDemo ? <DemoLegend locale={locale} /> : null}
    </div>
  );
}

export function DemoMark() {
  return (
    <span className="xp-demo-mark" aria-label="DEMO" title="DEMO">
      <span aria-hidden="true" />
    </span>
  );
}

export function DemoLegend({ locale, className = "" }: { locale: SiteLocale; className?: string }) {
  return (
    <p className={`xp-demo-legend ${className}`.trim()}>
      <span className="xp-demo-mark" aria-hidden="true"><span /></span>
      {demoLegend[locale]}
    </p>
  );
}

/** Inline value with its demo ring when needed. */
export function Val({ point, locale }: { point: DataPoint; locale: SiteLocale }) {
  return (
    <>
      {point.value[locale]}
      {point.status === "DEMO" ? <DemoMark /> : null}
    </>
  );
}

/* ---------------------------------------------------------------- */
/* Preview marker                                                     */
/* ---------------------------------------------------------------- */

const markerNote: Localized = {
  ro: "Previzualizare pentru aprobare. Unele cifre, profiluri și imagini sunt demonstrative și nu reprezintă date MEGAPARC.",
  ru: "Превью для согласования. Часть цифр, текстов и изображений — демонстрационные, это не данные MEGAPARC.",
  en: "Approval preview. Some figures, profiles and images are demonstrations and are not MEGAPARC data.",
};

/**
 * PREVIEW · DEMO DATA — discreet, always visible while the build carries demo
 * content. Not part of the future production site.
 */
export function PreviewMarker({ locale }: { locale: SiteLocale }) {
  if (!demoContentPresent) return null;
  return (
    <aside className="xp-preview" aria-label="Preview · Demo data">
      <span className="xp-preview__dot" aria-hidden="true" />
      <span className="xp-preview__label" lang="en">Preview · Demo data</span>
      <span className="xp-preview__note">{markerNote[locale]}</span>
    </aside>
  );
}

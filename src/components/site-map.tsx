import type { CSSProperties } from "react";
import { locationMaps } from "@/data/location-maps";
import { publicAsset } from "@/lib/site-data";

/**
 * The light editorial OSM map (scripts/location-maps.mjs) without the route
 * actions — for places where the location itself is the point: a case-study
 * chapter, a land plot. The full module with directions is LocationSection.
 */
export function SiteMap({ slug, name, label, className = "" }: { slug: string; name: string; label: string; className?: string }) {
  const data = locationMaps[slug];
  if (!data) return null;
  return (
    <div className={`loc__map ${className}`.trim()} role="img" aria-label={label}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={publicAsset(data.src)} alt="" loading="lazy" decoding="async" />
      {data.labels.map((street) => (
        <span key={street.text} className={`loc__street${street.frontage ? " is-frontage" : ""}`} style={{ "--x": `${street.x}%`, "--y": `${street.y}%`, "--a": `${street.angle}deg` } as CSSProperties} aria-hidden="true">
          {street.text}
        </span>
      ))}
      <span className="loc__pin" aria-hidden="true" />
      <span className="loc__name" aria-hidden="true">{name}</span>
      <span className="loc__credit">© OpenStreetMap</span>
    </div>
  );
}

import { historyMaps } from "@/data/history-geo";
import { historyCopy } from "@/lib/history";
import { publicAsset, type SiteLocale } from "@/lib/site-data";

/**
 * Documentary map of the group's historical geography (Natural Earth base map,
 * scripts/history-maps.mjs). The base map is a static SVG file; the overlay
 * (tinted countries, places, routes) is inline so the routes can draw with the
 * scroll ([data-xp-progress] → --xp-p, src/components/experience-motion.tsx).
 * Under reduced motion every route is drawn. The caption states that the map
 * shows history, not a current MEGAPARC presence.
 */
type Route = { from: string; to: string; year: string; scope?: "megaparc" };
/** Label placement per place: offset and anchor, so neighbouring names never collide. */
type Label = { dx: number; dy: number; anchor: "start" | "middle" | "end" };

const config = {
  region: {
    tint: ["moldova", "romania", "ukraine"],
    places: ["chisinau", "braila", "ukraine", "blackSea"],
    labels: { chisinau: { dx: 10, dy: -6, anchor: "start" }, braila: { dx: -10, dy: 5, anchor: "end" }, ukraine: { dx: 10, dy: 5, anchor: "start" } } as Record<string, Label>,
    routes: [
      { from: "chisinau", to: "braila", year: "1991" },
      { from: "chisinau", to: "ukraine", year: "1997" },
    ] as Route[],
  },
  world: {
    tint: ["moldova", "romania", "turkey", "iraq", "senegal", "china"],
    places: ["chisinau", "turkey", "iraq", "dakar", "china", "romania"],
    labels: { chisinau: { dx: 8, dy: -8, anchor: "start" }, romania: { dx: -8, dy: -6, anchor: "end" }, turkey: { dx: -6, dy: 18, anchor: "end" }, iraq: { dx: 8, dy: 12, anchor: "start" }, dakar: { dx: 8, dy: 4, anchor: "start" }, china: { dx: 8, dy: 4, anchor: "start" } } as Record<string, Label>,
    routes: [
      { from: "chisinau", to: "iraq", year: "2007" },
      { from: "turkey", to: "dakar", year: "2007" },
      { from: "chisinau", to: "turkey", year: "2007" },
      { from: "china", to: "romania", year: "2019" },
    ] as Route[],
  },
};

/** A gentle arc between two projected points (bulging to the left of the direction). */
function arc([x1, y1]: [number, number], [x2, y2]: [number, number]) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const k = 0.18;
  return `M${x1} ${y1} Q${(mx - dy * k).toFixed(1)} ${(my + dx * k).toFixed(1)} ${x2} ${y2}`;
}

export function HistoryMap({ kind, locale }: { kind: "region" | "world"; locale: SiteLocale }) {
  const map = historyMaps[kind];
  const cfg = config[kind];
  const caption = kind === "region" ? historyCopy.mapRegion[locale] : historyCopy.mapWorld[locale];
  const label = (key: string) => historyCopy.places[key as keyof typeof historyCopy.places]?.[locale] ?? key;
  return (
    <figure className={`hs-map hs-map--${kind}`} data-xp-progress>
      <div className="hs-map__canvas" style={{ aspectRatio: `${map.width} / ${map.height}` }}>
        <picture className="hs-map__base">
          <img src={publicAsset(`/assets/history/map-${kind}.svg`)} alt="" loading="lazy" decoding="async" />
        </picture>
        <svg viewBox={`0 0 ${map.width} ${map.height}`} className="hs-map__overlay" role="img" aria-label={caption}>
          {cfg.tint.map((key) => (map.countries[key] ? <path key={key} d={map.countries[key]} className={`hs-map__country${key === "moldova" ? " is-home" : ""}`} /> : null))}
          {cfg.routes.map((route) => (
            <path key={`${route.from}-${route.to}`} d={arc(map.places[route.from], map.places[route.to])} pathLength={1} className="hs-map__route" data-xp-term />
          ))}
          {cfg.places.map((key) => {
            const [x, y] = map.places[key];
            const sea = key === "blackSea";
            const at = (cfg.labels as Record<string, Label>)[key] ?? { dx: 0, dy: 0, anchor: "middle" as const };
            return (
              <g key={key} className={`hs-map__place${sea ? " is-sea" : ""}${key === "chisinau" ? " is-home" : ""}`}>
                {sea ? null : <circle cx={x} cy={y} r={key === "chisinau" ? 5.5 : 4} />}
                <text x={x + at.dx} y={y + at.dy} textAnchor={at.anchor}>{label(key)}</text>
              </g>
            );
          })}
        </svg>
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

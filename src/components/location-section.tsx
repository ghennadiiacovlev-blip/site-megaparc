import { SectionIndex } from "@/components/primitives";
import { googleDirectionsUrl, googleMapsUrl, type MapLocation } from "@/lib/assets";
import type { Localized, SiteLocale } from "@/lib/site-data";

const copy = {
  label: { ro: "Locație / Conectivitate", ru: "Локация / Доступность", en: "Location / Connectivity" },
  open: { ro: "Vezi în Google Maps", ru: "Открыть в Google Maps", en: "Open in Google Maps" },
  route: { ro: "Construiește ruta", ru: "Построить маршрут", en: "Get directions" },
  newTab: { ro: "se deschide într-o filă nouă", ru: "откроется в новой вкладке", en: "opens in a new tab" },
} satisfies Record<string, Localized>;

/**
 * Editorial location block. An abstract MEGAPARC map composition (grid, arteries,
 * one red marker) replaces an embedded widget; navigation is handed to Google Maps
 * through official deep links, built only from confirmed addresses.
 */
export function LocationSection({
  locale,
  no,
  place,
  area,
  text,
  points,
  map,
}: {
  locale: SiteLocale;
  no: string;
  /** Large place name, e.g. district. */
  place: string;
  /** Secondary line, e.g. city. */
  area: string;
  text: string;
  points: Localized[];
  map: MapLocation | null;
}) {
  return (
    <section className="location paper" aria-label={copy.label[locale]}>
      <div className="shell">
        <SectionIndex no={no}>{copy.label[locale]}</SectionIndex>
        <div className="location__grid">
          <div className="location__copy" data-reveal>
            <p className="location__place">{place}</p>
            <p className="location__area">{area}</p>
            <p className="location__text">{text}</p>
            {points.length ? (
              <ul className="location__points">
                {points.map((point) => (
                  <li key={point.en}>{point[locale]}</li>
                ))}
              </ul>
            ) : null}
            {map ? (
              <div className="location__actions">
                <span className="location__address">{map.address}</span>
                <a className="location__cta" href={googleMapsUrl(map)} target="_blank" rel="noopener noreferrer">
                  <span>{copy.open[locale]}</span>
                  <span className="location__cta-icon" aria-hidden="true">↗</span>
                  <span className="sr-only"> ({copy.newTab[locale]})</span>
                </a>
                <a className="location__cta" href={googleDirectionsUrl(map)} target="_blank" rel="noopener noreferrer">
                  <span>{copy.route[locale]}</span>
                  <span className="location__cta-icon" aria-hidden="true">↗</span>
                  <span className="sr-only"> ({copy.newTab[locale]})</span>
                </a>
              </div>
            ) : null}
          </div>
          <div className="location__map" aria-hidden="true" data-reveal>
            <span className="location__grid-lines" />
            <span className="location__artery location__artery--a" />
            <span className="location__artery location__artery--b" />
            <span className="location__artery location__artery--c" />
            <span className="location__ring" />
            <span className="location__pin" />
            <span className="location__map-label">{place.toUpperCase()}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

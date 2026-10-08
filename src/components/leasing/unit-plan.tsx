import { DemoMark } from "@/components/experience";
import { formatArea } from "@/content/source";
import type { PlanSpec } from "@/data/leasing-inventory";
import type { Localized, SiteLocale } from "@/lib/site-data";

/**
 * Schematic plan of an available space — never a measured drawing.
 *   stack  floors of a building with their areas (included floors in red)
 *   zones  the zones of a stand-alone building (sales floor, unloading, support)
 *   floor  one floor plate with its units; the offered unit in red
 * Drawn in a 100 × 60 grid; text scales with the drawing. The caption says
 * "schematic" and carries the DEMO ring when the plan is not confirmed.
 */
const note: Localized = {
  ro: "Schemă · nu este un plan măsurat",
  ru: "Схема · не обмерный план",
  en: "Schematic · not a measured plan",
};
const coreLabel: Localized = { ro: "Hol · scări · lift", ru: "Холл · лестница · лифт", en: "Lobby · stairs · lift" };
const youLabel: Localized = { ro: "Spațiul oferit", ru: "Предлагаемое помещение", en: "Offered space" };

function Entrance({ x, y }: { x: number; y: number }) {
  // Small arrow pointing into the plate from the street edge.
  return <path d={`M${x - 2.2} ${y + 4.2} L${x} ${y + 0.8} L${x + 2.2} ${y + 4.2}`} className="lx-plan__door" />;
}

export function UnitPlan({ plan, locale, demo, title, uid }: { plan: PlanSpec; locale: SiteLocale; demo: boolean; title: string; uid: string }) {
  if (plan.kind === "stack") {
    const max = Math.max(...plan.levels.map((level) => level.m2));
    const row = 13;
    const height = plan.levels.length * row + 2;
    return (
      <figure className="lx-plan lx-plan--stack">
        <svg viewBox={`0 0 100 ${height}`} role="img" aria-label={`${title} — ${note[locale]}`}>
          {plan.levels.map((level, i) => {
            const w = Math.max(24, (level.m2 / max) * 100);
            const y = 1 + i * row;
            return (
              <g key={level.label.en} className={level.included ? "is-included" : undefined}>
                <text x={0} y={y + 3} className="lx-plan__label">{level.label[locale]}</text>
                <rect x={0} y={y + 5} width={w} height={6.2} className="lx-plan__level" />
                <text x={w - 1.5} y={y + 9.3} textAnchor="end" className="lx-plan__value">{formatArea(level.m2, locale)}</text>
              </g>
            );
          })}
        </svg>
        <figcaption>
          {note[locale]}
          {plan.note ? ` · ${plan.note[locale]}` : ""}
          {demo ? <DemoMark /> : null}
        </figcaption>
      </figure>
    );
  }

  const street = plan.kind === "zones" ? plan.street : plan.street;
  return (
    <figure className={`lx-plan lx-plan--${plan.kind}`}>
      <svg viewBox="-2 -2 104 74" role="img" aria-label={`${title} — ${note[locale]}`}>
        <defs>
          <pattern id={`lx-hatch-${uid}`} width="2.4" height="2.4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="2.4" className="lx-plan__hatch" />
          </pattern>
        </defs>
        {plan.kind === "zones"
          ? plan.zones.map((zone) => (
              <g key={zone.label.en} className={`lx-plan__zone lx-plan__zone--${zone.tone}`}>
                <rect x={zone.x} y={zone.y} width={zone.w} height={zone.h} />
                <text x={zone.x + zone.w / 2} y={zone.y + zone.h / 2 - 0.6} textAnchor="middle" className="lx-plan__label">{zone.label[locale]}</text>
                <text x={zone.x + zone.w / 2} y={zone.y + zone.h / 2 + 4} textAnchor="middle" className="lx-plan__value">{formatArea(zone.m2, locale)}</text>
              </g>
            ))
          : plan.units.map((unit) => (
              <g key={unit.id} className={`lx-plan__unit${unit.self ? " is-self" : ""}${unit.core ? " is-core" : ""}`}>
                <rect x={unit.x} y={unit.y} width={unit.w} height={unit.h} fill={unit.core ? `url(#lx-hatch-${uid})` : undefined} />
                <text x={unit.x + unit.w / 2} y={unit.y + unit.h / 2 + 1.2} textAnchor="middle" className="lx-plan__label">
                  {unit.core ? coreLabel[locale] : unit.id}
                </text>
                {unit.self ? <text x={unit.x + unit.w / 2} y={unit.y + unit.h / 2 + 5.6} textAnchor="middle" className="lx-plan__you">{youLabel[locale]}</text> : null}
              </g>
            ))}
        <rect x="0" y="0" width="100" height="60" className="lx-plan__outline" />
        {plan.entrances.map((door) => (
          <Entrance key={`${door.x}-${door.y}`} x={door.x} y={door.y} />
        ))}
        {street ? (
          <g className="lx-plan__street">
            <line x1="-2" y1="66" x2="102" y2="66" />
            <text x="50" y="71" textAnchor="middle">{street[locale]}</text>
          </g>
        ) : null}
      </svg>
      <figcaption>
        {plan.kind === "floor" ? `${plan.level[locale]} · ` : ""}
        {note[locale]}
        {demo ? <DemoMark /> : null}
      </figcaption>
    </figure>
  );
}

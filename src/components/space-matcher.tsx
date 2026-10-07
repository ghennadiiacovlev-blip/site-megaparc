"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Icon } from "@/components/ui";
import type { SiteLocale } from "@/lib/site-data";

/**
 * FIND THE RIGHT SPACE — need-based matching (OWNER addendum 2026-10-07).
 * The visitor describes the business, not square metres; the matcher returns a
 * recommended property and, above all, why it fits. Pure client logic over the
 * fit data in src/data/demo-content.ts (CONFIRMED + DEMO, passed in as props).
 */

type Level = "strong" | "possible" | "limited";

export type MatcherAsset = {
  slug: string;
  name: string;
  district: string;
  reason: string;
  bestFor: string[];
  areaMin: number;
  areaMax: number;
  areaLabel: string;
  areaNote?: string;
  from: string | null;
  availability: string;
  capabilities: Record<string, { level: Level; note: string; demo: boolean }>;
  href: string;
  media: ReactNode;
};

export type MatcherCopy = {
  steps: { type: string; area: string; place: string; when: string; needs: string };
  /** Strings use {type} / {area} / {date} placeholders (props must stay serialisable). */
  typical: string;
  anyPlace: string;
  result: string;
  alternative: string;
  why: string;
  check: string;
  quality: { strong: string; good: string; partial: string };
  view: string;
  viewing: string;
  discuss: string;
  areaFits: string;
  areaMiss: string;
  availableFrom: string;
  typeFits: string;
  typeMiss: string;
  noMatchTitle: string;
  noMatchText: string;
  demo: string;
  reset: string;
};

type Option = { key: string; label: string };

const fill = (template: string, values: Record<string, string>) => template.replace(/\{(\w+)\}/g, (_, k: string) => values[k] ?? "");

export function SpaceMatcher({
  locale,
  assets,
  types,
  areas,
  timelines,
  requirements,
  concerns,
  copy,
  contactHref,
}: {
  locale: SiteLocale;
  assets: MatcherAsset[];
  types: (Option & { goal: string })[];
  areas: (Option & { min: number; max: number })[];
  timelines: (Option & { by: string | null })[];
  requirements: (Option & { why: string })[];
  concerns: Record<string, string[]>;
  copy: MatcherCopy;
  contactHref: string;
}) {
  const [type, setType] = useState(types[0].key);
  const [area, setArea] = useState(areas[1].key);
  const [place, setPlace] = useState("any");
  const [when, setWhen] = useState(timelines[timelines.length - 1].key);
  const [needs, setNeeds] = useState<string[]>(concerns[types[0].key].slice(0, 3));
  const [touched, setTouched] = useState(false);

  // Optional preselection from the URL (?type=clinic) — keeps deep links from other pages meaningful.
  useEffect(() => {
    const read = () => {
      const q = new URLSearchParams(window.location.search).get("type");
      if (q && types.some((t) => t.key === q)) {
        setType(q);
        setNeeds(concerns[q].slice(0, 3));
      }
    };
    read();
    window.addEventListener("popstate", read);
    return () => window.removeEventListener("popstate", read);
  }, [types, concerns]);

  const chooseType = (key: string) => {
    setType(key);
    if (!touched) setNeeds(concerns[key].slice(0, 3));
  };
  const toggleNeed = (key: string) => {
    setTouched(true);
    setNeeds((list) => (list.includes(key) ? list.filter((k) => k !== key) : [...list, key]));
  };

  const places = useMemo(() => Array.from(new Set(assets.map((a) => a.district))), [assets]);
  const typeLabel = types.find((t) => t.key === type)!.label;
  const need = areas.find((a) => a.key === area)!;
  const by = timelines.find((t) => t.key === when)!.by;
  const orderedRequirements = useMemo(() => {
    const first = concerns[type];
    return [...requirements].sort((a, b) => (first.includes(a.key) ? first.indexOf(a.key) : 99) - (first.includes(b.key) ? first.indexOf(b.key) : 99));
  }, [requirements, concerns, type]);

  const ranked = useMemo(() => {
    const max = 4 + needs.length * 3 + 3;
    return assets
      .map((asset) => {
        let score = 0;
        const why: string[] = [];
        const check: { text: string; demo: boolean }[] = [];
        const areaOk = need.min <= asset.areaMax && need.max >= asset.areaMin;
        if (asset.bestFor.includes(type)) {
          score += 4;
          why.push(fill(copy.typeFits, { type: typeLabel.toLowerCase() }));
        } else {
          score -= 2;
          check.push({ text: fill(copy.typeMiss, { type: typeLabel.toLowerCase() }), demo: false });
        }
        if (areaOk) {
          score += 3;
          why.push(`${copy.areaFits} — ${asset.areaLabel}${asset.areaNote ? ` (${asset.areaNote})` : ""}`);
        } else {
          score -= 6;
          check.push({ text: fill(copy.areaMiss, { area: asset.areaLabel }), demo: false });
        }
        needs.forEach((key) => {
          const c = asset.capabilities[key];
          const label = requirements.find((r) => r.key === key)!.label;
          if (c.level === "strong") {
            score += 3;
            why.push(`${label} — ${c.note}`);
          } else if (c.level === "possible") {
            score += 1;
            check.push({ text: `${label} — ${c.note}`, demo: c.demo });
          } else {
            score -= 2;
            check.push({ text: `${label} — ${c.note}`, demo: c.demo });
          }
        });
        if (by && asset.from && asset.from > by) {
          score -= 3;
          check.push({ text: fill(copy.availableFrom, { date: asset.availability }), demo: false });
        }
        if (place !== "any" && asset.district !== place) score -= 1;
        const ratio = score / max;
        const quality = ratio > 0.62 ? "strong" : ratio > 0.32 ? "good" : "partial";
        return { asset, score, why, check, quality: quality as "strong" | "good" | "partial", areaOk };
      })
      .sort((a, b) => b.score - a.score);
  }, [assets, need, type, typeLabel, needs, by, place, requirements, copy]);

  const best = ranked[0];
  const second = ranked[1];
  const noMatch = !best || !best.areaOk || best.score < 2;
  const enquiry = (slug?: string) => {
    const q = new URLSearchParams({ subject: "lease", type, area, needs: needs.join(",") });
    if (slug) q.set("property", slug);
    return `${contactHref}?${q.toString()}#occupier`;
  };

  return (
    <div className="xp-matcher" lang={locale}>
      <form className="xp-matcher__form" onSubmit={(event) => event.preventDefault()} aria-describedby="xp-matcher-result">
        <fieldset className="xp-matcher__field">
          <legend><span>01</span>{copy.steps.type}</legend>
          <div className="xp-choice-row">
            {types.map((t) => (
              <label key={t.key} className="xp-choice">
                <input type="radio" name="type" value={t.key} checked={type === t.key} onChange={() => chooseType(t.key)} />
                <span>{t.label}</span>
              </label>
            ))}
          </div>
          <p className="xp-matcher__hint">{types.find((t) => t.key === type)!.goal}</p>
        </fieldset>

        <fieldset className="xp-matcher__field">
          <legend><span>02</span>{copy.steps.area}</legend>
          <div className="xp-choice-row">
            {areas.map((a) => (
              <label key={a.key} className="xp-choice">
                <input type="radio" name="area" value={a.key} checked={area === a.key} onChange={() => setArea(a.key)} />
                <span>{a.label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="xp-matcher__pair">
          <fieldset className="xp-matcher__field">
            <legend><span>03</span>{copy.steps.place}</legend>
            <div className="xp-choice-row">
              {["any", ...places].map((d) => (
                <label key={d} className="xp-choice">
                  <input type="radio" name="place" value={d} checked={place === d} onChange={() => setPlace(d)} />
                  <span>{d === "any" ? copy.anyPlace : d}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <fieldset className="xp-matcher__field">
            <legend><span>04</span>{copy.steps.when}</legend>
            <div className="xp-choice-row">
              {timelines.map((t) => (
                <label key={t.key} className="xp-choice">
                  <input type="radio" name="when" value={t.key} checked={when === t.key} onChange={() => setWhen(t.key)} />
                  <span>{t.label}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        <fieldset className="xp-matcher__field">
          <legend><span>05</span>{copy.steps.needs}</legend>
          <p className="xp-matcher__hint">{fill(copy.typical, { type: typeLabel.toLowerCase() })}</p>
          <div className="xp-need-grid">
            {orderedRequirements.map((r) => (
              <label key={r.key} className={`xp-need${concerns[type].includes(r.key) ? " is-typical" : ""}`}>
                <input type="checkbox" checked={needs.includes(r.key)} onChange={() => toggleNeed(r.key)} />
                <span className="xp-need__box" aria-hidden="true" />
                <span className="xp-need__label">{r.label}</span>
                <span className="xp-need__why">{r.why}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </form>

      <div className="xp-matcher__result" id="xp-matcher-result" aria-live="polite">
        {noMatch ? (
          <div className="xp-match xp-match--empty">
            <p className="xp-eyebrow"><span>{copy.result}</span></p>
            <h3 className="xp-match__name">{copy.noMatchTitle}</h3>
            <p className="xp-match__reason">{copy.noMatchText}</p>
            <Link className="btn" href={enquiry()}><span>{copy.discuss}</span><Icon /></Link>
            {best ? (
              <p className="xp-match__alt">
                {copy.alternative}: <Link href={best.asset.href}>{best.asset.name}</Link> · {best.asset.areaLabel}
              </p>
            ) : null}
          </div>
        ) : (
          <article className="xp-match" key={best.asset.slug}>
            <div className="xp-match__media">{best.asset.media}</div>
            <div className="xp-match__body">
              <p className="xp-eyebrow">
                <span>{copy.result}</span>
                <span className={`xp-match__quality xp-match__quality--${best.quality}`}>{copy.quality[best.quality]}</span>
              </p>
              <h3 className="xp-match__name">{best.asset.name}</h3>
              <p className="xp-match__meta">{best.asset.district} · {best.asset.availability}</p>
              <p className="xp-match__reason">{best.asset.reason}</p>
              {best.why.length ? (
                <div className="xp-match__list">
                  <p className="xp-match__label">{copy.why}</p>
                  <ul className="xp-ticks">
                    {best.why.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {best.check.length ? (
                <div className="xp-match__list">
                  <p className="xp-match__label">{copy.check}</p>
                  <ul className="xp-checks">
                    {best.check.map((line) => (
                      <li key={line.text}>
                        {line.text}
                        {line.demo ? <span className="xp-demo-mark" title={copy.demo} aria-label={copy.demo}><span aria-hidden="true" /></span> : null}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              <div className="xp-match__actions">
                <Link className="btn" href={enquiry(best.asset.slug)}><span>{copy.viewing}</span><Icon /></Link>
                <Link className="tlink" href={best.asset.href}><span>{copy.view}</span><Icon /></Link>
              </div>
              {second && second.areaOk && second.score > 0 ? (
                <p className="xp-match__alt">
                  {copy.alternative}: <Link href={second.asset.href}>{second.asset.name}</Link> — {second.asset.reason}
                </p>
              ) : null}
            </div>
          </article>
        )}
      </div>
    </div>
  );
}

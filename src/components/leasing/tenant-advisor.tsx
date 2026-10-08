"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Icon } from "@/components/ui";

/**
 * TENANT ADVISOR — "What are you opening?" → "What matters?" → "How much
 * space?" → the available spaces that fit, and why (OWNER correction
 * 2026-10-08, "TENANT-FIRST UX"). Pure client logic over the published
 * inventory (leased spaces never reach this component).
 */

type Level = "strong" | "possible" | "limited";

export type AdvisorItem = {
  id: string;
  project: string;
  unit: string;
  areaLabel: string;
  area: number;
  areaMin: number;
  uses: string[];
  fit: Record<string, Level>;
  demo: boolean;
  avail: "now" | "soon" | "reserved";
  availLabel: string;
  href: string;
  viewing: string;
  media: ReactNode;
};

export type AdvisorCopy = {
  stepUse: string;
  stepNeeds: string;
  stepArea: string;
  typical: string;
  anyArea: string;
  result: string;
  more: string;
  why: string;
  check: string;
  quality: { strong: string; good: string; partial: string };
  useFits: string;
  useMiss: string;
  areaFits: string;
  areaMiss: string;
  reserved: string;
  details: string;
  viewing: string;
  emptyTitle: string;
  emptyText: string;
  emptyCta: string;
  demo: string;
};

type Option = { key: string; label: string };

const fill = (template: string, values: Record<string, string>) => template.replace(/\{(\w+)\}/g, (_, k: string) => values[k] ?? "");

export function TenantAdvisor({
  items,
  uses,
  needs,
  bands,
  copy,
  contactHref,
}: {
  items: AdvisorItem[];
  uses: (Option & { goal: string; typical: string[] })[];
  needs: (Option & { why: string })[];
  bands: (Option & { min: number; max: number })[];
  copy: AdvisorCopy;
  contactHref: string;
}) {
  const [use, setUse] = useState(uses[0].key);
  const [chosen, setChosen] = useState<string[]>(uses[0].typical.slice(0, 3));
  const [touched, setTouched] = useState(false);
  const [band, setBand] = useState("all");

  // Deep link: /leasing?use=fnb#advisor preselects the business type.
  useEffect(() => {
    const read = () => {
      const q = new URLSearchParams(window.location.search).get("use");
      const found = uses.find((u) => u.key === q);
      if (found) {
        setUse(found.key);
        setChosen(found.typical.slice(0, 3));
      }
    };
    read();
  }, [uses]);

  const current = uses.find((u) => u.key === use)!;
  const chooseUse = (key: string) => {
    setUse(key);
    if (!touched) setChosen(uses.find((u) => u.key === key)!.typical.slice(0, 3));
  };
  const toggle = (key: string) => {
    setTouched(true);
    setChosen((list) => (list.includes(key) ? list.filter((k) => k !== key) : [...list, key]));
  };
  const orderedNeeds = useMemo(() => [...needs].sort((a, b) => {
    const ia = current.typical.indexOf(a.key);
    const ib = current.typical.indexOf(b.key);
    return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
  }), [needs, current]);

  const ranked = useMemo(() => {
    const b = bands.find((o) => o.key === band);
    return items
      .map((item) => {
        const useOk = item.uses.includes(use);
        const areaOk = !b || (item.areaMin <= b.max && item.area >= b.min);
        let score = useOk ? 4 : -3;
        chosen.forEach((need) => {
          const level = item.fit[need];
          score += level === "strong" ? 2 : level === "possible" ? 1 : -1;
        });
        if (b) score += areaOk ? 2 : -4;
        if (item.avail === "reserved") score -= 2;
        const max = 4 + chosen.length * 2 + (b ? 2 : 0);
        const ratio = Math.max(0, score) / Math.max(max, 1);
        return { item, useOk, areaOk, score, ratio };
      })
      .sort((x, y) => y.score - x.score);
  }, [items, use, chosen, band, bands]);

  const best = ranked[0];
  const viable = best && best.useOk && best.areaOk && best.ratio >= 0.35;
  const quality = !best ? "partial" : best.ratio >= 0.75 ? "strong" : best.ratio >= 0.5 ? "good" : "partial";
  const label = (key: string) => needs.find((n) => n.key === key)?.label ?? key;
  const others = ranked.slice(1).filter((r) => r.useOk && r.areaOk).slice(0, 2);

  return (
    <div className="lx-adv">
      <div className="lx-adv__form">
        <fieldset className="lx-adv__field">
          <legend><span>01</span>{copy.stepUse}</legend>
          <div className="lx-adv__uses">
            {uses.map((option) => (
              <label key={option.key} className={`lx-adv__use${use === option.key ? " is-active" : ""}`}>
                <input type="radio" name="adv-use" value={option.key} checked={use === option.key} onChange={() => chooseUse(option.key)} />
                <span className="lx-adv__use-label">{option.label}</span>
                <span className="lx-adv__use-goal">{option.goal}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="lx-adv__field">
          <legend><span>02</span>{copy.stepNeeds}</legend>
          <p className="xp-matcher__hint">{fill(copy.typical, { type: current.label })}</p>
          <div className="xp-need-grid">
            {orderedNeeds.map((need) => (
              <label key={need.key} className={`xp-need${current.typical.includes(need.key) ? " is-typical" : ""}`}>
                <input type="checkbox" checked={chosen.includes(need.key)} onChange={() => toggle(need.key)} />
                <span className="xp-need__box" aria-hidden="true" />
                <span className="xp-need__label">{need.label}</span>
                <span className="xp-need__why">{need.why}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="lx-adv__field">
          <legend><span>03</span>{copy.stepArea}</legend>
          <div className="xp-choice-row">
            {[{ key: "all", label: copy.anyArea }, ...bands].map((option) => (
              <label key={option.key} className="xp-choice">
                <input type="radio" name="adv-area" value={option.key} checked={band === option.key} onChange={() => setBand(option.key)} />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="lx-adv__result" aria-live="polite">
        {viable ? (
          <article className="xp-match" key={`${best.item.id}-${use}-${band}-${chosen.join()}`}>
            <div className="xp-match__media">{best.item.media}</div>
            <div className="xp-match__body">
              <p className="xp-match__label">
                {copy.result} · <span className={`xp-match__quality xp-match__quality--${quality}`}>{copy.quality[quality]}</span>
              </p>
              <h3 className="xp-match__name">{best.item.project}</h3>
              <p className="xp-match__meta">{best.item.unit} · {best.item.areaLabel} · {best.item.availLabel}</p>
              <div className="xp-match__list">
                <p className="xp-match__label">{copy.why}</p>
                <ul className="xp-ticks">
                  <li>{fill(copy.useFits, { type: current.label })}</li>
                  {band !== "all" ? <li>{copy.areaFits}</li> : null}
                  {chosen.filter((need) => best.item.fit[need] === "strong").map((need) => (
                    <li key={need}>{label(need)}</li>
                  ))}
                </ul>
              </div>
              {chosen.some((need) => best.item.fit[need] !== "strong") || best.item.avail === "reserved" ? (
                <div className="xp-match__list">
                  <p className="xp-match__label">{copy.check}</p>
                  <ul className="xp-checks">
                    {chosen.filter((need) => best.item.fit[need] !== "strong").map((need) => (
                      <li key={need}>{label(need)}</li>
                    ))}
                    {best.item.avail === "reserved" ? <li>{copy.reserved}</li> : null}
                  </ul>
                </div>
              ) : null}
              {best.item.demo ? <p className="xp-match__alt">{copy.demo}</p> : null}
              <div className="xp-match__actions">
                <Link className="btn" href={best.item.viewing}><span>{copy.viewing}</span><Icon /></Link>
                <Link className="tlink" href={best.item.href}><span>{copy.details}</span><Icon /></Link>
              </div>
              {others.length ? (
                <div className="lx-adv__more">
                  <p className="xp-match__label">{copy.more}</p>
                  <ul>
                    {others.map(({ item }) => (
                      <li key={item.id}>
                        <Link href={item.href}>
                          <span>{item.project} · {item.unit}</span>
                          <span>{item.areaLabel} · {item.availLabel}</span>
                          <Icon />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </article>
        ) : (
          <div className="xp-match xp-match--empty">
            <h3 className="xp-match__name">{copy.emptyTitle}</h3>
            <p className="xp-match__reason">{copy.emptyText}</p>
            <Link className="btn" href={`${contactHref}?subject=lease&type=${use}#occupier`}><span>{copy.emptyCta}</span><Icon /></Link>
          </div>
        )}
      </div>
    </div>
  );
}

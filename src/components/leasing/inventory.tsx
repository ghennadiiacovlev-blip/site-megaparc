"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Icon } from "@/components/ui";

/**
 * AVAILABLE NOW — the leasing inventory filter (OWNER correction 2026-10-08).
 * Cards are server-rendered children carrying data attributes; this component
 * only decides which are visible (the `hidden` attribute) and says how many
 * match. Filters: use · area · property · available now. State mirrors the URL
 * (?use=fnb&area=120-300&project=moscova-20&now=1) so Home, project pages and
 * the tenant advisor can deep-link into a filtered view.
 */

export type InventoryItem = { id: string; uses: string[]; area: number; areaMin: number; project: string; avail: "now" | "soon" | "reserved" };
type Option = { key: string; label: string };
type Band = Option & { min: number; max: number };

export type InventoryCopy = {
  label: string;
  use: string;
  area: string;
  project: string;
  all: string;
  anyArea: string;
  allProjects: string;
  nowOnly: string;
  /** [one, few, many] — the component picks the form (RU needs three). */
  found: [string, string, string];
  reset: string;
  emptyTitle: string;
  emptyText: string;
  emptyCta: string;
};

const plural = (n: number, forms: [string, string, string], locale: string) => {
  if (locale === "ru") {
    const mod10 = n % 10;
    const mod100 = n % 100;
    if (mod10 === 1 && mod100 !== 11) return forms[0];
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return forms[1];
    return forms[2];
  }
  return n === 1 ? forms[0] : forms[2];
};

export function LeasingInventory({
  locale,
  items,
  uses,
  bands,
  projects,
  copy,
  contactHref,
  children,
}: {
  locale: string;
  items: InventoryItem[];
  uses: Option[];
  bands: Band[];
  projects: Option[];
  copy: InventoryCopy;
  contactHref: string;
  children: ReactNode;
}) {
  const [use, setUse] = useState("all");
  const [band, setBand] = useState("all");
  const [project, setProject] = useState("all");
  const [now, setNow] = useState(false);
  // The URL is written only after it has been read once: otherwise the first render would erase deep-link parameters
  // (?use=fnb) before the tenant advisor reads them.
  const [initialised, setInitialised] = useState(false);
  const list = useRef<HTMLDivElement>(null);

  // Deep links from other pages (read once, and on back / forward).
  useEffect(() => {
    const read = () => {
      const params = new URLSearchParams(window.location.search);
      const u = params.get("use");
      const a = params.get("area");
      const p = params.get("project");
      setUse(u && uses.some((o) => o.key === u) ? u : "all");
      setBand(a && bands.some((o) => o.key === a) ? a : "all");
      setProject(p && projects.some((o) => o.key === p) ? p : "all");
      setNow(params.get("now") === "1");
      setInitialised(true);
    };
    read();
    window.addEventListener("popstate", read);
    return () => window.removeEventListener("popstate", read);
  }, [uses, bands, projects]);

  const matches = useMemo(() => {
    const b = bands.find((o) => o.key === band);
    return (item: InventoryItem, skip?: "use" | "band" | "project") =>
      (skip === "use" || use === "all" || item.uses.includes(use)) &&
      (skip === "band" || !b || (item.areaMin <= b.max && item.area >= b.min)) &&
      (skip === "project" || project === "all" || item.project === project) &&
      (!now || item.avail === "now");
  }, [use, band, project, now, bands]);

  const visible = useMemo(() => new Set(items.filter((item) => matches(item)).map((item) => item.id)), [items, matches]);
  const countFor = (skip: "use" | "band" | "project", test: (item: InventoryItem) => boolean) => items.filter((item) => matches(item, skip) && test(item)).length;

  // Apply visibility to the server-rendered cards and keep the URL shareable.
  useEffect(() => {
    list.current?.querySelectorAll<HTMLElement>("[data-space]").forEach((card) => {
      card.hidden = !visible.has(card.dataset.space ?? "");
    });
    if (!initialised) return;
    const params = new URLSearchParams(window.location.search);
    for (const key of ["use", "area", "project", "now"]) params.delete(key);
    if (use !== "all") params.set("use", use);
    if (band !== "all") params.set("area", band);
    if (project !== "all") params.set("project", project);
    if (now) params.set("now", "1");
    const query = params.toString();
    const next = `${window.location.pathname}${query ? `?${query}` : ""}${window.location.hash}`;
    if (next !== `${window.location.pathname}${window.location.search}${window.location.hash}`) window.history.replaceState(null, "", next);
  }, [visible, use, band, project, now, initialised]);

  const reset = () => {
    setUse("all");
    setBand("all");
    setProject("all");
    setNow(false);
  };
  const filtered = use !== "all" || band !== "all" || project !== "all" || now;
  const count = visible.size;

  return (
    <div className="lx-inv">
      <div className="lx-inv__filters" role="group" aria-label={copy.label}>
        <fieldset className="lx-inv__row">
          <legend>{copy.use}</legend>
          <div className="lx-inv__chips">
            {[{ key: "all", label: copy.all }, ...uses].map((option) => {
              const n = option.key === "all" ? countFor("use", () => true) : countFor("use", (item) => item.uses.includes(option.key));
              return (
                <button key={option.key} type="button" className={`xp-filter__btn${use === option.key ? " is-active" : ""}`} aria-pressed={use === option.key} disabled={n === 0 && use !== option.key} onClick={() => setUse(option.key)}>
                  {option.label}
                  <sup>{String(n).padStart(2, "0")}</sup>
                </button>
              );
            })}
          </div>
        </fieldset>
        <fieldset className="lx-inv__row">
          <legend>{copy.area}</legend>
          <div className="lx-inv__chips">
            {[{ key: "all", label: copy.anyArea, min: 0, max: Infinity }, ...bands].map((option) => {
              const n = countFor("band", (item) => option.key === "all" || (item.areaMin <= option.max && item.area >= option.min));
              return (
                <button key={option.key} type="button" className={`xp-filter__btn${band === option.key ? " is-active" : ""}`} aria-pressed={band === option.key} disabled={n === 0 && band !== option.key} onClick={() => setBand(option.key)}>
                  {option.label}
                  <sup>{String(n).padStart(2, "0")}</sup>
                </button>
              );
            })}
          </div>
        </fieldset>
        <div className="lx-inv__row lx-inv__row--inline">
          <label className="lx-inv__select">
            <span>{copy.project}</span>
            <select value={project} onChange={(event) => setProject(event.target.value)}>
              <option value="all">{copy.allProjects}</option>
              {projects.map((option) => (
                <option key={option.key} value={option.key}>{option.label}</option>
              ))}
            </select>
          </label>
          <label className="lx-inv__toggle">
            <input type="checkbox" checked={now} onChange={(event) => setNow(event.target.checked)} />
            <span className="lx-inv__switch" aria-hidden="true" />
            <span>{copy.nowOnly}</span>
          </label>
        </div>
      </div>

      <div className="lx-inv__status" aria-live="polite">
        <p>
          <strong>{String(count).padStart(2, "0")}</strong> {plural(count, copy.found, locale)}
        </p>
        {filtered ? (
          <button type="button" className="tlink" onClick={reset}>
            <span>{copy.reset}</span>
            <Icon />
          </button>
        ) : null}
      </div>

      <div className="lx-inv__list" ref={list}>
        {children}
      </div>

      {count === 0 ? (
        <div className="lx-inv__empty">
          <h3>{copy.emptyTitle}</h3>
          <p>{copy.emptyText}</p>
          <Link className="btn" href={contactHref}>
            <span>{copy.emptyCta}</span>
            <Icon />
          </Link>
        </div>
      ) : null}
    </div>
  );
}

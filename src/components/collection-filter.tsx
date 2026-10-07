"use client";

import { useState, type ReactNode } from "react";

/**
 * Portfolio filter — a quiet segmented control over a server-rendered
 * collection. Items carry data-category; hidden items collapse with CSS only.
 */
export function CollectionFilter({ options, label, children }: { options: { key: string; label: string; count: number }[]; label: string; children: ReactNode }) {
  const [active, setActive] = useState("all");
  return (
    <div className="xp-filter" data-filter={active}>
      <div className="xp-filter__bar" role="group" aria-label={label}>
        {options.map((option) => (
          <button key={option.key} type="button" className={`xp-filter__btn${active === option.key ? " is-active" : ""}`} aria-pressed={active === option.key} onClick={() => setActive(option.key)}>
            {option.label}
            <sup>{String(option.count).padStart(2, "0")}</sup>
          </button>
        ))}
      </div>
      {children}
    </div>
  );
}

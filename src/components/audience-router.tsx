"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { Icon } from "@/components/ui";

export type RouterItem = { key: string; title: string; next: string; cta: string; href: string; media: ReactNode };

/**
 * Audience routing — a calm editorial index, not a sales funnel (OWNER brief
 * 2026-10-08): each direction is a title, one sentence and a call to action;
 * one image on the right crossfades to the direction under the pointer / focus
 * and illustrates its meaning. No numbering. Phones: each line carries its own frame.
 */
export function AudienceRouter({ items, label, tone = "light" }: { items: RouterItem[]; label: string; tone?: "light" | "dark" }) {
  const [active, setActive] = useState(0);
  return (
    <div className={`xp-router${tone === "dark" ? " xp-router--dark" : ""}`} data-active={active}>
      <ol className="xp-router__list" aria-label={label}>
        {items.map((item, index) => (
          <li key={item.key} className={`xp-router__item${index === active ? " is-active" : ""}`}>
            <Link href={item.href} className="xp-router__link" onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)}>
              <span className="xp-router__title">{item.title}</span>
              <span className="xp-router__next">{item.next}</span>
              <span className="xp-router__cta">{item.cta}<Icon name="arrow" size={18} /></span>
              <span className="xp-router__thumb" aria-hidden="true">{item.media}</span>
            </Link>
          </li>
        ))}
      </ol>
      <div className="xp-router__stage" aria-hidden="true">
        {items.map((item, index) => (
          <div key={item.key} className={`xp-router__frame${index === active ? " is-active" : ""}`}>
            {item.media}
          </div>
        ))}
        <p className="xp-router__caption">
          <span>{items[active].title}</span>
          {items[active].next}
        </p>
      </div>
    </div>
  );
}

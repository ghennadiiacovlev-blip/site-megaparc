"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { Icon } from "@/components/ui";

export type RouterItem = { key: string; no: string; title: string; next: string; href: string; media: ReactNode };

/**
 * Early audience routing — an editorial index, not a row of cards.
 * Large numbered lines on the left; one architectural frame on the right that
 * crossfades to the line under the pointer / keyboard focus. Phones: each line
 * carries its own small frame and the "what happens next" sentence.
 */
export function AudienceRouter({ items, label, tone = "light" }: { items: RouterItem[]; label: string; tone?: "light" | "dark" }) {
  const [active, setActive] = useState(0);
  return (
    <div className={`xp-router${tone === "dark" ? " xp-router--dark" : ""}`} data-active={active}>
      <ol className="xp-router__list" aria-label={label}>
        {items.map((item, index) => (
          <li key={item.key} className={`xp-router__item${index === active ? " is-active" : ""}`}>
            <Link href={item.href} className="xp-router__link" onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)}>
              <span className="xp-router__no">{item.no}</span>
              <span className="xp-router__title">{item.title}</span>
              <span className="xp-router__next">{item.next}</span>
              <span className="xp-router__thumb" aria-hidden="true">{item.media}</span>
              <span className="xp-router__arrow" aria-hidden="true"><Icon name="arrow" size={22} /></span>
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
          <span>{items[active].no}</span>
          {items[active].next}
        </p>
      </div>
    </div>
  );
}

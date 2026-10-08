"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/components/ui";

/**
 * Property / land owner journey: what do you have → what are you considering →
 * how MEGAPARC thinks about it → submit the opportunity (prefilled form).
 */
export type CompassCopy = {
  have: string;
  consider: string;
  thinking: string;
  assess: string;
  proof: string;
  submit: string;
};

export function OwnerCompass({
  assets,
  intents,
  copy,
  proof,
  contactHref,
  reload = false,
}: {
  assets: { key: string; label: string }[];
  intents: { key: string; label: string; thinking: string; assess: string[] }[];
  copy: CompassCopy;
  proof: { title: string; text: string; href: string; cta: string };
  contactHref: string;
  /** The form is on the same page: a plain link reloads it so the form reads the choice from the URL. */
  reload?: boolean;
}) {
  const [have, setHave] = useState(assets[0].key);
  const [intent, setIntent] = useState(intents[intents.length - 1].key);
  const chosen = intents.find((item) => item.key === intent)!;
  const href = `${contactHref}?${new URLSearchParams({ subject: "property", have, consider: intent }).toString()}#opportunity`;

  return (
    <div className="xp-compass">
      <div className="xp-compass__steps">
        <fieldset className="xp-matcher__field">
          <legend><span>01</span>{copy.have}</legend>
          <div className="xp-choice-row">
            {assets.map((item) => (
              <label key={item.key} className="xp-choice">
                <input type="radio" name="have" value={item.key} checked={have === item.key} onChange={() => setHave(item.key)} />
                <span>{item.label}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset className="xp-matcher__field">
          <legend><span>02</span>{copy.consider}</legend>
          <div className="xp-choice-row">
            {intents.map((item) => (
              <label key={item.key} className="xp-choice">
                <input type="radio" name="consider" value={item.key} checked={intent === item.key} onChange={() => setIntent(item.key)} />
                <span>{item.label}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="xp-compass__answer" aria-live="polite">
        <p className="xp-eyebrow"><span className="xp-eyebrow__no">03</span><span>{copy.thinking}</span></p>
        <p className="xp-compass__thinking" key={intent}>{chosen.thinking}</p>
        <p className="xp-match__label">{copy.assess}</p>
        <ul className="xp-ticks xp-ticks--inline">
          {chosen.assess.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="xp-compass__proof">
          <p className="xp-match__label">{copy.proof}</p>
          <p><b>{proof.title}</b> {proof.text}</p>
          <Link className="tlink" href={proof.href}><span>{proof.cta}</span><Icon /></Link>
        </div>
        {reload ? (
          <a className="btn" href={href}><span>{copy.submit}</span><Icon /></a>
        ) : (
          <Link className="btn" href={href}><span>{copy.submit}</span><Icon /></Link>
        )}
      </div>
    </div>
  );
}

import type { ReactNode } from "react";
import type { ShotKey } from "@/data/photo-direction";

/**
 * Composition sketch of a shot — a few lines that show the photographer where
 * the building, the horizon, the people and the camera go. Drawn in a
 * 160 × 100 field; the subject in red, context in ink. Pure illustration of
 * the brief in src/data/photo-direction.ts, never a picture of a property.
 */
const person = (x: number, y: number, s = 1) => (
  <g key={`p${x}-${y}`} className="ps-sk__person" transform={`translate(${x} ${y}) scale(${s})`}>
    <circle cx="0" cy="-9" r="2" />
    <path d="M0 -7 V1 M0 1 L-2.4 7 M0 1 L2.4 7 M-3 -4 H3" />
  </g>
);

const sketches: Record<ShotKey, ReactNode> = {
  hero: (
    <>
      <path className="ps-sk__line" d="M0 74 H160" />
      <rect className="ps-sk__subject" x="94" y="30" width="44" height="44" />
      <path className="ps-sk__thin" d="M101 40 H131 M101 50 H131 M101 60 H131 M116 64 V74" />
      <path className="ps-sk__guide" d="M53 0 V100 M107 0 V100" />
      {person(60, 86, .9)}
      {person(72, 88, .9)}
    </>
  ),
  facade34: (
    <>
      <path className="ps-sk__line" d="M0 80 H160" />
      <path className="ps-sk__subject" d="M50 30 L86 22 L126 32 L126 80 L86 84 L50 80 Z M86 22 V84" />
      <path className="ps-sk__thin" d="M54 42 L82 37 M54 56 L82 52 M90 37 L122 43 M90 52 L122 56" />
      {person(136, 88, .8)}
    </>
  ),
  frontal: (
    <>
      <path className="ps-sk__line" d="M0 82 H160" />
      <rect className="ps-sk__subject" x="30" y="22" width="100" height="60" />
      <path className="ps-sk__thin" d="M30 34 H130 M50 22 V82 M70 22 V82 M90 22 V82 M110 22 V82" />
      <path className="ps-sk__guide" d="M80 10 V96" />
    </>
  ),
  context: (
    <>
      <path className="ps-sk__line" d="M0 70 L60 52 M160 70 L100 52 M60 52 H100" />
      <rect className="ps-sk__thin" x="14" y="30" width="26" height="34" />
      <rect className="ps-sk__subject" x="66" y="28" width="28" height="24" />
      <rect className="ps-sk__thin" x="118" y="24" width="30" height="40" />
      {person(36, 88, .8)}
      {person(122, 90, .8)}
    </>
  ),
  access: (
    <>
      <path className="ps-sk__line" d="M20 100 C40 70 70 62 92 58 M70 100 C80 76 98 66 112 60" />
      <rect className="ps-sk__subject" x="104" y="30" width="40" height="30" />
      <path className="ps-sk__guide" d="M60 84 l6 -4 M78 76 l6 -3" />
    </>
  ),
  parking: (
    <>
      <rect className="ps-sk__subject" x="96" y="18" width="50" height="34" />
      <path className="ps-sk__line" d="M10 90 L40 60 M32 90 L56 60 M54 90 L72 60 M76 90 L88 60 M10 90 H90" />
      <path className="ps-sk__guide" d="M96 52 L80 70" />
    </>
  ),
  entrance: (
    <>
      <path className="ps-sk__line" d="M0 88 H160" />
      <rect className="ps-sk__thin" x="44" y="14" width="72" height="74" />
      <rect className="ps-sk__subject" x="66" y="44" width="28" height="44" />
      <path className="ps-sk__subject" d="M50 30 H110" />
      {person(84, 84, 1.1)}
    </>
  ),
  human: (
    <>
      <path className="ps-sk__line" d="M0 76 H160" />
      <rect className="ps-sk__thin" x="20" y="20" width="120" height="56" />
      {person(56, 90, 1.5)}
      {person(78, 92, 1.5)}
      <g className="ps-sk__accent">{person(108, 91, 1.5)}</g>
    </>
  ),
  tenant: (
    <>
      <rect className="ps-sk__thin" x="16" y="18" width="128" height="66" />
      <path className="ps-sk__thin" d="M16 30 H144 M58 30 V84 M102 30 V84" />
      <g className="ps-sk__accent">{person(40, 78, 1.2)}{person(80, 80, 1.2)}{person(122, 78, 1.2)}</g>
    </>
  ),
  interior: (
    <>
      <path className="ps-sk__line" d="M0 0 L50 30 H110 L160 0 M0 100 L50 70 H110 L160 100 M50 30 V70 M110 30 V70" />
      <rect className="ps-sk__subject" x="62" y="36" width="36" height="22" />
      <path className="ps-sk__thin" d="M80 36 V58" />
    </>
  ),
  detail: (
    <>
      <path className="ps-sk__thin" d="M0 20 H160 M0 50 H160 M0 80 H160 M30 0 V100 M80 0 V100 M130 0 V100" />
      <rect className="ps-sk__subject" x="30" y="20" width="50" height="30" />
    </>
  ),
  drone: (
    <>
      <path className="ps-sk__line" d="M0 74 L160 44 M40 100 L76 0" />
      <path className="ps-sk__subject" d="M78 40 L128 32 L140 62 L88 72 Z" />
      <path className="ps-sk__guide" d="M8 10 L78 40 M8 10 L128 32" />
      <circle className="ps-sk__cam" cx="8" cy="10" r="3" />
    </>
  ),
  evening: (
    <>
      <rect className="ps-sk__night" x="0" y="0" width="160" height="70" />
      <path className="ps-sk__line" d="M0 74 H160" />
      <rect className="ps-sk__thin" x="94" y="30" width="44" height="44" />
      <path className="ps-sk__lit" d="M100 38 h8 M114 38 h8 M126 38 h6 M100 48 h8 M114 48 h8 M100 58 h8 M126 58 h6" />
    </>
  ),
  mobile: (
    <>
      <rect className="ps-sk__guide" x="56" y="2" width="48" height="96" rx="4" />
      <rect className="ps-sk__subject" x="64" y="14" width="32" height="70" />
      <path className="ps-sk__thin" d="M64 26 H96 M64 38 H96 M64 50 H96 M64 62 H96 M76 72 V84 M84 72 V84" />
      {person(72, 94, .7)}
    </>
  ),
  unit: (
    <>
      <path className="ps-sk__line" d="M10 8 L50 30 H110 L150 8 M10 92 L50 70 H110 L150 92 M50 30 V70 M110 30 V70" />
      <path className="ps-sk__subject" d="M66 70 V42 H84 V70" />
      <path className="ps-sk__thin" d="M114 34 L146 16 M114 64 L146 82" />
    </>
  ),
  plan: (
    <>
      <rect className="ps-sk__line" x="20" y="14" width="120" height="72" />
      <path className="ps-sk__thin" d="M80 14 V60 M80 60 H140" />
      <g className="ps-sk__points">
        <circle cx="32" cy="76" r="5" /><text x="32" y="78.4">1</text>
        <circle cx="128" cy="24" r="5" /><text x="128" y="26.4">2</text>
        <circle cx="92" cy="74" r="5" /><text x="92" y="76.4">3</text>
      </g>
      <path className="ps-sk__guide" d="M36 72 L58 52 M36 72 L52 46 M124 28 L100 46 M124 28 L110 52" />
    </>
  ),
};

export function ShotSketch({ shot }: { shot: ShotKey }) {
  return (
    <svg className="ps-sk" viewBox="0 0 160 100" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      {sketches[shot]}
    </svg>
  );
}

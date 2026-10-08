import type { CSSProperties } from "react";
import { ShotSketch } from "@/components/photo-sketch";
import { ArtImage } from "@/components/primitives";
import { demoContentPresent } from "@/data/demo-content";
import { propertyBriefs, shots, type PropertyBrief } from "@/data/photo-direction";
import type { AssetMedia } from "@/lib/assets";
import type { Localized, SiteLocale } from "@/lib/site-data";

/**
 * HOW THIS PROPERTY WILL BE PHOTOGRAPHED — storyboard of the sixteen shots
 * (OWNER: "show exactly HOW EACH PROPERTY SHOULD BE SHOT"). Preview only: it
 * renders while the build carries demo content and disappears with the
 * production gate. Where the current OWNER photograph already covers a shot it
 * is shown; every other shot is a framed card with its brief (purpose, camera,
 * time and light, people, crops). Full brief: docs/PROPERTY_PHOTO_SHOT_LIST.md.
 */
const t = {
  label: { ro: "Direcția foto · previzualizare", ru: "Фото-направление · превью", en: "Photo direction · preview" },
  title: { ro: "Cum va fi fotografiat acest obiect.", ru: "Как будет снят этот объект.", en: "How this property will be photographed." },
  lead: {
    ro: "Șaisprezece cadre pentru fotograf. Unde cadrul există deja — fotografia actuală; unde nu — fișa cadrului: scopul, poziția aparatului, ora și lumina.",
    ru: "Шестнадцать кадров для фотографа. Где кадр уже есть — текущая фотография; где нет — карточка кадра: задача, позиция камеры, время и свет.",
    en: "Sixteen frames for the photographer. Where the frame exists — the current photograph; where it does not — the shot card: purpose, camera position, time and light.",
  },
  mood: { ro: "Atmosfera", ru: "Настроение", en: "Mood" },
  avoid: { ro: "De evitat", ru: "Избегать", en: "Avoid" },
  covered: { ro: "Fotografie existentă", ru: "Есть фотография", en: "Photograph exists" },
  todo: { ro: "De fotografiat", ru: "Нужно снять", en: "To be shot" },
  na: { ro: "Nu se aplică", ru: "Не применяется", en: "Not applicable" },
  camera: { ro: "Aparat", ru: "Камера", en: "Camera" },
  time: { ro: "Ora · lumina", ru: "Время · свет", en: "Time · light" },
  people: { ro: "Oameni", ru: "Люди", en: "People" },
  crops: { ro: "Decupaje", ru: "Кадрирование", en: "Crops" },
  yes: { ro: "Da", ru: "Да", en: "Yes" },
  no: { ro: "Nu", ru: "Нет", en: "No" },
  optional: { ro: "Opțional", ru: "По желанию", en: "Optional" },
} satisfies Record<string, Localized>;

export function PhotoStoryboard({ slug, locale, media, no }: { slug: PropertyBrief["slug"]; locale: SiteLocale; media: AssetMedia | null; no: string }) {
  if (!demoContentPresent) return null;
  const brief = propertyBriefs.find((item) => item.slug === slug);
  if (!brief) return null;
  return (
    <section className="xp-sec xp-sec--paper ps" aria-label={t.title[locale]}>
      <div className="xp-shell">
        <div className="ps__head" data-reveal>
          <p className="xp-eyebrow"><span className="xp-eyebrow__no">{no}</span><span lang={locale}>{t.label[locale]}</span></p>
          <h2 className="xp-split__title">{t.title[locale]}</h2>
          <p className="xp-muted">{t.lead[locale]}</p>
          <dl className="ps__brief">
            <div><dt>{t.mood[locale]}</dt><dd>{brief.mood[locale]}</dd></div>
            <div><dt>{t.avoid[locale]}</dt><dd>{brief.avoid[locale]}</dd></div>
          </dl>
        </div>
        <ol className="ps__grid">
          {shots.map((shot) => {
            const na = brief.notApplicable.includes(shot.key);
            const covered = !na && brief.covered.includes(shot.key) && media;
            return (
              <li key={shot.key} className={`ps__card${na ? " is-na" : ""}${covered ? " is-covered" : ""}`}>
                <div className="ps__frame" style={{ "--ratio": String(Math.max(0.75, Math.min(shot.ratio, 2.1))) } as CSSProperties}>
                  {covered ? (
                    <ArtImage media={media} alt={`${brief.name} — ${shot.label[locale]}`} sizes="(min-width: 1024px) 22vw, 50vw" variant={shot.ratio > 2 ? "wide" : "master"} />
                  ) : (
                    <>
                      <span className="ps__grid-lines" aria-hidden="true"><i /><i /><i /><i /></span>
                      <ShotSketch shot={shot.key} />
                    </>
                  )}
                  <span className="ps__no">{shot.no}</span>
                  <span className="ps__state">{na ? t.na[locale] : covered ? t.covered[locale] : t.todo[locale]}</span>
                </div>
                <h3 className="ps__name">{shot.label[locale]}</h3>
                {na ? null : (
                  <>
                    <p className="ps__purpose">{shot.purpose[locale]}</p>
                    <dl className="ps__specs">
                      <div><dt>{t.camera[locale]}</dt><dd>{shot.camera}</dd></div>
                      <div><dt>{t.time[locale]}</dt><dd>{shot.time[locale]} · {shot.light[locale]}</dd></div>
                      <div><dt>{t.people[locale]}</dt><dd>{t[shot.people][locale]} — {shot.peopleNote[locale]}</dd></div>
                      <div><dt>{t.crops[locale]}</dt><dd>{shot.desktop} · {shot.mobile}</dd></div>
                    </dl>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

import { ArtImage } from "@/components/primitives";
import { AudienceRouter } from "@/components/audience-router";
import { EnquiryForm, type FormOptions, type Subject } from "@/components/enquiry-form";
import { ConceptImage } from "@/components/experience";
import { OwnerCompass } from "@/components/owner-compass";
import { SpaceMatcher, type MatcherAsset, type MatcherCopy } from "@/components/space-matcher";
import { assetProfiles, company, leasingProcess, tenantFit, type Requirement } from "@/data/demo-content";
import { areaOptions, audienceIntro, audiencePaths, businessTypes, ownerAssets, ownerIntents, partnerCategories, requirementCopy, timelineOptions } from "@/data/journeys";
import { developmentProjects, portfolioAssets } from "@/lib/assets";
import { openVacancies } from "@/lib/careers";
import { organisationAreas } from "@/lib/team";
import { localePath, type Localized, type SiteLocale } from "@/lib/site-data";

/**
 * Server wrappers that turn journey data into the props of the client journey
 * components — one place, reused by Home, Portfolio, Opportunities and Contact.
 */

/**
 * Image for a portfolio slug: the real photograph, or — for a property without
 * approved photography (Creangă 78) — its registered concept placement, which
 * carries the PHOTO DIRECTION · CONCEPT label.
 */
export function propertyImage(slug: string, locale: SiteLocale, sizes = "(min-width: 1024px) 40vw, 100vw", conceptUse = "opportunities.matcher.creanga-78") {
  const asset = portfolioAssets.find((item) => item.slug === slug)!;
  if (asset.media) return <ArtImage media={asset.media} alt={`${asset.name} — ${asset.positioning[locale]}`} sizes={sizes} />;
  return <ConceptImage id={conceptUse} locale={locale} sizes={sizes} />;
}

/* ---------------------------------------------------------------- */
/* Audience router                                                    */
/* ---------------------------------------------------------------- */

export function AudienceRouterBlock({ locale, tone = "light" }: { locale: SiteLocale; tone?: "light" | "dark" }) {
  const items = audiencePaths.map((path) => ({
    key: path.key,
    no: path.no,
    title: path.title[locale],
    next: path.next[locale],
    href: `${localePath(locale, path.path)}#${path.anchor}`,
    media:
      path.image.kind === "asset" ? (
        propertyImage(path.image.slug, locale, "(min-width: 1024px) 40vw, 100vw")
      ) : (
        <ConceptImage id={path.image.id} locale={locale} sizes="(min-width: 1024px) 40vw, 100vw" />
      ),
  }));
  return <AudienceRouter items={items} label={audienceIntro.title[locale]} tone={tone} />;
}

/* ---------------------------------------------------------------- */
/* Space matcher                                                      */
/* ---------------------------------------------------------------- */

const matcherCopy: Record<SiteLocale, MatcherCopy> = {
  ro: {
    steps: { type: "Ce deschideți?", area: "Ce suprafață vă trebuie?", place: "Unde?", when: "Când vreți să deschideți?", needs: "Ce este critic pentru afacere?" },
    typical: "Pentru {type} contează de obicei punctele marcate cu roșu.",
    anyPlace: "Oriunde în Chișinău",
    result: "Recomandare",
    alternative: "Alternativă",
    why: "De ce se potrivește",
    check: "De verificat împreună",
    quality: { strong: "Potrivire puternică", good: "Potrivire bună", partial: "Potrivire parțială" },
    view: "Vezi obiectul",
    viewing: "Solicită o vizionare",
    discuss: "Discută cerințele",
    areaFits: "Suprafața se încadrează",
    areaMiss: "Suprafața disponibilă este {area}",
    availableFrom: "Disponibil: {date}",
    typeFits: "Formatul se potrivește pentru {type}",
    typeMiss: "Formatul nu este gândit în primul rând pentru {type}",
    noMatchTitle: "Acum nu avem exact acest spațiu.",
    noMatchText: "Spuneți-ne cerințele — verificăm spațiile care se eliberează și noile obiecte și revenim cu o propunere.",
    demo: "Valoare demonstrativă",
    reset: "Resetează",
  },
  ru: {
    steps: { type: "Что вы открываете?", area: "Какая площадь нужна?", place: "Где?", when: "Когда хотите открыться?", needs: "Что критично для бизнеса?" },
    typical: "Для формата «{type}» обычно важны пункты, отмеченные красным.",
    anyPlace: "Любой район Кишинёва",
    result: "Рекомендация",
    alternative: "Альтернатива",
    why: "Почему подходит",
    check: "Что проверить вместе",
    quality: { strong: "Сильное совпадение", good: "Хорошее совпадение", partial: "Частичное совпадение" },
    view: "Открыть объект",
    viewing: "Запросить просмотр",
    discuss: "Обсудить требования",
    areaFits: "Площадь подходит",
    areaMiss: "Доступная площадь — {area}",
    availableFrom: "Доступность: {date}",
    typeFits: "Формат подходит для: {type}",
    typeMiss: "Формат изначально не рассчитан на: {type}",
    noMatchTitle: "Сейчас именно такого помещения нет.",
    noMatchText: "Опишите требования — мы проверим освобождающиеся площади и новые объекты и вернёмся с предложением.",
    demo: "Демонстрационное значение",
    reset: "Сбросить",
  },
  en: {
    steps: { type: "What are you opening?", area: "How much space do you need?", place: "Where?", when: "When do you want to open?", needs: "What is critical for the business?" },
    typical: "For {type}, the points marked in red usually matter most.",
    anyPlace: "Anywhere in Chișinău",
    result: "Recommendation",
    alternative: "Alternative",
    why: "Why it fits",
    check: "To check together",
    quality: { strong: "Strong fit", good: "Good fit", partial: "Partial fit" },
    view: "View the property",
    viewing: "Request a viewing",
    discuss: "Discuss my requirements",
    areaFits: "The area fits",
    areaMiss: "Available area is {area}",
    availableFrom: "Availability: {date}",
    typeFits: "The format suits {type}",
    typeMiss: "The format is not primarily designed for {type}",
    noMatchTitle: "We don't have exactly this space right now.",
    noMatchText: "Tell us your requirements — we check space coming free and new properties, then come back with a proposal.",
    demo: "Demonstration value",
    reset: "Reset",
  },
};

const fmtArea = (min: number, max: number, locale: SiteLocale) => {
  const n = (v: number) => v.toLocaleString(locale === "ru" ? "ru-RU" : locale === "ro" ? "ro-RO" : "en-GB").replace(/ /g, " ");
  const unit = locale === "ru" ? "м²" : "m²";
  return min === max ? `${n(min)} ${unit}` : `${n(min)}–${n(max)} ${unit}`;
};

export function matcherAssets(locale: SiteLocale): MatcherAsset[] {
  return portfolioAssets.map((asset) => {
    const fit = tenantFit[asset.slug];
    const profile = assetProfiles[asset.slug];
    return {
      slug: asset.slug,
      name: asset.name,
      district: fit.district[locale],
      reason: fit.reason[locale],
      bestFor: fit.bestFor,
      areaMin: fit.area.min,
      areaMax: fit.area.max,
      areaLabel: fmtArea(fit.area.min, fit.area.max, locale),
      areaNote: fit.area.note?.[locale],
      from: fit.from,
      availability: profile.availability.value[locale],
      capabilities: Object.fromEntries(
        (Object.keys(fit.capabilities) as Requirement[]).map((key) => [key, { level: fit.capabilities[key].level, note: fit.capabilities[key].note[locale], demo: fit.capabilities[key].status === "DEMO" }]),
      ),
      href: localePath(locale, `/portfolio/${asset.slug}`),
      media: propertyImage(asset.slug, locale, "(min-width: 1024px) 40vw, 100vw"),
    };
  });
}

export function SpaceMatcherBlock({ locale }: { locale: SiteLocale }) {
  return (
    <SpaceMatcher
      locale={locale}
      assets={matcherAssets(locale)}
      types={businessTypes.map((t) => ({ key: t.key, label: t.label[locale], goal: t.goal[locale] }))}
      areas={areaOptions.map((a) => ({ key: a.key, label: locale === "ru" ? a.label.replace("m²", "м²") : a.label, min: a.min, max: a.max }))}
      timelines={timelineOptions.map((t) => ({ key: t.key, label: t.label[locale], by: t.by }))}
      requirements={(Object.keys(requirementCopy) as Requirement[]).map((key) => ({ key, label: requirementCopy[key].label[locale], why: requirementCopy[key].why[locale] }))}
      concerns={Object.fromEntries(businessTypes.map((t) => [t.key, t.concerns]))}
      copy={matcherCopy[locale]}
      contactHref={localePath(locale, "/contact")}
    />
  );
}

/* ---------------------------------------------------------------- */
/* Owner compass                                                      */
/* ---------------------------------------------------------------- */

const compassCopy: Record<SiteLocale, { have: string; consider: string; thinking: string; assess: string; proof: string; submit: string; proofTitle: string; proofText: string; proofCta: string }> = {
  ro: { have: "Ce aveți?", consider: "Ce luați în calcul?", thinking: "Cum gândește MEGAPARC", assess: "Ce evaluăm mai întâi", proof: "Exemplu real", submit: "Trimite oportunitatea", proofTitle: "Drochia Gateway, 2,0 ha.", proofText: "Un teren la intrarea în oraș, analizat în paralel pentru retail, logistică și format mixt — înainte de orice decizie de arhitectură.", proofCta: "Cum evaluăm un teren" },
  ru: { have: "Что у вас есть?", consider: "Что вы рассматриваете?", thinking: "Как думает MEGAPARC", assess: "Что оцениваем в первую очередь", proof: "Реальный пример", submit: "Отправить возможность", proofTitle: "Drochia Gateway, 2,0 га.", proofText: "Участок на въезде в город, который параллельно оценивается под ритейл, логистику и смешанный формат — до любых архитектурных решений.", proofCta: "Как мы оцениваем участок" },
  en: { have: "What do you have?", consider: "What are you considering?", thinking: "How MEGAPARC thinks", assess: "What we assess first", proof: "A real example", submit: "Submit the opportunity", proofTitle: "Drochia Gateway, 2.0 ha.", proofText: "A site at the entrance to the town, assessed in parallel for retail, logistics and a mixed format — before any architectural decision.", proofCta: "How we assess a site" },
};

export function OwnerCompassBlock({ locale }: { locale: SiteLocale }) {
  const c = compassCopy[locale];
  const drochia = developmentProjects.find((project) => project.slug === "drochia-gateway")!;
  return (
    <OwnerCompass
      assets={ownerAssets.map((a) => ({ key: a.key, label: a.label[locale] }))}
      intents={ownerIntents.map((i) => ({ key: i.key, label: i.label[locale], thinking: i.thinking[locale], assess: i.assess.map((x) => x[locale]) }))}
      copy={{ have: c.have, consider: c.consider, thinking: c.thinking, assess: c.assess, proof: c.proof, submit: c.submit }}
      proof={{ title: c.proofTitle, text: c.proofText, href: localePath(locale, `/development/${drochia.slug}`), cta: c.proofCta }}
      contactHref={localePath(locale, "/contact")}
    />
  );
}

/* ---------------------------------------------------------------- */
/* Enquiry form                                                       */
/* ---------------------------------------------------------------- */

const vacancyArea: Record<string, Localized> = {
  leadership: { ro: "Conducere", ru: "Руководство", en: "Leadership" },
  "investment-finance": { ro: "Investiții și finanțe", ru: "Инвестиции и финансы", en: "Investment and finance" },
  development: { ro: "Dezvoltare și construcții", ru: "Девелопмент и строительство", en: "Development and construction" },
  "asset-management": { ro: "Administrare active", ru: "Управление активами", en: "Asset management" },
  operations: { ro: "Exploatare", ru: "Эксплуатация", en: "Operations" },
};
export const disciplineLabel = (area: string, locale: SiteLocale) => vacancyArea[area]?.[locale] ?? area;

export function EnquiryFormBlock({ locale, initial }: { locale: SiteLocale; initial?: Subject }) {
  const districts = Array.from(new Set(portfolioAssets.map((a) => tenantFit[a.slug].district[locale])));
  const options: FormOptions = {
    properties: portfolioAssets.map((a) => ({ value: a.slug, label: a.name })),
    businessTypes: businessTypes.map((t) => ({ value: t.key, label: t.label[locale] })),
    areas: areaOptions.map((a) => ({ value: a.key, label: locale === "ru" ? a.label.replace("m²", "м²") : a.label })),
    districts: districts.map((d) => ({ value: d, label: d })),
    requirements: (Object.keys(requirementCopy) as Requirement[]).map((key) => ({ value: key, label: requirementCopy[key].label[locale] })),
    ownerAssets: ownerAssets.map((a) => ({ value: a.key, label: a.label[locale] })),
    ownerIntents: ownerIntents.map((i) => ({ value: i.key, label: i.label[locale] })),
    partnerCategories: partnerCategories.map((p) => ({ value: p.key, label: p.label[locale] })),
    vacancies: openVacancies.map((v) => ({ value: v.slug, label: v.title[locale] })),
    disciplines: [...organisationAreas.map((a) => ({ value: a.key, label: a.title[locale] })), { value: "operations", label: vacancyArea.operations[locale] }],
    mailboxes: {
      lease: company.emails.leasing.value[locale],
      property: company.emails.investments.value[locale],
      capital: company.emails.investments.value[locale],
      partnership: company.emails.office.value[locale],
      careers: company.emails.careers.value[locale],
    },
    reply: leasingProcess.reply.value[locale],
  };
  return <EnquiryForm locale={locale} options={options} initial={initial} />;
}


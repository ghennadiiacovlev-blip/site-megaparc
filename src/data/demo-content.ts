import type { Localized } from "@/lib/site-data";

/**
 * DEMO / PLACEHOLDER CONTENT REGISTRY — full-experience prototype (2026-10-07).
 *
 * OWNER brief "MEGAPARC — FULL EXPERIENCE PROTOTYPE · VISUAL FINAL WITH DEMO /
 * PLACEHOLDER DATA" + addendum "AI / FICTIONAL CONCEPT PHOTOGRAPHY".
 *
 * ABSOLUTE DATA SAFETY RULE: invented data is never silently converted into a
 * MEGAPARC fact. Every value the prototype shows that is not an approved fact
 * lives here, once, with
 *   key · group · page · field · value (RO / RU / EN) · status · futureSource
 * Status:
 *   CONFIRMED   — approved fact; mirrors src/lib/assets.ts / strategy.ts (listed so
 *                 each page's register shows what is real next to what is not)
 *   PROVISIONAL — used on the site before, not yet signed off by the OWNER
 *   DEMO        — invented for the approval preview; must be replaced before production
 *
 * Images: every concept photograph (`cv-*`, scripts/brand-imagery.mjs) is
 * status DEMO · type CONCEPT_VISUAL · futureReplacement REAL_MEGAPARC_PHOTO, and
 * every placement is listed in `imageUses`. A placement with scope
 * PROPERTY_DIRECTION stands in for a photograph of a named MEGAPARC property and
 * always shows the label PHOTO DIRECTION · CONCEPT; it may never reach production.
 *
 * docs/DEMO_DATA_REGISTER.md and docs/DEMO_IMAGE_REGISTER.md are generated from
 * this file (`npm run demo:register`); `npm run gate:production` fails while any
 * DEMO value or concept visual remains. This file has no runtime imports so the
 * generator can load it with Node's type stripping.
 */

export type DataStatus = "CONFIRMED" | "PROVISIONAL" | "DEMO";
export type DemoGroup = "COMPANY" | "PORTFOLIO" | "DEVELOPMENT" | "TEAM" | "INVESTMENT" | "LEASING" | "CAREERS" | "CONTACT" | "CASE STUDIES";

export type DataPoint = {
  key: string;
  group: DemoGroup;
  page: string;
  field: string;
  value: Localized;
  status: DataStatus;
  futureSource: string;
};

const points: DataPoint[] = [];

function point(status: DataStatus, key: string, group: DemoGroup, page: string, field: string, value: Localized | string, futureSource: string): DataPoint {
  const entry: DataPoint = { key, group, page, field, value: typeof value === "string" ? { ro: value, ru: value, en: value } : value, status, futureSource };
  points.push(entry);
  return entry;
}
const demo = (key: string, group: DemoGroup, page: string, field: string, value: Localized | string, futureSource: string) => point("DEMO", key, group, page, field, value, futureSource);
const confirmed = (key: string, group: DemoGroup, page: string, field: string, value: Localized | string, futureSource = "Confirmed — src/lib/assets.ts") => point("CONFIRMED", key, group, page, field, value, futureSource);
const provisional = (key: string, group: DemoGroup, page: string, field: string, value: Localized | string, futureSource: string) => point("PROVISIONAL", key, group, page, field, value, futureSource);

/* ------------------------------------------------------------------ */
/* COMPANY · CONTACT                                                    */
/* ------------------------------------------------------------------ */

export const company = {
  legalName: provisional("company.legalName", "COMPANY", "Contact · Footer", "Legal entity", "MEGAPARC SRL", "OWNER — legal entity name and IDNO"),
  city: confirmed("company.city", "COMPANY", "Contact", "Office city", { ro: "Chișinău, Republica Moldova", ru: "Кишинёв, Республика Молдова", en: "Chișinău, Republic of Moldova" }, "Confirmed — src/lib/site-data.ts"),
  hours: demo("company.hours", "CONTACT", "Contact", "Office hours", { ro: "Luni – vineri · 9:00 – 18:00", ru: "Пн – пт · 9:00 – 18:00", en: "Mon – Fri · 9:00 – 18:00" }, "OWNER — office hours"),
  phone: demo("contact.phone", "CONTACT", "Contact", "Telephone", "+373 XX XXX XXX", "OWNER — public telephone"),
  emails: {
    office: demo("contact.email.office", "CONTACT", "Contact", "General e-mail", "office@megaparc.md", "OWNER — verified mailbox (not routed in the preview)"),
    investments: demo("contact.email.investments", "CONTACT", "Contact", "Investment e-mail", "investments@megaparc.md", "OWNER — verified mailbox (not routed in the preview)"),
    leasing: demo("contact.email.leasing", "CONTACT", "Contact", "Leasing e-mail", "leasing@megaparc.md", "OWNER — verified mailbox (not routed in the preview)"),
    careers: demo("contact.email.careers", "CONTACT", "Contact · Careers", "Careers e-mail", "careers@megaparc.md", "OWNER — verified mailbox (not routed in the preview)"),
  },
  responseTime: demo("contact.response", "CONTACT", "Contact", "First reply", { ro: "Răspuns în 2 zile lucrătoare", ru: "Ответ в течение 2 рабочих дней", en: "Reply within 2 working days" }, "OWNER — service standard"),
};

/* ------------------------------------------------------------------ */
/* PORTFOLIO — headline figures                                         */
/* ------------------------------------------------------------------ */

/**
 * Consistency: GLA ≈ 10 500 m² = confirmed 7 138.63 m² (Dacia 31, Moscova 9,
 * Moscova 20) + DEMO 3 350 m² for Creangă 78. Tenants 20+ = 1 + 1 + 1 + 18.
 * Occupancy 94 % is the area-weighted DEMO occupancy of the four profiles below.
 */
export const portfolioFigures = {
  operating: confirmed("portfolio.operating", "PORTFOLIO", "Home · Portfolio", "Operating properties", "04", "Confirmed — count of src/lib/assets.ts"),
  gla: demo("portfolio.gla", "PORTFOLIO", "Home · Portfolio", "Lettable area (GLA)", { ro: "≈ 10.500 m²", ru: "≈ 10 500 м²", en: "≈ 10,500 m²" }, "OWNER — confirmed area of all four properties (Creangă 78 missing)"),
  tenants: demo("portfolio.tenants", "PORTFOLIO", "Home · Portfolio", "Tenants", "20+", "OWNER — tenant count"),
  occupancy: demo("portfolio.occupancy", "PORTFOLIO", "Home · Portfolio", "Occupancy", "94%", "OWNER — occupancy by area"),
  land: confirmed("portfolio.land", "PORTFOLIO", "Home · Portfolio", "Development land", { ro: "20.000+ m²", ru: "20 000+ м²", en: "20,000+ m²" }, "Confirmed — Drochia Gateway 2.0 ha (src/lib/metrics.ts)"),
};

/* ------------------------------------------------------------------ */
/* PORTFOLIO — property profiles                                        */
/* ------------------------------------------------------------------ */

export type AssetCategory = "office" | "retail" | "mixed";

export type AssetProfile = {
  category: AssetCategory;
  format: DataPoint;
  area: DataPoint;
  land: DataPoint;
  parking: DataPoint;
  tenants: DataPoint;
  occupancy: DataPoint;
  acquired: DataPoint;
  repositioned: DataPoint;
  availability: DataPoint;
  /** Forward-looking value-creation levers (analysis, not a record of past works). */
  levers: { title: DataPoint; text: Localized }[];
};

const P = (slug: string) => `Portfolio · ${slug}`;

function lever(key: string, slug: string, title: Localized, text: Localized) {
  return { title: demo(`asset.${slug}.lever.${key}`, "PORTFOLIO", P(slug), "Value-creation lever", title, "OWNER — asset business plan"), text };
}

export const assetProfiles: Record<"dacia-31" | "moscova-9" | "moscova-20" | "creanga-78", AssetProfile> = {
  "dacia-31": {
    category: "office",
    format: confirmed("asset.dacia-31.format", "PORTFOLIO", P("dacia-31"), "Format", { ro: "Clădire de birouri independentă", ru: "Отдельное офисное здание", en: "Stand-alone office building" }),
    area: confirmed("asset.dacia-31.area", "PORTFOLIO", P("dacia-31"), "Total area", { ro: "5.223 m²", ru: "5 223 м²", en: "5,223 m²" }),
    land: demo("asset.dacia-31.land", "PORTFOLIO", P("dacia-31"), "Land plot", { ro: "0,42 ha", ru: "0,42 га", en: "0.42 ha" }, "OWNER — cadastre extract"),
    parking: demo("asset.dacia-31.parking", "PORTFOLIO", P("dacia-31"), "Parking", { ro: "60 locuri", ru: "60 мест", en: "60 spaces" }, "OWNER — site plan"),
    tenants: demo("asset.dacia-31.tenants", "PORTFOLIO", P("dacia-31"), "Tenants", { ro: "1 · un singur utilizator", ru: "1 · единый пользователь", en: "1 · single occupier" }, "OWNER — current lease schedule"),
    occupancy: demo("asset.dacia-31.occupancy", "PORTFOLIO", P("dacia-31"), "Occupancy", { ro: "100% până la 31.12.2026", ru: "100% до 31.12.2026", en: "100% until 31.12.2026" }, "OWNER — current lease schedule"),
    acquired: demo("asset.dacia-31.acquired", "PORTFOLIO", P("dacia-31"), "Acquired", "2007", "OWNER — acquisition date"),
    repositioned: demo("asset.dacia-31.repositioned", "PORTFOLIO", P("dacia-31"), "Repositioned", "2021", "OWNER — last major works"),
    availability: confirmed("asset.dacia-31.availability", "LEASING", P("dacia-31"), "Availability", { ro: "Întreaga clădire din 1 ianuarie 2027", ru: "Всё здание с 1 января 2027", en: "Whole building from 1 January 2027" }),
    levers: [
      lever("single-occupier", "dacia-31", { ro: "Un sediu pentru o singură companie", ru: "Штаб-квартира для одной компании", en: "A headquarters for one company" }, { ro: "Pregătim clădirea pentru următorul utilizator unic din 2027: acces propriu, nume pe fațadă, etaje organizate pe funcții.", ru: "Готовим здание к следующему единому пользователю с 2027 года: собственный вход, название на фасаде, этажи под функции компании.", en: "Preparing the building for its next single occupier from 2027: own entrance, name on the facade, floors arranged by function." }),
      lever("services", "dacia-31", { ro: "Audit tehnic și modernizarea instalațiilor", ru: "Технический аудит и обновление инженерии", en: "Technical audit and services upgrade" }, { ro: "Capacitățile reale și redundanța se confirmă prin audit, apoi se adaptează la cerințele utilizatorului.", ru: "Реальные мощности и резервирование подтверждаются аудитом и адаптируются под требования пользователя.", en: "Actual capacities and redundancy are confirmed by audit and then adapted to the occupier's requirements." }),
      lever("efficiency", "dacia-31", { ro: "Costuri de exploatare mai mici", ru: "Ниже расходы на эксплуатацию", en: "Lower operating costs" }, { ro: "Iluminat, ventilație și dispecerizare — măsuri care reduc consumul fără a schimba clădirea.", ru: "Освещение, вентиляция и диспетчеризация — меры, которые снижают потребление без перестройки здания.", en: "Lighting, ventilation and building controls — measures that cut consumption without rebuilding." }),
    ],
  },
  "moscova-9": {
    category: "retail",
    format: confirmed("asset.moscova-9.format", "PORTFOLIO", P("moscova-9"), "Format", { ro: "Obiect comercial independent", ru: "Отдельно стоящий торговый объект", en: "Stand-alone retail building" }),
    area: confirmed("asset.moscova-9.area", "PORTFOLIO", P("moscova-9"), "Total area", { ro: "1.289,93 m²", ru: "1 289,93 м²", en: "1,289.93 m²" }),
    land: demo("asset.moscova-9.land", "PORTFOLIO", P("moscova-9"), "Land plot", { ro: "0,31 ha", ru: "0,31 га", en: "0.31 ha" }, "OWNER — cadastre extract"),
    parking: demo("asset.moscova-9.parking", "PORTFOLIO", P("moscova-9"), "Parking", { ro: "25 de locuri de-a lungul bulevardului", ru: "25 мест вдоль бульвара", en: "25 spaces along the boulevard" }, "OWNER — site plan (parking along the boulevard is confirmed, the count is not)"),
    tenants: demo("asset.moscova-9.tenants", "PORTFOLIO", P("moscova-9"), "Tenants", { ro: "1 chiriaș", ru: "1 арендатор", en: "1 tenant" }, "OWNER — current lease schedule"),
    occupancy: demo("asset.moscova-9.occupancy", "PORTFOLIO", P("moscova-9"), "Occupancy", "100%", "OWNER — current lease schedule"),
    acquired: demo("asset.moscova-9.acquired", "PORTFOLIO", P("moscova-9"), "Acquired", "2006", "OWNER — acquisition date"),
    repositioned: demo("asset.moscova-9.repositioned", "PORTFOLIO", P("moscova-9"), "Repositioned", "2019", "OWNER — last major works"),
    availability: confirmed("asset.moscova-9.availability", "LEASING", P("moscova-9"), "Availability", { ro: "Integral sau parțial · până la 1.289,93 m²", ru: "Целиком или частью · до 1 289,93 м²", en: "Whole or in part · up to 1,289.93 m²" }),
    levers: [
      lever("frontage", "moscova-9", { ro: "Fațada ca vitrină a brandului", ru: "Фасад как витрина бренда", en: "The facade as a brand window" }, { ro: "Fațada lungă de pe prima linie poate purta identitatea completă a unui brand — firmă, vitrine, iluminat.", ru: "Протяжённый фасад первой линии может нести полную идентичность бренда — вывеска, витрины, подсветка.", en: "The long first-line frontage can carry a brand's full identity — signage, windows, lighting." }),
      lever("split", "moscova-9", { ro: "Integral sau în două blocuri", ru: "Целиком или двумя блоками", en: "Whole or as two units" }, { ro: "Două intrări pentru clienți permit închirierea către un singur brand sau împărțirea în două spații independente.", ru: "Два входа для покупателей позволяют сдать объект одному бренду или разделить его на два независимых помещения.", en: "Two customer entrances allow one brand to take the whole or the space to be split into two independent units." }),
      lever("logistics", "moscova-9", { ro: "Logistică separată de clienți", ru: "Логистика отдельно от покупателей", en: "Logistics apart from customers" }, { ro: "Rampa și spațiile auxiliare păstrează fluxul de marfă în spatele clădirii.", ru: "Рампа и вспомогательные помещения держат товарный поток за зданием.", en: "The ramp and support rooms keep the goods flow behind the building." }),
    ],
  },
  "moscova-20": {
    category: "retail",
    format: confirmed("asset.moscova-20.format", "PORTFOLIO", P("moscova-20"), "Format", { ro: "Spațiu comercial pe prima linie", ru: "Торговое помещение первой линии", en: "First-line retail space" }),
    area: confirmed("asset.moscova-20.area", "PORTFOLIO", P("moscova-20"), "Total area", { ro: "625,7 m²", ru: "625,7 м²", en: "625.7 m²" }),
    land: demo("asset.moscova-20.land", "PORTFOLIO", P("moscova-20"), "Land plot", { ro: "Spațiu în clădire", ru: "Помещение в здании", en: "Premises within a building" }, "OWNER — title / cadastre"),
    parking: demo("asset.moscova-20.parking", "PORTFOLIO", P("moscova-20"), "Parking", { ro: "12 locuri dedicate", ru: "12 выделенных мест", en: "12 dedicated spaces" }, "OWNER — site plan (dedicated parking is confirmed, the count is not)"),
    tenants: demo("asset.moscova-20.tenants", "PORTFOLIO", P("moscova-20"), "Tenants", { ro: "1 chiriaș", ru: "1 арендатор", en: "1 tenant" }, "OWNER — current lease schedule"),
    occupancy: demo("asset.moscova-20.occupancy", "PORTFOLIO", P("moscova-20"), "Occupancy", { ro: "100% până la 16.08.2026", ru: "100% до 16.08.2026", en: "100% until 16.08.2026" }, "OWNER — current lease schedule"),
    acquired: demo("asset.moscova-20.acquired", "PORTFOLIO", P("moscova-20"), "Acquired", "2011", "OWNER — acquisition date"),
    repositioned: demo("asset.moscova-20.repositioned", "PORTFOLIO", P("moscova-20"), "Repositioned", "2023", "OWNER — last major works"),
    availability: confirmed("asset.moscova-20.availability", "LEASING", P("moscova-20"), "Availability", { ro: "625,7 m² din 17 august 2026", ru: "625,7 м² с 17 августа 2026", en: "625.7 m² from 17 August 2026" }),
    levers: [
      lever("corner", "moscova-20", { ro: "Colțul ca punct de reper", ru: "Угол как ориентир района", en: "The corner as a landmark" }, { ro: "Vitrina continuă pe două străzi transformă spațiul într-un reper zilnic al cartierului.", ru: "Сплошная витрина на две улицы делает помещение ежедневным ориентиром района.", en: "A continuous window on two streets makes the space a daily landmark for the neighbourhood." }),
      lever("terrace", "moscova-20", { ro: "Terasa activează strada", ru: "Терраса оживляет улицу", en: "The terrace activates the street" }, { ro: "Pentru cafenea, servicii sau retail alimentar terasa prelungește spațiul în exterior.", ru: "Для кафе, сервисов или продуктового ритейла терраса продолжает помещение на улицу.", en: "For a café, services or food retail the terrace extends the space outdoors." }),
      lever("fitout", "moscova-20", { ro: "Gata pentru amenajarea brandului", ru: "Готово к оформлению под бренд", en: "Ready for brand fit-out" }, { ro: "Trasee existente de ventilație și utilități scurtează amenajarea noului chiriaș.", ru: "Существующие трассы вентиляции и инженерии сокращают срок отделки для нового арендатора.", en: "Existing ventilation and utility routes shorten the new tenant's fit-out." }),
    ],
  },
  "creanga-78": {
    category: "mixed",
    format: demo("asset.creanga-78.format", "PORTFOLIO", P("creanga-78"), "Format", { ro: "Clădire de birouri și comerț", ru: "Офисно-торговое здание", en: "Office and retail building" }, "OWNER — approved property description"),
    area: demo("asset.creanga-78.area", "PORTFOLIO", P("creanga-78"), "Total area", { ro: "3.350 m²", ru: "3 350 м²", en: "3,350 m²" }, "OWNER — confirmed area"),
    land: demo("asset.creanga-78.land", "PORTFOLIO", P("creanga-78"), "Land plot", { ro: "0,28 ha", ru: "0,28 га", en: "0.28 ha" }, "OWNER — cadastre extract"),
    parking: demo("asset.creanga-78.parking", "PORTFOLIO", P("creanga-78"), "Parking", { ro: "40 de locuri", ru: "40 мест", en: "40 spaces" }, "OWNER — site plan"),
    tenants: demo("asset.creanga-78.tenants", "PORTFOLIO", P("creanga-78"), "Tenants", { ro: "18 chiriași", ru: "18 арендаторов", en: "18 tenants" }, "OWNER — current lease schedule"),
    occupancy: demo("asset.creanga-78.occupancy", "PORTFOLIO", P("creanga-78"), "Occupancy", "82%", "OWNER — current lease schedule"),
    acquired: demo("asset.creanga-78.acquired", "PORTFOLIO", P("creanga-78"), "Acquired", "2014", "OWNER — acquisition date"),
    repositioned: demo("asset.creanga-78.repositioned", "PORTFOLIO", P("creanga-78"), "Repositioned", "2022", "OWNER — last major works"),
    availability: demo("asset.creanga-78.availability", "LEASING", P("creanga-78"), "Availability", { ro: "Spații de 80–240 m² la cerere", ru: "Блоки 80–240 м² по запросу", en: "Units of 80–240 m² on request" }, "OWNER — current vacancy schedule"),
    levers: [
      lever("mix", "creanga-78", { ro: "Un mix echilibrat de chiriași", ru: "Сбалансированный состав арендаторов", en: "A balanced tenant mix" }, { ro: "Servicii la parter, birouri mici și medii la etaje — fiecare chiriaș aduce clienți celorlalți.", ru: "Сервисы на первом этаже, малые и средние офисы выше — каждый арендатор приводит клиентов остальным.", en: "Services on the ground floor, small and mid-size offices above — each tenant brings customers to the others." }),
      lever("common", "creanga-78", { ro: "Spații comune reînnoite", ru: "Обновлённые общие зоны", en: "Renewed common areas" }, { ro: "Holul, circulațiile și semnalistica fac clădirea mai ușor de înțeles și de închiriat.", ru: "Холл, коммуникации и навигация делают здание понятнее для посетителей и арендаторов.", en: "Lobby, circulation and wayfinding make the building easier to use and to lease." }),
      lever("terms", "creanga-78", { ro: "Contracte mai lungi", ru: "Более длинные договоры", en: "Longer leases" }, { ro: "Spații adaptate la nevoile chiriașilor existenți îi motivează să rămână și să crească în aceeași clădire.", ru: "Помещения, адаптированные под нужды текущих арендаторов, мотивируют их оставаться и расти в том же здании.", en: "Space adapted to existing tenants encourages them to stay and grow in the same building." }),
    ],
  },
};

/** Creangă 78 has no approved public description: the whole profile below is DEMO. */
export const creangaProfile = {
  district: demo("asset.creanga-78.district", "PORTFOLIO", P("creanga-78"), "District", { ro: "Buiucani", ru: "Буюкань", en: "Buiucani" }, "OWNER — confirmed address"),
  headline: demo("asset.creanga-78.headline", "PORTFOLIO", P("creanga-78"), "Headline", { ro: "O clădire de birouri și servicii într-un cartier vechi al orașului.", ru: "Офисно-сервисное здание в историческом районе города.", en: "An office and services building in an established district of the city." }, "OWNER — approved description"),
  lead: demo("asset.creanga-78.lead", "PORTFOLIO", P("creanga-78"), "Lead", { ro: "Clădire de 3.350 m² cu servicii la parter și birouri la etaje, administrată ca un obiect cu mai mulți chiriași.", ru: "Здание площадью 3 350 м² с сервисами на первом этаже и офисами на этажах выше, управляемое как многоарендный объект.", en: "A 3,350 m² building with services at street level and offices above, managed as a multi-tenant property." }, "OWNER — approved description"),
  narrative: demo("asset.creanga-78.narrative", "PORTFOLIO", P("creanga-78"), "Narrative", { ro: "Multe companii mici, o singură adresă bine administrată.", ru: "Много небольших компаний — один хорошо управляемый адрес.", en: "Many small companies, one well-managed address." }, "OWNER — approved description"),
  story: demo("asset.creanga-78.story", "PORTFOLIO", P("creanga-78"), "Story (3 paragraphs)", {
    ro: "Creangă 78 lucrează altfel decât celelalte obiecte din portofoliu: nu un singur utilizator, ci optsprezece chiriași — birouri mici și medii, servicii, o farmacie și o cafenea la parter. Valoarea clădirii depinde de felul în care acești chiriași funcționează împreună.\n\nAdministrarea este concentrată pe spațiile comune, pe planificarea contractelor și pe reamenajarea rapidă a spațiilor eliberate. Un spațiu liber se pregătește pentru următorul chiriaș în câteva săptămâni, nu în câteva luni.\n\nLocația — un cartier cu clădiri de birouri, instituții și locuințe — asigură cerere constantă pentru spații de 80–240 m². Clădirea rămâne căutată pentru companiile care cresc, dar nu au nevoie de o clădire proprie.",
    ru: "Creangă 78 работает иначе, чем остальные объекты портфеля: не один пользователь, а восемнадцать арендаторов — небольшие и средние офисы, сервисы, аптека и кафе на первом этаже. Стоимость здания зависит от того, как эти арендаторы работают вместе.\n\nУправление сосредоточено на общих зонах, планировании договоров и быстрой подготовке освободившихся помещений. Свободный блок готовится к следующему арендатору за несколько недель, а не месяцев.\n\nРасположение — район с офисами, учреждениями и жильём — обеспечивает устойчивый спрос на помещения 80–240 м². Здание остаётся востребованным у компаний, которые растут, но которым не нужно отдельное здание.",
    en: "Creangă 78 works differently from the rest of the portfolio: not one occupier but eighteen tenants — small and mid-size offices, services, a pharmacy and a café at street level. The building's value depends on how these tenants work together.\n\nManagement concentrates on the common areas, on lease planning and on quickly preparing vacated units. A free unit is ready for the next tenant in weeks, not months.\n\nThe location — a district of offices, institutions and housing — gives steady demand for units of 80–240 m². The building stays in demand with companies that are growing but do not need a building of their own.",
  }, "OWNER — approved description (150–250 words)"),
  location: demo("asset.creanga-78.location", "PORTFOLIO", P("creanga-78"), "Location text", { ro: "Un cartier consolidat din Chișinău, cu birouri, instituții, locuințe și transport public în apropiere.", ru: "Сложившийся район Кишинёва: офисы, учреждения, жильё и общественный транспорт рядом.", en: "An established Chișinău district with offices, institutions, housing and public transport nearby." }, "OWNER — confirmed address and access"),
  use: demo("asset.creanga-78.use", "PORTFOLIO", P("creanga-78"), "Use", { ro: "Birouri · servicii · comerț la parter", ru: "Офисы · сервисы · торговля на первом этаже", en: "Offices · services · ground-floor retail" }, "OWNER — approved description"),
  audience: demo("asset.creanga-78.audience", "PORTFOLIO", P("creanga-78"), "Who it suits", { ro: "Companiilor de servicii, birourilor regionale și echipelor de 5–40 de persoane.", ru: "Сервисным компаниям, региональным офисам и командам от 5 до 40 человек.", en: "Service companies, regional offices and teams of 5–40 people." }, "OWNER — approved description"),
};

/* ------------------------------------------------------------------ */
/* LEASING — tenant fit (space matching, property decision pages)      */
/* ------------------------------------------------------------------ */

export type BusinessType = "retail" | "office" | "showroom" | "services" | "clinic" | "fnb";
export type Requirement = "visibility" | "ground" | "parking" | "entrance" | "power" | "ventilation" | "delivery" | "flexible";
export type FitLevel = "strong" | "possible" | "limited";

export type Capability = { level: FitLevel; note: Localized; status: DataStatus };

export type TenantFit = {
  /** Reason to care — leads the property everywhere (before any number). */
  reason: Localized;
  bestFor: BusinessType[];
  /** Business types that are plausible but not stated in approved copy. */
  bestForStatus: DataStatus;
  why: Localized[];
  capabilities: Record<Requirement, Capability>;
  /** Leasable range in m² used by the matcher (whole building = one value). */
  area: { min: number; max: number; status: DataStatus; note?: Localized };
  /** ISO date the space can be occupied; null = on request / now. */
  from: string | null;
  district: Localized;
};

const fitPoint = (slug: string, field: string, value: Localized | string, status: DataStatus, source: string) => point(status, `fit.${slug}.${field}`, "LEASING", `Portfolio · ${slug} · Opportunities`, field, value, source);

function cap(slug: string, key: Requirement, level: FitLevel, note: Localized, status: DataStatus): Capability {
  fitPoint(slug, `capability.${key}`, { ro: `${level} — ${note.ro}`, ru: `${level} — ${note.ru}`, en: `${level} — ${note.en}` }, status, status === "DEMO" ? "OWNER — technical passport / site survey" : "Confirmed — src/lib/assets.ts");
  return { level, note, status };
}

export const tenantFit: Record<"dacia-31" | "moscova-9" | "moscova-20" | "creanga-78", TenantFit> = {
  "dacia-31": {
    reason: { ro: "Pentru o companie care vrea o clădire proprie — și numele ei pe fațadă.", ru: "Для компании, которой нужно своё здание — и своё имя на фасаде.", en: "For a company that wants a building of its own — with its name on the facade." },
    bestFor: ["office"],
    bestForStatus: "CONFIRMED",
    why: [
      { ro: "Toate departamentele sub un singur acoperiș", ru: "Все подразделения под одной крышей", en: "Every department under one roof" },
      { ro: "Intrare proprie și control unic al accesului", ru: "Собственный вход и единый контроль доступа", en: "Own entrance and single access control" },
      { ro: "Fațadă vizibilă pe arterele Dacia, Traian, Decebal", ru: "Заметный фасад у магистралей Дачия, Траян, Дечебал", en: "A visible facade on the Dacia, Traian and Decebal arteries" },
      { ro: "Suprafețe mari, reorganizabile fără a modifica clădirea", ru: "Крупные площади, которые можно перестраивать без изменения здания", en: "Large floors that can be re-planned without altering the building" },
    ],
    capabilities: {
      visibility: cap("dacia-31", "visibility", "strong", { ro: "Fațadă vizibilă, la intrarea în oraș dinspre aeroport", ru: "Заметный фасад на въезде в город со стороны аэропорта", en: "A visible facade at the city's airport entrance" }, "CONFIRMED"),
      ground: cap("dacia-31", "ground", "strong", { ro: "Clădire întreagă, cu acces de la nivelul solului", ru: "Здание целиком, вход с уровня земли", en: "Whole building with access at street level" }, "CONFIRMED"),
      parking: cap("dacia-31", "parking", "strong", { ro: "Aproximativ 60 de locuri pe teren", ru: "Около 60 мест на участке", en: "About 60 spaces on the plot" }, "DEMO"),
      entrance: cap("dacia-31", "entrance", "strong", { ro: "Intrare proprie, 4+ variante de acces", ru: "Собственный вход, 4+ варианта входов", en: "Own entrance, 4+ entrance options" }, "CONFIRMED"),
      power: cap("dacia-31", "power", "possible", { ro: "Rețele existente; capacitatea se confirmă prin audit", ru: "Сети есть; мощность подтверждается аудитом", en: "Services in place; capacity confirmed by audit" }, "CONFIRMED"),
      ventilation: cap("dacia-31", "ventilation", "possible", { ro: "Tubulatură existentă; adaptare la utilizator", ru: "Воздуховоды есть; адаптация под пользователя", en: "Ductwork in place; adapted to the occupier" }, "CONFIRMED"),
      delivery: cap("dacia-31", "delivery", "possible", { ro: "Acces auto pe teren pentru livrări", ru: "Подъезд по участку для доставки", en: "Vehicle access on the plot for deliveries" }, "DEMO"),
      flexible: cap("dacia-31", "flexible", "strong", { ro: "Etaje mari, organizare pe niveluri sau pe funcții", ru: "Крупные этажи, размещение по уровням или функциям", en: "Large floors, arranged by level or by function" }, "CONFIRMED"),
    },
    area: { min: 5223, max: 5223, status: "CONFIRMED", note: { ro: "Se închiriază ca întreg", ru: "Сдаётся целиком", en: "Leased as a whole" } },
    from: "2027-01-01",
    district: { ro: "Botanica", ru: "Ботаника", en: "Botanica" },
  },
  "moscova-9": {
    reason: { ro: "Pentru un brand care vrea propria clădire pe bulevard, nu un loc într-un centru comercial.", ru: "Для бренда, которому нужен свой дом на бульваре, а не секция в торговом центре.", en: "For a brand that wants its own building on the boulevard, not a unit in a mall." },
    bestFor: ["retail", "showroom"],
    bestForStatus: "CONFIRMED",
    why: [
      { ro: "Fațadă lungă pe prima linie a bulevardului", ru: "Протяжённый фасад на первой линии бульвара", en: "A long first-line boulevard frontage" },
      { ro: "Două intrări pentru clienți", ru: "Два входа для покупателей", en: "Two customer entrances" },
      { ro: "Rampă și zonă de descărcare separate", ru: "Отдельная рампа и зона разгрузки", en: "Separate ramp and unloading zone" },
      { ro: "Integral sau parțial", ru: "Целиком или частью", en: "Whole or in part" },
    ],
    capabilities: {
      visibility: cap("moscova-9", "visibility", "strong", { ro: "Fațadă lungă, vizibilă de pe prima linie", ru: "Протяжённый фасад, виден с первой линии", en: "Long frontage, visible from the first line" }, "CONFIRMED"),
      ground: cap("moscova-9", "ground", "strong", { ro: "Sală de vânzare de 737 m² la nivelul străzii", ru: "Торговый зал 737 м² на уровне улицы", en: "A 737 m² sales floor at street level" }, "CONFIRMED"),
      parking: cap("moscova-9", "parking", "possible", { ro: "Parcare de-a lungul bulevardului", ru: "Парковка вдоль бульвара", en: "Parking along the boulevard" }, "CONFIRMED"),
      entrance: cap("moscova-9", "entrance", "strong", { ro: "Clădire independentă, două intrări proprii", ru: "Отдельное здание, два собственных входа", en: "Stand-alone building, two own entrances" }, "CONFIRMED"),
      power: cap("moscova-9", "power", "possible", { ro: "Capacitatea se confirmă pentru formatul ales", ru: "Мощность подтверждается под выбранный формат", en: "Capacity confirmed for the chosen format" }, "DEMO"),
      ventilation: cap("moscova-9", "ventilation", "possible", { ro: "Ventilație de retail; adaptare la format", ru: "Торговая вентиляция; адаптация под формат", en: "Retail ventilation; adapted to the format" }, "DEMO"),
      delivery: cap("moscova-9", "delivery", "strong", { ro: "Rampă, 69 m² de descărcare, flux separat", ru: "Рампа, 69 м² разгрузки, отдельный поток", en: "Ramp, 69 m² unloading, separate flow" }, "CONFIRMED"),
      flexible: cap("moscova-9", "flexible", "strong", { ro: "Integral sau o parte convenită", ru: "Целиком или согласованной частью", en: "Whole or an agreed part" }, "CONFIRMED"),
    },
    area: { min: 400, max: 1290, status: "DEMO", note: { ro: "Partea minimă se stabilește la cerere", ru: "Минимальная часть определяется по запросу", en: "Minimum part agreed on request" } },
    from: null,
    district: { ro: "Rîșcani", ru: "Рышкань", en: "Rîșcani" },
  },
  "moscova-20": {
    reason: { ro: "Pentru o afacere care trăiește din fluxul zilnic al cartierului — vitrină de colț, prima linie.", ru: "Для бизнеса, который живёт ежедневным потоком района: угловая витрина, первая линия.", en: "For a business that lives on the neighbourhood's daily flow — a corner window on the first line." },
    bestFor: ["retail", "services", "clinic", "fnb", "showroom"],
    bestForStatus: "DEMO",
    why: [
      { ro: "Colț vizibil, vitrină continuă pe două străzi", ru: "Заметный угол, сплошная витрина на две улицы", en: "A visible corner, a continuous window on two streets" },
      { ro: "Circa 5.000 de pietoni pe zi (estimare)", ru: "Около 5 000 пешеходов в день (оценка)", en: "About 5,000 pedestrians a day (estimate)" },
      { ro: "Intrare pentru clienți și acces de serviciu separat", ru: "Вход для покупателей и отдельный служебный доступ", en: "Customer entrance and separate service access" },
      { ro: "Terasă și parcare dedicată", ru: "Терраса и выделенная парковка", en: "A terrace and dedicated parking" },
    ],
    capabilities: {
      visibility: cap("moscova-20", "visibility", "strong", { ro: "Colț, fațadă panoramică, prima linie", ru: "Угол, панорамный фасад, первая линия", en: "Corner, panoramic frontage, first line" }, "CONFIRMED"),
      ground: cap("moscova-20", "ground", "strong", { ro: "Parter 240,96 m² + demisol 293,70 m²", ru: "1-й этаж 240,96 м² + цоколь 293,70 м²", en: "Ground 240.96 m² + lower ground 293.70 m²" }, "CONFIRMED"),
      parking: cap("moscova-20", "parking", "possible", { ro: "Parcare dedicată în apropiere", ru: "Выделенная парковка рядом", en: "Dedicated parking nearby" }, "CONFIRMED"),
      entrance: cap("moscova-20", "entrance", "strong", { ro: "Intrare de la colț + acces de serviciu cu rampă", ru: "Вход с угла + служебный доступ с рампой", en: "Corner entrance + service access with ramp" }, "CONFIRMED"),
      power: cap("moscova-20", "power", "possible", { ro: "Aproximativ 50 kVA, se confirmă tehnic", ru: "Около 50 кВА, подтверждается технически", en: "About 50 kVA, confirmed technically" }, "CONFIRMED"),
      ventilation: cap("moscova-20", "ventilation", "possible", { ro: "Trasee de ventilație existente", ru: "Существующие трассы вентиляции", en: "Existing ventilation routes" }, "CONFIRMED"),
      delivery: cap("moscova-20", "delivery", "strong", { ro: "Acces de serviciu separat, cu rampă", ru: "Отдельный служебный доступ с рампой", en: "Separate service access with ramp" }, "CONFIRMED"),
      flexible: cap("moscova-20", "flexible", "possible", { ro: "Două niveluri; parterul separat — de confirmat", ru: "Два уровня; первый этаж отдельно — уточняется", en: "Two levels; ground floor alone — to be confirmed" }, "DEMO"),
    },
    area: { min: 241, max: 626, status: "DEMO", note: { ro: "Parterul separat (240,96 m²) — de confirmat", ru: "Первый этаж отдельно (240,96 м²) — уточняется", en: "Ground floor alone (240.96 m²) — to be confirmed" } },
    from: "2026-08-17",
    district: { ro: "Rîșcani", ru: "Рышкань", en: "Rîșcani" },
  },
  "creanga-78": {
    reason: { ro: "Pentru o echipă în creștere care are nevoie de un birou bun, nu de o clădire întreagă.", ru: "Для растущей команды, которой нужен хороший офис, а не целое здание.", en: "For a growing team that needs a good office, not a whole building." },
    bestFor: ["office", "services", "clinic"],
    bestForStatus: "DEMO",
    why: [
      { ro: "Spații de 80–240 m², pregătite rapid", ru: "Блоки 80–240 м², готовятся быстро", en: "Units of 80–240 m², prepared quickly" },
      { ro: "Servicii la parter, birouri la etaje", ru: "Сервисы на первом этаже, офисы выше", en: "Services at street level, offices above" },
      { ro: "Parcare pe teren", ru: "Парковка на участке", en: "Parking on the plot" },
      { ro: "Administrare la fața locului", ru: "Управление на месте", en: "On-site management" },
    ],
    capabilities: {
      visibility: cap("creanga-78", "visibility", "possible", { ro: "Fațadă la stradă pentru spațiile de la parter", ru: "Фасад на улицу у помещений первого этажа", en: "Street frontage for ground-floor units" }, "DEMO"),
      ground: cap("creanga-78", "ground", "possible", { ro: "Câteva spații la parter", ru: "Несколько помещений на первом этаже", en: "Several ground-floor units" }, "DEMO"),
      parking: cap("creanga-78", "parking", "strong", { ro: "Aproximativ 40 de locuri pe teren", ru: "Около 40 мест на участке", en: "About 40 spaces on the plot" }, "DEMO"),
      entrance: cap("creanga-78", "entrance", "possible", { ro: "Intrare din stradă la parter; hol comun la etaje", ru: "Вход с улицы на первом этаже; общий холл выше", en: "Street entrance at ground level; shared lobby above" }, "DEMO"),
      power: cap("creanga-78", "power", "possible", { ro: "Capacitate standard de birou; extindere la cerere", ru: "Стандартная офисная мощность; увеличение по запросу", en: "Standard office capacity; upgrade on request" }, "DEMO"),
      ventilation: cap("creanga-78", "ventilation", "possible", { ro: "Ventilare și climatizare pe spații", ru: "Вентиляция и кондиционирование по блокам", en: "Ventilation and cooling per unit" }, "DEMO"),
      delivery: cap("creanga-78", "delivery", "limited", { ro: "Fără rampă; livrări mici din parcare", ru: "Без рампы; небольшие доставки со стоянки", en: "No ramp; small deliveries from the car park" }, "DEMO"),
      flexible: cap("creanga-78", "flexible", "strong", { ro: "Spații de 80–240 m², unire posibilă", ru: "Блоки 80–240 м², возможно объединение", en: "Units of 80–240 m², can be combined" }, "DEMO"),
    },
    area: { min: 80, max: 240, status: "DEMO" },
    from: null,
    district: { ro: "Buiucani", ru: "Буюкань", en: "Buiucani" },
  },
};

/** Commercial process shown on every property page and in the leasing journey. */
export const leasingProcess = {
  reply: demo("leasing.reply", "LEASING", "Portfolio · Opportunities · Contact", "Response to a leasing request", { ro: "Răspuns în 2 zile lucrătoare", ru: "Ответ в течение 2 рабочих дней", en: "Reply within 2 working days" }, "OWNER — service standard"),
  viewing: demo("leasing.viewing", "LEASING", "Portfolio", "Viewing", { ro: "Vizionare în aceeași săptămână", ru: "Просмотр — в ту же неделю", en: "Viewing within the same week" }, "OWNER — service standard"),
};

/* ------------------------------------------------------------------ */
/* DEVELOPMENT                                                          */
/* ------------------------------------------------------------------ */

export const vatraProfile = {
  stage: confirmed("dev.vatra.stage", "DEVELOPMENT", "Development · VATRA", "Stage", { ro: "05 · Realizare", ru: "05 · Реализация", en: "05 · Delivery" }, "Confirmed — src/lib/assets.ts (stage index 4)"),
  site: demo("dev.vatra.site", "DEVELOPMENT", "Development · VATRA", "Site area", { ro: "4,6 ha", ru: "4,6 га", en: "4.6 ha" }, "OWNER — cadastre / project passport"),
  programme: demo("dev.vatra.programme", "DEVELOPMENT", "Development · VATRA", "Programme", { ro: "Cartier de locuințe joase și spații publice", ru: "Малоэтажный квартал и общественные пространства", en: "Low-rise neighbourhood and public spaces" }, "OWNER — approved programme"),
  gba: demo("dev.vatra.gba", "DEVELOPMENT", "Development · VATRA", "Gross building area", { ro: "≈ 9.800 m²", ru: "≈ 9 800 м²", en: "≈ 9,800 m²" }, "OWNER — approved programme"),
  start: demo("dev.vatra.start", "DEVELOPMENT", "Development · VATRA", "Works started", "2024", "OWNER — project timeline"),
  completion: demo("dev.vatra.completion", "DEVELOPMENT", "Development · VATRA", "Target completion", "2027", "OWNER — project timeline"),
};

export const drochiaProfile = {
  site: confirmed("dev.drochia.site", "DEVELOPMENT", "Development · Drochia Gateway", "Site area", { ro: "2,0 ha · 20.000 m²", ru: "2,0 га · 20 000 м²", en: "2.0 ha · 20,000 m²" }),
  fronts: confirmed("dev.drochia.fronts", "DEVELOPMENT", "Development · Drochia Gateway", "Road fronts", "2"),
  potential: demo("dev.drochia.potential", "DEVELOPMENT", "Development · Drochia Gateway", "Potential built area", { ro: "12.000–18.000 m²", ru: "12 000–18 000 м²", en: "12,000–18,000 m²" }, "OWNER — feasibility study (internal site study indicates 7,000–9,000 m² built scenarios; not published)"),
  status: confirmed("dev.drochia.status", "DEVELOPMENT", "Development · Drochia Gateway", "Status", { ro: "Concept · în evaluare", ru: "Концепция · на стадии оценки", en: "Concept · under evaluation" }),
  decision: demo("dev.drochia.decision", "DEVELOPMENT", "Development · Drochia Gateway", "Concept decision", { ro: "Decizie privind conceptul — 2027", ru: "Решение по концепции — 2027", en: "Concept decision — 2027" }, "OWNER — project timeline"),
};

/* ------------------------------------------------------------------ */
/* TEAM — illustrative profiles (About)                                 */
/* ------------------------------------------------------------------ */

export type TeamProfile = { initials: string; name: DataPoint; role: DataPoint; bio: DataPoint };

function person(key: string, name: string, initials: string, role: Localized, bio: Localized): TeamProfile {
  return {
    initials,
    name: demo(`team.${key}.name`, "TEAM", "About · Team", "Name", name, "OWNER — approved public team member"),
    role: demo(`team.${key}.role`, "TEAM", "About · Team", "Role", role, "OWNER — approved title"),
    bio: demo(`team.${key}.bio`, "TEAM", "About · Team", "Short bio", bio, "OWNER — approved biography (no LinkedIn, no portrait until approved)"),
  };
}

/** Fictional. Names are illustrative, bios are generic, no employers, no tenure, no links, no faces. */
export const teamProfiles: TeamProfile[] = [
  person("chair", "Alexandru R.", "AR", { ro: "Președinte", ru: "Председатель", en: "Chairman" }, { ro: "Răspunde de strategia companiei și de deciziile majore de investiții. Conduce relația cu partenerii și finanțatorii.", ru: "Отвечает за стратегию компании и ключевые инвестиционные решения. Ведёт отношения с партнёрами и финансирующими организациями.", en: "Responsible for company strategy and major investment decisions. Leads relationships with partners and funders." }),
  person("investment", "Elena M.", "EM", { ro: "Director investiții", ru: "Директор по инвестициям", en: "Investment Director" }, { ro: "Coordonează identificarea și evaluarea oportunităților, de la prima analiză până la decizia de investiție.", ru: "Руководит поиском и оценкой возможностей — от первого анализа до инвестиционного решения.", en: "Leads the search for and assessment of opportunities, from first analysis to investment decision." }),
  person("finance", "Mihai C.", "MC", { ro: "Director financiar", ru: "Финансовый директор", en: "Chief Financial Officer" }, { ro: "Răspunde de finanțarea proiectelor, de bugete și de controlul financiar al portofoliului.", ru: "Отвечает за финансирование проектов, бюджеты и финансовый контроль портфеля.", en: "Responsible for project financing, budgets and financial control of the portfolio." }),
  person("development", "Andrei P.", "AP", { ro: "Director dezvoltare", ru: "Директор по девелопменту", en: "Development Director" }, { ro: "Conduce proiectele de la concept și proiectare până la construcție și punere în funcțiune.", ru: "Ведёт проекты от концепции и проектирования до строительства и ввода в эксплуатацию.", en: "Takes projects from concept and design to construction and commissioning." }),
  person("asset", "Irina V.", "IV", { ro: "Director administrare active", ru: "Директор по управлению активами", en: "Asset Management Director" }, { ro: "Răspunde de închirierea, exploatarea și îmbunătățirea obiectelor în funcțiune.", ru: "Отвечает за аренду, эксплуатацию и улучшение действующих объектов.", en: "Responsible for leasing, operating and improving the operating properties." }),
];

/* ------------------------------------------------------------------ */
/* INVESTMENT — mandate and screening                                   */
/* ------------------------------------------------------------------ */

export const mandate = {
  ticket: demo("invest.ticket", "INVESTMENT", "Opportunities · Approach", "Ticket size", { ro: "1–10 mil. €", ru: "1–10 млн €", en: "€1M–€10M" }, "OWNER — approved investment mandate"),
  geography: confirmed("invest.geography", "INVESTMENT", "Opportunities", "Geography", { ro: "Internațional · portofoliul actual în Moldova", ru: "По всему миру · текущий портфель в Молдове", en: "Worldwide · current portfolio in Moldova" }, "Confirmed — src/lib/strategy.ts investmentMandate"),
  types: confirmed("invest.types", "INVESTMENT", "Opportunities", "Asset types", { ro: "Imobiliare generatoare de venit · terenuri · repoziționare · proiecte de dezvoltare", ru: "Доходная недвижимость · участки · репозиционирование · проекты развития", en: "Income-producing property · land · repositioning · development projects" }, "Confirmed — src/lib/strategy.ts investmentMandate"),
  structures: demo("invest.structures", "INVESTMENT", "Opportunities", "Deal structures", { ro: "Achiziție · joint venture · co-dezvoltare", ru: "Покупка · совместное предприятие · со-девелопмент", en: "Acquisition · joint venture · co-development" }, "OWNER — approved investment mandate"),
  reply: demo("invest.reply", "INVESTMENT", "Opportunities", "First assessment", { ro: "Primul răspuns în 10 zile lucrătoare", ru: "Первичный ответ — 10 рабочих дней", en: "First response within 10 working days" }, "OWNER — service standard"),
};

export const screening = {
  holding: demo("invest.screen.holding", "INVESTMENT", "Approach", "Holding horizon", { ro: "7–10 ani", ru: "7–10 лет", en: "7–10 years" }, "OWNER — investment policy"),
  payback: demo("invest.screen.payback", "INVESTMENT", "Approach", "Target payback", { ro: "7–10 ani", ru: "7–10 лет", en: "7–10 years" }, "OWNER — investment policy"),
  occupancy: demo("invest.screen.occupancy", "INVESTMENT", "Approach", "Target occupancy", "90%+", "OWNER — investment policy"),
  review: demo("invest.screen.review", "INVESTMENT", "Approach", "Preliminary review time", { ro: "2 săptămâni", ru: "2 недели", en: "2 weeks" }, "OWNER — investment policy"),
};

/** Governance and reporting discipline (investor / bank journey). All DEMO until the OWNER describes the real practice. */
export const governance = [
  { title: demo("gov.committee", "INVESTMENT", "Approach · Investors", "Decision body", { ro: "Comitet de investiții", ru: "Инвестиционный комитет", en: "Investment committee" }, "OWNER — real governance"), text: { ro: "Fiecare achiziție și fiecare proiect trec printr-un memorandum scris și o decizie colegială.", ru: "Каждая покупка и каждый проект проходят через письменный меморандум и коллегиальное решение.", en: "Every acquisition and project goes through a written memorandum and a collective decision." } },
  { title: demo("gov.reporting", "INVESTMENT", "Approach · Investors", "Reporting", { ro: "Raportare trimestrială", ru: "Ежеквартальная отчётность", en: "Quarterly reporting" }, "OWNER — real reporting practice"), text: { ro: "Partenerii primesc date despre ocupare, costuri, lucrări și riscuri pentru fiecare obiect.", ru: "Партнёры получают данные о заполняемости, расходах, работах и рисках по каждому объекту.", en: "Partners receive occupancy, cost, works and risk data for each property." } },
  { title: demo("gov.valuation", "INVESTMENT", "Approach · Investors", "Valuation", { ro: "Evaluare independentă anuală", ru: "Ежегодная независимая оценка", en: "Annual independent valuation" }, "OWNER — real valuation practice"), text: { ro: "Valoarea activelor este verificată de evaluatori externi.", ru: "Стоимость активов проверяют внешние оценщики.", en: "Asset values are checked by external valuers." } },
  { title: demo("gov.audit", "INVESTMENT", "Approach · Investors", "Technical control", { ro: "Audit tehnic înainte de decizie", ru: "Технический аудит до решения", en: "Technical audit before decisions" }, "OWNER — real practice"), text: { ro: "Starea clădirii și a instalațiilor se verifică înainte de a investi sau de a promite unui chiriaș.", ru: "Состояние здания и инженерии проверяется до инвестиции и до обещаний арендатору.", en: "Building and services condition is checked before investing or committing to a tenant." } },
];

/* ------------------------------------------------------------------ */
/* CASE STUDY — illustrative format (Approach)                          */
/* ------------------------------------------------------------------ */

/**
 * Deliberately not tied to a named property: Dacia 31 (the brief's example) is
 * a confirmed single-occupier building, so a multi-tenant turnaround story there
 * would contradict approved facts.
 */
export const caseStudy = {
  subject: demo("case.subject", "CASE STUDIES", "Approach", "Subject", { ro: "Clădire de birouri și servicii cu mai mulți chiriași · Chișinău", ru: "Многоарендное офисно-сервисное здание · Кишинёв", en: "Multi-tenant office and services building · Chișinău" }, "OWNER — real case study with approved figures"),
  period: demo("case.period", "CASE STUDIES", "Approach", "Period", "2021 — 2024", "OWNER — real case study"),
  metrics: [
    { label: { ro: "Grad de ocupare", ru: "Заполняемость", en: "Occupancy" }, before: "78%", after: "94%", point: demo("case.metric.occupancy", "CASE STUDIES", "Approach", "Occupancy before → after", "78% → 94%", "OWNER — real case study") },
    { label: { ro: "Venit operațional", ru: "Операционный доход", en: "Operating income" }, before: "100", after: "122", point: demo("case.metric.income", "CASE STUDIES", "Approach", "Operating income index", "+22%", "OWNER — real case study (approval required to publish any income figure)") },
    { label: { ro: "Durata medie a contractelor", ru: "Средний срок договоров", en: "Average lease term" }, before: "2,1", after: "4,3", point: demo("case.metric.term", "CASE STUDIES", "Approach", "Average lease term, years", "2.1 → 4.3", "OWNER — real case study") },
    { label: { ro: "Chiriași", ru: "Арендаторы", en: "Tenants" }, before: "11", after: "18", point: demo("case.metric.tenants", "CASE STUDIES", "Approach", "Tenants", "11 → 18", "OWNER — real case study") },
  ],
  steps: demo("case.steps", "CASE STUDIES", "Approach", "Steps", {
    ro: "Diagnostic|Am analizat fiecare spațiu, contract și cost de exploatare.\nRepoziționare|Hol, circulații și semnalistică noi; servicii la parter.\nReînchiriere|Spații reîmpărțite în blocuri de 80–240 m² pentru companii în creștere.\nExploatare|Planificarea contractelor și pregătirea spațiilor libere în câteva săptămâni.",
    ru: "Диагностика|Разобрали каждое помещение, договор и статью эксплуатационных расходов.\nРепозиционирование|Новый холл, коммуникации и навигация; сервисы на первом этаже.\nПовторная сдача|Помещения перенарезаны на блоки 80–240 м² для растущих компаний.\nЭксплуатация|Планирование договоров и подготовка свободных блоков за несколько недель.",
    en: "Diagnosis|We reviewed every unit, lease and operating cost line.\nRepositioning|New lobby, circulation and wayfinding; services at street level.\nRe-leasing|Space re-planned into units of 80–240 m² for growing companies.\nOperation|Lease planning and vacated units prepared in weeks.",
  }, "OWNER — real case study"),
};

/* ------------------------------------------------------------------ */
/* CAREERS — role stories                                               */
/* ------------------------------------------------------------------ */

export const cultureStatement = demo("careers.culture", "CAREERS", "Careers", "Culture statement", { ro: "O echipă mică. Responsabilitate mare. Obiecte reale.", ru: "Небольшая команда. Высокая ответственность. Реальные объекты.", en: "A small team. High responsibility. Real properties." }, "OWNER / HR — approved employer statement");

export type RoleStory = { key: string; title: DataPoint; where: Localized; text: Localized; owns: Localized };

function role(key: string, title: Localized, where: Localized, text: Localized, owns: Localized): RoleStory {
  return { key, title: demo(`careers.role.${key}`, "CAREERS", "Careers", "Role story", title, "OWNER / HR — real role descriptions (no names, no tenure)"), where, text, owns };
}

/** Role stories describe the work, never a person: no names, no tenure, no quotes. */
export const roleStories: RoleStory[] = [
  role("site-engineer", { ro: "Inginer pe șantier", ru: "Инженер на объекте", en: "Site engineer" }, { ro: "Teren", ru: "Объект", en: "Field" }, { ro: "Ziua începe pe șantier: verificarea lucrărilor, a calității și a graficului, apoi decizii împreună cu proiectanții și antreprenorii.", ru: "День начинается на площадке: проверка работ, качества и графика, затем решения вместе с проектировщиками и подрядчиками.", en: "The day starts on site: checking works, quality and schedule, then decisions with designers and contractors." }, { ro: "Calitatea execuției · siguranța · termenele", ru: "Качество исполнения · безопасность · сроки", en: "Build quality · safety · schedule" }),
  role("asset-manager", { ro: "Manager de active", ru: "Управляющий активом", en: "Asset manager" }, { ro: "Birou + teren", ru: "Офис + объект", en: "Office + field" }, { ro: "Răspunde de un grup de obiecte ca de o afacere: chiriași, costuri, investiții în îmbunătățire și planul pe următorii ani.", ru: "Отвечает за группу объектов как за бизнес: арендаторы, расходы, вложения в улучшение и план на следующие годы.", en: "Runs a group of properties as a business: tenants, costs, improvement spending and the plan for the years ahead." }, { ro: "Gradul de ocupare · costurile · planul obiectului", ru: "Заполняемость · расходы · план объекта", en: "Occupancy · costs · the property plan" }),
  role("project-manager", { ro: "Manager de proiect", ru: "Менеджер проекта", en: "Project manager" }, { ro: "Birou + teren", ru: "Офис + объект", en: "Office + field" }, { ro: "Conduce un proiect de la concept la predare: buget, autorizații, echipe și comunicarea cu toți participanții.", ru: "Ведёт проект от концепции до сдачи: бюджет, разрешения, команды и связь между всеми участниками.", en: "Leads a project from concept to handover: budget, permits, teams and communication between everyone involved." }, { ro: "Bugetul · graficul · coordonarea", ru: "Бюджет · график · координация", en: "Budget · schedule · coordination" }),
  role("analyst", { ro: "Analist de investiții", ru: "Инвестиционный аналитик", en: "Investment analyst" }, { ro: "Birou", ru: "Офис", en: "Office" }, { ro: "Transformă o propunere într-o decizie: piața, locația, economia proiectului și riscurile, într-un memorandum clar.", ru: "Превращает предложение в решение: рынок, локация, экономика проекта и риски — в понятном меморандуме.", en: "Turns a proposal into a decision: market, location, project economics and risks, in a clear memorandum." }, { ro: "Calculele · verificarea · recomandarea", ru: "Расчёты · проверка · рекомендация", en: "Numbers · checks · recommendation" }),
];

/* ------------------------------------------------------------------ */
/* IMAGES — concept visuals and every placement                         */
/* ------------------------------------------------------------------ */

export type ConceptVisual = {
  key: string;
  status: "DEMO";
  type: "CONCEPT_VISUAL";
  futureReplacement: "REAL_MEGAPARC_PHOTO";
  /** Portrait-only visuals have no separate -mobile crop. */
  mobile: boolean;
};

const visualKeys = ["cv-hero-1", "cv-hero-2", "cv-hero-3", "cv-invest", "cv-develop", "cv-manage", "cv-sky", "cv-rebar", "cv-excavator", "cv-window", "cv-hall", "cv-walker", "cv-perforated", "cv-meeting-room", "cv-loft", "cv-cafe", "cv-field", "cv-road", "cv-office-light"] as const;
export type VisualKey = (typeof visualKeys)[number];
const portraitOnly: VisualKey[] = ["cv-perforated", "cv-cafe"];

export const conceptVisuals: Record<VisualKey, ConceptVisual> = Object.fromEntries(
  visualKeys.map((key) => [key, { key, status: "DEMO", type: "CONCEPT_VISUAL", futureReplacement: "REAL_MEGAPARC_PHOTO", mobile: !portraitOnly.includes(key) }]),
) as Record<VisualKey, ConceptVisual>;

/** BRAND = atmosphere, shown normally. PROPERTY_DIRECTION = stands in for a named property's photograph, always labelled. */
export type ImageScope = "BRAND" | "PROPERTY_DIRECTION";

export type ImageUse = {
  id: string;
  page: string;
  section: string;
  asset: string | null;
  visual: VisualKey;
  scope: ImageScope;
  purpose: string;
  priority: "HIGH" | "MEDIUM" | "LOW";
  recommendedShot: string;
  alt: Localized;
  position?: string;
};

const uses: ImageUse[] = [];
function place(id: string, page: string, section: string, asset: string | null, visual: VisualKey, scope: ImageScope, purpose: string, priority: ImageUse["priority"], recommendedShot: string, alt: Localized, position?: string) {
  uses.push({ id, page, section, asset, visual, scope, purpose, priority, recommendedShot, alt, position });
}

const A = {
  balconies: { ro: "Arhitectură albă pe cer senin", ru: "Белая архитектура на фоне ясного неба", en: "White architecture against a clear sky" },
  engineer: { ro: "Inginer care verifică lucrările pe un șantier", ru: "Инженер проверяет работы на строительной площадке", en: "An engineer checking works on a building site" },
  canopy: { ro: "Copertină albă de beton în lumina zilei", ru: "Белый бетонный навес при дневном свете", en: "A white concrete canopy in daylight" },
  invest: { ro: "Doi profesioniști lucrează asupra unei propuneri", ru: "Двое специалистов работают над предложением", en: "Two professionals working through a proposal" },
  develop: { ro: "Șantier de construcții văzut de sus", ru: "Строительная площадка сверху", en: "A construction site seen from above" },
  street: { ro: "Activitate la nivelul străzii, în fața unei cafenele", ru: "Жизнь улицы у входа в кафе", en: "Street-level activity at a café entrance" },
  sky: { ro: "Fațadă de sticlă care reflectă cerul", ru: "Стеклянный фасад отражает небо", en: "A glass facade reflecting the sky" },
  rebar: { ro: "Echipă de construcții la lucru pe armătură", ru: "Строительная бригада работает с арматурой", en: "A construction crew working on reinforcement" },
  excavator: { ro: "Lucrări de terasament pe un amplasament", ru: "Земляные работы на площадке", en: "Earthworks on a site" },
  window: { ro: "Profesionist care citește lângă o fereastră luminoasă", ru: "Специалист читает у светлого окна", en: "A professional reading by a bright window" },
  hall: { ro: "Oameni care traversează un hol alb și luminos", ru: "Люди идут через светлый белый холл", en: "People walking through a bright white hall" },
  walker: { ro: "Trecător de-a lungul unui gard de șantier alb", ru: "Прохожий вдоль белого строительного ограждения", en: "A passer-by along a white site hoarding" },
  perforated: { ro: "Fațadă albă perforată și intrare", ru: "Белый перфорированный фасад и вход", en: "A perforated white facade and entrance" },
  meeting: { ro: "Sală de ședințe minimalistă în lumina zilei", ru: "Минималистичная переговорная при дневном свете", en: "A minimalist meeting room in daylight" },
  loft: { ro: "Spațiu de lucru deschis și luminos", ru: "Светлое открытое рабочее пространство", en: "A bright open-plan floor" },
  cafe: { ro: "Oameni într-o cafenea luminoasă", ru: "Люди в светлом кафе", en: "People in a bright café" },
  field: { ro: "Teren agricol deschis până la orizont", ru: "Открытое поле до горизонта", en: "Open farmland to the horizon" },
  road: { ro: "Drum regional printre câmpuri", ru: "Региональная дорога среди полей", en: "A regional road through open land" },
  officeLight: { ro: "Sală de ședințe cu ferestre înalte", ru: "Переговорная с высокими окнами", en: "A meeting room with tall windows" },
} satisfies Record<string, Localized>;

// Home
place("home.hero.1", "Home", "Hero sequence · frame 1", null, "cv-hero-1", "BRAND", "Opening frame — daylight architecture", "HIGH", "MEGAPARC hero: a portfolio building in morning light, 16:9 + 9:16", A.balconies);
place("home.hero.2", "Home", "Hero sequence · frame 2", null, "cv-hero-2", "BRAND", "People at work — development", "HIGH", "VATRA site: MEGAPARC engineer on site, natural, 16:9 + 9:16", A.engineer);
place("home.hero.3", "Home", "Hero sequence · frame 3", null, "cv-hero-3", "BRAND", "Architectural detail — quality", "MEDIUM", "Architectural detail of a MEGAPARC building, bright overcast", A.canopy);
place("home.do.invest", "Home", "What we do · Invest", null, "cv-invest", "BRAND", "Investment work", "MEDIUM", "MEGAPARC team reviewing a proposal over plans (no faces required)", A.invest);
place("home.do.develop", "Home", "What we do · Develop", null, "cv-rebar", "BRAND", "Development work", "MEDIUM", "VATRA construction team at work", A.rebar);
place("home.do.manage", "Home", "What we do · Manage", null, "cv-cafe", "BRAND", "Tenant life — asset management", "MEDIUM", "Tenant activity in a MEGAPARC property", A.cafe);
place("home.mandate", "Home", "Where we invest band", null, "cv-sky", "BRAND", "Global mandate atmosphere", "LOW", "Brand architecture, daylight, 21:9", A.sky);
place("home.portfolio.creanga-78", "Home", "Selected portfolio · card", "Creangă 78", "cv-perforated", "PROPERTY_DIRECTION", "Stands in for the Creangă 78 photograph", "HIGH", "Creangă 78 FACADE 3/4, morning light (shot list)", A.perforated);
place("router.owner", "Home · Opportunities", "Audience router · property or land", null, "cv-road", "BRAND", "Owner journey entrance", "LOW", "Brand landscape / site visit", A.road);
place("router.partner", "Home · Opportunities", "Audience router · partnership", null, "cv-invest", "BRAND", "Partner journey entrance", "LOW", "MEGAPARC meeting (no identifiable third parties)", A.invest);
place("router.career", "Home · Opportunities", "Audience router · careers", null, "cv-hall", "BRAND", "Career journey entrance", "MEDIUM", "MEGAPARC team in a MEGAPARC building", A.hall);
// Portfolio
place("portfolio.creanga-78", "Portfolio", "Asset story · Creangă 78", "Creangă 78", "cv-perforated", "PROPERTY_DIRECTION", "Stands in for the Creangă 78 photograph", "HIGH", "Creangă 78 HERO / FACADE 3/4", A.perforated);
place("opportunities.matcher.creanga-78", "Opportunities", "Space matcher · result", "Creangă 78", "cv-perforated", "PROPERTY_DIRECTION", "Stands in for the Creangă 78 photograph", "HIGH", "Creangă 78 FACADE 3/4", A.perforated);
// Property pages
place("asset.dacia-31.gallery.1", "Portfolio · Dacia 31", "Gallery", "Dacia 31", "cv-office-light", "PROPERTY_DIRECTION", "Interior direction", "HIGH", "Dacia 31 INTERIOR / COMMON AREA", A.officeLight);
place("asset.dacia-31.gallery.2", "Portfolio · Dacia 31", "Gallery", "Dacia 31", "cv-meeting-room", "PROPERTY_DIRECTION", "Interior direction", "MEDIUM", "Dacia 31 INTERIOR — typical floor", A.meeting);
place("asset.moscova-9.gallery.1", "Portfolio · Moscova 9", "Gallery", "Moscova 9", "cv-loft", "PROPERTY_DIRECTION", "Sales-floor direction", "HIGH", "Moscova 9 INTERIOR — sales floor", A.loft);
place("asset.moscova-9.gallery.2", "Portfolio · Moscova 9", "Gallery", "Moscova 9", "cv-walker", "PROPERTY_DIRECTION", "Human scale along the frontage", "MEDIUM", "Moscova 9 HUMAN SCALE — pedestrians along the facade", A.walker);
place("asset.moscova-20.gallery.1", "Portfolio · Moscova 20", "Gallery", "Moscova 20", "cv-cafe", "PROPERTY_DIRECTION", "Tenant activity direction", "HIGH", "Moscova 20 TENANT / ACTIVITY", A.cafe);
place("asset.moscova-20.gallery.2", "Portfolio · Moscova 20", "Gallery", "Moscova 20", "cv-manage", "PROPERTY_DIRECTION", "Street corner activity direction", "MEDIUM", "Moscova 20 ENTRANCE / corner at street level", A.street);
place("asset.creanga-78.hero", "Portfolio · Creangă 78", "Hero", "Creangă 78", "cv-perforated", "PROPERTY_DIRECTION", "Stands in for the property hero", "HIGH", "Creangă 78 HERO + VERTICAL MOBILE HERO", A.perforated, "50% 40%");
place("asset.creanga-78.gallery.1", "Portfolio · Creangă 78", "Gallery", "Creangă 78", "cv-meeting-room", "PROPERTY_DIRECTION", "Office floor direction", "HIGH", "Creangă 78 INTERIOR / COMMON AREA", A.meeting);
place("asset.creanga-78.gallery.2", "Portfolio · Creangă 78", "Gallery", "Creangă 78", "cv-window", "PROPERTY_DIRECTION", "Tenant activity direction", "MEDIUM", "Creangă 78 TENANT / ACTIVITY — office floor", A.window);
// Development
place("development.hero", "Development", "Hero", null, "cv-develop", "BRAND", "Development atmosphere", "MEDIUM", "VATRA DRONE / CONTEXT in daylight", A.develop);
place("development.stage.1", "Development", "Six stages · Analysis", null, "cv-window", "BRAND", "Stage illustration", "LOW", "MEGAPARC team on a site visit", A.window);
place("development.stage.2", "Development", "Six stages · Concept", null, "cv-invest", "BRAND", "Stage illustration", "LOW", "Meeting over plans", A.invest);
place("development.stage.3", "Development", "Six stages · Economic assessment", null, "cv-meeting-room", "BRAND", "Stage illustration", "LOW", "Office working session", A.meeting);
place("development.stage.4", "Development", "Six stages · Design", null, "cv-perforated", "BRAND", "Stage illustration", "LOW", "Architectural detail", A.perforated);
place("development.stage.5", "Development", "Six stages · Delivery", null, "cv-excavator", "BRAND", "Stage illustration", "MEDIUM", "VATRA construction in progress", A.excavator);
place("development.stage.6", "Development", "Six stages · Operation", null, "cv-manage", "BRAND", "Stage illustration", "LOW", "Tenant activity in an operating MEGAPARC property", A.street);
place("development.drochia", "Development", "Drochia Gateway", "Drochia Gateway", "cv-field", "PROPERTY_DIRECTION", "Site context direction — not the site", "HIGH", "Drochia Gateway DRONE / CONTEXT — the real site, both road fronts", A.field);
place("project.vatra.team", "Development · VATRA", "Construction team", "VATRA", "cv-rebar", "PROPERTY_DIRECTION", "Construction team direction", "MEDIUM", "VATRA CONSTRUCTION TEAM — human scale, morning", A.rebar);
place("project.drochia.hero", "Development · Drochia Gateway", "Hero", "Drochia Gateway", "cv-field", "PROPERTY_DIRECTION", "Site context direction — not the site", "HIGH", "Drochia Gateway HERO — the real site from the entrance road", A.field, "50% 62%");
place("project.drochia.road", "Development · Drochia Gateway", "Access", "Drochia Gateway", "cv-road", "PROPERTY_DIRECTION", "Gateway road direction", "HIGH", "Drochia Gateway URBAN CONTEXT — approach road and visibility", A.road);
// Approach
place("approach.hero", "Approach", "Hero", null, "cv-manage", "BRAND", "Real estate as a working business", "MEDIUM", "Daily life in a MEGAPARC property", A.street);
place("approach.lens.business", "Approach", "Three lenses · Business", null, "cv-cafe", "BRAND", "Lens illustration", "LOW", "Tenant activity", A.cafe);
place("approach.lens.capital", "Approach", "Three lenses · Capital", null, "cv-sky", "BRAND", "Lens illustration", "LOW", "Brand architecture", A.sky);
place("approach.case", "Approach", "Case study", null, "cv-hero-3", "BRAND", "Illustrative case image — no property named", "MEDIUM", "Real before/after pair of the case property", A.canopy);
// Opportunities
place("opportunities.submit", "Opportunities", "Entrance · Submit an opportunity", null, "cv-road", "BRAND", "Opportunity anywhere", "LOW", "Brand landscape / site visit", A.road);
place("opportunities.partner", "Opportunities", "Entrance · Partnership", null, "cv-invest", "BRAND", "Partnership", "LOW", "MEGAPARC meeting with partners (no identifiable third parties)", A.invest);
// Careers
place("careers.hero", "Careers", "Hero", null, "cv-hall", "BRAND", "People and architecture", "HIGH", "MEGAPARC team moving through a MEGAPARC building", A.hall);
place("careers.team", "Careers", "Pillar · Team", null, "cv-invest", "BRAND", "Team", "MEDIUM", "MEGAPARC team at work", A.invest);
place("careers.responsibility", "Careers", "Pillar · Project responsibility", null, "cv-hero-2", "BRAND", "Responsibility on site", "MEDIUM", "MEGAPARC engineer on site", A.engineer);
place("careers.growth", "Careers", "Pillar · Career development", null, "cv-window", "BRAND", "Learning", "LOW", "MEGAPARC office", A.window);
place("careers.field", "Careers", "Pillar · Field + office", null, "cv-walker", "BRAND", "Field and office", "LOW", "MEGAPARC team between site and office", A.walker);

export const imageUses: readonly ImageUse[] = uses;

export function imageUse(id: string): ImageUse {
  const found = uses.find((item) => item.id === id);
  if (!found) throw new Error(`demo-content: unknown image use "${id}"`);
  return found;
}

/* ------------------------------------------------------------------ */
/* Register                                                             */
/* ------------------------------------------------------------------ */

export const dataRegister: readonly DataPoint[] = points;

/** True while the build carries any DEMO value or concept visual: the preview marker shows and robots stay noindex. */
export const demoContentPresent = points.some((entry) => entry.status === "DEMO") || uses.length > 0;

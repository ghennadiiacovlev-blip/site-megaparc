import type { Localized } from "@/lib/site-data";

/**
 * LEASING INVENTORY — available space records (OWNER correction 2026-10-08,
 * "LEASING MUST BECOME A MAJOR PRODUCT" · "AVAILABLE NOW").
 *
 * One record = one space a tenant can lease. The shape IS the content model of
 * the future WordPress content type "Available space" (docs/CMS_ARCHITECTURE.md):
 * every field below maps to one field an employee edits in WordPress.
 *
 * AVAILABILITY RULE (src/content/source.ts): records with status "leased" are
 * never published — no card, no unit page, no count. Changing a status in the
 * CMS from AVAILABLE to LEASED therefore removes the space from the site on the
 * next publish, without anyone touching code. "reserved" stays visible, labelled.
 *
 * DATA GOVERNANCE: the prototype has no approved space schedule from the
 * leasing team. Records are built on confirmed property facts where they exist
 * (areas, floors, dates, access — src/lib/assets.ts) and DEMO values elsewhere.
 * `dataStatus` + `confirmed` say which fields are real; every unconfirmed field
 * carries the DEMO ring on the page. Creangă 78 is DEMO throughout.
 * No rent, price or payment term is stored here — ever.
 *
 * No runtime imports: scripts/demo-register.mjs loads this file with Node's
 * type stripping to write docs/DEMO_DATA_REGISTER.md.
 */

export type SpaceStatus = "available" | "reserved" | "leased";
export type SpaceUse = "retail" | "office" | "showroom" | "services" | "clinic" | "fnb";
export type SpaceNeed = "visibility" | "flow" | "parking" | "ground" | "entrance" | "power" | "ventilation" | "delivery" | "flexible" | "fast";
export type NeedFit = "strong" | "possible" | "limited";
export type FloorKey = "lower" | "ground" | "upper" | "multi" | "whole";
export type SpaceDataStatus = "CONFIRMED" | "PROVISIONAL" | "DEMO";
export type SpaceField = "area" | "floor" | "availableFrom" | "uses" | "parking" | "entrance" | "visibility" | "power" | "ventilation" | "height" | "condition" | "plan" | "highlights";
export type SpaceProject = "dacia-31" | "moscova-9" | "moscova-20" | "creanga-78";

/** Schematic plan — never a measured drawing (the page says so). */
export type PlanUnit = { id: string; x: number; y: number; w: number; h: number; self?: boolean; core?: boolean };
export type PlanSpec =
  | { kind: "stack"; levels: { label: Localized; m2: number; included: boolean }[]; note?: Localized }
  | { kind: "zones"; zones: { label: Localized; m2: number; x: number; y: number; w: number; h: number; tone: "main" | "service" | "support" }[]; street: Localized; entrances: { x: number; y: number }[] }
  | { kind: "floor"; level: Localized; units: PlanUnit[]; street?: Localized; entrances: { x: number; y: number }[] };

/** Photo reference: a real MEGAPARC photograph (portfolio slug) or a registered concept placement (src/data/demo-content.ts). */
export type SpacePhoto = { kind: "asset"; slug: string } | { kind: "use"; id: string };

export type AvailableSpace = {
  /** Slug of the unit page /leasing/<id>. */
  id: string;
  /** Short reference the leasing team uses on the phone. */
  code: string;
  project: SpaceProject;
  unit: Localized;
  floor: FloorKey;
  floorLabel: Localized;
  /** m² offered; areaMin when a smaller part can be agreed. */
  area: number;
  areaMin?: number;
  uses: SpaceUse[];
  status: SpaceStatus;
  /** ISO date the space can be occupied; null = now. */
  availableFrom: string | null;
  /** The reason to care, in one line. */
  headline: Localized;
  /** Key features (three or four). */
  highlights: Localized[];
  parking: Localized;
  entrance: Localized;
  visibility: Localized;
  technical: { power: Localized; ventilation: Localized; height: Localized; condition: Localized };
  /** How the space answers each tenant need (drives the tenant advisor). */
  fit: Record<SpaceNeed, NeedFit>;
  plan: PlanSpec;
  photos: SpacePhoto[];
  dataStatus: SpaceDataStatus;
  confirmed: SpaceField[];
  /** Last edit (CMS "modified"). */
  updated: string;
  /** Where the real value comes from. */
  futureSource: string;
};

const L = (ro: string, ru: string, en: string): Localized => ({ ro, ru, en });

/* Creangă 78 — one DEMO floor plate reused for its units (schematic). */
const creangaPlate = (self: string, level: Localized, ids: [string, string, string, string]): PlanSpec => ({
  kind: "floor",
  level,
  street: L("Stradă", "Улица", "Street"),
  entrances: [{ x: 50, y: 60 }],
  units: [
    { id: ids[0], x: 0, y: 0, w: 38, h: 34, self: self === ids[0] },
    { id: ids[1], x: 38, y: 0, w: 30, h: 34, self: self === ids[1] },
    { id: ids[2], x: 68, y: 0, w: 32, h: 60, self: self === ids[2] },
    { id: ids[3], x: 0, y: 34, w: 40, h: 26, self: self === ids[3] },
    { id: "core", x: 40, y: 34, w: 28, h: 26, core: true },
  ],
});

export const spaces: AvailableSpace[] = [
  {
    id: "moscova-20-corner",
    code: "M20-01",
    project: "moscova-20",
    unit: L("Spațiu de colț · parter + demisol", "Угловое помещение · 1‑й этаж + цоколь", "Corner space · ground + lower ground"),
    floor: "multi",
    floorLabel: L("Parter + demisol", "1‑й этаж + цоколь", "Ground + lower ground"),
    area: 625.7,
    uses: ["retail", "fnb", "services", "clinic", "showroom"],
    status: "available",
    availableFrom: "2026-08-17",
    headline: L(
      "Vitrină de colț pe prima linie, cu terasă și acces de serviciu separat.",
      "Угловая витрина на первой линии, терраса и отдельный служебный вход.",
      "A first-line corner window, a terrace and a separate service entrance.",
    ),
    highlights: [
      L("Fațadă panoramică pe două străzi", "Панорамный фасад на две улицы", "Panoramic frontage on two streets"),
      L("Circa 5.000 de pietoni pe zi (estimare)", "Около 5 000 пешеходов в день (оценка)", "About 5,000 pedestrians a day (estimate)"),
      L("Terasă de 91,03 m²", "Терраса 91,03 м²", "A 91.03 m² terrace"),
      L("Acces de serviciu cu rampă", "Служебный доступ с рампой", "Service access with ramp"),
    ],
    parking: L("Parcare dedicată în apropiere", "Выделенная парковка рядом", "Dedicated parking nearby"),
    entrance: L("Intrare de la colț + acces de serviciu cu rampă", "Вход с угла + служебный вход с рампой", "Corner entrance + service access with ramp"),
    visibility: L("Colț, vitrină continuă pe două străzi", "Угол, сплошная витрина на две улицы", "Corner, continuous window on two streets"),
    technical: {
      power: L("cca. 50 kVA · se confirmă tehnic", "около 50 кВА · уточняется", "approx. 50 kVA · to be confirmed"),
      ventilation: L("Trasee de ventilație existente", "Существующие трассы вентиляции", "Existing ventilation routes"),
      height: L("Parter cca. 2,64 m · demisol cca. 2,67 m", "1‑й этаж ок. 2,64 м · цоколь ок. 2,67 м", "Ground approx. 2.64 m · lower ground approx. 2.67 m"),
      condition: L("Gata pentru amenajarea chiriașului", "Готово к отделке под арендатора", "Ready for the tenant's fit-out"),
    },
    fit: { visibility: "strong", flow: "strong", parking: "possible", ground: "strong", entrance: "strong", power: "possible", ventilation: "possible", delivery: "strong", flexible: "possible", fast: "strong" },
    plan: {
      kind: "stack",
      levels: [
        { label: L("Terasă", "Терраса", "Terrace"), m2: 91.03, included: true },
        { label: L("Parter · vânzare 195,46 m²", "1‑й этаж · торговая 195,46 м²", "Ground · sales 195.46 m²"), m2: 240.96, included: true },
        { label: L("Demisol · vânzare 263,40 m²", "Цоколь · торговая 263,40 м²", "Lower ground · sales 263.40 m²"), m2: 293.7, included: true },
      ],
      note: L("Parterul separat (240,96 m²) — de confirmat.", "Первый этаж отдельно (240,96 м²) — уточняется.", "Ground floor alone (240.96 m²) — to be confirmed."),
    },
    photos: [{ kind: "asset", slug: "moscova-20" }, { kind: "use", id: "asset.moscova-20.gallery.1" }, { kind: "use", id: "asset.moscova-20.gallery.2" }],
    dataStatus: "PROVISIONAL",
    confirmed: ["area", "floor", "availableFrom", "parking", "entrance", "visibility", "power", "ventilation", "height", "condition", "plan", "highlights"],
    updated: "2026-10-06",
    futureSource: "CMS — Available space record (leasing team); uses beyond retail / services / showroom are DEMO",
  },
  {
    id: "moscova-9-building",
    code: "M9-01",
    project: "moscova-9",
    unit: L("Clădire comercială independentă", "Отдельное торговое здание", "Stand-alone retail building"),
    floor: "whole",
    floorLabel: L("Clădire întreagă · sală la nivelul străzii", "Здание целиком · зал на уровне улицы", "Whole building · street-level sales floor"),
    area: 1289.93,
    areaMin: 400,
    uses: ["retail", "showroom"],
    status: "available",
    availableFrom: null,
    headline: L(
      "O clădire proprie pe bulevard: fațadă lungă, două intrări, rampă de descărcare.",
      "Своё здание на бульваре: длинный фасад, два входа, рампа для разгрузки.",
      "A building of your own on the boulevard: a long frontage, two entrances, an unloading ramp.",
    ),
    highlights: [
      L("Sală de vânzare de 737,07 m²", "Торговый зал 737,07 м²", "A 737.07 m² sales floor"),
      L("Două intrări pentru clienți, din bulevard", "Два входа для покупателей с бульвара", "Two customer entrances from the boulevard"),
      L("Descărcare 69,46 m² cu rampă", "Разгрузка 69,46 м² с рампой", "69.46 m² unloading with ramp"),
      L("Integral sau o parte convenită", "Целиком или согласованной частью", "Whole or an agreed part"),
    ],
    parking: L("Parcare de-a lungul bulevardului", "Парковка вдоль бульвара", "Parking along the boulevard"),
    entrance: L("Clădire independentă · două intrări proprii", "Отдельное здание · два собственных входа", "Stand-alone building · two own entrances"),
    visibility: L("Fațadă lungă pe prima linie a bulevardului", "Длинный фасад на первой линии бульвара", "A long first-line boulevard frontage"),
    technical: {
      power: L("Se confirmă pentru formatul ales", "Уточняется под формат", "To be confirmed for the chosen format"),
      ventilation: L("Ventilație de retail · adaptare la format", "Торговая вентиляция · адаптация под формат", "Retail ventilation · adapted to the format"),
      height: L("cca. 4,0 m în sala de vânzare", "около 4,0 м в торговом зале", "approx. 4.0 m in the sales floor"),
      condition: L("Sală liberă, gata pentru amenajare", "Свободный зал, готов к отделке", "Empty floor, ready for fit-out"),
    },
    fit: { visibility: "strong", flow: "strong", parking: "possible", ground: "strong", entrance: "strong", power: "possible", ventilation: "possible", delivery: "strong", flexible: "strong", fast: "possible" },
    plan: {
      kind: "zones",
      street: L("Bd. Moscova", "Бул. Москова", "Moscova Blvd"),
      entrances: [{ x: 22, y: 60 }, { x: 52, y: 60 }],
      zones: [
        { label: L("Sală de vânzare", "Торговый зал", "Sales floor"), m2: 737.07, x: 0, y: 18, w: 70, h: 42, tone: "main" },
        { label: L("Spații auxiliare", "Вспомогательные", "Support rooms"), m2: 483.4, x: 0, y: 0, w: 100, h: 18, tone: "support" },
        { label: L("Descărcare · rampă", "Разгрузка · рампа", "Unloading · ramp"), m2: 69.46, x: 70, y: 18, w: 30, h: 42, tone: "service" },
      ],
    },
    photos: [{ kind: "asset", slug: "moscova-9" }, { kind: "use", id: "asset.moscova-9.gallery.1" }, { kind: "use", id: "asset.moscova-9.gallery.2" }],
    dataStatus: "PROVISIONAL",
    confirmed: ["area", "uses", "parking", "entrance", "visibility", "highlights", "plan"],
    updated: "2026-10-03",
    futureSource: "CMS — Available space record (leasing team); minimum part, date, height and technical values are DEMO; support-room area is derived (total − sales − unloading)",
  },
  {
    id: "dacia-31-building",
    code: "D31-01",
    project: "dacia-31",
    unit: L("Clădire de birouri întreagă", "Офисное здание целиком", "Whole office building"),
    floor: "whole",
    floorLabel: L("Demisol + 3 etaje + etaj tehnic", "Цоколь + 3 этажа + технический", "Lower ground + 3 floors + technical"),
    area: 5223,
    uses: ["office"],
    status: "available",
    availableFrom: "2027-01-01",
    headline: L(
      "O clădire separată pentru sediul unei singure companii — cu numele ei pe fațadă.",
      "Отдельное здание под штаб-квартиру одной компании — с её именем на фасаде.",
      "A separate building for one company's headquarters — with its name on the facade.",
    ),
    highlights: [
      L("Etaje mari, de 1.014–1.770 m²", "Крупные этажи 1 014–1 770 м²", "Large floors of 1,014–1,770 m²"),
      L("4+ variante de intrare și circulație", "4+ варианта входов и коммуникаций", "4+ entrance and circulation options"),
      L("Instalații existente ale clădirii", "Существующая инженерия здания", "Existing building services"),
      L("Fațadă vizibilă pe Dacia, Traian, Decebal", "Заметный фасад у Дачия, Траян, Дечебал", "A visible facade by Dacia, Traian, Decebal"),
    ],
    parking: L("Cca. 60 de locuri pe teren", "Около 60 мест на участке", "About 60 spaces on the plot"),
    entrance: L("Intrare proprie · 4+ variante de acces", "Собственный вход · 4+ варианта доступа", "Own entrance · 4+ access options"),
    visibility: L("Fațadă vizibilă la intrarea în oraș dinspre aeroport", "Заметный фасад на въезде в город со стороны аэропорта", "A visible facade at the city's airport entrance"),
    technical: {
      power: L("Rețele existente · capacitatea se confirmă prin audit", "Сети есть · мощность подтверждается аудитом", "Services in place · capacity confirmed by audit"),
      ventilation: L("Tubulatură existentă · adaptare la utilizator", "Воздуховоды есть · адаптация под пользователя", "Ductwork in place · adapted to the occupier"),
      height: L("cca. 3,2 m pe etajele de birouri", "около 3,2 м на офисных этажах", "approx. 3.2 m on office floors"),
      condition: L("Pregătire pentru un singur utilizator din 2027", "Подготовка под одного пользователя с 2027", "Prepared for a single occupier from 2027"),
    },
    fit: { visibility: "strong", flow: "possible", parking: "strong", ground: "strong", entrance: "strong", power: "possible", ventilation: "possible", delivery: "possible", flexible: "strong", fast: "limited" },
    plan: {
      kind: "stack",
      levels: [
        { label: L("Etaj tehnic", "Технический этаж", "Technical floor"), m2: 260, included: true },
        { label: L("Etajul 3", "3‑й этаж", "3rd floor"), m2: 1014, included: true },
        { label: L("Etajul 2", "2‑й этаж", "2nd floor"), m2: 1770, included: true },
        { label: L("Etajul 1", "1‑й этаж", "1st floor"), m2: 1138, included: true },
        { label: L("Demisol", "Цоколь", "Lower ground"), m2: 1041, included: true },
      ],
      note: L("Se închiriază ca întreg.", "Сдаётся целиком.", "Leased as a whole."),
    },
    photos: [{ kind: "asset", slug: "dacia-31" }, { kind: "use", id: "asset.dacia-31.gallery.1" }, { kind: "use", id: "asset.dacia-31.gallery.2" }],
    dataStatus: "PROVISIONAL",
    confirmed: ["area", "floor", "availableFrom", "uses", "entrance", "visibility", "power", "ventilation", "plan", "highlights"],
    updated: "2026-10-01",
    futureSource: "CMS — Available space record (leasing team); parking count, height and condition are DEMO",
  },
  {
    id: "creanga-78-101",
    code: "C78-101",
    project: "creanga-78",
    unit: L("Spațiul 101 · parter, intrare din stradă", "Помещение 101 · 1‑й этаж, вход с улицы", "Unit 101 · ground floor, street entrance"),
    floor: "ground",
    floorLabel: L("Parter", "1‑й этаж", "Ground floor"),
    area: 120,
    uses: ["services", "clinic", "retail"],
    status: "available",
    availableFrom: null,
    headline: L(
      "Un spațiu la stradă pentru servicii de cartier sau un cabinet medical.",
      "Помещение с входом с улицы — для сервиса или медицинского кабинета.",
      "A street-front space for a neighbourhood service or a medical practice.",
    ),
    highlights: [
      L("Intrare separată din stradă", "Отдельный вход с улицы", "Separate street entrance"),
      L("Vitrină la stradă", "Витрина на улицу", "Shop window to the street"),
      L("Parcare pe teren", "Парковка на участке", "Parking on the plot"),
      L("Gata de folosit", "Готово к работе", "Ready to use"),
    ],
    parking: L("Parcare pe teren · cca. 40 de locuri comune", "Парковка на участке · около 40 общих мест", "On-plot parking · about 40 shared spaces"),
    entrance: L("Intrare separată din stradă", "Отдельный вход с улицы", "Separate street entrance"),
    visibility: L("Vitrină la nivelul străzii", "Витрина на уровне улицы", "Street-level window"),
    technical: {
      power: L("15 kW · extindere la cerere", "15 кВт · увеличение по запросу", "15 kW · upgrade on request"),
      ventilation: L("Ventilare și climatizare proprii", "Собственная вентиляция и кондиционирование", "Own ventilation and cooling"),
      height: L("cca. 3,0 m", "около 3,0 м", "approx. 3.0 m"),
      condition: L("Renovat · gata de folosit", "После ремонта · готово к работе", "Renovated · ready to use"),
    },
    fit: { visibility: "possible", flow: "possible", parking: "strong", ground: "strong", entrance: "strong", power: "possible", ventilation: "possible", delivery: "limited", flexible: "possible", fast: "strong" },
    plan: creangaPlate("101", L("Parter", "1‑й этаж", "Ground floor"), ["102", "103", "104", "101"]),
    photos: [{ kind: "use", id: "asset.creanga-78.hero" }, { kind: "use", id: "asset.creanga-78.gallery.2" }],
    dataStatus: "DEMO",
    confirmed: [],
    updated: "2026-10-05",
    futureSource: "OWNER / leasing team — Creangă 78 vacancy schedule (no approved data yet)",
  },
  {
    id: "creanga-78-204",
    code: "C78-204",
    project: "creanga-78",
    unit: L("Biroul 204 · etajul 2", "Офис 204 · 2‑й этаж", "Office 204 · 2nd floor"),
    floor: "upper",
    floorLabel: L("Etajul 2", "2‑й этаж", "2nd floor"),
    area: 210,
    uses: ["office"],
    status: "available",
    availableFrom: null,
    headline: L(
      "Un birou pentru o echipă de 15–25 de oameni, cu lumină pe două laturi.",
      "Офис для команды из 15–25 человек, со светом с двух сторон.",
      "An office for a team of 15–25, with daylight on two sides.",
    ),
    highlights: [
      L("Lumină naturală pe două laturi", "Естественный свет с двух сторон", "Daylight on two sides"),
      L("Spațiu deschis + două săli", "Открытое пространство + две комнаты", "Open plan + two rooms"),
      L("Hol comun și lift", "Общий холл и лифт", "Shared lobby and lift"),
      L("4 locuri de parcare dedicate", "4 выделенных парковочных места", "4 dedicated parking spaces"),
    ],
    parking: L("4 locuri dedicate pe teren", "4 выделенных места на участке", "4 dedicated spaces on the plot"),
    entrance: L("Hol comun cu lift și control acces", "Общий холл с лифтом и контролем доступа", "Shared lobby with lift and access control"),
    visibility: L("Firmă în hol și pe panoul de la intrare", "Вывеска в холле и на табло у входа", "Signage in the lobby and on the entrance board"),
    technical: {
      power: L("Standard de birou · 20 kW", "Офисный стандарт · 20 кВт", "Office standard · 20 kW"),
      ventilation: L("Climatizare VRF, ventilare mecanică", "VRF-кондиционирование, механическая вентиляция", "VRF cooling, mechanical ventilation"),
      height: L("cca. 2,9 m", "около 2,9 м", "approx. 2.9 m"),
      condition: L("Gata de folosit · amenajare minimă", "Готово к работе · минимальная доводка", "Ready to use · minimal fit-out"),
    },
    fit: { visibility: "limited", flow: "limited", parking: "strong", ground: "limited", entrance: "possible", power: "possible", ventilation: "strong", delivery: "limited", flexible: "strong", fast: "strong" },
    plan: creangaPlate("204", L("Etajul 2", "2‑й этаж", "2nd floor"), ["204", "205", "206", "207"]),
    photos: [{ kind: "use", id: "asset.creanga-78.gallery.1" }, { kind: "use", id: "asset.creanga-78.gallery.2" }],
    dataStatus: "DEMO",
    confirmed: [],
    updated: "2026-10-05",
    futureSource: "OWNER / leasing team — Creangă 78 vacancy schedule (no approved data yet)",
  },
  {
    id: "creanga-78-305",
    code: "C78-305",
    project: "creanga-78",
    unit: L("Biroul 305 · etajul 3", "Офис 305 · 3‑й этаж", "Office 305 · 3rd floor"),
    floor: "upper",
    floorLabel: L("Etajul 3", "3‑й этаж", "3rd floor"),
    area: 85,
    uses: ["office", "services"],
    status: "available",
    availableFrom: "2026-12-01",
    headline: L(
      "Un birou compact pentru o echipă mică — liber din decembrie.",
      "Компактный офис для небольшой команды — освобождается в декабре.",
      "A compact office for a small team — free from December.",
    ),
    highlights: [
      L("Pentru 6–10 oameni", "На 6–10 человек", "For 6–10 people"),
      L("Ferestre spre curte, liniște", "Окна во двор, тишина", "Windows to the courtyard, quiet"),
      L("Hol comun și lift", "Общий холл и лифт", "Shared lobby and lift"),
    ],
    parking: L("Parcare pe teren · locuri comune", "Парковка на участке · общие места", "On-plot parking · shared spaces"),
    entrance: L("Hol comun cu lift", "Общий холл с лифтом", "Shared lobby with lift"),
    visibility: L("Firmă pe panoul de la intrare", "Вывеска на табло у входа", "Signage on the entrance board"),
    technical: {
      power: L("Standard de birou · 10 kW", "Офисный стандарт · 10 кВт", "Office standard · 10 kW"),
      ventilation: L("Climatizare split", "Сплит-кондиционирование", "Split cooling"),
      height: L("cca. 2,9 m", "около 2,9 м", "approx. 2.9 m"),
      condition: L("Se renovează după plecarea chiriașului", "Ремонт после выезда арендатора", "Refreshed after the current tenant leaves"),
    },
    fit: { visibility: "limited", flow: "limited", parking: "possible", ground: "limited", entrance: "possible", power: "possible", ventilation: "possible", delivery: "limited", flexible: "possible", fast: "possible" },
    plan: creangaPlate("305", L("Etajul 3", "3‑й этаж", "3rd floor"), ["303", "304", "306", "305"]),
    photos: [{ kind: "use", id: "asset.creanga-78.gallery.2" }, { kind: "use", id: "asset.creanga-78.gallery.1" }],
    dataStatus: "DEMO",
    confirmed: [],
    updated: "2026-10-02",
    futureSource: "OWNER / leasing team — Creangă 78 vacancy schedule (no approved data yet)",
  },
  {
    id: "creanga-78-110",
    code: "C78-110",
    project: "creanga-78",
    unit: L("Spațiul 110 · parter, colț cu terasă", "Помещение 110 · 1‑й этаж, угол с террасой", "Unit 110 · ground floor, corner with terrace"),
    floor: "ground",
    floorLabel: L("Parter", "1‑й этаж", "Ground floor"),
    area: 95,
    uses: ["fnb", "services"],
    status: "reserved",
    availableFrom: null,
    headline: L(
      "Spațiu pentru o cafenea de cartier, cu terasă la stradă.",
      "Помещение для районной кофейни с террасой на улицу.",
      "A space for a neighbourhood café, with a street terrace.",
    ),
    highlights: [
      L("Colț cu terasă", "Угол с террасой", "Corner with terrace"),
      L("Hotă și evacuare prevăzute", "Предусмотрены вытяжка и выброс", "Kitchen extract provided for"),
      L("Intrare din stradă", "Вход с улицы", "Street entrance"),
    ],
    parking: L("Parcare pe teren · locuri comune", "Парковка на участке · общие места", "On-plot parking · shared spaces"),
    entrance: L("Intrare separată din stradă", "Отдельный вход с улицы", "Separate street entrance"),
    visibility: L("Colț vizibil din două direcții", "Угол, виден с двух сторон", "A corner seen from two directions"),
    technical: {
      power: L("25 kW", "25 кВт", "25 kW"),
      ventilation: L("Canal de evacuare până pe acoperiș", "Канал вытяжки до кровли", "Extract duct to the roof"),
      height: L("cca. 3,0 m", "около 3,0 м", "approx. 3.0 m"),
      condition: L("La gri · amenajare de către chiriaș", "Под чистовую отделку арендатора", "Shell · tenant fit-out"),
    },
    fit: { visibility: "strong", flow: "possible", parking: "possible", ground: "strong", entrance: "strong", power: "strong", ventilation: "strong", delivery: "possible", flexible: "limited", fast: "possible" },
    plan: creangaPlate("110", L("Parter", "1‑й этаж", "Ground floor"), ["110", "102", "104", "101"]),
    photos: [{ kind: "use", id: "asset.creanga-78.hero" }, { kind: "use", id: "asset.moscova-20.gallery.1" }],
    dataStatus: "DEMO",
    confirmed: [],
    updated: "2026-10-07",
    futureSource: "OWNER / leasing team — Creangă 78 vacancy schedule (no approved data yet)",
  },
  {
    // Status LEASED: kept in the CMS, never published (shown only inside the CMS workflow prototype).
    id: "creanga-78-402",
    code: "C78-402",
    project: "creanga-78",
    unit: L("Biroul 402 · etajul 4", "Офис 402 · 4‑й этаж", "Office 402 · 4th floor"),
    floor: "upper",
    floorLabel: L("Etajul 4", "4‑й этаж", "4th floor"),
    area: 240,
    uses: ["office"],
    status: "leased",
    availableFrom: null,
    headline: L("Birou de 240 m² cu vedere spre oraș.", "Офис 240 м² с видом на город.", "A 240 m² office with a city view."),
    highlights: [L("Vedere spre oraș", "Вид на город", "City view")],
    parking: L("Parcare pe teren", "Парковка на участке", "On-plot parking"),
    entrance: L("Hol comun cu lift", "Общий холл с лифтом", "Shared lobby with lift"),
    visibility: L("Firmă pe panoul de la intrare", "Вывеска на табло у входа", "Signage on the entrance board"),
    technical: {
      power: L("Standard de birou", "Офисный стандарт", "Office standard"),
      ventilation: L("Climatizare VRF", "VRF-кондиционирование", "VRF cooling"),
      height: L("cca. 2,9 m", "около 2,9 м", "approx. 2.9 m"),
      condition: L("Ocupat", "Занято", "Occupied"),
    },
    fit: { visibility: "limited", flow: "limited", parking: "possible", ground: "limited", entrance: "possible", power: "possible", ventilation: "strong", delivery: "limited", flexible: "possible", fast: "limited" },
    plan: creangaPlate("402", L("Etajul 4", "4‑й этаж", "4th floor"), ["402", "403", "404", "405"]),
    photos: [{ kind: "use", id: "asset.creanga-78.gallery.1" }],
    dataStatus: "DEMO",
    confirmed: [],
    updated: "2026-09-30",
    futureSource: "OWNER / leasing team — Creangă 78 vacancy schedule (no approved data yet)",
  },
];

/** Rows for docs/DEMO_DATA_REGISTER.md (scripts/demo-register.mjs). */
export const spaceRegister = spaces.map((space) => ({
  key: `space.${space.id}`,
  group: "LEASING",
  page: `Leasing · ${space.project}`,
  field: `Available space ${space.code} (${space.status})`,
  value: {
    ro: `${space.unit.ro} · ${space.area} m²`,
    ru: `${space.unit.ru} · ${space.area} м²`,
    en: `${space.unit.en} · ${space.area} m²`,
  },
  status: space.dataStatus,
  futureSource: space.futureSource,
}));

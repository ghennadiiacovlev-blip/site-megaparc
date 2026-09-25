import { publicAsset, type Localized } from "@/lib/site-data";

/**
 * Public asset and project data.
 *
 * Every figure here comes from OWNER-supplied commercial offers or project
 * material that the OWNER approved for public use. Internal financial
 * indicators (NOI, valuations, cap rates, occupancy models, budgets) are
 * never stored in this file. See docs/CLAUDE_CONTENT_REVIEW.md.
 */

export type AssetSlug = "dacia-31" | "moscova-9" | "moscova-20" | "creanga-78";

export type Fact = { label: Localized; value: Localized };

/** Approved public address used for Google Maps deep links. Only set when the address is confirmed. */
export type MapLocation = { address: string; query: string };

export function googleMapsUrl(location: MapLocation) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.query)}`;
}

export function googleDirectionsUrl(location: MapLocation) {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(location.query)}`;
}

export type AssetAvailability = {
  /** Headline availability statement (e.g. whole building from a date). */
  headline: Localized;
  area: Localized;
  rent: Localized;
  from?: Localized;
  terms: Localized;
};

export type PortfolioAsset = {
  slug: AssetSlug;
  name: string;
  district: Localized;
  city: Localized;
  image: string | null;
  imageSmall: string | null;
  imagePosition?: string;
  status: Localized;
  positioning: Localized;
  use: Localized;
  intro: Localized;
  location: Localized;
  /** Confirmed connectivity points only. */
  connectivity: Localized[];
  map: MapLocation | null;
  architecture: Localized;
  /** Key figures shown as an editorial fact grid. */
  facts: Fact[];
  /** Level-by-level programme (only where confirmed). */
  programme: Fact[];
  /** Physical / technical characteristics (only where confirmed). */
  characteristics: Localized[];
  availability: AssetAvailability | null;
};

const operating: Localized = { ro: "Activ operațional", ru: "Операционный актив", en: "Operating asset" };

export const portfolioAssets: PortfolioAsset[] = [
  {
    slug: "dacia-31",
    name: "Dacia 31",
    district: { ro: "Botanica", ru: "Ботаника", en: "Botanica" },
    city: { ro: "Chișinău", ru: "Кишинёв", en: "Chișinău" },
    image: publicAsset("/assets/portfolio/dacia-31.webp"),
    imageSmall: publicAsset("/assets/portfolio/dacia-31-1200.webp"),
    imagePosition: "50% 56%",
    status: operating,
    positioning: {
      ro: "Sediu IT / campus corporativ",
      ru: "IT-штаб-квартира / корпоративный кампус",
      en: "IT headquarters / corporate campus",
    },
    use: { ro: "Birouri · campus integrat", ru: "Офисы · интегрированный кампус", en: "Offices · integrated campus" },
    intro: {
      ro: "Clădire independentă cu o suprafață totală de 5.223 m², concepută ca sediu al unei singure companii sau campus corporativ integrat, cu infrastructură de birouri și IT existentă.",
      ru: "Отдельно стоящее здание общей площадью 5 223 м², подходящее для штаб-квартиры одной компании или интегрированного корпоративного кампуса, с существующей офисной и IT-инфраструктурой.",
      en: "A stand-alone building with a total area of 5,223 m², conceived as a single-company headquarters or integrated corporate campus, with an existing office and IT infrastructure base.",
    },
    location: {
      ro: "Botanica este poarta de intrare în Chișinău dinspre aeroport. Activul este ancorat de arterele urbane Dacia, Traian și Decebal, cu o promenadă pietonală amplă și restaurante, cafenele și servicii în imediata apropiere.",
      ru: "Ботаника — въезд в Кишинёв со стороны аэропорта. Объект расположен на пересечении городских магистралей Дачия, Траян и Дечебал, рядом с широкой пешеходной променадой, ресторанами, кафе и сервисами.",
      en: "Botanica is the gateway into Chișinău from the airport. The asset is anchored by the Dacia, Traian and Decebal urban arteries, with a large pedestrian promenade and restaurants, cafés and services nearby.",
    },
    map: { address: "Bd. Dacia 31, Chișinău", query: "Bd. Dacia 31, Chișinău, Moldova" },
    connectivity: [
      { ro: "Botanica, poarta de intrare în Chișinău dinspre aeroport", ru: "Ботаника — въезд в Кишинёв со стороны аэропорта", en: "Botanica, the gateway into Chișinău from the airport" },
      { ro: "Arterele urbane Dacia, Traian și Decebal", ru: "Городские магистрали Дачия, Траян и Дечебал", en: "Dacia, Traian and Decebal urban arteries" },
      { ro: "Promenadă pietonală amplă", ru: "Широкая пешеходная променада", en: "Large pedestrian promenade" },
      { ro: "Restaurante, cafenele și servicii în apropiere", ru: "Рестораны, кафе и сервисы рядом", en: "Restaurants, cafés and services nearby" },
    ],
    architecture: {
      ro: "Clădirea oferă zone open-plan și spații suport pe patru niveluri principale și un etaj tehnic. Utilitățile, instalațiile clădirii, tubulatura de distribuție a aerului și traseele de alimentare electrică și curenți slabi există deja; capacitatea exactă a instalațiilor face obiectul unui audit tehnic.",
      ru: "Здание включает open-space и вспомогательные зоны на четырёх основных уровнях и техническом этаже. Инженерные сети, воздуховоды, трассы электроснабжения и слаботочных систем уже существуют; точная мощность инженерных систем определяется по итогам технического аудита.",
      en: "The building offers open-plan and support areas across four main levels and a technical floor. Utilities and building services, ductwork and air distribution, and power and low-voltage cabling routes already exist; exact engineering capacity is subject to a technical audit.",
    },
    facts: [
      { label: { ro: "Suprafață totală", ru: "Общая площадь", en: "Total area" }, value: { ro: "5.223 m²", ru: "5 223 м²", en: "5,223 m²" } },
      { label: { ro: "Format", ru: "Формат", en: "Format" }, value: { ro: "Clădire independentă", ru: "Отдельно стоящее здание", en: "Stand-alone building" } },
      { label: { ro: "Niveluri", ru: "Уровни", en: "Levels" }, value: { ro: "Demisol, 3 etaje, etaj tehnic", ru: "Цокольный, 3 этажа, технический", en: "Lower ground, 3 floors, technical floor" } },
      { label: { ro: "Disponibil", ru: "Доступен", en: "Available" }, value: { ro: "Integral, din 1 ianuarie 2027", ru: "Полностью, с 1 января 2027", en: "Whole property, from 1 January 2027" } },
    ],
    programme: [
      { label: { ro: "Demisol", ru: "Цокольный этаж", en: "Lower ground floor" }, value: { ro: "1.041 m²", ru: "1 041 м²", en: "1,041 m²" } },
      { label: { ro: "Etajul 1", ru: "1-й этаж", en: "1st floor" }, value: { ro: "1.138 m²", ru: "1 138 м²", en: "1,138 m²" } },
      { label: { ro: "Etajul 2", ru: "2-й этаж", en: "2nd floor" }, value: { ro: "1.770 m²", ru: "1 770 м²", en: "1,770 m²" } },
      { label: { ro: "Etajul 3", ru: "3-й этаж", en: "3rd floor" }, value: { ro: "1.014 m²", ru: "1 014 м²", en: "1,014 m²" } },
      { label: { ro: "Etaj tehnic", ru: "Технический этаж", en: "Technical floor" }, value: { ro: "260 m²", ru: "260 м²", en: "260 m²" } },
    ],
    characteristics: [
      { ro: "Concept de campus corporativ integrat pentru o singură companie", ru: "Концепция интегрированного корпоративного кампуса для одной компании", en: "Integrated corporate-campus concept for a single company" },
      { ro: "Bază existentă de infrastructură de birouri și IT", ru: "Существующая база офисной и IT-инфраструктуры", en: "Existing office and IT infrastructure base" },
      { ro: "Utilități și instalații ale clădirii existente", ru: "Существующие инженерные сети и системы здания", en: "Utilities and building services already in place" },
      { ro: "Tubulatură și distribuție a aerului existente", ru: "Существующие воздуховоды и система распределения воздуха", en: "Existing ductwork and air distribution" },
      { ro: "Trasee de alimentare electrică și curenți slabi", ru: "Трассы электроснабжения и слаботочных систем", en: "Power and low-voltage cabling routes" },
      { ro: "Zone open-plan și spații suport", ru: "Open-space и вспомогательные зоны", en: "Open-plan and support areas" },
    ],
    availability: {
      headline: {
        ro: "Întreaga proprietate este disponibilă de la 1 ianuarie 2027, pentru sediul unei singure companii sau un campus corporativ integrat.",
        ru: "Вся недвижимость доступна с 1 января 2027 года — для штаб-квартиры одной компании или интегрированного корпоративного кампуса.",
        en: "The whole property is available from 1 January 2027, for a single-company headquarters or an integrated corporate campus.",
      },
      area: { ro: "5.223 m²", ru: "5 223 м²", en: "5,223 m²" },
      rent: { ro: "17 €/m²/lună, fără TVA", ru: "17 €/м² в месяц, без НДС", en: "€17/m²/month, excl. VAT" },
      from: { ro: "1 ianuarie 2027", ru: "1 января 2027", en: "1 January 2027" },
      terms: {
        ro: "Capacitatea exactă a instalațiilor face obiectul unui audit tehnic. Condițiile comerciale se stabilesc prin negociere.",
        ru: "Точная мощность инженерных систем определяется техническим аудитом. Коммерческие условия согласовываются в ходе переговоров.",
        en: "Exact engineering capacity is subject to a technical audit. Commercial terms are agreed through negotiation.",
      },
    },
  },
  {
    slug: "moscova-9",
    name: "Moscova 9",
    district: { ro: "Rîșcani", ru: "Рышкань", en: "Rîșcani" },
    city: { ro: "Chișinău", ru: "Кишинёв", en: "Chișinău" },
    image: publicAsset("/assets/portfolio/moscova-9.webp"),
    imageSmall: publicAsset("/assets/portfolio/moscova-9-960.webp"),
    imagePosition: "50% 50%",
    status: operating,
    positioning: { ro: "Activ de retail urban", ru: "Городской торговый актив", en: "Urban retail asset" },
    use: { ro: "Retail · format independent", ru: "Ритейл · отдельно стоящий формат", en: "Retail · stand-alone format" },
    intro: {
      ro: "Spațiu comercial de 1.289,93 m² în format independent, în afara centrelor comerciale, cu front lung la bulevard, două intrări pentru clienți și zonă proprie de descărcare.",
      ru: "Торговое помещение площадью 1 289,93 м² в отдельно стоящем формате, вне торговых центров, с протяжённым фасадом вдоль бульвара, двумя входами для покупателей и собственной зоной разгрузки.",
      en: "A 1,289.93 m² retail property in a stand-alone format outside shopping centres, with a long boulevard frontage, two customer entrances and its own unloading zone.",
    },
    location: {
      ro: "Sectorul Rîșcani, pe bulevardul Moscova: trafic auto și pietonal constant, parcare de-a lungul bulevardului și o zonă rezidențială densă în jur. Fațada lungă asigură o vizibilitate puternică a brandului.",
      ru: "Сектор Рышкань, бульвар Москова: постоянный автомобильный и пешеходный поток, парковка вдоль бульвара и плотная жилая застройка вокруг. Протяжённый фасад обеспечивает сильную видимость бренда.",
      en: "Rîșcani district, on Moscova Boulevard: steady automobile and pedestrian traffic, parking along the avenue and a densely populated catchment. The long frontage gives strong facade and brand visibility.",
    },
    map: { address: "Bd. Moscova 9, Chișinău", query: "Bd. Moscova 9, Chișinău, Moldova" },
    connectivity: [
      { ro: "Rîșcani, front la bulevardul Moscova", ru: "Рышкань, фасад на бульвар Москова", en: "Rîșcani, frontage on Moscova Boulevard" },
      { ro: "Trafic auto și pietonal ridicat", ru: "Высокий автомобильный и пешеходный трафик", en: "High automobile and pedestrian traffic" },
      { ro: "Parcare de-a lungul bulevardului", ru: "Парковка вдоль бульвара", en: "Parking along the avenue" },
      { ro: "Zonă rezidențială densă", ru: "Плотная жилая застройка", en: "Dense residential catchment" },
    ],
    architecture: {
      ro: "Sala principală de vânzare de 737,07 m² este completată de o zonă de descărcare cu rampă de 69,46 m² și de spații back-of-house pentru logistică, stoc, birou și pază. Fluxul de marfă este separat de fluxul clienților.",
      ru: "Основной торговый зал площадью 737,07 м² дополнен зоной разгрузки с рампой 69,46 м² и служебными помещениями для логистики, склада, офиса и охраны. Товарный поток отделён от потока покупателей.",
      en: "The main sales floor of 737.07 m² is complemented by an unloading zone with ramp of 69.46 m² and back-of-house areas for logistics, stock, office and security. Goods flow is separated from customer flow.",
    },
    facts: [
      { label: { ro: "Suprafață totală", ru: "Общая площадь", en: "Total area" }, value: { ro: "1.289,93 m²", ru: "1 289,93 м²", en: "1,289.93 m²" } },
      { label: { ro: "Sală de vânzare", ru: "Торговый зал", en: "Main sales floor" }, value: { ro: "737,07 m²", ru: "737,07 м²", en: "737.07 m²" } },
      { label: { ro: "Zonă de descărcare", ru: "Зона разгрузки", en: "Unloading zone" }, value: { ro: "69,46 m² · cu rampă", ru: "69,46 м² · с рампой", en: "69.46 m² · with ramp" } },
      { label: { ro: "Intrări clienți", ru: "Входы для покупателей", en: "Customer entrances" }, value: { ro: "2, dinspre bulevard", ru: "2, с бульвара", en: "2, from the boulevard" } },
    ],
    programme: [],
    characteristics: [
      { ro: "Format independent, în afara centrelor comerciale", ru: "Отдельно стоящий формат вне торговых центров", en: "Stand-alone retail format outside shopping centres" },
      { ro: "Front lung la bulevard și vizibilitate puternică a fațadei", ru: "Протяжённый фасад вдоль бульвара и сильная видимость", en: "Long frontage and strong facade visibility" },
      { ro: "Două intrări pentru clienți dinspre bulevard", ru: "Два входа для покупателей с бульвара", en: "Two customer entrances from the boulevard" },
      { ro: "Zone back-of-house: logistică, stoc, birou, pază", ru: "Служебные зоны: логистика, склад, офис, охрана", en: "Back-of-house: logistics, stock, office, security" },
      { ro: "Parcare de-a lungul bulevardului", ru: "Парковка вдоль бульвара", en: "Parking along the avenue" },
      { ro: "Zonă rezidențială densă în jur", ru: "Плотная жилая застройка вокруг", en: "Densely populated catchment" },
    ],
    availability: {
      headline: {
        ro: "Proprietatea poate fi închiriată integral sau într-o parte convenită.",
        ru: "Помещение может быть арендовано полностью или согласованной частью.",
        en: "The property can be leased as a whole or as an agreed part.",
      },
      area: { ro: "până la 1.289,93 m²", ru: "до 1 289,93 м²", en: "up to 1,289.93 m²" },
      rent: { ro: "18,70 €/m²/lună", ru: "18,70 €/м² в месяц", en: "€18.70/m²/month" },
      terms: {
        ro: "Suprafața finală, durata contractului, data predării și condițiile tehnice se stabilesc prin negociere.",
        ru: "Итоговая площадь, срок аренды, дата передачи и технические условия согласовываются в ходе переговоров.",
        en: "Final area, lease term, handover date and technical conditions remain subject to negotiation.",
      },
    },
  },
  {
    slug: "moscova-20",
    name: "Moscova 20",
    district: { ro: "Rîșcani", ru: "Рышкань", en: "Rîșcani" },
    city: { ro: "Chișinău", ru: "Кишинёв", en: "Chișinău" },
    image: publicAsset("/assets/portfolio/moscova-20.webp"),
    imageSmall: publicAsset("/assets/portfolio/moscova-20-960.webp"),
    imagePosition: "50% 48%",
    status: operating,
    positioning: { ro: "High-street / retail alimentar", ru: "High-street / продуктовый ритейл", en: "High-street / food retail opportunity" },
    use: { ro: "Retail · prima linie", ru: "Ритейл · первая линия", en: "Retail · first line" },
    intro: {
      ro: "Spațiu comercial de 625,7 m² pe prima linie, la intersecția bulevardului Moscova cu strada Matei Basarab, pregătit pentru ocupare și adaptare la identitatea brandului.",
      ru: "Торговое помещение площадью 625,7 м² на первой линии, на пересечении бульвара Москова и улицы Матей Басараб, готовое к заселению и адаптации под бренд.",
      en: "A 625.7 m² first-line commercial property at the intersection of Moscova Boulevard and Matei Basarab Street, ready for occupation and brand adaptation.",
    },
    location: {
      ro: "Sectorul Rîșcani, la intersecția bulevardului Moscova cu strada Matei Basarab: transport public în apropiere, zonă rezidențială densă, servicii comerciale în jur și o zonă de parcare dedicată. Fluxul pietonal indicativ este de aproximativ 5.000 de persoane pe zi.",
      ru: "Сектор Рышкань, пересечение бульвара Москова и улицы Матей Басараб: общественный транспорт рядом, плотная жилая застройка, торговая инфраструктура вокруг и выделенная зона парковки. Ориентировочный пешеходный поток — около 5 000 человек в день.",
      en: "Rîșcani district, at the intersection of Moscova Boulevard and Matei Basarab: public transport close by, a dense residential catchment, commercial amenities around and a dedicated parking zone. Indicative pedestrian flow is around 5,000 people per day.",
    },
    map: { address: "Bd. Moscova 20, Chișinău", query: "Bd. Moscova 20, Chișinău, Moldova" },
    connectivity: [
      { ro: "Intersecția bd. Moscova cu str. Matei Basarab", ru: "Пересечение бул. Москова и ул. Матей Басараб", en: "Intersection of Moscova Boulevard and Matei Basarab" },
      { ro: "Transport public în apropiere", ru: "Общественный транспорт рядом", en: "Close to public transport" },
      { ro: "Zonă rezidențială densă și servicii comerciale", ru: "Плотная жилая застройка и торговая инфраструктура", en: "Dense residential catchment and commercial amenities" },
      { ro: "Zonă de parcare dedicată", ru: "Выделенная зона парковки", en: "Dedicated parking zone" },
    ],
    architecture: {
      ro: "Front panoramic cu potențial de branding, intrare principală pentru clienți și acces separat de serviciu cu rampă, astfel încât fluxul de marfă este separat de fluxul clienților. Trasee HVAC, utilități și curenți slabi existente; putere electrică disponibilă de aproximativ 50 kVA.",
      ru: "Панорамный фасад с потенциалом брендинга, основной вход для покупателей и отдельный служебный доступ с рампой — товарный поток отделён от потока покупателей. Существующие трассы HVAC, инженерных сетей и слаботочных систем; доступная электрическая мощность около 50 кВА.",
      en: "A panoramic frontage with branding potential, a main customer entrance and separate service access with ramp, so goods flow is separate from customer flow. HVAC, utility and low-voltage routes in place; available electrical power of approximately 50 kVA.",
    },
    facts: [
      { label: { ro: "Suprafață totală", ru: "Общая площадь", en: "Total area" }, value: { ro: "625,7 m²", ru: "625,7 м²", en: "625.7 m²" } },
      { label: { ro: "Suprafață netă de vânzare", ru: "Чистая торговая площадь", en: "Net sales area" }, value: { ro: "458,86 m²", ru: "458,86 м²", en: "458.86 m²" } },
      { label: { ro: "Flux pietonal indicativ", ru: "Пешеходный поток (ориент.)", en: "Indicative pedestrian flow" }, value: { ro: "cca. 5.000 / zi", ru: "около 5 000 / день", en: "around 5,000 / day" } },
      { label: { ro: "Putere electrică disponibilă", ru: "Доступная мощность", en: "Available electrical power" }, value: { ro: "cca. 50 kVA", ru: "около 50 кВА", en: "approx. 50 kVA" } },
    ],
    programme: [
      { label: { ro: "Parter", ru: "Первый этаж", en: "Ground floor" }, value: { ro: "240,96 m² · vânzare 195,46 m²", ru: "240,96 м² · торговая 195,46 м²", en: "240.96 m² · sales 195.46 m²" } },
      { label: { ro: "Demisol", ru: "Цокольный этаж", en: "Lower ground" }, value: { ro: "293,70 m² · vânzare 263,40 m²", ru: "293,70 м² · торговая 263,40 м²", en: "293.70 m² · sales 263.40 m²" } },
      { label: { ro: "Terasă", ru: "Терраса", en: "Terrace" }, value: { ro: "91,03 m²", ru: "91,03 м²", en: "91.03 m²" } },
      { label: { ro: "Înălțime utilă", ru: "Высота помещений", en: "Ceiling height" }, value: { ro: "parter cca. 2,64 m · demisol cca. 2,67 m", ru: "1-й этаж ок. 2,64 м · цоколь ок. 2,67 м", en: "ground approx. 2.64 m · lower ground approx. 2.67 m" } },
    ],
    characteristics: [
      { ro: "Amplasare comercială pe prima linie", ru: "Коммерческое расположение на первой линии", en: "First-line commercial location" },
      { ro: "Front panoramic cu potențial de branding", ru: "Панорамный фасад с потенциалом брендинга", en: "Panoramic frontage with branding potential" },
      { ro: "Intrare principală pentru clienți și acces separat de serviciu / rampă", ru: "Основной вход для покупателей и отдельный служебный доступ / рампа", en: "Main customer entrance and separate service / ramp access" },
      { ro: "Flux de marfă separat de fluxul clienților", ru: "Товарный поток отделён от потока покупателей", en: "Goods flow separate from customer flow" },
      { ro: "Trasee HVAC, utilități și curenți slabi", ru: "Трассы HVAC, инженерных сетей и слаботочных систем", en: "HVAC, utility and low-voltage routes" },
      { ro: "Zonă de parcare dedicată", ru: "Выделенная зона парковки", en: "Dedicated parking zone" },
    ],
    availability: {
      headline: {
        ro: "Disponibil din 17 august 2026, pregătit pentru ocupare și adaptare la brand.",
        ru: "Доступен с 17 августа 2026 года, готов к заселению и адаптации под бренд.",
        en: "Available from 17 August 2026, ready for occupation and brand adaptation.",
      },
      area: { ro: "625,7 m²", ru: "625,7 м²", en: "625.7 m²" },
      rent: { ro: "20 €/m²/lună, inclusiv TVA", ru: "20 €/м² в месяц, включая НДС", en: "€20/m²/month, incl. VAT" },
      from: { ro: "17 august 2026", ru: "17 августа 2026", en: "17 August 2026" },
      terms: {
        ro: "Condițiile comerciale și tehnice se stabilesc prin negociere.",
        ru: "Коммерческие и технические условия согласовываются в ходе переговоров.",
        en: "Commercial and technical conditions are agreed through negotiation.",
      },
    },
  },
  {
    slug: "creanga-78",
    name: "Creangă 78",
    district: { ro: "Chișinău", ru: "Кишинёв", en: "Chișinău" },
    city: { ro: "Chișinău", ru: "Кишинёв", en: "Chișinău" },
    image: null,
    imageSmall: null,
    status: operating,
    positioning: { ro: "Activ operațional", ru: "Операционный актив", en: "Operating asset" },
    use: { ro: "Comercial", ru: "Коммерческий", en: "Commercial" },
    intro: {
      ro: "Activ operațional din portofoliul MEGAPARC din Chișinău. Prezentarea publică detaliată este în pregătire.",
      ru: "Операционный актив портфеля MEGAPARC в Кишинёве. Подробная публичная презентация готовится.",
      en: "An operating asset in the MEGAPARC Chișinău portfolio. The detailed public presentation is in preparation.",
    },
    location: {
      ro: "Chișinău. Informații suplimentare despre localizare și acces sunt disponibile la cerere.",
      ru: "Кишинёв. Дополнительная информация о расположении и доступе предоставляется по запросу.",
      en: "Chișinău. Additional information on location and access is available on request.",
    },
    map: null,
    connectivity: [],
    architecture: {
      ro: "Fotografia și descrierea arhitecturală a activului sunt în pregătire.",
      ru: "Фотография и архитектурное описание объекта готовятся.",
      en: "Photography and the architectural description of the asset are in preparation.",
    },
    facts: [],
    programme: [],
    characteristics: [],
    availability: null,
  },
];

export function getAsset(slug: string) {
  return portfolioAssets.find((asset) => asset.slug === slug);
}

export function getNextAsset(slug: AssetSlug) {
  const index = portfolioAssets.findIndex((asset) => asset.slug === slug);
  return portfolioAssets[(index + 1) % portfolioAssets.length];
}

/** Assets with a confirmed, currently marketed availability. */
export const availableAssets = portfolioAssets.filter((asset) => asset.availability !== null);

/* ------------------------------------------------------------------ */
/* Development                                                          */
/* ------------------------------------------------------------------ */

export type ProjectSlug = "vatra" | "drochia-gateway";

export type DevelopmentProject = {
  slug: ProjectSlug;
  name: string;
  place: Localized;
  map: MapLocation | null;
  connectivity: Localized[];
  location: Localized | null;
  image: string | null;
  imageSmall: string | null;
  status: Localized;
  kind: Localized;
  lead: Localized;
  intro: Localized;
  facts: Fact[];
  /** Narrative sections (title + text). */
  sections: { title: Localized; text: Localized; items?: Localized[] }[];
  /** Mandatory disclaimer for concepts. */
  disclaimer: Localized | null;
  statement: Localized;
};

export const developmentProjects: DevelopmentProject[] = [
  {
    slug: "vatra",
    name: "VATRA",
    place: { ro: "Republica Moldova", ru: "Республика Молдова", en: "Republic of Moldova" },
    map: null,
    connectivity: [],
    location: null,
    image: publicAsset("/assets/development/vatra.webp"),
    imageSmall: publicAsset("/assets/development/vatra-960.webp"),
    status: { ro: "Proiect în dezvoltare", ru: "Проект в стадии девелопмента", en: "Development project" },
    kind: { ro: "Dezvoltare", ru: "Девелопмент", en: "Development" },
    lead: {
      ro: "Un proiect de dezvoltare MEGAPARC, prezentat cu conceptul, etapele și materialele aprobate pentru comunicare publică.",
      ru: "Девелоперский проект MEGAPARC, представленный с концепцией, этапами и материалами, утверждёнными для публичной коммуникации.",
      en: "A MEGAPARC development project, presented with the concept, stages and material approved for public communication.",
    },
    intro: {
      ro: "VATRA este privit de la început prin prisma utilizării și a administrării pe termen lung. Dezvoltarea nu se încheie la recepție: atunci începe viața activului în portofoliu.",
      ru: "VATRA с самого начала рассматривается через призму использования и долгосрочного управления. Девелопмент не заканчивается вводом в эксплуатацию — с этого момента начинается жизнь актива в портфеле.",
      en: "VATRA is viewed from the outset through use and long-term management. Development does not end at handover: that is when the asset's life in the portfolio begins.",
    },
    facts: [],
    sections: [
      {
        title: { ro: "De la teren la activ", ru: "От участка к активу", en: "From land to asset" },
        text: {
          ro: "Etapele proiectului urmează același ciclu de proprietate: concept, planificare, execuție și utilizare pe termen lung.",
          ru: "Этапы проекта следуют единому циклу владения: концепция, планирование, реализация и долгосрочное использование.",
          en: "The project stages follow the same ownership cycle: concept, planning, delivery and long-term use.",
        },
        items: [
          { ro: "Concept — definirea utilizării, a scării și a economiei proiectului", ru: "Концепция — определение назначения, масштаба и экономики проекта", en: "Concept — defining use, scale and the economics of the project" },
          { ro: "Planificare — proiectare, autorizare și pregătirea execuției", ru: "Планирование — проектирование, разрешения и подготовка к реализации", en: "Planning — design, permitting and preparation for delivery" },
          { ro: "Execuție — construcție, control al calității și al costului", ru: "Реализация — строительство, контроль качества и затрат", en: "Delivery — construction, quality and cost control" },
          { ro: "Utilizare pe termen lung — administrare ca activ MEGAPARC", ru: "Долгосрочное использование — управление как активом MEGAPARC", en: "Long-term use — managed as a MEGAPARC asset" },
        ],
      },
    ],
    disclaimer: null,
    statement: { ro: "Construim pentru utilizarea de mâine.", ru: "Строим для завтрашнего использования.", en: "We build for tomorrow's use." },
  },
  {
    slug: "drochia-gateway",
    name: "Drochia Gateway",
    place: { ro: "Drochia", ru: "Дрокия", en: "Drochia" },
    map: { address: "Bd. Independenței 65, Drochia", query: "Bd. Independenței 65, Drochia, Moldova" },
    location: {
      ro: "Amplasament la intrarea în oraș, cu vizibilitate de poartă și expunere directă la traficul care se apropie de Drochia.",
      ru: "Участок на въезде в город, с «въездной» видимостью и прямой экспозицией к транспорту, приближающемуся к Дрокии.",
      en: "A city-edge site with gateway visibility and direct exposure to traffic approaching Drochia.",
    },
    connectivity: [
      { ro: "Două fronturi stradale", ru: "Два фронта к дорогам", en: "Two road fronts" },
      { ro: "Vizibilitate de poartă la marginea orașului", ru: "Въездная видимость на границе города", en: "Gateway / city-edge visibility" },
      { ro: "Expunere directă la traficul care intră în oraș", ru: "Прямая экспозиция к въезжающему трафику", en: "Direct exposure to approaching traffic" },
      { ro: "Potențial de accese separate pentru clienți și marfă", ru: "Возможность раздельных подъездов для покупателей и грузов", en: "Potential for separate customer and freight access" },
    ],
    image: null,
    imageSmall: null,
    status: { ro: "Concept de dezvoltare", ru: "Концепция развития", en: "Development concept" },
    kind: { ro: "Concept de investiție", ru: "Инвестиционная концепция", en: "Investment concept" },
    lead: {
      ro: "Teren de dezvoltare de 2,0 ha pe bd. Independenței 65, Drochia, cu două fronturi stradale și vizibilitate de poartă a orașului.",
      ru: "Участок под развитие площадью 2,0 га на бул. Индепенденцей 65, Дрокия, с двумя фронтами к дорогам и «въездной» видимостью на границе города.",
      en: "A 2.0 ha development site at Bd. Independenței 65, Drochia, with two road fronts and city-edge gateway visibility.",
    },
    intro: {
      ro: "Terenul beneficiază de expunere directă la traficul care intră în oraș și permite accesuri separate pentru clienți și pentru marfă / servicii. MEGAPARC SRL evaluează scenarii de dezvoltare comercială și logistică pentru acest amplasament.",
      ru: "Участок имеет прямую экспозицию к въезжающему в город трафику и позволяет организовать раздельные подъезды для покупателей и для грузового / сервисного транспорта. MEGAPARC SRL рассматривает сценарии торгового и логистического развития площадки.",
      en: "The site has direct exposure to approaching traffic and allows separate customer and freight / service access. MEGAPARC SRL is evaluating retail and logistics development scenarios for the location.",
    },
    facts: [
      { label: { ro: "Suprafața terenului", ru: "Площадь участка", en: "Site area" }, value: { ro: "2,0 ha", ru: "2,0 га", en: "2.0 ha" } },
      { label: { ro: "Adresă", ru: "Адрес", en: "Address" }, value: { ro: "Bd. Independenței 65, Drochia", ru: "Бул. Индепенденцей 65, Дрокия", en: "Bd. Independenței 65, Drochia" } },
      { label: { ro: "Fronturi stradale", ru: "Фронты к дорогам", en: "Road fronts" }, value: { ro: "2", ru: "2", en: "2" } },
      { label: { ro: "Dezvoltator", ru: "Девелопер", en: "Developer" }, value: { ro: "MEGAPARC SRL", ru: "MEGAPARC SRL", en: "MEGAPARC SRL" } },
    ],
    sections: [
      {
        title: { ro: "Scenarii de dezvoltare", ru: "Сценарии развития", en: "Development scenarios" },
        text: {
          ro: "Trei scenarii indicative sunt în evaluare. Conceptul recomandat în studiul de amplasament este hub-ul hibrid agro-comercial, cu retail în față și logistică în spate.",
          ru: "Рассматриваются три ориентировочных сценария. Рекомендуемая концепция по результатам исследования площадки — гибридный агро-коммерческий хаб: ритейл на фронтальной части и логистика в глубине участка.",
          en: "Three indicative scenarios are under evaluation. The concept recommended in the site study is a hybrid agro-commerce hub, with retail at the front and logistics at the rear.",
        },
        items: [
          { ro: "Retail park — orientativ 7.000–8.000 m²", ru: "Ритейл-парк — ориентировочно 7 000–8 000 м²", en: "Retail park — indicative 7,000–8,000 m²" },
          { ro: "Logistică — orientativ 8.000–9.000 m²", ru: "Логистика — ориентировочно 8 000–9 000 м²", en: "Logistics — indicative 8,000–9,000 m²" },
          { ro: "Hub hibrid agro-comercial — orientativ 7.200–8.300 m²: 3.200–3.800 m² retail în față, 4.000–4.500 m² logistică în spate", ru: "Гибридный агро-коммерческий хаб — ориентировочно 7 200–8 300 м²: 3 200–3 800 м² ритейла спереди, 4 000–4 500 м² логистики сзади", en: "Hybrid agro-commerce hub — indicative 7,200–8,300 m²: 3,200–3,800 m² retail at the front, 4,000–4,500 m² logistics at the rear" },
        ],
      },
      {
        title: { ro: "Utilizări potențiale", ru: "Потенциальные форматы", en: "Potential uses" },
        text: {
          ro: "Mixul indicativ răspunde cererii regionale pentru retail de proximitate, materiale de construcție, inputuri agricole și distribuție.",
          ru: "Ориентировочный микс отвечает региональному спросу на ритейл шаговой доступности, строительные материалы, сельскохозяйственные ресурсы и дистрибуцию.",
          en: "The indicative mix responds to regional demand for proximity retail, building materials, agricultural inputs and distribution.",
        },
        items: [
          { ro: "Supermarket · DIY / materiale de construcție · inputuri agricole", ru: "Супермаркет · DIY / стройматериалы · сельскохозяйственные ресурсы", en: "Supermarket · DIY / building materials · agricultural inputs" },
          { ro: "Farmacie / convenience · cafenea, servicii, încărcare EV", ru: "Аптека / convenience · кафе, сервисы, зарядка EV", en: "Pharmacy / convenience · café, services, EV charging" },
          { ro: "Distribuție alimentară · lanț frigorific · hub e-commerce / colete · angrosiști regionali", ru: "Дистрибуция продуктов · холодовая цепь · хаб e-commerce / посылок · региональные оптовики", en: "Food distribution · cold chain · e-commerce / parcel hub · regional wholesalers" },
        ],
      },
    ],
    disclaimer: {
      ro: "Concept în discuție. Sub rezerva verificărilor urbanistice, inginerești și comerciale (due diligence). Suprafețele sunt orientative.",
      ru: "Концепция для обсуждения. Подлежит градостроительной, инженерной и коммерческой проверке (due diligence). Площади ориентировочные.",
      en: "Concept for discussion. Subject to planning, engineering and commercial due diligence. Areas are indicative.",
    },
    statement: { ro: "Poarta orașului, gândită ca activ.", ru: "Въезд в город, задуманный как актив.", en: "A city gateway, conceived as an asset." },
  },
];

export function getProject(slug: string) {
  return developmentProjects.find((project) => project.slug === slug);
}

export function getNextProject(slug: ProjectSlug) {
  const index = developmentProjects.findIndex((project) => project.slug === slug);
  return developmentProjects[(index + 1) % developmentProjects.length];
}

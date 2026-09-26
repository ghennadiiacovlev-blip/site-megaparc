import { publicAsset, type Localized, type SiteLocale } from "@/lib/site-data";

/**
 * Public asset and project data — institutional asset profiles.
 *
 * Commercial proposals are FACT, TECHNICAL and COMMERCIAL REFERENCE sources
 * only. Their structure and tenant-specific language are not reproduced here.
 * OWNER decision: NO PUBLIC RENTAL PRICES. No €/m², rent, asking price,
 * deposits, first/last month or payment terms are stored in this file.
 * Internal financial indicators are never stored here.
 * Governance: docs/ASSET_EDITORIAL_SYSTEM.md, docs/CLAUDE_CONTENT_REVIEW.md.
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

/** Confirmed availability facts only. Never a price. */
export type AssetAvailability = {
  headline: Localized;
  area: Localized;
  from?: Localized;
};

export type AssetMedia = {
  /** Largest master derivative. */
  src: string;
  /** Card / grid derivative. */
  card: string;
  /** Portrait crop for phone heroes. */
  mobile: string;
  /** Wide editorial crop (21:9). */
  wide: string;
  position?: string;
};

export type PortfolioAsset = {
  slug: AssetSlug;
  name: string;
  district: Localized;
  city: Localized;
  media: AssetMedia | null;
  status: Localized;
  /** Short positioning line used in lists and metadata. */
  positioning: Localized;
  /** Positioning statement — the asset in one institutional sentence. */
  headline: Localized;
  /** Core narrative line. */
  narrative: Localized;
  use: Localized;
  lead: Localized;
  /** Asset story — what is this asset, why the location, how it can work. */
  story: Record<SiteLocale, string[]>;
  keyFacts: Fact[];
  location: Localized;
  connectivity: Localized[];
  map: MapLocation | null;
  building: { text: Localized; programme: Fact[]; features: Localized[] };
  operatingLogic: { text: Localized; points: Localized[] };
  character: Localized;
  relevance: Localized;
  availability: AssetAvailability | null;
  /** Conditions attached to technical claims (audit, estimates). */
  caveat: Localized | null;
};

const operating: Localized = { ro: "Activ operațional", ru: "Операционный актив", en: "Operating asset" };

function media(folder: string, base: string, position?: string): AssetMedia {
  return {
    src: publicAsset(`/assets/${folder}/${base}.webp`),
    card: publicAsset(`/assets/${folder}/${base}-card.webp`),
    mobile: publicAsset(`/assets/${folder}/${base}-mobile.webp`),
    wide: publicAsset(`/assets/${folder}/${base}-wide.webp`),
    position,
  };
}

export const portfolioAssets: PortfolioAsset[] = [
  {
    slug: "dacia-31",
    name: "Dacia 31",
    district: { ro: "Botanica", ru: "Ботаника", en: "Botanica" },
    city: { ro: "Chișinău", ru: "Кишинёв", en: "Chișinău" },
    media: media("portfolio", "dacia-31", "50% 56%"),
    status: operating,
    positioning: { ro: "Campus corporativ independent", ru: "Самостоятельный корпоративный кампус", en: "Stand-alone corporate campus" },
    headline: {
      ro: "Un campus corporativ de sine stătător.",
      ru: "Самостоятельный корпоративный кампус.",
      en: "A stand-alone corporate campus.",
    },
    narrative: {
      ro: "O clădire. Un singur mediu corporativ. Loc de creștere.",
      ru: "Одно здание. Одна корпоративная среда. Пространство для роста.",
      en: "One building. One corporate environment. Room to grow.",
    },
    use: { ro: "Birouri · sediu · campus", ru: "Офисы · штаб-квартира · кампус", en: "Offices · headquarters · campus" },
    lead: {
      ro: "Clădire independentă de 5.223 m² în Botanica, concepută pentru o singură organizație care vrea să-și controleze integral mediul de lucru: identitate, acces, planuri de etaj și infrastructură.",
      ru: "Отдельно стоящее здание площадью 5 223 м² в секторе Ботаника для одной организации, которая хочет полностью контролировать свою рабочую среду: идентичность, доступ, поэтажные планы и инфраструктуру.",
      en: "A 5,223 m² stand-alone building in Botanica, conceived for a single organisation that wants full control of its working environment: identity, access, floor plates and infrastructure.",
    },
    story: {
      ro: [
        "Dacia 31 nu este un etaj într-o clădire de birouri. Este o clădire întreagă, cu identitate proprie, într-un cartier care servește drept poartă a orașului dinspre aeroport.",
        "Platourile mari, distribuite pe patru niveluri principale și un etaj tehnic, permit unei singure companii să-și organizeze echipele, zonele de suport și spațiile comune într-un singur mediu coerent, cu posibilitatea de a crește în timp în aceeași adresă.",
        "Infrastructura clădirii există deja: utilități și instalații, tubulatură și distribuție a aerului, trasee de alimentare electrică și curenți slabi. Capacitățile exacte fac obiectul unui audit tehnic, ceea ce permite adaptarea la cerințele fiecărui utilizator.",
      ],
      ru: [
        "Dacia 31 — не этаж в офисном здании. Это целое здание с собственной идентичностью в районе, который служит въездом в город со стороны аэропорта.",
        "Крупные этажные плиты на четырёх основных уровнях и техническом этаже позволяют одной компании организовать команды, вспомогательные зоны и общие пространства в единой среде, с возможностью расти со временем по тому же адресу.",
        "Инфраструктура здания уже существует: инженерные сети и системы, воздуховоды и распределение воздуха, трассы электроснабжения и слаботочных систем. Точные мощности определяются техническим аудитом, что позволяет адаптировать здание под требования конкретного пользователя.",
      ],
      en: [
        "Dacia 31 is not a floor in an office building. It is an entire building with its own identity, in a district that serves as the city's gateway from the airport.",
        "Large floor plates across four main levels and a technical floor allow a single company to organise its teams, support areas and shared spaces in one coherent environment, with room to grow at the same address over time.",
        "The building's infrastructure already exists: utilities and building services, ductwork and air distribution, power and low-voltage cabling routes. Exact capacities are subject to a technical audit, which allows the building to be adapted to each occupier's requirements.",
      ],
    },
    keyFacts: [
      { label: { ro: "Suprafață totală", ru: "Общая площадь", en: "Total area" }, value: { ro: "5.223 m²", ru: "5 223 м²", en: "5,223 m²" } },
      { label: { ro: "Format", ru: "Формат", en: "Format" }, value: { ro: "Clădire independentă", ru: "Отдельно стоящее здание", en: "Stand-alone building" } },
      { label: { ro: "Niveluri", ru: "Уровни", en: "Levels" }, value: { ro: "Demisol + 3 etaje + etaj tehnic", ru: "Цоколь + 3 этажа + технический", en: "Lower ground + 3 floors + technical" } },
      { label: { ro: "Accese / circulații", ru: "Входы / коммуникации", en: "Entrances / circulation" }, value: { ro: "4+ posibilități", ru: "4+ варианта", en: "4+ possibilities" } },
    ],
    location: {
      ro: "Botanica este poarta de intrare în Chișinău dinspre aeroport. Activul este ancorat de arterele Dacia, Traian și Decebal, cu o promenadă pietonală amplă și restaurante, cafenele și servicii în imediata apropiere.",
      ru: "Ботаника — въезд в Кишинёв со стороны аэропорта. Объект расположен у магистралей Дачия, Траян и Дечебал, рядом с широкой пешеходной променадой, ресторанами, кафе и сервисами.",
      en: "Botanica is the gateway into Chișinău from the airport. The asset is anchored by the Dacia, Traian and Decebal arteries, with a large pedestrian promenade and restaurants, cafés and services close by.",
    },
    connectivity: [
      { ro: "Botanica, poarta de intrare în Chișinău dinspre aeroport", ru: "Ботаника — въезд в Кишинёв со стороны аэропорта", en: "Botanica, the gateway into Chișinău from the airport" },
      { ro: "Arterele urbane Dacia, Traian și Decebal", ru: "Городские магистрали Дачия, Траян и Дечебал", en: "Dacia, Traian and Decebal urban arteries" },
      { ro: "Promenadă pietonală amplă", ru: "Широкая пешеходная променада", en: "Large pedestrian promenade" },
      { ro: "Restaurante, cafenele și servicii în apropiere", ru: "Рестораны, кафе и сервисы рядом", en: "Restaurants, cafés and services nearby" },
    ],
    map: { address: "Bd. Dacia 31, Chișinău", query: "Bd. Dacia 31, Chișinău, Moldova" },
    building: {
      text: {
        ro: "Zone open-plan și spații suport pe fiecare nivel, zone vitrate, platouri mari și mai multe posibilități de circulație și acces. Programul pe niveluri permite organizarea pe departamente sau pe funcții.",
        ru: "Open-space и вспомогательные зоны на каждом уровне, остеклённые зоны, крупные этажные плиты и несколько вариантов коммуникаций и доступа. Поэтажная программа позволяет организацию по департаментам или функциям.",
        en: "Open-plan and support areas on every level, glazed zones, large floor plates and several circulation and entrance possibilities. The floor programme allows organisation by department or by function.",
      },
      programme: [
        { label: { ro: "Demisol", ru: "Цокольный этаж", en: "Lower ground floor" }, value: { ro: "1.041 m²", ru: "1 041 м²", en: "1,041 m²" } },
        { label: { ro: "Etajul 1", ru: "1-й этаж", en: "1st floor" }, value: { ro: "1.138 m²", ru: "1 138 м²", en: "1,138 m²" } },
        { label: { ro: "Etajul 2", ru: "2-й этаж", en: "2nd floor" }, value: { ro: "1.770 m²", ru: "1 770 м²", en: "1,770 m²" } },
        { label: { ro: "Etajul 3", ru: "3-й этаж", en: "3rd floor" }, value: { ro: "1.014 m²", ru: "1 014 м²", en: "1,014 m²" } },
        { label: { ro: "Etaj tehnic", ru: "Технический этаж", en: "Technical floor" }, value: { ro: "260 m²", ru: "260 м²", en: "260 m²" } },
      ],
      features: [
        { ro: "Platouri mari, pe mai multe niveluri", ru: "Крупные этажные плиты на нескольких уровнях", en: "Large floor plates across multiple levels" },
        { ro: "Zone open-plan, zone vitrate și spații suport", ru: "Open-space, остеклённые и вспомогательные зоны", en: "Open-plan, glazed and support areas" },
        { ro: "4+ posibilități de circulație și acces", ru: "4+ варианта коммуникаций и входов", en: "4+ circulation and entrance possibilities" },
        { ro: "Utilități și instalații ale clădirii existente", ru: "Существующие инженерные сети и системы здания", en: "Existing utilities and building services" },
        { ro: "Tubulatură și distribuție a aerului existente", ru: "Существующие воздуховоды и распределение воздуха", en: "Existing ductwork and air distribution" },
        { ro: "Trasee de alimentare electrică și curenți slabi", ru: "Трассы электроснабжения и слаботочных систем", en: "Power and low-voltage cabling routes" },
      ],
    },
    operatingLogic: {
      text: {
        ro: "Clădirea funcționează ca un singur organism: o companie, o identitate la fațadă, un control complet asupra accesului, securității și modului în care echipele se distribuie pe niveluri.",
        ru: "Здание работает как единый организм: одна компания, одна идентичность на фасаде, полный контроль над доступом, безопасностью и распределением команд по уровням.",
        en: "The building works as a single organism: one company, one identity on the facade, full control over access, security and how teams are distributed across levels.",
      },
      points: [
        { ro: "Sediu al unei singure companii sau campus integrat", ru: "Штаб-квартира одной компании или интегрированный кампус", en: "Single-company headquarters or integrated campus" },
        { ro: "Identitate proprie și control asupra accesului", ru: "Собственная идентичность и контроль доступа", en: "Own identity and control of access" },
        { ro: "Creștere în timp, în aceeași adresă", ru: "Рост со временем по тому же адресу", en: "Growth over time at the same address" },
      ],
    },
    character: {
      ro: "Independența este caracterul activului: nu împarte holul, fațada sau adresa cu nimeni. Este o clădire care poate purta numele unei singure organizații.",
      ru: "Характер актива — независимость: он не делит холл, фасад или адрес ни с кем. Это здание, которое может носить имя одной организации.",
      en: "Independence is the asset's character: it shares no lobby, facade or address with anyone. It is a building that can carry the name of one organisation.",
    },
    relevance: {
      ro: "Platourile mari și infrastructura existentă permit reconfigurări succesive fără a schimba clădirea; un activ care rămâne relevant pe măsură ce organizația se transformă.",
      ru: "Крупные этажные плиты и существующая инфраструктура позволяют последовательные реконфигурации без изменения здания; актив остаётся актуальным по мере трансформации организации.",
      en: "Large floor plates and existing infrastructure allow successive reconfiguration without changing the building; an asset that stays relevant as the organisation transforms.",
    },
    availability: {
      headline: {
        ro: "Întreaga proprietate este disponibilă de la 1 ianuarie 2027 pentru sediul unei singure companii sau un campus corporativ integrat.",
        ru: "Вся недвижимость доступна с 1 января 2027 года — для штаб-квартиры одной компании или интегрированного корпоративного кампуса.",
        en: "The whole property is available from 1 January 2027 for a single-company headquarters or an integrated corporate campus.",
      },
      area: { ro: "5.223 m²", ru: "5 223 м²", en: "5,223 m²" },
      from: { ro: "1 ianuarie 2027", ru: "1 января 2027", en: "1 January 2027" },
    },
    caveat: {
      ro: "Capacitățile tehnice și redundanța instalațiilor fac obiectul unui audit tehnic.",
      ru: "Технические мощности и резервирование инженерных систем определяются техническим аудитом.",
      en: "Technical capacities and the redundancy of building services are subject to a technical audit.",
    },
  },
  {
    slug: "moscova-9",
    name: "Moscova 9",
    district: { ro: "Rîșcani", ru: "Рышкань", en: "Rîșcani" },
    city: { ro: "Chișinău", ru: "Кишинёв", en: "Chișinău" },
    media: media("portfolio", "moscova-9", "50% 50%"),
    status: operating,
    positioning: { ro: "Adresă independentă de retail urban", ru: "Самостоятельный городской ритейл-адрес", en: "Independent urban retail address" },
    headline: {
      ro: "O adresă independentă de retail urban.",
      ru: "Самостоятельный городской ритейл-адрес.",
      en: "An independent urban retail address.",
    },
    narrative: {
      ro: "Fațadă, intrare, semnalistică și format: un brand își poate contura propria identitate.",
      ru: "Фасад, вход, вывеска и формат: бренд может сформировать собственную идентичность.",
      en: "Facade, entrance, signage and format: a brand can shape its own identity.",
    },
    use: { ro: "Retail · format independent", ru: "Ритейл · отдельно стоящий формат", en: "Retail · stand-alone format" },
    lead: {
      ro: "Spațiu de retail de 1.289,93 m² pe bulevardul Moscova, în afara centrelor comerciale, cu front lung, două intrări pentru clienți și flux de marfă separat.",
      ru: "Торговое помещение площадью 1 289,93 м² на бульваре Москова, вне торговых центров, с протяжённым фасадом, двумя входами для покупателей и отдельным товарным потоком.",
      en: "A 1,289.93 m² retail property on Moscova Boulevard, outside shopping centres, with a long frontage, two customer entrances and separate goods flow.",
    },
    story: {
      ro: [
        "Într-un centru comercial, un brand închiriază un spațiu. La Moscova 9, un brand primește o adresă: formatul independent îi permite să-și contureze identitatea fațadei, experiența intrării, semnalistica, parcursul clientului și configurația de operare, în cadrul tehnic și juridic convenit.",
        "Sala principală de vânzare de 737,07 m² este completată de o zonă de descărcare cu rampă și de spații suport pentru logistică, stoc, birou și pază. Fluxul de marfă este separat de fluxul clienților, astfel încât operarea nu intră în conflict cu experiența de cumpărare.",
        "Bulevardul aduce trafic auto și pietonal constant, parcare de-a lungul arterei și un bazin rezidențial dens. Vizibilitatea de prima linie transformă clădirea într-un suport de brand, nu doar într-un spațiu.",
      ],
      ru: [
        "В торговом центре бренд арендует помещение. На Moscova 9 бренд получает адрес: отдельно стоящий формат позволяет ему сформировать идентичность фасада, опыт входа, вывеску, путь покупателя и операционную конфигурацию — в рамках согласованных технических и юридических условий.",
        "Основной торговый зал площадью 737,07 м² дополнен зоной разгрузки с рампой и вспомогательными помещениями для логистики, склада, офиса и охраны. Товарный поток отделён от потока покупателей, так что эксплуатация не конфликтует с опытом покупки.",
        "Бульвар обеспечивает постоянный автомобильный и пешеходный трафик, парковку вдоль магистрали и плотный жилой массив. Видимость первой линии превращает здание в носитель бренда, а не просто в помещение.",
      ],
      en: [
        "In a shopping centre a brand rents a unit. At Moscova 9 a brand gets an address: the independent format allows it to shape its own facade identity, entrance experience, signage, customer journey and operating configuration, subject to the agreed technical and legal framework.",
        "The main sales floor of 737.07 m² is complemented by an unloading zone with ramp and support areas for logistics, stock, office and security. Goods flow is separated from customer flow, so operations never conflict with the shopping experience.",
        "The boulevard brings steady automobile and pedestrian traffic, parking along the avenue and a dense residential catchment. First-line visibility turns the building into a brand carrier, not just a space.",
      ],
    },
    keyFacts: [
      { label: { ro: "Suprafață totală", ru: "Общая площадь", en: "Total area" }, value: { ro: "1.289,93 m²", ru: "1 289,93 м²", en: "1,289.93 m²" } },
      { label: { ro: "Sală principală de vânzare", ru: "Основной торговый зал", en: "Main sales floor" }, value: { ro: "737,07 m²", ru: "737,07 м²", en: "737.07 m²" } },
      { label: { ro: "Zonă de descărcare", ru: "Зона разгрузки", en: "Loading zone" }, value: { ro: "69,46 m² · rampă", ru: "69,46 м² · рампа", en: "69.46 m² · ramp" } },
      { label: { ro: "Intrări clienți", ru: "Входы для покупателей", en: "Customer entrances" }, value: { ro: "2, dinspre bulevard", ru: "2, с бульвара", en: "2, from the boulevard" } },
    ],
    location: {
      ro: "Sectorul Rîșcani, pe bulevardul Moscova: trafic auto și pietonal constant, parcare de-a lungul bulevardului și o zonă rezidențială densă. Fațada lungă asigură vizibilitate puternică de prima linie.",
      ru: "Сектор Рышкань, бульвар Москова: постоянный автомобильный и пешеходный поток, парковка вдоль бульвара и плотная жилая застройка. Протяжённый фасад обеспечивает сильную видимость первой линии.",
      en: "Rîșcani district, on Moscova Boulevard: steady automobile and pedestrian traffic, parking along the avenue and a dense residential catchment. The long frontage gives strong first-line visibility.",
    },
    connectivity: [
      { ro: "Rîșcani, front la bulevardul Moscova", ru: "Рышкань, фасад на бульвар Москова", en: "Rîșcani, frontage on Moscova Boulevard" },
      { ro: "Trafic auto și pietonal constant", ru: "Постоянный автомобильный и пешеходный трафик", en: "Steady automobile and pedestrian traffic" },
      { ro: "Parcare de-a lungul bulevardului", ru: "Парковка вдоль бульвара", en: "Parking along the avenue" },
      { ro: "Bazin rezidențial dens", ru: "Плотный жилой массив", en: "Dense residential catchment" },
    ],
    map: { address: "Bd. Moscova 9, Chișinău", query: "Bd. Moscova 9, Chișinău, Moldova" },
    building: {
      text: {
        ro: "Format independent, în afara centrelor comerciale. Sala principală de vânzare, zona de descărcare cu rampă și spațiile suport formează un singur circuit operațional.",
        ru: "Отдельно стоящий формат вне торговых центров. Основной торговый зал, зона разгрузки с рампой и вспомогательные помещения образуют единый операционный контур.",
        en: "A stand-alone format outside shopping centres. The main sales floor, the loading zone with ramp and the support spaces form one operating circuit.",
      },
      programme: [],
      features: [
        { ro: "Front lung la bulevard, vizibilitate de prima linie", ru: "Протяжённый фасад на бульвар, видимость первой линии", en: "Long boulevard frontage, first-line visibility" },
        { ro: "Două intrări pentru clienți", ru: "Два входа для покупателей", en: "Two customer entrances" },
        { ro: "Zonă de descărcare cu rampă", ru: "Зона разгрузки с рампой", en: "Loading zone with ramp" },
        { ro: "Spații suport: logistică, stoc, birou, pază", ru: "Вспомогательные помещения: логистика, склад, офис, охрана", en: "Support spaces: logistics, stock, office, security" },
        { ro: "Parcare de-a lungul bulevardului", ru: "Парковка вдоль бульвара", en: "Parking along the avenue" },
      ],
    },
    operatingLogic: {
      text: {
        ro: "Fluxul clienților intră dinspre bulevard; fluxul de marfă intră prin rampă. Cele două nu se intersectează, iar brandul își poate configura formatul, programul și parcursul în magazin, în cadrul convenit.",
        ru: "Поток покупателей входит с бульвара; товарный поток — через рампу. Они не пересекаются, а бренд может настроить формат, режим работы и путь по магазину в рамках согласованных условий.",
        en: "Customer flow enters from the boulevard; goods flow enters via the ramp. The two never cross, and the brand can configure its format, hours and in-store journey within the agreed framework.",
      },
      points: [
        { ro: "Flux clienți separat de flux marfă", ru: "Поток покупателей отделён от товарного", en: "Customer flow separate from goods flow" },
        { ro: "Închiriere integrală sau a unei părți convenite", ru: "Аренда целиком или согласованной частью", en: "Lease as a whole or as an agreed part" },
        { ro: "Format definit de brand: flagship, showroom, retail specializat", ru: "Формат задаёт бренд: флагман, шоурум, специализированный ритейл", en: "Format set by the brand: flagship, showroom, specialist retail" },
      ],
    },
    character: {
      ro: "Independența față de centrele comerciale este caracterul activului: un brand își poate contura identitatea fațadei, experiența intrării, semnalistica, parcursul clientului și configurația de operare, în cadrul tehnic și juridic convenit.",
      ru: "Характер актива — независимость от торговых центров: бренд может сформировать идентичность фасада, опыт входа, вывеску, путь покупателя и операционную конфигурацию в рамках согласованных технических и юридических условий.",
      en: "Independence from shopping centres is the asset's character: a brand can shape its own facade identity, entrance experience, signage, customer journey and operating configuration, subject to the agreed technical and legal framework.",
    },
    relevance: {
      ro: "O adresă pe bulevard, cu circuit operațional propriu, rămâne relevantă indiferent de formatul de retail care o ocupă.",
      ru: "Адрес на бульваре с собственным операционным контуром остаётся актуальным независимо от занимающего его ритейл-формата.",
      en: "A boulevard address with its own operating circuit stays relevant whatever retail format occupies it.",
    },
    availability: {
      headline: {
        ro: "Proprietatea poate fi închiriată integral sau într-o parte convenită.",
        ru: "Помещение может быть арендовано полностью или согласованной частью.",
        en: "The property can be leased as a whole or as an agreed part.",
      },
      area: { ro: "până la 1.289,93 m²", ru: "до 1 289,93 м²", en: "up to 1,289.93 m²" },
    },
    caveat: null,
  },
  {
    slug: "moscova-20",
    name: "Moscova 20",
    district: { ro: "Rîșcani", ru: "Рышкань", en: "Rîșcani" },
    city: { ro: "Chișinău", ru: "Кишинёв", en: "Chișinău" },
    media: media("portfolio", "moscova-20", "50% 48%"),
    status: operating,
    positioning: { ro: "Retail de proximitate pe prima linie", ru: "Ритейл шаговой доступности на первой линии", en: "First-line neighbourhood retail" },
    headline: {
      ro: "Un activ de retail de proximitate construit în jurul fluxului zilnic.",
      ru: "Ритейл-актив шаговой доступности, построенный вокруг ежедневного потока.",
      en: "A neighbourhood retail asset built around daily flow.",
    },
    narrative: {
      ro: "Prima linie, un colț de bulevard, aproximativ 5.000 de pietoni pe zi.",
      ru: "Первая линия, угол бульвара, около 5 000 пешеходов в день.",
      en: "First line, a boulevard corner, around 5,000 pedestrians a day.",
    },
    use: { ro: "Retail · servicii · prima linie", ru: "Ритейл · услуги · первая линия", en: "Retail · services · first line" },
    lead: {
      ro: "Spațiu comercial de 625,7 m² la intersecția bulevardului Moscova cu strada Matei Basarab, cu front panoramic, intrare pentru clienți și acces separat de serviciu.",
      ru: "Торговое помещение площадью 625,7 м² на пересечении бульвара Москова и улицы Матей Басараб, с панорамным фасадом, входом для покупателей и отдельным служебным доступом.",
      en: "A 625.7 m² commercial property at the corner of Moscova Boulevard and Matei Basarab Street, with a panoramic frontage, a customer entrance and separate service access.",
    },
    story: {
      ro: [
        "Moscova 20 stă la un colț pe care cartierul îl traversează zilnic: transport public în apropiere, blocuri rezidențiale dense, servicii comerciale în jur și parcare dedicată. Fluxul pietonal estimat este de aproximativ 5.000 de persoane pe zi.",
        "Frontul panoramic transformă fațada într-o vitrină continuă. Intrarea clienților și accesul separat de serviciu, cu rampă, țin operarea în afara parcursului de cumpărare.",
        "Organizarea pe parter și demisol, cu 458,86 m² suprafață netă de vânzare și o terasă, permite formate diferite: retail alimentar, servicii, showroom sau retail specializat, toate construite în jurul aceluiași flux zilnic.",
      ],
      ru: [
        "Moscova 20 стоит на углу, который район пересекает ежедневно: общественный транспорт рядом, плотная жилая застройка, торговая инфраструктура вокруг и выделенная парковка. Оценочный пешеходный поток — около 5 000 человек в день.",
        "Панорамный фасад превращает витрину в непрерывную. Вход для покупателей и отдельный служебный доступ с рампой выводят эксплуатацию за пределы покупательского маршрута.",
        "Организация на первом и цокольном этажах с чистой торговой площадью 458,86 м² и террасой допускает разные форматы: продуктовый ритейл, услуги, шоурум или специализированный ритейл — всё вокруг одного ежедневного потока.",
      ],
      en: [
        "Moscova 20 stands on a corner the neighbourhood crosses every day: public transport close by, dense residential blocks, commercial amenities around and dedicated parking. Estimated pedestrian flow is around 5,000 people a day.",
        "The panoramic frontage turns the facade into a continuous shop window. The customer entrance and the separate service access with ramp keep operations out of the shopping journey.",
        "Ground and lower-ground organisation, with 458.86 m² of net sales area and a terrace, supports different formats: food retail, services, showroom or specialist retail, all built around the same daily flow.",
      ],
    },
    keyFacts: [
      { label: { ro: "Suprafață totală", ru: "Общая площадь", en: "Total area" }, value: { ro: "625,7 m²", ru: "625,7 м²", en: "625.7 m²" } },
      { label: { ro: "Suprafață netă de vânzare", ru: "Чистая торговая площадь", en: "Net sales area" }, value: { ro: "458,86 m²", ru: "458,86 м²", en: "458.86 m²" } },
      { label: { ro: "Flux pietonal (estimat)", ru: "Пешеходный поток (оценка)", en: "Pedestrian flow (estimated)" }, value: { ro: "cca. 5.000 / zi", ru: "около 5 000 / день", en: "approx. 5,000 / day" } },
      { label: { ro: "Putere electrică (aprox.)", ru: "Электрическая мощность (ок.)", en: "Electrical power (approx.)" }, value: { ro: "cca. 50 kVA", ru: "около 50 кВА", en: "approx. 50 kVA" } },
    ],
    location: {
      ro: "Sectorul Rîșcani, la intersecția bulevardului Moscova cu strada Matei Basarab: transport public în apropiere, zonă rezidențială densă, servicii comerciale în jur și parcare dedicată.",
      ru: "Сектор Рышкань, пересечение бульвара Москова и улицы Матей Басараб: общественный транспорт рядом, плотная жилая застройка, торговая инфраструктура вокруг и выделенная парковка.",
      en: "Rîșcani district, at the intersection of Moscova Boulevard and Matei Basarab Street: public transport close by, a dense residential catchment, commercial amenities around and dedicated parking.",
    },
    connectivity: [
      { ro: "Intersecția bd. Moscova cu str. Matei Basarab", ru: "Пересечение бул. Москова и ул. Матей Басараб", en: "Corner of Moscova Boulevard and Matei Basarab Street" },
      { ro: "Poziție pe prima linie", ru: "Положение на первой линии", en: "First-line position" },
      { ro: "Transport public în apropiere", ru: "Общественный транспорт рядом", en: "Public transport close by" },
      { ro: "Context rezidențial dens și parcare", ru: "Плотная жилая среда и парковка", en: "Dense residential context and parking" },
    ],
    map: { address: "Bd. Moscova 20, Chișinău", query: "Bd. Moscova 20, Chișinău, Moldova" },
    building: {
      text: {
        ro: "Parter și demisol, terasă, front panoramic. Trasee HVAC, utilități și curenți slabi existente; putere electrică disponibilă de aproximativ 50 kVA.",
        ru: "Первый и цокольный этажи, терраса, панорамный фасад. Существующие трассы HVAC, инженерных сетей и слаботочных систем; доступная мощность около 50 кВА.",
        en: "Ground and lower ground, terrace, panoramic frontage. Existing HVAC, utility and low-voltage routes; available electrical power of approximately 50 kVA.",
      },
      programme: [
        { label: { ro: "Parter", ru: "Первый этаж", en: "Ground floor" }, value: { ro: "240,96 m² · vânzare 195,46 m²", ru: "240,96 м² · торговая 195,46 м²", en: "240.96 m² · sales 195.46 m²" } },
        { label: { ro: "Demisol", ru: "Цокольный этаж", en: "Lower ground" }, value: { ro: "293,70 m² · vânzare 263,40 m²", ru: "293,70 м² · торговая 263,40 м²", en: "293.70 m² · sales 263.40 m²" } },
        { label: { ro: "Terasă", ru: "Терраса", en: "Terrace" }, value: { ro: "91,03 m²", ru: "91,03 м²", en: "91.03 m²" } },
        { label: { ro: "Înălțime utilă", ru: "Высота помещений", en: "Ceiling height" }, value: { ro: "parter cca. 2,64 m · demisol cca. 2,67 m", ru: "1-й этаж ок. 2,64 м · цоколь ок. 2,67 м", en: "ground approx. 2.64 m · lower ground approx. 2.67 m" } },
      ],
      features: [
        { ro: "Front panoramic cu potențial de branding", ru: "Панорамный фасад с потенциалом брендинга", en: "Panoramic frontage with branding potential" },
        { ro: "Intrare pentru clienți și acces separat de serviciu cu rampă", ru: "Вход для покупателей и отдельный служебный доступ с рампой", en: "Customer entrance and separate service access with ramp" },
        { ro: "Organizare pe parter și demisol", ru: "Организация на первом и цокольном этажах", en: "Ground and lower-ground organisation" },
        { ro: "Terasă", ru: "Терраса", en: "Terrace" },
        { ro: "Trasee HVAC, utilități și curenți slabi", ru: "Трассы HVAC, инженерных сетей и слаботочных систем", en: "HVAC, utility and low-voltage routes" },
      ],
    },
    operatingLogic: {
      text: {
        ro: "Activul este construit în jurul fluxului zilnic al cartierului. Clienții intră de pe colț; marfa intră prin rampă; terasa extinde spațiul spre stradă.",
        ru: "Актив построен вокруг ежедневного потока района. Покупатели входят с угла; товар — через рампу; терраса расширяет пространство к улице.",
        en: "The asset is built around the neighbourhood's daily flow. Customers enter from the corner; goods enter via the ramp; the terrace extends the space towards the street.",
      },
      points: [
        { ro: "Retail alimentar, servicii, showroom sau retail specializat", ru: "Продуктовый ритейл, услуги, шоурум или специализированный ритейл", en: "Food retail, services, showroom or specialist retail" },
        { ro: "Flux de marfă separat de fluxul clienților", ru: "Товарный поток отделён от потока покупателей", en: "Goods flow separate from customer flow" },
        { ro: "Pregătit pentru ocupare și adaptare la brand", ru: "Готов к заселению и адаптации под бренд", en: "Ready for occupation and brand adaptation" },
      ],
    },
    character: {
      ro: "Un colț de cartier cu vitrină continuă: activul aparține ritmului zilnic al străzii, nu unui centru comercial.",
      ru: "Угол района с непрерывной витриной: актив принадлежит ежедневному ритму улицы, а не торговому центру.",
      en: "A neighbourhood corner with a continuous shop window: the asset belongs to the daily rhythm of the street, not to a shopping centre.",
    },
    relevance: {
      ro: "Fluxul zilnic și poziția de colț rămân valoroase indiferent de format; activul se adaptează la ce are nevoie cartierul.",
      ru: "Ежедневный поток и угловое положение сохраняют ценность независимо от формата; актив адаптируется к потребностям района.",
      en: "Daily flow and the corner position stay valuable whatever the format; the asset adapts to what the neighbourhood needs.",
    },
    availability: {
      headline: {
        ro: "Disponibil din 17 august 2026, pregătit pentru ocupare și adaptare la brand.",
        ru: "Доступен с 17 августа 2026 года, готов к заселению и адаптации под бренд.",
        en: "Available from 17 August 2026, ready for occupation and brand adaptation.",
      },
      area: { ro: "625,7 m²", ru: "625,7 м²", en: "625.7 m²" },
      from: { ro: "17 august 2026", ru: "17 августа 2026", en: "17 August 2026" },
    },
    caveat: {
      ro: "Fluxul pietonal este o estimare. Puterea electrică este aproximativă și se confirmă tehnic.",
      ru: "Пешеходный поток — оценка. Электрическая мощность приблизительна и подтверждается технически.",
      en: "Pedestrian flow is an estimate. Electrical power is approximate and is confirmed technically.",
    },
  },
  {
    slug: "creanga-78",
    name: "Creangă 78",
    district: { ro: "Chișinău", ru: "Кишинёв", en: "Chișinău" },
    city: { ro: "Chișinău", ru: "Кишинёв", en: "Chișinău" },
    media: null,
    status: operating,
    positioning: { ro: "Activ operațional", ru: "Операционный актив", en: "Operating asset" },
    headline: { ro: "Un activ operațional în Chișinău.", ru: "Операционный актив в Кишинёве.", en: "An operating asset in Chișinău." },
    narrative: { ro: "Profil public în pregătire.", ru: "Публичный профиль готовится.", en: "Public profile in preparation." },
    use: { ro: "Comercial", ru: "Коммерческий", en: "Commercial" },
    lead: {
      ro: "Activ operațional prezentat în portofoliul MEGAPARC, în Chișinău. Profilul public detaliat va fi completat după aprobarea datelor și a fotografiei.",
      ru: "Операционный актив, представленный в портфеле MEGAPARC, в Кишинёве. Подробный публичный профиль будет дополнен после утверждения данных и фотографии.",
      en: "An operating asset presented within the MEGAPARC portfolio, in Chișinău. The detailed public profile will be completed once the underlying data and photography are approved.",
    },
    story: {
      ro: ["Creangă 78 este prezentat în portofoliul MEGAPARC ca activ operațional. Informațiile despre localizare, clădire și utilizare vor fi publicate pe măsură ce sunt aprobate."],
      ru: ["Creangă 78 представлен в портфеле MEGAPARC как операционный актив. Информация о расположении, здании и назначении будет опубликована по мере утверждения."],
      en: ["Creangă 78 is presented within the MEGAPARC portfolio as an operating asset. Information on location, building and use will be published as it is approved."],
    },
    keyFacts: [],
    location: {
      ro: "Chișinău. Informații despre localizare și acces sunt disponibile la cerere.",
      ru: "Кишинёв. Информация о расположении и доступе предоставляется по запросу.",
      en: "Chișinău. Location and access information is available on request.",
    },
    connectivity: [],
    map: null,
    building: { text: { ro: "", ru: "", en: "" }, programme: [], features: [] },
    operatingLogic: { text: { ro: "", ru: "", en: "" }, points: [] },
    character: { ro: "", ru: "", en: "" },
    relevance: { ro: "", ru: "", en: "" },
    availability: null,
    caveat: null,
  },
];

export function getAsset(slug: string) {
  return portfolioAssets.find((asset) => asset.slug === slug);
}

export function getNextAsset(slug: AssetSlug) {
  const index = portfolioAssets.findIndex((asset) => asset.slug === slug);
  return portfolioAssets[(index + 1) % portfolioAssets.length];
}

/** Assets with a confirmed, currently marketed availability (facts only, no prices). */
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
  media: AssetMedia | null;
  status: Localized;
  kind: Localized;
  /** Stage in the development narrative (index into strategy.developmentNarrative.stages). */
  stage: number;
  headline: Localized;
  lead: Localized;
  intro: Localized;
  facts: Fact[];
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
    media: media("development", "vatra", "50% 62%"),
    status: { ro: "Proiect în dezvoltare", ru: "Проект в стадии девелопмента", en: "Development project" },
    kind: { ro: "Dezvoltare", ru: "Девелопмент", en: "Development" },
    stage: 4,
    headline: { ro: "Un amplasament în lucru.", ru: "Площадка в работе.", en: "A site at work." },
    lead: {
      ro: "Proiect de dezvoltare MEGAPARC, prezentat cu imaginile reale ale amplasamentului și cu etapele aprobate pentru comunicare publică.",
      ru: "Девелоперский проект MEGAPARC, представленный с реальными снимками площадки и этапами, утверждёнными для публичной коммуникации.",
      en: "A MEGAPARC development project, presented with real site imagery and the stages approved for public communication.",
    },
    intro: {
      ro: "VATRA este privit de la început prin prisma utilizării și a valorii pe termen lung. Dezvoltarea nu se încheie la recepție: din acel moment, activul intră în faza de operare sau în următoarea etapă de investiție, conform strategiei de capital aprobate.",
      ru: "VATRA с самого начала рассматривается через призму использования и долгосрочной стоимости. Девелопмент не заканчивается вводом в эксплуатацию: с этого момента актив переходит в фазу эксплуатации или в следующий инвестиционный этап в соответствии с утверждённой стратегией капитала.",
      en: "VATRA is viewed from the outset through use and long-term value. Development does not end at handover: from that point, the asset enters its operating or next investment phase according to the approved capital strategy.",
    },
    facts: [],
    sections: [
      {
        title: { ro: "De la amplasament la activ", ru: "От площадки к активу", en: "From site to asset" },
        text: {
          ro: "Etapele proiectului urmează același ciclu de proprietate: concept, planificare, execuție și utilizare pe termen lung.",
          ru: "Этапы проекта следуют единому циклу владения: концепция, планирование, реализация и долгосрочное использование.",
          en: "The project stages follow the same ownership cycle: concept, planning, delivery and long-term use.",
        },
        items: [
          { ro: "Concept — definirea utilizării, a scării și a economiei proiectului", ru: "Концепция — определение назначения, масштаба и экономики проекта", en: "Concept — defining use, scale and the economics of the project" },
          { ro: "Planificare — proiectare, autorizare și pregătirea execuției", ru: "Планирование — проектирование, разрешения и подготовка к реализации", en: "Planning — design, permitting and preparation for delivery" },
          { ro: "Execuție — construcție, control al calității și al costului", ru: "Реализация — строительство, контроль качества и затрат", en: "Delivery — construction, quality and cost control" },
          { ro: "Operare — faza de operare sau următoarea etapă de investiție, conform strategiei de capital aprobate", ru: "Эксплуатация — фаза эксплуатации или следующий инвестиционный этап в соответствии с утверждённой стратегией капитала", en: "Operation — the operating or next investment phase according to the approved capital strategy" },
        ],
      },
    ],
    disclaimer: {
      ro: "Imaginile prezintă stadiul real al amplasamentului. Arhitectura finală nu este prezentată public înainte de aprobare.",
      ru: "Изображения показывают реальное состояние площадки. Итоговая архитектура не публикуется до утверждения.",
      en: "Imagery shows the real state of the site. Final architecture is not shown publicly before approval.",
    },
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
    media: null,
    status: { ro: "Concept de dezvoltare", ru: "Концепция развития", en: "Development concept" },
    kind: { ro: "Amplasament strategic de dezvoltare", ru: "Стратегическая площадка под развитие", en: "Strategic development site" },
    stage: 2,
    headline: { ro: "Un amplasament strategic de dezvoltare.", ru: "Стратегическая площадка под развитие.", en: "A strategic development site." },
    lead: {
      ro: "Teren de 2,0 ha (20.000 m²) pe bd. Independenței 65, Drochia, cu două fronturi stradale și vizibilitate de poartă a orașului.",
      ru: "Участок площадью 2,0 га (20 000 м²) на бул. Индепенденцей 65, Дрокия, с двумя фронтами к дорогам и «въездной» видимостью.",
      en: "A 2.0 ha (20,000 m²) site at Bd. Independenței 65, Drochia, with two road fronts and city-gateway visibility.",
    },
    intro: {
      ro: "Terenul beneficiază de expunere directă la traficul care intră în oraș și permite accesuri separate pentru clienți și pentru marfă. MEGAPARC evaluează concepte de retail, logistică și hibrid pentru acest amplasament.",
      ru: "Участок имеет прямую экспозицию к въезжающему в город трафику и позволяет организовать раздельные подъезды для покупателей и грузов. MEGAPARC рассматривает концепции ритейла, логистики и гибридного формата для этой площадки.",
      en: "The site has direct exposure to approaching traffic and allows separate customer and freight access. MEGAPARC is evaluating retail, logistics and hybrid concepts for the location.",
    },
    facts: [
      { label: { ro: "Suprafața terenului", ru: "Площадь участка", en: "Site area" }, value: { ro: "2,0 ha · 20.000 m²", ru: "2,0 га · 20 000 м²", en: "2.0 ha · 20,000 m²" } },
      { label: { ro: "Adresă", ru: "Адрес", en: "Address" }, value: { ro: "Bd. Independenței 65, Drochia", ru: "Бул. Индепенденцей 65, Дрокия", en: "Bd. Independenței 65, Drochia" } },
      { label: { ro: "Fronturi stradale", ru: "Фронты к дорогам", en: "Road fronts" }, value: { ro: "2", ru: "2", en: "2" } },
      { label: { ro: "Dezvoltator", ru: "Девелопер", en: "Developer" }, value: { ro: "MEGAPARC SRL", ru: "MEGAPARC SRL", en: "MEGAPARC SRL" } },
    ],
    sections: [
      {
        title: { ro: "Concepte în evaluare", ru: "Концепции в оценке", en: "Concepts under evaluation" },
        text: {
          ro: "Trei direcții sunt evaluate în paralel. Alegerea depinde de verificările urbanistice, inginerești și comerciale, nu de imagine.",
          ru: "Три направления оцениваются параллельно. Выбор зависит от градостроительной, инженерной и коммерческой проверки, а не от картинки.",
          en: "Three directions are being evaluated in parallel. The choice depends on planning, engineering and commercial due diligence, not on imagery.",
        },
        items: [
          { ro: "Retail park — retail de proximitate și materiale de construcție pentru regiune", ru: "Ритейл-парк — ритейл шаговой доступности и стройматериалы для региона", en: "Retail park — proximity retail and building materials for the region" },
          { ro: "Logistică — distribuție, lanț frigorific, hub regional", ru: "Логистика — дистрибуция, холодовая цепь, региональный хаб", en: "Logistics — distribution, cold chain, regional hub" },
          { ro: "Hub hibrid — retail în față, logistică în spate, pe același amplasament", ru: "Гибридный хаб — ритейл спереди, логистика сзади, на одной площадке", en: "Hybrid hub — retail at the front, logistics at the rear, on one site" },
        ],
      },
    ],
    disclaimer: {
      ro: "Concept în discuție. Sub rezerva verificărilor urbanistice, inginerești și comerciale (due diligence).",
      ru: "Концепция для обсуждения. Подлежит градостроительной, инженерной и коммерческой проверке (due diligence).",
      en: "Concept for discussion. Subject to planning, engineering and commercial due diligence.",
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

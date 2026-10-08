import type { Localized } from "@/lib/site-data";

/**
 * MEGAPARC — BUSINESS CHRONICLE (OWNER correction 2026-10-08, "HISTORY —
 * REBUILD EDITORIALLY"). Built from the OWNER source document "Draft text"
 * (Cronică de Business, RO) — not from a generic competencies narrative.
 *
 * HIERARCHY (never collapsed into one founding date):
 *   BUSINESS ORIGINS 1991 → GROUP / INVESTMENT PLATFORM 1995 → MEGAPARC 2005 →
 *   (international and diversified group 2006–2016) → STRATEGIC CONSOLIDATION
 *   2017–2020 → REAL-ESTATE FOCUS 2020 → TODAY
 *   1991 = business origins of the founders · 1995 = group investment
 *   structure (SINCE 1995) · 2005 = MEGAPARC founded · 2020 = real-estate focus.
 *   Never "MEGAPARC founded in 1991 / 1995".
 *
 * CLAIMS: superlatives and unverifiable statements of the source ("first
 * modern supermarket", "first leasing company", "first of its kind",
 * "revolutionised", "changed the rules of the market", "one of the few
 * factories", sustainability / ethical-production claims, CEFTA in 1992,
 * "35-year record", "global markets") are kept OUT of public copy and listed
 * for verification in docs/HISTORY_EDITORIAL.md. The founder's name in the
 * source's leadership text is not published (no team / leadership section).
 *
 * WORDING: editorial draft for OWNER approval (RU master; RO and EN are full
 * adaptations). Group businesses are group history — never presented as
 * current MEGAPARC assets or presence.
 */

export type HistoryScope = "group" | "megaparc";
export type EraKey = "origins" | "group" | "megaparc" | "world" | "consolidation" | "focus" | "today";
export type Sector = "retail" | "manufacturing" | "logistics" | "wine" | "investment" | "realestate" | "pharma" | "finance" | "agro" | "legal" | "horeca" | "energy" | "industry" | "ventures" | "consolidation" | "trade" | "focus";
export type HistoryImageKey = "era-retail" | "era-port" | "era-bottling" | "era-sugar" | "era-energy" | "era-distribution";

export type HistoryEntry = {
  id: string;
  year: string;
  era: EraKey;
  sector: Sector;
  scope: HistoryScope;
  /** Proper name exactly as in the source (no translation). */
  name: string;
  place: Localized;
  title: Localized;
  text: Localized;
  /** Original material the OWNER is asked for; shown as an "awaiting original" archive frame. */
  archive?: Localized;
};

export type Era = {
  key: EraKey;
  no: string;
  range: string;
  scope: HistoryScope | "both";
  label: Localized;
  title: Localized;
  lead: Localized;
  image?: HistoryImageKey;
  map?: "region" | "world";
  close?: Localized;
};

const L = (ro: string, ru: string, en: string): Localized => ({ ro, ru, en });

export const sectorLabel: Record<Sector, Localized> = {
  retail: L("Comerț", "Розница", "Retail"),
  manufacturing: L("Producție", "Производство", "Manufacturing"),
  logistics: L("Logistică", "Логистика", "Logistics"),
  wine: L("Vin", "Вино", "Wine"),
  investment: L("Investiții", "Инвестиции", "Investment"),
  realestate: L("Imobiliare", "Недвижимость", "Real estate"),
  pharma: L("Farmaceutică", "Фармацевтика", "Pharmaceuticals"),
  finance: L("Finanțe", "Финансы", "Finance"),
  agro: L("Agrobusiness", "Агробизнес", "Agribusiness"),
  legal: L("Juridic", "Право", "Legal"),
  horeca: L("HoReCa", "HoReCa", "HoReCa"),
  energy: L("Energie", "Энергетика", "Energy"),
  industry: L("Industrie", "Промышленность", "Industry"),
  ventures: L("Antreprenoriat", "Предпринимательство", "Entrepreneurship"),
  consolidation: L("Consolidare", "Консолидация", "Consolidation"),
  trade: L("Comerț exterior", "Внешняя торговля", "Trade"),
  focus: L("Imobiliare", "Недвижимость", "Real estate"),
};

/* ------------------------------------------------------------------ */
/* Eras                                                                 */
/* ------------------------------------------------------------------ */

export const eras: Era[] = [
  {
    key: "origins",
    no: "I",
    range: "1991–1994",
    scope: "group",
    label: L("Originile", "Истоки", "Origins"),
    title: L("Un magazin, o fabrică, un port.", "Магазин, фабрика, порт.", "A shop, a factory, a port."),
    lead: L(
      "Primii ani ai economiei de piață. Fondatorii încep cu ce lipsea atunci: comerț cu aprovizionare proprie, producție și logistică.",
      "Первые годы рыночной экономики. Основатели начинают с того, чего тогда не хватало: торговли с собственными поставками, производства и логистики.",
      "The first years of the market economy. The founders start with what was missing: retail with its own supply, manufacturing and logistics.",
    ),
    image: "era-retail",
    map: "region",
  },
  {
    key: "group",
    no: "II",
    range: "1995–2004",
    scope: "group",
    label: L("Grupul", "Группа", "The group"),
    title: L("O structură de investiții. Și primele imobiliare.", "Инвестиционная структура. И первая недвижимость.", "An investment structure. And the first real estate."),
    lead: L(
      "În 1995 afacerile fondatorilor sunt reunite într-o structură de investiții a grupului, care coordonează direcțiile și atrage capital. În același an, în portofoliu apar imobiliarele.",
      "В 1995 году бизнесы основателей объединяет инвестиционная структура группы: она координирует направления и привлекает капитал. В том же году в портфеле появляется недвижимость.",
      "In 1995 the founders' businesses are brought together under the group's investment structure, which coordinates them and raises capital. The same year, real estate enters the portfolio.",
    ),
    image: "era-sugar",
    close: L(
      "La mijlocul anilor 2000, afacerile ajunse la maturitate sunt vândute. Capitalul este liber pentru pasul următor.",
      "К середине 2000-х зрелые бизнесы группы проданы. Капитал свободен для следующего шага.",
      "By the mid-2000s the group's mature businesses have been sold. Capital is free for the next step.",
    ),
  },
  {
    key: "megaparc",
    no: "III",
    range: "2005",
    scope: "megaparc",
    label: L("MEGAPARC", "MEGAPARC", "MEGAPARC"),
    title: L("Este fondată MEGAPARC.", "Основана MEGAPARC.", "MEGAPARC is founded."),
    lead: L(
      "După vânzarea afacerilor mature, grupul face doi pași: relansează comerțul și fondează o companie imobiliară.",
      "После продажи зрелых бизнесов группа делает два шага: перезапускает розницу и основывает компанию недвижимости.",
      "After selling its mature businesses, the group takes two steps: it relaunches retail and founds a real-estate company.",
    ),
  },
  {
    key: "world",
    no: "IV",
    range: "2006–2016",
    scope: "group",
    label: L("Lumea", "Мир", "The world"),
    title: L("Noi domenii, noi țări.", "Новые отрасли, новые страны.", "New industries, new countries."),
    lead: L(
      "Grupul se extinde — în domenii noi și pe piețe noi: consultanță juridică, HoReCa, energie, industrie și logistică în Africa și Orientul Mijlociu, sprijin pentru antreprenori.",
      "Группа расширяется — в новые отрасли и на новые рынки: юридическая практика, HoReCa, энергетика, промышленность и логистика в Африке и на Ближнем Востоке, поддержка предпринимателей.",
      "The group expands — into new industries and new markets: legal advisory, HoReCa, energy, industry and logistics in Africa and the Middle East, support for entrepreneurs.",
    ),
    image: "era-energy",
    map: "world",
  },
  {
    key: "consolidation",
    no: "V",
    range: "2017–2020",
    scope: "group",
    label: L("Consolidarea", "Консолидация", "Consolidation"),
    title: L("Mai puține direcții. Mai mult focus.", "Меньше направлений. Больше фокуса.", "Fewer lines of business. More focus."),
    lead: L(
      "Grupul transferă afacerile mature și vinde activele necore. Ultimele proiecte de comerț și logistică leagă China, România și Europa de Est.",
      "Группа передаёт зрелые бизнесы и продаёт непрофильные активы. Последние торговые и логистические проекты связывают Китай, Румынию и Восточную Европу.",
      "The group hands over its mature businesses and sells non-core assets. The last trade and logistics projects link China, Romania and Eastern Europe.",
    ),
    image: "era-distribution",
  },
  {
    key: "focus",
    no: "VI",
    range: "2020",
    scope: "megaparc",
    label: L("Focus", "Фокус", "Focus"),
    title: L("Imobiliarele devin activitatea principală.", "Недвижимость становится главным делом.", "Real estate becomes the core business."),
    lead: L(
      "În 2020 grupul iese din logistica internațională și din comerț. Rămân imobiliarele — iar centrul lor este MEGAPARC.",
      "В 2020 году группа выходит из международной логистики и розницы. Остаётся недвижимость — и её центр, MEGAPARC.",
      "In 2020 the group exits international logistics and retail. What remains is real estate — with MEGAPARC at its centre.",
    ),
  },
  {
    key: "today",
    no: "VII",
    range: "",
    scope: "megaparc",
    label: L("Astăzi", "Сегодня", "Today"),
    title: L("Cumpărăm. Dezvoltăm. Închiriem.", "Покупаем. Развиваем. Сдаём в аренду.", "We acquire. We develop. We lease."),
    lead: L(
      "MEGAPARC cumpără imobiliare și terenuri, dezvoltă proiecte proprii și închiriază spațiile comerciale din clădirile sale. Obiectele în funcțiune sunt în Chișinău; proiectele de dezvoltare — VATRA și Drochia Gateway.",
      "MEGAPARC покупает недвижимость и землю, развивает собственные проекты и сдаёт в аренду коммерческие площади в своих зданиях. Действующие объекты — в Кишинёве; проекты развития — VATRA и Drochia Gateway.",
      "MEGAPARC buys real estate and land, develops its own projects and leases the commercial space in its buildings. Its operating properties are in Chișinău; its development projects are VATRA and Drochia Gateway.",
    ),
  },
];

/* ------------------------------------------------------------------ */
/* Entries — the chronicle                                              */
/* ------------------------------------------------------------------ */

export const entries: HistoryEntry[] = [
  // I · ORIGINS
  {
    id: "negruzzi",
    year: "1991",
    era: "origins",
    sector: "retail",
    scope: "group",
    name: "Bd. Negruzzi",
    place: L("Chișinău", "Кишинёв", "Chișinău"),
    title: L("Supermarketul de pe bulevardul Negruzzi", "Супермаркет на бульваре Негруцци", "The supermarket on Negruzzi Boulevard"),
    text: L(
      "Primul proiect al fondatorilor. Aprovizionarea a trebuit construită de la zero — într-o economie care abia trecea de la comerțul de stat la cel de piață.",
      "Первый проект основателей. Поставки приходилось выстраивать с нуля — в экономике, которая только переходила от государственной торговли к рыночной.",
      "The founders' first project. Supply had to be built from scratch — in an economy only just moving from state trade to a market.",
    ),
    archive: L("Fațada și sala supermarketului, începutul anilor 1990", "Фасад и торговый зал супермаркета, начало 1990-х", "The supermarket's facade and floor, early 1990s"),
  },
  {
    id: "modelier",
    year: "1991",
    era: "origins",
    sector: "manufacturing",
    scope: "group",
    name: "Modelier",
    place: L("Republica Moldova", "Молдова", "Moldova"),
    title: L("Fabrica de confecții Modelier", "Швейная фабрика Modelier", "The Modelier garment factory"),
    text: L(
      "Producție proprie de îmbrăcăminte, cu accent pe echipamente moderne și pe croirea economică a materialului.",
      "Собственное производство одежды — со ставкой на современное оборудование и экономный раскрой материала.",
      "In-house garment production, built on modern equipment and economical cutting of material.",
    ),
    archive: L("Atelierul Modelier, utilaje, etichete", "Цех Modelier, оборудование, этикетки", "The Modelier workshop, machines, labels"),
  },
  {
    id: "romitech",
    year: "1991",
    era: "origins",
    sector: "logistics",
    scope: "group",
    name: "Romitech",
    place: L("Portul Brăila, România", "Порт Брэила, Румыния", "Port of Brăila, Romania"),
    title: L("Romitech — hub în portul Brăila", "Romitech — хаб в порту Брэила", "Romitech — a hub in the port of Brăila"),
    text: L(
      "Primul proiect al grupului în afara Moldovei: transbordarea mărfurilor generale, legând rutele de pe Dunăre de transportul rutier și feroviar.",
      "Первый проект группы за пределами Молдовы: перевалка генеральных грузов, связка дунайских маршрутов с автомобильными и железнодорожными.",
      "The group's first project outside Moldova: transhipment of general cargo, linking Danube routes with road and rail.",
    ),
    archive: L("Cheiul și depozitele Romitech de la Brăila", "Причал и склады Romitech в Брэиле", "Romitech's quay and warehouses in Brăila"),
  },
  {
    id: "brp",
    year: "1992",
    era: "origins",
    sector: "wine",
    scope: "group",
    name: "BRP",
    place: L("Republica Moldova", "Молдова", "Moldova"),
    title: L("BRP — echipamente pentru vinificație", "BRP — оборудование для виноделия", "BRP — winemaking equipment"),
    text: L(
      "Import de echipamente și materiale pentru filtrarea, fermentarea și prelucrarea vinului — și un canal prin care vinul moldovenesc ajungea pe piețele externe.",
      "Импорт оборудования и материалов для фильтрации, ферментации и обработки вина — и канал, по которому молдавское вино уходило на внешние рынки.",
      "Importing equipment and materials for filtering, fermenting and processing wine — and a channel that took Moldovan wine to foreign markets.",
    ),
  },
  {
    id: "mi-gross",
    year: "1993",
    era: "origins",
    sector: "retail",
    scope: "group",
    name: "Mi-Gross",
    place: L("Republica Moldova", "Молдова", "Moldova"),
    title: L("Rețeaua de supermarketuri Mi-Gross", "Сеть супермаркетов Mi-Gross", "The Mi-Gross supermarket chain"),
    text: L(
      "Format de discount: rotație rapidă a stocurilor și costuri operaționale mici, pentru prețuri accesibile.",
      "Формат дискаунтера: быстрый оборот товара и низкие операционные расходы — ради доступных цен.",
      "A discount format: fast stock rotation and low operating costs, for affordable prices.",
    ),
    archive: L("Magazin Mi-Gross, anii 1990", "Магазин Mi-Gross, 1990-е", "A Mi-Gross store, 1990s"),
  },
  {
    id: "arcona",
    year: "1993",
    era: "origins",
    sector: "manufacturing",
    scope: "group",
    name: "Arcona",
    place: L("Republica Moldova", "Молдова", "Moldova"),
    title: L("Fabrica de articole din piele Arcona", "Фабрика кожаных изделий Arcona", "The Arcona leather-goods factory"),
    text: L(
      "Articole și accesorii din piele — de la prelucrarea materiei prime la produsul finit.",
      "Изделия и аксессуары из кожи — от обработки сырья до готового продукта.",
      "Leather goods and accessories — from processing the raw hide to the finished product.",
    ),
  },
  // II · GROUP
  {
    id: "holding",
    year: "1995",
    era: "group",
    sector: "investment",
    scope: "group",
    name: "",
    place: L("Chișinău", "Кишинёв", "Chișinău"),
    title: L("Se formează structura de investiții a grupului", "Создана инвестиционная структура группы", "The group's investment structure is formed"),
    text: L(
      "Un centru care coordonează toate direcțiile de afaceri și atrage capital strategic. Din acest an se numără istoria grupului — Since 1995.",
      "Центр, который координирует все направления бизнеса и привлекает стратегический капитал. С этого года отсчитывается история группы — Since 1995.",
      "A centre that coordinates every line of business and raises strategic capital. The group's history is counted from this year — Since 1995.",
    ),
  },
  {
    id: "ym-capitol",
    year: "1995",
    era: "group",
    sector: "realestate",
    scope: "group",
    name: "Y.M. Capitol",
    place: L("Chișinău", "Кишинёв", "Chișinău"),
    title: L("Y.M. Capitol — prima direcție imobiliară", "Y.M. Capitol — первое направление недвижимости", "Y.M. Capitol — the first real-estate line"),
    text: L(
      "Terenuri în punctele-cheie ale orașului, spații de birouri și comerciale.",
      "Участки в узловых точках города, офисные и торговые помещения.",
      "Plots at the city's key junctions, office and retail space.",
    ),
  },
  {
    id: "green-hills",
    year: "1995",
    era: "group",
    sector: "retail",
    scope: "group",
    name: "Green Hills Market",
    place: L("Republica Moldova", "Молдова", "Moldova"),
    title: L("Rețeaua Green Hills Market", "Сеть Green Hills Market", "The Green Hills Market chain"),
    text: L(
      "Supermarketuri de format mare și tehnologii care abia intrau pe piață: coduri de bare, depozitare frigorifică centralizată, programe de fidelizare.",
      "Супермаркеты крупного формата и технологии, которые тогда только приходили на рынок: штрихкоды, централизованные холодильные склады, программы лояльности.",
      "Large-format supermarkets and technologies just reaching the market: barcodes, centralised cold storage, loyalty programmes.",
    ),
    archive: L("Magazin Green Hills Market, anii 1990", "Магазин Green Hills Market, 1990-е", "A Green Hills Market store, 1990s"),
  },
  {
    id: "farmatrade",
    year: "1995",
    era: "group",
    sector: "pharma",
    scope: "group",
    name: "Farmatrade",
    place: L("Republica Moldova", "Молдова", "Moldova"),
    title: L("Farmatrade — distribuție farmaceutică", "Farmatrade — фармацевтическая дистрибуция", "Farmatrade — pharmaceutical distribution"),
    text: L(
      "Import de medicamente și echipamente medicale, depozite autorizate.",
      "Импорт лекарств и медицинского оборудования, лицензированные склады.",
      "Importing medicines and medical equipment, licensed warehouses.",
    ),
  },
  {
    id: "imc-leasing",
    year: "1996",
    era: "group",
    sector: "finance",
    scope: "group",
    name: "IMC Leasing",
    place: L("Republica Moldova", "Молдова", "Moldova"),
    title: L("IMC Leasing — leasing financiar", "IMC Leasing — финансовый лизинг", "IMC Leasing — financial leasing"),
    text: L(
      "Leasing pentru automobile și echipamente industriale — în anii în care creditul bancar pentru afaceri era greu accesibil.",
      "Лизинг автомобилей и промышленного оборудования — в годы, когда банковский кредит для бизнеса был труднодоступен.",
      "Leasing for vehicles and industrial equipment — in years when bank credit for business was hard to get.",
    ),
  },
  {
    id: "soiuz-agros",
    year: "1997",
    era: "group",
    sector: "agro",
    scope: "group",
    name: "Soiuz Agros-Intex",
    place: L("Republica Moldova", "Молдова", "Moldova"),
    title: L("Soiuz Agros-Intex — sistem agricol integrat", "Soiuz Agros-Intex — интегрированная агросистема", "Soiuz Agros-Intex — an integrated farm system"),
    text: L(
      "Tot ce îi trebuie fermierului, într-un singur sistem: semințe și îngrășăminte, colectarea recoltei, logistica exportului de cereale.",
      "Всё для фермера в одной системе: семена и удобрения, сбор урожая, логистика экспорта зерна.",
      "Everything a farmer needs in one system: seed and fertiliser, harvest collection, grain-export logistics.",
    ),
  },
  {
    id: "inseko",
    year: "1997",
    era: "group",
    sector: "agro",
    scope: "group",
    name: "Inseko",
    place: L("Ucraina", "Украина", "Ukraine"),
    title: L("Inseko — zahăr, ciclu complet", "Inseko — сахар полного цикла", "Inseko — sugar, full cycle"),
    text: L(
      "Cultivarea sfeclei de zahăr, procesarea industrială și vânzarea zahărului.",
      "Выращивание сахарной свёклы, промышленная переработка и продажа сахара.",
      "Growing sugar beet, industrial processing and selling the sugar.",
    ),
  },
  // III · MEGAPARC
  {
    id: "megaparc",
    year: "2005",
    era: "megaparc",
    sector: "realestate",
    scope: "megaparc",
    name: "MEGAPARC",
    place: L("Chișinău", "Кишинёв", "Chișinău"),
    title: L("MEGAPARC", "MEGAPARC", "MEGAPARC"),
    text: L(
      "Compania cumpără clădiri comerciale degradate și le transformă în spații moderne, gata de închiriat — ceea ce astăzi se numește dezvoltare brownfield.",
      "Компания покупает коммерческие здания в плохом состоянии и превращает их в современные пространства, готовые к аренде, — то, что сегодня называют brownfield-девелопментом.",
      "The company buys run-down commercial buildings and turns them into modern spaces ready to lease — what is now called brownfield development.",
    ),
  },
  {
    id: "imc-market",
    year: "2005",
    era: "megaparc",
    sector: "retail",
    scope: "group",
    name: "IMC Market",
    place: L("Republica Moldova", "Молдова", "Moldova"),
    title: L("IMC Market — comerțul revine", "IMC Market — розница возвращается", "IMC Market — retail returns"),
    text: L(
      "O nouă rețea de magazine de proximitate, construită pe experiența rețelelor anterioare.",
      "Новая сеть магазинов у дома, построенная на опыте прежних сетей.",
      "A new chain of neighbourhood stores, built on the experience of the earlier chains.",
    ),
  },
  // IV · WORLD
  {
    id: "imc-legal",
    year: "2006",
    era: "world",
    sector: "legal",
    scope: "group",
    name: "IMC Legal Advisors",
    place: L("Chișinău", "Кишинёв", "Chișinău"),
    title: L("IMC Legal Advisors", "IMC Legal Advisors", "IMC Legal Advisors"),
    text: L(
      "Asistență juridică pentru tranzacții complexe și gestionarea riscurilor — pentru portofoliul propriu și pentru parteneri externi.",
      "Юридическое сопровождение сложных сделок и управление рисками — для собственного портфеля и внешних партнёров.",
      "Legal support for complex transactions and risk control — for the group's own portfolio and for outside partners.",
    ),
  },
  {
    id: "flying-pig",
    year: "2006",
    era: "world",
    sector: "horeca",
    scope: "group",
    name: "Flying Pig",
    place: L("Chișinău", "Кишинёв", "Chișinău"),
    title: L("Flying Pig", "Flying Pig", "Flying Pig"),
    text: L("O berărie în stil bavarez și un restaurant BBQ.", "Пивоварня в баварском стиле и BBQ-ресторан.", "A Bavarian-style brewery and a BBQ restaurant."),
  },
  {
    id: "valahia",
    year: "2007",
    era: "world",
    sector: "energy",
    scope: "group",
    name: "Valahia",
    place: L("Irak", "Ирак", "Iraq"),
    title: L("Valahia — proiect energetic", "Valahia — энергетический проект", "Valahia — an energy project"),
    text: L("Explorare petrolieră și prospecțiuni geologice.", "Нефтеразведка и геологические изыскания.", "Oil exploration and geological prospecting."),
  },
  {
    id: "west-africa",
    year: "2007",
    era: "world",
    sector: "industry",
    scope: "group",
    name: "West Africa",
    place: L("Africa de Vest", "Западная Африка", "West Africa"),
    title: L("Proiecte industriale în Africa de Vest", "Промышленные проекты в Западной Африке", "Industrial projects in West Africa"),
    text: L(
      "Construcții industriale și rafinare a țițeiului — pe baza relațiilor comerciale cu parteneri din Orientul Mijlociu.",
      "Промышленное строительство и нефтепереработка — на основе торговых связей с партнёрами с Ближнего Востока.",
      "Industrial construction and crude refining — building on trade relationships with Middle Eastern partners.",
    ),
  },
  {
    id: "sdc-senegal",
    year: "2007",
    era: "world",
    sector: "logistics",
    scope: "group",
    name: "Distribution Center Senegal",
    place: L("Dakar, Senegal", "Дакар, Сенегал", "Dakar, Senegal"),
    title: L("Distribution Center Senegal", "Distribution Center Senegal", "Distribution Center Senegal"),
    text: L(
      "Un hub logistic pentru mărfuri generale la Dakar: un coridor comercial între Turcia, regiunea noastră și Africa de Vest.",
      "Логистический хаб для генеральных грузов в Дакаре: торговый коридор между Турцией, нашим регионом и Западной Африкой.",
      "A general-cargo logistics hub in Dakar: a trade corridor between Turkey, our region and West Africa.",
    ),
  },
  {
    id: "estate-industry",
    year: "2014",
    era: "world",
    sector: "ventures",
    scope: "group",
    name: "Estate Industry Group",
    place: L("Republica Moldova", "Молдова", "Moldova"),
    title: L("Estate Industry Group", "Estate Industry Group", "Estate Industry Group"),
    text: L(
      "Sprijin pentru startup-uri: nu doar capital, ci și experiență — în imobiliare și logistică.",
      "Поддержка стартапов: не только капитал, но и опыт — в недвижимости и логистике.",
      "Support for start-ups: not only capital but experience — in real estate and logistics.",
    ),
  },
  // V · CONSOLIDATION
  {
    id: "transfer",
    year: "2017–2018",
    era: "consolidation",
    sector: "consolidation",
    scope: "group",
    name: "",
    place: L("Grupul", "Группа", "The group"),
    title: L("Transferul afacerilor", "Передача бизнесов", "Handing over the businesses"),
    text: L(
      "Restructurarea activelor, transferul conducerii operaționale, vânzarea direcțiilor necore — capitalul se eliberează pentru ceva nou.",
      "Реструктуризация активов, передача операционного управления, продажа непрофильных направлений — капитал освобождается для нового.",
      "Restructuring the assets, handing over operational management, selling non-core lines — capital is freed for something new.",
    ),
  },
  {
    id: "china",
    year: "2019",
    era: "consolidation",
    sector: "trade",
    scope: "group",
    name: "China",
    place: L("China → Europa de Est", "Китай → Восточная Европа", "China → Eastern Europe"),
    title: L("Aprovizionare din China", "Поставки из Китая", "Supply from China"),
    text: L(
      "Negocieri și contracte cu producători din China; fluxuri de mărfuri spre piețele din Europa de Est.",
      "Переговоры и контракты с производителями в Китае; товарные потоки на рынки Восточной Европы.",
      "Negotiations and contracts with manufacturers in China; goods flows to Eastern European markets.",
    ),
  },
  {
    id: "romania-logistics",
    year: "2020",
    era: "consolidation",
    sector: "logistics",
    scope: "group",
    name: "Romania",
    place: L("România", "Румыния", "Romania"),
    title: L("Logistică de tranzit în România", "Транзитная логистика в Румынии", "Transit logistics in Romania"),
    text: L(
      "Depozite de tranzit: mărfurile din Asia se întâlnesc cu distribuția regională.",
      "Склады для транзита: грузы из Азии встречаются с региональной дистрибуцией.",
      "Transit warehouses where goods from Asia meet regional distribution.",
    ),
  },
  // VI · FOCUS
  {
    id: "focus-2020",
    year: "2020",
    era: "focus",
    sector: "focus",
    scope: "megaparc",
    name: "MEGAPARC",
    place: L("Republica Moldova", "Молдова", "Moldova"),
    title: L("Decizia din 2020", "Решение 2020 года", "The 2020 decision"),
    text: L(
      "Ieșirea din logistica internațională și din comerț. Resursele grupului se concentrează pe imobiliare.",
      "Выход из международной логистики и розницы. Ресурсы группы сосредоточены на недвижимости.",
      "An exit from international logistics and retail. The group's resources are concentrated on real estate.",
    ),
  },
];

/* ------------------------------------------------------------------ */
/* Era illustrations (third-party archive, CC0) — never the group's own */
/* ------------------------------------------------------------------ */

export const historyImages: Record<HistoryImageKey, { year: string; subject: Localized; page: string }> = {
  "era-retail": { year: "1967", subject: L("supermarket", "супермаркет", "supermarket"), page: "https://commons.wikimedia.org/wiki/File:Lelystad_bijna_gereed._De_supermarkt,_Bestanddeelnr_920-7407.jpg" },
  "era-port": { year: "1946", subject: L("macarale de port", "портовые краны", "port cranes"), page: "https://commons.wikimedia.org/wiki/File:Havenkranen,_Bestanddeelnr_901-7559.jpg" },
  "era-bottling": { year: "1959", subject: L("îmbuteliere", "розлив", "bottling"), page: "https://commons.wikimedia.org/wiki/File:Flessen_vullen_bij_wijnhandel_Richard_Scheid,_Bestanddeelnr_254-4238.jpg" },
  "era-sugar": { year: "1982", subject: L("campania sfeclei de zahăr", "сезон сахарной свёклы", "sugar-beet campaign"), page: "https://commons.wikimedia.org/wiki/File:Suikerbietencampagne,_Halfweg,_Bestanddeelnr_932-3141.jpg" },
  "era-energy": { year: "1955", subject: L("terminal petrolier", "нефтяной терминал", "oil terminal"), page: "https://commons.wikimedia.org/wiki/File:Geen_bijschrift_Olie_terminal._Pijpleidingen_en_afsluiters,_Bestanddeelnr_143-0980.tif" },
  "era-distribution": { year: "1971", subject: L("centru de distribuție", "распределительный центр", "distribution centre"), page: "https://commons.wikimedia.org/wiki/File:Distributiecentrum_op_het_Amstel_industriegebied_te_Amsterdam,_Bestanddeelnr_924-5661.jpg" },
};

/* ------------------------------------------------------------------ */
/* Page copy                                                            */
/* ------------------------------------------------------------------ */

export const historyCopy = {
  kicker: L("Istoric · grupul și MEGAPARC", "История · группа и MEGAPARC", "History · the group and MEGAPARC"),
  title: { ro: ["Din 1991,", "în economia reală."], ru: ["С 1991 года —", "в реальной экономике."], en: ["In the real economy", "since 1991."] },
  lead: L(
    "Comerț, producție, logistică, finanțe, agrobusiness, proiecte internaționale — și, în cele din urmă, imobiliare. Este cronica antreprenorilor din care a crescut MEGAPARC.",
    "Розница, производство, логистика, финансы, агробизнес, международные проекты — и, наконец, недвижимость. Это хроника предпринимателей, из которой выросла MEGAPARC.",
    "Retail, manufacturing, logistics, finance, agribusiness, international projects — and, finally, real estate. This is the chronicle of the entrepreneurs MEGAPARC grew out of.",
  ),
  draft: L("Variantă editorială a cronicii · formulările se aprobă de OWNER", "Редакционный вариант хроники · формулировки утверждает OWNER", "Editorial draft of the chronicle · wording subject to OWNER approval"),
  index: L("Capitole", "Главы", "Chapters"),
  chapter: L("Capitolul", "Глава", "Chapter"),
  linesTitle: L("Două linii ale aceleiași istorii.", "Две линии одной истории.", "Two lines of one story."),
  linesText: L(
    "Grupul înseamnă antreprenorii și companiile cu care totul a început în 1991; în 1995 i-a reunit o structură de investiții. MEGAPARC este compania imobiliară fondată de grup în 2005. Din 2020, imobiliarele sunt activitatea principală a grupului, iar MEGAPARC — centrul ei.",
    "Группа — это предприниматели и компании, с которых всё началось в 1991 году; в 1995-м их объединила инвестиционная структура. MEGAPARC — компания недвижимости, основанная группой в 2005 году. С 2020 года недвижимость — главное дело группы, а MEGAPARC — его центр.",
    "The group is the entrepreneurs and companies with which it all began in 1991; in 1995 an investment structure brought them together. MEGAPARC is the real-estate company the group founded in 2005. Since 2020 real estate has been the group's core business, with MEGAPARC at its centre.",
  ),
  lineGroup: L("Grupul · din 1991", "Группа · с 1991", "The group · since 1991"),
  lineHolding: L("Structura de investiții · 1995", "Инвестиционная структура · 1995", "Investment structure · 1995"),
  lineMegaparc: L("MEGAPARC · din 2005", "MEGAPARC · с 2005", "MEGAPARC · since 2005"),
  lineFocus: L("Focus pe imobiliare · din 2020", "Фокус на недвижимости · с 2020", "Real-estate focus · since 2020"),
  rule: L(
    "MEGAPARC a fost fondată în 2005. Anii de dinainte sunt istoria grupului.",
    "MEGAPARC основана в 2005 году. Годы до этого — история группы.",
    "MEGAPARC was founded in 2005. The years before are the group's history.",
  ),
  scopeGroup: L("Istoria grupului", "История группы", "Group history"),
  scopeMegaparc: L("MEGAPARC", "MEGAPARC", "MEGAPARC"),
  illustration: (subject: string, year: string, locale: "ro" | "ru" | "en") =>
    ({
      ro: `Ilustrație de epocă · ${subject}, Țările de Jos, ${year} · Nationaal Archief, CC0 · nu este din arhiva grupului`,
      ru: `Иллюстрация эпохи · ${subject}, Нидерланды, ${year} · Nationaal Archief, CC0 · не из архива группы`,
      en: `Era illustration · ${subject}, the Netherlands, ${year} · Nationaal Archief, CC0 · not from the group archive`,
    })[locale],
  archiveLabel: L("Cadru de arhivă · se așteaptă originalul", "Архивный кадр · ожидается оригинал", "Archive frame · original awaited"),
  mapRegion: L(
    "Unde a început: Chișinău și portul Brăila. Harta arată istoria grupului, nu prezența actuală a MEGAPARC.",
    "Где всё началось: Кишинёв и порт Брэила. Карта показывает историю группы, а не текущее присутствие MEGAPARC.",
    "Where it began: Chișinău and the port of Brăila. The map shows the group's history, not MEGAPARC's current presence.",
  ),
  mapWorld: L(
    "Unde a lucrat grupul în 2007–2020. Este istorie: astăzi toate obiectele MEGAPARC sunt în Republica Moldova.",
    "Где работала группа в 2007–2020 годах. Это история: сегодня все объекты MEGAPARC — в Республике Молдова.",
    "Where the group worked in 2007–2020. This is history: today all MEGAPARC properties are in the Republic of Moldova.",
  ),
  places: {
    chisinau: L("Chișinău", "Кишинёв", "Chișinău"),
    braila: L("Brăila", "Брэила", "Brăila"),
    ukraine: L("Ucraina", "Украина", "Ukraine"),
    romania: L("România", "Румыния", "Romania"),
    turkey: L("Turcia", "Турция", "Turkey"),
    iraq: L("Irak", "Ирак", "Iraq"),
    dakar: L("Dakar", "Дакар", "Dakar"),
    china: L("China", "Китай", "China"),
    blackSea: L("Marea Neagră", "Чёрное море", "Black Sea"),
  },
  megaparcStatement: {
    ro: ["Să cumperi clădirea pe care n-o vrea nimeni.", "Să faci din ea un loc unde oamenii vor să vină."],
    ru: ["Купить здание, которое никому не нужно.", "Сделать из него место, куда хотят приходить."],
    en: ["Buy the building nobody wants.", "Make it a place people want to come to."],
  },
  focusStatement: {
    ro: ["Nu mai multe domenii.", "Unul singur. Imobiliarele."],
    ru: ["Не много отраслей.", "Одна. Недвижимость."],
    en: ["Not many industries.", "One. Real estate."],
  },
  todayLinks: [
    ["/projects", L("Proiecte", "Проекты", "Projects")],
    ["/leasing", L("Închiriere", "Аренда", "Leasing")],
    ["/offer", L("Propune un obiect", "Предложить объект", "Offer a property")],
  ] as [string, Localized][],
  todayCaption: L("Obiect MEGAPARC · fotografie reală", "Объект MEGAPARC · реальная фотография", "MEGAPARC property · real photograph"),
  indexTitle: L("Toată cronica, pe o pagină.", "Вся хроника на одной странице.", "The whole chronicle on one page."),
  indexAll: L("Toate", "Все", "All"),
  closeTitle: L("Experiența din multe domenii lucrează astăzi într-unul singur.", "Опыт многих отраслей сегодня работает в одном деле.", "Experience from many industries now works in one business."),
};

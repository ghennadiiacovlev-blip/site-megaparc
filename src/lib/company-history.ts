import type { SiteLocale } from "@/lib/site-data";

/**
 * MEGAPARC company history — long-form editorial copy for About.
 *
 * RU is the OWNER-approved master copy (2026-10-07), reproduced in full and
 * verbatim; RO and EN are complete professional adaptations of it (not
 * shortened). Layout lives in src/components/pages/about.tsx.
 *
 * Public chronology rule: 1995 = group heritage, 2005 = MEGAPARC
 * established, 2020 = strategic real-estate focus. Historical projects of the
 * group (including the international ones) are group history, never current
 * MEGAPARC assets or presence. 1991 is never published.
 */

/** "Term — rest": the term is emphasised, the sentence stays intact. */
export type Term = { term: string; rest: string };

export type StoryBlock =
  | { kind: "p"; text: string; note?: string }
  | { kind: "emph"; text: string }
  | { kind: "terms"; items: Term[] }
  | { kind: "lines"; items: string[] };

export type Chapter = { label: string; title: string; body: StoryBlock[] };

export type CompanyHistory = {
  kicker: string;
  title: string[];
  index: string;
  intro: { lead: string; body: StoryBlock[]; close: string };
  heritage: Chapter & { statement: string[] };
  finance: Chapter & { statement: string[] };
  established: Chapter & { boundary: { group: string; megaparc: string }; manifesto: string[] };
  expansion: Chapter;
  international: Chapter & { period: string };
  knowhow: Chapter & { aphorism: string[] };
  consolidation: Chapter & { question: string; answerLead: string; answer: string };
  focus: Chapter & { words: string[]; statement: string[] };
  today: { label: string; title: string; subtitle: string; body: StoryBlock[]; criteria: string[]; links: [string, string][] };
  value: { label: string; title: string; body: StoryBlock[]; progression: string[]; steps: string[]; refusal: string; statement: string[] };
  closing: { title: string[]; body: StoryBlock[]; positionsLead: string; positions: Term[]; after: StoryBlock[]; audiences: string[]; next: string; contact: string; careers: string };
  alt: { hero: string; heritage: string; pause: string; stage: [string, string, string, string] };
  caption: { vatra: string; today: string };
};

/** Years and periods that are not anchors in strategy.ts (historyAnchors / historyCopy.supporting). */
export const historyPeriods = { knowhow: "2014" };

const p = (text: string, note?: string): StoryBlock => (note ? { kind: "p", text, note } : { kind: "p", text });
const emph = (text: string): StoryBlock => ({ kind: "emph", text });
const terms = (items: [string, string][]): StoryBlock => ({ kind: "terms", items: items.map(([term, rest]) => ({ term, rest })) });

/* ------------------------------------------------------------------ */
/* RU — master copy                                                     */
/* ------------------------------------------------------------------ */

const ru: CompanyHistory = {
  kicker: "История",
  title: ["Опыт,", "который привёл\u00a0нас", "к\u00a0недвижимости."],
  index: "Хронология",
  intro: {
    lead: "История MEGAPARC — это история не одного здания, не одной сделки и не одной отрасли.",
    body: [
      p("Она выросла из более чем трёх десятилетий предпринимательского опыта группы — опыта инвестиций, создания и управления бизнесами, работы с реальными активами, финансированием, производством, торговлей, агропромышленными проектами, международной логистикой и недвижимостью."),
      p("За это время менялись рынки и экономические циклы. Одни направления проходили полный путь от запуска до зрелости и выхода, другие становились источником новых компетенций. Расширялась география, усложнялись проекты, менялись инструменты инвестирования."),
      p("Но постепенно в этой разной на первый взгляд истории сформировалась одна общая логика: найти потенциал, понять экономику актива, вложить капитал, построить работающую операционную модель и увеличить его долгосрочную ценность."),
    ],
    close: "Именно эта логика в конечном счёте привела группу к недвижимости — и стала фундаментом MEGAPARC.",
  },
  heritage: {
    label: "Опыт группы",
    title: "Формирование инвестиционной платформы группы",
    body: [
      p("1995 год стал точкой, с которой сегодня начинается публичная история группы."),
      p("Была сформирована инвестиционная структура, призванная координировать несколько направлений бизнеса и работать с капиталом более системно. Уже тогда портфель не ограничивался одной отраслью: в нём сочетались недвижимость, розничная торговля и фармацевтическое направление."),
      p("В числе проектов того периода во внутренней истории группы фигурируют Y.M. Capitol, связанный с недвижимостью, Green Hills Market и фармацевтический бизнес Farmatrade."),
      p("Это был рынок, в котором многие привычные сегодня инструменты только формировались. Компании приходилось одновременно решать инвестиционные и совершенно практические задачи: искать площадки, выстраивать поставки, организовывать финансирование, создавать операционные процессы и адаптироваться к быстро меняющейся деловой среде."),
      p("Так появлялась первая важная компетенция группы — способность видеть актив не только таким, каким он является сегодня, но и таким, каким он может стать после инвестиций, правильного управления и времени."),
      p("Позднее этот принцип станет одним из центральных для MEGAPARC."),
    ],
    statement: ["Видеть возможность раньше,", "чем она становится очевидной."],
  },
  finance: {
    label: "Опыт группы",
    title: "Капитал, финансирование и реальный сектор",
    body: [
      p("Следующий этап существенно расширил управленческий опыт группы."),
      p("В 1996 году появляется IMC Leasing. Финансовый бизнес заставил смотреть на инвестиции уже не только с позиции собственника капитала, но и через способность клиента обслуживать обязательства, экономику оборудования, срок окупаемости и реальную стоимость денег во времени.", "Финансирование"),
      p("В 1997 году группа развивала агропромышленные проекты: Soiuz Agros-Intex в Молдове и Inseko в Украине. Согласно исходной хронике, деятельность охватывала различные части производственного цикла — от обеспечения аграрного производства ресурсами до переработки, сбора продукции и логистики.", "Реальный сектор"),
      p("Для будущей real estate платформы этот опыт оказался важнее, чем может показаться на первый взгляд."),
      p("Производственный или аграрный актив невозможно оценивать только по его балансовой стоимости. Нужно понимать загрузку, технологический цикл, расходы, персонал, логистику, оборотный капитал, риски и способность актива приносить денежный поток.", "Операционная экспертиза"),
      p("Точно так же спустя годы MEGAPARC будет смотреть на недвижимость."),
      emph("Здание само по себе ещё не инвестиция."),
      p("Инвестиционным активом его делают местоположение, концепция, техническое состояние, арендаторы, эксплуатация, капитальные вложения и способность объекта оставаться востребованным со временем."),
    ],
    statement: ["Объект ценен не только тем,", "сколько он стоит.", "Важно, как он работает."],
  },
  established: {
    label: "MEGAPARC · основание компании",
    title: "Появляется MEGAPARC",
    body: [
      p("В 2005 году начинается отдельная история MEGAPARC."),
      p("Это принципиально важная граница: 1995 — наследие и опыт группы, 2005 — основание MEGAPARC."),
      p("Компания создавалась вокруг недвижимости и управления активами. В исходной бизнес-хронике этого периода подход MEGAPARC описан через приобретение коммерческих объектов, требующих обновления, и их последующую трансформацию в современные пространства, готовые к дальнейшей эксплуатации и аренде."),
      p("Для компании это означало переход от простого владения недвижимостью к более активной модели."),
      terms([
        ["Сначала", " — увидеть потенциал объекта."],
        ["Затем", " — разобраться в его ограничениях: планировке, инженерии, состоянии конструкций, окружении, доступности и рыночном спросе."],
        ["После", " — определить, какие инвестиции действительно способны изменить экономику объекта."],
        ["И только затем", " — реконструировать, репозиционировать, сдавать в аренду и управлять."],
      ]),
      p("Именно в этот период начинает формироваться тот подход, который сегодня можно назвать одной из ключевых черт MEGAPARC: искать стоимость не только в момент покупки, но и создавать её в процессе владения."),
    ],
    boundary: { group: "Наследие и опыт группы", megaparc: "Основание MEGAPARC" },
    manifesto: ["Не просто купить объект.", "Не просто сделать ремонт.", "Не просто найти арендатора.", "Понять, каким этот актив должен стать, чтобы работать лучше."],
  },
  expansion: {
    label: "Опыт группы",
    title: "Новые отрасли и усложнение инвестиционной картины",
    body: [
      p("После появления MEGAPARC группа не прекратила развивать другие направления."),
      p("В 2006 году был создан IMC Legal Advisors, обеспечивавший юридическое сопровождение сложных операций и работу с рисками. В тот же период группа работала в HoReCa через проект Flying Pig."),
      p("Для корпоративной истории эти проекты важны не сами по себе."),
      p("Они показывают, как расширялся набор управленческих компетенций."),
      terms([
        ["Юридический бизнес", " — это структура сделки, договоры и защита интересов собственника."],
        ["HoReCa", " — это ежедневная операционная дисциплина, клиентский опыт и экономика каждого квадратного метра."],
        ["Финансы", " — стоимость капитала."],
        ["Производство", " — контроль затрат и технологического процесса."],
        ["Розничная торговля", " — поток людей, локация и коммерческая эффективность пространства."],
      ]),
      p("Все эти знания впоследствии оказываются непосредственно применимы к недвижимости."),
      p("Потому что современный коммерческий объект — это не только бетон, фасад и площадь."),
      emph("Это одновременно финансовый актив, операционный бизнес и пространство, которым ежедневно пользуются люди."),
    ],
  },
  international: {
    label: "Исторический опыт группы",
    period: "2007 и далее",
    title: "Международный опыт",
    body: [
      p("К концу 2000-х инвестиционный горизонт группы расширяется за пределы одного рынка."),
      p("Во внутренней хронике упоминаются энергетический проект Valahia в Ираке, инициативы в сфере промышленного строительства и переработки в Африке, а также Distribution Center Senegal — логистический проект в Дакаре, связанный с торговыми потоками между Турцией, регионом и Западной Африкой."),
      p("Для публичной истории MEGAPARC нет необходимости превращать эти проекты в демонстрацию географии присутствия — современная компания не заявляет эти рынки как текущие активы."),
      p("Их значение другое."),
      p("Работа в разных странах и деловых культурах учила оценивать риск шире: учитывать юрисдикцию, партнёров, логистику, валюту, сроки, финансирование и невозможность управлять международным проектом только из таблицы Excel."),
      emph("Международный опыт сформировал важное понимание: инвестиция должна быть понятна не только на уровне доходности, но и на уровне исполнения."),
    ],
  },
  knowhow: {
    label: "Опыт группы",
    title: "Опыт как капитал",
    body: [
      p("В 2014 году в истории группы появляется Estate Industry Group — направление, ориентированное на предпринимательские инициативы и передачу практического опыта новым проектам. Исходный материал описывает его как модель, где капитал дополнялся know-how и поддержкой предпринимателей."),
      p("Этот этап важен для понимания зрелости группы."),
      p("После почти двух десятилетий собственных проектов ценностью становится уже не только возможность инвестировать деньги."),
      p("Ценностью становится накопленный опыт: способность задавать правильные вопросы, замечать риски на раннем этапе, строить финансовую модель, организовывать исполнение и понимать, где действительно создаётся стоимость."),
      p("Для MEGAPARC это тоже стало частью подхода."),
    ],
    aphorism: ["Капитал можно привлечь.", "Опыт приходится накапливать."],
  },
  consolidation: {
    label: "Опыт группы",
    title: "Консолидация и переоценка приоритетов",
    body: [
      p("К концу 2010-х группа вошла в новый период."),
      p("Часть ранее созданных направлений достигла зрелости. Портфель начал постепенно перестраиваться: непрофильные активы сокращались, менялась структура управления, капитал высвобождался для новых задач.", "Консолидация"),
      p("Параллельно продолжалась международная торговая деятельность. Во внутренней истории этого периода отмечены работа с китайскими поставщиками и развитие логистических связей через Румынию."),
      p("Но важнейшим результатом этого периода стал не очередной новый сектор."),
      p("Наоборот — появилась необходимость сделать выбор.", "Выбор"),
      p("За предыдущие десятилетия группа попробовала множество моделей бизнеса и накопила опыт в разных странах и отраслях."),
      p("Теперь вопрос звучал иначе:"),
    ],
    question: "Где этот опыт создаёт максимальное преимущество?",
    answerLead: "Ответ постепенно становился очевидным.",
    answer: "В недвижимости.",
  },
  focus: {
    label: "MEGAPARC · стратегический фокус",
    title: "Недвижимость становится стратегическим фокусом",
    body: [
      p("2020 год стал поворотной точкой."),
      p("Группа начала уходить от модели широкой диверсификации и концентрировать ресурсы вокруг real estate."),
      p("Внутренняя история фиксирует этот период как отказ от части международных логистических и торговых операций и переход к сфокусированной работе с недвижимостью."),
      p("Но речь шла не просто о смене отрасли."),
      p("К этому моменту за плечами уже был опыт, накопленный в самых разных бизнесах."),
      terms([
        ["Финансовые услуги", " научили понимать стоимость капитала."],
        ["Розница", " — значение локации, клиентского потока и эффективности площади."],
        ["Производство", " — контролю затрат."],
        ["Логистика", " — работе со сложными цепочками и инфраструктурой."],
        ["Международные проекты", " — оценке рисков."],
        ["Управление собственными компаниями", " — тому, что результат создаётся не инвестиционным меморандумом, а ежедневным исполнением."],
      ]),
      p("В недвижимости все эти компетенции сошлись в одной точке."),
      p("И поэтому с 2020 года три направления становятся ядром MEGAPARC:"),
    ],
    words: ["Инвестиции.", "Девелопмент.", "Управление активами."],
    statement: ["Недвижимость перестала быть", "одним из направлений бизнеса.", "Она стала его центром."],
  },
  today: {
    label: "Сегодня",
    title: "MEGAPARC сегодня",
    subtitle: "От опыта группы — к сфокусированной real estate платформе",
    body: [
      p("Сегодня MEGAPARC работает с действующими коммерческими объектами, развивает новые проекты и рассматривает новые инвестиционные возможности."),
      emph("Текущий подтверждённый портфель находится в Молдове."),
      p("Здесь компания применяет тот опыт, который накапливался десятилетиями: анализирует экономику объектов, управляет арендными отношениями и эксплуатацией, планирует CAPEX, работает с банками и подрядчиками, развивает новые проекты и оценивает возможности для дальнейшего роста."),
      p("При этом инвестиционный горизонт компании не ограничивается одной страной."),
      p("MEGAPARC рассматривает возможности в недвижимости по всему миру — но не стремится создавать впечатление глобального присутствия там, где его нет."),
      p("Главный критерий другой:"),
    ],
    criteria: ["мы должны понимать актив.", "Его рынок.", "Его экономику.", "Его риски.", "И то, каким образом в нём может быть создана дополнительная стоимость."],
    links: [
      ["/portfolio", "Портфель"],
      ["/development", "Проекты развития"],
      ["/approach", "Наш подход"],
    ],
  },
  value: {
    label: "Подход",
    title: "От покупки — к созданию стоимости",
    body: [
      p("Подход MEGAPARC к недвижимости сформирован предыдущими десятилетиями предпринимательского опыта."),
      p("Поэтому компания не рассматривает объект только как строку в инвестиционной модели."),
    ],
    progression: ["Приобретение", "Реконструкция", "Концепция", "Строительство", "Арендаторы", "Эксплуатация"],
    steps: [
      "Иногда создание стоимости начинается с приобретения недвижимости по правильной цене.",
      "Иногда — с реконструкции.",
      "Иногда — с изменения концепции или состава арендаторов.",
      "Иногда — с нового строительства.",
      "Иногда — с инженерной модернизации, лучшей эксплуатации или более эффективного использования существующей площади.",
    ],
    refusal: "А иногда правильным решением становится отказ от проекта.",
    statement: ["Стоимость не появляется сама.", "Её создают решения."],
  },
  closing: {
    title: ["Опыт прошлого.", "Фокус на будущем."],
    body: [
      p("У MEGAPARC длинная предпринимательская история, но компания не стремится превращать её в каталог прежних достижений."),
      p("Прошлое важно не потому, что в нём было много компаний, отраслей или стран."),
      p("Оно важно потому, что каждый этап добавлял новую компетенцию."),
      terms([
        ["Финансы", " научили оценивать капитал."],
        ["Производство", " — контролировать исполнение."],
        ["Торговля", " — чувствовать рынок."],
        ["Логистика", " — видеть систему целиком."],
        ["Международные проекты", " — работать с риском."],
      ]),
      emph("Недвижимость объединила всё это."),
    ],
    positionsLead: "Поэтому сегодня MEGAPARC смотрит на объект одновременно с трёх позиций:",
    positions: [
      { term: "как инвестор", rest: " — через капитал и доходность;" },
      { term: "как девелопер", rest: " — через потенциал развития;" },
      { term: "как собственник", rest: " — через то, как актив будет работать завтра." },
    ],
    after: [p("Актив должен выдерживать не только инвестиционную презентацию."), p("Он должен работать в реальной жизни.")],
    audiences: ["Для арендаторов.", "Для бизнеса.", "Для города.", "Для собственника."],
    next: "Именно на этом опыте строится следующий этап MEGAPARC.",
    contact: "Обсудить партнёрство",
    careers: "Карьера в MEGAPARC",
  },
  alt: {
    hero: "Современная архитектура — монохромный кадр",
    heritage: "Бетонная башня — архитектурная деталь",
    pause: "Фасад высотного здания — вид снизу",
    stage: ["Архитектура смешанного назначения — монохромный кадр", "Контейнерный терминал — вид сверху", "Спиральная конструкция — вид снизу", "Перфорированный фасад ночью"],
  },
  caption: { vatra: "проект развития", today: "объект текущего портфеля" },
};

/* ------------------------------------------------------------------ */
/* RO — complete adaptation                                             */
/* ------------------------------------------------------------------ */

const ro: CompanyHistory = {
  kicker: "Istoric",
  title: ["Experiența", "care ne-a condus", "spre imobiliare."],
  index: "Cronologie",
  intro: {
    lead: "Povestea MEGAPARC nu este povestea unei singure clădiri, a unei singure tranzacții sau a unui singur domeniu.",
    body: [
      p("Ea s-a format din peste trei decenii de experiență antreprenorială a grupului — experiență în investiții, în crearea și conducerea afacerilor, în lucrul cu active reale, finanțare, producție, comerț, proiecte agroindustriale, logistică internațională și imobiliare."),
      p("În acest timp s-au schimbat piețele și ciclurile economice. Unele direcții au parcurs întregul drum, de la lansare la maturitate și ieșire, altele au devenit sursa unor competențe noi. Geografia s-a extins, proiectele au devenit mai complexe, iar instrumentele de investiție s-au schimbat."),
      p("Treptat însă, în această istorie aparent diversă s-a conturat o logică comună: să găsești potențialul, să înțelegi economia activului, să investești capital, să construiești un model operațional care funcționează și să-i crești valoarea pe termen lung."),
    ],
    close: "Tocmai această logică a condus, în cele din urmă, grupul spre imobiliare — și a devenit fundamentul MEGAPARC.",
  },
  heritage: {
    label: "Experiența grupului",
    title: "Formarea platformei de investiții a grupului",
    body: [
      p("Anul 1995 este punctul de la care începe astăzi istoria publică a grupului."),
      p("A fost creată o structură de investiții menită să coordoneze mai multe direcții de afaceri și să lucreze cu capitalul într-un mod mai sistematic. Încă de atunci portofoliul nu se limita la un singur domeniu: reunea imobiliare, comerț cu amănuntul și o direcție farmaceutică."),
      p("Printre proiectele acelei perioade, istoria internă a grupului menționează Y.M. Capitol, legat de imobiliare, Green Hills Market și afacerea farmaceutică Farmatrade."),
      p("Era o piață în care multe dintre instrumentele obișnuite astăzi abia se formau. Compania trebuia să rezolve simultan sarcini investiționale și sarcini cât se poate de practice: să caute amplasamente, să construiască aprovizionarea, să organizeze finanțarea, să creeze procese operaționale și să se adapteze la un mediu de afaceri în schimbare rapidă."),
      p("Așa a apărut prima competență importantă a grupului — capacitatea de a vedea un activ nu doar așa cum este astăzi, ci și așa cum poate deveni după investiții, o administrare corectă și timp."),
      p("Mai târziu, acest principiu va deveni unul dintre principiile centrale ale MEGAPARC."),
    ],
    statement: ["Să vezi oportunitatea", "înainte ca ea să devină evidentă."],
  },
  finance: {
    label: "Experiența grupului",
    title: "Capital, finanțare și economia reală",
    body: [
      p("Etapa următoare a extins considerabil experiența managerială a grupului."),
      p("În 1996 apare IMC Leasing. Afacerea financiară a obligat grupul să privească investițiile nu doar din poziția proprietarului de capital, ci și prin capacitatea clientului de a-și onora obligațiile, prin economia echipamentelor, termenul de recuperare și valoarea reală a banilor în timp.", "Finanțare"),
      p("În 1997 grupul dezvolta proiecte agroindustriale: Soiuz Agros-Intex în Moldova și Inseko în Ucraina. Potrivit cronicii inițiale, activitatea acoperea diferite părți ale ciclului de producție — de la aprovizionarea producției agricole cu resurse până la procesare, colectarea producției și logistică.", "Economia reală"),
      p("Pentru viitoarea platformă imobiliară, această experiență s-a dovedit mai importantă decât ar părea la prima vedere."),
      p("Un activ industrial sau agricol nu poate fi evaluat doar după valoarea sa contabilă. Trebuie înțelese gradul de utilizare, ciclul tehnologic, costurile, personalul, logistica, capitalul de lucru, riscurile și capacitatea activului de a genera flux de numerar.", "Expertiză operațională"),
      p("Exact la fel, peste ani, MEGAPARC va privi imobiliarele."),
      emph("O clădire, în sine, nu este încă o investiție."),
      p("O transformă în activ investițional locația, concepția, starea tehnică, chiriașii, exploatarea, investițiile de capital și capacitatea obiectului de a rămâne căutat în timp."),
    ],
    statement: ["Valoarea unui obiect nu stă doar", "în cât costă.", "Contează cum funcționează."],
  },
  established: {
    label: "MEGAPARC · fondarea companiei",
    title: "Apare MEGAPARC",
    body: [
      p("În 2005 începe istoria proprie a MEGAPARC."),
      p("Este o delimitare esențială: 1995 — moștenirea și experiența grupului, 2005 — fondarea MEGAPARC."),
      p("Compania a fost creată în jurul imobiliarelor și al administrării activelor. În cronica de afaceri inițială a acestei perioade, abordarea MEGAPARC este descrisă prin achiziția unor obiecte comerciale care aveau nevoie de renovare și transformarea lor ulterioară în spații moderne, pregătite pentru exploatare și închiriere."),
      p("Pentru companie, aceasta a însemnat trecerea de la simpla deținere de imobiliare la un model mai activ."),
      terms([
        ["Mai întâi", " — să vezi potențialul obiectului."],
        ["Apoi", " — să-i înțelegi limitele: planificarea, instalațiile, starea structurii, vecinătatea, accesibilitatea și cererea de pe piață."],
        ["După aceea", " — să stabilești ce investiții pot schimba cu adevărat economia obiectului."],
        ["Și abia apoi", " — să reconstruiești, să repoziționezi, să închiriezi și să administrezi."],
      ]),
      p("Tocmai în această perioadă începe să se formeze abordarea care astăzi poate fi numită una dintre trăsăturile esențiale ale MEGAPARC: să cauți valoarea nu doar în momentul cumpărării, ci să o creezi pe durata deținerii."),
    ],
    boundary: { group: "Moștenirea și experiența grupului", megaparc: "Fondarea MEGAPARC" },
    manifesto: ["Nu doar să cumperi un obiect.", "Nu doar să faci o renovare.", "Nu doar să găsești un chiriaș.", "Să înțelegi ce trebuie să devină acest activ pentru a funcționa mai bine."],
  },
  expansion: {
    label: "Experiența grupului",
    title: "Domenii noi și o imagine investițională mai complexă",
    body: [
      p("După apariția MEGAPARC, grupul nu a încetat să dezvolte alte direcții."),
      p("În 2006 a fost creat IMC Legal Advisors, care asigura asistența juridică a operațiunilor complexe și lucrul cu riscurile. În aceeași perioadă, grupul a activat în HoReCa prin proiectul Flying Pig."),
      p("Pentru istoria corporativă, aceste proiecte nu sunt importante în sine."),
      p("Ele arată cum s-a extins setul de competențe manageriale."),
      terms([
        ["Afacerea juridică", " înseamnă structura tranzacției, contractele și protecția intereselor proprietarului."],
        ["HoReCa", " înseamnă disciplină operațională zilnică, experiența clientului și economia fiecărui metru pătrat."],
        ["Finanțele", " — costul capitalului."],
        ["Producția", " — controlul costurilor și al procesului tehnologic."],
        ["Comerțul cu amănuntul", " — fluxul de oameni, locația și eficiența comercială a spațiului."],
      ]),
      p("Toate aceste cunoștințe se dovedesc ulterior direct aplicabile în imobiliare."),
      p("Pentru că un obiect comercial modern nu înseamnă doar beton, fațadă și suprafață."),
      emph("Este, în același timp, un activ financiar, o afacere operațională și un spațiu pe care oamenii îl folosesc zilnic."),
    ],
  },
  international: {
    label: "Experiența istorică a grupului",
    period: "Din 2007",
    title: "Experiența internațională",
    body: [
      p("Spre sfârșitul anilor 2000, orizontul investițional al grupului se extinde dincolo de o singură piață."),
      p("Cronica internă menționează proiectul energetic Valahia în Irak, inițiative de construcții industriale și procesare în Africa, precum și Distribution Center Senegal — un proiect logistic în Dakar, legat de fluxurile comerciale dintre Turcia, regiune și Africa de Vest."),
      p("Pentru istoria publică a MEGAPARC nu este nevoie ca aceste proiecte să devină o demonstrație a prezenței geografice — compania de astăzi nu declară aceste piețe drept active curente."),
      p("Semnificația lor este alta."),
      p("Munca în țări și culturi de afaceri diferite a învățat grupul să evalueze riscul mai larg: să țină cont de jurisdicție, parteneri, logistică, valută, termene, finanțare și de imposibilitatea de a conduce un proiect internațional doar dintr-un tabel Excel."),
      emph("Experiența internațională a format o înțelegere importantă: o investiție trebuie să fie clară nu doar la nivelul randamentului, ci și la nivelul execuției."),
    ],
  },
  knowhow: {
    label: "Experiența grupului",
    title: "Experiența ca și capital",
    body: [
      p("În 2014 apare în istoria grupului Estate Industry Group — o direcție orientată spre inițiative antreprenoriale și transferul experienței practice către proiecte noi. Materialul inițial o descrie ca pe un model în care capitalul era completat de know-how și de sprijinul acordat antreprenorilor."),
      p("Această etapă este importantă pentru a înțelege maturitatea grupului."),
      p("După aproape două decenii de proiecte proprii, valoarea nu mai stă doar în posibilitatea de a investi bani."),
      p("Valoarea devine experiența acumulată: capacitatea de a pune întrebările potrivite, de a observa riscurile din timp, de a construi un model financiar, de a organiza execuția și de a înțelege unde se creează cu adevărat valoarea."),
      p("Pentru MEGAPARC, și acest lucru a devenit parte a abordării."),
    ],
    aphorism: ["Capitalul poate fi atras.", "Experiența trebuie acumulată."],
  },
  consolidation: {
    label: "Experiența grupului",
    title: "Consolidare și reevaluarea priorităților",
    body: [
      p("Spre sfârșitul anilor 2010, grupul a intrat într-o perioadă nouă."),
      p("O parte dintre direcțiile create anterior ajunseseră la maturitate. Portofoliul a început să se restructureze treptat: activele non-core se reduceau, structura de conducere se schimba, iar capitalul se elibera pentru sarcini noi.", "Consolidare"),
      p("În paralel a continuat activitatea comercială internațională. Istoria internă a acestei perioade consemnează colaborarea cu furnizori din China și dezvoltarea legăturilor logistice prin România."),
      p("Dar cel mai important rezultat al acestei perioade nu a fost încă un sector nou."),
      p("Dimpotrivă — a apărut nevoia de a face o alegere.", "Alegere"),
      p("În deceniile anterioare, grupul încercase numeroase modele de afaceri și acumulase experiență în diferite țări și domenii."),
      p("Acum întrebarea suna altfel:"),
    ],
    question: "Unde creează această experiență cel mai mare avantaj?",
    answerLead: "Răspunsul devenea treptat evident.",
    answer: "În imobiliare.",
  },
  focus: {
    label: "MEGAPARC · focus strategic",
    title: "Imobiliarele devin focusul strategic",
    body: [
      p("Anul 2020 a fost un punct de cotitură."),
      p("Grupul a început să renunțe la modelul diversificării largi și să-și concentreze resursele în jurul imobiliarelor."),
      p("Istoria internă consemnează această perioadă ca renunțarea la o parte dintre operațiunile internaționale de logistică și comerț și trecerea la o activitate concentrată pe imobiliare."),
      p("Dar nu era vorba doar despre schimbarea domeniului."),
      p("Până atunci, grupul avea deja în spate experiența acumulată în cele mai diverse afaceri."),
      terms([
        ["Serviciile financiare", " au învățat grupul să înțeleagă costul capitalului."],
        ["Retailul", " — importanța locației, a fluxului de clienți și a eficienței suprafeței."],
        ["Producția", " — controlul costurilor."],
        ["Logistica", " — lucrul cu lanțuri complexe și infrastructură."],
        ["Proiectele internaționale", " — evaluarea riscurilor."],
        ["Conducerea propriilor companii", " — faptul că rezultatul nu este creat de un memorandum de investiții, ci de execuția de zi cu zi."],
      ]),
      p("În imobiliare, toate aceste competențe s-au întâlnit într-un singur punct."),
      p("De aceea, din 2020, trei direcții devin nucleul MEGAPARC:"),
    ],
    words: ["Investiții.", "Dezvoltare.", "Administrarea activelor."],
    statement: ["Imobiliarele nu mai sunt", "una dintre direcțiile afacerii.", "Au devenit centrul ei."],
  },
  today: {
    label: "Astăzi",
    title: "MEGAPARC astăzi",
    subtitle: "De la experiența grupului — la o platformă imobiliară concentrată",
    body: [
      p("Astăzi MEGAPARC lucrează cu obiecte comerciale în funcțiune, dezvoltă proiecte noi și analizează noi oportunități de investiții."),
      emph("Portofoliul actual confirmat se află în Moldova."),
      p("Aici compania aplică experiența acumulată de-a lungul deceniilor: analizează economia obiectelor, administrează relațiile de închiriere și exploatarea, planifică CAPEX, lucrează cu băncile și antreprenorii, dezvoltă proiecte noi și evaluează oportunitățile de creștere."),
      p("În același timp, orizontul investițional al companiei nu se limitează la o singură țară."),
      p("MEGAPARC analizează oportunități imobiliare în întreaga lume — dar nu urmărește să creeze impresia unei prezențe globale acolo unde aceasta nu există."),
      p("Criteriul principal este altul:"),
    ],
    criteria: ["trebuie să înțelegem activul.", "Piața lui.", "Economia lui.", "Riscurile lui.", "Și modul în care în el poate fi creată valoare suplimentară."],
    links: [
      ["/portfolio", "Portofoliu"],
      ["/development", "Proiecte de dezvoltare"],
      ["/approach", "Abordarea noastră"],
    ],
  },
  value: {
    label: "Abordare",
    title: "De la cumpărare — la crearea valorii",
    body: [
      p("Abordarea MEGAPARC față de imobiliare a fost formată de deceniile anterioare de experiență antreprenorială."),
      p("De aceea compania nu privește un obiect doar ca pe un rând dintr-un model investițional."),
    ],
    progression: ["Achiziție", "Reconstrucție", "Concepție", "Construcție", "Chiriași", "Exploatare"],
    steps: [
      "Uneori crearea valorii începe cu achiziția unui imobil la prețul potrivit.",
      "Uneori — cu reconstrucția.",
      "Uneori — cu schimbarea concepției sau a componenței chiriașilor.",
      "Uneori — cu o construcție nouă.",
      "Uneori — cu modernizarea instalațiilor, o exploatare mai bună sau o utilizare mai eficientă a suprafeței existente.",
    ],
    refusal: "Iar uneori decizia corectă este renunțarea la proiect.",
    statement: ["Valoarea nu apare de la sine.", "O creează deciziile."],
  },
  closing: {
    title: ["Experiența trecutului.", "Focus pe viitor."],
    body: [
      p("MEGAPARC are o istorie antreprenorială lungă, dar compania nu urmărește să o transforme într-un catalog al realizărilor de odinioară."),
      p("Trecutul contează nu pentru că a cuprins multe companii, domenii sau țări."),
      p("Contează pentru că fiecare etapă a adăugat o competență nouă."),
      terms([
        ["Finanțele", " ne-au învățat să evaluăm capitalul."],
        ["Producția", " — să controlăm execuția."],
        ["Comerțul", " — să simțim piața."],
        ["Logistica", " — să vedem sistemul în întregime."],
        ["Proiectele internaționale", " — să lucrăm cu riscul."],
      ]),
      emph("Imobiliarele au unit toate acestea."),
    ],
    positionsLead: "De aceea, astăzi MEGAPARC privește un obiect simultan din trei poziții:",
    positions: [
      { term: "ca investitor", rest: " — prin capital și randament;" },
      { term: "ca dezvoltator", rest: " — prin potențialul de dezvoltare;" },
      { term: "ca proprietar", rest: " — prin felul în care activul va funcționa mâine." },
    ],
    after: [p("Un activ trebuie să reziste nu doar unei prezentări investiționale."), p("Trebuie să funcționeze în viața reală.")],
    audiences: ["Pentru chiriași.", "Pentru afaceri.", "Pentru oraș.", "Pentru proprietar."],
    next: "Pe această experiență se construiește următoarea etapă a MEGAPARC.",
    contact: "Discută un parteneriat",
    careers: "Cariere la MEGAPARC",
  },
  alt: {
    hero: "Arhitectură contemporană — imagine monocromă",
    heritage: "Turn din beton — detaliu arhitectural",
    pause: "Fațada unei clădiri înalte — vedere de jos",
    stage: ["Arhitectură cu funcțiuni mixte — imagine monocromă", "Terminal de containere — vedere de sus", "Structură în spirală — vedere de jos", "Fațadă perforată noaptea"],
  },
  caption: { vatra: "proiect de dezvoltare", today: "obiect din portofoliul actual" },
};

/* ------------------------------------------------------------------ */
/* EN — complete adaptation                                             */
/* ------------------------------------------------------------------ */

const en: CompanyHistory = {
  kicker: "History",
  title: ["The experience", "that led us", "to real estate."],
  index: "Chronology",
  intro: {
    lead: "The MEGAPARC story is not the story of one building, one deal or one industry.",
    body: [
      p("It grew out of more than three decades of the group's entrepreneurial experience — in investment, in building and running businesses, and in working with real assets, financing, manufacturing, trade, agro-industrial projects, international logistics and real estate."),
      p("Over that time, markets and economic cycles changed. Some ventures went the full distance from launch to maturity and exit; others became a source of new capabilities. The geography widened, projects grew more complex and the tools of investment changed."),
      p("Yet gradually, a single logic took shape in this seemingly varied story: find the potential, understand the economics of the asset, commit capital, build an operating model that works and increase its long-term value."),
    ],
    close: "It was this logic that ultimately led the group to real estate — and became the foundation of MEGAPARC.",
  },
  heritage: {
    label: "Group experience",
    title: "Building the group's investment platform",
    body: [
      p("1995 is the point from which the group's public history begins today."),
      p("An investment structure was formed to coordinate several lines of business and to manage capital more systematically. Even then the portfolio was not confined to one industry: it combined real estate, retail and a pharmaceutical business."),
      p("Among the projects of that period, the group's internal history lists Y.M. Capitol, linked to real estate, Green Hills Market and the pharmaceutical business Farmatrade."),
      p("It was a market in which many of today's familiar tools were only taking shape. The company had to solve investment questions and entirely practical ones at the same time: finding sites, building supply chains, arranging financing, creating operating processes and adapting to a fast-changing business environment."),
      p("This is how the group's first important capability emerged: the ability to see an asset not only as it is today, but as it can become after investment, the right management and time."),
      p("Later, this principle would become one of the central ones for MEGAPARC."),
    ],
    statement: ["Seeing an opportunity", "before it becomes obvious."],
  },
  finance: {
    label: "Group experience",
    title: "Capital, financing and the real economy",
    body: [
      p("The next stage substantially broadened the group's management experience."),
      p("In 1996 IMC Leasing appears. A financial business made the group look at investment not only from the position of a capital owner, but also through the client's ability to service obligations, the economics of equipment, the payback period and the real time value of money.", "Financing"),
      p("In 1997 the group was developing agro-industrial projects: Soiuz Agros-Intex in Moldova and Inseko in Ukraine. According to the original chronicle, the business covered different parts of the production cycle — from supplying agricultural production with resources to processing, harvesting and logistics.", "Real economy"),
      p("For the future real estate platform, this experience proved more important than it might seem at first sight."),
      p("A manufacturing or agricultural asset cannot be judged by its book value alone. You need to understand utilisation, the technological cycle, costs, people, logistics, working capital, risks and the asset's ability to generate cash flow.", "Operating expertise"),
      p("Years later, MEGAPARC would look at real estate in exactly the same way."),
      emph("A building on its own is not yet an investment."),
      p("What makes it an investment asset is its location, concept, technical condition, tenants, operation, capital expenditure and the property's ability to stay in demand over time."),
    ],
    statement: ["A property is not valued only", "by what it costs.", "What matters is how it works."],
  },
  established: {
    label: "MEGAPARC · the company begins",
    title: "MEGAPARC arrives",
    body: [
      p("In 2005 MEGAPARC's own story begins."),
      p("This is a fundamental line: 1995 is the group's heritage and experience; 2005 is the beginning of MEGAPARC."),
      p("The company was built around real estate and asset management. The original business chronicle of the period describes the MEGAPARC approach as acquiring commercial properties in need of renewal and then transforming them into modern spaces ready for operation and leasing."),
      p("For the company, this meant moving from simply owning real estate to a more active model."),
      terms([
        ["First", " — see the potential of the property."],
        ["Then", " — understand its constraints: layout, building services, structural condition, surroundings, access and market demand."],
        ["Next", " — decide which investments can genuinely change the economics of the property."],
        ["And only then", " — rebuild, reposition, lease and manage."],
      ]),
      p("It was in this period that an approach began to form which today can be called one of MEGAPARC's defining traits: looking for value not only at the moment of purchase, but creating it throughout ownership."),
    ],
    boundary: { group: "Group heritage and experience", megaparc: "The beginning of MEGAPARC" },
    manifesto: ["Not just buying a property.", "Not just renovating it.", "Not just finding a tenant.", "Understanding what this asset must become to work better."],
  },
  expansion: {
    label: "Group experience",
    title: "New industries and a more complex investment picture",
    body: [
      p("After MEGAPARC appeared, the group did not stop developing other lines of business."),
      p("In 2006 IMC Legal Advisors was created, providing legal support for complex transactions and risk work. In the same period the group operated in HoReCa through the Flying Pig project."),
      p("For the corporate history, these projects do not matter in themselves."),
      p("They show how the set of management capabilities expanded."),
      terms([
        ["A legal business", " means deal structure, contracts and protecting the owner's interests."],
        ["HoReCa", " means daily operating discipline, customer experience and the economics of every square metre."],
        ["Finance", " — the cost of capital."],
        ["Manufacturing", " — control of costs and of the technological process."],
        ["Retail", " — footfall, location and the commercial efficiency of space."],
      ]),
      p("All of this knowledge later proves directly applicable to real estate."),
      p("Because a modern commercial property is not just concrete, a facade and floor area."),
      emph("It is at once a financial asset, an operating business and a space that people use every day."),
    ],
  },
  international: {
    label: "The group's historical experience",
    period: "2007 onwards",
    title: "International experience",
    body: [
      p("By the end of the 2000s, the group's investment horizon extends beyond a single market."),
      p("The internal chronicle mentions the Valahia energy project in Iraq, industrial construction and processing initiatives in Africa, and Distribution Center Senegal — a logistics project in Dakar linked to trade flows between Turkey, the region and West Africa."),
      p("MEGAPARC's public history has no need to turn these projects into a display of geographic presence — today's company does not present these markets as current assets."),
      p("Their significance lies elsewhere."),
      p("Working across countries and business cultures taught the group to assess risk more broadly: to weigh jurisdiction, partners, logistics, currency, timing, financing — and the impossibility of running an international project from an Excel spreadsheet alone."),
      emph("International experience built an important understanding: an investment must make sense not only at the level of returns, but at the level of execution."),
    ],
  },
  knowhow: {
    label: "Group experience",
    title: "Experience as capital",
    body: [
      p("In 2014 Estate Industry Group appears in the group's history — a venture focused on entrepreneurial initiatives and on passing practical experience to new projects. The original material describes it as a model in which capital was complemented by know-how and support for entrepreneurs."),
      p("This stage matters for understanding the group's maturity."),
      p("After almost two decades of its own projects, the value no longer lies only in the ability to invest money."),
      p("The value becomes accumulated experience: the ability to ask the right questions, spot risks early, build a financial model, organise execution and understand where value is really created."),
      p("For MEGAPARC, this too became part of the approach."),
    ],
    aphorism: ["Capital can be raised.", "Experience has to be built up."],
  },
  consolidation: {
    label: "Group experience",
    title: "Consolidation and a review of priorities",
    body: [
      p("By the end of the 2010s, the group had entered a new period."),
      p("Some of the ventures created earlier had reached maturity. The portfolio began to be restructured step by step: non-core assets were reduced, the management structure changed and capital was released for new tasks.", "Consolidation"),
      p("In parallel, international trading continued. The internal history of the period records work with Chinese suppliers and the development of logistics links through Romania."),
      p("But the most important outcome of this period was not yet another new sector."),
      p("On the contrary — there was a need to make a choice.", "Choice"),
      p("Over the previous decades the group had tried many business models and gained experience across countries and industries."),
      p("Now the question was different:"),
    ],
    question: "Where does this experience create the greatest advantage?",
    answerLead: "The answer gradually became clear.",
    answer: "In real estate.",
  },
  focus: {
    label: "MEGAPARC · strategic focus",
    title: "Real estate becomes the strategic focus",
    body: [
      p("2020 was a turning point."),
      p("The group began to move away from broad diversification and to concentrate its resources on real estate."),
      p("The internal history records this period as stepping back from part of the international logistics and trading operations and moving to focused work in real estate."),
      p("But this was not simply a change of industry."),
      p("By then the group already had behind it experience gathered in the most varied businesses."),
      terms([
        ["Financial services", " taught the group to understand the cost of capital."],
        ["Retail", " — the importance of location, customer flow and the efficiency of space."],
        ["Manufacturing", " — cost control."],
        ["Logistics", " — working with complex chains and infrastructure."],
        ["International projects", " — risk assessment."],
        ["Running its own companies", " — that results are created not by an investment memorandum but by everyday execution."],
      ]),
      p("In real estate, all of these capabilities came together at a single point."),
      p("That is why, from 2020, three disciplines became the core of MEGAPARC:"),
    ],
    words: ["Investment.", "Development.", "Asset management."],
    statement: ["Real estate stopped being", "one line of the business.", "It became its centre."],
  },
  today: {
    label: "Today",
    title: "MEGAPARC today",
    subtitle: "From the group's experience to a focused real estate platform",
    body: [
      p("Today MEGAPARC works with operating commercial properties, develops new projects and considers new investment opportunities."),
      emph("Its current confirmed portfolio is in Moldova."),
      p("Here the company applies experience built up over decades: it analyses the economics of its properties, manages leasing and operations, plans CAPEX, works with banks and contractors, develops new projects and assesses opportunities for further growth."),
      p("At the same time, the company's investment horizon is not limited to one country."),
      p("MEGAPARC considers real estate opportunities worldwide — but does not seek to give an impression of global presence where there is none."),
      p("The main criterion is a different one:"),
    ],
    criteria: ["we must understand the asset.", "Its market.", "Its economics.", "Its risks.", "And how additional value can be created in it."],
    links: [
      ["/portfolio", "Portfolio"],
      ["/development", "Development projects"],
      ["/approach", "Our approach"],
    ],
  },
  value: {
    label: "Approach",
    title: "From purchase to value creation",
    body: [
      p("MEGAPARC's approach to real estate has been shaped by the preceding decades of entrepreneurial experience."),
      p("That is why the company does not see a property as just a line in an investment model."),
    ],
    progression: ["Acquisition", "Reconstruction", "Concept", "Construction", "Tenants", "Operation"],
    steps: [
      "Sometimes value creation begins with buying a property at the right price.",
      "Sometimes with reconstruction.",
      "Sometimes with a new concept or a new tenant mix.",
      "Sometimes with new construction.",
      "Sometimes with modernising building services, better operation or more efficient use of the existing space.",
    ],
    refusal: "And sometimes the right decision is to walk away from a project.",
    statement: ["Value does not appear on its own.", "Decisions create it."],
  },
  closing: {
    title: ["Experience of the past.", "Focus on the future."],
    body: [
      p("MEGAPARC has a long entrepreneurial history, but the company does not want to turn it into a catalogue of past achievements."),
      p("The past matters not because it contained many companies, industries or countries."),
      p("It matters because every stage added a new capability."),
      terms([
        ["Finance", " taught us to assess capital."],
        ["Manufacturing", " — to control execution."],
        ["Trade", " — to read the market."],
        ["Logistics", " — to see the whole system."],
        ["International projects", " — to work with risk."],
      ]),
      emph("Real estate brought all of this together."),
    ],
    positionsLead: "That is why MEGAPARC today looks at a property from three positions at once:",
    positions: [
      { term: "as an investor", rest: " — through capital and returns;" },
      { term: "as a developer", rest: " — through the potential for development;" },
      { term: "as an owner", rest: " — through how the asset will work tomorrow." },
    ],
    after: [p("An asset has to stand up to more than an investment presentation."), p("It has to work in real life.")],
    audiences: ["For tenants.", "For business.", "For the city.", "For the owner."],
    next: "It is on this experience that the next stage of MEGAPARC is being built.",
    contact: "Discuss a partnership",
    careers: "Careers at MEGAPARC",
  },
  alt: {
    hero: "Contemporary architecture — monochrome",
    heritage: "Concrete tower — architectural detail",
    pause: "High-rise facade seen from below",
    stage: ["Mixed-use architecture — monochrome", "Container terminal from above", "Spiral structure seen from below", "Perforated facade at night"],
  },
  caption: { vatra: "development project", today: "current portfolio" },
};

export const companyHistory: Record<SiteLocale, CompanyHistory> = { ro, ru, en };

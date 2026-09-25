import Image from "next/image";
import { PageShell } from "@/components/page-shell";
import { ArrowLink, PageHero, SectionIndex } from "@/components/primitives";
import { portfolioAssets } from "@/lib/assets";
import { brand, localePath, type SiteLocale } from "@/lib/site-data";

type Milestone = { year: string; title: string; text: string; scope: "group" | "megaparc"; anchor?: boolean };

const copy = {
  ro: {
    eyebrow: "Platformă de investiții",
    title: ["Imobiliare administrate", "ca"],
    em: "capital.",
    lead: "MEGAPARC conectează investiția, dezvoltarea și administrarea activelor într-o singură perspectivă de proprietar, construită pe o experiență de decenii în antreprenoriat, investiții și administrarea activelor.",
    thesisIndex: "Teză",
    thesis: "Nu urmărim doar finalizarea unei clădiri. Urmărim relevanța activului în timp.",
    narrativeIndex: "Ciclul de valoare",
    narrativeTitle: ["Un singur ciclu.", "Cinci decizii."],
    narrative: [
      ["Investim", "Selectăm active și oportunități prin prisma economiei, a utilizării și a potențialului de dezvoltare, nu a volumului."],
      ["Dezvoltăm", "Transformăm terenuri, clădiri și concepte în active care au sens pentru oraș, pentru utilizatori și pentru capital."],
      ["Administrăm", "Exploatarea, leasingul și calitatea fizică a activului sunt parte din aceeași decizie de investiție."],
      ["Protejăm relevanța", "Un activ rămâne valoros atât timp cât rămâne util. Intervenim înainte ca utilizarea să devină învechită."],
      ["Creăm valoare pe termen lung", "Rezultatul este un portofoliu care funcționează, se adaptează și își păstrează valoarea în timp."],
    ],
    imageCaption: "Moscova 20 · activ operațional",
    historyIndex: "Istoria noastră",
    historyTitle: ["Repere.", "Din antreprenoriat", "în imobiliare."],
    historyLead: "Din 1995, grupul dezvoltă experiență în investiții, antreprenoriat și administrarea activelor. MEGAPARC este fondată în 2005.",
    groupLabel: "Experiența grupului",
    megaparcLabel: "MEGAPARC",
    milestones: [
      { year: "1995", title: "Experiența grupului", text: "Platformă strategică de investiții dedicată și extindere antreprenorială: retail, investiții, producție, servicii financiare și infrastructură.", scope: "group", anchor: true },
      { year: "1996–1997", title: "Servicii financiare și agro-industrie", text: "Extindere în servicii financiare și activități agro-industriale.", scope: "group" },
      { year: "2005", title: "Este fondată MEGAPARC", text: "În 2005 este fondată MEGAPARC, cu o strategie orientată spre achiziția și revitalizarea activelor comerciale amplasate strategic.", scope: "megaparc", anchor: true },
      { year: "2006–2007", title: "Diversificare", text: "Diversificare suplimentară și experiență operațională internațională.", scope: "group" },
      { year: "2017–2019", title: "Comerț internațional și logistică", text: "Operațiunile de comerț internațional și logistică au extins experiența operațională a grupului pe mai multe piețe.", scope: "group" },
      { year: "2020", title: "Focus pe imobiliare", text: "Din 2020, strategia se concentrează pe sectorul imobiliar din Republica Moldova.", scope: "megaparc", anchor: true },
      { year: "Astăzi", title: "Investim · Dezvoltăm · Administrăm", text: "Investiții imobiliare, dezvoltare și administrarea activelor pe termen lung. Astăzi, MEGAPARC dezvoltă și administrează active imobiliare cu o perspectivă investițională pe termen lung.", scope: "megaparc", anchor: true },
    ] as Milestone[],
    ownerIndex: "Mentalitate de proprietar",
    ownerTitle: "Fiecare decizie este privită prin prisma calității activului, a utilizării și a valorii pe termen lung.",
    ownerCta: "Vezi portofoliul",
    contactCta: "Discuție corporate",
  },
  ru: {
    eyebrow: "Инвестиционная платформа",
    title: ["Недвижимость, управляемая", "как"],
    em: "капитал.",
    lead: "MEGAPARC объединяет инвестиции, девелопмент и управление активами в единой перспективе собственника, основанной на многолетнем опыте в предпринимательстве, инвестициях и управлении активами.",
    thesisIndex: "Тезис",
    thesis: "Мы стремимся не просто завершить здание. Мы стремимся к актуальности актива во времени.",
    narrativeIndex: "Цикл стоимости",
    narrativeTitle: ["Один цикл.", "Пять решений."],
    narrative: [
      ["Инвестируем", "Отбираем активы и возможности исходя из экономики, назначения и потенциала развития, а не объёма."],
      ["Развиваем", "Превращаем участки, здания и идеи в активы, имеющие смысл для города, арендаторов и капитала."],
      ["Управляем", "Эксплуатация, аренда и физическое состояние актива — часть одного инвестиционного решения."],
      ["Сохраняем актуальность", "Актив остаётся ценным, пока остаётся востребованным. Мы действуем до того, как его использование устареет."],
      ["Создаём долгосрочную стоимость", "Результат — портфель, который работает, адаптируется и сохраняет стоимость во времени."],
    ],
    imageCaption: "Moscova 20 · операционный актив",
    historyIndex: "Наша история",
    historyTitle: ["Вехи.", "От предпринимательства", "к недвижимости."],
    historyLead: "С 1995 года группа развивает экспертизу в инвестициях, предпринимательстве и управлении активами. MEGAPARC основана в 2005 году.",
    groupLabel: "Опыт группы",
    megaparcLabel: "MEGAPARC",
    milestones: [
      { year: "1995", title: "Опыт группы", text: "Отдельная стратегическая инвестиционная платформа и предпринимательское расширение: розница, инвестиции, производство, финансовые услуги и инфраструктура.", scope: "group", anchor: true },
      { year: "1996–1997", title: "Финансовые услуги и агропромышленность", text: "Расширение в сферу финансовых услуг и агропромышленной деятельности.", scope: "group" },
      { year: "2005", title: "Основана MEGAPARC", text: "В 2005 году была основана MEGAPARC с фокусом на приобретении и ревитализации стратегически расположенных коммерческих активов.", scope: "megaparc", anchor: true },
      { year: "2006–2007", title: "Диверсификация", text: "Дальнейшая диверсификация и международный операционный опыт.", scope: "group" },
      { year: "2017–2019", title: "Международная торговля и логистика", text: "Международные торговые и логистические операции расширили операционный опыт группы на нескольких рынках.", scope: "group" },
      { year: "2020", title: "Стратегический фокус на недвижимости", text: "С 2020 года стратегический фокус сосредоточен на недвижимости в Республике Молдова.", scope: "megaparc", anchor: true },
      { year: "Сегодня", title: "Инвестируем · Развиваем · Управляем", text: "Сегодня MEGAPARC развивает и управляет недвижимостью с долгосрочным инвестиционным подходом: инвестиции, девелопмент, управление активами, коммерческие и жилые проекты, городская ревитализация.", scope: "megaparc", anchor: true },
    ] as Milestone[],
    ownerIndex: "Мышление собственника",
    ownerTitle: "Каждое решение рассматривается через призму качества актива, его назначения и долгосрочной стоимости.",
    ownerCta: "Смотреть портфель",
    contactCta: "Корпоративный запрос",
  },
  en: {
    eyebrow: "Investment platform",
    title: ["Real estate managed", "as"],
    em: "capital.",
    lead: "MEGAPARC connects investment, development and asset management through one owner-led perspective, built on decades of entrepreneurial, investment and operating experience.",
    thesisIndex: "Thesis",
    thesis: "We do not focus only on completing a building. We focus on the asset remaining relevant over time.",
    narrativeIndex: "Value cycle",
    narrativeTitle: ["One cycle.", "Five decisions."],
    narrative: [
      ["Invest", "We select assets and opportunities on economics, use and development potential, not on volume."],
      ["Develop", "We transform land, buildings and ideas into assets that make sense for the city, for occupiers and for capital."],
      ["Manage", "Operations, leasing and the physical quality of the asset are part of the same investment decision."],
      ["Protect relevance", "An asset stays valuable as long as it stays useful. We act before its use becomes outdated."],
      ["Create long-term value", "The result is a portfolio that performs, adapts and keeps its value over time."],
    ],
    imageCaption: "Moscova 20 · operating asset",
    historyIndex: "Our story",
    historyTitle: ["Milestones.", "From enterprise", "to real estate."],
    historyLead: "Since 1995, the group has developed experience across investment, entrepreneurship and asset stewardship. MEGAPARC was established in 2005.",
    groupLabel: "Group heritage",
    megaparcLabel: "MEGAPARC",
    milestones: [
      { year: "1995", title: "Group heritage", text: "Dedicated strategic investment platform and entrepreneurial expansion across retail, investment, manufacturing, financial services and infrastructure.", scope: "group", anchor: true },
      { year: "1996–1997", title: "Financial services and agro-industry", text: "Expansion into financial services and agro-industrial activities.", scope: "group" },
      { year: "2005", title: "MEGAPARC is established", text: "MEGAPARC was established in 2005 with a strategy focused on acquiring and revitalising strategically located commercial assets.", scope: "megaparc", anchor: true },
      { year: "2006–2007", title: "Diversification", text: "Further diversification and international operating experience.", scope: "group" },
      { year: "2017–2019", title: "International trade and logistics", text: "International trading and logistics operations broadened the group's operating experience across markets.", scope: "group" },
      { year: "2020", title: "Strategic real-estate focus", text: "Since 2020, the strategic focus has been concentrated on real estate in the Republic of Moldova.", scope: "megaparc", anchor: true },
      { year: "Today", title: "Invest · Develop · Manage", text: "Today, MEGAPARC develops and manages real-estate assets through a long-term investment perspective: investment, development, asset management, commercial and residential projects, urban revitalisation.", scope: "megaparc", anchor: true },
    ] as Milestone[],
    ownerIndex: "Owner mindset",
    ownerTitle: "Every decision is viewed through asset quality, use and long-term value.",
    ownerCta: "View the portfolio",
    contactCta: "Corporate enquiry",
  },
} as const;

export function AboutPage({ locale }: { locale: SiteLocale }) {
  const c = copy[locale];
  const image = portfolioAssets.find((asset) => asset.slug === "moscova-20")!;
  const before2020 = c.milestones.filter((m) => m.year !== "2020" && !/^(Astăzi|Сегодня|Today)$/.test(m.year));
  const after = c.milestones.filter((m) => !before2020.includes(m));

  const renderMilestone = (m: Milestone, index: number) => (
    <li key={m.year} className={`timeline__item${m.anchor ? " timeline__item--anchor" : ""} timeline__item--${m.scope}`} data-reveal>
      <span className="timeline__scope">{m.scope === "group" ? c.groupLabel : c.megaparcLabel}</span>
      <span className="timeline__year">{m.year}</span>
      <div className="timeline__body">
        <h3>{m.title}</h3>
        <p>{m.text}</p>
      </div>
      <span className="timeline__no" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
    </li>
  );

  return (
    <PageShell locale={locale}>
      <PageHero
        index="01"
        eyebrow={c.eyebrow}
        title={
          <>
            {c.title[0]}
            <br />
            {c.title[1]} <em>{c.em}</em>
          </>
        }
        lead={c.lead}
      />

      <section className="thesis ink">
        <div className="shell">
          <SectionIndex no="02" inverse>{c.thesisIndex}</SectionIndex>
          <p className="thesis__text" data-reveal>{c.thesis}</p>
        </div>
      </section>

      <section className="cycle paper">
        <div className="shell">
          <SectionIndex no="03">{c.narrativeIndex}</SectionIndex>
          <div className="cycle__heading" data-reveal>
            <h2>
              {c.narrativeTitle[0]}
              <br />
              {c.narrativeTitle[1]}
            </h2>
          </div>
          <ol className="cycle__list">
            {c.narrative.map(([title, text], index) => (
              <li key={title} className="cycle__row" data-reveal>
                <span className="cycle__no">0{index + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="history paper" id="history">
        <div className="shell">
          <SectionIndex no="04">{c.historyIndex}</SectionIndex>
          <div className="history__heading" data-reveal>
            <span className="label label--red" lang="en">{brand.since}</span>
            <h2>
              {c.historyTitle[0]}
              <br />
              <span className="muted-ink">{c.historyTitle[1]}</span>
              <br />
              <span className="muted-ink">{c.historyTitle[2]}</span>
            </h2>
            <p>{c.historyLead}</p>
          </div>
          <ol className="timeline">{before2020.map(renderMilestone)}</ol>
        </div>
      </section>

      <section className="image-break">
        <Image
          src={image.image!}
          alt={`${image.name} — MEGAPARC`}
          fill
          sizes="100vw"
          className="image-break__image"
          data-depth="22"
          style={{ objectPosition: image.imagePosition }}
        />
        <div className="image-break__veil" />
        <div className="shell image-break__caption">
          <span>{c.imageCaption}</span>
        </div>
      </section>

      <section className="history history--ink ink">
        <div className="shell">
          <ol className="timeline timeline--light">{after.map((m, i) => renderMilestone(m, before2020.length + i))}</ol>
        </div>
      </section>

      <section className="owner paper">
        <div className="shell">
          <SectionIndex no="05">{c.ownerIndex}</SectionIndex>
          <div className="owner__grid" data-reveal>
            <p className="owner__statement">{c.ownerTitle}</p>
            <div className="owner__actions">
              <ArrowLink href={localePath(locale, "/portfolio")}>{c.ownerCta}</ArrowLink>
              <ArrowLink href={localePath(locale, "/contact")}>{c.contactCta}</ArrowLink>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

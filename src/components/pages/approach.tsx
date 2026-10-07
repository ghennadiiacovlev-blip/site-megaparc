import Link from "next/link";
import type { CSSProperties } from "react";
import { ConceptImage, DemoMark, Ledger, MaskTitle, Opening } from "@/components/experience";
import { PageShell } from "@/components/page-shell";
import { ArtImage } from "@/components/primitives";
import { Button, Icon, TextLink } from "@/components/ui";
import { assetProfiles, caseStudy, governance, mandate, portfolioFigures, screening, vatraProfile, drochiaProfile } from "@/data/demo-content";
import { developmentProjects, portfolioAssets } from "@/lib/assets";
import { historyAnchors, investmentMandate, valueCycle } from "@/lib/strategy";
import { localePath, type SiteLocale } from "@/lib/site-data";

/**
 * APPROACH — how MEGAPARC thinks: asset · business · capital · risk · value.
 * Intelligent without PowerPoint: one statement, three lenses as a sticky
 * scene, screening thresholds (DEMO) beside the approved criteria, risk as
 * questions with answers, the value sequence on a scroll-linked red line, one
 * DEMO case study as the dark moment, then the investor / bank ladder whose
 * content becomes more factual rung by rung (#investors).
 */
const copy = {
  ro: {
    label: "Abordarea noastră",
    title: ["Imobiliarele", "sunt o afacere care lucrează."],
    lead: "O clădire valorează atât cât poate produce, în timp, pentru oamenii care o folosesc. De aici pornește fiecare decizie.",
    lensesLabel: "Trei perspective asupra fiecărui obiect",
    lenses: [
      ["Activ", "Clădirea, terenul, locul.", ["Locația și accesul", "Starea tehnică", "Claritatea juridică"]],
      ["Afacere", "Cum lucrează obiectul în fiecare zi.", ["Chiriași și cerere", "Costuri de exploatare", "Flexibilitatea spațiului"]],
      ["Capital", "Ce se întâmplă cu banii investiți.", ["Intrarea și finanțarea", "Orizontul de deținere", "Opțiuni: păstrare, modernizare, reinvestire"]],
    ],
    screenLabel: "Cum filtrăm oportunitățile",
    screenTitle: "Puține criterii, aplicate de fiecare dată.",
    holding: "Orizont de deținere",
    payback: "Recuperare țintă",
    occupancy: "Ocupare țintă",
    review: "Analiză preliminară",
    criteria: "Ce verificăm la fiecare obiect",
    riskLabel: "Cum gândim riscul",
    riskTitle: "Fiecare risc are un răspuns înainte de decizie.",
    risks: [
      ["Locația își pierde cererea?", "Cumpărăm acolo unde cererea are cauze structurale: artere, cartiere dense, intrări în oraș."],
      ["Situația juridică e clară?", "Verificarea dreptului de proprietate și a autorizațiilor precede orice angajament."],
      ["Clădirea ascunde probleme?", "Auditul tehnic se face înainte de investiție și înainte de a promite unui chiriaș."],
      ["Spațiul rămâne liber?", "Planificăm contractele, păstrăm spațiile flexibile și pregătim rapid spațiile eliberate."],
      ["Proiectul depășește bugetul?", "Deciziile se iau pe etape; economia se recalculează înainte de fiecare etapă."],
      ["Finanțarea se scumpește?", "Structura finanțării se calculează cu rezervă pentru dobânzi și termene."],
    ],
    valueLabel: "Cum se creează valoarea",
    valueTitle: "De la căutare la reinvestire.",
    caseLabel: "Studiu de caz",
    caseFlag: "Demo · exemplu de format",
    caseTitle: "De la 78% la 94% ocupare.",
    caseText: "Exemplu ilustrativ al formatului în care MEGAPARC va prezenta studiile de caz. Obiectul și cifrele sunt demonstrative; nu este un obiect din portofoliu.",
    investorsLabel: "Pentru investitori și bănci",
    investorsTitle: "Poate această echipă gestiona capitalul, riscul și execuția?",
    investorsLead: "Răspunsul pas cu pas — de la ce facem la cum raportăm. Fiecare treaptă e mai concretă decât precedenta.",
    rungs: [
      ["Afacerea", "Ce face MEGAPARC"],
      ["Activele", "Ce deținem și administrăm"],
      ["Dezvoltarea", "Ce construim"],
      ["Disciplina deciziilor", "Cum spunem da sau nu"],
      ["Control și raportare", "Ce vedeți ca partener"],
      ["Echipa", "Cine răspunde"],
    ],
    business: "Investiții, dezvoltare și administrare imobiliară. Experiența antreprenorială a grupului din 1995, MEGAPARC din 2005, imobiliarele ca focus strategic din 2020.",
    operating: "Obiecte în funcțiune",
    gla: "Suprafață închiriabilă",
    occupancyNow: "Ocupare",
    areas: "Suprafețe confirmate",
    vatra: "VATRA — etapă",
    drochia: "Drochia Gateway — teren",
    teamText: "Profilurile publice ale echipei sunt în pregătire; previzualizarea arată formatul.",
    teamCta: "Echipa",
    investorsCta: "Discută finanțarea",
    casesCta: "Vezi studiul de caz",
    mandateLabel: "Mandat",
    ticket: "Volum per tranzacție",
    structures: "Structuri",
    geography: "Geografie",
    closeTitle: "Avem o metodă. Vă arătăm cum se aplică la cazul dumneavoastră.",
    routes: [["Propune un obiect", "/opportunities", "owners"], ["Investiții și finanțare", "/contact", "investors"], ["Portofoliul", "/portfolio", ""]],
  },
  ru: {
    label: "Наш подход",
    title: ["Недвижимость —", "это работающий бизнес."],
    lead: "Здание стоит столько, сколько оно может со временем дать людям, которые им пользуются. С этого начинается каждое решение.",
    lensesLabel: "Три взгляда на каждый объект",
    lenses: [
      ["Актив", "Здание, земля, место.", ["Локация и подъезды", "Техническое состояние", "Юридическая чистота"]],
      ["Бизнес", "Как объект работает каждый день.", ["Арендаторы и спрос", "Эксплуатационные расходы", "Гибкость пространства"]],
      ["Капитал", "Что происходит с вложенными деньгами.", ["Вход и финансирование", "Горизонт владения", "Варианты: держать, обновить, реинвестировать"]],
    ],
    screenLabel: "Как мы отбираем возможности",
    screenTitle: "Немного критериев — и каждый раз одни и те же.",
    holding: "Горизонт владения",
    payback: "Целевая окупаемость",
    occupancy: "Целевая заполняемость",
    review: "Предварительный анализ",
    criteria: "Что проверяем в каждом объекте",
    riskLabel: "Как мы думаем о риске",
    riskTitle: "У каждого риска есть ответ — до решения.",
    risks: [
      ["Локация потеряет спрос?", "Покупаем там, где у спроса есть структурные причины: магистрали, плотные районы, въезды в город."],
      ["Юридически всё чисто?", "Проверка права собственности и разрешений — до любых обязательств."],
      ["Здание скрывает проблемы?", "Технический аудит — до инвестиции и до обещаний арендатору."],
      ["Помещение будет пустовать?", "Планируем договоры, держим пространство гибким и быстро готовим освободившиеся блоки."],
      ["Проект выйдет за бюджет?", "Решения принимаются поэтапно; экономика пересчитывается перед каждым этапом."],
      ["Финансирование подорожает?", "Структура финансирования считается с запасом по ставкам и срокам."],
    ],
    valueLabel: "Как создаётся стоимость",
    valueTitle: "От поиска до реинвестирования.",
    caseLabel: "Кейс",
    caseFlag: "Демо · пример формата",
    caseTitle: "От 78% до 94% заполняемости.",
    caseText: "Иллюстративный пример формата, в котором MEGAPARC будет показывать кейсы. Объект и цифры демонстрационные; это не объект портфеля.",
    investorsLabel: "Для инвесторов и банков",
    investorsTitle: "Может ли эта команда управлять капиталом, риском и реализацией?",
    investorsLead: "Ответ — шаг за шагом: от того, что мы делаем, до того, как отчитываемся. Каждая ступень конкретнее предыдущей.",
    rungs: [
      ["Бизнес", "Чем занимается MEGAPARC"],
      ["Активы", "Чем мы владеем и управляем"],
      ["Девелопмент", "Что мы строим"],
      ["Дисциплина решений", "Как мы говорим «да» и «нет»"],
      ["Контроль и отчётность", "Что видит партнёр"],
      ["Команда", "Кто отвечает"],
    ],
    business: "Инвестиции, девелопмент и управление недвижимостью. Предпринимательский опыт группы с 1995 года, MEGAPARC — с 2005-го, недвижимость как стратегический фокус — с 2020-го.",
    operating: "Действующие объекты",
    gla: "Арендуемая площадь",
    occupancyNow: "Заполняемость",
    areas: "Подтверждённые площади",
    vatra: "VATRA — стадия",
    drochia: "Drochia Gateway — участок",
    teamText: "Публичные профили команды готовятся; превью показывает формат.",
    teamCta: "Команда",
    investorsCta: "Обсудить финансирование",
    casesCta: "Смотреть кейс",
    mandateLabel: "Мандат",
    ticket: "Объём сделки",
    structures: "Структуры",
    geography: "География",
    closeTitle: "У нас есть метод. Покажем, как он работает в вашем случае.",
    routes: [["Предложить объект", "/opportunities", "owners"], ["Инвестиции и финансирование", "/contact", "investors"], ["Портфель", "/portfolio", ""]],
  },
  en: {
    label: "Our approach",
    title: ["Real estate", "is a working business."],
    lead: "A building is worth what it can deliver, over time, to the people who use it. Every decision starts there.",
    lensesLabel: "Three lenses on every property",
    lenses: [
      ["Asset", "The building, the land, the place.", ["Location and access", "Technical condition", "Legal clarity"]],
      ["Business", "How the property works every day.", ["Tenants and demand", "Operating costs", "Flexibility of space"]],
      ["Capital", "What happens to the money invested.", ["Entry and financing", "Holding horizon", "Options: hold, renew, reinvest"]],
    ],
    screenLabel: "How we screen opportunities",
    screenTitle: "Few criteria, applied every time.",
    holding: "Holding horizon",
    payback: "Target payback",
    occupancy: "Target occupancy",
    review: "Preliminary review",
    criteria: "What we check on every property",
    riskLabel: "How we think about risk",
    riskTitle: "Every risk has an answer before the decision.",
    risks: [
      ["Will the location lose demand?", "We buy where demand has structural causes: arteries, dense districts, town entrances."],
      ["Is the legal position clear?", "Title and permits are checked before any commitment."],
      ["Is the building hiding problems?", "A technical audit comes before the investment and before any promise to a tenant."],
      ["Will the space stay empty?", "We plan leases, keep space flexible and prepare vacated units quickly."],
      ["Will the project overrun?", "Decisions are staged; the economics are re-run before every stage."],
      ["Will financing get more expensive?", "Financing is structured with headroom on rates and terms."],
    ],
    valueLabel: "How value is created",
    valueTitle: "From search to reinvestment.",
    caseLabel: "Case study",
    caseFlag: "Demo · format example",
    caseTitle: "From 78% to 94% occupancy.",
    caseText: "An illustrative example of the format in which MEGAPARC will present case studies. The property and the figures are demonstrations; it is not a portfolio property.",
    investorsLabel: "For investors and banks",
    investorsTitle: "Can this team manage capital, risk and execution?",
    investorsLead: "The answer, step by step — from what we do to how we report. Each step is more concrete than the last.",
    rungs: [
      ["The business", "What MEGAPARC does"],
      ["The assets", "What we own and manage"],
      ["Development", "What we build"],
      ["Decision discipline", "How we say yes and no"],
      ["Control and reporting", "What a partner sees"],
      ["The team", "Who is accountable"],
    ],
    business: "Real estate investment, development and asset management. The group's entrepreneurial experience since 1995, MEGAPARC since 2005, real estate as the strategic focus since 2020.",
    operating: "Operating properties",
    gla: "Lettable area",
    occupancyNow: "Occupancy",
    areas: "Confirmed areas",
    vatra: "VATRA — stage",
    drochia: "Drochia Gateway — site",
    teamText: "Public team profiles are in preparation; the preview shows the format.",
    teamCta: "The team",
    investorsCta: "Discuss financing",
    casesCta: "See the case study",
    mandateLabel: "Mandate",
    ticket: "Deal size",
    structures: "Structures",
    geography: "Geography",
    closeTitle: "We have a method. We'll show you how it applies to your case.",
    routes: [["Submit a property", "/opportunities", "owners"], ["Investment and finance", "/contact", "investors"], ["The portfolio", "/portfolio", ""]],
  },
} as const;

/** Lens 01 uses the real Dacia 31 photograph; lenses 02–03 use registered concept visuals. */
const lensImages = ["approach.lens.business", "approach.lens.capital"];

export function ApproachPage({ locale }: { locale: SiteLocale }) {
  const c = copy[locale];
  const p = (path: string) => localePath(locale, path);
  const [dacia] = portfolioAssets;
  const steps = caseStudy.steps.value[locale].split("\n").map((line) => line.split("|"));
  const areas = portfolioAssets.filter((a) => assetProfiles[a.slug].area.status === "CONFIRMED").map((a) => `${a.name} ${assetProfiles[a.slug].area.value[locale]}`);
  const [heritage, established, focus] = historyAnchors;

  return (
    <PageShell locale={locale} variant="overlay" experience>
      {/* HERO */}
      <section className="xp-hero xp-hero--page" data-xp-hero>
        <div className="xp-hero__media">
          <div className="xp-hero__frame is-active"><ConceptImage id="approach.hero" locale={locale} priority /></div>
        </div>
        <div className="xp-hero__veil" aria-hidden="true" />
        <div className="xp-shell xp-hero__copy">
          <p className="xp-hero__line">{c.label}</p>
          <MaskTitle as="h1" className="xp-hero__title" lines={[...c.title]} />
          <p className="xp-hero__lead">{c.lead}</p>
        </div>
      </section>

      {/* THREE LENSES — sticky scene */}
      <section className="xp-sec xp-sec--warm" id="lenses">
        <div className="xp-shell">
          <Opening no="01" label={c.lensesLabel} title={<>{c.lenses.map((l) => l[0]).join(" · ")}</>} />
        </div>
        <div className="xp-scene xp-scene--lenses" data-xp-scene data-steps={3} style={{ "--steps": 3 } as CSSProperties}>
          <div className="xp-shell xp-scene__pin">
            <div className="xp-scene__media">
              <div className="xp-scene__frame">
                <ArtImage media={dacia.media!} alt={`${dacia.name} — ${dacia.positioning[locale]}`} sizes="(min-width: 1024px) 45vw, 100vw" />
              </div>
              {lensImages.map((id) => (
                <div key={id} className="xp-scene__frame"><ConceptImage id={id} locale={locale} sizes="(min-width: 1024px) 45vw, 100vw" /></div>
              ))}
            </div>
            <div>
              <span className="xp-scene__bar" aria-hidden="true" />
              <ol className="xp-scene__steps">
                {c.lenses.map(([word, line, points], i) => (
                  <li key={word} className="xp-scene__step">
                    <span className="xp-scene__no">0{i + 1}</span>
                    <h3 className="xp-lens-word">{word}</h3>
                    <div className="xp-scene__text">
                      <p className="xp-lead">{line}</p>
                      <ul className="xp-ticks xp-ticks--inline">
                        {points.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* SCREENING */}
      <section className="xp-sec" id="screening">
        <div className="xp-shell">
          <Opening no="02" label={c.screenLabel} title={c.screenTitle} className="xp-opening--split" lead={investmentMandate.note[locale]} />
          <div data-reveal>
            <Ledger locale={locale} size="lg" items={[
              { label: c.holding, point: screening.holding },
              { label: c.payback, point: screening.payback },
              { label: c.occupancy, point: screening.occupancy },
              { label: c.review, point: screening.review },
            ]} />
          </div>
          <div className="xp-criteria" data-reveal>
            <p className="xp-label">{c.criteria}</p>
            <ul className="xp-tags">
              {investmentMandate.criteria.points[locale].map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* RISK */}
      <section className="xp-sec xp-sec--stone" id="risk">
        <div className="xp-shell">
          <Opening no="03" label={c.riskLabel} title={c.riskTitle} />
          <ol className="xp-rows" data-reveal>
            {c.risks.map(([question, answer]) => (
              <li key={question}>
                <h3>{question}</h3>
                <p>{answer}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* VALUE SEQUENCE — scroll-linked line */}
      <section className="xp-sec xp-sec--warm" id="value">
        <div className="xp-shell">
          <Opening no="04" label={c.valueLabel} title={c.valueTitle} />
          <ol className="xp-progress" data-xp-progress>
            {valueCycle.map((stage) => (
              <li key={stage.key} className="xp-progress__term" data-xp-term>
                <span className="xp-progress__title">{stage.title[locale]}</span>
                <span className="xp-progress__text">{stage.text[locale]}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CASE — the dark moment, DEMO */}
      <section className="xp-sec xp-sec--ink" id="case">
        <div className="xp-shell xp-case">
          <div className="xp-split__copy" data-reveal>
            <span className="xp-flag xp-case__flag">{c.caseFlag}</span>
            <p className="xp-eyebrow"><span className="xp-eyebrow__no">05</span><span>{c.caseLabel} · {caseStudy.subject.value[locale]} · {caseStudy.period.value[locale]}</span></p>
            <h2 className="xp-close__title">{c.caseTitle}</h2>
            <p>{c.caseText}</p>
            <figure className="xp-fig" style={{ "--ratio": "16 / 10" } as CSSProperties}>
              <ConceptImage id="approach.case" locale={locale} sizes="(min-width: 1024px) 40vw, 100vw" />
            </figure>
          </div>
          <div data-reveal>
            <dl className="xp-case__metrics">
              {caseStudy.metrics.map((metric) => (
                <div key={metric.point.key} className="xp-case__metric">
                  <dt>{metric.label[locale]}</dt>
                  <dd>
                    {metric.point.value.en.includes("→") ? (
                      <>
                        <s>{locale === "en" ? metric.before.replace(",", ".") : metric.before}</s>
                        <i>→</i>
                        {locale === "en" ? metric.after.replace(",", ".") : metric.after}
                      </>
                    ) : (
                      metric.point.value[locale]
                    )}
                    <DemoMark />
                  </dd>
                </div>
              ))}
            </dl>
            <ol className="xp-process xp-process--stack">
              {steps.map(([title, text]) => (
                <li key={title}>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* INVESTORS AND BANKS — ladder of proof */}
      <section className="xp-sec" id="investors">
        <div className="xp-shell">
          <Opening no="06" label={c.investorsLabel} title={c.investorsTitle} lead={c.investorsLead} className="xp-opening--split" />
          <ol className="xp-ladder">
            <li data-reveal>
              <div className="xp-ladder__head"><h3>{c.rungs[0][0]}</h3><p>{c.rungs[0][1]}</p></div>
              <div className="xp-ladder__body">
                <p className="xp-lead">{c.business}</p>
                <ul className="xp-tags"><li>{heritage.year}</li><li>{established.year}</li><li>{focus.year}</li></ul>
              </div>
            </li>
            <li data-reveal>
              <div className="xp-ladder__head"><h3>{c.rungs[1][0]}</h3><p>{c.rungs[1][1]}</p></div>
              <div className="xp-ladder__body">
                <Ledger locale={locale} items={[
                  { label: c.operating, point: portfolioFigures.operating },
                  { label: c.gla, point: portfolioFigures.gla },
                  { label: c.occupancyNow, point: portfolioFigures.occupancy },
                  { label: c.drochia, point: drochiaProfile.site },
                ]} />
                <p className="xp-muted">{c.areas}: {areas.join(" · ")}</p>
                <TextLink href={p("/portfolio")}>{c.routes[2][0]}</TextLink>
              </div>
            </li>
            <li data-reveal>
              <div className="xp-ladder__head"><h3>{c.rungs[2][0]}</h3><p>{c.rungs[2][1]}</p></div>
              <div className="xp-ladder__body">
                <Ledger locale={locale} className="xp-ledger--pair" items={[
                  { label: c.vatra, point: vatraProfile.stage },
                  { label: c.drochia, point: drochiaProfile.status },
                ]} />
                <TextLink href={p("/development")}>{developmentProjects.map((d) => d.name).join(" · ")}</TextLink>
              </div>
            </li>
            <li data-reveal>
              <div className="xp-ladder__head"><h3>{c.rungs[3][0]}</h3><p>{c.rungs[3][1]}</p></div>
              <div className="xp-ladder__body">
                <ul className="xp-rows xp-rows--compact">
                  {governance.slice(0, 1).concat(governance.slice(3)).map((item) => (
                    <li key={item.title.key}><h3>{item.title.value[locale]}<DemoMark /></h3><p>{item.text[locale]}</p></li>
                  ))}
                </ul>
                <TextLink href="#screening">{c.screenLabel}</TextLink>
              </div>
            </li>
            <li data-reveal>
              <div className="xp-ladder__head"><h3>{c.rungs[4][0]}</h3><p>{c.rungs[4][1]}</p></div>
              <div className="xp-ladder__body">
                <ul className="xp-rows xp-rows--compact">
                  {governance.slice(1, 3).map((item) => (
                    <li key={item.title.key}><h3>{item.title.value[locale]}<DemoMark /></h3><p>{item.text[locale]}</p></li>
                  ))}
                </ul>
                <TextLink href="#case">{c.casesCta}</TextLink>
              </div>
            </li>
            <li data-reveal>
              <div className="xp-ladder__head"><h3>{c.rungs[5][0]}</h3><p>{c.rungs[5][1]}</p></div>
              <div className="xp-ladder__body">
                <p>{c.teamText}</p>
                <TextLink href={`${p("/about")}#team`}>{c.teamCta}</TextLink>
              </div>
            </li>
          </ol>
          <div className="xp-mandate" data-reveal>
            <p className="xp-label">{c.mandateLabel}</p>
            <Ledger locale={locale} className="xp-ledger--cols-3" items={[
              { label: c.ticket, point: mandate.ticket },
              { label: c.structures, point: mandate.structures },
              { label: c.geography, point: mandate.geography },
            ]} />
            <Button href={`${p("/contact")}?subject=capital#investors`}>{c.investorsCta}</Button>
          </div>
        </div>
      </section>

      {/* CLOSE */}
      <section className="xp-sec xp-sec--red">
        <div className="xp-shell xp-close">
          <div data-reveal>
            <p className="xp-eyebrow"><span className="xp-eyebrow__no">07</span><span>{c.label}</span></p>
            <h2 className="xp-close__title">{c.closeTitle}</h2>
          </div>
          <nav className="xp-close__routes" aria-label={c.label} data-reveal>
            {c.routes.map(([label, path, anchor]) => (
              <Link key={label} href={anchor ? `${p(path)}${path === "/contact" ? "?subject=capital" : ""}#${anchor}` : p(path)}>
                {label}
                <Icon name="arrow" size={18} />
              </Link>
            ))}
          </nav>
        </div>
      </section>
    </PageShell>
  );
}


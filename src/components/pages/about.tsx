import { PageShell } from "@/components/page-shell";
import { ArrowLink, ImageBreak, PageHero, SectionHead, SectionIndex } from "@/components/primitives";
import { HistorySection, OrganisationSection } from "@/components/sections/company-sections";
import { portfolioAssets } from "@/lib/assets";
import { brandLayers } from "@/lib/brand";
import { mission, purpose, responsibility, vision } from "@/lib/strategy";
import { brand, localePath, type SiteLocale } from "@/lib/site-data";

const copy = {
  ro: {
    eyebrow: "Despre",
    title: ["Cine este", "MEGAPARC?"],
    lead: "O platformă integrată de investiții imobiliare cu baza în Republica Moldova și un mandat de investiții global, construită pe moștenirea antreprenorială a grupului din 1995 și fondată ca MEGAPARC în 2005.",
    identityIndex: "Identitate",
    identityTitle: "Trei straturi. O singură identitate.",
    identityText: "Un brand emoțional, o filosofie de investiție și un model de afaceri, care lucrează împreună.",
    layers: [
      ["Ideea de brand", "Construim viitorul."],
      ["Filosofia de investiție", "Imobiliare administrate ca capital"],
      ["Modelul de afaceri", "Investim · Dezvoltăm · Administrăm · Creăm valoare"],
      ["Poziționare", "Platformă integrată de investiții imobiliare"],
      ["Geografie de investiții", "Moldova: baza operațională verificată · Piețe globale: universul de oportunități"],
    ],
    imageCaption: "Moscova 20 · activ operațional",
    missionIndex: "Scop · Misiune · Viziune",
    responsibilityCta: "Cum gândim",
    contactCta: "Discută un parteneriat",
  },
  ru: {
    eyebrow: "О компании",
    title: ["Кто такая", "MEGAPARC?"],
    lead: "Интегрированная платформа инвестиций в недвижимость с базой в Республике Молдова и глобальным инвестиционным мандатом, построенная на предпринимательском наследии группы с 1995 года и основанная как MEGAPARC в 2005 году.",
    identityIndex: "Идентичность",
    identityTitle: "Три слоя. Одна идентичность.",
    identityText: "Эмоциональная идея бренда, инвестиционная философия и бизнес-модель, которые работают вместе.",
    layers: [
      ["Идея бренда", "Строим будущее."],
      ["Инвестиционная философия", "Недвижимость, управляемая как капитал"],
      ["Бизнес-модель", "Инвестируем · Развиваем · Управляем · Создаём стоимость"],
      ["Позиционирование", "Интегрированная платформа инвестиций в недвижимость"],
      ["География инвестиций", "Молдова: проверенная операционная база · Глобальные рынки: вселенная возможностей"],
    ],
    imageCaption: "Moscova 20 · операционный актив",
    missionIndex: "Цель · Миссия · Видение",
    responsibilityCta: "Как мы мыслим",
    contactCta: "Обсудить партнёрство",
  },
  en: {
    eyebrow: "About",
    title: ["Who is", "MEGAPARC?"],
    lead: "An integrated real-estate investment platform based in the Republic of Moldova with a global investment mandate, built on the group's entrepreneurial heritage since 1995 and established as MEGAPARC in 2005.",
    identityIndex: "Identity",
    identityTitle: "Three layers. One identity.",
    identityText: "An emotional brand idea, an investment philosophy and a business model that work together.",
    layers: [
      ["Brand idea", "We build the future."],
      ["Investment philosophy", "Real estate managed as capital"],
      ["Business model", "Invest · Develop · Manage · Create value"],
      ["Positioning", "Integrated real estate investment platform"],
      ["Investment geography", "Moldova: verified operating base · Global markets: the opportunity universe"],
    ],
    imageCaption: "Moscova 20 · operating asset",
    missionIndex: "Purpose · Mission · Vision",
    responsibilityCta: "How we think",
    contactCta: "Discuss a partnership",
  },
} as const;

export function AboutPage({ locale }: { locale: SiteLocale }) {
  const c = copy[locale];
  const image = portfolioAssets.find((asset) => asset.slug === "moscova-20")!;
  let n = 1;
  const no = () => String(++n).padStart(2, "0");

  return (
    <PageShell locale={locale}>
      <PageHero
        index="01"
        eyebrow={c.eyebrow}
        title={
          <>
            {c.title[0]}
            <br />
            <span className="muted-ink">{c.title[1]}</span>
          </>
        }
        lead={c.lead}
      >
        <span className="label label--red" lang="en">{brand.since}</span>
      </PageHero>

      <section className="pairs stone" id="identity">
        <div className="shell">
          <SectionIndex no={no()}>{c.identityIndex}</SectionIndex>
          <SectionHead title={c.identityTitle} text={c.identityText} />
          <dl className="fact-list" data-reveal>
            {c.layers.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <HistorySection locale={locale} no={no()} surface="paper" supporting />

      <ImageBreak media={image.media!} alt={`${image.name} — ${image.positioning[locale]}`} caption={c.imageCaption} />

      <section className="pairs ink" id="mission">
        <div className="shell">
          <SectionIndex no={no()} inverse>{c.missionIndex}</SectionIndex>
          <SectionHead title={purpose.text[locale]} />
          <div className="pairs__grid">
            <article data-reveal>
              <h3>{mission.title[locale]}</h3>
              <p>{mission.text[locale]}</p>
            </article>
            <article data-reveal>
              <h3>{vision.title[locale]}</h3>
              <p>{vision.text[locale]}</p>
            </article>
          </div>
        </div>
      </section>

      <OrganisationSection locale={locale} no={no()} />

      <section className="owner stone" id="responsibility">
        <div className="shell">
          <SectionIndex no={no()}>{responsibility.title[locale]}</SectionIndex>
          <div className="owner__grid" data-reveal>
            <p className="owner__statement">{responsibility.text[locale]}</p>
            <div className="owner__actions">
              <span className="label label--red">{brandLayers.model[locale]}</span>
              <ArrowLink href={localePath(locale, "/approach")}>{c.responsibilityCta}</ArrowLink>
              <ArrowLink href={`${localePath(locale, "/contact")}#partnership`}>{c.contactCta}</ArrowLink>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

import Image from "next/image";
import { PageShell } from "@/components/page-shell";
import { ArrowLink, PageHero, SectionIndex } from "@/components/primitives";
import { localePath, portfolioAssets, type SiteLocale } from "@/lib/site-data";

const copy = {
  ro: {
    eyebrow: "Platformă de investiții",
    title: ["Imobiliare administrate", "ca"],
    em: "capital.",
    lead: "MEGAPARC conectează investiția, dezvoltarea și administrarea activelor într-o singură perspectivă de proprietar.",
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
    ownerIndex: "Mentalitate de proprietar",
    ownerTitle: "Fiecare decizie este privită prin prisma calității activului, a utilizării și a valorii pe termen lung.",
    ownerCta: "Vezi portofoliul",
    contactCta: "Discuție corporate",
    heritageIndex: "Repere",
    founded: "2005",
    foundedTitle: "MEGAPARC",
    foundedText: "MEGAPARC a fost fondată în 2005, cu o abordare axată pe achiziția și revitalizarea activelor comerciale.",
    today: "Astăzi",
    todayTitle: "Focus imobiliar",
    todayText: "Strategia actuală este concentrată pe piața imobiliară din Republica Moldova, pe administrarea activelor, dezvoltare și revitalizare urbană.",
  },
  en: {
    eyebrow: "Investment platform",
    title: ["Real estate managed", "as"],
    em: "capital.",
    lead: "MEGAPARC connects investment, development and asset management through one owner-led perspective.",
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
    ownerIndex: "Owner mindset",
    ownerTitle: "Every decision is viewed through asset quality, use and long-term value.",
    ownerCta: "View the portfolio",
    contactCta: "Corporate enquiry",
    heritageIndex: "Selected milestones",
    founded: "2005",
    foundedTitle: "MEGAPARC",
    foundedText: "MEGAPARC was established in 2005 with an approach focused on acquiring and revitalising commercial real-estate assets.",
    today: "Today",
    todayTitle: "Real-estate focus",
    todayText: "The current strategy is focused on real estate in the Republic of Moldova, combining asset management, development and urban revitalisation.",
  },
} as const;

export function AboutPage({ locale }: { locale: SiteLocale }) {
  const c = copy[locale];
  const image = portfolioAssets.find((asset) => asset.slug === "moscova-20")!;

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

      <section className="owner paper">
        <div className="shell">
          <SectionIndex no="04">{c.ownerIndex}</SectionIndex>
          <div className="owner__grid" data-reveal>
            <p className="owner__statement">{c.ownerTitle}</p>
            <div className="owner__actions">
              <ArrowLink href={localePath(locale, "/portfolio")}>{c.ownerCta}</ArrowLink>
              <ArrowLink href={localePath(locale, "/contact")}>{c.contactCta}</ArrowLink>
            </div>
          </div>
        </div>
      </section>

      <section className="heritage ink">
        <div className="shell">
          <SectionIndex no="05" inverse>{c.heritageIndex}</SectionIndex>
          <div className="heritage__grid" data-reveal>
            <article>
              <span>{c.founded}</span>
              <h3>{c.foundedTitle}</h3>
              <p>{c.foundedText}</p>
            </article>
            <article>
              <span>{c.today}</span>
              <h3>{c.todayTitle}</h3>
              <p>{c.todayText}</p>
            </article>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

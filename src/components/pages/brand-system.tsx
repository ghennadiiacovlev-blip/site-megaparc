import Image from "next/image";
import { PageShell } from "@/components/page-shell";
import { ScaleSection } from "@/components/scale-section";
import { ArrowLink, AssetMediaBlock, PageHero, SectionIndex } from "@/components/primitives";
import { JourneysSection, OrganisationSection } from "@/components/sections/company-sections";
import { CapitalSection, SignatureSection, ValueCycleSection } from "@/components/sections/strategy-sections";
import { portfolioAssets } from "@/lib/assets";
import { brandColours, brandEssence, brandLayers, glyphSample, graphicDevices, typeScale } from "@/lib/brand";
import { employerBrand } from "@/lib/careers";
import { brand, localePath, type SiteLocale } from "@/lib/site-data";

/**
 * Internal brand-system review route (/brand-system). Not in navigation,
 * noindex, and to be excluded from production unless the OWNER approves.
 * Romanian labels; brand devices stay in their original language.
 */
const toc = [
  ["essence", "Esență"],
  ["positioning", "Poziționare"],
  ["colour", "Culoare"],
  ["type", "Tipografie"],
  ["signature", "Roșu-semnătură"],
  ["dark", "Câmp întunecat"],
  ["metric", "Metrici"],
  ["asset", "Card de activ"],
  ["journeys", "Trasee client"],
  ["team", "Echipă"],
  ["careers", "Cariere"],
  ["photo", "Fotografie"],
  ["motion", "Mișcare"],
  ["cta", "Sistem CTA"],
];

export function BrandSystemPage({ locale }: { locale: SiteLocale }) {
  const dacia = portfolioAssets[0];
  const photos = portfolioAssets.filter((asset) => asset.media);
  let n = 1;
  const no = () => String(++n).padStart(2, "0");

  return (
    <PageShell locale={locale}>
      <PageHero index="01" eyebrow="Brand System 2.0 · revizuire internă" title={<>MEGAPARC<br /><span className="muted-ink">Brand Book 2.0</span></>} lead="Pagină de revizuire pentru OWNER / fondator. Nu face parte din navigația publică și este exclusă de la indexare.">
        <nav className="bs__toc" aria-label="Cuprins">
          {toc.map(([id, label]) => (
            <a key={id} href={`#${id}`}>{label}</a>
          ))}
        </nav>
      </PageHero>

      <section className="bs paper" id="essence">
        <div className="shell">
          <SectionIndex no={no()}>{brandEssence.title[locale]}</SectionIndex>
          <p className="thesis__text" data-reveal>{brandEssence.text[locale]}</p>
          <ul className="journey__steps" style={{ marginTop: "2rem" }}>
            {brandEssence.words[locale].map((word) => (
              <li key={word}>{word}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bs stone" id="positioning">
        <div className="shell">
          <SectionIndex no={no()}>Poziționare · trei straturi</SectionIndex>
          <dl className="fact-list" data-reveal>
            <div><dt>Brand idea</dt><dd>{brandLayers.statement[locale]} · WE BUILD THE FUTURE</dd></div>
            <div><dt>Investment philosophy</dt><dd>{brandLayers.strategicIdea[locale]} · REAL ESTATE MANAGED AS CAPITAL</dd></div>
            <div><dt>Business model</dt><dd>{brandLayers.model[locale]}</dd></div>
            <div><dt>Positioning</dt><dd>{brandLayers.platform[locale]}</dd></div>
            <div><dt>Capabilities</dt><dd>{brand.positioning}</dd></div>
            <div><dt>Heritage</dt><dd>{brand.since} · 2005 MEGAPARC · 2020 Strategic Real Estate Focus</dd></div>
          </dl>
        </div>
      </section>

      <section className="bs paper" id="colour">
        <div className="shell">
          <SectionIndex no={no()}>Sistemul de culoare 2.0</SectionIndex>
          <p className="bs__note" style={{ marginTop: "2rem" }}>
            Roșul de bază este valoarea provizorie derivată din referința logo (JPG). Confirmarea finală se face pe SVG-ul de producție. Culorile marcate PROPOSED sunt propuneri Brand Book 2.0, nu valori din Brand Guidelines 2025.
          </p>
          <div className="bs__grid">
            {brandColours.map((colour) => (
              <div key={colour.token} className="bs__swatch">
                <i style={{ background: colour.hex }} />
                <strong>{colour.name}</strong>
                <span>{colour.hex} · RGB {colour.rgb}<br />{colour.token}</span>
                <span>{colour.role[locale]}</span>
                <em>{colour.status === "proposed" ? "Brand Book 2.0 proposed" : colour.status}</em>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bs paper" id="type">
        <div className="shell">
          <SectionIndex no={no()}>Tipografie · Canva Sans → Geist Sans → Arial → Helvetica → sans-serif</SectionIndex>
          <div className="bs__type">
            {typeScale.map((style) => (
              <div key={style.token}>
                <span>{style.name}<small>{style.token} · {style.use[locale]}</small></span>
                <p className={style.className}>{style.name === "Metric" ? "€25M+ · 5,223 m² · 2.0 ha" : "Imobiliare administrate ca capital"}</p>
              </div>
            ))}
          </div>
          <div className="bs__glyphs" data-reveal>
            <p lang="ro">{glyphSample.ro}</p>
            <p lang="ru">{glyphSample.ru}</p>
            <p lang="en">{glyphSample.en}</p>
          </div>
        </div>
      </section>

      <div id="signature"><SignatureSection locale={locale} /></div>
      <div id="dark"><CapitalSection locale={locale} no={no()} /></div>
      <div id="metric"><ScaleSection locale={locale} no={no()} /></div>

      <section className="bs stone" id="asset">
        <div className="shell">
          <SectionIndex no={no()}>Card de activ · Asset Grid</SectionIndex>
          <div className="asset-pair" style={{ marginTop: "2.5rem" }}>
            <article className="asset-card asset-card--wide" data-reveal>
              <AssetMediaBlock src={dacia.media!.card} alt={dacia.name} position={dacia.media!.position} sizes="56vw" />
              <div className="asset-caption">
                <div>
                  <span className="asset-caption__index">01</span>
                  <div>
                    <h3>{dacia.name}</h3>
                    <span className="asset-caption__positioning">{dacia.positioning[locale]}</span>
                  </div>
                </div>
              </div>
            </article>
            <article className="asset-card asset-card--tall" data-reveal>
              <AssetMediaBlock src={dacia.media!.mobile} alt={dacia.name} position="50% 50%" sizes="36vw" />
              <div className="asset-caption">
                <div>
                  <span className="asset-caption__index">Mobile hero</span>
                  <div>
                    <h3>4 : 5</h3>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <div id="journeys"><JourneysSection locale={locale} no={no()} /></div>
      <div id="team"><OrganisationSection locale={locale} no={no()} compact careersLink={false} /></div>

      <section className="bs ink" id="careers">
        <div className="shell">
          <SectionIndex no={no()} inverse>Employer brand</SectionIndex>
          <h2 className="t-h1" style={{ marginTop: "2rem", display: "grid" }}>
            {employerBrand.direction[locale].map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h2>
          <div style={{ marginTop: "2.5rem" }}>
            <ArrowLink href={localePath(locale, "/careers")} inverse>Vezi Cariere</ArrowLink>
          </div>
        </div>
      </section>

      <section className="bs paper" id="photo">
        <div className="shell">
          <SectionIndex no={no()}>Fotografie · decupaje contextuale</SectionIndex>
          <div className="bs__devices">
            {photos.map((asset) => (
              <article key={asset.slug} data-reveal>
                <div style={{ position: "relative", aspectRatio: "21 / 9", overflow: "hidden", background: "var(--graphite)" }}>
                  <Image src={asset.media!.wide} alt={asset.name} fill sizes="25vw" style={{ objectFit: "cover" }} />
                </div>
                <strong>{asset.name} · Editorial Wide 21:9</strong>
                <p>Hero Desktop · Editorial Wide · Asset Card 4:3 · Mobile Hero 4:5. Tratament: corecție, expunere, saturație reținută. Fără retuș structural.</p>
              </article>
            ))}
          </div>
          <div className="bs__devices" style={{ marginTop: "3rem" }}>
            {graphicDevices.map((device) => (
              <article key={device.name}>
                <strong>{device.name}</strong>
                <p>{device.text[locale]}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div id="motion"><ValueCycleSection locale={locale} no={no()} surface="stone" /></div>

      <section className="bs paper" id="cta">
        <div className="shell">
          <SectionIndex no={no()}>Sistem CTA</SectionIndex>
          <div className="enquiry__actions" style={{ marginTop: "2.5rem" }}>
            <ArrowLink href={localePath(locale, "/contact")}>Solicită detalii</ArrowLink>
            <ArrowLink href={localePath(locale, "/contact")} strong>Discută despre acest activ</ArrowLink>
            <span className="label">Mișcare: reveal lent, linie roșie, metric count-up, depth ±20px · prefers-reduced-motion respectat</span>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

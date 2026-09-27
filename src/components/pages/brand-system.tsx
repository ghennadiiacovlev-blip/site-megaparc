import Image from "next/image";
import { Figures, Moment, Movement, Opening, PropertyList, PropertyRow, Statement, Timeline } from "@/components/editorial";
import { PageShell } from "@/components/page-shell";
import { ArrowLink } from "@/components/primitives";
import { portfolioAssets } from "@/lib/assets";
import { brandColours, brandEssence, brandLayers, glyphSample, graphicDevices, signatureWords, typeScale } from "@/lib/brand";
import { employerBrand } from "@/lib/careers";
import { historyAnchors, historyCopy } from "@/lib/strategy";
import { brand, localePath, type SiteLocale } from "@/lib/site-data";

/**
 * Internal brand-system review route (/brand-system). Not in navigation,
 * noindex, and to be excluded from production unless the OWNER approves.
 * Romanian labels; brand devices stay in their original language.
 * Demonstrates the Art Direction v6 editorial components with live data.
 */
const toc = [
  ["essence", "Esență"],
  ["positioning", "Poziționare"],
  ["colour", "Culoare"],
  ["type", "Tipografie"],
  ["signature", "Roșu-semnătură"],
  ["figures", "Cifre"],
  ["rows", "Rânduri editoriale"],
  ["timeline", "Cronologie"],
  ["careers", "Cariere"],
  ["photo", "Fotografie"],
  ["cta", "Sistem CTA"],
];

export function BrandSystemPage({ locale }: { locale: SiteLocale }) {
  const dacia = portfolioAssets[0];
  const photos = portfolioAssets.filter((asset) => asset.media);

  return (
    <PageShell locale={locale}>
      <Opening eyebrow="Brand System 2.0 · revizuire internă" title={<>MEGAPARC <span className="muted-ink">Brand Book 2.0</span></>} lead="Pagină de revizuire pentru OWNER / fondator. Nu face parte din navigația publică și este exclusă de la indexare.">
        <nav className="anchors" aria-label="Cuprins">
          {toc.map(([id, label]) => (
            <a key={id} href={`#${id}`}>{label}</a>
          ))}
        </nav>
      </Opening>

      <Movement tone="paper" id="essence" tight>
        <div className="shell">
          <Statement no="02" kicker={brandEssence.title[locale]} title={brandEssence.text[locale]} size="md" wide />
          <p className="criteria" data-reveal>
            {brandEssence.words[locale].map((word) => (
              <span key={word}>{word}</span>
            ))}
          </p>
        </div>
      </Movement>

      <Movement tone="stone" id="positioning" tight>
        <div className="shell">
          <Statement no="03" kicker="Poziționare · trei straturi" title={brandLayers.statement[locale]} size="md">
            <dl className="deflist">
              <div><dt>Brand idea</dt><dd>{brandLayers.statement[locale]} · WE BUILD THE FUTURE</dd></div>
              <div><dt>Investment philosophy</dt><dd>{brandLayers.strategicIdea[locale]} · REAL ESTATE MANAGED AS CAPITAL</dd></div>
              <div><dt>Business model</dt><dd>{brandLayers.model[locale]}</dd></div>
              <div><dt>Positioning</dt><dd>{brandLayers.platform[locale]}</dd></div>
              <div><dt>Capabilities</dt><dd>{brand.positioning}</dd></div>
              <div><dt>Heritage</dt><dd>{brand.since} · 2005 MEGAPARC · 2020 Strategic Real Estate Focus</dd></div>
            </dl>
          </Statement>
        </div>
      </Movement>

      <Movement tone="paper" id="colour" tight>
        <div className="shell">
          <Statement no="04" kicker="Sistemul de culoare 2.0" title="Alb arhitectural, carbon, roșu-semnătură." size="md" />
          <p className="bs__note">
            Roșul de bază este valoarea provizorie derivată din referința logo (JPG). Confirmarea finală se face pe SVG-ul de producție. Culorile marcate PROPOSED sunt propuneri Brand Book 2.0, nu valori din Brand Guidelines 2025. Fără gradienturi decorative de brand.
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
      </Movement>

      <Movement tone="paper" id="type" tight>
        <div className="shell">
          <Statement no="05" kicker="Tipografie · Canva Sans → Geist Sans → Arial → Helvetica → sans-serif" title="Cinci niveluri: display, titlu, afirmație, text, etichetă." size="md" />
          <div className="bs__type">
            {typeScale.map((style) => (
              <div key={style.token}>
                <span>{style.name}<small>{style.token} · {style.use[locale]}</small></span>
                <p className={style.className}>{style.name === "Metric" ? "€25M+ · 5,223 m² · 2.0 ha" : "Imobiliarele ca activ de business"}</p>
              </div>
            ))}
          </div>
          <div className="bs__glyphs" data-reveal>
            <p lang="ro">{glyphSample.ro}</p>
            <p lang="ru">{glyphSample.ru}</p>
            <p lang="en">{glyphSample.en}</p>
          </div>
        </div>
      </Movement>

      <div id="signature"><Moment large words={signatureWords[locale]} label={brand.since} text={brandLayers.model[locale]} /></div>

      <Movement tone="ink" id="figures">
        <div className="shell">
          <Statement no="06" kicker="Cifre ca obiect tipografic" title="Cifre mari, tabulare, cu unitate discretă." size="md" inverse />
          <Figures
            inverse
            items={[
              { key: "a", value: <>20.000<b>+</b><small>m²</small></>, label: "Teren pentru dezvoltare", note: "2,0 ha" },
              { key: "b", value: "04", label: "Obiecte în funcțiune" },
              { key: "c", value: "02", label: "Proiecte de dezvoltare" },
              { key: "d", value: "1995", label: "MEGAPARC · since" },
            ]}
          />
        </div>
      </Movement>

      <Movement tone="white" id="rows">
        <div className="shell">
          <Statement no="07" kicker="Rânduri editoriale · Property Row" title="Un limbaj de rânduri, nu un catalog de carduri." size="md" />
          <PropertyList>
            {photos.slice(0, 2).map((asset, i) => (
              <PropertyRow key={asset.slug} href={localePath(locale, `/portfolio/${asset.slug}`)} index={`0${i + 1}`} image={{ src: asset.media!.card, alt: "", position: asset.media!.position }} name={asset.name} place={asset.district[locale]} kind={asset.positioning[locale]} line={asset.headline[locale]} cta="Vezi obiectul" />
            ))}
          </PropertyList>
        </div>
      </Movement>

      <Movement tone="stone" id="timeline">
        <div className="shell">
          <Statement no="08" kicker="Cronologie · Large Years" title="1995 · 2005 · 2020 · astăzi ca ancore tipografice." size="md" />
          <Timeline large items={historyAnchors.map((a) => ({ key: a.year, mark: a.year === "today" ? historyCopy.today[locale] : a.year, scope: a.scope === "group" ? historyCopy.group[locale] : "MEGAPARC", title: a.title[locale], current: a.year === "today" }))} />
        </div>
      </Movement>

      <Movement tone="ink" id="careers">
        <div className="shell">
          <Statement no="09" kicker="Employer brand" title={employerBrand.direction[locale].join(" ")} size="xl" inverse>
            <ArrowLink href={localePath(locale, "/careers")} inverse>Vezi Cariere</ArrowLink>
          </Statement>
        </div>
      </Movement>

      <Movement tone="paper" id="photo">
        <div className="shell">
          <Statement no="10" kicker="Fotografie · decupaje contextuale" title="Decupaje cinematice, orizont corect, fără decorare." size="md" />
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
      </Movement>

      <Movement tone="paper" id="cta" tight>
        <div className="shell">
          <Statement no="11" kicker="Sistem CTA" title={dacia.name} size="md">
            <div className="split__list">
              <ArrowLink href={localePath(locale, "/contact")}>Solicită detalii</ArrowLink>
              <ArrowLink href={localePath(locale, "/contact")} strong>Discută despre acest activ</ArrowLink>
              <span className="label">Mișcare: reveal lent, linie roșie, count-up, depth ±20px · prefers-reduced-motion respectat</span>
            </div>
          </Statement>
        </div>
      </Movement>
    </PageShell>
  );
}

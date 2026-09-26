import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { ScaleSection } from "@/components/scale-section";
import { ArrowLink, ArtImage, AssetMediaBlock, MediaPlaceholder, SectionIndex } from "@/components/primitives";
import { HistorySection, JourneysSection, OrganisationSection } from "@/components/sections/company-sections";
import { CapitalSection, MandateSection, PhilosophySection, PlatformSection, SignatureSection, Strategy2030Teaser, ValueCycleSection } from "@/components/sections/strategy-sections";
import { developmentProjects, portfolioAssets } from "@/lib/assets";
import { developmentNarrative } from "@/lib/strategy";
import { brand, localePath, ui, type SiteLocale } from "@/lib/site-data";

const copy = {
  ro: {
    heroId: "acasa",
    title: ["Construim", "viitorul."],
    lead: "Platformă integrată de investiții imobiliare cu baza în Moldova și un mandat de investiții global. Investim, dezvoltăm și administrăm active cu perspectiva unui proprietar pe termen lung.",
    heroCta: "Descoperă portofoliul",
    portfolioIndex: "Portofoliu",
    portfolioTitle: ["Capital deja", "la lucru."],
    portfolioText: "Active operaționale din portofoliul MEGAPARC, prezentate ca profil de activ: locație, clădire, logică de operare și date verificate. Nu ca anunțuri.",
    portfolioFoot: "Active operaționale · Dezvoltare · Oportunități",
    portfolioCta: "Vezi portofoliul",
    statementLabel: "MEGAPARC / Portofoliu",
    statement: "Nu tratăm proprietățile ca produse izolate. Le privim ca active care trebuie să funcționeze, să se adapteze și să-și păstreze relevanța în timp.",
    developmentIndex: "Dezvoltare",
    developmentTitle: ["Următoarea", "valoare."],
    developmentText: "De la amplasament, la produs, la activ operațional. Dezvoltarea este parte din ciclul de investiție, nu un scop în sine.",
    developmentCta: "Explorează dezvoltarea",
    contactTitle: ["Construim", "ce urmează."],
    contactStatement: "Un singur interlocutor. Trei tipuri de discuție.",
  },
  ru: {
    heroId: "home",
    title: ["Строим", "будущее."],
    lead: "Интегрированная платформа инвестиций в недвижимость с базой в Молдове и глобальным инвестиционным мандатом. Инвестируем, развиваем и управляем активами с позиции долгосрочного собственника.",
    heroCta: "Смотреть портфель",
    portfolioIndex: "Портфель",
    portfolioTitle: ["Капитал уже", "в работе."],
    portfolioText: "Операционные активы портфеля MEGAPARC, представленные как профиль объекта: локация, здание, логика эксплуатации и проверенные данные. Не объявления.",
    portfolioFoot: "Операционные активы · Девелопмент · Возможности",
    portfolioCta: "Смотреть портфель",
    statementLabel: "MEGAPARC / Портфель",
    statement: "Мы не рассматриваем объекты как изолированные продукты. Для нас это активы, которые должны работать, адаптироваться и сохранять актуальность во времени.",
    developmentIndex: "Девелопмент",
    developmentTitle: ["Следующая", "стоимость."],
    developmentText: "От площадки — к продукту — к операционному активу. Девелопмент — часть инвестиционного цикла, а не самоцель.",
    developmentCta: "Смотреть девелопмент",
    contactTitle: ["Строим", "то, что дальше."],
    contactStatement: "Один собеседник. Три типа разговора.",
  },
  en: {
    heroId: "home",
    title: ["We build", "the future."],
    lead: "An integrated real-estate investment platform based in Moldova with a global investment mandate. We invest in, develop and manage assets with a long-term owner's perspective.",
    heroCta: "Explore the portfolio",
    portfolioIndex: "Portfolio",
    portfolioTitle: ["Capital already", "at work."],
    portfolioText: "Operating assets in the MEGAPARC portfolio, presented as asset profiles: location, building, operating logic and verified facts. Not listings.",
    portfolioFoot: "Operating assets · Development · Opportunities",
    portfolioCta: "View the portfolio",
    statementLabel: "MEGAPARC / Portfolio",
    statement: "We do not treat properties as isolated products. We see them as assets that must perform, adapt and keep their relevance over time.",
    developmentIndex: "Development",
    developmentTitle: ["The next", "value."],
    developmentText: "From site, to product, to operating asset. Development is part of the investment cycle, not an end in itself.",
    developmentCta: "Explore development",
    contactTitle: ["We build", "what comes next."],
    contactStatement: "One counterparty. Three kinds of conversation.",
  },
} as const;

function AssetCaption({ index, title, meta, positioning, href, locale }: { index: string; title: string; meta: string; positioning: string; href: string; locale: SiteLocale }) {
  return (
    <div className="asset-caption">
      <div>
        <span className="asset-caption__index">{index}</span>
        <div>
          <h3>{title}</h3>
          <span className="asset-caption__positioning">{positioning}</span>
        </div>
      </div>
      <div className="asset-caption__meta">
        <span>{meta}</span>
        <Link className="asset-caption__link" href={href}>{ui.exploreAsset[locale]} ↗</Link>
      </div>
    </div>
  );
}

export function HomePage({ locale }: { locale: SiteLocale }) {
  const c = copy[locale];
  const [dacia, moscova9, moscova20, creanga] = portfolioAssets;
  const vatra = developmentProjects[0];
  const p = (path: string) => localePath(locale, path);
  let n = 0;
  const no = () => String(++n).padStart(2, "0");

  return (
    <PageShell locale={locale} variant="overlay">
      <section className="hero" id={c.heroId}>
        <div className="hero__media" aria-hidden="true">
          <ArtImage media={dacia.media!} alt="" priority className="hero__image" position="52% 58%" />
          <div className="hero__overlay" />
        </div>
        <div className="hero__content shell">
          <div className="hero__title">
            <p className="hero__brandline">{brand.name}</p>
            <p className="hero__since" lang="en"><i aria-hidden="true" />{brand.since}</p>
            <h1>
              {c.title.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h1>
          </div>
          <div className="hero__footer">
            <div>
              <span className="hero__positioning" lang="en">{brand.positioning}</span>
              <p>{c.lead}</p>
            </div>
            <ArrowLink href={p("/portfolio")} inverse>{c.heroCta}</ArrowLink>
          </div>
          <a className="scroll-cue" href="#philosophy" aria-label={ui.scroll[locale]}>
            <span>{ui.scroll[locale]}</span>
            <i />
          </a>
        </div>
      </section>

      <PhilosophySection locale={locale} no={no()} id="philosophy" />
      <ScaleSection locale={locale} no={no()} surface="stone" />
      <CapitalSection locale={locale} no={no()} />
      <PlatformSection locale={locale} no={no()} />
      <MandateSection locale={locale} no={no()} counts={{ operating: portfolioAssets.length, projects: developmentProjects.length }} />
      <SignatureSection locale={locale} />
      <ValueCycleSection locale={locale} no={no()} surface="stone" />

      <section className="portfolio paper" id="portofoliu">
        <div className="shell">
          <SectionIndex no={no()}>{c.portfolioIndex}</SectionIndex>
          <div className="portfolio__heading" data-reveal>
            <h2>
              {c.portfolioTitle[0]}
              <br />
              {c.portfolioTitle[1]}
            </h2>
            <p>{c.portfolioText}</p>
          </div>

          <article className="asset-feature" data-reveal>
            <AssetMediaBlock src={dacia.media!.src} alt={`${dacia.name} — ${dacia.positioning[locale]}`} position={dacia.media!.position} sizes="92vw" />
            <AssetCaption index="01" title={dacia.name} positioning={dacia.positioning[locale]} meta={`${dacia.district[locale]} · ${dacia.city[locale]}`} href={p(`/portfolio/${dacia.slug}`)} locale={locale} />
          </article>

          <div className="asset-pair">
            <article className="asset-card asset-card--wide" data-reveal>
              <AssetMediaBlock src={moscova9.media!.card} alt={`${moscova9.name} — ${moscova9.positioning[locale]}`} position={moscova9.media!.position} sizes="(max-width: 720px) 92vw, 56vw" />
              <AssetCaption index="02" title={moscova9.name} positioning={moscova9.positioning[locale]} meta={`${moscova9.district[locale]} · ${moscova9.city[locale]}`} href={p(`/portfolio/${moscova9.slug}`)} locale={locale} />
            </article>
            <article className="asset-card asset-card--tall" data-reveal>
              <AssetMediaBlock src={moscova20.media!.mobile} alt={`${moscova20.name} — ${moscova20.positioning[locale]}`} position="50% 50%" sizes="(max-width: 720px) 92vw, 36vw" />
              <AssetCaption index="03" title={moscova20.name} positioning={moscova20.positioning[locale]} meta={`${moscova20.district[locale]} · ${moscova20.city[locale]}`} href={p(`/portfolio/${moscova20.slug}`)} locale={locale} />
            </article>
          </div>

          <article className="asset-card asset-card--placeholder" data-reveal>
            <MediaPlaceholder title={creanga.name} note={ui.photoPending[locale]} />
            <AssetCaption index="04" title={creanga.name} positioning={creanga.positioning[locale]} meta={creanga.city[locale]} href={p(`/portfolio/${creanga.slug}`)} locale={locale} />
          </article>

          <div className="portfolio__footer">
            <span>{c.portfolioFoot}</span>
            <ArrowLink href={p("/portfolio")}>{c.portfolioCta}</ArrowLink>
          </div>

          <div className="portfolio__statement" data-reveal>
            <span>{c.statementLabel}</span>
            <p>{c.statement}</p>
          </div>
        </div>
      </section>

      <section className="development" id="dezvoltare">
        <div className="development__media">
          <Image src={vatra.media!.src} alt={`${vatra.name} — ${vatra.status[locale]}`} fill sizes="100vw" className="development__image" data-depth="24" style={{ objectPosition: vatra.media!.position }} />
          <div className="development__shade" />
        </div>
        <div className="development__content shell">
          <SectionIndex no={no()} inverse>{c.developmentIndex}</SectionIndex>
          <div className="development__copy" data-reveal>
            <div>
              <p className="eyebrow eyebrow--red">{developmentNarrative.title[locale]}</p>
              <h2>
                {c.developmentTitle[0]}
                <br />
                {c.developmentTitle[1]}
              </h2>
            </div>
            <div className="development__aside">
              <p>{c.developmentText}</p>
              <div className="development__stages">
                {developmentProjects.map((project) => (
                  <Link key={project.slug} href={p(`/development/${project.slug}`)}>
                    <span>{project.name}</span>
                    <span>{project.status[locale]}</span>
                  </Link>
                ))}
              </div>
              <ArrowLink href={p("/development")} inverse>{c.developmentCta}</ArrowLink>
            </div>
          </div>
        </div>
      </section>

      <Strategy2030Teaser locale={locale} no={no()} />
      <OrganisationSection locale={locale} no={no()} compact />
      <HistorySection locale={locale} no={no()} aboutLink />
      <JourneysSection locale={locale} no={no()} closing={{ statement: c.contactTitle.join(" "), note: c.contactStatement, label: ui.contactUs[locale], href: p("/contact") }} />

    </PageShell>
  );
}

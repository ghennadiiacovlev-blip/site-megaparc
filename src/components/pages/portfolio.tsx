import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { ArrowLink, MediaPlaceholder, PageHero, SectionHead, SectionIndex } from "@/components/primitives";
import { availableAssets, developmentProjects, portfolioAssets } from "@/lib/assets";
import { localePath, ui, type SiteLocale } from "@/lib/site-data";

const copy = {
  ro: {
    eyebrow: "Portofoliu",
    title: ["Ce capital", "lucrează deja?"],
    lead: "Portofoliul MEGAPARC este prezentat ca un portofoliu instituțional curatoriat, nu ca o piață: active operaționale, proiecte de dezvoltare și modurile de a lucra cu platforma.",
    categories: ["Active operaționale", "Dezvoltare", "Oportunități"],
    operatingIndex: "Active operaționale",
    operatingTitle: "Patru active. O singură perspectivă de proprietar.",
    operatingText: "Fiecare activ răspunde la aceleași întrebări: ce este, de ce contează locația, cum poate funcționa, ce îl face distinct și cum rămâne relevant în timp.",
    developmentIndex: "Dezvoltare",
    developmentTitle: ["Proiecte gândite", "ca active."],
    developmentText: "Proiectele și conceptele de dezvoltare sunt prezentate numai cu materiale și date aprobate pentru comunicare publică.",
    developmentCta: "Vezi Dezvoltare",
    opportunitiesIndex: "Oportunități",
    opportunitiesTitle: "Un activ disponibil este o discuție, nu un anunț.",
    opportunitiesText: "Activele cu disponibilitate confirmată, propunerile de proprietăți și parteneriatele sunt prezentate pe pagina Oportunități.",
    opportunitiesCta: "Lucrează cu MEGAPARC",
    available: "active cu disponibilitate confirmată",
  },
  ru: {
    eyebrow: "Портфель",
    title: ["Какой капитал", "уже работает?"],
    lead: "Портфель MEGAPARC представлен как курируемый институциональный портфель, а не как маркетплейс: операционные активы, девелоперские проекты и способы работать с платформой.",
    categories: ["Операционные активы", "Девелопмент", "Возможности"],
    operatingIndex: "Операционные активы",
    operatingTitle: "Четыре актива. Одна позиция собственника.",
    operatingText: "Каждый актив отвечает на одни и те же вопросы: что это, почему важна локация, как он может работать, что делает его особенным и как он остаётся актуальным во времени.",
    developmentIndex: "Девелопмент",
    developmentTitle: ["Проекты, задуманные", "как активы."],
    developmentText: "Девелоперские проекты и концепции представлены только с материалами и данными, утверждёнными для публичной коммуникации.",
    developmentCta: "Смотреть девелопмент",
    opportunitiesIndex: "Возможности",
    opportunitiesTitle: "Доступный актив — это разговор, а не объявление.",
    opportunitiesText: "Активы с подтверждённой доступностью, предложения объектов и партнёрства представлены на странице Возможности.",
    opportunitiesCta: "Работать с MEGAPARC",
    available: "актива с подтверждённой доступностью",
  },
  en: {
    eyebrow: "Portfolio",
    title: ["What capital", "is already at work?"],
    lead: "The MEGAPARC portfolio is presented as a curated institutional portfolio, not a marketplace: operating assets, development projects and the ways to work with the platform.",
    categories: ["Operating assets", "Development", "Opportunities"],
    operatingIndex: "Operating assets",
    operatingTitle: "Four assets. One owner's perspective.",
    operatingText: "Every asset answers the same questions: what it is, why the location matters, how it can work, what makes it distinctive and how it stays relevant over time.",
    developmentIndex: "Development",
    developmentTitle: ["Projects conceived", "as assets."],
    developmentText: "Development projects and concepts are presented only with material and data approved for public communication.",
    developmentCta: "View Development",
    opportunitiesIndex: "Opportunities",
    opportunitiesTitle: "An available asset is a conversation, not a listing.",
    opportunitiesText: "Assets with confirmed availability, property proposals and partnerships are presented on the Opportunities page.",
    opportunitiesCta: "Work with MEGAPARC",
    available: "assets with confirmed availability",
  },
} as const;

export function PortfolioIndexPage({ locale }: { locale: SiteLocale }) {
  const c = copy[locale];
  const p = (path: string) => localePath(locale, path);

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
        <nav className="portfolio__categories" aria-label={c.eyebrow}>
          <a href="#operating" className="is-active">{c.categories[0]}<b>{String(portfolioAssets.length).padStart(2, "0")}</b></a>
          <a href="#development">{c.categories[1]}<b>{String(developmentProjects.length).padStart(2, "0")}</b></a>
          <Link href={p("/opportunities")}>{c.categories[2]}<b>{String(availableAssets.length).padStart(2, "0")}</b></Link>
        </nav>
      </PageHero>

      <section className="portfolio-index paper" id="operating">
        <div className="shell">
          <SectionIndex no="02">{c.operatingIndex}</SectionIndex>
          <SectionHead title={c.operatingTitle} text={c.operatingText} />
          <div className="portfolio-index__grid">
            {portfolioAssets.map((asset, index) => (
              <Link key={asset.slug} href={p(`/portfolio/${asset.slug}`)} className={`portfolio-index__card portfolio-index__card--${index + 1}`} data-reveal>
                <div className="portfolio-index__visual">
                  {asset.media ? (
                    <Image
                      src={index === 0 ? asset.media.src : asset.media.card}
                      alt={`${asset.name} — ${asset.positioning[locale]}`}
                      fill
                      priority={index === 0}
                      sizes={index === 0 ? "(max-width: 720px) 92vw, 62vw" : "(max-width: 720px) 92vw, 42vw"}
                      style={{ objectPosition: asset.media.position ?? "center" }}
                      className="portfolio-index__image"
                      data-depth="16"
                    />
                  ) : (
                    <MediaPlaceholder title={asset.name} note={ui.photoPending[locale]} compact />
                  )}
                  <span className="asset-media__line" aria-hidden="true" />
                </div>
                <div className="portfolio-index__caption">
                  <div>
                    <span>0{index + 1}</span>
                    <div>
                      <h2>{asset.name}</h2>
                      <span className="portfolio-index__positioning">{asset.headline[locale]}</span>
                    </div>
                  </div>
                  <div>
                    <span>{asset.district.en === asset.city.en ? asset.city[locale] : `${asset.district[locale]} · ${asset.city[locale]}`}</span>
                    {asset.availability ? <span>{ui.availability[locale]} · {asset.availability.area[locale]}</span> : null}
                    <span className="portfolio-index__cta">{ui.exploreAsset[locale]} ↗</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="portfolio-development ink" id="development">
        <div className="shell">
          <SectionIndex no="03" inverse>{c.developmentIndex}</SectionIndex>
          <div className="portfolio-development__heading" data-reveal>
            <h2>
              {c.developmentTitle[0]}
              <br />
              {c.developmentTitle[1]}
            </h2>
            <div className="section-head__aside">
              <p>{c.developmentText}</p>
              <ArrowLink href={p("/development")} inverse>{c.developmentCta}</ArrowLink>
            </div>
          </div>
          <div className="pipeline">
            {developmentProjects.map((project, index) => (
              <Link key={project.slug} href={p(`/development/${project.slug}`)} className="pipeline__card" data-reveal>
                <div className="pipeline__visual">
                  {project.media ? (
                    <Image src={project.media.card} alt={`${project.name} — ${project.status[locale]}`} fill sizes="(max-width: 720px) 92vw, 46vw" className="pipeline__image" data-depth="18" style={{ objectPosition: "50% 60%" }} />
                  ) : (
                    <MediaPlaceholder title={project.name} note={project.status[locale]} compact />
                  )}
                  <span className="asset-media__line" aria-hidden="true" />
                </div>
                <div className="pipeline__caption">
                  <div>
                    <span className="pipeline__no">0{index + 1}</span>
                    <h3>{project.name}</h3>
                  </div>
                  <div>
                    <span>{project.status[locale]}</span>
                    <span>{project.place[locale]}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="closing stone" id="opportunities">
        <div className="shell closing__grid" data-reveal>
          <span className="label label--red">04 / {c.opportunitiesIndex}</span>
          <div>
            <p className="closing__statement">{c.opportunitiesTitle}</p>
            <p className="note" style={{ marginBottom: "2rem" }}>{c.opportunitiesText} {String(availableAssets.length).padStart(2, "0")} {c.available}.</p>
            <ArrowLink href={p("/opportunities")}>{c.opportunitiesCta}</ArrowLink>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

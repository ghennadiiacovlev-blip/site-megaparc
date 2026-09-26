import Image from "next/image";
import Link from "next/link";
import { ArrowLink, Note, SectionHead, SectionIndex } from "@/components/primitives";
import { clientJourneys, journeysCopy } from "@/lib/client-journeys";
import { historyAnchors, historyCopy } from "@/lib/strategy";
import { organisationAreas, peopleCopy, publicTeam } from "@/lib/team";
import { brand, localePath, type Localized, type SiteLocale } from "@/lib/site-data";

type Surface = "paper" | "stone" | "ink" | "graphite";
const isDark = (surface: Surface) => surface === "ink" || surface === "graphite";

/* ------------------------------------------------------------------ */
/* Organisation — team and competencies                                 */
/* ------------------------------------------------------------------ */

const orgCopy = {
  careers: { ro: "Cariere la MEGAPARC", ru: "Карьера в MEGAPARC", en: "Careers at MEGAPARC" },
} satisfies Record<string, Localized>;

export function OrganisationSection({
  locale,
  no,
  surface = "paper",
  careersLink = true,
  compact = false,
}: {
  locale: SiteLocale;
  no: string;
  surface?: Surface;
  careersLink?: boolean;
  compact?: boolean;
}) {
  return (
    <section className={`organisation ${surface}`} id="organisation">
      <div className="shell">
        <SectionIndex no={no} inverse={isDark(surface)}>{peopleCopy.kicker[locale]}</SectionIndex>
        <SectionHead title={peopleCopy.title[locale]} text={peopleCopy.text[locale]} wide />
        {publicTeam.length ? (
          <div className="organisation__grid">
            {publicTeam.map((member) => (
              <article key={member.name} className="team-member" data-reveal>
                <div className="team-member__portrait">{member.image ? <Image src={member.image} alt={member.name} fill sizes="25vw" /> : null}</div>
                <h3>{member.name}</h3>
                <p>{member.role[locale]}</p>
              </article>
            ))}
          </div>
        ) : null}
        <div className="organisation__grid">
          {organisationAreas.map((area) => (
            <article key={area.key} className="org-area" data-reveal>
              <div className="org-area__visual" aria-hidden="true">
                <span>{brand.name} · {area.no}</span>
                <strong>{area.no}</strong>
              </div>
              <div className="org-area__body">
                <h3>{area.title[locale]}</h3>
                <p className="org-area__lead">{area.lead[locale]}</p>
                {compact ? null : (
                  <ul className="org-area__list">
                    {area.responsibilities[locale].map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          ))}
        </div>
        <div className="organisation__foot" data-reveal>
          <Note light={isDark(surface)}>{peopleCopy.placeholderNote[locale]}</Note>
          {careersLink ? <ArrowLink href={localePath(locale, "/careers")} inverse={isDark(surface)}>{orgCopy.careers[locale]}</ArrowLink> : null}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* History — 1995 · 2005 · 2020 · Today                                 */
/* ------------------------------------------------------------------ */

const historySectionCopy = {
  kicker: { ro: "Istoric", ru: "История", en: "History" },
  title: { ro: "Trei decenii de experiență.", ru: "Три десятилетия опыта.", en: "Three decades of experience." },
  text: {
    ro: "Experiența grupului din 1995, MEGAPARC din 2005, focus pe imobiliare din 2020. Astăzi: investim, dezvoltăm, administrăm.",
    ru: "Опыт группы с 1995 года, MEGAPARC с 2005 года, фокус на недвижимости с 2020 года. Сегодня: инвестируем, развиваем, управляем.",
    en: "Group experience since 1995, MEGAPARC since 2005, a focus on real estate since 2020. Today: we invest, develop and manage.",
  },
  cta: { ro: "Despre MEGAPARC", ru: "О компании", en: "About MEGAPARC" },
} satisfies Record<string, Localized>;

export function HistorySection({
  locale,
  no,
  surface = "stone",
  supporting = false,
  aboutLink = false,
  id = "history",
}: {
  locale: SiteLocale;
  no: string;
  surface?: Surface;
  supporting?: boolean;
  aboutLink?: boolean;
  id?: string;
}) {
  return (
    <section className={`history-band ${surface}`} id={id}>
      <div className="shell">
        <SectionIndex no={no} inverse={isDark(surface)}>{historySectionCopy.kicker[locale]}</SectionIndex>
        <SectionHead title={historySectionCopy.title[locale]} text={historySectionCopy.text[locale]}>
          {aboutLink ? <ArrowLink href={localePath(locale, "/about")} inverse={isDark(surface)}>{historySectionCopy.cta[locale]}</ArrowLink> : null}
        </SectionHead>
        <ol className="history-band__grid">
          {historyAnchors.map((anchor) => (
            <li key={anchor.year} className={`history-band__item history-band__item--${anchor.scope}`} data-reveal>
              <span className="history-band__scope">{anchor.scope === "group" ? historyCopy.group[locale] : historyCopy.megaparc[locale]}</span>
              <span className={`history-band__year${anchor.year === "today" ? " history-band__year--today" : ""}`}>
                {anchor.year === "today" ? historyCopy.today[locale] : anchor.year}
              </span>
              <h3>{anchor.title[locale]}</h3>
              <p>{anchor.text[locale]}</p>
            </li>
          ))}
        </ol>
        {supporting ? (
          <ul className="history-band__supporting" data-reveal>
            {historyCopy.supporting.map((item) => (
              <li key={item.year}>
                <span>{item.year} · {historyCopy.group[locale]}</span>
                <strong>{item.title[locale]}</strong>
                <p>{item.text[locale]}</p>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Client journeys — Work with MEGAPARC                                 */
/* ------------------------------------------------------------------ */

export function JourneysSection({
  locale,
  no,
  surface = "ink",
  id = "work-with-megaparc",
  closing,
}: {
  locale: SiteLocale;
  no: string;
  surface?: Surface;
  id?: string;
  /** Optional compact contact finale (Home): statement + one CTA, replacing a separate contact section. */
  closing?: { statement: string; note: string; label: string; href: string };
}) {
  const dark = isDark(surface);
  return (
    <section className={`journeys ${surface}`} id={id}>
      <div className="shell">
        <SectionIndex no={no} inverse={dark}>{journeysCopy.kicker[locale]}</SectionIndex>
        <SectionHead title={journeysCopy.title[locale]} text={journeysCopy.text[locale]} />
        <div className="journeys__list">
          {clientJourneys.map((journey) => (
            <Link key={journey.key} href={`${localePath(locale, journey.path)}#${journey.anchor}`} className="journey" data-reveal>
              <span className="journey__no">{journey.no}</span>
              <div>
                <h3>{journey.title[locale]}</h3>
                <p className="journey__audience">{journey.audience[locale]}</p>
              </div>
              <div className="journey__body">
                <p>{journey.lead[locale]}</p>
              </div>
              <span className="journey__cta">
                <span className={`arrow-link${dark ? " arrow-link--inverse" : ""}`}>
                  <span>{journey.cta[locale]}</span>
                  <span className="arrow-link__icon" aria-hidden="true">↗</span>
                </span>
              </span>
            </Link>
          ))}
        </div>
        {closing ? (
          <div className="journeys__foot" id="contact" data-reveal>
            <div>
              <p className="journeys__closing">{closing.statement}</p>
              <span className="journeys__note">{closing.note}</span>
            </div>
            <ArrowLink href={closing.href} inverse={dark} strong>{closing.label}</ArrowLink>
          </div>
        ) : null}
      </div>
    </section>
  );
}

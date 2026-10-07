import Link from "next/link";
import type { CSSProperties } from "react";
import { ConceptImage, Ledger, MaskTitle, Opening } from "@/components/experience";
import { LocationSection } from "@/components/location-section";
import { PageShell } from "@/components/page-shell";
import { ArtImage } from "@/components/primitives";
import { Button, Icon, TextLink } from "@/components/ui";
import { drochiaProfile, vatraProfile } from "@/data/demo-content";
import { getNextProject, type DevelopmentProject } from "@/lib/assets";
import { developmentNarrative } from "@/lib/strategy";
import { localePath, type Localized, type SiteLocale } from "@/lib/site-data";

/**
 * Development project / concept page (2026-10-07).
 * VATRA: real aerial imagery, programme figures DEMO, final architecture never
 * shown before approval. Drochia Gateway: CONCEPT · UNDER EVALUATION, concept
 * photo direction only (labelled), parameters subject to review.
 */
const copy = {
  back: { ro: "Dezvoltare", ru: "Девелопмент", en: "Development" },
  project: { ro: "Proiectul", ru: "Проект", en: "The project" },
  facts: { ro: "Date cheie", ru: "Ключевые данные", en: "Key facts" },
  stage: { ro: "Etapa proiectului", ru: "Стадия проекта", en: "Project stage" },
  stageTitle: { ro: "Unde se află acum proiectul.", ru: "Где сейчас проект.", en: "Where the project stands now." },
  site: { ro: "Teren", ru: "Участок", en: "Site" },
  programme: { ro: "Program", ru: "Программа", en: "Programme" },
  gba: { ro: "Suprafață construită", ru: "Площадь застройки", en: "Gross building area" },
  start: { ro: "Începutul lucrărilor", ru: "Начало работ", en: "Works started" },
  completion: { ro: "Finalizare", ru: "Ввод", en: "Completion" },
  status: { ro: "Status", ru: "Статус", en: "Status" },
  fronts: { ro: "Fronturi stradale", ru: "Фронты к дорогам", en: "Road fronts" },
  potential: { ro: "Potențial construit", ru: "Потенциал застройки", en: "Potential built area" },
  decision: { ro: "Decizie", ru: "Решение", en: "Decision" },
  stageNow: { ro: "Etapa actuală", ru: "Текущая стадия", en: "Current stage" },
  team: { ro: "Pe șantier", ru: "На площадке", en: "On site" },
  teamText: { ro: "Calitatea se controlează pe șantier, nu în prezentări: echipa urmărește lucrările, bugetul și graficul în fiecare săptămână.", ru: "Качество контролируется на площадке, а не в презентациях: команда каждую неделю следит за работами, бюджетом и графиком.", en: "Quality is controlled on site, not in presentations: the team follows works, budget and schedule every week." },
  access: { ro: "Acces și vizibilitate", ru: "Подъезд и видимость", en: "Access and visibility" },
  closeTitle: { ro: "Discutăm proiectul sau terenul dumneavoastră.", ru: "Обсудим проект или ваш участок.", en: "Let's discuss the project — or your land." },
  discuss: { ro: "Discută proiectul", ru: "Обсудить проект", en: "Discuss the project" },
  land: { ro: "Propune un teren", ru: "Предложить участок", en: "Submit a site" },
  next: { ro: "Următorul proiect", ru: "Следующий проект", en: "Next project" },
} satisfies Record<string, Localized>;

export function ProjectDetailPage({ locale, project }: { locale: SiteLocale; project: DevelopmentProject }) {
  const next = getNextProject(project.slug);
  const p = (path: string) => localePath(locale, path);
  const isVatra = project.slug === "vatra";
  const stages = developmentNarrative.stages;
  const sections = project.sections;

  return (
    <PageShell locale={locale} variant="overlay" experience mainClassName="xp-project">
      {/* HERO */}
      <section className="xp-hero xp-hero--page" data-xp-hero>
        <div className="xp-hero__media">
          <div className="xp-hero__frame is-active">
            {project.media ? <ArtImage media={project.media} alt={`${project.name} — ${project.status[locale]}`} priority position="50% 70%" /> : <ConceptImage id="project.drochia.hero" locale={locale} priority />}
          </div>
        </div>
        <div className="xp-hero__veil" aria-hidden="true" />
        <div className="xp-shell xp-hero__copy">
          <Link href={p("/development")} className="back-link back-link--light"><Icon name="left" /> {copy.back[locale]}</Link>
          <span className="xp-flag xp-flag--light">{project.status[locale]}{project.media ? "" : ` · ${drochiaProfile.status.value[locale]}`}</span>
          <MaskTitle as="h1" className="xp-hero__title" lines={[project.name]} />
          <p className="xp-hero__lead">{project.lead[locale]}</p>
        </div>
      </section>

      {/* THE PROJECT */}
      <section className="xp-sec xp-sec--warm">
        <div className="xp-shell xp-split xp-split--text">
          <div data-reveal>
            <p className="xp-eyebrow"><span className="xp-eyebrow__no">01</span><span>{copy.project[locale]}</span></p>
            <h2 className="xp-split__title xp-split__title--gap">{project.headline[locale]}</h2>
          </div>
          <div className="xp-prose" data-reveal>
            <p className="xp-lead">{project.intro[locale]}</p>
            {project.disclaimer ? <p className="xp-muted">{project.disclaimer[locale]}</p> : null}
            <Ledger locale={locale} className="xp-ledger--pair" items={
              isVatra
                ? [
                    { label: copy.stageNow[locale], point: vatraProfile.stage },
                    { label: copy.site[locale], point: vatraProfile.site },
                    { label: copy.gba[locale], point: vatraProfile.gba },
                    { label: copy.programme[locale], point: vatraProfile.programme },
                    { label: copy.start[locale], point: vatraProfile.start },
                    { label: copy.completion[locale], point: vatraProfile.completion },
                  ]
                : [
                    { label: copy.site[locale], point: drochiaProfile.site },
                    { label: copy.fronts[locale], point: drochiaProfile.fronts },
                    { label: copy.potential[locale], point: drochiaProfile.potential },
                    { label: copy.decision[locale], point: drochiaProfile.decision },
                  ]
            } />
          </div>
        </div>
      </section>

      {/* STAGE */}
      <section className="xp-sec">
        <div className="xp-shell">
          <Opening no="02" label={copy.stage[locale]} title={copy.stageTitle[locale]} />
          <ol className="xp-process xp-process--stages" style={{ "--n": stages.length } as CSSProperties} data-reveal>
            {stages.map((stage, index) => (
              <li key={stage.no} className={index === project.stage ? "is-current" : index < project.stage ? "is-done" : undefined}>
                <h3>{stage.title[locale]}</h3>
                <p>{stage.text[locale]}</p>
                {index === project.stage ? <span className="xp-scene__tag">{project.name}</span> : null}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* LOCATION (Drochia) */}
      {project.location ? <LocationSection locale={locale} no="03" place={project.place[locale]} area={project.map ? project.map.address : project.place[locale]} text={project.location[locale]} points={project.connectivity} map={project.map} /> : null}

      {/* CONCEPTS / STAGES OF THE PROJECT */}
      {sections.map((block) => (
        <section key={block.title.en} className="xp-sec xp-sec--warm">
          <div className="xp-shell xp-split xp-split--text">
            <div data-reveal>
              <p className="xp-eyebrow"><span className="xp-eyebrow__no">04</span><span>{block.title[locale]}</span></p>
              <h2 className="xp-split__title xp-split__title--gap">{block.text[locale]}</h2>
            </div>
            {block.items ? (
              <ol className="xp-numbered" data-reveal>
                {block.items.map((item) => {
                  const [head, ...rest] = item[locale].split(" — ");
                  return (
                    <li key={item.en}>
                      <h3>{head}</h3>
                      {rest.length ? <p>{rest.join(" — ")}</p> : null}
                    </li>
                  );
                })}
              </ol>
            ) : null}
          </div>
        </section>
      ))}

      {/* IMAGERY — real site depth (VATRA) / concept directions (Drochia) */}
      <section className="xp-sec">
        <div className="xp-shell xp-split xp-split--wide">
          <figure className="xp-fig" style={{ "--ratio": "3 / 2" } as CSSProperties} data-reveal>
            {isVatra ? <ConceptImage id="project.vatra.team" locale={locale} sizes="(min-width: 1024px) 60vw, 100vw" depth={10} /> : <ConceptImage id="project.drochia.road" locale={locale} sizes="(min-width: 1024px) 60vw, 100vw" depth={10} />}
          </figure>
          <div className="xp-split__copy" data-reveal>
            <p className="xp-eyebrow"><span className="xp-eyebrow__no">05</span><span>{isVatra ? copy.team[locale] : copy.access[locale]}</span></p>
            <p className="xp-lead">{isVatra ? copy.teamText[locale] : project.location?.[locale]}</p>
            <p className="xp-muted">{project.statement[locale]}</p>
          </div>
        </div>
      </section>

      {/* CLOSE */}
      <section className="xp-sec xp-sec--ink">
        <div className="xp-shell xp-close">
          <div data-reveal>
            <p className="xp-eyebrow"><span className="xp-eyebrow__no">06</span><span>{project.name}</span></p>
            <h2 className="xp-close__title">{copy.closeTitle[locale]}</h2>
            <div className="xp-actions xp-actions--top">
              <Button href={`${p("/contact")}?subject=partnership#partnership`} variant="light">{copy.discuss[locale]}</Button>
              <TextLink href={`${p("/opportunities")}#owners`} className="tlink--light">{copy.land[locale]}</TextLink>
            </div>
          </div>
          <nav className="xp-close__routes" aria-label={copy.next[locale]} data-reveal>
            <Link href={p(`/development/${next.slug}`)}>
              <span><small className="xp-label">{copy.next[locale]}</small><br />{next.name}</span>
              <Icon name="arrow" size={18} />
            </Link>
            <Link href={p("/development")}>
              {copy.back[locale]}
              <Icon name="arrow" size={18} />
            </Link>
          </nav>
        </div>
      </section>
    </PageShell>
  );
}

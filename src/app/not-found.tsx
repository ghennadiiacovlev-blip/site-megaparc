import Link from "next/link";
import { brand } from "@/lib/site-data";

export default function NotFound() {
  return (
    <main className="not-found ink">
      <div className="shell not-found__inner">
        <span className="label label--red">404 / {brand.name}</span>
        <h1>
          <span lang="ro">Pagina nu există.</span>
          <span lang="en" className="muted-light">Page not found.</span>
        </h1>
        <div className="not-found__actions">
          <Link className="arrow-link arrow-link--inverse" href="/" lang="ro">
            <span>Înapoi la MEGAPARC</span>
            <span className="arrow-link__icon" aria-hidden="true">↗</span>
          </Link>
          <Link className="arrow-link arrow-link--inverse" href="/en" lang="en">
            <span>Back to MEGAPARC</span>
            <span className="arrow-link__icon" aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </main>
  );
}

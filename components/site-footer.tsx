import { site } from "@/lib/site";

// Server Component: static footer with cafe details.
export function SiteFooter() {
  return (
    <footer id="visit" className="scroll-mt-24 border-t border-border bg-surface">
      <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-10 sm:grid-cols-3 sm:px-6">
        <div>
          <div className="flex items-center gap-2 font-semibold">
            <span className="text-xl" aria-hidden>
              ☕
            </span>
            {site.name}
          </div>
          <p className="mt-2 text-sm text-muted">{site.tagline}</p>
        </div>
        <div className="text-sm text-muted">
          <p className="font-medium text-foreground">Visit us</p>
          <p className="mt-2">{site.address}</p>
          <p>{site.hours}</p>
        </div>
        <div className="text-sm text-muted">
          <p className="font-medium text-foreground">Contact</p>
          <p className="mt-2">{site.phone}</p>
        </div>
      </div>
      <div className="border-t border-border px-4 py-4 text-center text-xs text-muted sm:px-6">
        © {site.name}. Built with Next.js.
      </div>
    </footer>
  );
}

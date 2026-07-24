import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Visit or contact ${site.name}.`,
};

const details = [
  { label: "Address", value: site.address, emoji: "📍" },
  { label: "Hours", value: site.hours, emoji: "🕒" },
  { label: "Phone", value: site.phone, emoji: "📞" },
  { label: "Email", value: "hello@caffora.example", emoji: "✉️" },
];

export default function ContactPage() {
  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
        Visit us
      </h1>
      <p className="mt-3 max-w-xl text-lg text-muted">
        Drop by for a cup, or reach out — we&apos;d love to hear from you.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="grid gap-4 sm:grid-cols-2">
          {details.map((d) => (
            <div
              key={d.label}
              className="rounded-card border border-border bg-surface p-5"
            >
              <div className="text-2xl" aria-hidden>
                {d.emoji}
              </div>
              <p className="mt-3 text-sm font-medium uppercase tracking-wide text-muted">
                {d.label}
              </p>
              <p className="mt-1 font-medium text-foreground">{d.value}</p>
            </div>
          ))}
        </div>

        {/* Map placeholder */}
        <div className="flex min-h-64 items-center justify-center rounded-card border border-border bg-surface-muted">
          <div className="text-center text-muted">
            <div className="text-5xl" aria-hidden>
              🗺️
            </div>
            <p className="mt-2 text-sm">{site.address}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.name} — ${site.tagline}`,
};

const values = [
  { emoji: "🌱", title: "Sourced with care", body: "Single-origin beans from farms we know by name, roasted in small batches." },
  { emoji: "🤝", title: "Built for community", body: "A warm room to work, meet, or simply slow down — everyone's welcome." },
  { emoji: "🥐", title: "Baked in-house", body: "Pastries made fresh every morning, never shipped in frozen." },
];

const stats = [
  { value: "2016", label: "Brewing since" },
  { value: "12", label: "Partner farms" },
  { value: "40+", label: "Drinks on the menu" },
  { value: "1M+", label: "Cups poured" },
];

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-border">
        <div className="mx-auto w-full max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-24">
          <p className="font-medium uppercase tracking-widest text-accent">
            Our story
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Coffee, community, and craft
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted">
            {site.blurb} What started as a single espresso machine on {""}
            {site.address.split(",")[0]} has grown into a neighborhood
            fixture — but the mission hasn&apos;t changed.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-3">
          {values.map((v) => (
            <div
              key={v.title}
              className="rounded-card border border-border bg-surface p-6"
            >
              <div className="text-4xl" aria-hidden>
                {v.emoji}
              </div>
              <h3 className="mt-4 font-display text-xl font-semibold text-foreground">
                {v.title}
              </h3>
              <p className="mt-2 text-sm text-muted">{v.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-card border border-border bg-surface px-4 py-10 sm:px-8">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-display text-3xl font-bold text-accent sm:text-4xl">
                  {s.value}
                </div>
                <div className="mt-1 text-sm text-muted">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 rounded-card bg-surface p-8 text-center sm:p-12">
          <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
            Come say hello
          </h2>
          <p className="mt-2 text-muted">{site.hours}</p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/menu"
              className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
            >
              See the menu
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-surface-muted"
            >
              Find us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

import { ArrowRight, Bot, Gauge, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { TopNavigation } from "@/components/layout/top-navigation";
import { curriculum } from "@/data/curriculum";

export default function Home() {
  const metrics = [
    { icon: Bot, value: "15", label: "Core sections" },
    { icon: Gauge, value: "20", label: "Week study plan" },
    { icon: ShieldCheck, value: "Production", label: "Reliability first" },
  ];

  return (
    <div className="min-h-screen">
      <TopNavigation />
      <main>
        <section className="border-b border-[var(--border)]">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1fr_22rem] lg:items-end">
            <div>
              <p className="eyebrow">Technical learning book</p>
              <h1 className="mt-5 max-w-3xl text-5xl leading-[1.02] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
                Agentic AI Engineering
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-[var(--muted)] sm:text-xl">
                Learn to design, build, evaluate and deploy reliable AI systems that use tools,
                retrieve knowledge and operate within clear engineering boundaries.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={`/book/${curriculum[0].slug}`} className="primary-button">
                  Start reading
                  <ArrowRight aria-hidden="true" size={16} />
                </Link>
                <a href="#roadmap" className="secondary-button">View roadmap</a>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--border)] lg:grid-cols-1">
              {metrics.map(({ icon: Icon, value, label }) => (
                <div key={label} className="bg-[var(--background)] p-4 lg:flex lg:items-center lg:gap-3">
                  <Icon aria-hidden="true" className="mb-3 text-[var(--accent)] lg:mb-0" size={18} />
                  <div>
                    <div className="font-semibold">{value}</div>
                    <div className="mt-0.5 text-xs text-[var(--muted)]">{label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="roadmap" className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Learning sequence</p>
              <h2 className="mt-3 text-3xl tracking-tight sm:text-4xl">The curriculum</h2>
            </div>
            <span className="hidden text-sm text-[var(--muted)] sm:block">15 sections · 02–16</span>
          </div>
          <ol className="grid gap-px overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--border)] md:grid-cols-2 xl:grid-cols-3">
            {curriculum.map((section) => (
              <li key={section.slug} className="bg-[var(--background)]">
                <Link
                  href={`/book/${section.slug}`}
                  className="group flex min-h-44 flex-col p-5 transition-colors hover:bg-[var(--surface)]"
                >
                  <span className="text-xs font-semibold tabular-nums text-[var(--accent)]">
                    {String(section.sequence).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-lg leading-6">{section.title}</h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-[var(--muted)]">
                    {section.description}
                  </p>
                  <span className="mt-auto flex items-center gap-1 pt-5 text-sm font-medium">
                    Explore section
                    <ArrowRight aria-hidden="true" size={14} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </section>
      </main>
    </div>
  );
}

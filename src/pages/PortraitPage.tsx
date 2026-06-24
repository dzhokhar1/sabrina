import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { portrait } from "@/data/portrait"
import { Progress } from "@/components/ui/progress"

export function PortraitPage() {
  return (
    <article className="flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <Link
          to="/app"
          className="inline-flex w-fit items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-ink"
        >
          <ArrowLeft className="size-4" /> В кабинет
        </Link>
        <span className="eyebrow">Профиль · Психологический портрет</span>
        <h1 className="max-w-2xl text-balance font-serif text-4xl font-semibold leading-[1.08] text-ink sm:text-5xl">
          Ваш психологический портрет
        </h1>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
        {/* Reading column */}
        <div className="max-w-prose">
          <p className="dropcap text-xl leading-relaxed text-ink">{portrait.intro}</p>
          <div className="mt-6 flex flex-col gap-5 text-lg leading-relaxed text-ink-muted">
            {portrait.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <blockquote className="my-10 border-l-2 border-primary pl-6 font-serif text-2xl italic leading-snug text-ink">
            «{portrait.pullQuote}»
          </blockquote>

          <p className="rounded-lg border border-dashed border-hairline px-4 py-3 text-xs leading-relaxed text-ink-muted">
            Это демонстрационный пример. Настоящий психологический тест появится
            в следующих версиях Cerveau.
          </p>
        </div>

        {/* Sidebar metrics */}
        <aside className="flex h-fit flex-col gap-8 rounded-2xl border border-hairline bg-card p-6 sm:p-8 lg:sticky lg:top-24">
          <div>
            <span className="eyebrow">Показатели</span>
            <div className="mt-5 flex flex-col gap-5">
              {portrait.metrics.map((m) => (
                <div key={m.label} className="flex flex-col gap-2">
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-medium text-ink">{m.label}</span>
                    <span className="text-sm text-ink-muted">
                      {m.value !== null ? `${m.value}%` : m.qualitative}
                    </span>
                  </div>
                  {m.value !== null && <Progress value={m.value} className="h-1.5" />}
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-hairline pt-6">
            <span className="eyebrow">Ценности</span>
            <div className="mt-4 flex flex-wrap gap-2">
              {portrait.values.map((v) => (
                <span
                  key={v}
                  className="rounded-full bg-secondary px-3 py-1 text-sm font-medium text-ink"
                >
                  {v}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </article>
  )
}

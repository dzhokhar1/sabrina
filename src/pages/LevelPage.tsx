import { Link } from "react-router-dom"
import { ArrowLeft, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { level } from "@/data/level"

export function LevelPage() {
  return (
    <article className="flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <Link
          to="/app"
          className="inline-flex w-fit items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-ink"
        >
          <ArrowLeft className="size-4" /> В кабинет
        </Link>
        <span className="eyebrow">Профиль · Уровень знаний</span>
        <h1 className="max-w-2xl text-balance font-serif text-4xl font-semibold leading-[1.08] text-ink sm:text-5xl">
          Ваш уровень знаний
        </h1>
      </div>

      {/* Ступени */}
      <div className="rounded-2xl border border-hairline bg-card p-6 sm:p-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="eyebrow">Текущая ступень</span>
            <p className="mt-1.5 font-serif text-3xl font-semibold text-primary">
              {level.level}
            </p>
          </div>
          <span className="text-sm text-ink-muted">
            Ступень {level.stageIndex + 1} из {level.stages.length}
          </span>
        </div>

        <div className="mt-6 flex gap-1.5">
          {level.stages.map((stage, i) => {
            const reached = i <= level.stageIndex
            return (
              <div key={stage} className="flex flex-1 flex-col gap-2">
                <div
                  className={cn(
                    "h-1.5 rounded-full",
                    reached ? "bg-primary" : "bg-hairline",
                  )}
                />
                <span
                  className={cn(
                    "text-xs",
                    i === level.stageIndex ? "font-medium text-ink" : "text-ink-muted",
                  )}
                >
                  {stage}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        <div className="max-w-prose">
          <p className="text-xl leading-relaxed text-ink">{level.intro}</p>
          <div className="mt-6 flex flex-col gap-5 text-lg leading-relaxed text-ink-muted">
            {level.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <p className="mt-8 rounded-lg border border-dashed border-hairline px-4 py-3 text-xs leading-relaxed text-ink-muted">
            Это демонстрация. Настоящее определение уровня знаний появится позже.
          </p>
        </div>

        <aside className="h-fit rounded-2xl border border-hairline bg-card p-6 sm:p-8">
          <span className="eyebrow">Подобрано для вас</span>
          <ul className="mt-5 flex flex-col gap-4">
            {level.materials.map((m) => (
              <li key={m.title} className="flex items-start gap-3">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Check className="size-3.5" strokeWidth={2.5} />
                </span>
                <div>
                  <p className="font-medium text-ink">{m.title}</p>
                  <p className="text-sm text-ink-muted">{m.note}</p>
                </div>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </article>
  )
}

import { cn } from "@/lib/utils"
import { PERCEPTION, type PerceptionType } from "@/data/perception"

interface PerceptionCardProps {
  type: PerceptionType
  className?: string
}

/** Героическая карточка «Ваш тип восприятия» для личного кабинета. */
export function PerceptionCard({ type, className }: PerceptionCardProps) {
  const meta = PERCEPTION[type]
  const Icon = meta.icon
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border bg-card p-6 sm:p-8",
        meta.border,
        className,
      )}
    >
      {/* мягкий акцентный градиент в углу */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-gradient-to-br blur-2xl",
          meta.gradient,
        )}
      />
      <div className="relative flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <span className="eyebrow">Ваш тип восприятия</span>
          <span
            className={cn(
              "flex size-12 items-center justify-center rounded-xl",
              meta.bgTint,
              meta.text,
            )}
          >
            <Icon className="size-6" strokeWidth={1.75} />
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="font-serif text-3xl font-semibold text-ink sm:text-4xl">
            {meta.headline}
          </h3>
          <p className="max-w-md text-pretty leading-relaxed text-ink-muted">
            {meta.description}
          </p>
        </div>
      </div>
    </div>
  )
}

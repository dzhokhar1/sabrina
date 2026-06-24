import { cn } from "@/lib/utils"
import { PERCEPTION, type PerceptionType } from "@/data/perception"

interface PerceptionBadgeProps {
  type: PerceptionType
  className?: string
  withIcon?: boolean
}

/** Компактный пилюля-бейдж типа восприятия с акцентным цветом. */
export function PerceptionBadge({ type, className, withIcon = true }: PerceptionBadgeProps) {
  const meta = PERCEPTION[type]
  const Icon = meta.icon
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium",
        meta.bgTint,
        meta.text,
        className,
      )}
    >
      {withIcon ? (
        <Icon className="size-3.5" strokeWidth={2} />
      ) : (
        <span className={cn("size-1.5 rounded-full", meta.dot)} />
      )}
      {meta.label}
    </span>
  )
}

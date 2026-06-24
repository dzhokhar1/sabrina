import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  /** Порядковый номер секции, напр. «01» */
  index?: string
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  className?: string
  align?: "left" | "center"
}

/** Редакционный заголовок секции: eyebrow с номером + serif-заголовок. */
export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  className,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {(eyebrow || index) && (
        <span className="eyebrow">
          {index && <span className="text-primary">{index}</span>}
          {index && eyebrow && <span aria-hidden className="text-hairline">—</span>}
          {eyebrow}
        </span>
      )}
      <h2 className="text-balance font-serif text-3xl font-semibold leading-[1.1] text-ink sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "max-w-2xl text-pretty text-ink-muted",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}

import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  /** Сделать логотип ссылкой на указанный путь */
  to?: string
}

/** Редакционный вордмарк Cerveau с минималистичным «синапс»-знаком. */
export function Logo({ className, to = "/" }: LogoProps) {
  const content = (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <circle cx="13" cy="13" r="12" stroke="var(--primary)" strokeWidth="1.25" />
        <circle cx="9" cy="9.5" r="2.1" fill="var(--primary)" />
        <circle cx="17.5" cy="11" r="1.5" fill="var(--audial)" />
        <circle cx="11" cy="17.5" r="1.5" fill="var(--kinesthetic)" />
        <path
          d="M9 9.5 17.5 11M9 9.5 11 17.5M17.5 11 11 17.5"
          stroke="var(--primary)"
          strokeWidth="0.9"
          strokeOpacity="0.55"
        />
      </svg>
      <span className="font-serif text-[1.35rem] font-semibold leading-none tracking-tight text-ink">
        Cerveau
      </span>
    </span>
  )

  if (to) {
    return (
      <Link to={to} className="inline-flex items-center" aria-label="Cerveau — на главную">
        {content}
      </Link>
    )
  }
  return content
}

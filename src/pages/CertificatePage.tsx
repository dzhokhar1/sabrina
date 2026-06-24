import { Link, Navigate, useParams } from "react-router-dom"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { ArrowLeft, Printer } from "lucide-react"
import { getCourse } from "@/data/courses"
import { useUser } from "@/context/UserContext"
import { useProgress } from "@/context/ProgressContext"
import { Button } from "@/components/ui/button"

export function CertificatePage() {
  const { courseId } = useParams()
  const { user } = useUser()
  const { completedCount } = useProgress()
  const course = getCourse(courseId)

  if (!course) return <Navigate to="/app/library" replace />
  if (!user) return null

  const done = completedCount(course.id)
  const finished = done >= course.lectures.length
  const issuedAt = format(new Date(), "d MMMM yyyy", { locale: ru })

  // Курс ещё не пройден — мягко возвращаем на страницу курса
  if (!finished) return <Navigate to={`/app/course/${course.id}`} replace />

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <div className="no-print flex items-center justify-between">
        <Link
          to={`/app/course/${course.id}`}
          className="inline-flex items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-ink"
        >
          <ArrowLeft className="size-4" /> К курсу
        </Link>
        <Button onClick={() => window.print()}>
          <Printer className="size-4" /> Печать / PDF
        </Button>
      </div>

      {/* Сертификат */}
      <div className="rounded-2xl bg-card p-3 shadow-[0_8px_30px_rgba(20,33,61,0.08)] print:shadow-none">
        <div className="relative overflow-hidden rounded-xl border-2 border-primary/30 px-8 py-12 text-center sm:px-14 sm:py-16">
          {/* угловые акценты */}
          <div className="pointer-events-none absolute inset-4 rounded-lg border border-hairline" />

          <p className="eyebrow justify-center text-primary">Cerveau · Сертификат</p>

          <h1 className="mt-6 font-serif text-3xl font-semibold leading-tight text-ink sm:text-4xl">
            Сертификат о прохождении курса
          </h1>

          <p className="mt-8 text-sm uppercase tracking-[0.16em] text-ink-muted">
            Настоящим подтверждается, что
          </p>
          <p className="mt-3 font-serif text-4xl font-semibold text-ink sm:text-5xl">
            {user.firstName} {user.lastName}
          </p>

          <p className="mt-6 text-sm uppercase tracking-[0.16em] text-ink-muted">
            успешно прошёл(ла) курс
          </p>
          <p className="mt-2 font-serif text-2xl font-medium italic text-primary">
            «{course.title}»
          </p>

          {/* печать-марка */}
          <div className="mt-10 flex items-center justify-center">
            <span className="flex size-16 items-center justify-center rounded-full border border-primary/30 bg-primary/5">
              <svg width="34" height="34" viewBox="0 0 26 26" fill="none" aria-hidden>
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
            </span>
          </div>

          <div className="mt-8 flex flex-col items-center gap-1 text-sm text-ink-muted">
            <span className="font-serif text-lg font-semibold text-ink">Cerveau</span>
            <span>Персонализированное обучение · {issuedAt}</span>
          </div>
        </div>
      </div>

      <p className="no-print text-center text-xs text-ink-muted">
        Демонстрационный сертификат. В реальной версии он будет с уникальным номером и проверкой подлинности.
      </p>
    </div>
  )
}

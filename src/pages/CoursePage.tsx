import { Link, Navigate, useParams } from "react-router-dom"
import { ArrowLeft, ArrowRight, Award, Check, Clock } from "lucide-react"
import { getCourse } from "@/data/courses"
import { PERCEPTION } from "@/data/perception"
import { useUser } from "@/context/UserContext"
import { useProgress } from "@/context/ProgressContext"
import { Button } from "@/components/ui/button"
import { PerceptionBadge } from "@/components/common/PerceptionBadge"

export function CoursePage() {
  const { courseId } = useParams()
  const { user } = useUser()
  const { isComplete } = useProgress()
  const course = getCourse(courseId)

  if (!course) return <Navigate to="/app/library" replace />
  if (!user) return null

  const meta = PERCEPTION[user.perceptionType]
  const Icon = course.icon
  const finished = course.lectures.every((l) => isComplete(course.id, l.id))

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-5">
        <Link
          to="/app/library"
          className="inline-flex w-fit items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-ink"
        >
          <ArrowLeft className="size-4" /> К библиотеке
        </Link>

        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
          <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-secondary text-primary">
            <Icon className="size-7" strokeWidth={1.5} />
          </span>
          <div className="flex flex-col gap-3">
            <span className="eyebrow">{course.tag}</span>
            <h1 className="font-serif text-4xl font-semibold leading-tight text-ink">
              {course.title}
            </h1>
            <p className="max-w-2xl text-pretty text-lg leading-relaxed text-ink-muted">
              {course.description}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 rounded-xl border border-hairline bg-card px-4 py-3 text-sm text-ink-muted">
        Ваш формат:
        <PerceptionBadge type={user.perceptionType} />
        — каждую лекцию выдадим как {meta.formatNoun}.
      </div>

      {finished && (
        <div className="flex flex-col gap-4 rounded-2xl border border-primary/30 bg-primary/5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Award className="size-5" strokeWidth={1.75} />
            </span>
            <div>
              <p className="font-serif text-lg font-semibold text-ink">Курс пройден!</p>
              <p className="text-sm text-ink-muted">Заберите сертификат о прохождении.</p>
            </div>
          </div>
          <Button asChild className="shrink-0">
            <Link to={`/app/course/${course.id}/certificate`}>
              Получить сертификат
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      )}

      <div className="flex flex-col gap-3">
        <span className="eyebrow">Лекции курса</span>
        <ul className="flex flex-col gap-3">
          {course.lectures.map((lecture) => {
            const done = isComplete(course.id, lecture.id)
            return (
              <li
                key={lecture.id}
                className="flex flex-col gap-4 rounded-2xl border border-hairline bg-card p-5 transition-colors hover:border-primary/30 sm:flex-row sm:items-center sm:justify-between sm:p-6"
              >
                <div className="min-w-0">
                  <h3 className="flex items-center gap-2 font-serif text-lg font-semibold text-ink">
                    {done && (
                      <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Check className="size-3" strokeWidth={3} />
                      </span>
                    )}
                    {lecture.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                    {lecture.summary}
                  </p>
                  <span className="mt-2 inline-flex items-center gap-1.5 text-xs text-ink-muted">
                    <Clock className="size-3.5" /> {lecture.duration}
                    {done && <span className="text-primary">· пройдено</span>}
                  </span>
                </div>
                <Button asChild variant={done ? "outline" : "default"} className="shrink-0">
                  <Link to={`/app/course/${course.id}/lecture/${lecture.id}`}>
                    {done ? "Открыть снова" : "Получить в моём формате"}
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

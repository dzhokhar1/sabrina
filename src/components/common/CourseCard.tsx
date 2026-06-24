import { Link } from "react-router-dom"
import { ArrowRight, Check } from "lucide-react"
import type { Course } from "@/data/courses"
import { useProgress } from "@/context/ProgressContext"
import { Button } from "@/components/ui/button"

export function CourseCard({ course }: { course: Course }) {
  const Icon = course.icon
  const { completedCount } = useProgress()
  const total = course.lectures.length
  const done = Math.min(completedCount(course.id), total)
  const pct = total ? (done / total) * 100 : 0
  const finished = done === total

  return (
    <div className="group flex flex-col rounded-2xl border border-hairline bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_8px_24px_rgba(20,33,61,0.06)]">
      <div className="flex items-center justify-between">
        <span className="flex size-11 items-center justify-center rounded-xl bg-secondary text-primary">
          <Icon className="size-5" strokeWidth={1.75} />
        </span>
        <span className="rounded-full border border-hairline px-2.5 py-0.5 text-xs font-medium text-ink-muted">
          {course.tag}
        </span>
      </div>

      <h3 className="mt-5 font-serif text-xl font-semibold text-ink">{course.title}</h3>
      <p className="mt-1 text-sm font-medium text-ink-muted">{course.subtitle}</p>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">
        {course.description}
      </p>

      <div className="mt-5 border-t border-hairline pt-4">
        {done > 0 && (
          <div className="mb-3 h-1 overflow-hidden rounded-full bg-hairline">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>
        )}
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-xs text-ink-muted">
            {finished && <Check className="size-3.5 text-primary" strokeWidth={2.5} />}
            {done > 0 ? `${done}/${total} пройдено` : `${total} лекций`}
          </span>
          <Button asChild variant="ghost" size="sm" className="text-primary hover:text-primary">
            <Link to={`/app/course/${course.id}`}>
              {finished ? "Повторить" : done > 0 ? "Продолжить" : "Открыть"}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

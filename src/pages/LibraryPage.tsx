import { useMemo, useState } from "react"
import { Search } from "lucide-react"
import { courses } from "@/data/courses"
import { CourseCard } from "@/components/common/CourseCard"
import { SectionHeading } from "@/components/common/SectionHeading"
import { Input } from "@/components/ui/input"

export function LibraryPage() {
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return courses
    return courses.filter((c) =>
      [c.title, c.subtitle, c.description, c.tag]
        .join(" ")
        .toLowerCase()
        .includes(q),
    )
  }, [query])

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          index="02"
          eyebrow="Библиотека лекций"
          title="Все курсы"
          description="Выберите курс, откройте лекцию и получите её в формате, который подходит именно вам."
        />
        <div className="relative w-full lg:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-muted" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Поиск по курсам…"
            className="pl-9"
            aria-label="Поиск по курсам"
          />
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-hairline bg-card/50 py-16 text-center">
          <p className="font-serif text-xl text-ink">Ничего не найдено</p>
          <p className="mt-1 text-sm text-ink-muted">
            Попробуйте другой запрос — например «английский» или «дизайн».
          </p>
        </div>
      )}
    </div>
  )
}

import { courses } from "@/data/courses"
import { CourseCard } from "@/components/common/CourseCard"
import { SectionHeading } from "@/components/common/SectionHeading"

export function LibraryPage() {
  return (
    <div className="flex flex-col gap-10">
      <SectionHeading
        index="02"
        eyebrow="Библиотека лекций"
        title="Все курсы"
        description="Выберите курс, откройте лекцию и получите её в формате, который подходит именно вам."
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  )
}

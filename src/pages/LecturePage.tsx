import { useEffect, useState } from "react"
import { Link, Navigate, useParams } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { getCourse, getLecture } from "@/data/courses"
import { PERCEPTION } from "@/data/perception"
import { useUser } from "@/context/UserContext"
import { useProgress } from "@/context/ProgressContext"
import { AiThinking } from "@/components/ai/AiThinking"
import { LectureResult } from "@/components/result/LectureResult"

export function LecturePage() {
  const { courseId, lectureId } = useParams()
  const { user } = useUser()
  const { markComplete } = useProgress()
  const course = getCourse(courseId)
  const lecture = getLecture(course, lectureId)

  const [ready, setReady] = useState(false)

  // Перезапускаем «размышление» при смене лекции
  useEffect(() => {
    setReady(false)
  }, [lectureId])

  // Отмечаем лекцию пройденной, когда результат показан
  useEffect(() => {
    if (ready && course && lecture) markComplete(course.id, lecture.id)
  }, [ready, course, lecture, markComplete])

  if (!course || !lecture) return <Navigate to="/app/library" replace />
  if (!user) return null

  const meta = PERCEPTION[user.perceptionType]

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8">
      <div className="flex flex-col gap-3">
        <Link
          to={`/app/course/${course.id}`}
          className="inline-flex w-fit items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-ink"
        >
          <ArrowLeft className="size-4" /> {course.title}
        </Link>
        <h1 className="font-serif text-3xl font-semibold leading-tight text-ink sm:text-4xl">
          {lecture.title}
        </h1>
      </div>

      {ready ? (
        <LectureResult type={user.perceptionType} lectureTitle={lecture.title} />
      ) : (
        <AiThinking accent={meta.accentVar} onDone={() => setReady(true)} />
      )}
    </div>
  )
}

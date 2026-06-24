import { Link } from "react-router-dom"
import { ArrowRight, ArrowUpRight, Sparkles, UploadCloud } from "lucide-react"
import { useUser } from "@/context/UserContext"
import { courses } from "@/data/courses"
import { PerceptionCard } from "@/components/common/PerceptionCard"
import { CourseCard } from "@/components/common/CourseCard"
import { SectionHeading } from "@/components/common/SectionHeading"

const actions = [
  {
    to: "/app/portrait",
    title: "Психологический портрет",
    desc: "Кто вы как личность и как вам учиться комфортнее",
  },
  {
    to: "/app/level",
    title: "Уровень ученика",
    desc: "С какой точки начинать и куда двигаться дальше",
  },
]

export function Dashboard() {
  const { user } = useUser()
  if (!user) return null

  return (
    <div className="flex flex-col gap-14">
      {/* Приветствие */}
      <header className="flex flex-col gap-2">
        <span className="eyebrow">Личный кабинет</span>
        <h1 className="font-serif text-4xl font-semibold text-ink sm:text-5xl">
          Здравствуйте, {user.firstName}!
        </h1>
        <p className="max-w-xl text-pretty text-ink-muted">
          Рады видеть вас снова. Ниже — ваш профиль восприятия и библиотека
          лекций, готовых подстроиться под вас.
        </p>
      </header>

      {/* Идентичность + действия */}
      <section className="grid gap-5 lg:grid-cols-3">
        <PerceptionCard type={user.perceptionType} className="lg:col-span-2" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
          {actions.map((a) => (
            <Link
              key={a.to}
              to={a.to}
              className="group flex flex-col justify-between gap-6 rounded-2xl border border-hairline bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_8px_24px_rgba(20,33,61,0.06)]"
            >
              <ArrowUpRight className="size-5 text-ink-muted transition-colors group-hover:text-primary" />
              <div>
                <h3 className="font-serif text-lg font-semibold text-ink">{a.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-muted">{a.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Библиотека */}
      <section>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            index="02"
            eyebrow="Библиотека"
            title="Библиотека лекций"
            description="Откройте курс и получите любую лекцию в своём формате."
          />
          <Link
            to="/app/library"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            Все курсы <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}

          {/* CTA загрузки */}
          <Link
            to="/app/upload"
            className="group flex flex-col justify-between rounded-2xl border-2 border-dashed border-hairline bg-secondary/30 p-6 transition-colors hover:border-primary/50 hover:bg-secondary/60"
          >
            <span className="flex size-11 items-center justify-center rounded-xl bg-card text-primary">
              <UploadCloud className="size-5" strokeWidth={1.75} />
            </span>
            <div className="mt-5">
              <h3 className="flex items-center gap-1.5 font-serif text-xl font-semibold text-ink">
                Своя лекция
                <Sparkles className="size-4 text-primary" />
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                Загрузите видео или аудио — переделаем под ваш тип восприятия.
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                Загрузить
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </Link>
        </div>
      </section>
    </div>
  )
}

import { Building2, GraduationCap, Mail, MessageCircle, Phone, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

const audiences = [
  {
    icon: GraduationCap,
    title: "Школам и вузам",
    desc: "Повышайте вовлечённость: один материал — три формата под разных учеников.",
  },
  {
    icon: Users,
    title: "Репетиторам",
    desc: "Готовьте занятия быстрее и точнее под особенности каждого студента.",
  },
  {
    icon: Building2,
    title: "Компаниям",
    desc: "Корпоративное обучение, которое сотрудники реально проходят до конца.",
  },
]

const contacts = [
  { icon: Phone, label: "Телефон", value: "+7 (495) 000-00-00", href: "tel:+74950000000" },
  { icon: Mail, label: "Почта", value: "hello@cerveau.ru", href: "mailto:hello@cerveau.ru" },
  { icon: MessageCircle, label: "Telegram", value: "@cerveau", href: "https://t.me/cerveau" },
]

export function CooperationPage() {
  return (
    <div className="mx-auto w-full max-w-[1180px] px-5 py-16 sm:px-8 lg:py-24">
      {/* Hero */}
      <section className="max-w-3xl">
        <span className="eyebrow">Сотрудничество</span>
        <h1 className="mt-5 text-balance font-serif text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[1.05] text-ink">
          Сотрудничайте с <em className="italic text-primary">Cerveau</em>
        </h1>
        <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-ink-muted">
          Мы помогаем школам, репетиторам и компаниям делать обучение
          персонализированным — чтобы знания доходили до каждого в его формате.
        </p>
      </section>

      {/* Audiences */}
      <section className="mt-16 grid gap-5 sm:grid-cols-3">
        {audiences.map((a) => {
          const Icon = a.icon
          return (
            <div key={a.title} className="rounded-2xl border border-hairline bg-card p-6 sm:p-7">
              <span className="flex size-11 items-center justify-center rounded-xl bg-secondary text-primary">
                <Icon className="size-5" strokeWidth={1.75} />
              </span>
              <h3 className="mt-5 font-serif text-xl font-semibold text-ink">{a.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{a.desc}</p>
            </div>
          )
        })}
      </section>

      {/* Contacts — ink reverse block */}
      <section className="mt-16 overflow-hidden rounded-3xl bg-ink px-6 py-12 text-paper sm:px-12 sm:py-16">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-md">
            <h2 className="font-serif text-3xl font-semibold text-paper sm:text-4xl">
              Давайте обсудим ваш проект
            </h2>
            <p className="mt-4 leading-relaxed text-paper/70">
              Расскажите о задаче — предложим, как персонализировать обучение под
              вашу аудиторию.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-7 bg-paper text-ink hover:bg-paper/90"
            >
              <a href="mailto:hello@cerveau.ru">Написать нам</a>
            </Button>
          </div>

          <div className="flex flex-col gap-4">
            {contacts.map((c) => {
              const Icon = c.icon
              return (
                <a
                  key={c.label}
                  href={c.href}
                  className="group flex items-center gap-4 rounded-2xl border border-paper/15 px-5 py-4 transition-colors hover:border-paper/40"
                >
                  <span className="flex size-10 items-center justify-center rounded-full bg-paper/10 text-paper">
                    <Icon className="size-5" strokeWidth={1.75} />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-paper/60">{c.label}</p>
                    <p className="font-medium text-paper">{c.value}</p>
                  </div>
                </a>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

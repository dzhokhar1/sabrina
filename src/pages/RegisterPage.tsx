import { Navigate, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { ArrowRight } from "lucide-react"

import { useUser } from "@/context/UserContext"
import { PERCEPTION_LIST } from "@/data/perception"
import { setPending } from "@/lib/pending"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { DateField } from "@/components/common/DateField"

const schema = z.object({
  firstName: z.string().trim().min(2, "Введите имя"),
  lastName: z.string().trim().min(2, "Введите фамилию"),
  birthDate: z.date({ error: "Укажите дату рождения" }),
  phone: z
    .string()
    .trim()
    .min(6, "Введите номер телефона")
    .regex(/^[+\d][\d\s()\-]{5,}$/, "Похоже на ошибку в номере"),
  startDate: z.date({ error: "Укажите дату начала обучения" }),
})

type FormValues = z.infer<typeof schema>

const today = new Date()

export function RegisterPage() {
  const { user } = useUser()
  const navigate = useNavigate()

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      birthDate: undefined,
      startDate: today,
    },
  })

  if (user) return <Navigate to="/app" replace />

  function onSubmit(values: FormValues) {
    setPending({
      firstName: values.firstName,
      lastName: values.lastName,
      birthDate: values.birthDate.toISOString(),
      phone: values.phone,
      startDate: values.startDate.toISOString(),
    })
    navigate("/test")
  }

  return (
    <div className="mx-auto grid w-full max-w-[1180px] gap-12 px-5 py-12 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-20">
      {/* Editorial hero */}
      <section className="flex flex-col justify-center">
        <span className="eyebrow">
          <span className="text-primary">01</span>
          <span aria-hidden className="text-hairline">—</span>
          Регистрация
        </span>
        <h1 className="mt-5 text-balance font-serif text-[clamp(2.5rem,6vw,4.25rem)] font-semibold leading-[1.04] text-ink">
          Учитесь так, как <em className="italic text-primary">мыслит</em> ваш
          мозг.
        </h1>
        <p className="mt-6 max-w-md text-pretty text-lg leading-relaxed text-ink-muted">
          Cerveau определяет ваш тип восприятия и подаёт каждую лекцию в том
          формате, который вам ближе — наглядно, на слух или через практику.
        </p>

        <ul className="mt-10 flex flex-col gap-4 border-t border-hairline pt-8">
          {PERCEPTION_LIST.map((p) => {
            const Icon = p.icon
            return (
              <li key={p.id} className="flex items-start gap-4">
                <span
                  className={`mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl ${p.bgTint} ${p.text}`}
                >
                  <Icon className="size-5" strokeWidth={1.75} />
                </span>
                <div>
                  <p className="font-medium text-ink">{p.label}</p>
                  <p className="text-sm leading-relaxed text-ink-muted">{p.short}</p>
                </div>
              </li>
            )
          })}
        </ul>
      </section>

      {/* Registration form */}
      <section className="lg:pt-4">
        <div className="rounded-3xl border border-hairline bg-card p-6 shadow-[0_1px_2px_rgba(20,33,61,0.04)] sm:p-8">
          <div className="mb-6">
            <h2 className="font-serif text-2xl font-semibold text-ink">Вход в Cerveau</h2>
            <p className="mt-1 text-sm text-ink-muted">
              Без пароля и почты. Заполните анкету — дальше пройдёте короткий тест
              на тип восприятия.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Имя</FormLabel>
                      <FormControl>
                        <Input placeholder="Иван" autoComplete="given-name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Фамилия</FormLabel>
                      <FormControl>
                        <Input placeholder="Петров" autoComplete="family-name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="birthDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Дата рождения</FormLabel>
                      <DateField
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Выберите дату"
                        captionLayout="dropdown"
                        startMonth={new Date(1940, 0)}
                        endMonth={today}
                        defaultMonth={new Date(2000, 0)}
                        disabled={{ after: today }}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Телефон</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          inputMode="tel"
                          placeholder="+7 900 000-00-00"
                          autoComplete="tel"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Дата начала обучения</FormLabel>
                    <DateField
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Выберите дату"
                      captionLayout="dropdown"
                      startMonth={new Date(today.getFullYear(), 0)}
                      endMonth={new Date(today.getFullYear() + 1, 11)}
                      defaultMonth={today}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" size="lg" className="mt-1 w-full">
                Продолжить к тесту
                <ArrowRight className="size-4" />
              </Button>
            </form>
          </Form>
        </div>
      </section>
    </div>
  )
}

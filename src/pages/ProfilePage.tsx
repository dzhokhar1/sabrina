import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { ArrowLeft, LogOut, RefreshCw } from "lucide-react"
import { toast } from "sonner"

import { useUser } from "@/context/UserContext"
import { PERCEPTION } from "@/data/perception"
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
import { PerceptionBadge } from "@/components/common/PerceptionBadge"

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

export function ProfilePage() {
  const { user, login, logout } = useUser()
  const navigate = useNavigate()

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: user
      ? {
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
          birthDate: new Date(user.birthDate),
          startDate: new Date(user.startDate),
        }
      : undefined,
  })

  if (!user) return null
  const meta = PERCEPTION[user.perceptionType]

  function onSubmit(values: FormValues) {
    if (!user) return
    login({
      ...user,
      firstName: values.firstName,
      lastName: values.lastName,
      birthDate: values.birthDate.toISOString(),
      phone: values.phone,
      startDate: values.startDate.toISOString(),
    })
    toast.success("Профиль обновлён")
  }

  function handleLogout() {
    logout()
    navigate("/")
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-8">
      <div className="flex flex-col gap-4">
        <Link
          to="/app"
          className="inline-flex w-fit items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-ink"
        >
          <ArrowLeft className="size-4" /> В кабинет
        </Link>
        <span className="eyebrow">Профиль и настройки</span>
        <h1 className="font-serif text-4xl font-semibold text-ink sm:text-5xl">
          Ваш профиль
        </h1>
      </div>

      {/* Тип восприятия */}
      <div className="flex flex-col gap-4 rounded-2xl border border-hairline bg-card p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2">
          <span className="eyebrow">Тип восприятия</span>
          <div className="flex items-center gap-3">
            <PerceptionBadge type={user.perceptionType} />
            <span className="text-sm text-ink-muted">{meta.short}</span>
          </div>
        </div>
        <Button variant="outline" onClick={() => navigate("/test")} className="shrink-0">
          <RefreshCw className="size-4" /> Перепройти тест
        </Button>
      </div>

      {/* Данные */}
      <div className="rounded-2xl border border-hairline bg-card p-6 sm:p-8">
        <span className="eyebrow">Личные данные</span>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5 flex flex-col gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Имя</FormLabel>
                    <FormControl>
                      <Input autoComplete="given-name" {...field} />
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
                      <Input autoComplete="family-name" {...field} />
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
                      captionLayout="dropdown"
                      startMonth={new Date(1940, 0)}
                      endMonth={today}
                      defaultMonth={field.value ?? new Date(2000, 0)}
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
                      <Input type="tel" inputMode="tel" autoComplete="tel" {...field} />
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
                    captionLayout="dropdown"
                    startMonth={new Date(today.getFullYear() - 1, 0)}
                    endMonth={new Date(today.getFullYear() + 1, 11)}
                    defaultMonth={field.value ?? today}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="mt-1 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Button type="submit">Сохранить изменения</Button>
              <Button
                type="button"
                variant="ghost"
                onClick={handleLogout}
                className="text-ink-muted hover:text-destructive"
              >
                <LogOut className="size-4" /> Выйти из аккаунта
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

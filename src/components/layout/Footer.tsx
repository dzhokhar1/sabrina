import { Link } from "react-router-dom"
import { Logo } from "@/components/common/Logo"

export function Footer() {
  return (
    <footer className="relative z-10 mt-24 border-t border-hairline bg-paper-soft">
      <div className="mx-auto w-full max-w-[1180px] px-5 py-14 sm:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-pretty leading-relaxed text-ink-muted">
              Платформа персонализированного обучения. Определяем, как вы
              воспринимаете мир, и подаём знания в вашем формате.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:gap-16">
            <nav className="flex flex-col gap-3">
              <span className="eyebrow mb-1">Навигация</span>
              <Link to="/app" className="text-sm text-ink-muted transition-colors hover:text-ink">
                Личный кабинет
              </Link>
              <Link
                to="/app/library"
                className="text-sm text-ink-muted transition-colors hover:text-ink"
              >
                Библиотека лекций
              </Link>
              <Link
                to="/cooperation"
                className="text-sm text-ink-muted transition-colors hover:text-ink"
              >
                Сотрудничество
              </Link>
            </nav>
            <div className="flex flex-col gap-3">
              <span className="eyebrow mb-1">Контакты</span>
              <a
                href="tel:+74950000000"
                className="text-sm text-ink-muted transition-colors hover:text-ink"
              >
                +7 (495) 000-00-00
              </a>
              <a
                href="mailto:hello@cerveau.ru"
                className="text-sm text-ink-muted transition-colors hover:text-ink"
              >
                hello@cerveau.ru
              </a>
              <a
                href="https://t.me/cerveau"
                className="text-sm text-ink-muted transition-colors hover:text-ink"
              >
                Telegram
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-hairline pt-6 text-xs text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Cerveau. Прототип.</span>
          <span className="font-serif italic">Учитесь так, как мыслит ваш мозг.</span>
        </div>
      </div>
    </footer>
  )
}

import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

export function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-[1180px] flex-col items-center justify-center gap-6 px-5 py-20 text-center">
      <span className="font-serif text-7xl font-semibold text-primary">404</span>
      <div>
        <h1 className="font-serif text-3xl font-semibold text-ink">Страница не найдена</h1>
        <p className="mt-2 text-ink-muted">
          Возможно, ссылка устарела или страница ещё в разработке.
        </p>
      </div>
      <Button asChild>
        <Link to="/">На главную</Link>
      </Button>
    </div>
  )
}

import { useState } from "react"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { LogOut, Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { useUser } from "@/context/UserContext"
import { Logo } from "@/components/common/Logo"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

interface NavItem {
  to: string
  label: string
  end?: boolean
}

const authedNav: NavItem[] = [
  { to: "/app", label: "Кабинет", end: true },
  { to: "/app/library", label: "Библиотека" },
  { to: "/app/upload", label: "Загрузить" },
  { to: "/cooperation", label: "Сотрудничество" },
]

const guestNav: NavItem[] = [{ to: "/cooperation", label: "Сотрудничество" }]

function navLinkClass({ isActive }: { isActive: boolean }) {
  return cn(
    "relative text-sm font-medium text-ink-muted transition-colors hover:text-ink",
    isActive && "text-ink",
  )
}

export function Header() {
  const { user, logout } = useUser()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const nav = user ? authedNav : guestNav

  function handleLogout() {
    logout()
    setOpen(false)
    navigate("/")
  }

  const initials = user
    ? `${user.firstName[0] ?? ""}${user.lastName[0] ?? ""}`.toUpperCase()
    : ""

  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-[1180px] items-center justify-between px-5 sm:px-8">
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className={navLinkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <Link
                to="/app/profile"
                className="flex items-center gap-2.5 rounded-full border border-hairline bg-card py-1 pl-1 pr-3.5 transition-colors hover:border-primary/40"
              >
                <span className="flex size-7 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                  {initials}
                </span>
                <span className="text-sm font-medium text-ink">{user.firstName}</span>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                aria-label="Выйти"
                className="text-ink-muted hover:text-ink"
              >
                <LogOut className="size-4" />
              </Button>
            </>
          ) : (
            <Button asChild>
              <Link to="/">Войти</Link>
            </Button>
          )}
        </div>

        {/* Mobile nav */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Меню">
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[80%] max-w-xs bg-paper">
            <SheetHeader>
              <SheetTitle className="text-left">
                <Logo to="" />
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-4">
              {nav.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "rounded-lg px-3 py-2.5 text-base font-medium text-ink-muted transition-colors hover:bg-secondary hover:text-ink",
                      isActive && "bg-secondary text-ink",
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              {user && (
                <NavLink
                  to="/app/profile"
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "rounded-lg px-3 py-2.5 text-base font-medium text-ink-muted transition-colors hover:bg-secondary hover:text-ink",
                      isActive && "bg-secondary text-ink",
                    )
                  }
                >
                  Профиль
                </NavLink>
              )}
            </nav>
            <div className="mt-auto border-t border-hairline p-4">
              {user ? (
                <Button variant="outline" className="w-full" onClick={handleLogout}>
                  <LogOut className="size-4" /> Выйти
                </Button>
              ) : (
                <Button asChild className="w-full">
                  <Link to="/" onClick={() => setOpen(false)}>
                    Войти
                  </Link>
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

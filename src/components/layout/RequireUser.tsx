import { Navigate, Outlet } from "react-router-dom"
import { useUser } from "@/context/UserContext"

/**
 * Guard для приватной зоны `/app/*`. Нет пользователя в localStorage —
 * редирект на регистрацию. Заодно задаёт общий контейнер кабинета.
 */
export function RequireUser() {
  const { user } = useUser()

  if (!user) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="mx-auto w-full max-w-[1180px] px-5 py-10 sm:px-8 sm:py-14">
      <Outlet />
    </div>
  )
}

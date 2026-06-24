import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import type { PerceptionType } from "@/data/perception"

export interface CerveauUser {
  firstName: string
  lastName: string
  /** ISO-дата рождения */
  birthDate: string
  phone: string
  /** ISO-дата начала обучения */
  startDate: string
  perceptionType: PerceptionType
}

interface UserContextValue {
  user: CerveauUser | null
  login: (user: CerveauUser) => void
  logout: () => void
}

const STORAGE_KEY = "cerveau:user"

const UserContext = createContext<UserContextValue | undefined>(undefined)

function readStoredUser(): CerveauUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as CerveauUser
    if (!parsed?.firstName || !parsed?.perceptionType) return null
    return parsed
  } catch {
    return null
  }
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<CerveauUser | null>(() => readStoredUser())

  const login = useCallback((next: CerveauUser) => {
    setUser(next)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {
      /* приватный режим / переполнение — для прототипа не критично */
    }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      /* noop */
    }
  }, [])

  const value = useMemo(() => ({ user, login, logout }), [user, login, logout])

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useUser(): UserContextValue {
  const ctx = useContext(UserContext)
  if (!ctx) throw new Error("useUser must be used within <UserProvider>")
  return ctx
}

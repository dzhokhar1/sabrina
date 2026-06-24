import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react"

type ProgressMap = Record<string, string[]>

interface ProgressContextValue {
  isComplete: (courseId: string, lectureId: string) => boolean
  markComplete: (courseId: string, lectureId: string) => void
  completedCount: (courseId: string) => number
}

const STORAGE_KEY = "cerveau:progress"

const ProgressContext = createContext<ProgressContextValue | undefined>(undefined)

function readProgress(): ProgressMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as ProgressMap) : {}
  } catch {
    return {}
  }
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<ProgressMap>(() => readProgress())

  const markComplete = useCallback(
    (courseId: string, lectureId: string) => {
      setProgress((prev) => {
        const done = prev[courseId] ?? []
        if (done.includes(lectureId)) return prev
        const next = { ...prev, [courseId]: [...done, lectureId] }
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
        } catch {
          /* noop */
        }
        return next
      })
    },
    [],
  )

  const isComplete = useCallback(
    (courseId: string, lectureId: string) =>
      (progress[courseId] ?? []).includes(lectureId),
    [progress],
  )

  const completedCount = useCallback(
    (courseId: string) => (progress[courseId] ?? []).length,
    [progress],
  )

  const value = useMemo(
    () => ({ isComplete, markComplete, completedCount }),
    [isComplete, markComplete, completedCount],
  )

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error("useProgress must be used within <ProgressProvider>")
  return ctx
}

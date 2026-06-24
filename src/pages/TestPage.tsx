import { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowLeft, RotateCcw } from "lucide-react"
import { toast } from "sonner"

import { useUser } from "@/context/UserContext"
import { perceptionTest, scorePerception } from "@/data/perceptionTest"
import type { PerceptionType } from "@/data/perception"
import { clearPending, getPending } from "@/lib/pending"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { AiThinking } from "@/components/ai/AiThinking"
import { PerceptionCard } from "@/components/common/PerceptionCard"

type Phase = "quiz" | "analyzing" | "result"

const ANALYZE_STEPS = [
  "Считываем ваши ответы",
  "Определяем тип восприятия",
  "Готовим результат",
]

export function TestPage() {
  const { user, login } = useUser()
  const navigate = useNavigate()
  const pending = getPending()

  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<(PerceptionType | undefined)[]>(
    () => Array(perceptionTest.length).fill(undefined),
  )
  const [phase, setPhase] = useState<Phase>("quiz")
  const [result, setResult] = useState<PerceptionType | null>(null)

  // Тест доступен только при регистрации (есть анкета) или для смены типа (есть юзер)
  const mode: "register" | "retake" | null = user
    ? "retake"
    : pending
      ? "register"
      : null
  if (!mode) return <Navigate to="/" replace />

  const total = perceptionTest.length
  const current = perceptionTest[step]
  const answeredCount = answers.filter(Boolean).length
  const progress = (answeredCount / total) * 100

  function choose(type: PerceptionType) {
    if (phase !== "quiz" || answers[step] !== undefined) return // защита от двойного клика
    const next = [...answers]
    next[step] = type
    setAnswers(next)
    window.setTimeout(() => {
      if (step < total - 1) {
        setStep((s) => s + 1)
      } else {
        setPhase("analyzing")
      }
    }, 280)
  }

  function finishAnalyzing() {
    setResult(scorePerception(answers as PerceptionType[]))
    setPhase("result")
  }

  function restart() {
    setAnswers(Array(total).fill(undefined))
    setStep(0)
    setResult(null)
    setPhase("quiz")
  }

  function applyResult() {
    if (!result) return
    if (mode === "register" && pending) {
      login({ ...pending, perceptionType: result })
      clearPending()
      toast.success(`Добро пожаловать, ${pending.firstName}!`)
      navigate("/app")
    } else if (user) {
      login({ ...user, perceptionType: result })
      toast.success("Тип восприятия обновлён")
      navigate("/app/profile")
    }
  }

  // ── Результат ───────────────────────────────────────────────
  if (phase === "result" && result) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-5 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full"
        >
          <span className="eyebrow justify-center">Результат теста</span>
          <h1 className="mt-4 font-serif text-4xl font-semibold text-ink sm:text-5xl">
            Готово!
          </h1>
          <p className="mx-auto mt-3 max-w-md text-pretty text-ink-muted">
            По вашим ответам мы определили тип восприятия. Под него Cerveau будет
            подбирать формат каждой лекции.
          </p>

          <div className="mt-8 text-left">
            <PerceptionCard type={result} />
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" onClick={applyResult} className="w-full sm:w-auto">
              {mode === "register" ? "Перейти в личный кабинет" : "Сохранить"}
            </Button>
            <Button
              variant="ghost"
              size="lg"
              onClick={restart}
              className="w-full sm:w-auto"
            >
              <RotateCcw className="size-4" /> Пройти заново
            </Button>
          </div>
        </motion.div>
      </div>
    )
  }

  // ── Анализ ──────────────────────────────────────────────────
  if (phase === "analyzing") {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col justify-center px-5">
        <AiThinking
          steps={ANALYZE_STEPS}
          duration={2600}
          onDone={finishAnalyzing}
        />
      </div>
    )
  }

  // ── Вопросы ─────────────────────────────────────────────────
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col px-5 py-12 sm:py-16">
      <div className="flex items-center justify-between gap-4">
        <span className="eyebrow">Тест · Тип восприятия</span>
        <span className="text-sm tabular-nums text-ink-muted">
          {step + 1} / {total}
        </span>
      </div>
      <Progress value={progress} className="mt-4 h-1.5" />

      <div className="relative mt-12 flex-1">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.32, ease: "easeOut" }}
          >
            <h1 className="text-balance font-serif text-3xl font-semibold leading-snug text-ink sm:text-4xl">
              {current.question}
            </h1>

            <div className="mt-8 flex flex-col gap-3">
              {current.options.map((opt) => {
                const selected = answers[step] === opt.type
                return (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => choose(opt.type)}
                    className={cn(
                      "flex items-center justify-between gap-4 rounded-2xl border bg-card px-5 py-4 text-left text-base transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[0_8px_24px_rgba(20,33,61,0.06)]",
                      selected ? "border-primary ring-2 ring-primary/20" : "border-hairline",
                    )}
                  >
                    <span className="text-ink">{opt.label}</span>
                    <span
                      className={cn(
                        "size-4 shrink-0 rounded-full border-2 transition-colors",
                        selected ? "border-primary bg-primary" : "border-hairline",
                      )}
                    />
                  </button>
                )
              })}
            </div>
          </motion.div>
      </div>

      <div className="mt-10 flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="text-ink-muted"
        >
          <ArrowLeft className="size-4" /> Назад
        </Button>
        <span className="text-xs text-ink-muted">Выберите вариант, чтобы продолжить</span>
      </div>
    </div>
  )
}

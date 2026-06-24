import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"

interface AiThinkingProps {
  onDone: () => void
  /** Акцентный цвет (CSS-значение) под тип восприятия */
  accent?: string
  /** Длительность «размышления», мс */
  duration?: number
  steps?: string[]
}

const DEFAULT_STEPS = [
  "Анализируем ваш тип восприятия",
  "Подбираем оптимальный формат",
  "Готовим материал",
]

const NODES = [
  { cx: 30, cy: 40 },
  { cx: 70, cy: 24 },
  { cx: 110, cy: 50 },
  { cx: 56, cy: 78 },
  { cx: 96, cy: 96 },
  { cx: 142, cy: 78 },
]

const EDGES: [number, number][] = [
  [0, 1],
  [1, 2],
  [0, 3],
  [3, 4],
  [2, 5],
  [4, 5],
  [1, 3],
]

/** Брендовая анимация «ИИ переделывает лекцию» с нейро-сетью и шагами. */
export function AiThinking({
  onDone,
  accent = "var(--primary)",
  duration = 4800,
  steps = DEFAULT_STEPS,
}: AiThinkingProps) {
  const [progress, setProgress] = useState(0)
  const [activeStep, setActiveStep] = useState(0)
  const doneRef = useRef(false)

  useEffect(() => {
    const start = Date.now()

    // Прогресс обновляем интервалом, а не rAF — он переживает уход вкладки в фон.
    const interval = window.setInterval(() => {
      const pct = Math.min(100, ((Date.now() - start) / duration) * 100)
      setProgress(pct)
      setActiveStep(Math.min(steps.length - 1, Math.floor((pct / 100) * steps.length)))
      if (pct >= 100) window.clearInterval(interval)
    }, 80)

    // Гарантированное завершение, даже если вкладка была неактивна.
    const finish = window.setTimeout(() => {
      if (doneRef.current) return
      doneRef.current = true
      setProgress(100)
      onDone()
    }, duration + 400)

    return () => {
      window.clearInterval(interval)
      window.clearTimeout(finish)
    }
  }, [duration, onDone, steps.length])

  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-8 py-10 text-center">
      {/* Нейро-сеть */}
      <div
        className="relative flex size-44 items-center justify-center rounded-full"
        style={{ background: `radial-gradient(circle, ${accent}14, transparent 70%)` }}
      >
        <svg width="172" height="120" viewBox="0 0 172 120" fill="none" aria-hidden>
          {EDGES.map(([a, b], i) => (
            <motion.line
              key={i}
              x1={NODES[a].cx}
              y1={NODES[a].cy}
              x2={NODES[b].cx}
              y2={NODES[b].cy}
              stroke={accent}
              strokeWidth={1}
              initial={{ pathLength: 0, opacity: 0.15 }}
              animate={{ pathLength: 1, opacity: [0.15, 0.5, 0.15] }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                delay: i * 0.18,
                ease: "easeInOut",
              }}
            />
          ))}
          {NODES.map((n, i) => (
            <motion.circle
              key={i}
              cx={n.cx}
              cy={n.cy}
              r={3.4}
              fill={accent}
              initial={{ scale: 0.7, opacity: 0.5 }}
              animate={{ scale: [0.7, 1.25, 0.7], opacity: [0.5, 1, 0.5] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                delay: i * 0.22,
                ease: "easeInOut",
              }}
              style={{ transformOrigin: `${n.cx}px ${n.cy}px` }}
            />
          ))}
        </svg>
      </div>

      <div className="flex flex-col items-center gap-1.5">
        <p className="eyebrow" style={{ color: accent }}>
          ИИ за работой
        </p>
        <h2 className="font-serif text-2xl font-semibold text-ink">
          Переделываем лекцию под вас
        </h2>
      </div>

      {/* Шаги */}
      <ul className="flex w-full max-w-sm flex-col gap-2.5 text-left">
        {steps.map((step, i) => {
          const isDone = i < activeStep || progress >= 100
          const isActive = i === activeStep && progress < 100
          return (
            <li
              key={step}
              className={cn(
                "flex items-center gap-3 text-sm transition-colors",
                isDone || isActive ? "text-ink" : "text-ink-muted/50",
              )}
            >
              <span
                className={cn(
                  "flex size-5 shrink-0 items-center justify-center rounded-full border transition-colors",
                  isDone ? "border-transparent text-white" : "border-hairline",
                )}
                style={isDone ? { background: accent } : undefined}
              >
                {isDone ? (
                  <Check className="size-3" strokeWidth={3} />
                ) : isActive ? (
                  <motion.span
                    className="size-1.5 rounded-full"
                    style={{ background: accent }}
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                ) : (
                  <span className="size-1.5 rounded-full bg-hairline" />
                )}
              </span>
              {step}
              {isActive && <span className="text-ink-muted">…</span>}
            </li>
          )
        })}
      </ul>

      <div className="w-full max-w-sm">
        <Progress value={progress} className="h-1.5" />
      </div>
    </div>
  )
}

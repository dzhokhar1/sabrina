import { useState } from "react"
import { Check, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { taskSet } from "@/data/tasks"

/** Результат для кинестетика: интерактивные задания с обратной связью. */
export function TasksResult() {
  const [answers, setAnswers] = useState<Record<string, number>>({})

  const answeredCount = Object.keys(answers).length
  const correctCount = taskSet.filter(
    (q) => answers[q.id] === q.correctIndex,
  ).length
  const allDone = answeredCount === taskSet.length

  function choose(qId: string, index: number) {
    if (answers[qId] !== undefined) return // фиксируем первый ответ
    setAnswers((prev) => ({ ...prev, [qId]: index }))
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-2xl border border-kinesthetic/25 bg-kinesthetic-tint/40 p-6 sm:p-8">
        <p className="eyebrow text-kinesthetic">Практические задания</p>
        <h3 className="mt-2 font-serif text-2xl font-semibold text-ink">
          Учимся через действие
        </h3>
        <p className="mt-2 max-w-prose leading-relaxed text-ink-muted">
          Кинестетику нужно сделать самому. Решите короткие задания — после
          каждого ответа сразу видно, верно ли, и почему.
        </p>
      </div>

      <ol className="flex flex-col gap-5">
        {taskSet.map((q, qi) => {
          const selected = answers[q.id]
          const isAnswered = selected !== undefined
          return (
            <li
              key={q.id}
              className="rounded-2xl border border-hairline bg-card p-5 sm:p-6"
            >
              <div className="flex gap-3">
                <span className="font-serif text-lg font-semibold text-kinesthetic">
                  {String(qi + 1).padStart(2, "0")}
                </span>
                <p className="pt-0.5 font-medium text-ink">{q.question}</p>
              </div>

              <div className="mt-4 flex flex-col gap-2.5">
                {q.options.map((opt, oi) => {
                  const isCorrect = oi === q.correctIndex
                  const isPicked = selected === oi
                  const showCorrect = isAnswered && isCorrect
                  const showWrong = isAnswered && isPicked && !isCorrect
                  return (
                    <button
                      key={oi}
                      type="button"
                      onClick={() => choose(q.id, oi)}
                      disabled={isAnswered}
                      className={cn(
                        "flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-colors",
                        !isAnswered &&
                          "border-hairline hover:border-kinesthetic/50 hover:bg-kinesthetic-tint/40",
                        showCorrect && "border-emerald-500/50 bg-emerald-50 text-ink",
                        showWrong && "border-rose-400/60 bg-rose-50 text-ink",
                        isAnswered && !showCorrect && !showWrong && "border-hairline opacity-60",
                      )}
                    >
                      <span>{opt}</span>
                      {showCorrect && <Check className="size-4 shrink-0 text-emerald-600" />}
                      {showWrong && <X className="size-4 shrink-0 text-rose-500" />}
                    </button>
                  )
                })}
              </div>

              {isAnswered && (
                <p className="mt-3 rounded-lg bg-secondary px-4 py-3 text-sm leading-relaxed text-ink-muted">
                  {q.explanation}
                </p>
              )}
            </li>
          )
        })}
      </ol>

      {allDone && (
        <div className="rounded-2xl border border-kinesthetic/25 bg-card p-6 text-center">
          <p className="font-serif text-2xl font-semibold text-ink">
            {correctCount} из {taskSet.length} верно
          </p>
          <p className="mt-1 text-sm text-ink-muted">
            {correctCount === taskSet.length
              ? "Отлично — материал усвоен на практике!"
              : "Хорошее начало. Перечитайте пояснения — и тема закрепится."}
          </p>
        </div>
      )}
    </div>
  )
}

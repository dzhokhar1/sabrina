import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"
import { PERCEPTION, type PerceptionType } from "@/data/perception"
import { PerceptionBadge } from "@/components/common/PerceptionBadge"
import { AudioResult } from "@/components/result/AudioResult"
import { InfographicResult } from "@/components/result/InfographicResult"
import { TasksResult } from "@/components/result/TasksResult"

interface LectureResultProps {
  type: PerceptionType
  lectureTitle: string
}

/** Диспетчер результата: выдаёт формат под тип восприятия. */
export function LectureResult({ type, lectureTitle }: LectureResultProps) {
  const meta = PERCEPTION[type]

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col gap-7"
    >
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1.5 text-sm font-medium" style={{ color: meta.accentVar }}>
            <Sparkles className="size-4" /> Готово
          </span>
          <PerceptionBadge type={type} />
        </div>
        <p className="text-pretty text-ink-muted">
          Мы переделали лекцию специально под ваш тип восприятия — для{" "}
          {meta.label.toLowerCase()}а это {meta.formatNoun}.
        </p>
      </div>

      {type === "visual" && <InfographicResult lectureTitle={lectureTitle} />}
      {type === "audial" && <AudioResult lectureTitle={lectureTitle} />}
      {type === "kinesthetic" && <TasksResult />}

      <p className="rounded-lg border border-dashed border-hairline px-4 py-3 text-xs leading-relaxed text-ink-muted">
        Это демонстрация. В прототипе материал заранее подготовлен; в будущем его
        будет генерировать ИИ под каждого ученика.
      </p>
    </motion.div>
  )
}

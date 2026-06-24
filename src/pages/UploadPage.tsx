import { useState } from "react"
import { Sparkles } from "lucide-react"
import { useUser } from "@/context/UserContext"
import { PERCEPTION } from "@/data/perception"
import { Button } from "@/components/ui/button"
import { Dropzone } from "@/components/upload/Dropzone"
import { AiThinking } from "@/components/ai/AiThinking"
import { LectureResult } from "@/components/result/LectureResult"
import { PerceptionBadge } from "@/components/common/PerceptionBadge"

type Phase = "select" | "thinking" | "result"

export function UploadPage() {
  const { user } = useUser()
  const [file, setFile] = useState<File | null>(null)
  const [phase, setPhase] = useState<Phase>("select")

  if (!user) return null
  const meta = PERCEPTION[user.perceptionType]
  const title = file ? file.name.replace(/\.[^.]+$/, "") : "Ваша лекция"

  function reset() {
    setFile(null)
    setPhase("select")
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8">
      <div className="flex flex-col gap-3">
        <span className="eyebrow">
          <span className="text-primary">03</span>
          <span aria-hidden className="text-hairline">—</span>
          Своя лекция
        </span>
        <h1 className="font-serif text-4xl font-semibold leading-tight text-ink sm:text-5xl">
          Загрузить свою лекцию
        </h1>
        <p className="flex flex-wrap items-center gap-2 text-pretty text-ink-muted">
          Любой материал переделаем под вас:
          <PerceptionBadge type={user.perceptionType} />
          получит {meta.formatNoun}.
        </p>
      </div>

      {phase === "select" && (
        <div className="flex flex-col gap-5">
          <Dropzone onFileChange={setFile} />
          <Button
            size="lg"
            disabled={!file}
            onClick={() => setPhase("thinking")}
            className="w-full sm:w-auto sm:self-start"
          >
            <Sparkles className="size-4" />
            Переделать под меня
          </Button>
        </div>
      )}

      {phase === "thinking" && (
        <AiThinking accent={meta.accentVar} onDone={() => setPhase("result")} />
      )}

      {phase === "result" && (
        <div className="flex flex-col gap-6">
          <LectureResult type={user.perceptionType} lectureTitle={title} />
          <Button variant="outline" onClick={reset} className="self-start">
            Загрузить другую лекцию
          </Button>
        </div>
      )}
    </div>
  )
}

import { useRef, useState } from "react"
import { FileAudio, UploadCloud, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface DropzoneProps {
  onFileChange: (file: File | null) => void
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} Б`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} КБ`
  return `${(bytes / (1024 * 1024)).toFixed(1)} МБ`
}

export function Dropzone({ onFileChange }: DropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const [dragging, setDragging] = useState(false)

  function setSelected(f: File | null) {
    setFile(f)
    onFileChange(f)
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragging(false)
    const f = e.dataTransfer.files?.[0]
    if (f) setSelected(f)
  }

  if (file) {
    return (
      <div className="flex items-center gap-4 rounded-2xl border border-primary/30 bg-card p-5">
        <span className="flex size-12 items-center justify-center rounded-xl bg-secondary text-primary">
          <FileAudio className="size-6" strokeWidth={1.75} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate font-medium text-ink">{file.name}</p>
          <p className="text-sm text-ink-muted">{formatSize(file.size)} · готов к обработке</p>
        </div>
        <button
          type="button"
          onClick={() => setSelected(null)}
          aria-label="Убрать файл"
          className="flex size-9 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-secondary hover:text-ink"
        >
          <X className="size-4" />
        </button>
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault()
        setDragging(true)
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={onDrop}
      className={cn(
        "flex w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed px-6 py-12 text-center transition-colors",
        dragging
          ? "border-primary bg-primary/5"
          : "border-hairline bg-card hover:border-primary/50 hover:bg-secondary/40",
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept="audio/*,video/*"
        className="hidden"
        onChange={(e) => setSelected(e.target.files?.[0] ?? null)}
      />
      <span className="flex size-14 items-center justify-center rounded-2xl bg-secondary text-primary">
        <UploadCloud className="size-7" strokeWidth={1.5} />
      </span>
      <span className="font-medium text-ink">Выберите файл или перетащите сюда</span>
      <span className="max-w-xs text-sm text-ink-muted">
        Загрузите видео или аудио вашей лекции — мы переделаем её под ваш тип
        восприятия
      </span>
    </button>
  )
}

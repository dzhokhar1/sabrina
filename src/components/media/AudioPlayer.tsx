import { useEffect, useRef, useState } from "react"
import { Pause, Play, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

interface AudioPlayerProps {
  src: string
  accent?: string
  className?: string
}

function fmt(t: number) {
  if (!isFinite(t)) return "0:00"
  const m = Math.floor(t / 60)
  const s = Math.floor(t % 60)
  return `${m}:${s.toString().padStart(2, "0")}`
}

// статичная «псевдо-волна» для визуала плеера
const BARS = Array.from({ length: 56 }, (_, i) =>
  0.35 + Math.abs(Math.sin(i * 0.5) * 0.5) + (i % 5 === 0 ? 0.2 : 0),
)

export function AudioPlayer({ src, accent = "var(--audial)", className }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [current, setCurrent] = useState(0)
  const [duration, setDuration] = useState(0)
  const [unavailable, setUnavailable] = useState(false)

  useEffect(() => {
    const a = audioRef.current
    if (!a) return
    const onTime = () => setCurrent(a.currentTime)
    const onMeta = () => setDuration(a.duration)
    const onEnd = () => setPlaying(false)
    const onErr = () => setUnavailable(true)
    a.addEventListener("timeupdate", onTime)
    a.addEventListener("loadedmetadata", onMeta)
    a.addEventListener("ended", onEnd)
    a.addEventListener("error", onErr)
    return () => {
      a.removeEventListener("timeupdate", onTime)
      a.removeEventListener("loadedmetadata", onMeta)
      a.removeEventListener("ended", onEnd)
      a.removeEventListener("error", onErr)
    }
  }, [])

  function toggle() {
    const a = audioRef.current
    if (!a) return
    if (playing) {
      a.pause()
      setPlaying(false)
    } else {
      void a.play().then(() => setPlaying(true)).catch(() => setUnavailable(true))
    }
  }

  function restart() {
    const a = audioRef.current
    if (!a) return
    a.currentTime = 0
    setCurrent(0)
  }

  function seek(e: React.MouseEvent<HTMLDivElement>) {
    const a = audioRef.current
    if (!a || !duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = (e.clientX - rect.left) / rect.width
    a.currentTime = ratio * duration
    setCurrent(a.currentTime)
  }

  const pct = duration ? (current / duration) * 100 : 0

  return (
    <div
      className={cn(
        "flex items-center gap-4 rounded-2xl border border-hairline bg-card p-4 sm:p-5",
        className,
      )}
    >
      <audio ref={audioRef} src={src} preload="metadata" />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Пауза" : "Воспроизвести"}
        className="flex size-12 shrink-0 items-center justify-center rounded-full text-white transition-transform hover:scale-105 active:scale-95"
        style={{ background: accent }}
      >
        {playing ? (
          <Pause className="size-5" fill="currentColor" />
        ) : (
          <Play className="size-5 translate-x-0.5" fill="currentColor" />
        )}
      </button>

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        {/* waveform / progress */}
        <div
          onClick={seek}
          className="flex h-9 cursor-pointer items-center gap-[2px]"
          role="slider"
          aria-label="Перемотка"
          aria-valuenow={Math.round(pct)}
          tabIndex={0}
        >
          {BARS.map((h, i) => {
            const filled = (i / BARS.length) * 100 <= pct
            return (
              <span
                key={i}
                className="flex-1 rounded-full transition-colors"
                style={{
                  height: `${Math.min(100, h * 80)}%`,
                  background: filled ? accent : "var(--hairline)",
                  opacity: filled ? 1 : 0.7,
                }}
              />
            )
          })}
        </div>
        <div className="flex items-center justify-between text-xs tabular-nums text-ink-muted">
          <span>{fmt(current)}</span>
          {unavailable ? (
            <span className="text-ink-muted/80">демо-аудио появится после сборки</span>
          ) : (
            <button
              type="button"
              onClick={restart}
              className="inline-flex items-center gap-1 transition-colors hover:text-ink"
            >
              <RotateCcw className="size-3" /> сначала
            </button>
          )}
          <span>{fmt(duration)}</span>
        </div>
      </div>
    </div>
  )
}

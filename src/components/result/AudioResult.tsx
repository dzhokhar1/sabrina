import { AudioPlayer } from "@/components/media/AudioPlayer"

interface AudioResultProps {
  lectureTitle: string
}

const HIGHLIGHTS = [
  "Спокойный голос и выверенный темп",
  "Паузы для осмысления ключевых мыслей",
  "Можно слушать в дороге, без экрана",
]

/** Результат для аудиала: озвученная версия лекции. */
export function AudioResult({ lectureTitle }: AudioResultProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-2xl border border-audial/25 bg-audial-tint/40 p-6 sm:p-8">
        <p className="eyebrow text-audial">Аудиоверсия</p>
        <h3 className="mt-2 font-serif text-2xl font-semibold text-ink">
          «{lectureTitle}» — теперь можно слушать
        </h3>
        <p className="mt-2 max-w-prose leading-relaxed text-ink-muted">
          Мы озвучили материал спокойным голосом с правильными паузами — так
          аудиалу проще удержать внимание и запомнить главное.
        </p>

        <div className="mt-6">
          <AudioPlayer src={`${import.meta.env.BASE_URL}demo/lecture-audio.m4a`} />
        </div>
      </div>

      <ul className="grid gap-3 sm:grid-cols-3">
        {HIGHLIGHTS.map((h) => (
          <li
            key={h}
            className="rounded-xl border border-hairline bg-card p-4 text-sm leading-relaxed text-ink-muted"
          >
            {h}
          </li>
        ))}
      </ul>
    </div>
  )
}

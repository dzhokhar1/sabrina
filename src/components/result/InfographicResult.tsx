interface InfographicResultProps {
  lectureTitle: string
}

const SATELLITES = [
  { x: 70, y: 70, title: "Понятие", sub: "что это и зачем", anchor: "start" as const },
  { x: 530, y: 70, title: "Пример", sub: "как выглядит вживую", anchor: "start" as const },
  { x: 70, y: 300, title: "Связи", sub: "с чем соединяется", anchor: "start" as const },
  { x: 530, y: 300, title: "Действие", sub: "что попробовать", anchor: "start" as const },
]

const CENTER = { x: 380, y: 215 }

/** Результат для визуала: наглядная схема-карта темы. */
export function InfographicResult({ lectureTitle }: InfographicResultProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="overflow-hidden rounded-2xl border border-visual/25 bg-card">
        <div className="border-b border-hairline bg-visual-tint/40 px-6 py-5">
          <p className="eyebrow text-visual">Инфографика</p>
          <h3 className="mt-1.5 font-serif text-2xl font-semibold text-ink">
            «{lectureTitle}» на одной схеме
          </h3>
        </div>

        <div className="p-4 sm:p-6">
          <svg
            viewBox="0 0 760 440"
            className="h-auto w-full"
            style={{ fontFamily: "var(--font-sans)" }}
            role="img"
            aria-label={`Схема темы: ${lectureTitle}`}
          >
            {/* связи */}
            {SATELLITES.map((s, i) => {
              const sx = s.x + 100
              const sy = s.y + 35
              return (
                <path
                  key={`edge-${i}`}
                  d={`M ${CENTER.x} ${CENTER.y} C ${(CENTER.x + sx) / 2} ${CENTER.y}, ${(CENTER.x + sx) / 2} ${sy}, ${sx} ${sy}`}
                  stroke="var(--visual)"
                  strokeWidth={1.5}
                  strokeOpacity={0.35}
                  fill="none"
                  strokeDasharray="2 5"
                  strokeLinecap="round"
                />
              )
            })}

            {/* центральный узел */}
            <circle
              cx={CENTER.x}
              cy={CENTER.y}
              r={74}
              fill="var(--visual-tint)"
              stroke="var(--visual)"
              strokeWidth={1.5}
            />
            <circle cx={CENTER.x} cy={CENTER.y} r={88} fill="none" stroke="var(--visual)" strokeWidth={1} strokeOpacity={0.2} />
            <text
              x={CENTER.x}
              y={CENTER.y - 6}
              textAnchor="middle"
              fontSize={13}
              fontWeight={600}
              letterSpacing="0.14em"
              fill="var(--visual)"
            >
              ГЛАВНАЯ
            </text>
            <text
              x={CENTER.x}
              y={CENTER.y + 16}
              textAnchor="middle"
              fontSize={20}
              fontWeight={600}
              fill="var(--ink)"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              идея
            </text>

            {/* узлы-спутники */}
            {SATELLITES.map((s, i) => (
              <g key={`node-${i}`}>
                <rect
                  x={s.x}
                  y={s.y}
                  width={200}
                  height={70}
                  rx={14}
                  fill="var(--card)"
                  stroke="var(--visual)"
                  strokeWidth={1.25}
                  strokeOpacity={0.5}
                />
                <circle cx={s.x + 24} cy={s.y + 35} r={5} fill="var(--visual)" />
                <text x={s.x + 44} y={s.y + 30} fontSize={16} fontWeight={600} fill="var(--ink)">
                  {s.title}
                </text>
                <text x={s.x + 44} y={s.y + 50} fontSize={13} fill="var(--ink-muted)">
                  {s.sub}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>

      <p className="max-w-prose text-sm leading-relaxed text-ink-muted">
        Визуалу проще схватить структуру целиком: одна схема показывает, как
        связаны понятие, пример и практика — и тема укладывается в голове за
        несколько секунд.
      </p>
    </div>
  )
}

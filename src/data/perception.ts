import { AudioLines, Eye, Hand, type LucideIcon } from "lucide-react"

export type PerceptionType = "visual" | "audial" | "kinesthetic"

export type ResultKind = "infographic" | "audio" | "tasks"

export interface PerceptionMeta {
  id: PerceptionType
  /** «Визуал» */
  label: string
  /** «Вы — Визуал» */
  headline: string
  /** Короткая строка для карточки */
  short: string
  /** Развёрнутое описание */
  description: string
  /** «инфографику» / «аудиоверсию» / «практические задания» — для фразы «получить …» */
  formatNoun: string
  resultKind: ResultKind
  icon: LucideIcon
  /** CSS-значение акцента для инлайн-стилей (SVG, градиенты) */
  accentVar: string
  tintVar: string
  /** Полные литералы Tailwind-классов (важно для сканера классов) */
  text: string
  bgTint: string
  dot: string
  ring: string
  border: string
  gradient: string
}

export const PERCEPTION: Record<PerceptionType, PerceptionMeta> = {
  visual: {
    id: "visual",
    label: "Визуал",
    headline: "Вы — Визуал",
    short: "Вы лучше всего усваиваете информацию через образы, схемы и цвет.",
    description:
      "Мозг визуала мыслит картинками. Диаграммы, карты, инфографика и цветовые акценты превращают абстрактное в наглядное — и знание закрепляется надолго.",
    formatNoun: "инфографику",
    resultKind: "infographic",
    icon: Eye,
    accentVar: "var(--visual)",
    tintVar: "var(--visual-tint)",
    text: "text-visual",
    bgTint: "bg-visual-tint",
    dot: "bg-visual",
    ring: "ring-visual/30",
    border: "border-visual/25",
    gradient: "from-visual/15 to-transparent",
  },
  audial: {
    id: "audial",
    label: "Аудиал",
    headline: "Вы — Аудиал",
    short: "Вы лучше всего учитесь, когда слушаете — голос, интонацию, ритм.",
    description:
      "Аудиалу важно услышать материал. Хорошо записанная лекция, спокойный голос и продуманный темп помогают понять и запомнить больше, чем страницы текста.",
    formatNoun: "аудиоверсию",
    resultKind: "audio",
    icon: AudioLines,
    accentVar: "var(--audial)",
    tintVar: "var(--audial-tint)",
    text: "text-audial",
    bgTint: "bg-audial-tint",
    dot: "bg-audial",
    ring: "ring-audial/30",
    border: "border-audial/25",
    gradient: "from-audial/15 to-transparent",
  },
  kinesthetic: {
    id: "kinesthetic",
    label: "Кинестетик",
    headline: "Вы — Кинестетик",
    short: "Вы учитесь через действие — практику, задания и эксперименты.",
    description:
      "Кинестетику нужно сделать самому. Интерактивные задания, практика и немедленная обратная связь превращают теорию в навык, который остаётся в руках.",
    formatNoun: "практические задания",
    resultKind: "tasks",
    icon: Hand,
    accentVar: "var(--kinesthetic)",
    tintVar: "var(--kinesthetic-tint)",
    text: "text-kinesthetic",
    bgTint: "bg-kinesthetic-tint",
    dot: "bg-kinesthetic",
    ring: "ring-kinesthetic/30",
    border: "border-kinesthetic/25",
    gradient: "from-kinesthetic/15 to-transparent",
  },
}

export const PERCEPTION_LIST: PerceptionMeta[] = [
  PERCEPTION.visual,
  PERCEPTION.audial,
  PERCEPTION.kinesthetic,
]

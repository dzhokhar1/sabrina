import type { PerceptionType } from "@/data/perception"

export interface TestOption {
  label: string
  type: PerceptionType
}

export interface TestQuestion {
  id: string
  question: string
  options: TestOption[]
}

/** Опрос для определения типа восприятия (демо-логика подсчёта по баллам). */
export const perceptionTest: TestQuestion[] = [
  {
    id: "learn",
    question: "Когда вы изучаете что-то новое, вам проще всего…",
    options: [
      { label: "Увидеть схему, картинку или пример", type: "visual" },
      { label: "Послушать понятное объяснение", type: "audial" },
      { label: "Сразу попробовать сделать самому", type: "kinesthetic" },
    ],
  },
  {
    id: "directions",
    question: "Чтобы запомнить дорогу до нового места, вы…",
    options: [
      { label: "Представляете карту и ориентиры", type: "visual" },
      { label: "Проговариваете маршрут вслух", type: "audial" },
      { label: "Запоминаете, один раз пройдя его", type: "kinesthetic" },
    ],
  },
  {
    id: "lecture",
    question: "На лекции вам важнее всего…",
    options: [
      { label: "Наглядные слайды и схемы", type: "visual" },
      { label: "Живой голос и интонация лектора", type: "audial" },
      { label: "Задания и практика по ходу", type: "kinesthetic" },
    ],
  },
  {
    id: "leisure",
    question: "Свободное время с пользой — это для вас скорее…",
    options: [
      { label: "Видео и инфографика", type: "visual" },
      { label: "Подкасты и аудиокниги", type: "audial" },
      { label: "Мастер-классы и что-то руками", type: "kinesthetic" },
    ],
  },
  {
    id: "explain",
    question: "Объясняя что-то другу, вы чаще всего…",
    options: [
      { label: "Рисуете или показываете на схеме", type: "visual" },
      { label: "Подробно рассказываете словами", type: "audial" },
      { label: "Показываете на примере, делаете вместе", type: "kinesthetic" },
    ],
  },
  {
    id: "attention",
    question: "Что быстрее привлекает ваше внимание?",
    options: [
      { label: "Яркая картинка или цвет", type: "visual" },
      { label: "Звук, музыка или голос", type: "audial" },
      { label: "Возможность потрогать, подвигаться", type: "kinesthetic" },
    ],
  },
  {
    id: "device",
    question: "С новым устройством вы обычно…",
    options: [
      { label: "Смотрите иллюстрации в инструкции", type: "visual" },
      { label: "Просите объяснить, как им пользоваться", type: "audial" },
      { label: "Сразу пробуете все кнопки", type: "kinesthetic" },
    ],
  },
]

/** Подсчёт результата: тип с наибольшим числом ответов (при равенстве — раньше по порядку). */
export function scorePerception(
  answers: PerceptionType[],
): PerceptionType {
  const tally: Record<PerceptionType, number> = {
    visual: 0,
    audial: 0,
    kinesthetic: 0,
  }
  for (const a of answers) tally[a] += 1

  const order: PerceptionType[] = ["visual", "audial", "kinesthetic"]
  return order.reduce((best, t) => (tally[t] > tally[best] ? t : best), order[0])
}

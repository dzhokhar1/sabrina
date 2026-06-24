import {
  BrainCircuit,
  Code2,
  Languages,
  Palette,
  Wallet,
  type LucideIcon,
} from "lucide-react"

export interface Lecture {
  id: string
  title: string
  summary: string
  duration: string
}

export interface Course {
  id: string
  title: string
  subtitle: string
  description: string
  tag: string
  icon: LucideIcon
  lectures: Lecture[]
}

export const courses: Course[] = [
  {
    id: "programming",
    title: "Программирование",
    subtitle: "С нуля до первой программы",
    description:
      "Базовый курс для тех, кто никогда не писал код. Разбираем, как мыслит компьютер, что такое переменные и циклы, и пишем первые рабочие программы.",
    tag: "Технологии",
    icon: Code2,
    lectures: [
      {
        id: "intro",
        title: "Лекция 1. Введение",
        summary: "Что такое программирование и почему это проще, чем кажется.",
        duration: "12 мин",
      },
      {
        id: "basics",
        title: "Лекция 2. Основы",
        summary: "Переменные, типы данных и первые команды.",
        duration: "18 мин",
      },
      {
        id: "logic",
        title: "Лекция 3. Логика и циклы",
        summary: "Условия, повторения и принятие решений в коде.",
        duration: "21 мин",
      },
    ],
  },
  {
    id: "english",
    title: "Английский язык",
    subtitle: "Уверенный старт",
    description:
      "Курс для начинающих: ставим произношение, набираем первые 500 слов и учимся строить живые фразы для повседневного общения.",
    tag: "Языки",
    icon: Languages,
    lectures: [
      {
        id: "sounds",
        title: "Лекция 1. Звуки и ритм",
        summary: "Как звучит английский и почему важна интонация.",
        duration: "14 мин",
      },
      {
        id: "words",
        title: "Лекция 2. Первые слова",
        summary: "500 слов, которые покрывают половину бытовой речи.",
        duration: "17 мин",
      },
      {
        id: "phrases",
        title: "Лекция 3. Живые фразы",
        summary: "Собираем слова в предложения и заговариваем.",
        duration: "19 мин",
      },
    ],
  },
  {
    id: "thinking",
    title: "Критическое мышление",
    subtitle: "Как думать яснее",
    description:
      "Курс о том, как замечать ошибки мышления, отличать факты от мнений и принимать взвешенные решения в потоке информации.",
    tag: "Мышление",
    icon: BrainCircuit,
    lectures: [
      {
        id: "biases",
        title: "Лекция 1. Ловушки мышления",
        summary: "Когнитивные искажения, которые есть у каждого.",
        duration: "16 мин",
      },
      {
        id: "arguments",
        title: "Лекция 2. Сильный аргумент",
        summary: "Из чего складывается убедительный довод.",
        duration: "20 мин",
      },
    ],
  },
  {
    id: "design",
    title: "Дизайн интерфейсов",
    subtitle: "Основы для начинающих",
    description:
      "Курс о том, как делать понятные и красивые экраны: иерархия, типографика, цвет и сетки — без воды и сразу на примерах.",
    tag: "Дизайн",
    icon: Palette,
    lectures: [
      {
        id: "hierarchy",
        title: "Лекция 1. Иерархия",
        summary: "Как направлять внимание пользователя.",
        duration: "15 мин",
      },
      {
        id: "type-color",
        title: "Лекция 2. Шрифт и цвет",
        summary: "Базовые правила типографики и палитры.",
        duration: "18 мин",
      },
    ],
  },
  {
    id: "finance",
    title: "Личные финансы",
    subtitle: "Деньги под контролем",
    description:
      "Практический курс о бюджете, подушке безопасности и первых инвестициях — простыми словами и с расчётами на каждый день.",
    tag: "Финансы",
    icon: Wallet,
    lectures: [
      {
        id: "budget",
        title: "Лекция 1. Бюджет",
        summary: "Куда уходят деньги и как это увидеть.",
        duration: "16 мин",
      },
      {
        id: "cushion",
        title: "Лекция 2. Подушка безопасности",
        summary: "Сколько откладывать и зачем.",
        duration: "14 мин",
      },
    ],
  },
]

export function getCourse(id: string | undefined): Course | undefined {
  return courses.find((c) => c.id === id)
}

export function getLecture(
  course: Course | undefined,
  lectureId: string | undefined,
): Lecture | undefined {
  return course?.lectures.find((l) => l.id === lectureId)
}

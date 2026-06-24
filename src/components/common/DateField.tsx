import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"
import type { Matcher } from "react-day-picker"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface DateFieldProps {
  value?: Date
  onChange: (date: Date | undefined) => void
  placeholder?: string
  captionLayout?: "label" | "dropdown" | "dropdown-months" | "dropdown-years"
  startMonth?: Date
  endMonth?: Date
  disabled?: Matcher | Matcher[]
  defaultMonth?: Date
  id?: string
}

export function DateField({
  value,
  onChange,
  placeholder = "Выберите дату",
  captionLayout = "label",
  startMonth,
  endMonth,
  disabled,
  defaultMonth,
  id,
}: DateFieldProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id={id}
          type="button"
          variant="outline"
          className={cn(
            "w-full justify-start gap-2 font-normal",
            !value && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="size-4 opacity-70" />
          {value ? format(value, "d MMMM yyyy", { locale: ru }) : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          locale={ru}
          captionLayout={captionLayout}
          startMonth={startMonth}
          endMonth={endMonth}
          defaultMonth={defaultMonth ?? value}
          disabled={disabled}
          autoFocus
        />
      </PopoverContent>
    </Popover>
  )
}

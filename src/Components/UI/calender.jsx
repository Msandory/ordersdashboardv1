
import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"
import { cn } from "../utils"
import { buttonVariants } from "./Button.jsx"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium text-white",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-white/10 text-white border-white/20 p-0 opacity-70 hover:opacity-100 hover:bg-white/20"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "grid grid-cols-7",
        head_cell: "text-white/70 rounded-md w-9 font-normal text-[0.8rem] p-0",
        row: "grid grid-cols-7 mt-2",
        cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal text-white/70 aria-selected:opacity-100 hover:bg-white/10"
        ),
        day_selected:
          "bg-white/20 text-white hover:bg-white/30 hover:text-white focus:bg-white/20 focus:text-white",
        day_today: "bg-accent text-accent-foreground",
        day_outside: "text-white/40 opacity-50 hover:bg-transparent",
        day_disabled: "text-white/20 opacity-50 hover:bg-transparent",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4 text-white" />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4 text-white" />,
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }

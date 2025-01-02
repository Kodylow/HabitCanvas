import { addDays, format, startOfYear, eachDayOfInterval, isSameDay } from "date-fns";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type HabitGridProps = {
  entries: {
    date: string;
    count: number;
  }[];
};

export function HabitGrid({ entries }: HabitGridProps) {
  const today = new Date();
  const yearStart = startOfYear(today);
  const days = eachDayOfInterval({ start: yearStart, end: today });
  
  const getIntensity = (count: number) => {
    if (count === 0) return "bg-muted";
    if (count === 1) return "bg-primary/20";
    if (count === 2) return "bg-primary/40";
    if (count === 3) return "bg-primary/60";
    return "bg-primary";
  };

  const getEntryForDay = (day: Date) => {
    return entries.find(entry => isSameDay(new Date(entry.date), day));
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="inline-grid grid-rows-7 grid-flow-col gap-1 p-4">
        {days.map((day, i) => {
          const entry = getEntryForDay(day);
          return (
            <TooltipProvider key={i}>
              <Tooltip>
                <TooltipTrigger>
                  <div
                    className={`w-3 h-3 rounded-sm ${getIntensity(entry?.count || 0)}`}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <div className="text-sm">
                    <p className="font-semibold">{format(day, 'MMM d, yyyy')}</p>
                    <p>{entry?.count || 0} activities</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </div>
    </div>
  );
}

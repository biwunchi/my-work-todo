'use client'

import { useState } from 'react'
import { format, isSameMonth } from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { getDaysInMonth, formatDateForSupabase } from '@/lib/dateUtils'
import { Task } from '@/lib/supabase'

type CalendarViewProps = {
  currentDate: Date
  onDateSelect: (date: Date) => void
  onPrevMonth: () => void
  onNextMonth: () => void
  tasks: Task[]
}

export function CalendarView({
  currentDate,
  onDateSelect,
  onPrevMonth,
  onNextMonth,
  tasks,
}: CalendarViewProps) {
  const [hoveredDate, setHoveredDate] = useState<string | null>(null)
  const days = getDaysInMonth(currentDate)
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const getTasksForDate = (date: Date) => {
    const dateStr = formatDateForSupabase(date)
    return tasks.filter((t) => t.date === dateStr)
  }

  const isCurrentMonth = (date: Date) => isSameMonth(date, currentDate)

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">{format(currentDate, 'MMMM yyyy')}</h2>
        <div className="flex gap-2">
          <button
            onClick={onPrevMonth}
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={onNextMonth}
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-2">
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-center font-semibold text-sm py-2 text-gray-600 dark:text-gray-400"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2 flex-1">
        {days.map((day) => {
          const dateStr = formatDateForSupabase(day)
          const dayTasks = getTasksForDate(day)
          const isOtherMonth = !isCurrentMonth(day)

          return (
            <div
              key={dateStr}
              onClick={() => onDateSelect(day)}
              onMouseEnter={() => setHoveredDate(dateStr)}
              onMouseLeave={() => setHoveredDate(null)}
              className={`
                min-h-24 p-2 border rounded-lg cursor-pointer transition
                ${isOtherMonth ? 'bg-gray-50 dark:bg-gray-900 text-gray-400' : 'bg-white dark:bg-gray-800'}
                ${hoveredDate === dateStr ? 'ring-2 ring-blue-500' : 'border-gray-200 dark:border-gray-700'}
              `}
            >
              <div className="text-sm font-semibold mb-2">{format(day, 'd')}</div>
              <div className="space-y-1">
                {hoveredDate === dateStr && dayTasks.length > 0 && (
                  <div className="text-xs space-y-1 max-h-12 overflow-y-auto">
                    {dayTasks.slice(0, 3).map((task) => (
                      <div
                        key={task.id}
                        className={`px-2 py-1 rounded text-white text-xs font-medium truncate ${
                          task.priority === 'high'
                            ? 'bg-red-500'
                            : task.priority === 'medium'
                            ? 'bg-yellow-500'
                            : 'bg-green-500'
                        }`}
                      >
                        {task.title}
                      </div>
                    ))}
                    {dayTasks.length > 3 && (
                      <div className="text-xs text-gray-500 dark:text-gray-400 px-2">
                        +{dayTasks.length - 3} more
                      </div>
                    )}
                  </div>
                )}
                {hoveredDate !== dateStr && dayTasks.length > 0 && (
                  <div className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                    {dayTasks.length} task{dayTasks.length > 1 ? 's' : ''}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

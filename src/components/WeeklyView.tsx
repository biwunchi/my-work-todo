'use client'

import { format } from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { getWeekDays, formatDateForSupabase } from '@/lib/dateUtils'
import { Task } from '@/lib/supabase'

type WeeklyViewProps = {
  currentDate: Date
  onDateSelect: (date: Date) => void
  onPrevWeek: () => void
  onNextWeek: () => void
  tasks: Task[]
}

export function WeeklyView({
  currentDate,
  onDateSelect,
  onPrevWeek,
  onNextWeek,
  tasks,
}: WeeklyViewProps) {
  const weekDays = getWeekDays(currentDate)
  const dayLabels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  const getTasksForDate = (date: Date) => {
    const dateStr = formatDateForSupabase(date)
    return tasks.filter((t) => t.date === dateStr)
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">
          Week of {format(weekDays[0], 'MMM d')} - {format(weekDays[6], 'MMM d, yyyy')}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={onPrevWeek}
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={onNextWeek}
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-3 flex-1">
        {weekDays.map((day, index) => {
          const dayTasks = getTasksForDate(day)
          const dateStr = formatDateForSupabase(day)

          return (
            <div
              key={dateStr}
              onClick={() => onDateSelect(day)}
              className="flex flex-col border rounded-lg p-4 cursor-pointer hover:ring-2 hover:ring-blue-500 transition dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="mb-4">
                <div className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                  {dayLabels[index]}
                </div>
                <div className="text-2xl font-bold">{format(day, 'd')}</div>
              </div>

              <div className="flex-1">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {dayTasks.length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {dayTasks.length === 1 ? 'task' : 'tasks'}
                </div>
              </div>

              {dayTasks.length > 0 && (
                <div className="mt-4 pt-4 border-t dark:border-gray-700 space-y-2 max-h-24 overflow-y-auto">
                  {dayTasks.slice(0, 3).map((task) => (
                    <div
                      key={task.id}
                      className={`px-2 py-1 rounded text-xs font-medium text-white truncate ${
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
            </div>
          )
        })}
      </div>
    </div>
  )
}

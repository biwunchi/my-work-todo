'use client'

import { format } from 'date-fns'
import { ChevronLeft, ChevronRight, Edit, Trash2 } from 'lucide-react'
import { formatDateForSupabase } from '@/lib/dateUtils'
import { Task } from '@/lib/supabase'

type DailyViewProps = {
  selectedDate: Date | null
  onPrevDay: () => void
  onNextDay: () => void
  tasks: Task[]
  onDeleteTask: (id: string) => void
  onEditTask: (task: Task) => void
}

export function DailyView({
  selectedDate,
  onPrevDay,
  onNextDay,
  tasks,
  onDeleteTask,
  onEditTask,
}: DailyViewProps) {
  if (!selectedDate) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400 dark:text-gray-500">
        Select a date to view tasks
      </div>
    )
  }

  const dateStr = formatDateForSupabase(selectedDate)
  const dayTasks = tasks.filter((t) => t.date === dateStr)

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">{format(selectedDate, 'EEEE')}</h2>
          <p className="text-gray-600 dark:text-gray-400">{format(selectedDate, 'MMMM d, yyyy')}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onPrevDay}
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={onNextDay}
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {dayTasks.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-2">📭</div>
            <p className="text-gray-500 dark:text-gray-400">No tasks for this day</p>
          </div>
        </div>
      ) : (
        <div className="space-y-3 overflow-y-auto">
          {dayTasks.map((task) => (
            <div
              key={task.id}
              className={`p-4 border rounded-lg dark:border-gray-700 dark:bg-gray-800 ${
                task.priority === 'high'
                  ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20'
                  : task.priority === 'medium'
                  ? 'border-yellow-300 dark:border-yellow-600 bg-yellow-50 dark:bg-yellow-900/20'
                  : 'border-green-300 dark:border-green-600 bg-green-50 dark:bg-green-900/20'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">{task.title}</h3>
                    <span
                      className={`text-xs font-bold px-2 py-1 rounded ${
                        task.priority === 'high'
                          ? 'bg-red-500 text-white'
                          : task.priority === 'medium'
                          ? 'bg-yellow-500 text-white'
                          : 'bg-green-500 text-white'
                      }`}
                    >
                      {task.priority.toUpperCase()}
                    </span>
                  </div>
                  {task.description && (
                    <p className="text-sm mt-2 text-gray-700 dark:text-gray-300">
                      {task.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-300 dark:border-gray-600">
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {format(new Date(task.created_at), 'MMM d, HH:mm')}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => onEditTask(task)}
                    className="p-2 hover:bg-gray-300 dark:hover:bg-gray-600 rounded transition"
                    title="Edit task"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDeleteTask(task.id)}
                    className="p-2 hover:bg-red-200 dark:hover:bg-red-900 rounded transition text-red-600 dark:text-red-400"
                    title="Delete task"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

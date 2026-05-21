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
      <div className="flex-1 flex items-center justify-center text-mm-text-secondary">
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
          <p className="text-mm-text-secondary">{format(selectedDate, 'MMMM d, yyyy')}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onPrevDay}
            className="p-2 hover:bg-mm-surface rounded-lg transition"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={onNextDay}
            className="p-2 hover:bg-mm-surface rounded-lg transition"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {dayTasks.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-2">📭</div>
            <p className="text-mm-text-secondary">No tasks for this day</p>
          </div>
        </div>
      ) : (
        <div className="space-y-3 overflow-y-auto">
          {dayTasks.map((task) => (
            <div
              key={task.id}
              className={`p-4 border rounded-lg bg-mm-surface border-mm-border ${
                task.priority === 'high'
                  ? 'border-red-600 bg-red-900/10'
                  : task.priority === 'medium'
                  ? 'border-yellow-600 bg-yellow-900/10'
                  : 'border-mm-emerald/50 bg-mm-emerald/5'
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
                          : 'bg-mm-emerald text-mm-dark'
                      }`}
                    >
                      {task.priority.toUpperCase()}
                    </span>
                  </div>
                  {task.description && (
                    <p className="text-sm mt-2 text-mm-text-secondary">
                      {task.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-mm-border">
                <div className="text-xs text-mm-text-secondary">
                  {format(new Date(task.created_at), 'MMM d, HH:mm')}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => onEditTask(task)}
                    className="p-2 hover:bg-mm-surface-light rounded transition"
                    title="Edit task"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDeleteTask(task.id)}
                    className="p-2 hover:bg-red-900/30 rounded transition text-red-400"
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

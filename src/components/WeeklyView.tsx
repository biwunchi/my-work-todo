'use client'

import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react'
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
  const dayLabels = ['월', '화', '수', '목', '금', '토', '일']

  const getTasksForDate = (date: Date) => {
    const dateStr = formatDateForSupabase(date)
    return tasks.filter((t) => t.due_date === dateStr)
  }

  const getPriorityColor = (priority: string) => {
    if (priority === 'high') return { bg: 'bg-red-500/20', border: 'border-red-500/50', text: 'text-red-400', badge: 'bg-red-500/30' }
    if (priority === 'medium') return { bg: 'bg-amber-500/20', border: 'border-amber-500/50', text: 'text-amber-400', badge: 'bg-amber-500/30' }
    return { bg: 'bg-mm-emerald/20', border: 'border-mm-emerald/50', text: 'text-mm-emerald', badge: 'bg-mm-emerald/30' }
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
  }

  return (
    <div className="flex-1 flex flex-col h-full text-mm-text animate-slideInUp">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Calendar className="w-8 h-8 text-mm-emerald" />
          <h2 className="text-3xl font-bold">
            {format(weekDays[0], 'd MMM', { locale: ko })} - {format(weekDays[6], 'd MMM yyyy', { locale: ko })}
          </h2>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onPrevWeek}
            className="p-3 rounded-xl transition-all duration-300 bg-mm-surface-light hover:bg-mm-surface-lighter hover:shadow-lg hover:scale-105"
            title="이전 주"
          >
            <ChevronLeft className="w-6 h-6 text-mm-emerald" />
          </button>
          <button
            onClick={onNextWeek}
            className="p-3 rounded-xl transition-all duration-300 bg-mm-surface-light hover:bg-mm-surface-lighter hover:shadow-lg hover:scale-105"
            title="다음 주"
          >
            <ChevronRight className="w-6 h-6 text-mm-emerald" />
          </button>
        </div>
      </div>

      {/* Weekly Grid */}
      <div className="flex-1 grid grid-cols-7 gap-3 rounded-3xl overflow-hidden border border-mm-border-light bg-mm-surface-light p-4 shadow-premium">
        {weekDays.map((date, dayIndex) => {
          const tasksForDate = getTasksForDate(date)
          const isTodayDate = isToday(date)

          return (
            <div
              key={dayIndex}
              className={`rounded-2xl flex flex-col overflow-hidden border-2 transition-all duration-300 cursor-pointer backdrop-filter backdrop-blur-sm ${
                isTodayDate
                  ? 'border-mm-emerald bg-gradient-to-br from-mm-emerald/10 to-mm-emerald/5 shadow-glow-md'
                  : 'border-mm-border-light bg-mm-surface hover:border-mm-emerald/50 hover:shadow-lg hover:scale-105'
              }`}
              onClick={() => onDateSelect(date)}
            >
              {/* Day Header */}
              <div
                className={`p-4 text-center border-b border-mm-border-light transition-all duration-300 ${
                  isTodayDate ? 'bg-mm-emerald/20' : 'bg-mm-surface-alt'
                }`}
              >
                <div className={`text-xs font-semibold mb-2 ${isTodayDate ? 'text-mm-emerald' : 'text-mm-text-tertiary'}`}>
                  {dayLabels[dayIndex]}
                </div>
                <div className={`text-2xl font-bold ${isTodayDate ? 'text-mm-emerald' : 'text-mm-text'}`}>
                  {date.getDate()}
                </div>
              </div>

              {/* Tasks */}
              <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2">
                {tasksForDate.map((task) => {
                  const colors = getPriorityColor(task.priority)
                  return (
                    <div
                      key={task.id}
                      className={`text-xs px-2.5 py-1.5 rounded-lg truncate font-medium border transition-all duration-300 ${colors.bg} ${colors.border} ${colors.text} hover:shadow-md`}
                      title={task.title}
                    >
                      {task.title}
                    </div>
                  )
                })}

                {/* Empty State */}
                {tasksForDate.length === 0 && (
                  <div className="flex items-center justify-center h-full text-mm-text-tertiary text-xs opacity-50">
                    <span>할일 없음</span>
                  </div>
                )}

                {/* Task Count */}
                {tasksForDate.length > 0 && (
                  <div className="mt-auto pt-2 border-t border-mm-border-light text-xs text-mm-text-tertiary text-center">
                    {tasksForDate.length}개
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

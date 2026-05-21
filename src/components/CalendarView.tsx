'use client'

import { useState } from 'react'
import { format, isSameMonth } from 'date-fns'
import { ko } from 'date-fns/locale'
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react'
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
  const weekDays = ['일', '월', '화', '수', '목', '금', '토']

  const getTasksForDate = (date: Date) => {
    const dateStr = formatDateForSupabase(date)
    return tasks.filter((t) => t.due_date === dateStr)
  }

  const isCurrentMonth = (date: Date) => isSameMonth(date, currentDate)

  const getPriorityColor = (priority: string) => {
    if (priority === 'high') return { bg: 'bg-red-500/20', border: 'border-red-500/50', text: 'text-red-400', label: '높음' }
    if (priority === 'medium') return { bg: 'bg-amber-500/20', border: 'border-amber-500/50', text: 'text-amber-400', label: '중간' }
    return { bg: 'bg-mm-emerald/20', border: 'border-mm-emerald/50', text: 'text-mm-emerald', label: '낮음' }
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
            {format(currentDate, 'MMMM yyyy', { locale: ko })}
          </h2>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onPrevMonth}
            className="p-3 rounded-xl transition-all duration-300 bg-mm-surface-light hover:bg-mm-surface-lighter hover:shadow-lg hover:scale-105"
            title="이전 달"
          >
            <ChevronLeft className="w-6 h-6 text-mm-emerald" />
          </button>
          <button
            onClick={onNextMonth}
            className="p-3 rounded-xl transition-all duration-300 bg-mm-surface-light hover:bg-mm-surface-lighter hover:shadow-lg hover:scale-105"
            title="다음 달"
          >
            <ChevronRight className="w-6 h-6 text-mm-emerald" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="flex-1 flex flex-col rounded-3xl overflow-hidden border border-mm-border-light bg-gradient-to-br from-mm-surface to-mm-surface-alt shadow-premium">
        {/* Weekday Headers */}
        <div className="grid grid-cols-7 gap-0 bg-mm-surface-light border-b border-mm-border-light">
          {weekDays.map((day) => (
            <div
              key={day}
              className="p-4 text-center font-bold text-lg text-mm-emerald bg-mm-surface/50 hover:bg-mm-surface-alt transition-colors"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Dates - Grid Layout */}
        <div className="flex-1 grid grid-cols-7 gap-px p-2 bg-mm-surface-light overflow-hidden">
          {days.map((date, index) => {
            const tasksForDate = getTasksForDate(date)
            const isCurrentDateMonth = isCurrentMonth(date)
            const isTodayDate = isToday(date)
            const dateStr = formatDateForSupabase(date)
            const isHovered = hoveredDate === dateStr

            return (
              <div
                key={index}
                className={`rounded-2xl p-3 cursor-pointer transition-all duration-300 border-2 flex flex-col ${
                  isTodayDate
                    ? 'border-mm-emerald bg-gradient-to-br from-mm-emerald/10 to-mm-emerald/5 shadow-glow'
                    : isCurrentDateMonth
                    ? 'border-mm-border-light bg-mm-surface hover:border-mm-emerald/50'
                    : 'border-mm-border opacity-30 bg-mm-surface-alt'
                } ${
                  isHovered && isCurrentDateMonth ? 'shadow-glow-md transform scale-105' : ''
                } ${!isCurrentDateMonth ? 'opacity-40 cursor-default' : ''}`}
                style={{
                  minHeight: '160px',
                  backdropFilter: 'blur(10px)',
                }}
                onMouseEnter={() => isCurrentDateMonth && setHoveredDate(dateStr)}
                onMouseLeave={() => setHoveredDate(null)}
                onClick={() => isCurrentDateMonth && onDateSelect(date)}
              >
                {/* Date Number */}
                <div className={`text-xl font-bold mb-2 ${isTodayDate ? 'text-mm-emerald' : 'text-mm-text'}`}>
                  {date.getDate()}
                </div>

                {/* Tasks Container */}
                <div className="flex flex-col gap-1 flex-1 overflow-y-auto">
                  {tasksForDate.slice(0, 3).map((task) => {
                    const colors = getPriorityColor(task.priority)
                    return (
                      <div
                        key={task.id}
                        className={`text-xs px-2 py-1.5 rounded-lg truncate font-medium border ${colors.bg} ${colors.border} ${colors.text} transition-all duration-300 hover:shadow-md`}
                        title={task.title}
                      >
                        {task.title}
                      </div>
                    )
                  })}

                  {/* More indicator */}
                  {tasksForDate.length > 3 && (
                    <div className="text-xs font-semibold text-mm-emerald mt-1">
                      +{tasksForDate.length - 3}개 더
                    </div>
                  )}
                </div>

                {/* Task count badge */}
                {tasksForDate.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-mm-border-light text-xs text-mm-text-tertiary">
                    {tasksForDate.length}개 작업
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

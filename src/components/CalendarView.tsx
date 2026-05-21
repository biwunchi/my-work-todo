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

  const getPriorityColor = (priority: string) => {
    if (priority === 'high') return '#ff7675' // Red
    if (priority === 'medium') return '#fdcb6e' // Orange
    return '#00b894' // Green
  }

  return (
    <div className="flex-1 flex flex-col" style={{ color: '#f8fafc' }}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">{format(currentDate, 'MMMM yyyy')}</h2>
        <div className="flex gap-2">
          <button
            onClick={onPrevMonth}
            className="p-2 rounded-lg transition"
            style={{ backgroundColor: '#1e293b', color: '#f8fafc' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#334155')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#1e293b')}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={onNextMonth}
            className="p-2 rounded-lg transition"
            style={{ backgroundColor: '#1e293b', color: '#f8fafc' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#334155')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#1e293b')}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="flex-1 flex flex-col border rounded-lg overflow-hidden" style={{ borderColor: '#334155', backgroundColor: '#0f172a' }}>
        {/* Weekday Headers */}
        <div className="grid grid-cols-7 gap-0 border-b" style={{ borderColor: '#334155' }}>
          {weekDays.map((day) => (
            <div
              key={day}
              className="p-3 text-center font-semibold text-sm border-r"
              style={{ borderColor: '#334155', backgroundColor: '#1e293b', color: '#f8fafc' }}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Dates */}
        <div className="flex-1 grid grid-cols-7 gap-0" style={{ backgroundColor: '#0f172a' }}>
          {days.map((date, index) => {
            const tasksForDate = getTasksForDate(date)
            const isCurrentDateMonth = isCurrentMonth(date)
            const isToday = formatDateForSupabase(date) === formatDateForSupabase(new Date())

            return (
              <div
                key={index}
                className="p-3 border cursor-pointer transition"
                style={{
                  borderColor: '#334155',
                  backgroundColor: isToday ? '#1dd1a1' : isCurrentDateMonth ? '#1e293b' : '#0f172a',
                  color: isToday ? '#000' : '#f8fafc',
                  opacity: isCurrentDateMonth ? 1 : 0.5,
                }}
                onMouseEnter={() => setHoveredDate(formatDateForSupabase(date))}
                onMouseLeave={() => setHoveredDate(null)}
                onClick={() => onDateSelect(date)}
              >
                <div className="text-sm font-semibold mb-2">{date.getDate()}</div>
                
                {/* Task Indicators */}
                <div className="flex flex-col gap-1">
                  {tasksForDate.slice(0, 2).map((task) => (
                    <div
                      key={task.id}
                      className="text-xs px-2 py-1 rounded truncate"
                      style={{
                        backgroundColor: getPriorityColor(task.priority),
                        color: '#000',
                        fontSize: '10px',
                      }}
                    >
                      {task.title.substring(0, 15)}
                    </div>
                  ))}
                  {tasksForDate.length > 2 && (
                    <div className="text-xs text-mm-emerald">
                      +{tasksForDate.length - 2} more
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

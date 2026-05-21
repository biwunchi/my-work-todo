'use client'

import { useState } from 'react'
import { format, isSameMonth } from 'date-fns'
import { ko } from 'date-fns/locale'
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
  const weekDays = ['일', '월', '화', '수', '목', '금', '토']

  const getTasksForDate = (date: Date) => {
    const dateStr = formatDateForSupabase(date)
    return tasks.filter((t) => t.due_date === dateStr)
  }

  const isCurrentMonth = (date: Date) => isSameMonth(date, currentDate)

  const getPriorityColor = (priority: string) => {
    if (priority === 'high') return { bg: '#ff7675', text: '#fff' }
    if (priority === 'medium') return { bg: '#fdcb6e', text: '#000' }
    return { bg: '#1dd1a1', text: '#000' }
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
  }

  return (
    <div className="flex-1 flex flex-col h-full" style={{ color: '#f8fafc' }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold" style={{ fontSize: '32px', fontWeight: 'bold' }}>
          {format(currentDate, 'MMMM yyyy', { locale: ko })}
        </h2>
        <div className="flex gap-3">
          <button
            onClick={onPrevMonth}
            className="p-3 rounded-lg transition hover:shadow-lg"
            style={{ backgroundColor: '#1e293b', color: '#f8fafc' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#334155'
              e.currentTarget.style.transform = 'scale(1.05)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#1e293b'
              e.currentTarget.style.transform = 'scale(1)'
            }}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={onNextMonth}
            className="p-3 rounded-lg transition hover:shadow-lg"
            style={{ backgroundColor: '#1e293b', color: '#f8fafc' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#334155'
              e.currentTarget.style.transform = 'scale(1.05)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#1e293b'
              e.currentTarget.style.transform = 'scale(1)'
            }}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div 
        className="flex-1 flex flex-col border rounded-2xl overflow-hidden shadow-2xl"
        style={{ 
          borderColor: '#334155', 
          backgroundColor: '#0f172a',
          display: 'flex'
        }}
      >
        {/* Weekday Headers */}
        <div className="grid grid-cols-7 gap-0 border-b" style={{ borderColor: '#334155', backgroundColor: '#1e293b' }}>
          {weekDays.map((day) => (
            <div
              key={day}
              className="p-4 text-center font-bold text-lg"
              style={{ backgroundColor: '#1e293b', color: '#1dd1a1', borderRight: '1px solid #334155' }}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Dates - Grid Layout */}
        <div className="flex-1 grid grid-cols-7 gap-px" style={{ backgroundColor: '#0f172a', padding: '8px' }}>
          {days.map((date, index) => {
            const tasksForDate = getTasksForDate(date)
            const isCurrentDateMonth = isCurrentMonth(date)
            const isTodayDate = isToday(date)
            const dateStr = formatDateForSupabase(date)

            return (
              <div
                key={index}
                className="rounded-xl p-4 cursor-pointer transition border-2"
                style={{
                  backgroundColor: isTodayDate ? 'rgba(29, 209, 161, 0.15)' : isCurrentDateMonth ? '#1e293b' : '#0f172a',
                  borderColor: isTodayDate ? '#1dd1a1' : '#334155',
                  opacity: isCurrentDateMonth ? 1 : 0.4,
                  minHeight: '160px',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: isTodayDate ? '0 0 20px rgba(29, 209, 161, 0.3)' : 'none',
                }}
                onMouseEnter={() => {
                  setHoveredDate(dateStr)
                  if (isCurrentDateMonth) {
                    (event?.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(0, 184, 148, 0.2)'
                    ;(event?.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'
                  }
                }}
                onMouseLeave={() => {
                  setHoveredDate(null)
                  if (isTodayDate) {
                    (event?.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(29, 209, 161, 0.3)'
                  } else {
                    (event?.currentTarget as HTMLElement).style.boxShadow = 'none'
                  }
                  ;(event?.currentTarget as HTMLElement).style.transform = 'translateY(0)'
                }}
                onClick={() => isCurrentDateMonth && onDateSelect(date)}
              >
                {/* Date Number */}
                <div 
                  className="text-xl font-bold mb-3"
                  style={{
                    color: isTodayDate ? '#1dd1a1' : '#f8fafc',
                    fontSize: '20px'
                  }}
                >
                  {date.getDate()}
                </div>

                {/* Tasks Container */}
                <div className="flex flex-col gap-2 flex-1 overflow-y-auto">
                  {tasksForDate.slice(0, 3).map((task) => {
                    const colors = getPriorityColor(task.priority)
                    return (
                      <div
                        key={task.id}
                        className="text-xs px-2 py-1 rounded-md truncate font-medium transition"
                        style={{
                          backgroundColor: colors.bg,
                          color: colors.text,
                          fontSize: '11px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}
                        title={task.title}
                      >
                        {task.title}
                      </div>
                    )
                  })}
                  
                  {/* More indicator */}
                  {tasksForDate.length > 3 && (
                    <div className="text-xs font-semibold" style={{ color: '#1dd1a1', fontSize: '11px' }}>
                      +{tasksForDate.length - 3}개 더
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

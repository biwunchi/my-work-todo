'use client'

import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
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
  const dayLabels = ['월', '화', '수', '목', '금', '토', '일']

  const getTasksForDate = (date: Date) => {
    const dateStr = formatDateForSupabase(date)
    return tasks.filter((t) => t.date === dateStr)
  }

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
        <h2 className="text-3xl font-bold">
          {format(weekDays[0], 'd MMM', { locale: ko })} - {format(weekDays[6], 'd MMM yyyy', { locale: ko })}
        </h2>
        <div className="flex gap-3">
          <button
            onClick={onPrevWeek}
            className="p-3 rounded-lg transition"
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
            onClick={onNextWeek}
            className="p-3 rounded-lg transition"
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

      {/* Weekly Grid */}
      <div className="flex-1 grid grid-cols-7 gap-3 rounded-2xl overflow-hidden border-2 shadow-2xl" style={{ borderColor: '#334155', backgroundColor: '#0f172a', padding: '12px' }}>
        {weekDays.map((date, dayIndex) => {
          const tasksForDate = getTasksForDate(date)
          const isTodayDate = isToday(date)

          return (
            <div
              key={dayIndex}
              className="rounded-xl flex flex-col overflow-hidden border-2 transition cursor-pointer"
              style={{
                borderColor: isTodayDate ? '#1dd1a1' : '#334155',
                backgroundColor: isTodayDate ? 'rgba(29, 209, 161, 0.15)' : '#1e293b',
                boxShadow: isTodayDate ? '0 0 20px rgba(29, 209, 161, 0.3)' : 'none',
              }}
              onClick={() => onDateSelect(date)}
              onMouseEnter={(e) => {
                if (!isTodayDate) {
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 184, 148, 0.2)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }
              }}
              onMouseLeave={(e) => {
                if (isTodayDate) {
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(29, 209, 161, 0.3)'
                } else {
                  e.currentTarget.style.boxShadow = 'none'
                }
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              {/* Day Header */}
              <div 
                className="p-4 text-center border-b font-bold text-lg"
                style={{ 
                  borderColor: '#334155',
                  backgroundColor: '#0f172a',
                  color: isTodayDate ? '#1dd1a1' : '#f8fafc'
                }}
              >
                <div style={{ color: isTodayDate ? '#1dd1a1' : '#94a3b8', fontSize: '12px', marginBottom: '4px' }}>
                  {dayLabels[dayIndex]}
                </div>
                <div style={{ fontSize: '18px' }}>{date.getDate()}</div>
              </div>

              {/* Tasks */}
              <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2">
                {tasksForDate.map((task) => {
                  const colors = getPriorityColor(task.priority)
                  return (
                    <div
                      key={task.id}
                      className="text-xs px-2 py-1.5 rounded-md truncate font-medium"
                      style={{
                        backgroundColor: colors.bg,
                        color: colors.text,
                        fontSize: '11px',
                      }}
                      title={task.title}
                    >
                      {task.title}
                    </div>
                  )
                })}
                {tasksForDate.length === 0 && (
                  <div style={{ color: '#64748b', fontSize: '11px', textAlign: 'center', marginTop: '8px' }}>
                    할일 없음
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

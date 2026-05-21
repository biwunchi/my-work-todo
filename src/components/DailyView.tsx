'use client'

import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
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
      <div className="flex-1 flex items-center justify-center" style={{ color: '#94a3b8' }}>
        날짜를 선택해주세요
      </div>
    )
  }

  const dateStr = formatDateForSupabase(selectedDate)
  const dayTasks = tasks.filter((t) => t.date === dateStr).sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 }
    return (priorityOrder[a.priority as keyof typeof priorityOrder] || 3) - 
           (priorityOrder[b.priority as keyof typeof priorityOrder] || 3)
  })

  const getPriorityColor = (priority: string) => {
    if (priority === 'high') return { bg: '#ff7675', text: '#fff', label: '높음' }
    if (priority === 'medium') return { bg: '#fdcb6e', text: '#000', label: '중간' }
    return { bg: '#1dd1a1', text: '#000', label: '낮음' }
  }

  return (
    <div className="flex-1 flex flex-col h-full" style={{ color: '#f8fafc' }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold" style={{ fontSize: '32px', marginBottom: '4px' }}>
            {format(selectedDate, 'EEEE', { locale: ko })}
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '16px' }}>
            {format(selectedDate, 'd MMMM yyyy', { locale: ko })}
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onPrevDay}
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
            onClick={onNextDay}
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

      {/* Tasks List */}
      <div className="flex-1 overflow-y-auto space-y-3">
        {dayTasks.length === 0 ? (
          <div 
            className="flex items-center justify-center h-64 rounded-2xl border-2"
            style={{ borderColor: '#334155', backgroundColor: '#1e293b', color: '#94a3b8' }}
          >
            <div className="text-center">
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>📭</div>
              <div style={{ fontSize: '16px' }}>오늘 할일이 없습니다</div>
            </div>
          </div>
        ) : (
          dayTasks.map((task) => {
            const colors = getPriorityColor(task.priority)
            return (
              <div
                key={task.id}
                className="rounded-2xl p-6 border-2 transition"
                style={{
                  borderColor: '#334155',
                  backgroundColor: '#1e293b',
                  borderLeftWidth: '6px',
                  borderLeftColor: colors.bg,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 184, 148, 0.15)'
                  e.currentTarget.style.transform = 'translateX(4px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none'
                  e.currentTarget.style.transform = 'translateX(0)'
                }}
              >
                {/* Task Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold">{task.title}</h3>
                      <span
                        className="text-xs px-3 py-1 rounded-full font-semibold"
                        style={{
                          backgroundColor: colors.bg,
                          color: colors.text,
                          fontSize: '12px',
                        }}
                      >
                        {colors.label}
                      </span>
                    </div>
                    {task.description && (
                      <p style={{ color: '#cbd5e1', fontSize: '14px', marginTop: '8px' }}>
                        {task.description}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => onEditTask(task)}
                      className="p-2 rounded-lg transition"
                      style={{ backgroundColor: '#334155', color: '#f8fafc' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#475569'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#334155'
                      }}
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDeleteTask(task.id)}
                      className="p-2 rounded-lg transition"
                      style={{ backgroundColor: '#334155', color: '#ff7675' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#475569'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#334155'
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

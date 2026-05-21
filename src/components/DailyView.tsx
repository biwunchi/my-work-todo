'use client'

import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { ChevronLeft, ChevronRight, Edit, Trash2, CheckCircle2, Calendar as CalendarIcon } from 'lucide-react'
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
      <div className="flex-1 flex items-center justify-center animate-slideInUp">
        <div className="text-center">
          <CalendarIcon className="w-16 h-16 text-mm-text-tertiary mx-auto mb-4 opacity-50" />
          <p className="text-mm-text-secondary text-lg">날짜를 선택해주세요</p>
          <p className="text-mm-text-tertiary text-sm mt-2">캘린더 또는 주간 뷰에서 날짜를 선택하세요</p>
        </div>
      </div>
    )
  }

  const dateStr = formatDateForSupabase(selectedDate)
  const dayTasks = tasks.filter((t) => t.due_date === dateStr).sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 }
    return (priorityOrder[a.priority as keyof typeof priorityOrder] || 3) -
      (priorityOrder[b.priority as keyof typeof priorityOrder] || 3)
  })

  const getPriorityColor = (priority: string) => {
    if (priority === 'high') return {
      bg: 'bg-red-500/20',
      border: 'border-l-red-500',
      text: 'text-red-400',
      badge: 'bg-red-500/30 text-red-400',
      label: '높음'
    }
    if (priority === 'medium') return {
      bg: 'bg-amber-500/20',
      border: 'border-l-amber-500',
      text: 'text-amber-400',
      badge: 'bg-amber-500/30 text-amber-400',
      label: '중간'
    }
    return {
      bg: 'bg-mm-emerald/20',
      border: 'border-l-mm-emerald',
      text: 'text-mm-emerald',
      badge: 'bg-mm-emerald/30 text-mm-emerald',
      label: '낮음'
    }
  }

  return (
    <div className="flex-1 flex flex-col h-full text-mm-text animate-slideInUp">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            {format(selectedDate, 'EEEE', { locale: ko })}
          </h2>
          <p className="text-mm-text-secondary">
            {format(selectedDate, 'd MMMM yyyy', { locale: ko })}
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onPrevDay}
            className="p-3 rounded-xl transition-all duration-300 bg-mm-surface-light hover:bg-mm-surface-lighter hover:shadow-lg hover:scale-105"
            title="이전 날"
          >
            <ChevronLeft className="w-6 h-6 text-mm-emerald" />
          </button>
          <button
            onClick={onNextDay}
            className="p-3 rounded-xl transition-all duration-300 bg-mm-surface-light hover:bg-mm-surface-lighter hover:shadow-lg hover:scale-105"
            title="다음 날"
          >
            <ChevronRight className="w-6 h-6 text-mm-emerald" />
          </button>
        </div>
      </div>

      {/* Tasks List */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-2">
        {dayTasks.length === 0 ? (
          <div className="flex items-center justify-center h-96 rounded-3xl border-2 border-dashed border-mm-border-light bg-mm-surface/30 backdrop-filter backdrop-blur-sm">
            <div className="text-center">
              <div className="text-5xl mb-4">📭</div>
              <p className="text-mm-text-secondary text-lg font-medium">오늘 할일이 없습니다</p>
              <p className="text-mm-text-tertiary text-sm mt-2">사이드바에서 새로운 작업을 추가해보세요</p>
            </div>
          </div>
        ) : (
          dayTasks.map((task, index) => {
            const colors = getPriorityColor(task.priority)
            return (
              <div
                key={task.id}
                className={`rounded-2xl p-6 border-l-4 ${colors.border} transition-all duration-300 ${colors.bg} bg-gradient-to-r from-mm-surface to-mm-surface-alt border border-mm-border-light hover:shadow-glow-md hover:scale-102 cursor-pointer group animate-slideInUp`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Task Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <CheckCircle2 className={`w-6 h-6 flex-shrink-0 ${colors.text} opacity-60 group-hover:opacity-100 transition-opacity`} />
                      <h3 className="text-xl font-bold text-mm-text flex-1">{task.title}</h3>
                      <span className={`text-xs px-3 py-1 rounded-full font-semibold whitespace-nowrap ${colors.badge}`}>
                        {colors.label}
                      </span>
                    </div>

                    {task.description && (
                      <p className="text-mm-text-secondary text-sm ml-9 mb-3 leading-relaxed">
                        {task.description}
                      </p>
                    )}

                    {/* Meta Info */}
                    <div className="flex items-center gap-4 ml-9 text-xs text-mm-text-tertiary">
                      <span className="flex items-center gap-1">
                        📅 {format(selectedDate, 'yyyy년 M월 d일', { locale: ko })}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => onEditTask(task)}
                      className="p-2 rounded-lg transition-all duration-300 bg-mm-surface-light hover:bg-mm-surface-lighter hover:text-mm-emerald text-mm-text-secondary"
                      title="수정"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('이 작업을 삭제하시겠습니까?')) {
                          onDeleteTask(task.id)
                        }
                      }}
                      className="p-2 rounded-lg transition-all duration-300 bg-mm-surface-light hover:bg-red-500/20 hover:text-red-400 text-mm-text-secondary"
                      title="삭제"
                    >
                      <Trash2 className="w-5 h-5" />
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

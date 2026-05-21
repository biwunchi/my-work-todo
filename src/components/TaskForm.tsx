'use client'

import { useState } from 'react'
import { Plus, X } from 'lucide-react'
import { formatDateForSupabase } from '@/lib/dateUtils'
import { Task } from '@/lib/supabase'

type TaskFormProps = {
  onAdd?: (title: string, description: string | null, date: Date, priority: 'low' | 'medium' | 'high') => void
  onUpdate?: (id: string, title: string, description: string | null, date: Date, priority: 'low' | 'medium' | 'high') => void
  initialTask?: Task
  defaultDate?: Date
  onClose?: () => void
}

export function TaskForm({ onAdd, onUpdate, initialTask, defaultDate, onClose }: TaskFormProps) {
  const [title, setTitle] = useState(initialTask?.title || '')
  const [description, setDescription] = useState(initialTask?.description || '')
  const [date, setDate] = useState(initialTask?.due_date || formatDateForSupabase(defaultDate || new Date()))
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>(initialTask?.priority || 'medium')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    setIsSubmitting(true)
    try {
      const dateObj = new Date(date + 'T00:00:00')

      if (initialTask && onUpdate) {
        await onUpdate(initialTask.id, title, description || null, dateObj, priority)
      } else if (onAdd) {
        await onAdd(title, description || null, dateObj, priority)
      }

      if (!initialTask) {
        setTitle('')
        setDescription('')
        setDate(formatDateForSupabase(new Date()))
        setPriority('medium')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const priorityOptions = [
    { value: 'low', label: '낮음', color: 'text-mm-emerald border-mm-emerald/30 bg-mm-emerald/10 hover:bg-mm-emerald/20' },
    { value: 'medium', label: '중간', color: 'text-amber-400 border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20' },
    { value: 'high', label: '높음', color: 'text-red-400 border-red-500/30 bg-red-500/10 hover:bg-red-500/20' },
  ]

  return (
    <form onSubmit={handleSubmit} className="w-full h-full p-6 space-y-6 flex flex-col bg-mm-surface text-mm-text">
      {/* Form Header */}
      <div className="flex items-center justify-between border-b border-mm-border-light pb-4">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <Plus className="w-5 h-5 text-mm-emerald" />
          {initialTask ? '작업 수정' : '새로운 작업'}
        </h2>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg transition-all duration-300 hover:bg-mm-surface-light text-mm-text-secondary hover:text-mm-text"
            title="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Form Content */}
      <div className="flex-1 overflow-y-auto space-y-6 pr-2">
        {/* Title */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-mm-text-secondary">제목 *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="작업의 제목을 입력하세요..."
            className="w-full px-4 py-3 rounded-lg border border-mm-border-light bg-mm-surface text-mm-text placeholder-mm-text-tertiary focus:outline-none focus:border-mm-emerald focus:ring-2 focus:ring-mm-emerald/30 transition-all duration-300"
            maxLength={100}
          />
          <div className="text-xs text-mm-text-tertiary text-right">{title.length}/100</div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-mm-text-secondary">설명</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="작업에 대한 자세한 설명을 입력하세요..."
            className="w-full px-4 py-3 rounded-lg border border-mm-border-light bg-mm-surface text-mm-text placeholder-mm-text-tertiary focus:outline-none focus:border-mm-emerald focus:ring-2 focus:ring-mm-emerald/30 transition-all duration-300 h-28 resize-none"
            maxLength={500}
          />
          <div className="text-xs text-mm-text-tertiary text-right">{description.length}/500</div>
        </div>

        {/* Date */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-mm-text-secondary">날짜 *</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-mm-border-light bg-mm-surface text-mm-text placeholder-mm-text-tertiary focus:outline-none focus:border-mm-emerald focus:ring-2 focus:ring-mm-emerald/30 transition-all duration-300"
          />
        </div>

        {/* Priority */}
        <div className="space-y-3">
          <label className="block text-sm font-bold text-mm-text-secondary">우선순위</label>
          <div className="grid grid-cols-3 gap-2">
            {priorityOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setPriority(option.value as 'low' | 'medium' | 'high')}
                className={`py-2 px-3 rounded-lg border-2 transition-all duration-300 font-medium text-sm ${
                  priority === option.value
                    ? `${option.color} border-current shadow-glow-md scale-105`
                    : `${option.color} border-transparent hover:shadow-md`
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="border-t border-mm-border-light pt-4">
        <button
          type="submit"
          disabled={!title.trim() || isSubmitting}
          className="w-full py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed btn-premium shadow-lg hover:shadow-glow-md"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent"></div>
              처리 중...
            </>
          ) : (
            <>
              <Plus className="w-5 h-5" />
              {initialTask ? '작업 수정' : '작업 추가'}
            </>
          )}
        </button>
      </div>
    </form>
  )
}

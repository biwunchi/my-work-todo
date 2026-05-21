'use client'

import { X } from 'lucide-react'
import { TaskForm } from './TaskForm'
import { Task } from '@/lib/supabase'

type SidebarProps = {
  onAddTask: (title: string, description: string | null, date: Date, priority: 'low' | 'medium' | 'high') => void
  onUpdateTask: (id: string, title: string, description: string | null, date: Date, priority: 'low' | 'medium' | 'high') => void
  defaultDate?: Date
  editingTask?: Task | null
  onCloseEdit?: () => void
}

export function Sidebar({
  onAddTask,
  onUpdateTask,
  defaultDate,
  editingTask,
  onCloseEdit,
}: SidebarProps) {
  return (
    <div className="w-96 h-screen flex flex-col border-l border-mm-border-light bg-gradient-to-b from-mm-surface via-mm-surface-alt to-mm-surface shadow-premium animate-slideInUp">
      {/* Sidebar Header */}
      <div className="sticky top-0 px-6 py-4 flex items-center justify-between border-b border-mm-border-light bg-mm-surface-light backdrop-filter backdrop-blur-sm">
        <h2 className="text-lg font-bold text-mm-text">
          {editingTask ? '✏️ 작업 수정' : '➕ 새로운 작업'}
        </h2>
        {editingTask && onCloseEdit && (
          <button
            onClick={onCloseEdit}
            className="p-1.5 rounded-lg transition-all duration-300 hover:bg-mm-surface text-mm-text-secondary hover:text-mm-text"
            title="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Sidebar Content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {editingTask ? (
          <TaskForm
            initialTask={editingTask}
            onUpdate={(id, title, description, date, priority) => {
              onUpdateTask(id, title, description, date, priority)
              onCloseEdit?.()
            }}
          />
        ) : (
          <TaskForm onAdd={onAddTask} defaultDate={defaultDate} />
        )}
      </div>

      {/* Sidebar Footer - Decoration */}
      <div className="px-6 py-4 border-t border-mm-border-light bg-mm-surface-light/50 text-center text-xs text-mm-text-tertiary">
        <p>✨ 작업 관리를 더 스마트하게</p>
      </div>
    </div>
  )
}

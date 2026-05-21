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
    <div className="w-96 overflow-y-auto flex flex-col" style={{ borderLeft: '1px solid #334155', backgroundColor: '#1e293b', color: '#f8fafc' }}>
      {editingTask ? (
        <>
          <div className="sticky top-0 p-4 flex items-center justify-between" style={{ backgroundColor: '#1e293b', borderBottom: '1px solid #334155' }}>
            <h2 className="text-lg font-semibold">Edit Task</h2>
            {onCloseEdit && (
              <button
                onClick={onCloseEdit}
                className="p-1 rounded transition"
                style={{ backgroundColor: 'transparent', color: '#f8fafc' }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#334155')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
          <TaskForm
            initialTask={editingTask}
            onUpdate={(id, title, description, date, priority) => {
              onUpdateTask(id, title, description, date, priority)
              onCloseEdit?.()
            }}
          />
        </>
      ) : (
        <>
          <div className="sticky top-0 p-4" style={{ backgroundColor: '#1e293b', borderBottom: '1px solid #334155' }}>
            <h2 className="text-lg font-semibold">Create Task</h2>
          </div>
          <TaskForm onAdd={onAddTask} defaultDate={defaultDate} />
        </>
      )}
    </div>
  )
}

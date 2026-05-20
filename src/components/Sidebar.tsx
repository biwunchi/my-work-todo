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
    <div className="w-96 border-l dark:border-gray-700 dark:bg-gray-800 bg-white overflow-y-auto flex flex-col">
      {editingTask ? (
        <>
          <div className="sticky top-0 bg-white dark:bg-gray-800 p-4 border-b dark:border-gray-700 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Edit Task</h2>
            {onCloseEdit && (
              <button
                onClick={onCloseEdit}
                className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
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
          <div className="sticky top-0 bg-white dark:bg-gray-800 p-4 border-b dark:border-gray-700">
            <h2 className="text-lg font-semibold">Create Task</h2>
          </div>
          <TaskForm onAdd={onAddTask} defaultDate={defaultDate} />
        </>
      )}
    </div>
  )
}

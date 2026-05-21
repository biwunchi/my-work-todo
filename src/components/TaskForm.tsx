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
  const [date, setDate] = useState(initialTask?.date || formatDateForSupabase(defaultDate || new Date()))
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>(initialTask?.priority || 'medium')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    const dateObj = new Date(date + 'T00:00:00')
    
    if (initialTask && onUpdate) {
      onUpdate(initialTask.id, title, description || null, dateObj, priority)
    } else if (onAdd) {
      onAdd(title, description || null, dateObj, priority)
    }

    if (!initialTask) {
      setTitle('')
      setDescription('')
      setDate(formatDateForSupabase(new Date()))
      setPriority('medium')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full p-4 space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">
          {initialTask ? 'Edit Task' : 'Add Task'}
        </h2>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="p-1 hover:bg-mm-surface-light rounded"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title..."
          className="w-full px-3 py-2 border rounded-lg bg-mm-dark border-mm-border text-mm-text placeholder-mm-text-secondary focus:outline-none focus:ring-2 focus:ring-mm-emerald"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add notes or details..."
          className="w-full px-3 py-2 border rounded-lg bg-mm-dark border-mm-border text-mm-text placeholder-mm-text-secondary resize-none h-24 focus:outline-none focus:ring-2 focus:ring-mm-emerald"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg bg-mm-dark border-mm-border text-mm-text focus:outline-none focus:ring-2 focus:ring-mm-emerald"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
            className="w-full px-3 py-2 border rounded-lg bg-mm-dark border-mm-border text-mm-text focus:outline-none focus:ring-2 focus:ring-mm-emerald"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={!title.trim()}
        className="w-full py-2 px-4 bg-mm-emerald text-mm-dark rounded-lg hover:bg-mm-emerald-light disabled:bg-mm-surface disabled:text-mm-text-secondary transition font-medium flex items-center justify-center gap-2"
      >
        <Plus className="w-4 h-4" />
        {initialTask ? 'Update Task' : 'Add Task'}
      </button>
    </form>
  )
}

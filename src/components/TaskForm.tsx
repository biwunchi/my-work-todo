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
    <form onSubmit={handleSubmit} className="w-full p-4 space-y-4" style={{ color: '#f8fafc' }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">
          {initialTask ? 'Edit Task' : 'Add Task'}
        </h2>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded transition"
            style={{ backgroundColor: 'transparent', color: '#f8fafc' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#334155')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
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
          style={{
            backgroundColor: '#0f172a',
            borderColor: '#334155',
            color: '#f8fafc',
          }}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
          onFocus={(e) => (e.currentTarget.style.borderColor = '#00b894')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#334155')}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add notes or details..."
          style={{
            backgroundColor: '#0f172a',
            borderColor: '#334155',
            color: '#f8fafc',
          }}
          className="w-full px-3 py-2 border rounded-lg resize-none h-24 focus:outline-none focus:ring-2"
          onFocus={(e) => (e.currentTarget.style.borderColor = '#00b894')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#334155')}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={{
              backgroundColor: '#0f172a',
              borderColor: '#334155',
              color: '#f8fafc',
            }}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
            onFocus={(e) => (e.currentTarget.style.borderColor = '#00b894')}
            onBlur={(e) => (e.currentTarget.style.borderColor = '#334155')}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
            style={{
              backgroundColor: '#0f172a',
              borderColor: '#334155',
              color: '#f8fafc',
            }}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
            onFocus={(e) => (e.currentTarget.style.borderColor = '#00b894')}
            onBlur={(e) => (e.currentTarget.style.borderColor = '#334155')}
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
        style={{
          backgroundColor: title.trim() ? '#00b894' : '#334155',
          color: '#000',
          opacity: title.trim() ? 1 : 0.5,
        }}
        className="w-full py-2 rounded-lg font-medium transition flex items-center justify-center gap-2"
        onMouseEnter={(e) => {
          if (title.trim()) {
            e.currentTarget.style.backgroundColor = '#1dd1a1'
          }
        }}
        onMouseLeave={(e) => {
          if (title.trim()) {
            e.currentTarget.style.backgroundColor = '#00b894'
          }
        }}
      >
        <Plus className="w-5 h-5" />
        {initialTask ? 'Update Task' : 'Add Task'}
      </button>
    </form>
  )
}

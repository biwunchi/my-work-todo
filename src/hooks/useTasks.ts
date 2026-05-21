'use client'

import { useState, useEffect } from 'react'
import { supabase, Task } from '@/lib/supabase'
import { formatDateForSupabase } from '@/lib/dateUtils'

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      setLoading(true)
      setError(null)
      const { data, error: fetchError } = await supabase
        .from('tasks')
        .select('*')
        .order('due_date', { ascending: true })

      if (fetchError) throw fetchError
      setTasks(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch tasks')
      console.error('Fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  const addTask = async (title: string, description: string | null, date: Date, priority: 'low' | 'medium' | 'high') => {
    try {
      const dateStr = formatDateForSupabase(date)
      const { data, error: insertError } = await supabase
        .from('tasks')
        .insert(([
          {
            title,
            description,
            due_date: dateStr,
            priority,
            completed: false,
          },
        ]))
        .select()

      if (insertError) throw insertError
      if (data) {
        setTasks([...tasks, data[0]])
      }
      return data?.[0]
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add task')
      console.error('Add error:', err)
    }
  }

  const updateTask = async (id: string, updates: Partial<Task>) => {
    try {
      const { error: updateError } = await supabase
        .from('tasks')
        .update(updates)
        .eq('id', id)

      if (updateError) throw updateError
      setTasks(tasks.map((t) => (t.id === id ? { ...t, ...updates } : t)))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update task')
      console.error('Update error:', err)
    }
  }

  const deleteTask = async (id: string) => {
    try {
      const { error: deleteError } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id)

      if (deleteError) throw deleteError
      setTasks(tasks.filter((t) => t.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete task')
      console.error('Delete error:', err)
    }
  }

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    addTask,
    updateTask,
    deleteTask,
  }
}

export const useTasksForDate = (date: Date | null) => {
  const { tasks } = useTasks()
  const [tasksForDate, setTasksForDate] = useState<Task[]>([])

  useEffect(() => {
    if (date) {
      const dateStr = formatDateForSupabase(date)
      const filtered = tasks.filter((t) => t.due_date === dateStr)
      setTasksForDate(filtered)
    } else {
      setTasksForDate([])
    }
  }, [date, tasks])

  return tasksForDate
}

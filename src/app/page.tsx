'use client'

import { useEffect, useState } from 'react'
import { addMonths, subMonths, addDays, subDays, addWeeks, subWeeks } from 'date-fns'
import { useTasks } from '@/hooks/useTasks'
import { CalendarView } from '@/components/CalendarView'
import { WeeklyView } from '@/components/WeeklyView'
import { DailyView } from '@/components/DailyView'
import { Sidebar } from '@/components/Sidebar'
import { ViewSelector } from '@/components/ViewSelector'
import { ThemeToggle } from '@/components/ThemeToggle'
import { Task } from '@/lib/supabase'
import { Sparkles } from 'lucide-react'

type View = 'calendar' | 'weekly' | 'daily'

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [currentView, setCurrentView] = useState<View>('calendar')
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  const { tasks, loading, addTask, updateTask, deleteTask } = useTasks()

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
    }
  }, [])

  const handleAddTask = async (title: string, description: string | null, date: Date, priority: 'low' | 'medium' | 'high') => {
    await addTask(title, description, date, priority)
  }

  const handleUpdateTask = async (id: string, title: string, description: string | null, date: Date, priority: 'low' | 'medium' | 'high') => {
    const updatedTask = tasks.find(t => t.id === id)
    if (updatedTask) {
      await updateTask(id, {
        ...updatedTask,
        title,
        description,
        due_date: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`,
        priority,
      })
    }
  }

  const handleDeleteTask = async (id: string) => {
    await deleteTask(id)
  }

  if (!mounted) return null

  return (
    <main className="w-screen h-screen bg-gradient-to-br from-mm-dark via-mm-dark-secondary to-mm-navy text-mm-text flex overflow-hidden">
      {/* Main Content */}
      <div className="flex-1 flex flex-col p-8 md:p-12 overflow-hidden">
        {/* Header Section */}
        <div className="mb-10 animate-fadeIn">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-mm-emerald to-mm-emerald-light shadow-glow-md">
                <Sparkles className="w-6 h-6 text-black" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-mm-text to-mm-text-secondary bg-clip-text text-transparent">
                  My Work To Do
                </h1>
                <p className="text-mm-text-tertiary text-sm mt-1">업무 관리를 더 스마트하게</p>
              </div>
            </div>
            <ThemeToggle />
          </div>

          {/* View Selector */}
          <ViewSelector currentView={currentView} onViewChange={setCurrentView} />
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-mm-surface-light border-t-mm-emerald mx-auto mb-6 shadow-glow"></div>
                <p className="text-mm-text-secondary text-lg">작업 로딩 중...</p>
              </div>
            </div>
          ) : currentView === 'calendar' ? (
            <CalendarView
              currentDate={currentDate}
              onDateSelect={setSelectedDate}
              onPrevMonth={() => setCurrentDate(subMonths(currentDate, 1))}
              onNextMonth={() => setCurrentDate(addMonths(currentDate, 1))}
              tasks={tasks}
            />
          ) : currentView === 'weekly' ? (
            <WeeklyView
              currentDate={currentDate}
              onDateSelect={setSelectedDate}
              onPrevWeek={() => setCurrentDate(subWeeks(currentDate, 1))}
              onNextWeek={() => setCurrentDate(addWeeks(currentDate, 1))}
              tasks={tasks}
            />
          ) : (
            <DailyView
              selectedDate={selectedDate}
              onPrevDay={() => selectedDate && setSelectedDate(subDays(selectedDate, 1))}
              onNextDay={() => selectedDate && setSelectedDate(addDays(selectedDate, 1))}
              tasks={tasks}
              onDeleteTask={handleDeleteTask}
              onEditTask={setEditingTask}
            />
          )}
        </div>
      </div>

      {/* Sidebar */}
      <Sidebar
        onAddTask={handleAddTask}
        onUpdateTask={handleUpdateTask}
        defaultDate={selectedDate || currentDate}
        editingTask={editingTask}
        onCloseEdit={() => setEditingTask(null)}
      />
    </main>
  )
}

'use client'

import { Calendar, CalendarDays, Calendar as CalendarIcon } from 'lucide-react'

type ViewSelectorProps = {
  currentView: 'calendar' | 'weekly' | 'daily'
  onViewChange: (view: 'calendar' | 'weekly' | 'daily') => void
}

export function ViewSelector({ currentView, onViewChange }: ViewSelectorProps) {
  const views = [
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'weekly', label: 'Weekly', icon: CalendarDays },
    { id: 'daily', label: 'Daily', icon: CalendarIcon },
  ] as const

  return (
    <div className="flex gap-2 mb-6">
      {views.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onViewChange(id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition font-medium ${
            currentView === id
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          <Icon className="w-4 h-4" />
          {label}
        </button>
      ))}
    </div>
  )
}

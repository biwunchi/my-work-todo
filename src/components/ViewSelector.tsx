'use client'

import { Calendar, CalendarDays, CalendarClock } from 'lucide-react'

type ViewSelectorProps = {
  currentView: 'calendar' | 'weekly' | 'daily'
  onViewChange: (view: 'calendar' | 'weekly' | 'daily') => void
}

export function ViewSelector({ currentView, onViewChange }: ViewSelectorProps) {
  const views = [
    { id: 'calendar' as const, label: '월간', icon: Calendar, description: '전체 월간 보기' },
    { id: 'weekly' as const, label: '주간', icon: CalendarDays, description: '주간 일정' },
    { id: 'daily' as const, label: '일일', icon: CalendarClock, description: '일일 상세' },
  ]

  return (
    <div className="flex gap-3 mb-8 animate-slideInUp">
      {views.map(({ id, label, icon: Icon, description }) => {
        const isActive = currentView === id
        return (
          <button
            key={id}
            onClick={() => onViewChange(id)}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all duration-300 group relative overflow-hidden ${
              isActive
                ? 'bg-gradient-to-r from-mm-emerald to-mm-emerald-light text-black shadow-glow-md scale-105'
                : 'bg-mm-surface-light text-mm-text hover:bg-mm-surface-lighter hover:shadow-lg hover:scale-105'
            }`}
            title={description}
          >
            {/* Background Animation */}
            {!isActive && (
              <div className="absolute inset-0 bg-gradient-to-r from-mm-emerald/10 to-mm-emerald-light/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            )}

            {/* Icon and Text */}
            <span className="relative flex items-center gap-2">
              <Icon className="w-4 h-4" />
              <span className="text-sm">{label}</span>
            </span>
          </button>
        )
      })}
    </div>
  )
}

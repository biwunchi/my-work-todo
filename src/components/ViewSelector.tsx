'use client'

import { Calendar, Calendar as WeekIcon, Calendar as DayIcon } from 'lucide-react'

type ViewSelectorProps = {
  currentView: 'calendar' | 'weekly' | 'daily'
  onViewChange: (view: 'calendar' | 'weekly' | 'daily') => void
}

export function ViewSelector({ currentView, onViewChange }: ViewSelectorProps) {
  const views = [
    { id: 'calendar' as const, label: 'Calendar', icon: Calendar },
    { id: 'weekly' as const, label: 'Weekly', icon: WeekIcon },
    { id: 'daily' as const, label: 'Daily', icon: DayIcon },
  ]

  return (
    <div className="flex gap-2 mb-6">
      {views.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onViewChange(id)}
          style={{
            backgroundColor: currentView === id ? '#00b894' : '#1e293b',
            color: currentView === id ? '#000' : '#f8fafc',
            border: 'none',
            borderRadius: '6px',
            padding: '8px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            fontWeight: 'medium',
            fontSize: '14px',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            if (currentView !== id) {
              e.currentTarget.style.backgroundColor = '#334155'
            }
          }}
          onMouseLeave={(e) => {
            if (currentView !== id) {
              e.currentTarget.style.backgroundColor = '#1e293b'
            }
          }}
        >
          <Icon className="w-4 h-4" />
          {label}
        </button>
      ))}
    </div>
  )
}

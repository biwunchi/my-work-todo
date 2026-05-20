import { startOfMonth, endOfMonth, eachDayOfInterval, startOfWeek, endOfWeek, isSameDay, isToday } from 'date-fns'

export const getDaysInMonth = (date: Date): Date[] => {
  const start = startOfMonth(date)
  const end = endOfMonth(date)
  const monthStart = startOfWeek(start, { weekStartsOn: 0 })
  const monthEnd = endOfWeek(end, { weekStartsOn: 0 })
  
  return eachDayOfInterval({ start: monthStart, end: monthEnd })
}

export const getWeekDays = (date: Date): Date[] => {
  const start = startOfWeek(date, { weekStartsOn: 1 })
  const end = endOfWeek(date, { weekStartsOn: 1 })
  
  return eachDayOfInterval({ start, end })
}

export const formatDateForSupabase = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export const parseDate = (dateString: string): Date => {
  return new Date(dateString + 'T00:00:00')
}

export const isSameDateString = (dateStr1: string, dateStr2: string): boolean => {
  return dateStr1 === dateStr2
}

export const getDateString = (date: Date): string => {
  return formatDateForSupabase(date)
}

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://txcwaldcmmrxmhpmuurq.supabase.co/'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4Y3dhbGRjbW1yeG1ocG11dXJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkyNTcxODgsImV4cCI6MjA5NDgzMzE4OH0.czJ2icMSrhadLxBgYoabCWpy_KPuObMR3qWm5h-rmG4'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Task = {
  id: string
  title: string
  description: string | null
  date: string
  priority: 'low' | 'medium' | 'high'
  completed: boolean
  created_at: string
  updated_at: string
}

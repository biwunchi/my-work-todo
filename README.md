# My Work To Do

A modern task management application built with Next.js, TypeScript, and Supabase. Organize your daily work with calendar, weekly, and daily views.

## Features

- 📅 **Calendar View**: Overview of all tasks in a month with hover preview
- 📊 **Weekly View**: Mon-Sun grid layout showing task counts for each day
- 📝 **Daily View**: Detailed view of all tasks for the selected day
- ✅ **Task Management**: Add, edit, and delete tasks with priorities
- 🎨 **Dark Mode**: Built-in support for light and dark themes
- 📱 **Responsive Design**: Works on desktop and tablet devices
- 🔐 **Supabase Integration**: Real-time data synchronization

## Tech Stack

- **Framework**: Next.js 16 with TypeScript
- **Database**: Supabase
- **Styling**: Tailwind CSS
- **Date Handling**: date-fns
- **Icons**: Lucide React
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Supabase account and project credentials

### Installation

1. Clone the repository:
```bash
git clone https://github.com/biwunchi/my-work-todo.git
cd my-work-todo
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file with your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### Running the App

Development mode:
```bash
npm run dev
```

Production build:
```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/              # Next.js app directory
├── components/       # Reusable React components
├── hooks/           # Custom React hooks
├── lib/             # Utility functions and Supabase client
└── styles/          # Global styles
```

## Database Schema

### Tasks Table

```sql
CREATE TABLE tasks (
  id UUID PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  priority VARCHAR(10) NOT NULL DEFAULT 'medium',
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Features Breakdown

### Calendar View
- Navigate through months
- Hover to preview tasks
- Click to switch to daily view
- Color-coded priorities

### Weekly View
- Shows Mon-Sun grid
- Large task count display
- Task preview list
- Easy navigation between weeks

### Daily View
- Detailed task display
- Edit and delete buttons
- Full descriptions visible
- Day navigation controls

### Task Form (Sidebar)
- Quick task creation
- Edit existing tasks
- Set priority (Low/Medium/High)
- Assign dates
- Add detailed descriptions

## Theme Support

The app automatically detects your system preference and respects saved theme choices. Click the sun/moon icon in the header to toggle between light and dark modes.

## Deployment

This project is ready to deploy to Vercel:

1. Push to GitHub
2. Connect your GitHub repo to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy!

```bash
vercel
```

## License

MIT

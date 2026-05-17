import { useState } from 'react';
import { Moon, Sun, Plus, LogOut, User } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';
import HabitModal from '../features/habits/HabitForm';

export default function Header() {
  const { theme, toggle } = useTheme();
  const { user, logout } = useAuth();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white dark:text-slate-900">
            Habit Tracker
          </h1>
          <p className="text-sm text-slate-400 dark:text-slate-500">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* User info */}
          {user && (
            <div className="hidden sm:flex items-center gap-2 text-sm text-slate-400 dark:text-slate-500">
              <User size={16} />
              <span>{user.name}</span>
            </div>
          )}

          {/* Theme toggle */}
          <button
            onClick={toggle}
            className="rounded-lg bg-slate-800 dark:bg-white p-2 text-slate-300 dark:text-slate-600 hover:text-white dark:hover:text-slate-900 transition-colors"
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* New habit button */}
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-600 transition-colors active:scale-[0.98]"
          >
            <Plus size={18} />
            <span className="hidden sm:inline">New Habit</span>
          </button>

          {/* Logout button */}
          <button
            onClick={logout}
            className="rounded-lg bg-slate-800 dark:bg-white p-2 text-slate-400 hover:text-red-400 transition-colors"
            title="Logout"
          >
            <LogOut size={20} />
          </button>
        </div>
      </header>

      {showModal && (
        <HabitModal onClose={() => setShowModal(false)} />
      )}
    </>
  );
}
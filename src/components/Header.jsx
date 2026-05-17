import { useState } from 'react';
import { Moon, Sun, Plus, LogOut } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import HabitModal from './HabitModal';

export default function Header() {
  const { theme, toggle } = useTheme();
  const [showModal, setShowModal] = useState(false);

  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <>
      <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white dark:text-slate-900">Habit Tracker</h1>
          <p className="text-sm text-slate-400 dark:text-slate-500">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            className="rounded-lg bg-surface p-2 text-slate-300 hover:text-white dark:bg-white dark:text-slate-600 transition-colors"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-600"
          >
            <Plus size={18} /> New Habit
          </button>
          <button
            onClick={logout}
            className="rounded-lg bg-surface p-2 text-slate-400 hover:text-red-400 dark:bg-white transition-colors"
          >
            <LogOut size={20} />
          </button>
        </div>
      </header>
      {showModal && <HabitModal onClose={() => setShowModal(false)} />}
    </>
  );
}
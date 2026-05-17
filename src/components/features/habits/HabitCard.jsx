import { useState } from 'react';
import { useHabits } from '../../../hooks/useHabits';
import { calculateStreak, getTodayKey, isHabitScheduled } from '../../../lib/utils';
import { CATEGORIES } from '../../../constants';
import { Check, Pencil, Trash2, Flame } from 'lucide-react';
import HabitForm from './HabitForm';

export default function HabitCard({ habit }) {
  const { completions, toggleHabit, deleteHabit } = useHabits();
  const [edit, setEdit] = useState(false);
  
  const today = getTodayKey();
  const isActive = isHabitScheduled(habit, today);
  const isDone = (completions[today] || []).includes(habit._id);
  
  const completedDates = Object.keys(completions).filter((d) => 
    completions[d].includes(habit._id)
  );
  const streak = calculateStreak(habit, completedDates);
  const category = CATEGORIES[habit.category] || CATEGORIES.health;

  if (!isActive) return null;

  return (
    <>
      <div className={`group flex items-center gap-4 rounded-xl bg-slate-800 p-4 shadow-lg transition-all duration-200 hover:translate-x-1 hover:shadow-xl ${isDone ? 'opacity-60' : ''}`}>
        {/* Checkbox */}
        <button
          onClick={() => toggleHabit(habit._id)}
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border-2 transition-all duration-200 ${isDone ? 'border-emerald-500 bg-emerald-500' : 'border-slate-600 hover:border-emerald-500 hover:bg-emerald-500/10'}`}
        >
          {isDone && <Check size={14} className="text-white" strokeWidth={3} />}
        </button>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className={`truncate font-semibold ${isDone ? 'text-slate-500 line-through' : 'text-white'}`}>
            <span className="mr-2">{category.icon}</span>
            {habit.name}
          </div>
          <div className="mt-1 flex items-center gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 font-medium text-amber-500">
              <Flame size={12} /> {streak} day{streak !== 1 ? 's' : ''}
            </span>
            <span className="capitalize">{habit.frequency}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <button 
            onClick={() => setEdit(true)} 
            className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-700 hover:text-white"
          >
            <Pencil size={16} />
          </button>
          <button 
            onClick={() => deleteHabit(habit._id)} 
            className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-red-500/10 hover:text-red-400"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      {edit && <HabitForm habit={habit} onClose={() => setEdit(false)} />}
    </>
  );
}
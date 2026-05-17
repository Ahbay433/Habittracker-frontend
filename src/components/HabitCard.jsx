import { useState } from 'react';
import { useHabits } from '../contexts/HabitContext';
import { calculateStreak, getTodayKey, isHabitScheduled } from '../utils/helpers';
import { Check, Pencil, Trash2, Flame } from 'lucide-react';
import HabitModal from './HabitModal';

const icons = { health: '🏃', learning: '📚', productivity: '⚡', mindfulness: '🧘' };

export default function HabitCard({ habit }) {
  const { completions, toggleHabit, deleteHabit } = useHabits();
  const [edit, setEdit] = useState(false);
  const today = getTodayKey();
  const isActive = isHabitScheduled(habit, today);
  const isDone = (completions[today] || []).includes(habit._id);
  const streak = calculateStreak(habit, Object.keys(completions).filter((d) => completions[d].includes(habit._id)));

  if (!isActive) return null;

  return (
    <>
      <div className={`flex items-center gap-4 rounded-xl bg-slate-800 p-4 shadow-lg transition-all hover:translate-x-1 ${isDone ? 'opacity-60' : ''}`}>
        <button
          onClick={() => toggleHabit(habit._id)}
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 transition-colors ${isDone ? 'border-emerald-500 bg-emerald-500' : 'border-slate-600 hover:border-emerald-500'}`}
        >
          {isDone && <Check size={14} className="text-white" />}
        </button>

        <div className="flex-1">
          <div className={`font-semibold ${isDone ? 'text-slate-500 line-through' : 'text-white'}`}>
            {icons[habit.category] || '✨'} {habit.name}
          </div>
          <div className="mt-1 flex items-center gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 font-medium text-amber-500">
              <Flame size={12} /> {streak} day{streak !== 1 ? 's' : ''}
            </span>
            <span className="capitalize">{habit.frequency}</span>
          </div>
        </div>

        <div className="flex gap-1">
          <button onClick={() => setEdit(true)} className="rounded-md p-1.5 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors">
            <Pencil size={16} />
          </button>
          <button onClick={() => deleteHabit(habit._id)} className="rounded-md p-1.5 text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors">
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      {edit && <HabitModal habit={habit} onClose={() => setEdit(false)} />}
    </>
  );
}
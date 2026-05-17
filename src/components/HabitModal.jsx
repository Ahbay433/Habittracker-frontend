import { useState } from 'react';
import { useHabits } from '../contexts/HabitContext';
import { X } from 'lucide-react';

export default function HabitModal({ onClose, habit = null }) {
  const { addHabit, updateHabit } = useHabits();
  const [name, setName] = useState(habit?.name || '');
  const [category, setCategory] = useState(habit?.category || 'health');
  const [frequency, setFrequency] = useState(habit?.frequency || 'daily');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    const payload = { name: name.trim(), category, frequency };
    if (habit) await updateHabit(habit._id, payload);
    else await addHabit(payload);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-md mx-4 rounded-xl bg-slate-800 p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">{habit ? 'Edit' : 'New'} Habit</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors"><X size={20} /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-400">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-emerald-500"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-400">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-emerald-500"
            >
              <option value="health">Health</option>
              <option value="learning">Learning</option>
              <option value="productivity">Productivity</option>
              <option value="mindfulness">Mindfulness</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-400">Frequency</label>
            <select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              className="w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-emerald-500"
            >
              <option value="daily">Daily</option>
              <option value="weekdays">Weekdays</option>
              <option value="weekends">Weekends</option>
            </select>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="rounded-lg px-4 py-2 text-sm font-medium text-slate-300 hover:bg-slate-700 transition-colors">Cancel</button>
            <button type="submit" className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-600 transition-colors">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}
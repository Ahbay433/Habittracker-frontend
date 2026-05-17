import { useState } from 'react';
import { useHabits } from '../../../hooks/useHabits';
import { CATEGORIES, FREQUENCIES } from '../../../constants';
import Modal from '../../ui/Modal';
import Button from '../../ui/Button';

export default function HabitForm({ onClose, habit = null }) {
  const { addHabit, updateHabit } = useHabits();
  const [name, setName] = useState(habit?.name || '');
  const [category, setCategory] = useState(habit?.category || 'health');
  const [frequency, setFrequency] = useState(habit?.frequency || 'daily');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    setLoading(true);
    try {
      const payload = { name: name.trim(), category, frequency };
      if (habit) await updateHabit(habit._id, payload);
      else await addHabit(payload);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose} title={habit ? 'Edit Habit' : 'New Habit'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-300">Habit Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Read 30 minutes"
            maxLength={50}
            className="w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2.5 text-sm text-white outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            required
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-300">Category</label>
          <div className="grid grid-cols-3 gap-2">
            {Object.entries(CATEGORIES).map(([key, { label, icon }]) => (
              <button
                key={key}
                type="button"
                onClick={() => setCategory(key)}
                className={`flex flex-col items-center gap-1 rounded-lg border p-2 text-xs transition-all ${category === key ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400' : 'border-slate-700 text-slate-400 hover:border-slate-500'}`}
              >
                <span className="text-lg">{icon}</span>
                <span className="truncate">{label}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-300">Frequency</label>
          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            className="w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2.5 text-sm text-white outline-none focus:border-emerald-500"
          >
            {FREQUENCIES.map((f) => (
              <option key={f.value} value={f.value}>{f.label}</option>
            ))}
          </select>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading || !name.trim()}>
            {loading ? 'Saving...' : 'Save Habit'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
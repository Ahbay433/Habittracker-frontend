import { useHabits } from '../contexts/HabitContext';
import HabitCard from './HabitCard';
import EmptyState from './EmptyState';

export default function HabitList() {
  const { habits, loading } = useHabits();

  if (loading) return <div className="py-12 text-center text-slate-500">Loading habits...</div>;
  if (!habits.length) return <EmptyState />;

  return (
    <div className="space-y-3">
      {habits.map((habit) => (
        <HabitCard key={habit._id} habit={habit} />
      ))}
    </div>
  );
}
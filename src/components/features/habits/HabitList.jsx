import { useHabits } from '../../../hooks/useHabits';
import HabitCard from './HabitCard';
import EmptyState from './EmptyState';

export default function HabitList() {
  const { habits, loading } = useHabits();

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-20 animate-pulse rounded-xl bg-slate-800" />
        ))}
      </div>
    );
  }

  if (!habits.length) return <EmptyState />;

  return (
    <div className="space-y-3">
      {habits.map((habit) => (
        <HabitCard key={habit._id} habit={habit} />
      ))}
    </div>
  );
}
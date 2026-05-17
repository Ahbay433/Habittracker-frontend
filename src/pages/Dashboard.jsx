import StatsGrid from '../components/StatsGrid';
import HabitList from '../components/HabitList';
import Heatmap from '../components/Heatmap';

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <StatsGrid />
      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div>
          <h2 className="mb-4 text-lg font-semibold">Today's Habits</h2>
          <HabitList />
        </div>
        <div className="space-y-6">
          <Heatmap />
        </div>
      </div>
    </div>
  );
}
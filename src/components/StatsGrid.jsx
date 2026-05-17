import { useHabits } from '../contexts/HabitContext';
import { getTodayKey, isHabitScheduled, getRelativeDate } from '../utils/helpers';
import ProgressRing from './ProgressRing';
import BarChart from './BarChart';

export default function StatsGrid() {
  const { habits, completions } = useHabits();
  const today = getTodayKey();
  const activeToday = habits.filter((h) => isHabitScheduled(h, today));
  const doneToday = (completions[today] || []).length;
  const todayRate = activeToday.length ? Math.round((doneToday / activeToday.length) * 100) : 0;

  let bestStreak = 0;
  habits.forEach((h) => {
    const keys = Object.keys(completions).filter((d) => completions[d].includes(h._id));
    let s = 0;
    for (let i = 0; i < 365; i++) {
      const d = getRelativeDate(i);
      if (!isHabitScheduled(h, d)) continue;
      if (keys.includes(d)) s++;
      else if (i === 0) continue;
      else break;
    }
    if (s > bestStreak) bestStreak = s;
  });

  let totalRate = 0, count = 0;
  for (let i = 0; i < 7; i++) {
    const d = getRelativeDate(i);
    const act = habits.filter((h) => isHabitScheduled(h, d));
    const done = (completions[d] || []).length;
    if (act.length) { totalRate += (done / act.length) * 100; count++; }
  }
  const weeklyAvg = count ? Math.round(totalRate / count) : 0;

  return (
    <div className="mb-8 grid gap-4 sm:grid-cols-3">
      <div className="rounded-xl bg-slate-800 p-5 shadow-lg">
        <div className="text-3xl font-bold text-emerald-400">{todayRate}%</div>
        <div className="mt-1 text-sm text-slate-400">Today's Completion</div>
      </div>
      <div className="flex flex-col items-center justify-center rounded-xl bg-slate-800 p-5 shadow-lg">
        <ProgressRing percentage={todayRate} />
        <div className="mt-2 text-sm text-slate-400">Daily Progress</div>
      </div>
      <div className="rounded-xl bg-slate-800 p-5 shadow-lg">
        <div className="text-3xl font-bold text-emerald-400">{bestStreak}</div>
        <div className="mt-1 text-sm text-slate-400">Best Streak</div>
        <div className="mt-3 h-12">
          <BarChart completions={completions} habits={habits} />
        </div>
      </div>
    </div>
  );
}
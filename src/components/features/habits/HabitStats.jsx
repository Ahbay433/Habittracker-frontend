import { useHabits } from '../../../hooks/useHabits';
import { getTodayKey, isHabitScheduled, getRelativeDate } from '../../../lib/utils';
import { TrendingUp, Flame, Target } from 'lucide-react';

export default function HabitStats() {
  const { habits, completions } = useHabits();
  const today = getTodayKey();

  // Today's rate
  const activeToday = habits.filter((h) => isHabitScheduled(h, today));
  const doneToday = (completions[today] || []).length;
  const todayRate = activeToday.length ? Math.round((doneToday / activeToday.length) * 100) : 0;

  // Best streak
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

  // Weekly average
  let totalRate = 0, count = 0;
  for (let i = 0; i < 7; i++) {
    const d = getRelativeDate(i);
    const act = habits.filter((h) => isHabitScheduled(h, d));
    const done = (completions[d] || []).length;
    if (act.length) { totalRate += (done / act.length) * 100; count++; }
  }
  const weeklyAvg = count ? Math.round(totalRate / count) : 0;

  const stats = [
    { label: "Today's Rate", value: `${todayRate}%`, icon: Target, color: 'text-emerald-400' },
    { label: 'Best Streak', value: `${bestStreak}d`, icon: Flame, color: 'text-amber-400' },
    { label: 'Weekly Avg', value: `${weeklyAvg}%`, icon: TrendingUp, color: 'text-blue-400' },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {stats.map(({ label, value, icon: Icon, color }) => (
        <div key={label} className="rounded-xl bg-slate-800 p-5 shadow-lg transition-transform hover:-translate-y-0.5">
          <div className="flex items-center justify-between">
            <div>
              <div className={`text-3xl font-bold ${color}`}>{value}</div>
              <div className="mt-1 text-sm text-slate-400">{label}</div>
            </div>
            <Icon size={28} className="text-slate-700" />
          </div>
        </div>
      ))}
    </div>
  );
}
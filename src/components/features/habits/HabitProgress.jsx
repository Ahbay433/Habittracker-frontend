import { useHabits } from '../../../hooks/useHabits';
import { getTodayKey, isHabitScheduled, getRelativeDate } from '../../../lib/utils';

export default function HabitProgress() {
  const { habits, completions } = useHabits();
  const today = getTodayKey();
  const activeToday = habits.filter((h) => isHabitScheduled(h, today));
  const doneToday = (completions[today] || []).length;
  const percentage = activeToday.length ? Math.round((doneToday / activeToday.length) * 100) : 0;

  const size = 100;
  const stroke = 8;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center rounded-xl bg-slate-800 p-5 shadow-lg">
      <div className="relative">
        <svg width={size} height={size} className="-rotate-90">
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgb(51 65 85)" strokeWidth={stroke} />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgb(16 185 129)"
            strokeWidth={stroke}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold text-white">{percentage}%</span>
        </div>
      </div>
      <div className="mt-3 text-sm text-slate-400">Daily Progress</div>
      
      {/* Mini bar chart */}
      <div className="mt-3 flex h-10 w-full items-end gap-1">
        {[6, 5, 4, 3, 2, 1, 0].map((ago) => {
          const d = getRelativeDate(ago);
          const act = habits.filter((h) => isHabitScheduled(h, d));
          const done = (completions[d] || []).length;
          const pct = act.length ? (done / act.length) * 100 : 0;
          return (
            <div
              key={ago}
              title={`${d}: ${Math.round(pct)}%`}
              className="flex-1 rounded-t bg-emerald-500 transition-all hover:opacity-80"
              style={{ height: `${Math.max(pct, 5)}%`, opacity: 0.3 + (pct / 100) * 0.7 }}
            />
          );
        })}
      </div>
    </div>
  );
}
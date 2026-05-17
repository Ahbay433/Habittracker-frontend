import { useHabits } from '../../../hooks/useHabits';
import { isHabitScheduled } from '../../../lib/utils';
import { HEATMAP_COLORS } from '../../../constants';

export default function HabitHeatmap() {
  const { habits, completions } = useHabits();

  const cells = [];
  for (let w = 52; w >= 0; w--) {
    for (let d = 0; d < 7; d++) {
      const date = new Date();
      date.setDate(date.getDate() - (w * 7 + d));
      const key = date.toISOString().split('T')[0];
      
      const act = habits.filter((h) => isHabitScheduled(h, key));
      const done = (completions[key] || []).length;
      const pct = act.length ? done / act.length : 0;
      
      let level = 0;
      if (pct > 0) level = 1;
      if (pct > 0.25) level = 2;
      if (pct > 0.5) level = 3;
      if (pct > 0.75) level = 4;

      cells.push(
        <div
          key={`${w}-${d}`}
          title={`${key}: ${Math.round(pct * 100)}%`}
          className={`aspect-square rounded-sm ${HEATMAP_COLORS[level]} transition-transform hover:scale-150 hover:z-10`}
        />
      );
    }
  }

  return (
    <div className="rounded-xl bg-slate-800 p-5 shadow-lg">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-semibold text-white">Year in Review</h3>
        <span className="text-xs text-slate-500">Last 53 weeks</span>
      </div>
      <div className="grid grid-cols-[repeat(53,1fr)] gap-[3px] overflow-x-auto pb-2 scrollbar-hide">
        {cells}
      </div>
      <div className="mt-2 flex items-center justify-end gap-2 text-xs text-slate-500">
        <span>Less</span>
        <div className="flex gap-1">
          {HEATMAP_COLORS.map((c, i) => (
            <div key={i} className={`h-2.5 w-2.5 rounded-sm ${c}`} />
          ))}
        </div>
        <span>More</span>
      </div>
    </div>
  );
}
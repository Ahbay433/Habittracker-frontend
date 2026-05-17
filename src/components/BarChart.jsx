import { getRelativeDate, isHabitScheduled } from '../utils/helpers';

export default function BarChart({ completions, habits }) {
  return (
    <div className="flex h-full items-end gap-1">
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
            style={{ height: `${Math.max(pct, 4)}%`, opacity: 0.3 + (pct / 100) * 0.7 }}
          />
        );
      })}
    </div>
  );
}
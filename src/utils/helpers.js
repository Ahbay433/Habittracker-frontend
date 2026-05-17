export const getTodayKey = () => new Date().toISOString().split('T')[0];

export const getRelativeDate = (daysAgo) => {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().split('T')[0];
};

export const isHabitScheduled = (habit, dateStr) => {
  const day = new Date(dateStr).getDay();
  const isWeekend = day === 0 || day === 6;
  if (habit.frequency === 'weekdays' && isWeekend) return false;
  if (habit.frequency === 'weekends' && !isWeekend) return false;
  return true;
};

export const calculateStreak = (habit, completions) => {
  let streak = 0;
  for (let i = 0; i < 365; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().split('T')[0];
    if (!isHabitScheduled(habit, key)) continue;
    if (completions.includes(key)) streak++;
    else if (i === 0) continue;
    else break;
  }
  return streak;
};
// Category definitions with icons and colors
export const CATEGORIES = {
  health: { label: 'Health & Fitness', icon: '🏃', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  learning: { label: 'Learning', icon: '📚', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  productivity: { label: 'Productivity', icon: '⚡', color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
  mindfulness: { label: 'Mindfulness', icon: '🧘', color: 'text-purple-400', bg: 'bg-purple-500/10' },
  creative: { label: 'Creative', icon: '🎨', color: 'text-pink-400', bg: 'bg-pink-500/10' },
  social: { label: 'Social', icon: '👥', color: 'text-orange-400', bg: 'bg-orange-500/10' },
};

// Frequency options
export const FREQUENCIES = [
  { value: 'daily', label: 'Every Day' },
  { value: 'weekdays', label: 'Weekdays Only' },
  { value: 'weekends', label: 'Weekends Only' },
];

// Week day labels
export const WEEK_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Month labels
export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

// Heatmap color levels
export const HEATMAP_COLORS = [
  'bg-slate-700',
  'bg-emerald-900/40',
  'bg-emerald-800/60',
  'bg-emerald-700/80',
  'bg-emerald-500',
];

// App metadata
export const APP_NAME = 'Habit Tracker';
export const APP_TAGLINE = 'Build Better Habits, One Day at a Time';
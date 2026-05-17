export default function WeekStrip() {
  const today = new Date().getDay();
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="grid grid-cols-7 gap-2 mt-4">
      {days.map((day, i) => (
        <div key={day} className={`text-center rounded-lg py-2 text-xs ${i === today ? 'bg-emerald-500 text-white font-bold' : 'text-slate-500'}`}>
          <div className="uppercase text-[10px] opacity-70">{day}</div>
          {i === today ? '●' : ''}
        </div>
      ))}
    </div>
  );
}
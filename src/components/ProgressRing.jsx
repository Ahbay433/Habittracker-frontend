export default function ProgressRing({ percentage, size = 80, stroke = 8 }) {
  const radius = (size - stroke) / 2;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (percentage / 100) * circ;

  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgb(51 65 85)" strokeWidth={stroke} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="rgb(16 185 129)"
        strokeWidth={stroke}
        strokeDasharray={circ}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className="transition-all duration-700"
      />
      <text x="50%" y="50%" dy="0.3em" textAnchor="middle" className="rotate-90 fill-white text-xs font-bold dark:fill-slate-900">
        {percentage}%
      </text>
    </svg>
  );
}
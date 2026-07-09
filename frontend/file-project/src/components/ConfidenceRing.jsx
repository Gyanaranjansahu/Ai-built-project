/**
 * ConfidenceRing
 * Signature visual element reused across the app: a circular progress ring
 * that communicates a "fit" percentage (resume/job match, prep completion, etc).
 */
export default function ConfidenceRing({
  value = 0,          // 0-100
  size = 120,
  strokeWidth = 10,
  label,              // small caption under the number
  tone = "emerald",   // "emerald" | "amber"
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  const strokeColor = tone === "amber" ? "#F2A93B" : "#3ECF8E";

  return (
    <div className="inline-flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#26304A"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 0.8s ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-mono text-2xl font-medium text-ink">
            {value}%
          </span>
        </div>
      </div>
      {label && (
        <span className="font-mono text-xs uppercase tracking-wider text-muted">
          {label}
        </span>
      )}
    </div>
  );
}

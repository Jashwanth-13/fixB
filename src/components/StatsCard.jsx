export default function StatsCard({ label, value, className = "" }) {
  return (
    <div className={`card stats-card ${className}`}>
      <div className="stats-label muted">{label}</div>
      <div className="stats-value">{value}</div>
    </div>
  );
}

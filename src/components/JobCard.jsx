export default function JobCard({ job, actionLabel, onAction, children, className = "" }) {
  return (
    <div className={`card job-card ${className}`}>
      <div className="job-card-header">
        <h3>{job.title}</h3>
        <span className={`badge status-${job.status.toLowerCase()}`}>{job.status}</span>
      </div>
      <p className="job-meta muted">
        {job.location} • {job.type} • {job.pay}
      </p>
      <p className="job-date muted">Date: {job.date}</p>
      {children}
      {actionLabel && (
        <button className="btn btn-primary btn-sm" onClick={() => onAction(job.id)}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}

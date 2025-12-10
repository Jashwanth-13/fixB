import React from "react";
import { Link } from "react-router-dom";
import StatsCard from "../components/StatsCard";

export default function HirerDashboard({ hirer, jobs, applications }) {
  const jobCount = jobs.length;
  const appCount = applications.filter(a => jobs.some(j => j.id === a.jobId)).length;

  return (
    <div className="page hirer-page">
      <h2 className="page-title">Welcome, {hirer.name}!</h2>
      <p className="muted">Manage your hiring needs easily.</p>

      <div className="stats-grid">
        <StatsCard label="Jobs Posted" value={jobCount} />
        <StatsCard label="Applications" value={appCount} />
      </div>

      <div className="actions-row">
        <Link to="/hirer/post-job" className="btn btn-primary">Post a Job</Link>
        <Link to="/hirer/jobs" className="btn btn-outline">View My Jobs</Link>
      </div>
    </div>
  );
}

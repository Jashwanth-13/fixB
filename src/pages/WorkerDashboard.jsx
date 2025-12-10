import React from "react";
import { Link } from "react-router-dom";
import StatsCard from "../components/StatsCard";

export default function WorkerDashboard({ worker, applications }) {
  const totalApps = applications.length;
  return (
    <div className="page worker-page">
      <h2 className="page-title">Hi, {worker.name}!</h2>
      <p className="muted">Skill: {worker.skill}</p>
      <div className="stats-grid">
        <StatsCard label="Applications" value={totalApps} />
      </div>
      <div className="actions-row">
        <Link to="/worker/browse-jobs" className="btn btn-primary">Browse Jobs</Link>
        <Link to="/worker/applications" className="btn btn-outline">My Applications</Link>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import JobCard from "../components/JobCard";

export default function HirerJobs({ jobs, applications, users, onAcceptApplication }) {
  const [expandedJob, setExpandedJob] = useState(null);

  if (jobs.length === 0) return <div className="page"><p className="muted">No jobs posted yet.</p></div>;

  return (
    <div className="page hirer-page">
      <h2 className="page-title">My Jobs ({jobs.length})</h2>
      <div className="list">
        {jobs.map(job => {
          const jobApps = applications.filter(a => a.jobId === job.id);
          return (
            <div key={job.id}>
              <JobCard job={job}>
                <p>Applicants: <strong>{jobApps.length}</strong></p>
              </JobCard>
            </div>
          );
        })}
      </div>
    </div>
  );
}

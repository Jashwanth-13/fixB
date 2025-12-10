import React, { useState } from "react";

export default function WorkerLogin({ onLogin }) {
  const [name, setName] = useState("");
  const [skill, setSkill] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onLogin({ name: name.trim(), role: "worker", skill: skill.trim() });
    }
  };

  return (
    <div className="page worker-page">
      <div className="form-container card">
        <h2 className="page-title">Worker Login</h2>
        <p className="muted">Find jobs matching your skills</p>
        <form onSubmit={handleSubmit} className="form">
          <label className="form-label">
            Full Name
            <input
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              required
            />
          </label>
          <label className="form-label">
            Primary Skill
            <input
              className="form-input"
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              placeholder="Electrician, Plumber, Helper, etc."
            />
          </label>
          <button type="submit" className="btn btn-primary">Continue as Worker</button>
        </form>
      </div>
    </div>
  );
}

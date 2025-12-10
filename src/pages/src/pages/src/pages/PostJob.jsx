import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const JOB_TYPES = ["Helper", "Electrician", "Plumber", "Cleaner", "Carpenter", "Other"];

export default function PostJob({ onPostJob }) {
  const [form, setForm] = useState({
    title: "", description: "", location: "", pay: "", type: "Helper", date: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.title.trim()) {
      onPostJob(form);
    }
  };

  return (
    <div className="page hirer-page">
      <div className="form-container card">
        <h2 className="page-title">Post New Job</h2>
        <form onSubmit={handleSubmit} className="form">
          <label className="form-label">
            Job Title
            <input className="form-input" name="title" value={form.title} onChange={handleChange} required />
          </label>
          <label className="form-label">
            Description
            <textarea className="form-textarea" name="description" value={form.description} onChange={handleChange} />
          </label>
          <label className="form-label">
            Location
            <input className="form-input" name="location" value={form.location} onChange={handleChange} required />
          </label>
          <label className="form-label">
            Pay
            <input className="form-input" name="pay" value={form.pay} onChange={handleChange} placeholder="₹500/day" required />
          </label>
          <label className="form-label">
            Job Type
            <select className="form-input" name="type" value={form.type} onChange={handleChange}>
              {JOB_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
            </select>
          </label>
          <label className="form-label">
            Date
            <input className="form-input" name="date" type="date" value={form.date} onChange={handleChange} />
          </label>
          <button type="submit" className="btn btn-primary">Post Job</button>
        </form>
      </div>
    </div>
  );
}

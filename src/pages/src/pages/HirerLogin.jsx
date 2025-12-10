import React, { useState } from "react";

export default function HirerLogin({ onLogin }) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onLogin({ name: name.trim(), role: "hirer", contact: contact.trim() });
    }
  };

  return (
    <div className="page hirer-page">
      <div className="form-container card">
        <h2 className="page-title">Hirer Login</h2>
        <p className="muted">Enter your details to post jobs</p>
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
            Phone/Email
            <input
              className="form-input"
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="9999999999 or email@example.com"
            />
          </label>
          <button type="submit" className="btn btn-primary">Continue as Hirer</button>
        </form>
      </div>
    </div>
  );
}

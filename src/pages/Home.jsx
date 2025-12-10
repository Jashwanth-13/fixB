import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="page">
      <section className="hero">
        <h1>Welcome to FixBee</h1>
        <p className="hero-subtitle muted">
          Connect hirers with skilled local workers for daily & part-time jobs instantly.
        </p>
        <div className="hero-actions">
          <Link to="/hirer/login" className="btn btn-primary">I'm a Hirer</Link>
          <Link to="/worker/login" className="btn btn-outline">I'm a Worker</Link>
        </div>
      </section>
    </div>
  );
}

import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function NavBar({ currentUser, onLogout }) {
  return (
    <header className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">FixBee</Link>
      </div>
      <nav className="navbar-center">
        <NavLink to="/" className="nav-link" end>Home</NavLink>
        <NavLink to="/hirer/login" className="nav-link">Hirer</NavLink>
        <NavLink to="/worker/login" className="nav-link">Worker</NavLink>
      </nav>
      <div className="navbar-right">
        {currentUser ? (
          <>
            <span className="navbar-user">{currentUser.name} ({currentUser.role})</span>
            <button className="btn btn-secondary" onClick={onLogout}>Logout</button>
          </>
        ) : (
          <span className="navbar-user muted">Welcome to FixBee</span>
        )}
      </div>
    </header>
  );
}

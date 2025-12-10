import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import HirerLogin from "./pages/HirerLogin";
import HirerDashboard from "./pages/HirerDashboard";
import PostJob from "./pages/PostJob";
import HirerJobs from "./pages/HirerJobs";
import WorkerLogin from "./pages/WorkerLogin";
import WorkerDashboard from "./pages/WorkerDashboard";
import BrowseJobs from "./pages/BrowseJobs";
import Applications from "./pages/Applications";
import { initialJobs } from "./mock/jobsMock";
import { initialUsers } from "./mock/usersMock";

const STORAGE_KEYS = {
  CURRENT_USER: "fixbee_currentUser",
  JOBS: "fixbee_jobs",
  USERS: "fixbee_users",
  APPLICATIONS: "fixbee_applications",
};

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [users, setUsers] = useState([]);
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();

  // Initialize from localStorage
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      const storedJobs = localStorage.getItem(STORAGE_KEYS.JOBS);
      const storedUsers = localStorage.getItem(STORAGE_KEYS.USERS);
      const storedApps = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);

      setCurrentUser(storedUser ? JSON.parse(storedUser) : null);
      setJobs(storedJobs ? JSON.parse(storedJobs) : initialJobs);
      setUsers(storedUsers ? JSON.parse(storedUsers) : initialUsers);
      setApplications(storedApps ? JSON.parse(storedApps) : []);
    } catch (e) {
      setCurrentUser(null);
      setJobs(initialJobs);
      setUsers(initialUsers);
      setApplications([]);
    }
  }, []);

  // Persist to localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(currentUser));
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(applications));
  }, [applications]);

  const handleLogin = (userData) => {
    let existingUser = users.find(
      (u) =>
        u.name.toLowerCase() === userData.name.toLowerCase() &&
        u.role === userData.role
    );

    if (!existingUser) {
      existingUser = {
        id: Date.now().toString(),
        ...userData,
      };
      setUsers((prev) => [...prev, existingUser]);
    }

    setCurrentUser(existingUser);

    if (userData.role === "hirer") {
      navigate("/hirer/dashboard");
    } else {
      navigate("/worker/dashboard");
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    navigate("/");
  };

  const handlePostJob = (jobData) => {
    if (!currentUser) return;
    const newJob = {
      id: Date.now().toString(),
      ...jobData,
      status: "Open",
      hirerId: currentUser.id,
      assignedWorkerId: null,
    };
    setJobs((prev) => [newJob, ...prev]);
    navigate("/hirer/jobs");
  };

  const handleApplyJob = (jobId) => {
    if (!currentUser || currentUser.role !== "worker") {
      navigate("/worker/login");
      return;
    }
    const hasApplied = applications.some(
      (app) => app.jobId === jobId && app.workerId === currentUser.id
    );
    if (hasApplied) return;

    const newApp = {
      id: Date.now().toString(),
      jobId,
      workerId: currentUser.id,
      status: "Pending",
    };
    setApplications((prev) => [newApp, ...prev]);
  };

  const handleAcceptApplication = (applicationId) => {
    const app = applications.find((a) => a.id === applicationId);
    if (!app) return;

    // Update job status
    setJobs((prev) =>
      prev.map((job) =>
        job.id === app.jobId
          ? { ...job, status: "Assigned", assignedWorkerId: app.workerId }
          : job
      )
    );

    // Update application status
    setApplications((prev) =>
      prev.map((a) =>
        a.id === applicationId ? { ...a, status: "Accepted" } : a
      )
    );
  };

  const hirerJobs = currentUser
    ? jobs.filter((job) => job.hirerId === currentUser.id)
    : [];

  const workerApplications = currentUser
    ? applications.filter((a) => a.workerId === currentUser.id)
    : [];

  return (
    <div className="app">
      <NavBar currentUser={currentUser} onLogout={handleLogout} />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Hirer Routes */}
          <Route path="/hirer/login" element={<HirerLogin onLogin={handleLogin} />} />
          <Route
            path="/hirer/dashboard"
            element={
              currentUser && currentUser.role === "hirer" ? (
                <HirerDashboard
                  hirer={currentUser}
                  jobs={hirerJobs}
                  applications={applications}
                />
              ) : (
                <Navigate to="/hirer/login" replace />
              )
            }
          />
          <Route
            path="/hirer/post-job"
            element={
              currentUser && currentUser.role === "hirer" ? (
                <PostJob onPostJob={handlePostJob} />
              ) : (
                <Navigate to="/hirer/login" replace />
              )
            }
          />
          <Route
            path="/hirer/jobs"
            element={
              currentUser && currentUser.role === "hirer" ? (
                <HirerJobs
                  jobs={hirerJobs}
                  applications={applications}
                  users={users}
                  onAcceptApplication={handleAcceptApplication}
                />
              ) : (
                <Navigate to="/hirer/login" replace />
              )
            }
          />

          {/* Worker Routes */}
          <Route path="/worker/login" element={<WorkerLogin onLogin={handleLogin} />} />
          <Route
            path="/worker/dashboard"
            element={
              currentUser && currentUser.role === "worker" ? (
                <WorkerDashboard
                  worker={currentUser}
                  applications={workerApplications}
                  jobs={jobs}
                />
              ) : (
                <Navigate to="/worker/login" replace />
              )
            }
          />
          <Route
            path="/worker/browse-jobs"
            element={
              currentUser && currentUser.role === "worker" ? (
                <BrowseJobs jobs={jobs} onApply={handleApplyJob} />
              ) : (
                <Navigate to="/worker/login" replace />
              )
            }
          />
          <Route
            path="/worker/applications"
            element={
              currentUser && currentUser.role === "worker" ? (
                <Applications applications={workerApplications} jobs={jobs} />
              ) : (
                <Navigate to="/worker/login" replace />
              )
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

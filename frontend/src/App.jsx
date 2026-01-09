// src/App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useContext, useState } from "react";

import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import ProjectList from "./components/project/ProjectList";
import TaskList from "./components/Task/TaskList";
import { AuthContext, AuthProvider } from "./components/context/AuthContext";

/* ---------------- Protected Dashboard ---------------- */

function DashboardLayout() {
  const { user, logout } = useContext(AuthContext);
  const [selectedProject, setSelectedProject] = useState(null);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="p-4">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">
          Welcome, {user.name}
        </h1>

        <button
          onClick={logout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </header>

      <main className="flex gap-6">
        <ProjectList selectProject={setSelectedProject} />
        {selectedProject && (
          <TaskList projectId={selectedProject._id} />
        )}
      </main>
    </div>
  );
}

/* ---------------- Auth Redirect ---------------- */

function PublicOnly({ children }) {
  const { user } = useContext(AuthContext);
  return user ? <Navigate to="/dashboard" replace /> : children;
}

/* ---------------- App ---------------- */

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Auth Routes */}
          <Route
            path="/login"
            element={
              <PublicOnly>
                <Login />
              </PublicOnly>
            }
          />

          <Route
            path="/signup"
            element={
              <PublicOnly>
                <Signup />
              </PublicOnly>
            }
          />

          {/* Protected Dashboard */}
          <Route path="/dashboard" element={<DashboardLayout />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

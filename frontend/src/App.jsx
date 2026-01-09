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

function ProtectedLayout() {
  const { user, logout } = useContext(AuthContext);
  const [selectedProject, setSelectedProject] = useState(null);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl">Welcome, {user.name}</h1>
        <button
          onClick={logout}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="flex gap-6">
        <ProjectList selectProject={setSelectedProject} />
        {selectedProject && <TaskList projectId={selectedProject._id} />}
      </div>
    </div>
  );
}

function AuthRedirect({ children }) {
  const { user } = useContext(AuthContext);
  return user ? <Navigate to="/dashboard" /> : children;
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Auth Routes */}
          <Route
            path="/login"
            element={
              <AuthRedirect>
                <Login />
              </AuthRedirect>
            }
          />
          <Route
            path="/signup"
            element={
              <AuthRedirect>
                <Signup />
              </AuthRedirect>
            }
          />

          {/* Protected Route */}
          <Route path="/dashboard" element={<ProtectedLayout />} />

          {/* Default */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

// src/App.jsx
import { useState, useContext } from "react";
import Signup from "./components/auth/Signup";
import ProjectList from "./components/project/ProjectList";
// import Login from "./components/auth/Login";
import TaskList from "./components/Task/TaskList";
import { AuthContext, AuthProvider } from "./components/context/AuthContext";

function AppContent() {
  const { user, logout } = useContext(AuthContext);
  const [selectedProject, setSelectedProject] = useState(null);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen gap-10">
        <Signup />
        {/* <Login /> */}
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl">Welcome, {user.name}</h1>
        <button onClick={logout} className="bg-red-600 text-white p-2 rounded">
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

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import ProjectList from "../project/ProjectList";
import ProjectDetail from "../project/ProjectDetail";

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="h-screen bg-zinc-950 text-white p-4">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">
          FocusBoard – {user.name}
        </h1>
        <button
          onClick={logout}
          className="px-4 py-1 border border-zinc-700 rounded"
        >
          Logout
        </button>
      </div>

      {/* MAIN LAYOUT */}
      <div className="flex gap-4 h-[90%]">

        {/* LEFT: PROJECTS */}
        <div className="w-[25%] border border-zinc-800 rounded-lg p-3">
          <h2 className="mb-3 text-lg opacity-80">Projects</h2>
          <ProjectList select={setSelectedProject} />
        </div>

        {/* RIGHT: TASKS */}
        <div className="flex-1 border border-zinc-800 rounded-lg p-4">
          {selectedProject ? (
            <ProjectDetail project={selectedProject} />
          ) : (
            <div className="h-full flex items-center justify-center opacity-50">
              Select a project to view tasks
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

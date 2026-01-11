import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import ProjectList from "../project/ProjectList";
import ProjectDetail from "../project/ProjectDetail";

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="h-full bg-zinc-950 text-white p-4">
      
      {/* HEADER */}
 <div className="flex items-center justify-between mb-6">
  <div className="flex items-center gap-3">
    <div className="h-9 w-9 rounded-full bg-zinc-800 flex items-center justify-center text-sm font-medium">
      {user.name.charAt(0).toUpperCase()}
    </div>

    <div>
      <h1 className="text-lg font-semibold leading-none">FocusBoard</h1>
      <p className="text-sm text-zinc-400">{user.name}</p>
    </div>
  </div>

  <button
    onClick={logout}
    className="px-4 py-2 text-sm rounded-md border border-zinc-700
               hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/40
               transition"
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

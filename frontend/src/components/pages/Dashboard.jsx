import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import ProjectList from "../project/ProjectList";
import ProjectDetail from "../project/ProjectDetail";

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="h-screen bg-zinc-900 text-zinc-100 flex flex-col">

      {/* TOP BAR */}
      <header className="
        h-16 flex items-center justify-between
        px-6
        border-b border-zinc-800
        bg-zinc-900/80 backdrop-blur
      ">
        <div className="flex items-center gap-4">
          <div className="
            h-10 w-10 rounded-xl
            bg-indigo-600
            flex items-center justify-center
            font-bold text-white
          ">
            {user.name.charAt(0).toUpperCase()}
          </div>

          <div>
            <h1 className="text-sm font-semibold tracking-wide">
              FocusBoard
            </h1>
            <p className="text-xs text-zinc-400">
              Welcome back, {user.name}
            </p>
          </div>
        </div>

        <button
          onClick={logout}
          className="
            text-sm px-4 py-2 rounded-lg
            border border-zinc-700
            hover:bg-red-500/10
            hover:text-red-400
            hover:border-red-500/40
            transition
          "
        >
          Logout
        </button>
      </header>

      {/* MAIN */}
      <div className="flex flex-1 overflow-hidden">

        {/* SIDEBAR */}
        <aside className="
          w-72 p-4
          border-r border-zinc-800
          bg-zinc-900
          flex flex-col
        ">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-4">
            Projects
          </h2>

          <div className="flex-1 overflow-y-auto">
            <ProjectList select={setSelectedProject} />
          </div>
        </aside>

        {/* CONTENT */}
        <main className="
          flex-1 p-6
          bg-zinc-950
          overflow-y-auto
        ">
          <div className="
            h-full rounded-xl
            border border-zinc-800
            bg-zinc-900
            p-6
          ">
            {selectedProject ? (
              <ProjectDetail project={selectedProject} />
            ) : (
              <div className="
                h-full flex flex-col
                items-center justify-center
                text-zinc-400
              ">
                <p className="text-lg font-medium">
                  No project selected
                </p>
                <p className="text-sm opacity-70 mt-1">
                  Choose a project from the sidebar to get started
                </p>
              </div>
            )}
          </div>
        </main>

      </div>
    </div>
  );
}

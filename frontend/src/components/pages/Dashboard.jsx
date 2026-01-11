import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import ProjectList from "../project/ProjectList";
import ProjectDetail from "../project/ProjectDetail";

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="h-screen bg-zinc-950 text-zinc-100 flex flex-col">

      {/* TOP BAR */}
      <header className="
        sticky top-0 z-10
        h-16 flex items-center justify-between
        px-6
        bg-zinc-900/90 backdrop-blur
        border-b border-zinc-800
        shadow-sm
      ">
        <div className="flex items-center gap-4">
          {/* APP ICON */}
          <div className="
            h-10 w-10 rounded-xl
            bg-gradient-to-br from-indigo-500 to-purple-600
            flex items-center justify-center
            font-bold text-white
            shadow-md
          ">
            F
          </div>

          <div className="leading-tight">
            <h1 className="text-sm font-semibold tracking-wide">
              FocusBoard
            </h1>
            <p className="text-xs text-zinc-400">
              Productivity workspace
            </p>
          </div>
        </div>

        {/* USER ACTIONS */}
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium">{user.name}</p>
            <p className="text-xs text-zinc-400">Active</p>
          </div>

          <button
            onClick={logout}
            className="
              px-3 py-2 rounded-lg text-sm
              border border-zinc-700
              hover:bg-red-500/10 hover:text-red-400
              hover:border-red-500/40
              transition
            "
          >
            Logout
          </button>
        </div>
      </header>

      {/* MAIN LAYOUT */}
      <div className="flex flex-1 overflow-hidden">

        {/* SIDEBAR */}
        <aside className="
          w-72
          border-r border-zinc-800
          bg-zinc-900
          flex flex-col
        ">
          <div className="p-4">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Projects
            </h2>
          </div>

          <div className="flex-1 px-3 pb-4 overflow-y-auto">
            <ProjectList select={setSelectedProject} />
          </div>
        </aside>

        {/* CONTENT AREA */}
        <main className="flex-1 bg-zinc-950 overflow-y-auto">
          <div className="p-6 h-full">
            <div className="
              h-full rounded-2xl
              bg-zinc-900
              border border-zinc-800
              shadow-lg
              p-6
              transition
            ">
              {selectedProject ? (
                <>
                  {/* PROJECT HEADER */}
                  <div className="mb-4 flex items-center gap-3">
                    {selectedProject.logo ? (
                      <img
                        src={selectedProject.logo}
                        alt={selectedProject.name}
                        className="h-8 w-8 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="
                        h-8 w-8 rounded-lg
                        bg-indigo-600
                        flex items-center justify-center
                        font-semibold
                      ">
                        {selectedProject.name[0].toUpperCase()}
                      </div>
                    )}

                    <h2 className="text-lg font-semibold">
                      {selectedProject.name}
                    </h2>
                  </div>

                  <ProjectDetail project={selectedProject} />
                </>
              ) : (
                <div className="
                  h-full flex flex-col
                  items-center justify-center
                  text-zinc-400
                  gap-2
                ">
                  <div className="
                    h-14 w-14 rounded-2xl
                    bg-zinc-800
                    flex items-center justify-center
                    text-xl
                  ">
                    📁
                  </div>
                  <p className="text-lg font-medium">
                    No project selected
                  </p>
                  <p className="text-sm opacity-70">
                    Select a project from the sidebar to start working
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>

      </div>
    </div>
  );
}

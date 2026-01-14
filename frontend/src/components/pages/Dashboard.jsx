import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import ProjectList from "../project/ProjectList";
import ProjectDetail from "../project/ProjectDetail";
import { Menu, X } from "lucide-react";

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const [selectedProject, setSelectedProject] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col bg-zinc-950 text-zinc-100">

      {/* TOP BAR */}
      <header className="sticky top-0 z-20 flex items-center justify-between h-16 px-4 md:px-6 bg-zinc-900/90 backdrop-blur border-b border-zinc-800 shadow-sm">
        {/* Left: App Logo */}
        <div className="flex items-center gap-3">
          <button
            className="md:hidden p-2 rounded hover:bg-zinc-800/50 transition"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-md">
            F
          </div>
          <div className="leading-tight">
            <h1 className="text-sm font-semibold tracking-wide">FocusBoard</h1>
            <p className="text-xs text-zinc-400">Productivity workspace</p>
          </div>
        </div>

        {/* Right: User Info */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-medium">{user?.name || "User"}</p>
            <p className="text-xs text-zinc-400">Active</p>
          </div>
          <button
            onClick={logout}
            className="px-3 py-2 rounded-lg text-sm border border-zinc-700 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/40 transition"
          >
            Logout
          </button>
        </div>
      </header>

      {/* MAIN LAYOUT */}
      <div className="flex flex-1 overflow-hidden relative">

        {/* SIDEBAR */}
        <aside
          className={`fixed md:relative z-30 inset-y-0 left-0 w-72 bg-zinc-900 border-r border-zinc-800 transform md:translate-x-0 transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-4 border-b border-zinc-800">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Projects
            </h2>
          </div>
          <div className="flex-1 px-3 pb-4 overflow-y-auto">
            <ProjectList select={(project) => { setSelectedProject(project); setSidebarOpen(false); }} />
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-20 md:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* CONTENT AREA */}
        <main className="flex-1 overflow-y-auto p-6 md:ml-72 transition-all duration-300">
          <div className="h-full rounded-2xl bg-zinc-900 border border-zinc-800 shadow-lg p-6 flex flex-col transition-all duration-300">

            {selectedProject ? (
              <>
                {/* PROJECT HEADER */}
                <div className="mb-4 flex items-center gap-3">
                  {selectedProject?.logo ? (
                    <img
                      src={selectedProject.logo}
                      alt={selectedProject.name}
                      className="h-10 w-10 rounded-lg object-cover transition-all duration-200"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-lg bg-indigo-600 flex items-center justify-center font-semibold text-white">
                      {selectedProject.name[0].toUpperCase()}
                    </div>
                  )}
                  <h2 className="text-xl font-semibold">{selectedProject.name}</h2>
                </div>

                <ProjectDetail project={selectedProject} />
              </>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-zinc-400 gap-3">
                <div className="h-16 w-16 rounded-2xl bg-zinc-800 flex items-center justify-center text-3xl transition-all duration-200">
                  📁
                </div>
                <p className="text-lg font-medium">No project selected</p>
                <p className="text-sm opacity-70 text-center">
                  Select a project from the sidebar to start working
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

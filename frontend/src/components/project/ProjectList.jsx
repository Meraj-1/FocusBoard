import { useEffect, useMemo, useState } from "react";
import api from "../api/api";
import ProjectForm from "./ProjectForm";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function ProjectList({ select }) {
  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔍 Search & Filter
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const load = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await api.get("/api/projects/read");
      setProjects(res.data);
    } catch {
      setError("Failed to load projects.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const startEdit = (project) => {
    setEditingId(project._id);
    setEditName(project.name);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName("");
  };

  const saveEdit = async (projectId) => {
    if (!editName.trim()) return;

    const previous = projects;
    try {
      setProjects((prev) =>
        prev.map((p) =>
          p._id === projectId ? { ...p, name: editName } : p
        )
      );
      setEditingId(null);
      await api.put(`/api/projects/${projectId}/update`, { name: editName });
    } catch {
      setProjects(previous);
      setError("Failed to update project.");
    }
  };

  const remove = async (projectId) => {
    if (!confirm("Delete this project and all tasks?")) return;

    const previous = projects;
    try {
      setProjects((prev) => prev.filter((p) => p._id !== projectId));
      await api.delete(`/api/projects/${projectId}/delete`);
    } catch {
      setProjects(previous);
      setError("Failed to delete project.");
    }
  };

  // 🧠 Filter logic
  const filteredProjects = useMemo(() => {
    const now = new Date();

    return projects.filter((p) => {
      const matchSearch = p.name
        .toLowerCase()
        .includes(search.toLowerCase());

      if (!matchSearch) return false;

      const created = new Date(p.createdAt);
      const diffDays =
        (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24);

      if (filter === "week") return diffDays <= 7;
      if (filter === "month") return diffDays <= 30;
      if (filter === "year") return diffDays > 365;

      return true;
    });
  }, [projects, search, filter]);

  return (
    <div className="space-y-4">

      <ProjectForm refresh={load} />

      {/* SEARCH + FILTER BAR */}
      <div className="flex gap-2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search projects..."
          className="
            flex-1 px-3 py-2 rounded-xl
            bg-zinc-900 border border-zinc-800
            text-sm text-white
            focus:border-indigo-500 outline-none
          "
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="
            px-3 py-2 rounded-xl
            bg-zinc-900 border border-zinc-800
            text-sm text-white
            focus:border-indigo-500 outline-none
          "
        >
          <option value="all">All</option>
          <option value="week">Last 7 days</option>
          <option value="month">Last 30 days</option>
          <option value="year">Older than 1 year</option>
        </select>
      </div>

      {/* ERROR */}
      {error && (
        <div className="text-xs text-red-400 bg-red-500/10 px-4 py-2 rounded-xl">
          {error}
        </div>
      )}

      {/* SCROLLABLE LIST */}
      <div className="max-h-[420px] overflow-y-auto space-y-3 pr-1">
        {loading && (
          <div className="text-xs text-zinc-400 animate-pulse">
            Loading projects...
          </div>
        )}

        {!loading && filteredProjects.length === 0 && (
          <div className="
            rounded-2xl border border-zinc-800
            bg-zinc-900/60 py-14 text-center
          ">
            <p className="text-sm text-zinc-300 font-medium">
              No matching projects
            </p>
            <p className="mt-1 text-xs text-zinc-500">
              Try changing search or filter
            </p>
          </div>
        )}

        {filteredProjects.map((project) => (
          <div
            key={project._id}
            className="
              group rounded-2xl
              bg-zinc-900/70
              border border-zinc-800
              hover:border-indigo-500/40
              transition
            "
          >
            <div
              className="flex items-center gap-4 px-4 py-4 cursor-pointer"
              onClick={() => select(project)}
            >
              {/* AVATAR */}
              {project.logo ? (
                <img
                  src={`${BACKEND_URL}${project.logo}`}
                  className="h-11 w-11 rounded-xl object-cover"
                />
              ) : (
                <div className="
                  h-11 w-11 rounded-xl
                  bg-gradient-to-br from-indigo-500 to-purple-600
                  text-white font-semibold
                  flex items-center justify-center
                ">
                  {project.name[0].toUpperCase()}
                </div>
              )}

              {/* NAME */}
              <div className="flex-1 min-w-0">
                {editingId === project._id ? (
                  <input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") saveEdit(project._id);
                      if (e.key === "Escape") cancelEdit();
                    }}
                    autoFocus
                    className="
                      w-full bg-zinc-950
                      px-2 py-1 rounded-md
                      border border-zinc-700
                      text-sm text-white
                      outline-none
                    "
                  />
                ) : (
                  <p className="truncate text-zinc-200 font-medium">
                    {project.name}
                  </p>
                )}

                <p className="text-[11px] text-zinc-500 mt-1">
                  Created {new Date(project.createdAt).toLocaleDateString()}
                </p>
              </div>

              {/* ACTIONS */}
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    startEdit(project);
                  }}
                  className="h-8 w-8 rounded-lg bg-zinc-800 hover:text-indigo-400"
                >
                  ✎
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    remove(project._id);
                  }}
                  className="h-8 w-8 rounded-lg bg-zinc-800 hover:text-red-400"
                >
                  ⌫
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

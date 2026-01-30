import { useEffect, useState } from "react";
import api from "../api/api";
import ProjectForm from "./ProjectForm";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function ProjectList({ select }) {
  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  return (
<div className="space-y-5">
  <ProjectForm refresh={load} />

  {/* LOADING */}
  {loading && (
    <p className="text-xs text-zinc-400 animate-pulse">
      Loading projects…
    </p>
  )}

  {/* ERROR */}
  {error && (
    <p className="
      text-xs text-red-400
      bg-red-500/10 border border-red-500/20
      px-4 py-2 rounded-xl
    ">
      {error}
    </p>
  )}

  {/* EMPTY STATE */}
  {projects.length === 0 && !loading && (
    <div className="
      text-center text-sm text-zinc-500
      py-10 border border-dashed border-zinc-700
      rounded-2xl
    ">
      <p>No projects yet</p>
      <p className="text-xs mt-1">Create your first one ✨</p>
    </div>
  )}

  {/* PROJECT LIST */}
  {projects.map((project) => (
    <div
      key={project._id}
      className="
        group relative flex items-center justify-between
        px-4 py-4 rounded-2xl
        bg-zinc-900/70 backdrop-blur
        border border-zinc-800
        hover:border-indigo-500/40
        shadow-sm hover:shadow-lg
        transition-all
      "
    >
      {/* LEFT */}
      <div
        className="flex items-center gap-4 flex-1 cursor-pointer"
        onClick={() => select(project)}
      >
        {/* LOGO / AVATAR */}
        {project.logo ? (
          <img
            src={`${BACKEND_URL}${project.logo}`}
            alt={project.name}
            className="
              h-10 w-10 rounded-xl
              object-cover
              border border-zinc-700
            "
          />
        ) : (
          <div
            className="
              h-10 w-10 rounded-xl
              bg-gradient-to-br from-indigo-500 to-purple-600
              text-white font-semibold text-sm
              flex items-center justify-center
            "
          >
            {project.name[0].toUpperCase()}
          </div>
        )}

        {/* NAME / EDIT */}
        <div className="flex-1">
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
                w-full bg-transparent
                border-b border-zinc-600
                text-sm text-white
                outline-none
                focus:border-indigo-500
              "
            />
          ) : (
            <p className="
              font-medium text-zinc-200
              group-hover:text-white
              transition
            ">
              {project.name}
            </p>
          )}

          {/* META */}
          <p className="text-[11px] text-zinc-500">
            Updated just now
          </p>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="
        absolute right-3 top-1/2 -translate-y-1/2
        flex gap-2
        opacity-0 group-hover:opacity-100
        transition
      ">
        <button
          onClick={() => startEdit(project)}
          title="Edit"
          className="
            h-8 w-8 rounded-lg
            bg-zinc-800 hover:bg-indigo-500/20
            text-zinc-400 hover:text-indigo-400
            transition
          "
        >
          ✏️
        </button>
        <button
          onClick={() => remove(project._id)}
          title="Delete"
          className="
            h-8 w-8 rounded-lg
            bg-zinc-800 hover:bg-red-500/20
            text-zinc-400 hover:text-red-400
            transition
          "
        >
          🗑
        </button>
      </div>
    </div>
  ))}
</div>

  );
}

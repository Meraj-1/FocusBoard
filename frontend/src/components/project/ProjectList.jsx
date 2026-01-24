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
      await api.put(`/projects/${projectId}`, { name: editName });
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
      await api.delete(`/projects/${projectId}`);
    } catch {
      setProjects(previous);
      setError("Failed to delete project.");
    }
  };

  return (
    <div className="space-y-4">
      <ProjectForm refresh={load} />

      {loading && (
        <p className="text-sm text-slate-400 animate-pulse">
          Loading projects…
        </p>
      )}

      {error && (
        <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg">
          {error}
        </p>
      )}

      {projects.length === 0 && !loading && (
        <p className="text-sm text-slate-400">
          No projects yet. Create your first one ✨
        </p>
      )}

      {projects.map((project) => (
        <div
          key={project._id}
          className="
            group flex items-center justify-between
            px-4 py-3 rounded-xl
            bg-white/70 backdrop-blur
            border border-slate-200
            shadow-sm
            hover:shadow-md hover:-translate-y-[1px]
            transition
          "
        >
          {/* LEFT */}
          <div
            className="flex items-center gap-3 flex-1 cursor-pointer"
            onClick={() => select(project)}
          >
            {/* LOGO */}
            {project.logo ? (
              <img
                src={`${BACKEND_URL}${project.logo}`}
                alt={project.name}
                className="
                  h-9 w-9 rounded-lg
                  object-cover
                  border border-slate-200
                "
              />
            ) : (
              <div
                className="
                  h-9 w-9 rounded-lg
                  bg-indigo-500
                  text-white font-semibold
                  flex items-center justify-center
                "
              >
                {project.name[0].toUpperCase()}
              </div>
            )}

            {/* NAME / EDIT */}
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
                  flex-1 bg-transparent
                  border-b border-slate-300
                  outline-none
                  focus:border-slate-600
                "
              />
            ) : (
              <span className="font-medium text-slate-700 group-hover:text-slate-900">
                {project.name}
              </span>
            )}
          </div>

          {/* ACTIONS */}
          <div className="flex gap-3 ml-3 opacity-0 group-hover:opacity-100 transition">
            <button
              onClick={() => startEdit(project)}
              title="Edit"
              className="text-slate-400 hover:text-slate-700"
            >
              ✏️
            </button>
            <button
              onClick={() => remove(project._id)}
              title="Delete"
              className="text-slate-400 hover:text-red-500"
            >
              🗑
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

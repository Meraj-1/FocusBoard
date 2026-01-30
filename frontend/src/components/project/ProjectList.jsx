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
<div className="space-y-5 group/projects">

  <ProjectForm refresh={load} />

  {/* LOADING */}
  {loading && (
    <div className="flex items-center gap-2 text-xs text-zinc-400">
      <span className="h-2 w-2 rounded-full bg-indigo-400 animate-pulse" />
      Loading projects
    </div>
  )}

  {/* ERROR */}
  {error && (
    <div className="
      text-xs text-red-400
      bg-red-500/10 border border-red-500/20
      px-4 py-2 rounded-xl
    ">
      {error}
    </div>
  )}

  {/* EMPTY STATE */}
  {projects.length === 0 && !loading && (
    <div className="
      relative overflow-hidden
      rounded-2xl border border-zinc-800
      bg-zinc-900/60
      py-14 text-center
    ">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5" />
      <p className="relative text-sm text-zinc-300 font-medium">
        No projects created
      </p>
      <p className="relative mt-1 text-xs text-zinc-500">
        Start by creating your first workspace
      </p>
    </div>
  )}

  {/* PROJECT LIST */}
  {projects.map((project) => (
    <div
      key={project._id}
      className="
        group relative
        rounded-2xl
        bg-zinc-900/70 backdrop-blur
        border border-zinc-800
        transition-all
        hover:border-indigo-500/40
      "
    >
      {/* GLOW EDGE */}
      <div className="
        pointer-events-none absolute inset-0
        rounded-2xl
        opacity-0 group-hover:opacity-100
        bg-gradient-to-r from-indigo-500/10 to-purple-500/10
        transition
      " />

      <div
        className="relative flex items-center gap-4 px-4 py-4 cursor-pointer"
        onClick={() => select(project)}
      >
        {/* AVATAR */}
        {project.logo ? (
          <img
            src={`${BACKEND_URL}${project.logo}`}
            alt={project.name}
            className="
              h-11 w-11 rounded-xl
              object-cover
              border border-zinc-700
            "
          />
        ) : (
          <div className="
            h-11 w-11 rounded-xl
            bg-gradient-to-br from-indigo-500 to-purple-600
            text-white font-semibold
            flex items-center justify-center
            shadow-md
          ">
            {project.name[0].toUpperCase()}
          </div>
        )}

        {/* NAME / META */}
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
                w-full bg-zinc-950/60
                px-2 py-1 rounded-md
                border border-zinc-700
                text-sm text-white
                outline-none
                focus:border-indigo-500
              "
            />
          ) : (
            <p className="
              truncate font-medium
              text-zinc-200 group-hover:text-white
            ">
              {project.name}
            </p>
          )}

          {/* STATUS CHIP */}
          <div className="mt-1 inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span className="text-[11px] text-zinc-500">
              Active workspace
            </span>
          </div>
        </div>

        {/* ACTION DOCK */}
        <div className="
          flex items-center gap-1.5
          opacity-0 group-hover:opacity-100
          transition
        ">
          <button
            onClick={(e) => {
              e.stopPropagation();
              startEdit(project);
            }}
            className="
              h-9 w-9 rounded-xl
              bg-zinc-800/70
              hover:bg-indigo-500/20
              text-zinc-400 hover:text-indigo-400
              transition
            "
          >
            ✎
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              remove(project._id);
            }}
            className="
              h-9 w-9 rounded-xl
              bg-zinc-800/70
              hover:bg-red-500/20
              text-zinc-400 hover:text-red-400
              transition
            "
          >
            ⌫
          </button>
        </div>
      </div>
    </div>
  ))}
</div>


  );
}

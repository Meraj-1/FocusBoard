import { useEffect, useState } from "react";
import api from "../api/api";
import ProjectForm from "./ProjectForm";

export default function ProjectList({ select }) {
  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load projects
  const load = async () => {
    try {
      setLoading(true);
      const res = await api.get("/projects");
      setProjects(res.data);
    } catch (err) {
      setError("Failed to load projects.");
      console.error(err);
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

    try {
      // Optimistic UI update
      setProjects((prev) =>
        prev.map((p) => (p._id === projectId ? { ...p, name: editName } : p))
      );
      setEditingId(null);
      await api.put(`/projects/${projectId}`, { name: editName });
    } catch (err) {
      setError("Failed to update project.");
      console.error(err);
      load(); // revert changes if failed
    }
  };

  const remove = async (projectId) => {
    if (!window.confirm("Delete this project and all tasks?")) return;

    try {
      // Optimistic removal
      setProjects((prev) => prev.filter((p) => p._id !== projectId));
      await api.delete(`/projects/${projectId}`);
    } catch (err) {
      setError("Failed to delete project.");
      console.error(err);
      load(); // reload in case of failure
    }
  };

  if (loading) return <p>Loading projects...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-3">
      <ProjectForm refresh={load} />

      {projects.length === 0 && <p>No projects found.</p>}

      {projects.map((project) => (
        <div
          key={project._id}
          className="flex items-center justify-between px-3 py-2 rounded border border-zinc-800 hover:bg-zinc-900"
        >
          {/* LEFT SIDE (Name / Input) */}
          {editingId === project._id ? (
            <input
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") saveEdit(project._id);
                if (e.key === "Escape") cancelEdit();
              }}
              className="bg-transparent outline-none flex-1"
              autoFocus
              aria-label={`Edit project ${project.name}`}
            />
          ) : (
            <span
              onClick={() => select(project)}
              className="cursor-pointer flex-1"
              title="Click to select project"
            >
              {project.name}
            </span>
          )}

          {/* RIGHT SIDE (Actions) */}
          <div className="flex gap-2 text-sm opacity-70 ml-2">
            <button
              title="Edit"
              onClick={() => startEdit(project)}
              className="hover:opacity-100"
            >
              ✏️
            </button>

            <button
              title="Delete"
              onClick={() => remove(project._id)}
              className="hover:text-red-400"
            >
              🗑
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

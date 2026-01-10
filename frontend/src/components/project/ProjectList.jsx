import { useEffect, useState } from "react";
import api from "../api/api";
import ProjectForm from "./ProjectForm";

export default function ProjectList({ select }) {
  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");

  const load = async () => {
    const res = await api.get("/projects");
    setProjects(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const startEdit = (project) => {
    setEditingId(project._id);
    setEditName(project.name);
  };

  const saveEdit = async (projectId) => {
    if (!editName.trim()) return;
    await api.put(`/projects/${projectId}`, { name: editName });
    setEditingId(null);
    load();
  };

  const remove = async (projectId) => {
    if (!window.confirm("Delete this project and all tasks?")) return;
    await api.delete(`/projects/${projectId}`);
    load();
  };

  return (
    <div className="space-y-3">
      <ProjectForm refresh={load} />

      {projects.map(project => (
        <div
          key={project._id}
          className="flex items-center justify-between px-3 py-2 rounded border border-zinc-800 hover:bg-zinc-900"
        >

          {/* LEFT SIDE (Name / Input) */}
          {editingId === project._id ? (
            <input
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && saveEdit(project._id)}
              className="bg-transparent outline-none flex-1"
              autoFocus
            />
          ) : (
            <span
              onClick={() => select(project)}
              className="cursor-pointer flex-1"
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

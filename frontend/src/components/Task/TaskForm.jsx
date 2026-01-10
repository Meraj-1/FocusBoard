import { useState } from "react";
import api from "../api/api";

export default function TaskForm({ projectId, refresh }) {
  const [title, setTitle] = useState("");

  const submit = async () => {
    if (!title) return;
    await api.post(`/projects/${projectId}/tasks`, { title });
    setTitle("");
    refresh();
  };

  return (
    <div className="mb-4 p-4 border border-zinc-800 rounded-lg bg-zinc-900">
      <p className="text-sm opacity-70 mb-2">Live Caption</p>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && submit()}
        placeholder="Type your task..."
        className="w-full bg-transparent outline-none"
      />
    </div>
  );
}

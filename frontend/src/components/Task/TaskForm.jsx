import { useState } from "react";
import api from "../api/api";

export default function TaskForm({ projectId, refresh }) {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async () => {
    if (!title.trim() || loading) return;

    try {
      setLoading(true);
      setError("");
      await api.post(`/projects/${projectId}/tasks`, {
        title: title.trim(),
      });
      setTitle("");
      refresh();
    } catch {
      setError("Failed to add task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        mb-4 rounded-xl
        border border-zinc-800
        bg-zinc-900
        p-4
        transition
      "
    >
      {/* LABEL */}
      <p className="text-xs uppercase tracking-wider text-zinc-400 mb-2">
        Add task
      </p>

      {/* INPUT ROW */}
      <div className="flex items-center gap-3">
        <input
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (error) setError("");
          }}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="What needs to be done?"
          disabled={loading}
          className="
            flex-1 bg-transparent
            outline-none
            text-sm
            placeholder:text-zinc-500
            disabled:opacity-60
          "
        />

        <button
          onClick={submit}
          disabled={loading || !title.trim()}
          className="
            px-3 py-1.5 rounded-lg text-sm
            border border-zinc-700
            hover:bg-zinc-800
            disabled:opacity-40
            transition
          "
        >
          {loading ? "..." : "Add"}
        </button>
      </div>

      {/* HINT / ERROR */}
      <div className="mt-2 flex justify-between text-xs">
        <span className="text-zinc-500">
          Press Enter to add
        </span>
        {error && (
          <span className="text-red-400">
            {error}
          </span>
        )}
      </div>
    </div>
  );
}

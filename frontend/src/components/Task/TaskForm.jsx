import { useState } from "react";
import api from "../api/api";

const MAX_LENGTH = 120;

export default function TaskForm({ projectId, refresh }) {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e?.preventDefault();
    if (!title.trim() || loading) return;

    try {
      setLoading(true);
      setError("");
      await api.post(`/projects/${projectId}/tasks`, { title: title.trim() });
      setTitle("");
      refresh();
    } catch {
      setError("Failed to add task");
    } finally {
      setLoading(false);
    }
  };

  const isMax = title.length >= MAX_LENGTH;

  return (
    <form
      onSubmit={submit}
      className="mb-4 rounded-xl border border-zinc-800 bg-zinc-900 p-4 transition-colors duration-200 focus-within:border-indigo-500"
    >
      {/* LABEL + COUNTER */}
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs uppercase tracking-wider text-zinc-400">
          Add Task
        </p>
        <span
          className={`text-xs transition-colors duration-200 ${
            isMax ? "text-red-400" : "text-zinc-500"
          }`}
        >
          {title.length}/{MAX_LENGTH}
        </span>
      </div>

      {/* INPUT + BUTTON */}
      <div className="flex items-center gap-3">
        <input
          value={title}
          maxLength={MAX_LENGTH}
          autoFocus
          placeholder="What needs to be done?"
          disabled={loading}
          aria-label="Task title"
          onChange={(e) => {
            setTitle(e.target.value);
            if (error) setError("");
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) submit();
          }}
          className={`
            flex-1 bg-transparent outline-none text-sm placeholder:text-zinc-500 disabled:opacity-60
            border-b border-transparent focus:border-b-2 focus:border-indigo-500 transition-all
          `}
        />

        <button
          type="submit"
          disabled={loading || !title.trim()}
          aria-label="Add task"
          className={`
            px-3 py-1.5 rounded-lg text-sm font-medium border border-zinc-700
            hover:bg-indigo-600 hover:text-white
            focus:outline-none focus:ring-1 focus:ring-indigo-500
            disabled:opacity-40 disabled:cursor-not-allowed
            transition
          `}
        >
          {loading ? <span className="animate-pulse">Adding…</span> : "Add"}
        </button>
      </div>

      {/* HINT / ERROR */}
      <div className="mt-2 flex justify-between text-xs">
        <span className="text-zinc-500 animate-fade-in">
          Press Enter to add • Shift+Enter for new line
        </span>
        {error && (
          <span className="text-red-400 animate-fade-in">{error}</span>
        )}
      </div>
    </form>
  );
}

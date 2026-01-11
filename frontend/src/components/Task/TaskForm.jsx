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
    <form
      onSubmit={submit}
      className="
        mb-4 rounded-xl
        border border-zinc-800
        bg-zinc-900
        p-4
        transition
        focus-within:border-zinc-600
      "
    >
      {/* LABEL */}
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs uppercase tracking-wider text-zinc-400">
          Add task
        </p>
        <span className="text-xs text-zinc-500">
          {title.length}/{MAX_LENGTH}
        </span>
      </div>

      {/* INPUT ROW */}
      <div className="flex items-center gap-3">
        <input
          value={title}
          maxLength={MAX_LENGTH}
          autoFocus
          onChange={(e) => {
            setTitle(e.target.value);
            if (error) setError("");
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || !e.shiftKey)) {
              submit();
            }
          }}
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
          type="submit"
          disabled={loading || !title.trim()}
          className="
            px-3 py-1.5 rounded-lg text-sm
            border border-zinc-700
            hover:bg-zinc-800
            focus:outline-none focus:ring-1 focus:ring-zinc-600
            disabled:opacity-40
            transition
          "
        >
          {loading ? (
            <span className="animate-pulse">Adding…</span>
          ) : (
            "Add"
          )}
        </button>
      </div>

      {/* HINT / ERROR */}
      <div className="mt-2 flex justify-between text-xs">
        <span className="text-zinc-500">
          Press Enter to add • ⌘Enter also works
        </span>
        {error && (
          <span className="text-red-400 animate-fade-in">
            {error}
          </span>
        )}
      </div>
    </form>
  );
}

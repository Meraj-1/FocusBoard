import api from "../api/api";
import { useState } from "react";

export default function TaskItem({ task, projectId, refresh }) {
  const [loading, setLoading] = useState(false);

  const toggle = async () => {
    try {
      setLoading(true);
      await api.put(
        `/api/projects/${projectId}/tasks/${task._id}`,
        {
          status: task.status === "done" ? "todo" : "done",
        }
      );
      refresh();
    } catch (err) {
      console.error("Failed to toggle task:", err);
    } finally {
      setLoading(false);
    }
  };

  const remove = async () => {
    if (!confirm("Are you sure you want to delete this task?")) return;

    try {
      setLoading(true);
      await api.delete(
        `/api/projects/${projectId}/tasks/${task._id}`
      );
      refresh();
    } catch (err) {
      console.error("Failed to delete task:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`
        flex items-center justify-between p-2 mt-1 rounded-lg
        border border-zinc-800 bg-zinc-900
        hover:bg-zinc-800 transition-all duration-200
        ${loading ? "opacity-70 cursor-wait" : "cursor-pointer"}
      `}
    >
      {/* Toggle */}
      <div
        onClick={toggle}
        className="flex items-center gap-2 truncate"
      >
        <div
          className={`
            h-5 w-5 rounded-full border-2
            ${task.status === "done"
              ? "bg-indigo-500 border-indigo-500"
              : "border-zinc-600"}
          `}
        />

        <span
          className={`
            text-sm truncate
            ${task.status === "done"
              ? "line-through text-zinc-500"
              : "text-zinc-100"}
          `}
        >
          {task.title}
        </span>
      </div>

      {/* Delete */}
      <button
        onClick={remove}
        disabled={loading}
        className="text-red-400 hover:text-red-500"
      >
        ❌
      </button>
    </div>
  );
}

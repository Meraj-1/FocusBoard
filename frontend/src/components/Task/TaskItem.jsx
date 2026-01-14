import api from "../api/api";

export default function TaskItem({ task, refresh }) {
  const toggle = async () => {
    try {
      await api.put(`/tasks/${task._id}`, {
        status: task.status === "done" ? "todo" : "done",
      });
      refresh();
    } catch (err) {
      console.error("Failed to toggle task:", err);
    }
  };

  const remove = async () => {
    if (!confirm("Are you sure you want to delete this task?")) return;
    try {
      await api.delete(`/tasks/${task._id}`);
      refresh();
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };

  return (
    <div
      className="
        flex items-center justify-between p-2 mt-1 rounded-lg
        border border-zinc-800 bg-zinc-900
        hover:bg-zinc-800 transition-colors
      "
    >
      <div
        onClick={toggle}
        className="flex items-center gap-2 cursor-pointer select-none"
        aria-label={`Mark task as ${task.status === "done" ? "todo" : "done"}`}
      >
        <div
          className={`
            h-4 w-4 rounded-full border-2 flex-shrink-0 transition-colors
            ${task.status === "done" ? "bg-indigo-500 border-indigo-500" : "border-zinc-600"}
          `}
        ></div>
        <span
          className={`
            text-sm transition-colors
            ${task.status === "done" ? "line-through text-zinc-500" : "text-zinc-100"}
          `}
        >
          {task.title}
        </span>
      </div>

      <button
        onClick={remove}
        className="
          text-red-400 hover:text-red-500 transition-colors
          px-1 rounded
        "
        aria-label="Delete task"
      >
        ❌
      </button>
    </div>
  );
}

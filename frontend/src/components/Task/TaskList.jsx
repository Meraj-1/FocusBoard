import { useEffect, useState } from "react";
import api from "../api/api";
import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem";

export default function TaskList({ projectId }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await api.get(`/projects/${projectId}/tasks`);
      setTasks(res.data);
    } catch {
      setError("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (projectId) load();
  }, [projectId]);

  return (
    <div className="flex flex-col h-full">

      {/* ADD TASK */}
      <TaskForm projectId={projectId} refresh={load} />

      {/* HEADER */}
      <div className="flex items-center justify-between mb-3 px-1">
        <p className="text-xs uppercase tracking-wider text-zinc-400">
          Tasks
        </p>
        <span className="text-xs text-zinc-500">
          {tasks.length}
        </span>
      </div>

      {/* LIST */}
      <div className="flex-1 overflow-y-auto space-y-2 pr-1">

        {loading && (
          <p className="text-sm text-zinc-400 animate-pulse">
            Loading tasks…
          </p>
        )}

        {error && (
          <p className="text-sm text-red-400">
            {error}
          </p>
        )}

        {!loading && tasks.length === 0 && !error && (
          <div className="
            flex flex-col items-center justify-center
            text-zinc-400 text-sm
            py-10
          ">
            <div className="text-2xl mb-2">📝</div>
            <p>No tasks yet</p>
            <p className="text-xs opacity-70">
              Add your first task above
            </p>
          </div>
        )}

        {tasks.map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            refresh={load}
          />
        ))}
      </div>
    </div>
  );
}

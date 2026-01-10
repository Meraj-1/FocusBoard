import { useEffect, useState } from "react";
import api from "../api/api";
import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem";

export default function TaskList({ projectId }) {
  const [tasks, setTasks] = useState([]);

  const load = async () => {
    const res = await api.get(`/projects/${projectId}/tasks`);
    setTasks(res.data);
  };

  useEffect(() => {
    load();
  }, [projectId]);

  return (
    <div className="flex-1 overflow-y-auto">
      <TaskForm projectId={projectId} refresh={load} />
      {tasks.map(task => (
        <TaskItem key={task._id} task={task} refresh={load} />
      ))}
    </div>
  );
}

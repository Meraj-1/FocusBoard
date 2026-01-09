// src/components/Task/TaskList.jsx
import { useEffect, useState } from "react";
import api from "../api/api";

export default function TaskList({ projectId }) {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const fetchTasks = async () => {
    if (!projectId) return;
    const res = await api.get(`/projects/${projectId}/tasks`);
    setTasks(res.data);
  };

  const addTask = async () => {
    if (!newTask) return;
    await api.post(`/projects/${projectId}/tasks`, { title: newTask });
    setNewTask("");
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, [projectId]);

  return (
    <div className="p-4">
      <h3 className="text-lg mb-2">Tasks</h3>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="New Task"
        className="border p-2 rounded mr-2"
      />
      <button onClick={addTask} className="bg-blue-600 text-white p-2 rounded">
        Add
      </button>
      <ul className="mt-2">
        {tasks.map((t) => (
          <li key={t._id} className="p-2 border rounded mb-1">
            {t.title} - {t.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

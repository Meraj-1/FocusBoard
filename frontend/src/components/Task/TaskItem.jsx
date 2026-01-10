import api from "../api/api";

export default function TaskItem({ task, refresh }) {
  const toggle = async () => {
    await api.put(`/tasks/${task._id}`, {
      status: task.status === "done" ? "todo" : "done"
    });
    refresh();
  };

  const remove = async () => {
    await api.delete(`/tasks/${task._id}`);
    refresh();
  };

  return (
    <div className="flex justify-between border p-2 mt-1">
      <span onClick={toggle}
        className={task.status === "done" ? "line-through" : ""}>
        {task.title}
      </span>
      <button onClick={remove}>❌</button>
    </div>
  );
}

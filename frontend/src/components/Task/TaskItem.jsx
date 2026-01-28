// import api from "../api/api";
// import { useState } from "react";

// export default function TaskItem({ task, projectId, refresh }) {
//   const [loading, setLoading] = useState(false);

//   const toggle = async () => {
//     try {
//       setLoading(true);
//       await api.put(
//         `/api/projects/${projectId}/tasks/${task._id}`,
//         {
//           status: task.status === "done" ? "todo" : "done",
//         }
//       );
//       refresh();
//     } catch (err) {
//       console.error("Failed to toggle task:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const remove = async () => {
//     if (!confirm("Are you sure you want to delete this task?")) return;

//     try {
//       setLoading(true);
//       await api.delete(
//         `/api/projects/${projectId}/tasks/${task._id}`
//       );
//       refresh();
//     } catch (err) {
//       console.error("Failed to delete task:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       className={`
//         flex items-center justify-between p-2 mt-1 rounded-lg
//         border border-zinc-800 bg-zinc-900
//         hover:bg-zinc-800 transition-all duration-200
//         ${loading ? "opacity-70 cursor-wait" : "cursor-pointer"}
//       `}
//     >
//       {/* Toggle */}
//       <div
//         onClick={toggle}
//         className="flex items-center gap-2 truncate"
//       >
//         <div
//           className={`
//             h-5 w-5 rounded-full border-2
//             ${task.status === "done"
//               ? "bg-indigo-500 border-indigo-500"
//               : "border-zinc-600"}
//           `}
//         />

//         <span
//           className={`
//             text-sm truncate
//             ${task.status === "done"
//               ? "line-through text-zinc-500"
//               : "text-zinc-100"}
//           `}
//         >
//           {task.title}
//         </span>
//       </div>

//       {/* Delete */}
//       <button
//         onClick={remove}
//         disabled={loading}
//         className="text-red-400 hover:text-red-500"
//       >
//         ❌
//       </button>
//     </div>
//   );
// }


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

  const done = task.status === "done";

  return (
    <div
      className={`
        group flex items-center justify-between gap-3
        p-3 mt-1 rounded-xl
        border border-zinc-800
        bg-zinc-900/70
        hover:bg-zinc-800/70
        transition-all duration-200
        ${loading ? "opacity-60 cursor-wait" : ""}
      `}
    >
      {/* LEFT : TOGGLE */}
      <div
        onClick={toggle}
        className="flex items-center gap-3 truncate cursor-pointer"
      >
        {/* CHECK */}
        <div
          className={`
            relative h-5 w-5 rounded-full border-2
            flex items-center justify-center
            transition-all
            ${
              done
                ? "bg-indigo-500 border-indigo-500"
                : "border-zinc-600 group-hover:border-zinc-400"
            }
          `}
        >
          {done && (
            <span className="text-white text-xs font-bold">✓</span>
          )}
        </div>

        {/* TITLE */}
        <span
          className={`
            text-sm truncate transition-all
            ${
              done
                ? "line-through text-zinc-500"
                : "text-zinc-100 group-hover:text-white"
            }
          `}
        >
          {task.title}
        </span>
      </div>

      {/* RIGHT : DELETE */}
      <button
        onClick={remove}
        disabled={loading}
        aria-label="Delete task"
        className="
          opacity-0 group-hover:opacity-100
          text-zinc-500 hover:text-red-400
          transition-all
          disabled:opacity-30
        "
      >
        ✕
      </button>
    </div>
  );
}

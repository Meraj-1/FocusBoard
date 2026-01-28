// import { useState } from "react";
// import api from "../api/api";

// const MAX_LENGTH = 120;

// export default function TaskForm({ projectId, refresh }) {
//   const [title, setTitle] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const submit = async (e) => {
//     e?.preventDefault();
//     if (!title.trim() || loading) return;

//     try {
//       setLoading(true);
//       setError("");
//       await api.post(`/api/projects/${projectId}/tasks`, { title: title.trim() });
//       // console.log(tasks)
//       setTitle("");
//       refresh();
//     } catch {
//       setError("Failed to add task");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const isMax = title.length >= MAX_LENGTH;

//   return (
//     <form
//       onSubmit={submit}
//       className="mb-4 rounded-xl border border-zinc-800 bg-zinc-900 p-4 transition-colors duration-200 focus-within:border-indigo-500"
//     >
//       {/* LABEL + COUNTER */}
//       <div className="flex items-center justify-between mb-2">
//         <p className="text-xs uppercase tracking-wider text-zinc-400">
//           Add Task
//         </p>
//         <span
//           className={`text-xs transition-colors duration-200 ${
//             isMax ? "text-red-400" : "text-zinc-500"
//           }`}
//         >
//           {title.length}/{MAX_LENGTH}
//         </span>
//       </div>

//       {/* INPUT + BUTTON */}
//       <div className="flex items-center gap-3">
//         <input
//           value={title}
//           maxLength={MAX_LENGTH}
//           autoFocus
//           placeholder="What needs to be done?"
//           disabled={loading}
//           aria-label="Task title"
//           onChange={(e) => {
//             setTitle(e.target.value);
//             if (error) setError("");
//           }}
//           onKeyDown={(e) => {
//             if (e.key === "Enter" && !e.shiftKey) submit();
//           }}
//           className={`
//             flex-1 bg-transparent outline-none text-sm placeholder:text-zinc-500 disabled:opacity-60
//             border-b border-transparent focus:border-b-2 focus:border-indigo-500 transition-all
//           `}
//         />

//         <button
//           type="submit"
//           disabled={loading || !title.trim()}
//           aria-label="Add task"
//           className={`
//             px-3 py-1.5 rounded-lg text-sm font-medium border border-zinc-700
//             hover:bg-indigo-600 hover:text-white
//             focus:outline-none focus:ring-1 focus:ring-indigo-500
//             disabled:opacity-40 disabled:cursor-not-allowed
//             transition
//           `}
//         >
//           {loading ? <span className="animate-pulse">Adding…</span> : "Add"}
//         </button>
//       </div>

//       {/* HINT / ERROR */}
//       <div className="mt-2 flex justify-between text-xs">
//         <span className="text-zinc-500 animate-fade-in">
//           Press Enter to add • Shift+Enter for new line
//         </span>
//         {error && (
//           <span className="text-red-400 animate-fade-in">{error}</span>
//         )}
//       </div>
//     </form>
//   );
// }

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
      await api.post(`/api/projects/${projectId}/tasks`, {
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

  const progress = (title.length / MAX_LENGTH) * 100;
  const isMax = title.length >= MAX_LENGTH;

  return (
    <form
      onSubmit={submit}
      className="
        mb-4 rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4
        transition-all duration-300
        focus-within:border-indigo-500/70
        focus-within:shadow-[0_0_0_1px_rgba(99,102,241,0.4)]
      "
    >
      {/* HEADER */}
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs uppercase tracking-wider text-zinc-400">
          Add Task
        </p>
        <span
          className={`text-xs font-medium ${
            isMax ? "text-red-400" : "text-zinc-500"
          }`}
        >
          {title.length}/{MAX_LENGTH}
        </span>
      </div>

      {/* INPUT ROW */}
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
          className="
            flex-1 bg-transparent outline-none text-sm
            placeholder:text-zinc-500 disabled:opacity-60
            border-b border-zinc-800
            focus:border-indigo-500 focus:border-b-2
            transition-all
          "
        />

        <button
          type="submit"
          disabled={loading || !title.trim()}
          aria-label="Add task"
          className="
            px-4 py-1.5 rounded-lg text-sm font-medium
            border border-zinc-700
            bg-zinc-800/40 text-zinc-200
            hover:bg-indigo-600 hover:text-white hover:border-indigo-500
            active:scale-95
            focus:outline-none focus:ring-2 focus:ring-indigo-500/50
            disabled:opacity-40 disabled:cursor-not-allowed
            transition-all
          "
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full border-2 border-white/40 border-t-white animate-spin" />
              Adding
            </span>
          ) : (
            "Add"
          )}
        </button>
      </div>

      {/* PROGRESS BAR */}
      <div className="mt-2 h-1 w-full rounded bg-zinc-800 overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${
            isMax ? "bg-red-500" : "bg-indigo-500"
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* FOOTER */}
      <div className="mt-2 flex items-center justify-between text-xs">
        <span className="text-zinc-500">
          Enter to add • Shift+Enter for new line
        </span>

        {error && (
          <span className="px-2 py-0.5 rounded-md bg-red-500/10 text-red-400">
            {error}
          </span>
        )}
      </div>
    </form>
  );
}

import { useState } from "react";
import api from "../api/api";

export default function ProjectForm({ refresh }) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async () => {
    if (!name.trim()) {
      setError("Project name required");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await api.post("/projects", { name: name.trim() });
      setName("");
      refresh();
    } catch (err) {
      setError("Failed to create project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-4">
      {/* Input Box */}
      <div className="flex gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="Create new project..."
          disabled={loading}
          className="
            flex-1 px-3 py-2
            bg-zinc-900 text-white
            border border-zinc-800 rounded-lg
            outline-none
            focus:border-zinc-600
            placeholder:text-zinc-500
          "
        />

        <button
          onClick={submit}
          disabled={loading}
          className="
            px-4 py-2 rounded-lg
            border border-zinc-700
            hover:bg-zinc-800
            disabled:opacity-50
            transition
          "
        >
          {loading ? "..." : "Add"}
        </button>
      </div>

      {/* Error */}
      {error && (
        <p className="text-xs text-red-400 mt-1">
          {error}
        </p>
      )}
    </div>
  );
}

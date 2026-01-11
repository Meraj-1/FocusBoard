import { useState } from "react";
import api from "../api/api";

export default function ProjectForm({ refresh }) {
  const [name, setName] = useState("");
  const [logo, setLogo] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (!name.trim()) {
      setError("Project name required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const formData = new FormData();
      formData.append("name", name.trim());
      if (logo) formData.append("logo", logo);

      await api.post("/projects", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // reset
      setName("");
      setLogo(null);
      setPreview(null);
      refresh();
    } catch (err) {
      setError(
        err?.response?.data?.message || "Failed to create project"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleFile = (file) => {
    if (!file.type.startsWith("image/")) {
      setError("Only image files allowed");
      return;
    }
    setLogo(file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <form onSubmit={submit} className="mb-4 space-y-2">
      
      {/* NAME */}
      <input
        autoFocus
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          if (error) setError("");
        }}
        placeholder="Create new project..."
        disabled={loading}
        className="
          w-full px-3 py-2
          bg-zinc-900 text-white
          border border-zinc-800 rounded-lg
          outline-none
          focus:border-zinc-600
          placeholder:text-zinc-500
        "
      />

      {/* LOGO UPLOAD */}
      <div className="flex items-center gap-3">
        <label className="
          px-3 py-1.5 text-sm rounded-md cursor-pointer
          border border-zinc-700
          hover:bg-zinc-800 transition
        ">
          Upload Logo
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => handleFile(e.target.files[0])}
          />
        </label>

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="h-8 w-8 rounded-md object-cover border border-zinc-700"
          />
        )}
      </div>

      {/* SUBMIT */}
      <button
        type="submit"
        disabled={loading}
        className="
          w-full px-4 py-2 rounded-lg
          border border-zinc-700
          hover:bg-zinc-800
          disabled:opacity-50
          transition
        "
      >
        {loading ? "Creating..." : "Add Project"}
      </button>

      {/* ERROR */}
      {error && (
        <p className="text-xs text-red-400">
          {error}
        </p>
      )}
    </form>
  );
}


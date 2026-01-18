import { useState } from "react";
import api from "../api/api";
import { Loader2, ImagePlus } from "lucide-react";

export default function ProjectForm({ refresh }) {
  const [name, setName] = useState("");
  const [logo, setLogo] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (!name.trim()) return setError("Project name required");

    try {
      setLoading(true);
      setError("");

      const formData = new FormData();
      formData.append("name", name.trim());
      if (logo) formData.append("logo", logo);

      await api.post("/api/projects", formData);

      setName("");
      setLogo(null);
      setPreview(null);
      refresh();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create project");
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFile = (file) => {
    if (!file) return;

    if (!file.type.startsWith("image/"))
      return setError("Only image files allowed");

    if (file.size > 1024 * 1024)
      return setError("Logo must be under 1MB");

    setLogo(file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <form
      onSubmit={submit}
      className="mb-4 space-y-3 p-3 rounded-xl bg-zinc-900/70 backdrop-blur border border-zinc-800 shadow"
    >
      {/* NAME */}
      <input
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          if (error) setError("");
        }}
        placeholder="Create new project..."
        disabled={loading}
        className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-sm text-white placeholder:text-zinc-500 outline-none focus:border-indigo-500 transition"
      />

      {/* LOGO UPLOAD */}
      <label className="flex items-center justify-between gap-3 cursor-pointer text-xs border border-zinc-700 rounded-lg px-3 py-2 hover:border-indigo-500 hover:bg-zinc-800/60 transition">
        <div className="flex items-center gap-2">
          <ImagePlus size={14} />
          <span>{preview ? "Change logo" : "Upload logo"}</span>
        </div>

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="h-8 w-8 rounded-md object-cover border border-zinc-700"
          />
        )}

        <input
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => handleFile(e.target.files[0])}
        />
      </label>

      {/* SUBMIT */}
      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 text-sm rounded-lg py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium hover:opacity-90 disabled:opacity-60 transition"
      >
        {loading ? <Loader2 size={16} className="animate-spin" /> : "Add Project"}
      </button>

      {/* ERROR */}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </form>
  );
}

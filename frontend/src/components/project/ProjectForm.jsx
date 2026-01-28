// import { useState } from "react";
// import api from "../api/api";
// import { Loader2, ImagePlus } from "lucide-react";

// export default function ProjectForm({ refresh }) {
//   const [name, setName] = useState("");
//   const [logo, setLogo] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const submit = async (e) => {
//     e.preventDefault();
//     if (loading) return;

//     if (!name.trim()) return setError("Project name required");

//     try {
//       setLoading(true);
//       setError("");

//       const formData = new FormData();
//       formData.append("name", name.trim());
//       if (logo) formData.append("logo", logo);

//       await api.post("/api/projects/create", formData);

//       setName("");
//       setLogo(null);
//       setPreview(null);
//       refresh();
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to create project");
//       console.log(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleFile = (file) => {
//     if (!file) return;

//     if (!file.type.startsWith("image/"))
//       return setError("Only image files allowed");

//     if (file.size > 1024 * 1024)
//       return setError("Logo must be under 1MB");

//     setLogo(file);
//     setPreview(URL.createObjectURL(file));
//   };

//   return (
//     <form
//       onSubmit={submit}
//       className="mb-4 space-y-3 p-3 rounded-xl bg-zinc-900/70 backdrop-blur border border-zinc-800 shadow"
//     >
//       {/* NAME */}
//       <input
//         value={name}
//         onChange={(e) => {
//           setName(e.target.value);
//           if (error) setError("");
//         }}
//         placeholder="Create new project..."
//         disabled={loading}
//         className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-sm text-white placeholder:text-zinc-500 outline-none focus:border-indigo-500 transition"
//       />

//       {/* LOGO UPLOAD */}
//       <label className="flex items-center justify-between gap-3 cursor-pointer text-xs border border-zinc-700 rounded-lg px-3 py-2 hover:border-indigo-500 hover:bg-zinc-800/60 transition">
//         <div className="flex items-center gap-2">
//           <ImagePlus size={14} />
//           <span>{preview ? "Change logo" : "Upload logo"}</span>
//         </div>

//         {preview && (
//           <img
//             src={preview}
//             alt="Preview"
//             className="h-8 w-8 rounded-md object-cover border border-zinc-700"
//           />
//         )}

//         <input
//           type="file"
//           accept="image/*"
//           hidden
//           onChange={(e) => handleFile(e.target.files[0])}
//         />
//       </label>

//       {/* SUBMIT */}
//       <button
//         type="submit"
//         disabled={loading}
//         className="w-full flex items-center justify-center gap-2 text-sm rounded-lg py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium hover:opacity-90 disabled:opacity-60 transition"
//       >
//         {loading ? <Loader2 size={16} className="animate-spin" /> : "Add Project"}
//       </button>

//       {/* ERROR */}
//       {error && <p className="text-xs text-red-400">{error}</p>}
//     </form>
//   );
// }
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

      await api.post("/api/projects/create", formData);

      setName("");
      setLogo(null);
      setPreview(null);
      refresh();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create project");
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
      className="
        mb-4 space-y-4 p-4 rounded-2xl
        bg-zinc-900/80 backdrop-blur
        border border-zinc-800
        focus-within:border-indigo-500/60
        transition-all
      "
    >
      {/* TITLE */}
      <p className="text-xs uppercase tracking-wider text-zinc-400">
        New Project
      </p>

      {/* NAME INPUT */}
      <input
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          if (error) setError("");
        }}
        placeholder="Project name"
        disabled={loading}
        className="
          w-full px-3 py-2 rounded-lg
          bg-zinc-950 border border-zinc-800
          text-sm text-white placeholder:text-zinc-500
          outline-none
          focus:border-indigo-500
          transition
        "
      />

      {/* LOGO UPLOAD */}
      <label
        className="
          group flex items-center justify-between gap-3
          cursor-pointer
          text-xs text-zinc-300
          border border-dashed border-zinc-700
          rounded-xl px-3 py-3
          hover:border-indigo-500 hover:bg-zinc-800/50
          transition
        "
      >
        <div className="flex items-center gap-2">
          <ImagePlus size={14} className="text-zinc-400 group-hover:text-indigo-400" />
          <span>{preview ? "Change logo" : "Upload logo (optional)"}</span>
        </div>

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="
              h-9 w-9 rounded-lg object-cover
              border border-zinc-700
            "
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
        className="
          w-full flex items-center justify-center gap-2
          text-sm font-medium rounded-xl py-2.5
          bg-gradient-to-r from-indigo-500 to-purple-600
          text-white
          hover:opacity-90
          active:scale-[0.98]
          disabled:opacity-60
          transition-all
        "
      >
        {loading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Creating…
          </>
        ) : (
          "Create Project"
        )}
      </button>

      {/* ERROR */}
      {error && (
        <div className="
          text-xs text-red-400
          bg-red-500/10 border border-red-500/20
          rounded-lg px-3 py-2
        ">
          {error}
        </div>
      )}
    </form>
  );
}

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
  const firstLetter = name?.trim()?.[0]?.toUpperCase();
  const nameLength = name.trim().length;
  const [holding, setHolding] = useState(false);
  const canSubmit = name.trim().length > 0 && !loading;

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
    relative mb-6 space-y-5 p-5 rounded-3xl
    bg-gradient-to-br from-zinc-900/90 via-zinc-900/70 to-zinc-950
    backdrop-blur-xl
    border border-zinc-800/70
    shadow-lg shadow-black/30
    focus-within:border-indigo-500/60
    focus-within:ring-1 focus-within:ring-indigo-500/30
    transition-all
  "
>
  {/* TITLE */}
  <p className="text-[11px] uppercase tracking-widest text-zinc-400">
    New Project
  </p>

  {/* NAME INPUT */}
  <div className="space-y-2">
    <input
      value={name}
      onChange={(e) => {
        setName(e.target.value);
        if (error) setError("");
      }}
      placeholder="Project name"
      disabled={loading}
      className="
        w-full px-4 py-2.5 rounded-xl
        bg-zinc-950/80
        border border-zinc-800
        text-sm text-white placeholder:text-zinc-500
        outline-none
        focus:border-indigo-500
        focus:ring-2 focus:ring-indigo-500/30
        disabled:opacity-60
        transition-all
      "
    />

    {/* NAME INTELLIGENCE BAR */}
    <div className="h-1.5 w-full rounded-full bg-zinc-800 overflow-hidden">
      <div
        className={`
          h-full transition-all
          ${nameLength === 0 && "w-0"}
          ${nameLength > 0 && nameLength < 3 && "w-1/4 bg-zinc-500"}
          ${nameLength >= 3 && nameLength <= 20 && "w-3/4 bg-indigo-500"}
          ${nameLength > 20 && "w-full bg-amber-500"}
        `}
      />
    </div>

    <p className="text-[10px] text-zinc-500">
      {nameLength === 0 && "Give your project a short, clear name"}
      {nameLength > 0 && nameLength < 3 && "Too short"}
      {nameLength >= 3 && nameLength <= 20 && "Looks perfect"}
      {nameLength > 20 && "Too long, consider shortening"}
    </p>
  </div>

  {/* LOGO UPLOAD / SMART AVATAR */}
  <label
    className="
      group relative flex items-center justify-between gap-4
      cursor-pointer
      text-xs text-zinc-300
      border border-dashed border-zinc-700
      rounded-2xl px-4 py-4
      bg-zinc-950/40
      hover:border-indigo-500
      hover:bg-indigo-500/5
      transition-all
    "
  >
    <div className="flex items-center gap-3">
      {/* AUTO AVATAR */}
      <div className="
        flex h-10 w-10 items-center justify-center
        rounded-xl
        bg-gradient-to-br from-indigo-500 to-purple-600
        text-white font-semibold text-sm
      ">
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="h-full w-full rounded-xl object-cover"
          />
        ) : (
          firstLetter || "+"
        )}
      </div>

      <span className="leading-tight">
        {preview ? "Change logo" : "Upload logo"}
        <span className="block text-[10px] text-zinc-500">
          PNG, JPG up to 2MB
        </span>
      </span>
    </div>

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
    disabled={loading || !name.trim()}
    className="
      relative w-full flex items-center justify-center gap-2
      text-sm font-semibold rounded-2xl py-3
      bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
      text-white
      shadow-lg shadow-indigo-500/25
      hover:shadow-xl hover:shadow-indigo-500/40
      active:scale-[0.97]
      disabled:opacity-50 disabled:shadow-none
      transition-all
    "
  >
    {loading ? (
      <>
        <Loader2 size={16} className="animate-spin" />
        Creating…
      </>
    ) : name ? (
      `Create “${name.trim()}”`
    ) : (
      "Name your project"
    )}
  </button>

  {/* ERROR */}
  {error && (
    <div className="
      text-xs text-red-400
      bg-red-500/10
      border border-red-500/20
      rounded-xl px-4 py-2
      animate-in fade-in slide-in-from-top-1
    ">
      {error}
    </div>
  )}
</form>


  );
}

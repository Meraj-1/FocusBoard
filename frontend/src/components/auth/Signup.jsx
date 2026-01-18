import { useState, useContext } from "react";
import { Eye, EyeOff, Mail, Lock, User, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../api/api";

export default function Signup() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const passwordStrength = () => {
    if (password.length < 6) return "Weak";
    if (password.match(/[A-Z]/) && password.match(/[0-9]/)) return "Strong";
    return "Medium";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password || !confirm)
      return setError("Please fill all fields");

    if (password !== confirm)
      return setError("Passwords do not match");

    try {
      setLoading(true);
      const res = await api.post("/signup", { name, email, password });

      login(res.data.data.user, res.data.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-zinc-950 text-zinc-100">

      <div className="w-full max-w-5xl grid md:grid-cols-2 rounded-2xl overflow-hidden shadow-2xl border border-zinc-800">

        {/* LEFT */}
        <div className="p-10 bg-zinc-900/80 backdrop-blur flex flex-col justify-center">
          <div className="max-w-sm mx-auto w-full">

            {/* BRAND */}
            <div className="flex items-center gap-2 mb-8">
              <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500" />
              <span className="text-lg font-semibold">FocusBoard</span>
            </div>

            <p className="text-xs text-zinc-400 uppercase tracking-wide mb-1">
              Get Started
            </p>
            <h1 className="text-2xl font-semibold mb-2">
              Create your account
            </h1>
            <p className="text-sm text-zinc-500 mb-8">
              Join and manage your projects efficiently.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* NAME */}
              <div>
                <label className="text-xs text-zinc-400">Full Name</label>
                <div className="relative mt-2">
                  <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full bg-zinc-800 rounded-lg pl-9 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div>
                <label className="text-xs text-zinc-400">Email</label>
                <div className="relative mt-2">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    className="w-full bg-zinc-800 rounded-lg pl-9 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <label className="text-xs text-zinc-400">Password</label>
                <div className="relative mt-2">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-zinc-800 rounded-lg pl-9 pr-10 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <p className="text-[10px] text-zinc-500 mt-1">
                  Strength: {passwordStrength()}
                </p>
              </div>

              {/* CONFIRM */}
              <div>
                <label className="text-xs text-zinc-400">Confirm Password</label>
                <div className="relative mt-2">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-zinc-800 rounded-lg pl-9 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {error && (
                <p className="text-xs text-red-400 bg-red-500/10 p-2 rounded">
                  {error}
                </p>
              )}

              <button
                disabled={loading}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-sm font-medium text-white hover:opacity-90 transition flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : "Create Account"}
              </button>
            </form>

            <p className="mt-6 text-xs text-zinc-500 text-center">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/")}
                className="text-indigo-400 hover:underline cursor-pointer"
              >
                Login
              </span>
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white text-center p-10">
          <div>
            <h2 className="text-3xl font-bold">Build Better Habits ⚡</h2>
            <p className="text-sm opacity-80 mt-2">
              Create projects, track progress and stay focused.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

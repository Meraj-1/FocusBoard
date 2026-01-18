import { useState, useContext } from "react";
import { Eye, EyeOff, Mail, Lock, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) return setError("Please fill all fields");

    try {
      setLoading(true);
      const res = await api.post("/auth/login", { email, password });

      login(res.data.user, res.data.token, remember);
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Login failed. Please check credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4 text-zinc-100">
      <div className="w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl border border-zinc-800 grid md:grid-cols-2">

        {/* LEFT */}
        <div className="p-10 flex flex-col justify-center backdrop-blur bg-zinc-900/80">
          <div className="max-w-sm mx-auto w-full">

            {/* BRAND */}
            <div className="flex items-center gap-2 mb-8">
              <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500" />
              <span className="text-lg font-semibold tracking-wide">FocusBoard</span>
            </div>

            <p className="text-xs text-zinc-400 uppercase tracking-wider mb-1">
              Welcome back
            </p>
            <h1 className="text-2xl font-semibold mb-2">
              Sign in to your workspace
            </h1>
            <p className="text-sm text-zinc-500 mb-8">
              Manage your projects and stay productive.
            </p>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* EMAIL */}
              <div>
                <label className="text-xs text-zinc-400">Email</label>
                <div className="relative mt-2">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-lg bg-zinc-800 pl-9 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
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
                    className="w-full rounded-lg bg-zinc-800 pl-9 pr-10 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-zinc-500 hover:text-white"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* REMEMBER + FORGOT */}
              <div className="flex items-center justify-between text-xs text-zinc-500">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={() => setRemember(!remember)}
                    className="accent-indigo-500"
                  />
                  Remember me
                </label>
                <span
                  onClick={() => navigate("/forgot")}
                  className="hover:text-indigo-400 cursor-pointer"
                >
                  Forgot password?
                </span>
              </div>

              {/* ERROR */}
              {error && (
                <p className="text-xs text-red-400 bg-red-500/10 p-2 rounded">
                  {error}
                </p>
              )}

              {/* BUTTON */}
              <button
                disabled={loading}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-sm font-medium text-white hover:opacity-90 transition flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="animate-spin" size={16} /> : "Login"}
              </button>
            </form>

            {/* SIGNUP */}
            <p className="mt-6 text-xs text-zinc-500 text-center">
              Don’t have an account?{" "}
              <span
                onClick={() => navigate("/signup")}
                className="text-indigo-400 hover:underline cursor-pointer"
              >
                Create one
              </span>
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="hidden md:flex bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 items-center justify-center relative">
          <div className="text-center text-white space-y-3 px-6">
            <h2 className="text-3xl font-bold">Stay Focused</h2>
            <p className="text-sm opacity-80">
              Track progress, manage tasks, and build better habits.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

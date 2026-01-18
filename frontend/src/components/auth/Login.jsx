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
      const res = await api.post("/api/auth/login", { email, password });
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
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">

        {/* LEFT — FORM */}
        <div className="flex items-center px-8 py-12">
          <div className="w-full max-w-md mx-auto">

            {/* BRAND */}
            <div className="mb-10">
              <div className="h-10 w-10 rounded-lg bg-indigo-600 mb-4" />
              <h1 className="text-2xl font-semibold text-slate-900">
                FocusBoard
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Sign in to continue to your workspace
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* EMAIL */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Email address
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full rounded-md border border-slate-300 pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-md border border-slate-300 pl-9 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* OPTIONS */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-slate-600">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={() => setRemember(!remember)}
                    className="accent-indigo-600"
                  />
                  Remember me
                </label>

                <button
                  type="button"
                  onClick={() => navigate("/forgot")}
                  className="text-indigo-600 hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              {/* ERROR */}
              {error && (
                <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
                  {error}
                </div>
              )}

              {/* BUTTON */}
              <button
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 rounded-md bg-indigo-600 py-3 text-sm font-medium text-white hover:bg-indigo-700 transition disabled:opacity-60"
              >
                {loading && <Loader2 size={16} className="animate-spin" />}
                Sign in
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-slate-600">
              Don’t have an account?{" "}
              <span
                onClick={() => navigate("/signup")}
                className="text-indigo-600 font-medium hover:underline cursor-pointer"
              >
                Create one
              </span>
            </p>
          </div>
        </div>

        {/* RIGHT — IMAGE */}
        <div className="hidden md:block relative">
          <img
            src="/assets/pattern-c.png"
            alt="Workspace"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-indigo-900/30" />

          {/* IMAGE TEXT */}
          <div className="relative z-10 h-full flex items-center justify-center px-10 text-white">
            <div className="max-w-sm text-center">
              <h2 className="text-3xl font-semibold mb-3">
                Work. Track. Grow.
              </h2>
              <p className="text-sm opacity-90">
                FocusBoard helps teams stay aligned and productive every day.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

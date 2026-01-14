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
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/signup", { name, email, password });

      // Save user + token
      login(res.data.data.user, res.data.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.error("Signup Error:", err.response?.data || err);
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-4xl bg-white grid grid-cols-1 md:grid-cols-2 overflow-hidden">

        {/* LEFT – SIGNUP FORM */}
        <div className="flex items-center justify-center px-8 py-12">
          <div className="w-full max-w-sm">
            {/* Brand */}
            <div className="flex items-center gap-2 mb-8">
              <div className="w-9 h-9 rounded-lg bg-orange-200" />
              <span className="text-lg font-semibold text-gray-700">uBrand</span>
            </div>

            <p className="text-sm text-gray-400 mb-1">GET STARTED 🚀</p>
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">Create your account</h1>
            <p className="text-sm text-gray-400 mb-8">Join us and start managing everything in one place.</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label className="text-xs font-medium text-gray-400">NAME</label>
                <div className="relative mt-2">
                  <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-lg bg-gray-100 pl-9 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-gray-300"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="text-xs font-medium text-gray-400">EMAIL</label>
                <div className="relative mt-2">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    placeholder="johndoe@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg bg-gray-100 pl-9 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-gray-300"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="text-xs font-medium text-gray-400">PASSWORD</label>
                <div className="relative mt-2">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-lg bg-gray-100 pl-9 pr-10 py-3 text-sm outline-none focus:ring-2 focus:ring-gray-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-400"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && <p className="text-xs text-red-500 bg-red-50 p-2 rounded-md">{error}</p>}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-gray-800 py-3 text-sm font-medium text-white hover:bg-gray-900 transition flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : "CREATE ACCOUNT →"}
              </button>
            </form>

            <p className="mt-6 text-xs text-gray-400 text-center">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/")}
                className="font-semibold text-gray-700 cursor-pointer hover:underline"
              >
                Login
              </span>
            </p>
          </div>
        </div>

        {/* RIGHT – IMAGE */}
        <div className="hidden md:flex items-center justify-center">
          <img
            src="/assets/pattern-c.png"
            alt="Signup illustration"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

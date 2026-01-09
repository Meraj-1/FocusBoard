import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function LoginExact() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-white">
      {/* LEFT – AUTH FORM */}
      <div className="flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          {/* Brand */}
          <div className="flex items-center gap-2 mb-10">
            <div className="w-8 h-8 rounded-md bg-orange-200" />
            <span className="text-lg font-semibold text-gray-700">uBrand</span>
          </div>

          <p className="text-sm text-gray-400 mb-1">WELCOME BACK 👋</p>
          <h1 className="text-2xl font-semibold text-gray-800 mb-8">
            Continue to your Account.
          </h1>

          {/* FORM */}
          <form className="space-y-5">
            <div>
              <label className="text-xs font-medium text-gray-400">EMAIL</label>
              <input
                type="email"
                placeholder="johndoe@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full rounded-lg bg-gray-100 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-gray-300"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-gray-400">PASSWORD</label>
              <div className="relative mt-2">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg bg-gray-100 px-4 py-3 pr-10 text-sm outline-none focus:ring-2 focus:ring-gray-300"
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

            <button
              type="submit"
              className="w-full rounded-lg bg-gray-800 py-3 text-sm font-medium text-white hover:bg-gray-900 transition"
            >
              CONTINUE →
            </button>
          </form>

          <p className="mt-6 text-xs text-gray-400">
            Are you a Newbie?{" "}
            <span className="font-semibold text-gray-700 cursor-pointer">
              GET STARTED – IT’S FREE
            </span>
          </p>
        </div>
      </div>

      {/* RIGHT – PATTERN PANEL */}
      <div className="hidden md:flex items-center justify-center bg-white">
        <div className="grid grid-cols-4 gap-6">
          {[...Array(16)].map((_, i) => (
            <div
              key={i}
              className={`w-24 h-24 rounded-3xl shadow-sm ${
                i % 4 === 0
                  ? "bg-orange-300"
                  : i % 4 === 1
                  ? "bg-teal-400"
                  : i % 4 === 2
                  ? "bg-sky-200"
                  : "bg-orange-200"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

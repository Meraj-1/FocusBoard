import { useState } from "react";
import Signup from "../auth/Signup";
import Login from "../auth/Login";

export default function Home() {
  const [showSignup, setShowSignup] = useState(true); // true = show Signup, false = show Login

  return (
    <div className="flex flex-col items-center mt-20 gap-6">
      <div className="flex gap-4">
        <button
          onClick={() => setShowSignup(true)}
          className={`px-4 py-2 rounded ${
            showSignup ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Signup
        </button>
        <button
          onClick={() => setShowSignup(false)}
          className={`px-4 py-2 rounded ${
            !showSignup ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Login
        </button>
      </div>

      <div className="mt-6">
        {showSignup ? <Signup /> : <Login />}
      </div>
    </div>
  );
}

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider, AuthContext } from "./components/context/AuthContext";
import Home from "./components/pages/Home";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import Dashboard from "./components/pages/Dashboard";
import { useContext } from "react";

function AppContent() {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      {user ? (
        <Route path="/*" element={<Dashboard />} />
      ) : (
        <>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </>
      )}
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
   <Route
  path="/dashboard"
  element={user ? <Dashboard /> : <Navigate to="/login" />}
/>

      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
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

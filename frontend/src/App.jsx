import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/context/AuthContext";
import { Navigate } from "react-router-dom";
import Home from "./components/pages/Home";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import Dashboard from "./components/pages/Dashboard";

import ProtectedRoute from "./components/routes/ProtectedRoute"
import PublicRoute from "./components/routes/PublicRoute";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>

          {/* Public routes */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />

          {/* Protected route */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Optional homepage */}
         <Route path="/" element={<Navigate to="/login" />} />

        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;

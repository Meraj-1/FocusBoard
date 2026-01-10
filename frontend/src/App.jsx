import { useContext } from "react";
import { AuthContext, AuthProvider } from "./components/context/AuthContext";
import Home from "./components/pages/Home";
import Dashboard from "./components/pages/Dashboard";

function AppContent() {
  const { user } = useContext(AuthContext);
  return user ? <Dashboard /> : <Home />;
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

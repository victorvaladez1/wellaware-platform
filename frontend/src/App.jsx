import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MaintenanceLogs from "./pages/MaintenanceLogs";
import AddMaintenanceLog from "./pages/AddMaintenanceLog";
import WellDetails from "./pages/WellDetails";
import WellsList from "./pages/WellsList";
import AddWell from "./pages/AddWell";
import EditWell from "./pages/EditWell";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

function AppRoutes() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  return (
    <>
      {!isLoginPage && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/maintenance" element={<MaintenanceLogs />} />
        <Route
          path="/add-maintenance"
          element={
            <ProtectedRoute>
              <AddMaintenanceLog />
            </ProtectedRoute>
          }
        />
        <Route path="/well/:id" element={<WellDetails />} />
        <Route path="/wells" element={<WellsList />} />
        <Route
          path="/wells/new"
          element={
            <ProtectedRoute>
              <AddWell />
            </ProtectedRoute>
          }
        />
        <Route
          path="/well/:id/edit"
          element={
            <ProtectedRoute>
              <EditWell />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;

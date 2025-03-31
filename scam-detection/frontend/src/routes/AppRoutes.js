import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import LoginPage from "../pages/LoginPage";
import Dashboard from "../pages/Dashboard";
import Register from "../pages/Register";
import Transactions from "../pages/Transactions";
import ProtectedRoute from "../components/ProtectedRoute";


const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
        </Route>

        {/* Catch-all route */}
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
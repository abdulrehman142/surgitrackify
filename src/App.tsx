import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import PatientsPage from "./pages/PatientsPage";
import LiveTrackingPage from "./pages/LiveTrackingPage";
import OperatingRoomsPage from "./pages/OperatingRoomsPage";
import ReportsAnalyticsPage from "./pages/ReportsAnalyticsPage";
import AIInsightsPage from "./pages/AIInsightsPage";
import SettingsPage from "./pages/SettingsPage";
import MobileAppPreview from "./pages/MobileAppPreview";

const App = () => {
  return (
    <AppProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Dashboard />} />
          <Route path="/patients" element={<PatientsPage />} />
          <Route path="/tracking" element={<LiveTrackingPage />} />
          <Route path="/rooms" element={<OperatingRoomsPage />} />
          <Route path="/reports" element={<ReportsAnalyticsPage />} />
          <Route path="/ai" element={<AIInsightsPage />} />
          <Route path="/mobile" element={<MobileAppPreview />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppProvider>
  );
};

export default App;

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { loadUserFromLocalStorage } from "@/utils/CheckAuthState";

// Pages
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import OTPVerificationPage from "./pages/OTPVerificationPage";
import HomeScreen from "./pages/HomeScreen";
import AddServiceScreen from "./pages/AddServiceScreen";
import MyServicesScreen from "./pages/MyServicesScreen";
import ProfileScreen from "./pages/ProfileScreen";
import ServiceDetailScreen from "./pages/ServiceDetailScreen";

// Routes
import PublicRoute from "./store/PublicRoute";
import ProtectedRoute from "./store/ProtectedRoute";

// Shared UI
import Navbar from "./components/common/Navbar";
import Navigation from "./components/common/Navigation";
import ContactPreferencesModal from "./components/modals/ContactPreferencesModal";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    loadUserFromLocalStorage(dispatch);
  }, [dispatch]);

  const isAuthenticated = useSelector((state) => !!state.user.currentUser);
  const [showContactPreferences, setShowContactPreferences] = useState(false);

  const handleTabChange = (tabId) => {
    switch (tabId) {
      case "home":
        navigate("/home");
        break;
      case "add":
        navigate("/create");
        break;
      case "my-services":
        navigate("/my-services");
        break;
      case "profile":
        navigate("/profile");
        break;
      default:
        navigate("/home");
    }
  };

  const getActiveTab = () => {
    const pathname = location.pathname;
    if (pathname === "/home") return "home";
    if (pathname === "/create") return "add";
    if (pathname === "/my-services") return "my-services";
    if (pathname === "/profile") return "profile";
    return "home";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FF7F00]/5 via-white to-[#FF7F00]/10">
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <LandingPage onGetStarted={() => <Navigate to="/login" />} />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />
        <Route
          path="/email-verification"
          element={
            <PublicRoute>
              <OTPVerificationPage
                onVerificationSuccess={() => navigate("/home")}
              />
            </PublicRoute>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomeScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <AddServiceScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-services"
          element={
            <ProtectedRoute>
              <MyServicesScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/service/detail/:id"
          element={
            <ProtectedRoute>
              <ServiceDetailScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfileScreen />
            </ProtectedRoute>
          }
        />
      </Routes>

      {isAuthenticated && (
        <Navigation activeTab={getActiveTab()} onTabChange={handleTabChange} />
      )}

      <ContactPreferencesModal
        isOpen={showContactPreferences}
        onClose={() => setShowContactPreferences(false)}
      />
    </div>
  );
}

export default function AppRouter() {
  return (
    <Router>
      <Toaster position="top-right" reverseOrder={false} />
      <App />
    </Router>
  );
}

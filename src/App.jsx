import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
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

// Routes
import PublicRoute from "./store/PublicRoute";
import ProtectedRoute from "./store/ProtectedRoute";

// Shared UI
import Navbar from "./components/common/Navbar";
import Navigation from "./components/common/Navigation";
import ContactPreferencesModal from "./components/modals/ContactPreferencesModal";

export default function AppRouter() {
  const dispatch = useDispatch();
  useEffect(() => {
    loadUserFromLocalStorage(dispatch);
  }, [dispatch]);

  const isAuthenticated = useSelector((state) => !!state.user.currentUser);
  const [showContactPreferences, setShowContactPreferences] = useState(false);

  return (
    <Router>
      {isAuthenticated && <Navbar />}
      <Toaster position="top-right" reverseOrder={false} />
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
                <HomeScreen
                  onServiceSelect={() => {}}
                  onUserProfileView={() => {}}
                />
              </ProtectedRoute>
            }
          />
        </Routes>

        {isAuthenticated && (
          <Navigation activeTab={"home"} onTabChange={() => {}} />
        )}

        <ContactPreferencesModal
          isOpen={showContactPreferences}
          onClose={() => setShowContactPreferences(false)}
        />
      </div>
    </Router>
  );
}

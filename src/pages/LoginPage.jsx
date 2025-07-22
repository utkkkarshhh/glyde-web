import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Sparkles } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "@/actions/authActions";
import { parseApiError } from "@/utils/parseApiError";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "@/redux/user/userSlice";
import { login } from "@/redux/auth/authSlice";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);

  const redirectToEmailOTPVerification = () => {
    navigate("/email-verification", {
      state: {
        email: formData.email,
        isSignIn: true,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      email: formData.email,
      password: formData.password,
    };
    try {
      dispatch(signInStart());
      const { success, token, user_details, errors } = await loginUser(payload);
      console.log(user_details.is_email_verified);
      if (!user_details.is_email_verified) {
        redirectToEmailOTPVerification()
        return;
      }
      if (success && token) {
        toast.success("Login Successful!");
        localStorage.setItem("authToken", token);
        localStorage.setItem("currentUser", JSON.stringify(user_details));
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        dispatch(signInSuccess({ user_details }));
        dispatch(login(user_details));
        setFormData({ email: "", password: "" });
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else {
        dispatch(signInFailure(errors?.[0] || "Login failed"));
        if (Array.isArray(errors)) {
          errors.forEach((msg) => toast.error(msg));
        } else {
          toast.error("Login failed");
        }
      }
    } catch (error) {
      localStorage.removeItem("authToken");
      delete axios.defaults.headers.common["Authorization"];
      const parsedError = parseApiError(error);
      dispatch(signInFailure(parsedError));
      toast.error(parsedError);
    }
  };

  const redirectToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-br from-pink-400/10 to-orange-400/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <Card className="w-full max-w-md relative z-10 border-0 shadow-2xl bg-white/80 backdrop-blur-md">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center mb-4 animate-bounce">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
            Welcome Back! 👋
          </CardTitle>
          <p className="text-gray-600 mt-2">
            Time to connect with your campus community! 🚀
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                type="email"
                placeholder="Your @college.edu email 📧"
                className="pl-10 border-2 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password 🔒"
                className="pl-10 pr-10 border-2 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>

            <div className="text-right">
              <a
                href="#"
                className="text-sm text-orange-500 hover:text-orange-600"
              >
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white py-3 text-lg font-semibold"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"} ✨
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={redirectToRegister}
              className="text-orange-500 hover:text-orange-600 font-semibold"
            >
              New here? Join the community! 🎉
            </button>
          </div>

          {/* Fun stats */}
          <div className="mt-6 grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-orange-500">10K+</div>
              <div className="text-xs text-gray-600">Students</div>
            </div>
            <div>
              <div className="text-lg font-bold text-pink-500">50+</div>
              <div className="text-xs text-gray-600">Universities</div>
            </div>
            <div>
              <div className="text-lg font-bold text-purple-500">4.9★</div>
              <div className="text-xs text-gray-600">Rating</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

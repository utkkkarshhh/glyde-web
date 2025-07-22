import { useState, useEffect } from "react";
import {
  Mail,
  Lock,
  User,
  GraduationCap,
  Eye,
  EyeOff,
  Sparkles,
  Heart,
  Zap,
  Loader2,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Checkbox } from "../components/ui/checkbox";
import { registerToken } from "../constants/constants";
import { registerUser } from "@/actions/authActions";
import { parseApiError } from "@/utils/parseApiError";
import { getUniversityMaster } from "@/actions/masterActions";
import { Link, useNavigate } from "react-router-dom";

const NavigationLoader = () => (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
    <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-sm mx-4 text-center">
      <div className="relative mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center mx-auto animate-pulse">
          <Loader2 className="w-8 h-8 text-white animate-spin" />
        </div>
        <div className="absolute -inset-2 bg-gradient-to-r from-orange-500/20 to-pink-500/20 rounded-full blur-md animate-pulse"></div>
      </div>

      <h3 className="text-xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent mb-2">
        Account Created! 🎉
      </h3>

      <p className="text-gray-600 mb-4">
        Redirecting you for OTP verification...
      </p>

      <div className="flex items-center justify-center space-x-2 text-orange-500">
        <span className="text-sm">Hold on!</span>
        <ArrowRight
          className="w-4 h-4 animate-bounce"
          style={{ animationDirection: "alternate" }}
        />
      </div>

      <div className="mt-4">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-orange-500 to-pink-500 h-2 rounded-full animate-pulse"
            style={{ width: "100%" }}
          ></div>
        </div>
      </div>
    </div>
  </div>
);

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showSchoolDropdown, setShowSchoolDropdown] = useState(false);
  const [allUniversities, setAllUniversities] = useState([]);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showNavigationLoader, setShowNavigationLoader] = useState(false);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    schoolId: null,
    schoolName: "",
    major: "",
  });

  const cleanFormData = () => {
    setFormData({
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      schoolId: null,
      schoolName: "",
      major: "",
    });
    setAcceptedTerms(false);
  };

  const redirectToLogin = () => {
    navigate("/login");
  };

  const redirectToEmailOTPVerification = () => {
    navigate("/email-verification", {
      state: {
        email: formData.email,
        isSignUp: true,
      },
    });
  };

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await getUniversityMaster();
        const universities = response?.data || [];
        setAllUniversities(universities);
      } catch (error) {
        console.error("Failed to fetch universities:", error);
      }
    };

    fetchUniversities();
  }, []);

  const handleSchoolSelect = (school) => {
    setFormData((prev) => ({
      ...prev,
      schoolId: school.id,
      schoolName: school.name,
    }));
    setShowSchoolDropdown(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!acceptedTerms) {
      toast.error("Please accept the Terms and Conditions to continue");
      return;
    }

    if (!formData.schoolId) {
      toast.error("Please select a valid university from the dropdown.");
      return;
    }

    setIsSubmitting(true);

    const payload = {
      token: registerToken,
      email: formData.email,
      password: formData.password,
      first_name: formData.firstName,
      last_name: formData.lastName,
      university: formData.schoolId,
      major: formData.major,
      is_t_and_c_accepted: true,
    };

    try {
      const { success, message } = await registerUser(payload);
      if (success) {
        toast.success(message);
        cleanFormData();
        setShowNavigationLoader(true);
        setTimeout(() => {
          setShowNavigationLoader(false);
          redirectToEmailOTPVerification();
        }, 2000);
      }
    } catch (error) {
      const parsedError = parseApiError(error);
      toast.error(parsedError);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
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
              Join the Glyde Fam! 🎉
            </CardTitle>
            <p className="text-gray-600 mt-2">
              Ready to level up your campus game? Let's get you started! ✨
            </p>
            <Badge className="mx-auto mt-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0">
              <Heart className="w-3 h-3 mr-1" />
              Free Forever
            </Badge>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <InputField
                  icon={User}
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={(val) =>
                    setFormData({ ...formData, firstName: val })
                  }
                />
                <InputField
                  icon={User}
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={(val) =>
                    setFormData({ ...formData, lastName: val })
                  }
                />
              </div>

              {/* Read-only University Dropdown */}
              <div className="relative">
                <GraduationCap className="absolute left-3 top-5 h-4 w-4 text-gray-400 z-10" />
                <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400 z-10" />
                <button
                  type="button"
                  className="w-  pl-10 pr-10 py-3 text-left border-2 rounded-md bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  onClick={() => setShowSchoolDropdown(!showSchoolDropdown)}
                >
                  <span
                    className={
                      formData.schoolName ? "text-black" : "text-gray-500"
                    }
                  >
                    {formData.schoolName || "Select your university... 🎓"}
                  </span>
                </button>

                {showSchoolDropdown && allUniversities.length > 0 && (
                  <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-20 mt-1 max-h-48 overflow-y-auto">
                    {allUniversities.map((school) => (
                      <button
                        key={school.id}
                        type="button"
                        className="w-full text-left px-4 py-2 hover:bg-orange-50 hover:text-orange-600 border-b border-gray-100 last:border-b-0"
                        onClick={() => handleSchoolSelect(school)}
                      >
                        {school.name}
                      </button>
                    ))}
                  </div>
                )}

                {showSchoolDropdown && (
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowSchoolDropdown(false)}
                  ></div>
                )}
              </div>

              <InputField
                icon={Zap}
                placeholder="Your Major (e.g., Computer Science)"
                value={formData.major}
                onChange={(val) => setFormData({ ...formData, major: val })}
              />

              <InputField
                icon={Mail}
                type="email"
                placeholder="Your @college.edu email 📧"
                value={formData.email}
                onChange={(val) => setFormData({ ...formData, email: val })}
              />

              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password 🔒"
                  className="pl-10 pr-10 border-2"
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

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="terms"
                  checked={acceptedTerms}
                  onCheckedChange={setAcceptedTerms}
                />
                <label
                  htmlFor="terms"
                  className="text-sm text-gray-700 cursor-pointer"
                >
                  I agree to the{" "}
                  <a
                    href="#"
                    className="text-orange-500 hover:text-orange-600 underline"
                  >
                    Terms and Conditions
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="text-orange-500 hover:text-orange-600 underline"
                  >
                    Privacy Policy
                  </a>
                </label>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white py-3 text-lg font-semibold"
                disabled={!acceptedTerms || isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Creating Account...</span>
                  </div>
                ) : (
                  "Create Account 🚀"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={redirectToLogin}
                className="text-orange-500 hover:text-orange-600 font-semibold"
              >
                Already part of the fam? Sign in! 👋
              </button>
            </div>

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

      {showNavigationLoader && <NavigationLoader />}
    </>
  );
}

function InputField({
  icon: Icon,
  type = "text",
  placeholder,
  value,
  onChange,
}) {
  return (
    <div className="relative">
      <Icon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
      <Input
        type={type}
        placeholder={placeholder}
        className="pl-10 border-2"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
      />
    </div>
  );
}

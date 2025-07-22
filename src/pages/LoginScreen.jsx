"use client"

import { useState, useEffect } from "react"
import { Mail, Lock, User, GraduationCap, Eye, EyeOff, Sparkles, Heart, Zap } from "lucide-react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Checkbox } from "../components/ui/checkbox"
import { useNavigate } from "react-router-dom";

// Mock school data - in real app this would come from API
const mockSchools = [
  "Denison University",
  "Ohio State University",
  "Miami University",
  "Oberlin College",
  "Case Western Reserve University",
  "University of Cincinnati",
  "Kent State University",
  "Bowling Green State University",
  "Ohio University",
  "Wright State University",
]

export default function LoginScreen({ onLogin }) {
  const [isSignUp, setIsSignUp] = useState(false)
  const [showOTP, setShowOTP] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [otpTimer, setOtpTimer] = useState(0)
  const [schoolSearch, setSchoolSearch] = useState("")
  const [showSchoolDropdown, setShowSchoolDropdown] = useState(false)
  const [filteredSchools, setFilteredSchools] = useState([])
  const [acceptedTerms, setAcceptedTerms] = useState(false)

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    school: "",
    major: "",
  })

  const [otpData, setOtpData] = useState({
    otp: "",
    email: formData.email,
  })

  // Filter schools based on search
  useEffect(() => {
    if (schoolSearch.length > 0) {
      const filtered = mockSchools
        .filter((school) => school.toLowerCase().includes(schoolSearch.toLowerCase()))
        .slice(0, 3)
      setFilteredSchools(filtered)
    } else {
      setFilteredSchools([])
    }
  }, [schoolSearch])

  // OTP timer countdown
  useEffect(() => {
    let interval = null
    if (otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((timer) => timer - 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [otpTimer])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (isSignUp && !acceptedTerms) {
      alert("Please accept the Terms and Conditions to continue")
      return
    }

    if (!isSignUp) {
      // Login flow - check if email is verified
      const isEmailVerified = Math.random() > 0.5 // Mock verification status
      if (!isEmailVerified) {
        setShowOTP(true)
        setOtpTimer(30)
        return
      }
    }

    // Sign up flow - always show OTP
    if (isSignUp) {
      setShowOTP(true)
      setOtpTimer(30)
      return
    }

    // Direct login if email is verified
    handleSuccessfulAuth()
  }

  const handleOTPSubmit = (e) => {
    e.preventDefault()
    // Simulate OTP verification
    if (otpData.otp.length === 6) {
      handleSuccessfulAuth()
    }
  }

  const handleSuccessfulAuth = () => {
    const userData = {
      id: 1,
      name: `${formData.firstName || "John"} ${formData.lastName || "Doe"}`,
      email: formData.email || "john.doe@denison.edu",
      school: formData.school || "Denison University",
      major: formData.major || "Computer Science",
      profilePic: "/placeholder.svg?height=100&width=100",
      verified: true,
      contactPreferences: null, // This will trigger the contact preferences modal
    }
    onLogin(userData)
    console.log("HOGYAA DONE")
    navigate("/home");
  }

  const handleResendOTP = () => {
    setOtpTimer(30)
    console.log("OTP resent to:", formData.email)
  }

  const handleSchoolSelect = (school) => {
    setFormData({ ...formData, school })
    setSchoolSearch(school)
    setShowSchoolDropdown(false)
  }

  if (showOTP) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-br from-pink-400/10 to-orange-400/10 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>

        <Card className="w-full max-w-md relative z-10 border-0 shadow-2xl bg-white/80 backdrop-blur-md">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto w-20 h-20 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center mb-4 animate-bounce">
              <Mail className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              Check Your Email! 📧
            </CardTitle>
            <p className="text-gray-600 mt-2">
              We sent a 6-digit code to <br />
              <span className="font-semibold text-orange-500">{formData.email}</span>
            </p>
            <Badge className="mx-auto mt-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white border-0">
              ✨ Almost there!
            </Badge>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleOTPSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Enter Verification Code</label>
                <Input
                  type="text"
                  placeholder="000000"
                  className="text-center text-2xl font-bold tracking-widest border-2 border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                  value={otpData.otp}
                  onChange={(e) => setOtpData({ ...otpData, otp: e.target.value.replace(/\D/g, "").slice(0, 6) })}
                  maxLength={6}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white py-3 text-lg font-semibold"
                disabled={otpData.otp.length !== 6}
              >
                {otpData.otp.length !== 6 ? "Enter Code..." : "Verify & Continue 🚀"}
              </Button>
            </form>

            <div className="text-center">
              {otpTimer > 0 ? (
                <p className="text-gray-600">
                  Resend code in <span className="font-bold text-orange-500">{otpTimer}s</span>
                </p>
              ) : (
                <button onClick={handleResendOTP} className="text-orange-500 hover:text-orange-600 font-semibold">
                  Resend Code 🔄
                </button>
              )}
            </div>

            <div className="text-center">
              <button onClick={() => setShowOTP(false)} className="text-gray-500 hover:text-gray-700 text-sm">
                ← Back to {isSignUp ? "Sign Up" : "Login"}
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
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
            {isSignUp ? "Join the Glyde Fam! 🎉" : "Welcome Back! 👋"}
          </CardTitle>
          <p className="text-gray-600 mt-2">
            {isSignUp
              ? "Ready to level up your campus game? Let's get you started! ✨"
              : "Time to connect with your campus community! 🚀"}
          </p>
          {isSignUp && (
            <Badge className="mx-auto mt-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0">
              <Heart className="w-3 h-3 mr-1" />
              Free Forever
            </Badge>
          )}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="First Name"
                      className="pl-10 border-2 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      required
                    />
                  </div>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Last Name"
                      className="pl-10 border-2 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="relative">
                  <GraduationCap className="absolute left-3 top-3 h-4 w-4 text-gray-400 z-10" />
                  <Input
                    type="text"
                    placeholder="Search your university... 🎓"
                    className="pl-10 border-2 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                    value={schoolSearch}
                    onChange={(e) => {
                      setSchoolSearch(e.target.value)
                      setShowSchoolDropdown(true)
                    }}
                    onFocus={() => setShowSchoolDropdown(true)}
                    required
                  />
                  {showSchoolDropdown && filteredSchools.length > 0 && (
                    <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-20 mt-1">
                      {filteredSchools.map((school, index) => (
                        <button
                          key={index}
                          type="button"
                          className="w-full text-left px-4 py-2 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                          onClick={() => handleSchoolSelect(school)}
                        >
                          {school}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="relative">
                  <Zap className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Your Major (e.g., Computer Science)"
                    className="pl-10 border-2 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                    value={formData.major}
                    onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                    required
                  />
                </div>
              </>
            )}

            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                type="email"
                placeholder="Your @college.edu email 📧"
                className="pl-10 border-2 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password 🔒"
                className="pl-10 pr-10 border-2 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            {isSignUp && (
              <div className="flex items-start space-x-3">
                <Checkbox id="terms" checked={acceptedTerms} onCheckedChange={setAcceptedTerms} />
                <label htmlFor="terms" className="text-sm text-gray-700 cursor-pointer">
                  I agree to the{" "}
                  <a href="#" className="text-orange-500 hover:text-orange-600 underline">
                    Terms and Conditions
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-orange-500 hover:text-orange-600 underline">
                    Privacy Policy
                  </a>
                </label>
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white py-3 text-lg font-semibold"
              disabled={isSignUp && !acceptedTerms}
            >
              {isSignUp ? "Create Account 🚀" : "Sign In ✨"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-orange-500 hover:text-orange-600 font-semibold"
            >
              {isSignUp ? "Already part of the fam? Sign in! 👋" : "New here? Join the community! 🎉"}
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
  )
}

"use client";

import { useState, useEffect } from "react";
import { Mail } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { useLocation, useNavigate } from "react-router-dom";

export default function OTPVerificationPage({ onVerificationSuccess }) {
  const location = useLocation();
  const navigate = useNavigate();

  const { email = "", isSignUp = false } = location.state || {};

  const [otpTimer, setOtpTimer] = useState(30);
  const [otpData, setOtpData] = useState({
    otp: "",
    email: email,
  });

  useEffect(() => {
    let interval = null;
    if (otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((timer) => timer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpTimer]);

  const handleOTPSubmit = (e) => {
    e.preventDefault();
    if (otpData.otp.length === 6) {
      onVerificationSuccess?.();
    }
  };

  const handleResendOTP = () => {
    setOtpTimer(30);
    console.log("OTP resent to:", email);
  };

  const handleGoBack = () => {
    navigate(isSignUp ? "/register" : "/login");
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
          <div className="mx-auto w-20 h-20 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center mb-4 animate-bounce">
            <Mail className="w-10 h-10 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
            Check Your Email! 📧
          </CardTitle>
          <p className="text-gray-600 mt-2">
            We sent a 6-digit code to <br />
            <span className="font-semibold text-orange-500">{email}</span>
          </p>
          <Badge className="mx-auto mt-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white border-0">
            ✨ Almost there!
          </Badge>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleOTPSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter Verification Code
              </label>
              <Input
                type="text"
                placeholder="000000"
                className="text-center text-2xl font-bold tracking-widest border-2 border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                value={otpData.otp}
                onChange={(e) =>
                  setOtpData({
                    ...otpData,
                    otp: e.target.value.replace(/\D/g, "").slice(0, 6),
                  })
                }
                maxLength={6}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white py-3 text-lg font-semibold"
              disabled={otpData.otp.length !== 6}
            >
              {otpData.otp.length !== 6
                ? "Enter Code..."
                : "Verify & Continue 🚀"}
            </Button>
          </form>

          <div className="text-center">
            {otpTimer > 0 ? (
              <p className="text-gray-600">
                Resend code in{" "}
                <span className="font-bold text-orange-500">{otpTimer}s</span>
              </p>
            ) : (
              <button
                onClick={handleResendOTP}
                className="text-orange-500 hover:text-orange-600 font-semibold"
              >
                Resend Code 🔄
              </button>
            )}
          </div>

          <div className="text-center">
            <button
              onClick={handleGoBack}
              className="text-gray-500 hover:text-gray-700 text-sm"
            >
              ← Back to {isSignUp ? "Sign Up" : "Login"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

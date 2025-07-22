"use client"

import { useEffect, useState } from "react"
import { Mail } from "lucide-react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { useNavigate } from "react-router-dom"

export default function OtpScreen({ email, onVerify, goBack }) {
  const [otp, setOtp] = useState("")
  const [otpTimer, setOtpTimer] = useState(30)
  const navigate = useNavigate()

  useEffect(() => {
    const interval = otpTimer > 0 ? setInterval(() => setOtpTimer((t) => t - 1), 1000) : null
    return () => clearInterval(interval)
  }, [otpTimer])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (otp.length === 6) {
      onVerify()
      navigate("/home")
    }
  }

  const resendOtp = () => {
    setOtpTimer(30)
    console.log("Resent OTP to", email)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl bg-white/80 backdrop-blur-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-20 h-20 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center mb-4 animate-bounce">
            <Mail className="w-10 h-10 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
            Check Your Email! 📧
          </CardTitle>
          <p className="text-gray-600 mt-2">We sent a 6-digit code to <span className="text-orange-500 font-semibold">{email}</span></p>
          <Badge className="mx-auto mt-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white border-0">✨ Almost there!</Badge>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              placeholder="000000"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
              maxLength={6}
              className="text-center text-2xl font-bold tracking-widest border-2 border-orange-200"
              required
            />
            <Button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white" disabled={otp.length !== 6}>
              {otp.length !== 6 ? "Enter Code..." : "Verify & Continue 🚀"}
            </Button>
          </form>

          <div className="text-center">
            {otpTimer > 0 ? (
              <p className="text-gray-600">
                Resend code in <span className="font-bold text-orange-500">{otpTimer}s</span>
              </p>
            ) : (
              <button onClick={resendOtp} className="text-orange-500 font-semibold hover:text-orange-600">Resend Code 🔄</button>
            )}
          </div>

          <div className="text-center">
            <button onClick={goBack} className="text-gray-500 text-sm hover:text-gray-700">
              ← Back
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

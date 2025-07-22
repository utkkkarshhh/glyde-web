"use client"

import { useState } from "react"
import { Eye, EyeOff, Lock, Check } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { LoadingSpinner } from "../common/LoadingSpinner"

export default function UpdatePasswordModal({ isOpen, onClose, onUpdate }) {
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  })
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const passwordRequirements = [
    { text: "At least 8 characters", met: passwords.new.length >= 8 },
    { text: "Contains uppercase letter", met: /[A-Z]/.test(passwords.new) },
    { text: "Contains lowercase letter", met: /[a-z]/.test(passwords.new) },
    { text: "Contains number", met: /\d/.test(passwords.new) },
    { text: "Contains special character", met: /[!@#$%^&*(),.?":{}|<>]/.test(passwords.new) },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors({})

    if (passwords.new !== passwords.confirm) {
      setErrors({ confirm: "Passwords don't match" })
      return
    }

    if (!passwordRequirements.every((req) => req.met)) {
      setErrors({ new: "Password doesn't meet requirements" })
      return
    }

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      onUpdate(passwords)
      onClose()
    } catch (error) {
      setErrors({ current: "Current password is incorrect" })
    } finally {
      setIsLoading(false)
    }
  }

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md border-0 shadow-2xl bg-white">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
            Update Password 🔐
          </CardTitle>
          <p className="text-gray-600 text-sm">Keep your account secure with a strong password</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type={showPasswords.current ? "text" : "password"}
                  className="pl-10 pr-10 border-2 border-gray-200 focus:border-orange-500"
                  value={passwords.current}
                  onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  onClick={() => togglePasswordVisibility("current")}
                >
                  {showPasswords.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.current && <p className="text-red-500 text-sm mt-1">{errors.current}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type={showPasswords.new ? "text" : "password"}
                  className="pl-10 pr-10 border-2 border-gray-200 focus:border-orange-500"
                  value={passwords.new}
                  onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  onClick={() => togglePasswordVisibility("new")}
                >
                  {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.new && <p className="text-red-500 text-sm mt-1">{errors.new}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type={showPasswords.confirm ? "text" : "password"}
                  className="pl-10 pr-10 border-2 border-gray-200 focus:border-orange-500"
                  value={passwords.confirm}
                  onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  onClick={() => togglePasswordVisibility("confirm")}
                >
                  {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.confirm && <p className="text-red-500 text-sm mt-1">{errors.confirm}</p>}
            </div>

            {passwords.new && (
              <div className="bg-gray-50 rounded-lg p-3">
                <h4 className="font-medium text-gray-900 mb-2">Password Requirements:</h4>
                <div className="space-y-1">
                  {passwordRequirements.map((req, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <Check className={`h-3 w-3 ${req.met ? "text-green-500" : "text-gray-300"}`} />
                      <span className={req.met ? "text-green-700" : "text-gray-600"}>{req.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading || !passwordRequirements.every((req) => req.met)}
                className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
              >
                {isLoading ? <LoadingSpinner size="sm" /> : "Update Password"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

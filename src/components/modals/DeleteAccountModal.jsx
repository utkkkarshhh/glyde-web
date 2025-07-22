"use client"

import { useState } from "react"
import { AlertTriangle, Trash2 } from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Checkbox } from "../ui/checkbox"
import { Textarea } from "../ui/textarea"

export default function DeleteAccountModal({ isOpen, onClose, onConfirm }) {
  const [selectedReasons, setSelectedReasons] = useState([])
  const [otherReason, setOtherReason] = useState("")
  const [confirmText, setConfirmText] = useState("")

  const reasons = [
    "I don't use the app anymore",
    "I found a better alternative",
    "Privacy concerns",
    "Too many notifications",
    "App is too slow/buggy",
    "I'm graduating/transferring",
    "Account security issues",
    "Other",
  ]

  const handleReasonToggle = (reason) => {
    setSelectedReasons((prev) => (prev.includes(reason) ? prev.filter((r) => r !== reason) : [...prev, reason]))
  }

  const handleConfirm = () => {
    if (confirmText.toLowerCase() === "delete my account") {
      onConfirm({
        reasons: selectedReasons,
        otherReason: selectedReasons.includes("Other") ? otherReason : "",
      })
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md border-0 shadow-2xl bg-white">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-xl font-bold text-gray-900">Delete Your Account? 😢</CardTitle>
          <p className="text-gray-600 text-sm">We're sad to see you go! This action cannot be undone.</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Why are you leaving? (Optional)</h4>
            <div className="space-y-2">
              {reasons.map((reason) => (
                <div key={reason} className="flex items-center space-x-2">
                  <Checkbox
                    id={reason}
                    checked={selectedReasons.includes(reason)}
                    onCheckedChange={() => handleReasonToggle(reason)}
                  />
                  <label htmlFor={reason} className="text-sm text-gray-700 cursor-pointer">
                    {reason}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {selectedReasons.includes("Other") && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Please specify:</label>
              <Textarea
                placeholder="Tell us more..."
                value={otherReason}
                onChange={(e) => setOtherReason(e.target.value)}
                rows={3}
              />
            </div>
          )}

          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="font-semibold text-red-800 mb-2">⚠️ What will be deleted:</h4>
            <ul className="text-sm text-red-700 space-y-1">
              <li>• Your profile and personal information</li>
              <li>• All your posted services</li>
              <li>• Chat history and messages</li>
              <li>• Account settings and preferences</li>
            </ul>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type <span className="font-bold">"delete my account"</span> to confirm:
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="delete my account"
            />
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={confirmText.toLowerCase() !== "delete my account"}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

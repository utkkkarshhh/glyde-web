"use client"

import { useState } from "react"
import { Flag, AlertTriangle, X } from "lucide-react"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Checkbox } from "../ui/checkbox"

export default function ReportModal({ isOpen, onClose, onReport, service }) {
  const [selectedReasons, setSelectedReasons] = useState([])
  const [otherReason, setOtherReason] = useState("")

  const reportReasons = [
    "Inappropriate content",
    "Spam or misleading",
    "Harassment or bullying",
    "Fake or fraudulent service",
    "Unsafe or dangerous",
    "Copyright violation",
    "Price gouging",
    "Other",
  ]

  const handleReasonToggle = (reason) => {
    setSelectedReasons((prev) => (prev.includes(reason) ? prev.filter((r) => r !== reason) : [...prev, reason]))
  }

  const handleSubmit = () => {
    if (selectedReasons.length === 0) {
      alert("Please select at least one reason")
      return
    }

    const reportData = {
      serviceId: service?.id,
      reasons: selectedReasons,
      otherReason: selectedReasons.includes("Other") ? otherReason : "",
      timestamp: new Date().toISOString(),
    }

    onReport(reportData)
    setSelectedReasons([])
    setOtherReason("")
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md border-0 shadow-2xl bg-white">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-bold text-red-600 flex items-center gap-2">
              <Flag className="w-5 h-5" />
              Report Listing
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="bg-red-50 rounded-lg p-3">
            <h4 className="font-medium text-gray-900">{service?.title}</h4>
            <p className="text-sm text-gray-600">by {service?.poster?.name}</p>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Why are you reporting this listing?</h4>
            <div className="space-y-2">
              {reportReasons.map((reason) => (
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
                placeholder="Describe the issue..."
                value={otherReason}
                onChange={(e) => setOtherReason(e.target.value)}
                rows={3}
                className="border-red-200 focus:border-red-500"
              />
            </div>
          )}

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
              <div>
                <p className="text-sm text-yellow-800 font-medium">Important</p>
                <p className="text-sm text-yellow-700">
                  False reports may result in account restrictions. Only report content that violates our community
                  guidelines.
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={selectedReasons.length === 0}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white"
            >
              <Flag className="w-4 h-4 mr-2" />
              Submit Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

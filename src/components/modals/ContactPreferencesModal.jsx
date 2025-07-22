"use client"

import { useState } from "react"
import { MessageCircle, Mail, Phone, Check } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Checkbox } from "../ui/checkbox"

export default function ContactPreferencesModal({ isOpen, onClose, onSave }) {
  const [preferences, setPreferences] = useState({
    sms: false,
    email: false,
    whatsapp: false,
  })

  const [contactInfo, setContactInfo] = useState({
    phone: "",
    email: "",
    whatsapp: "",
  })

  const handlePreferenceChange = (type, checked) => {
    setPreferences((prev) => ({ ...prev, [type]: checked }))
  }

  const handleSave = () => {
    const selectedPreferences = Object.keys(preferences).filter((key) => preferences[key])
    if (selectedPreferences.length === 0) {
      alert("Please select at least one contact method")
      return
    }

    const data = {
      preferences,
      contactInfo: {
        phone: preferences.sms || preferences.whatsapp ? contactInfo.phone : "",
        email: preferences.email ? contactInfo.email : "",
        whatsapp: preferences.whatsapp ? contactInfo.whatsapp || contactInfo.phone : "",
      },
    }

    onSave(data)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md border-0 shadow-2xl bg-white">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto w-16 h-16 bg-[#FF7F00] rounded-full flex items-center justify-center mb-4">
            <MessageCircle className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-xl font-bold text-[#FF7F00]">Contact Preferences 📱</CardTitle>
          <p className="text-gray-600 text-sm">How would you like other students to reach you?</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            {/* SMS */}
            <div className="flex items-start space-x-3">
              <Checkbox
                id="sms"
                checked={preferences.sms}
                onCheckedChange={(checked) => handlePreferenceChange("sms", checked)}
              />
              <div className="flex-1">
                <label htmlFor="sms" className="flex items-center gap-2 font-medium text-gray-900 cursor-pointer">
                  <Phone className="h-4 w-4 text-[#FF7F00]" />
                  SMS Text Messages
                </label>
                {preferences.sms && (
                  <Input
                    placeholder="Your phone number"
                    className="mt-2 border-[#FF7F00]/20 focus:border-[#FF7F00]"
                    value={contactInfo.phone}
                    onChange={(e) => setContactInfo((prev) => ({ ...prev, phone: e.target.value }))}
                  />
                )}
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start space-x-3">
              <Checkbox
                id="email"
                checked={preferences.email}
                onCheckedChange={(checked) => handlePreferenceChange("email", checked)}
              />
              <div className="flex-1">
                <label htmlFor="email" className="flex items-center gap-2 font-medium text-gray-900 cursor-pointer">
                  <Mail className="h-4 w-4 text-[#FF7F00]" />
                  Email
                </label>
                {preferences.email && (
                  <Input
                    placeholder="Your email address"
                    type="email"
                    className="mt-2 border-[#FF7F00]/20 focus:border-[#FF7F00]"
                    value={contactInfo.email}
                    onChange={(e) => setContactInfo((prev) => ({ ...prev, email: e.target.value }))}
                  />
                )}
              </div>
            </div>

            {/* WhatsApp */}
            <div className="flex items-start space-x-3">
              <Checkbox
                id="whatsapp"
                checked={preferences.whatsapp}
                onCheckedChange={(checked) => handlePreferenceChange("whatsapp", checked)}
              />
              <div className="flex-1">
                <label htmlFor="whatsapp" className="flex items-center gap-2 font-medium text-gray-900 cursor-pointer">
                  <MessageCircle className="h-4 w-4 text-[#FF7F00]" />
                  WhatsApp
                </label>
                {preferences.whatsapp && (
                  <Input
                    placeholder="WhatsApp number (can be same as phone)"
                    className="mt-2 border-[#FF7F00]/20 focus:border-[#FF7F00]"
                    value={contactInfo.whatsapp || contactInfo.phone}
                    onChange={(e) => setContactInfo((prev) => ({ ...prev, whatsapp: e.target.value }))}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="bg-[#FF7F00]/5 rounded-lg p-3">
            <p className="text-sm text-gray-600">
              💡 <strong>Tip:</strong> You can update these preferences anytime in your account settings.
            </p>
          </div>

          <Button onClick={handleSave} className="w-full bg-[#FF7F00] hover:bg-[#FF7F00]/90 text-white py-3">
            <Check className="w-4 h-4 mr-2" />
            Save Preferences
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

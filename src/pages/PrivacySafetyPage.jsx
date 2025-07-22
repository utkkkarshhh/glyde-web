"use client"

import { ArrowLeft, Shield, AlertTriangle, Eye, Lock, Users, Bell } from "lucide-react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import Navbar from "../components/common/Navbar"

export default function PrivacySafetyPage({ onBack }) {
  const safetyTips = [
    {
      icon: <Shield className="h-5 w-5" />,
      title: "Meet in Public Places",
      description: "Always meet for services in public, well-lit areas on campus like the library or student center",
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: "Verify Student Status",
      description: "Only interact with verified Denison students - look for the verification badge",
    },
    {
      icon: <AlertTriangle className="h-5 w-5" />,
      title: "Trust Your Instincts",
      description: "If something feels off, don't hesitate to cancel or report the interaction",
    },
    {
      icon: <Bell className="h-5 w-5" />,
      title: "Report Suspicious Activity",
      description: "Help keep our community safe by reporting inappropriate behavior immediately",
    },
    {
      icon: <Eye className="h-5 w-5" />,
      title: "Protect Personal Info",
      description: "Don't share sensitive information like passwords, SSN, or financial details",
    },
    {
      icon: <Lock className="h-5 w-5" />,
      title: "Use In-App Messaging",
      description: "Keep communications within the app for safety and record-keeping",
    },
  ]

  return (
    <div className="pb-20 bg-gradient-to-br from-[#FF7F00]/5 via-white to-[#FF7F00]/10 min-h-screen">
      <Navbar />
      <div className="bg-white/80 backdrop-blur-md shadow-sm p-4 flex items-center gap-3 border-b border-[#FF7F00]/20">
        <Button variant="ghost" size="icon" onClick={onBack} className="hover:bg-[#FF7F00]/10">
          <ArrowLeft className="h-5 w-5 text-[#FF7F00]" />
        </Button>
        <h1 className="text-xl font-bold text-[#FF7F00] flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Privacy & Safety
        </h1>
      </div>

      <div className="p-4 space-y-6">
        {/* Safety Tips */}
        <Card className="bg-white/80 backdrop-blur-sm border-[#FF7F00]/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#FF7F00]">🛡️ Safety Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {safetyTips.map((tip, index) => (
                <div key={index} className="flex gap-3 p-3 rounded-lg bg-[#FF7F00]/5">
                  <div className="text-[#FF7F00] mt-1">{tip.icon}</div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">{tip.title}</h4>
                    <p className="text-sm text-gray-600">{tip.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Privacy Policy */}
        <Card className="bg-white/80 backdrop-blur-sm border-[#FF7F00]/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#FF7F00]">📋 Privacy Policy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Information We Collect</h4>
              <p className="text-sm text-gray-600 mb-3">
                We collect information you provide when creating your account, including your name, email address,
                university affiliation, and profile information. We also collect information about your use of our
                services.
              </p>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">How We Use Your Information</h4>
              <p className="text-sm text-gray-600 mb-3">
                Your information is used to provide and improve our services, verify your student status, facilitate
                connections between users, and ensure platform safety.
              </p>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">Information Sharing</h4>
              <p className="text-sm text-gray-600 mb-3">
                We do not sell your personal information. We only share information as necessary to provide our
                services, comply with legal requirements, or protect the safety of our users.
              </p>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">Data Security</h4>
              <p className="text-sm text-gray-600 mb-3">
                We implement appropriate security measures to protect your personal information against unauthorized
                access, alteration, disclosure, or destruction.
              </p>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">Your Rights</h4>
              <p className="text-sm text-gray-600 mb-3">
                You have the right to access, update, or delete your personal information. You can also opt out of
                certain communications and control your privacy settings.
              </p>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">Contact Us</h4>
              <p className="text-sm text-gray-600">
                If you have questions about this privacy policy or our practices, please contact us at privacy@glyde.app
                or through our support channels.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contact */}
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-semibold text-red-800 mb-2">Emergency or Safety Concerns?</h3>
            <p className="text-red-700 text-sm mb-4">
              If you feel unsafe or need immediate assistance, contact Denison Campus Safety or local emergency
              services.
            </p>
            <div className="space-y-2">
              <p className="text-sm font-medium text-red-800">Denison Campus Safety: (740) 587-6911</p>
              <p className="text-sm font-medium text-red-800">Emergency: 911</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

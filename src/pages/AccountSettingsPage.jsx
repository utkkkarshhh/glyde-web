"use client"

import { useState } from "react"
import { ArrowLeft, Key, Trash2, Sparkles, MessageCircle } from "lucide-react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import DeleteAccountModal from "../components/modals/DeleteAccountModal"
import UpdatePasswordModal from "../components/modals/UpdatePasswordModal"
import ContactPreferencesModal from "../components/modals/ContactPreferencesModal"
import Navbar from "../components/common/Navbar"

export default function AccountSettingsPage({ currentUser, onBack }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [showContactPreferencesModal, setShowContactPreferencesModal] = useState(false)

  const handleDeleteAccount = (data) => {
    console.log("Account deletion requested:", data)
    setShowDeleteModal(false)
    // Handle account deletion
  }

  const handlePasswordUpdate = (passwords) => {
    console.log("Password updated:", passwords)
    // Handle password update
  }

  const handleContactPreferencesUpdate = (data) => {
    console.log("Contact preferences updated:", data)
    setShowContactPreferencesModal(false)
    // Handle contact preferences update
  }

  return (
    <div className="pb-20 bg-gradient-to-br from-[#FF7F00]/5 via-white to-[#FF7F00]/10 min-h-screen">
      <Navbar />
      <div className="bg-white/80 backdrop-blur-md shadow-sm p-4 flex items-center gap-3 border-b border-[#FF7F00]/20">
        <Button variant="ghost" size="icon" onClick={onBack} className="hover:bg-[#FF7F00]/10">
          <ArrowLeft className="h-5 w-5 text-[#FF7F00]" />
        </Button>
        <h1 className="text-xl font-bold text-[#FF7F00] flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          Account Settings
        </h1>
      </div>

      <div className="p-4 space-y-6">
        {/* Contact Preferences */}
        <Card className="bg-white/80 backdrop-blur-sm border-[#FF7F00]/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#FF7F00]">📱 Contact Preferences</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 text-sm mb-4">
              Manage how other students can reach you when they're interested in your services.
            </p>
            <Button
              onClick={() => setShowContactPreferencesModal(true)}
              variant="outline"
              className="w-full bg-[#FF7F00]/5 border-[#FF7F00]/20 hover:bg-[#FF7F00]/10"
            >
              <MessageCircle className="h-4 w-4 mr-3 text-[#FF7F00]" />
              Update Contact Preferences
            </Button>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="bg-white/80 backdrop-blur-sm border-[#FF7F00]/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#FF7F00]">🔐 Security</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={() => setShowPasswordModal(true)}
              variant="outline"
              className="w-full justify-start bg-[#FF7F00]/5 border-[#FF7F00]/20 hover:bg-[#FF7F00]/10"
            >
              <Key className="h-4 w-4 mr-3 text-[#FF7F00]" />
              Update Password
            </Button>

            <Button
              onClick={() => setShowDeleteModal(true)}
              variant="outline"
              className="w-full justify-start text-red-600 hover:text-red-700 border-red-200 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4 mr-3" />
              Delete Account
            </Button>
          </CardContent>
        </Card>

        {/* App Info */}
        <Card className="bg-white/80 backdrop-blur-sm border-[#FF7F00]/10">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-[#FF7F00] rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Glyde for Denison</h3>
            <p className="text-gray-600 text-sm">Version 1.0.0</p>
            <p className="text-gray-500 text-xs mt-2">Made with ❤️ for Denison students</p>
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      <DeleteAccountModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteAccount}
      />
      <UpdatePasswordModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        onUpdate={handlePasswordUpdate}
      />
      <ContactPreferencesModal
        isOpen={showContactPreferencesModal}
        onClose={() => setShowContactPreferencesModal(false)}
        onSave={handleContactPreferencesUpdate}
      />
    </div>
  )
}

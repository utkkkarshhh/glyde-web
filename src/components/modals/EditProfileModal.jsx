"use client"

import { useState } from "react"
import { Camera, User, GraduationCap, Mail, X, Trash2 } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { LoadingSpinner } from "../common/LoadingSpinner"

export default function EditProfileModal({ isOpen, onClose, currentUser, onSave }) {
  const [formData, setFormData] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    school: currentUser?.school || "",
    major: currentUser?.major || "",
    bio: currentUser?.bio || "Love helping fellow students! 💫",
    profilePic: currentUser?.profilePic || "",
  })

  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    onSave(formData)
    setIsSaving(false)
    onClose()
  }

  const handleRemovePhoto = () => {
    setFormData((prev) => ({ ...prev, profilePic: "" }))
  }

  const handlePhotoUpload = () => {
    // Simulate photo upload
    const newPhotoUrl = "/placeholder.svg?height=100&width=100&text=New"
    setFormData((prev) => ({ ...prev, profilePic: newPhotoUrl }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md border-0 shadow-2xl bg-white max-h-[90vh] overflow-y-auto">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-bold text-[#FF7F00] flex items-center gap-2">
              <User className="w-5 h-5" />
              Edit Profile
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Profile Picture */}
          <div className="text-center">
            <div className="relative inline-block">
              <img
                src={formData.profilePic || "/placeholder.svg"}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-[#FF7F00]/20"
              />
              <div className="absolute -bottom-2 -right-2 flex gap-1">
                <Button size="icon" className="w-8 h-8 bg-[#FF7F00] hover:bg-[#FF7F00]/90" onClick={handlePhotoUpload}>
                  <Camera className="h-4 w-4" />
                </Button>
                {formData.profilePic && (
                  <Button size="icon" variant="destructive" className="w-8 h-8" onClick={handleRemovePhoto}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-2">Click camera to update photo</p>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-[#FF7F00]/60" />
                <Input
                  className="pl-10 border-[#FF7F00]/20 focus:border-[#FF7F00] focus:ring-[#FF7F00]"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-[#FF7F00]/60" />
                <Input
                  type="email"
                  className="pl-10 border-[#FF7F00]/20 focus:border-[#FF7F00] focus:ring-[#FF7F00]"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">University</label>
              <div className="relative">
                <GraduationCap className="absolute left-3 top-3 h-4 w-4 text-[#FF7F00]/60" />
                <Input
                  className="pl-10 border-[#FF7F00]/20 focus:border-[#FF7F00] focus:ring-[#FF7F00]"
                  value={formData.school}
                  onChange={(e) => setFormData((prev) => ({ ...prev, school: e.target.value }))}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Major</label>
              <Input
                className="border-[#FF7F00]/20 focus:border-[#FF7F00] focus:ring-[#FF7F00]"
                value={formData.major}
                onChange={(e) => setFormData((prev) => ({ ...prev, major: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
              <Textarea
                className="border-[#FF7F00]/20 focus:border-[#FF7F00] focus:ring-[#FF7F00]"
                rows={3}
                placeholder="Tell other students about yourself..."
                value={formData.bio}
                onChange={(e) => setFormData((prev) => ({ ...prev, bio: e.target.value }))}
              />
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isSaving} className="flex-1 bg-[#FF7F00] hover:bg-[#FF7F00]/90">
              {isSaving ? (
                <>
                  <LoadingSpinner size="sm" />
                  <span className="ml-2">Saving...</span>
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

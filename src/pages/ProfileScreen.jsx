"use client"

import { useState, useEffect } from "react"
import { Edit, GraduationCap, Mail, Phone, Settings, LogOut, Shield, Sparkles } from "lucide-react"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { ServiceCardSkeleton } from "../components/common/LoadingSpinner"
import EditProfileModal from "../components/modals/EditProfileModal"
import Navbar from "../components/common/Navbar"
import { useSelector, useDispatch } from "react-redux"
import { logout } from "../redux/auth/authSlice"

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const [isLoading, setIsLoading] = useState(true)
  const [showEditProfileModal, setShowEditProfileModal] = useState(false)

  const stats = [
    { label: "Services Posted", value: "12", icon: "🚀" },
    { label: "Completed Jobs", value: "8", icon: "✅" },
    { label: "Active Listings", value: "3", icon: "📋" },
    { label: "Member Since", value: "Dec 2023", icon: "📅" },
  ]

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  const handleProfileUpdate = (profileData) => {
    console.log("Profile updated:", profileData)
    // Handle profile update
  }

  const handleLogout = () => {
    dispatch(logout());
  };

  if (isLoading || !currentUser) {
    return (
      <div className="pb-20 bg-gradient-to-br from-[#FF7F00]/5 via-white to-[#FF7F00]/10 min-h-screen">
        <Navbar />
        <div className="bg-white/80 backdrop-blur-md shadow-sm p-4 border-b border-[#FF7F00]/20">
          <div className="flex items-center justify-between">
            <div>
              <div className="h-6 bg-[#FF7F00]/20 rounded w-24 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-32"></div>
            </div>
            <div className="w-10 h-10 bg-[#FF7F00]/20 rounded-full"></div>
          </div>
        </div>
        <div className="p-4 space-y-6">
          <ServiceCardSkeleton />
          <ServiceCardSkeleton />
          <ServiceCardSkeleton />
        </div>
      </div>
    )
  }

  return (
    <div className="pb-20 bg-gradient-to-br from-[#FF7F00]/5 via-white to-[#FF7F00]/10 min-h-screen">
      {/* Header */}
      <Navbar />
      <div className="bg-white/80 backdrop-blur-md shadow-sm p-4 border-b border-[#FF7F00]/20">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-[#FF7F00] flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Profile
            </h2>
            <p className="text-gray-600 text-sm">Manage your account ⚙️</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowEditProfileModal(true)}
            className="hover:bg-[#FF7F00]/10"
          >
            <Edit className="h-5 w-5 text-[#FF7F00]" />
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Profile Info */}
        <Card className="bg-white/80 backdrop-blur-sm border-[#FF7F00]/10 hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative">
                <img
                  src={currentUser.profile_pic || "/placeholder.svg"}
                  alt={currentUser.first_name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-[#FF7F00]/20"
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-xl font-bold text-gray-900">{currentUser.first_name} {currentUser.last_name}</h2>
                  {currentUser.verified && (
                    <Badge className="bg-green-500 text-white border-0">
                      <Shield className="h-3 w-3 mr-1" />
                      Verified ✅
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-1 text-gray-600 mb-1">
                  <GraduationCap className="h-4 w-4 text-[#FF7F00]" />
                  <span>{currentUser.school}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <span>{currentUser.major}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="h-4 w-4 text-[#FF7F00]" />
                <span>{currentUser.email}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="h-4 w-4 text-[#FF7F00]" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>

            <Button
              onClick={() => setShowEditProfileModal(true)}
              className="w-full mt-4 bg-[#FF7F00] hover:bg-[#FF7F00]/90"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </CardContent>
        </Card>

        {/* Stats */}
        <Card className="bg-white/80 backdrop-blur-sm border-[#FF7F00]/10 hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">📊 Your Activity</h3>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-3 rounded-lg bg-[#FF7F00]/5">
                  <div className="text-2xl font-bold text-[#FF7F00]">{stat.value}</div>
                  <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
                    <span>{stat.icon}</span>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Settings */}
        <Card className="bg-white/80 backdrop-blur-sm border-[#FF7F00]/10 hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">⚙️ Settings</h3>
            <div className="space-y-3">
              <Button
                variant="ghost"
                className="w-full justify-start hover:bg-[#FF7F00]/10"
              >
                <Settings className="h-4 w-4 mr-3 text-[#FF7F00]" />
                Account Settings
              </Button>
              <Button variant="ghost" className="w-full justify-start hover:bg-[#FF7F00]/10">
                <Shield className="h-4 w-4 mr-3 text-[#FF7F00]" />
                Privacy & Safety
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-3" />
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={showEditProfileModal}
        onClose={() => setShowEditProfileModal(false)}
        currentUser={currentUser}
        onSave={handleProfileUpdate}
      />
    </div>
  )
}

"use client"

import { useState } from "react"
import { ArrowLeft, MapPin, Clock, MessageCircle, Heart, Share, Flag } from "lucide-react"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Separator } from "../components/ui/separator"
import MessageModal from "../components/modals/MessageModal"
import ReportModal from "../components/modals/ReportModal"
import Navbar from "../components/common/Navbar"

export default function ServiceDetailScreen({ service, onBack, onUserProfileView }) {
  const [isLiked, setIsLiked] = useState(false)
  const [showMessageModal, setShowMessageModal] = useState(false)
  const [showReportModal, setShowReportModal] = useState(false)
  const [messageType, setMessageType] = useState("")

  const handleRequestService = () => {
    setMessageType("request")
    setShowMessageModal(true)
  }

  const handleOfferHelp = () => {
    setMessageType("offer")
    setShowMessageModal(true)
  }

  const handleSendMessage = (data) => {
    console.log("Message sent:", data)
    // Handle message sending logic
  }

  const handleReport = (reportData) => {
    console.log("Report submitted:", reportData)
    // Handle report submission
  }

  if (!service) return null

  return (
    <div className="pb-20 bg-gradient-to-br from-[#FF7F00]/5 via-white to-[#FF7F00]/10 min-h-screen">
      {/* Header */}
      <Navbar />
      <div className="bg-white/80 backdrop-blur-md shadow-sm p-4 flex items-center gap-3 border-b border-[#FF7F00]/20">
        <Button variant="ghost" size="icon" onClick={onBack} className="hover:bg-[#FF7F00]/10">
          <ArrowLeft className="h-5 w-5 text-[#FF7F00]" />
        </Button>
        <h1 className="text-xl font-bold text-[#FF7F00] flex-1">Service Details</h1>
        <Button variant="ghost" size="icon" className="hover:bg-[#FF7F00]/10">
          <Share className="h-5 w-5 text-[#FF7F00]" />
        </Button>
      </div>

      <div className="p-4 space-y-6">
        {/* Service Image */}
        <div className="relative">
          <img
            src={service.image || "/placeholder.svg"}
            alt={service.title}
            className="w-full h-48 rounded-lg object-cover border-2 border-[#FF7F00]/10"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-3 right-3 bg-white/80 hover:bg-white"
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart className={`h-5 w-5 ${isLiked ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
          </Button>
        </div>

        {/* Service Info */}
        <Card className="bg-white/80 backdrop-blur-sm border-[#FF7F00]/10">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{service.title}</h2>
                <div className="flex gap-2 mb-2">
                  <Badge
                    variant="outline"
                    className={`${
                      service.type === "offer"
                        ? "border-green-500 text-green-700 bg-green-50"
                        : "border-blue-500 text-blue-700 bg-blue-50"
                    }`}
                  >
                    {service.type === "offer" ? "Offering" : "Requesting"}
                  </Badge>
                  {service.isRecurring && (
                    <Badge className="bg-[#FF7F00]/10 text-[#FF7F00] border-[#FF7F00]/20">Recurring</Badge>
                  )}
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-[#FF7F00]">{service.price}</div>
                <div className="text-sm text-gray-600">{service.category}</div>
              </div>
            </div>

            <p className="text-gray-700 mb-4">{service.description}</p>

            <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4 text-[#FF7F00]" />
                {service.location}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-[#FF7F00]" />
                {service.time}
              </div>
            </div>

            <Separator className="my-4" />

            {/* Poster Info */}
            <div className="flex items-center gap-3">
              <img
                src={service.poster.profilePic || "/placeholder.svg"}
                alt={service.poster.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-[#FF7F00]/20"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{service.poster.name}</h3>
                <p className="text-gray-600 text-sm">{service.poster.school}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-[#FF7F00]/20 hover:bg-[#FF7F00]/10 bg-transparent"
                onClick={() => onUserProfileView && onUserProfileView(service.poster)}
              >
                View Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="fixed bottom-20 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-[#FF7F00]/20">
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 border-[#FF7F00]/20 hover:bg-[#FF7F00]/10 bg-transparent">
              <MessageCircle className="h-4 w-4 mr-2 text-[#FF7F00]" />
              Message
            </Button>
            <Button
              className="flex-1 bg-[#FF7F00] hover:bg-[#FF7F00]/90"
              onClick={service.type === "offer" ? handleRequestService : handleOfferHelp}
            >
              {service.type === "offer" ? "Request This Service" : "Offer Help"}
            </Button>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="w-full mt-2 text-gray-500 hover:bg-[#FF7F00]/5"
            onClick={() => setShowReportModal(true)}
          >
            <Flag className="h-4 w-4 mr-2" />
            Report this listing
          </Button>
        </div>
      </div>

      {/* Message Modal */}
      <MessageModal
        isOpen={showMessageModal}
        onClose={() => setShowMessageModal(false)}
        onSend={handleSendMessage}
        service={service}
        type={messageType}
      />

      {/* Report Modal */}
      <ReportModal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        onReport={handleReport}
        service={service}
      />
    </div>
  )
}

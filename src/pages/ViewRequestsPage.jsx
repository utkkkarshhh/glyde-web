"use client"

import { useState } from "react"
import { ArrowLeft, MessageCircle, Check, X, Star, MapPin, Clock } from "lucide-react"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import Navbar from "../components/common/Navbar"

export default function ViewRequestsPage({ service, onBack }) {
  const [activeTab, setActiveTab] = useState("pending")

  const requests = [
    {
      id: 1,
      requester: {
        name: "Emma Davis",
        school: "Denison University",
        rating: 4.7,
        profilePic: "/placeholder.svg?height=50&width=50",
        verified: true,
      },
      message:
        "Hi! I'd love to book your nail art service for this Friday evening. I'm looking for something elegant for a formal event. Are you available around 6 PM?",
      requestedDate: "2024-01-19",
      requestedTime: "6:00 PM",
      location: "East Quad - My Dorm Room",
      status: "pending",
      requestedAt: "2 hours ago",
      price: "$25",
    },
    {
      id: 2,
      requester: {
        name: "Sarah Johnson",
        school: "Denison University",
        rating: 4.9,
        profilePic: "/placeholder.svg?height=50&width=50",
        verified: true,
      },
      message:
        "Hey! I saw your nail art work and it's amazing! Could you do a simple French manicure for me this weekend? I'm flexible with timing.",
      requestedDate: "2024-01-20",
      requestedTime: "2:00 PM",
      location: "West Quad",
      status: "pending",
      requestedAt: "5 hours ago",
      price: "$20",
    },
    {
      id: 3,
      requester: {
        name: "Alex Rivera",
        school: "Denison University",
        rating: 4.6,
        profilePic: "/placeholder.svg?height=50&width=50",
        verified: false,
      },
      message:
        "Hi there! I need nail art for a photoshoot next week. Can you do intricate designs? Budget is flexible.",
      requestedDate: "2024-01-22",
      requestedTime: "4:00 PM",
      location: "Campus Center",
      status: "accepted",
      requestedAt: "1 day ago",
      price: "$35",
    },
  ]

  const handleAcceptRequest = (requestId) => {
    console.log("Accepting request:", requestId)
    // Handle accept logic
  }

  const handleDeclineRequest = (requestId) => {
    console.log("Declining request:", requestId)
    // Handle decline logic
  }

  const pendingRequests = requests.filter((req) => req.status === "pending")
  const acceptedRequests = requests.filter((req) => req.status === "accepted")
  const completedRequests = requests.filter((req) => req.status === "completed")

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "accepted":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="pb-20">
      <Navbar />
      <div className="bg-white shadow-sm p-4 flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-gray-900">Service Requests</h1>
          <p className="text-sm text-gray-600">{service?.title || "Professional Nail Art"}</p>
        </div>
      </div>

      <div className="p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pending">Pending ({pendingRequests.length})</TabsTrigger>
            <TabsTrigger value="accepted">Accepted ({acceptedRequests.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedRequests.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4 mt-4">
            {pendingRequests.map((request) => (
              <Card key={request.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3 mb-4">
                    <img
                      src={request.requester.profilePic || "/placeholder.svg"}
                      alt={request.requester.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900">{request.requester.name}</h3>
                        {request.requester.verified && (
                          <Badge className="bg-green-100 text-green-800 text-xs">Verified</Badge>
                        )}
                        <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span>{request.requester.rating}</span>
                        </div>
                        <span>{request.requester.school}</span>
                        <span>{request.requestedAt}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-orange-500">{request.price}</div>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4">{request.message}</p>

                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">Requested Details:</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>
                          {request.requestedDate} at {request.requestedTime}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{request.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      className="flex-1 bg-transparent"
                      onClick={() => handleDeclineRequest(request.id)}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Decline
                    </Button>
                    <Button variant="outline" className="flex-1 bg-transparent">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                    <Button
                      className="flex-1 bg-orange-500 hover:bg-orange-600"
                      onClick={() => handleAcceptRequest(request.id)}
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Accept
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="accepted" className="space-y-4 mt-4">
            {acceptedRequests.map((request) => (
              <Card key={request.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3 mb-4">
                    <img
                      src={request.requester.profilePic || "/placeholder.svg"}
                      alt={request.requester.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900">{request.requester.name}</h3>
                        <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span>{request.requester.rating}</span>
                        </div>
                        <span>{request.requestedAt}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-orange-500">{request.price}</div>
                    </div>
                  </div>

                  <div className="bg-green-50 rounded-lg p-3 mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">Confirmed Appointment:</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>
                          {request.requestedDate} at {request.requestedTime}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{request.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" className="flex-1 bg-transparent">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                    <Button className="flex-1 bg-green-500 hover:bg-green-600">Mark Complete</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4 mt-4">
            <div className="text-center py-8 text-gray-500">
              <p>No completed requests yet.</p>
              <p className="text-sm">Completed requests will appear here.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

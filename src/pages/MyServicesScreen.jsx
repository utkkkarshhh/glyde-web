"use client"

import { useState } from "react"
import { MoreVertical, MapPin, Clock, MessageCircle } from "lucide-react"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Card, CardContent } from "../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import Navbar from "../components/common/Navbar"

// Dummy data for user's services
const myServices = [
  {
    id: 1,
    title: "Nail Art & Manicure",
    description: "Professional nail art and manicure services in your dorm!",
    category: "Beauty & Wellness",
    type: "offer",
    price: "$25",
    location: "East Quad",
    status: "active",
    requests: 3,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    title: "Airport Ride Share",
    description: "Driving to Columbus Airport this Friday, 3 seats available",
    category: "Transportation",
    type: "offer",
    price: "$15",
    location: "Campus Center",
    status: "active",
    requests: 2,
    image: "/placeholder.svg?height=80&width=80",
  },
]

const myRequests = [
  {
    id: 3,
    title: "Need Biology Textbook",
    description: "Looking to buy or rent Campbell Biology 12th edition",
    category: "Textbook Exchange",
    type: "request",
    price: "Negotiable",
    location: "Science Building",
    status: "pending",
    responses: 1,
    image: "/placeholder.svg?height=80&width=80",
  },
]

const bookings = [
  {
    id: 1,
    serviceTitle: "Calculus Tutoring",
    requester: "Emma Davis",
    date: "2024-01-15",
    time: "2:00 PM",
    status: "confirmed",
    price: "$20/hr",
    location: "Library Study Room 3",
    requesterPic: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    serviceTitle: "Dog Walking",
    requester: "Mike Johnson",
    date: "2024-01-16",
    time: "4:00 PM",
    status: "pending",
    price: "$10",
    location: "West Quad",
    requesterPic: "/placeholder.svg?height=40&width=40",
  },
]

export default function MyServicesScreen({ currentUser, onViewRequests, onViewResponses }) {
  const [activeTab, setActiveTab] = useState("posted")

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "confirmed":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="pb-20">
      {/* Header */}
      <Navbar />
      <div className="bg-white shadow-sm p-4">
        <h2 className="text-xl font-semibold text-gray-900">My Services</h2>
        <p className="text-gray-600 text-sm">Manage your listings and bookings</p>
      </div>

      <div className="p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="posted">Posted</TabsTrigger>
            <TabsTrigger value="requested">Requested</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
          </TabsList>

          {/* Posted Services */}
          <TabsContent value="posted" className="space-y-4 mt-4">
            {myServices.map((service) => (
              <Card key={service.id}>
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <img
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900">{service.title}</h3>
                          <Badge className={getStatusColor(service.status)}>{service.status}</Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-orange-500">{service.price}</span>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{service.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {service.location}
                          </div>
                          <span>{service.requests} requests</span>
                        </div>
                        <Button size="sm" variant="outline" onClick={() => onViewRequests(service)}>
                          View Requests
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Requested Services */}
          <TabsContent value="requested" className="space-y-4 mt-4">
            {myRequests.map((request) => (
              <Card key={request.id}>
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <img
                      src={request.image || "/placeholder.svg"}
                      alt={request.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900">{request.title}</h3>
                          <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-orange-500">{request.price}</span>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{request.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {request.location}
                          </div>
                          <span>{request.responses} responses</span>
                        </div>
                        <Button size="sm" variant="outline" onClick={() => onViewResponses(request)}>
                          View Responses
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Bookings */}
          <TabsContent value="bookings" className="space-y-4 mt-4">
            {bookings.map((booking) => (
              <Card key={booking.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">{booking.serviceTitle}</h3>
                      <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                    </div>
                    <span className="font-bold text-orange-500">{booking.price}</span>
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={booking.requesterPic || "/placeholder.svg"}
                      alt={booking.requester}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-sm text-gray-700">{booking.requester}</span>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {booking.date} at {booking.time}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {booking.location}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                    {booking.status === "pending" && (
                      <>
                        <Button size="sm" variant="outline">
                          Decline
                        </Button>
                        <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                          Accept
                        </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

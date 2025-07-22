"use client"

import { useState } from "react"
import { ArrowLeft, MessageCircle, Check, Star, Phone } from "lucide-react"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import Navbar from "../components/common/Navbar"

export default function ViewResponsesPage({ request, onBack }) {
  const [activeTab, setActiveTab] = useState("responses")

  const responses = [
    {
      id: 1,
      responder: {
        name: "Jessica Chen",
        school: "Denison University",
        rating: 4.9,
        profilePic: "/placeholder.svg?height=50&width=50",
        verified: true,
        completedServices: 45,
      },
      message:
        "Hi! I have the Campbell Biology 12th edition in excellent condition. I used it last semester and took great care of it. I'm asking $180 for it (retail is $320). Let me know if you're interested!",
      price: "$180",
      condition: "Excellent",
      respondedAt: "1 hour ago",
      status: "pending",
    },
    {
      id: 2,
      responder: {
        name: "Mike Rodriguez",
        school: "Denison University",
        rating: 4.7,
        profilePic: "/placeholder.svg?height=50&width=50",
        verified: true,
        completedServices: 23,
      },
      message:
        "Hey! I have this textbook and I'm willing to rent it to you for the semester. It's in good condition with some highlighting but all pages are intact. Rental would be $60 for the whole semester.",
      price: "$60/semester",
      condition: "Good",
      respondedAt: "3 hours ago",
      status: "pending",
    },
    {
      id: 3,
      responder: {
        name: "Sarah Kim",
        school: "Denison University",
        rating: 4.8,
        profilePic: "/placeholder.svg?height=50&width=50",
        verified: true,
        completedServices: 31,
      },
      message:
        "I have the Campbell Biology textbook! It's the 12th edition and in very good condition. I'm looking to sell it for $200. I also have the study guide that goes with it if you're interested - I could do both for $220.",
      price: "$200",
      condition: "Very Good",
      respondedAt: "5 hours ago",
      status: "accepted",
    },
  ]

  const handleAcceptResponse = (responseId) => {
    console.log("Accepting response:", responseId)
    // Handle accept logic
  }

  const pendingResponses = responses.filter((res) => res.status === "pending")
  const acceptedResponses = responses.filter((res) => res.status === "accepted")

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
          <h1 className="text-xl font-bold text-gray-900">Responses</h1>
          <p className="text-sm text-gray-600">{request?.title || "Need Biology Textbook"}</p>
        </div>
      </div>

      <div className="p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="responses">Responses ({pendingResponses.length})</TabsTrigger>
            <TabsTrigger value="accepted">Accepted ({acceptedResponses.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="responses" className="space-y-4 mt-4">
            {pendingResponses.map((response) => (
              <Card key={response.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3 mb-4">
                    <img
                      src={response.responder.profilePic || "/placeholder.svg"}
                      alt={response.responder.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900">{response.responder.name}</h3>
                        {response.responder.verified && (
                          <Badge className="bg-green-100 text-green-800 text-xs">Verified</Badge>
                        )}
                        <Badge className={getStatusColor(response.status)}>{response.status}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span>{response.responder.rating}</span>
                        </div>
                        <span>{response.responder.completedServices} completed</span>
                        <span>{response.respondedAt}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-orange-500">{response.price}</div>
                      <div className="text-sm text-gray-600">Condition: {response.condition}</div>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4">{response.message}</p>

                  <div className="flex gap-3">
                    <Button variant="outline" className="flex-1 bg-transparent">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                    <Button variant="outline">View Profile</Button>
                    <Button
                      className="bg-orange-500 hover:bg-orange-600"
                      onClick={() => handleAcceptResponse(response.id)}
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
            {acceptedResponses.map((response) => (
              <Card key={response.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3 mb-4">
                    <img
                      src={response.responder.profilePic || "/placeholder.svg"}
                      alt={response.responder.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900">{response.responder.name}</h3>
                        <Badge className={getStatusColor(response.status)}>{response.status}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span>{response.responder.rating}</span>
                        </div>
                        <span>{response.respondedAt}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-orange-500">{response.price}</div>
                    </div>
                  </div>

                  <div className="bg-green-50 rounded-lg p-3 mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">✅ Deal Accepted</h4>
                    <p className="text-sm text-gray-600">
                      You've accepted this offer. Contact the seller to arrange pickup.
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" className="flex-1 bg-transparent">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                    <Button variant="outline" className="flex-1 bg-transparent">
                      <Phone className="h-4 w-4 mr-2" />
                      Call
                    </Button>
                    <Button className="flex-1 bg-green-500 hover:bg-green-600">Mark Complete</Button>
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

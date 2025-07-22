"use client"

import { useState } from "react"
import { ArrowLeft, Star, Calendar, MessageCircle, Flag, Shield, Award } from "lucide-react"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import Navbar from "../components/common/Navbar"

export default function UserProfilePage({ user, onBack }) {
  const [isFollowing, setIsFollowing] = useState(false)

  const userServices = [
    {
      id: 1,
      title: "Professional Nail Art",
      category: "Beauty & Wellness",
      price: "$25",
      rating: 4.9,
      reviews: 12,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 2,
      title: "Math Tutoring",
      category: "Academic Help",
      price: "$20/hr",
      rating: 4.8,
      reviews: 8,
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  const reviews = [
    {
      id: 1,
      reviewer: "Mike Johnson",
      rating: 5,
      comment: "Amazing nail art! Very professional and friendly. Highly recommend!",
      service: "Professional Nail Art",
      date: "2 days ago",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      reviewer: "Emma Davis",
      rating: 5,
      comment: "Great tutor, helped me understand calculus concepts easily. Patient and knowledgeable.",
      service: "Math Tutoring",
      date: "1 week ago",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      reviewer: "Alex Rivera",
      rating: 4,
      comment: "Good service, would book again. Very reliable and on time.",
      service: "Professional Nail Art",
      date: "2 weeks ago",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const achievements = [
    { icon: <Star className="h-5 w-5" />, title: "Top Rated", description: "4.8+ rating" },
    { icon: <Award className="h-5 w-5" />, title: "Verified Pro", description: "50+ completed services" },
    { icon: <Shield className="h-5 w-5" />, title: "Trusted Member", description: "Member since 2023" },
  ]

  if (!user) return null

  return (
    <div className="pb-20">
      <Navbar />
      <div className="bg-white shadow-sm p-4 flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold text-gray-900 flex-1">Profile</h1>
        <Button variant="ghost" size="icon">
          <Flag className="h-5 w-5" />
        </Button>
      </div>

      <div className="p-4 space-y-6">
        {/* Profile Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-4 mb-6">
              <img
                src={user.profilePic || "/placeholder.svg"}
                alt={user.name}
                className="w-24 h-24 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
                  {user.verified && (
                    <Badge className="bg-green-100 text-green-800">
                      <Shield className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
                <p className="text-gray-600 mb-2">
                  {user.school} • {user.major}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">4.8</span>
                    <span>(24 reviews)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Joined Dec 2023</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button className="bg-orange-500 hover:bg-orange-600 flex-1">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsFollowing(!isFollowing)}
                    className={isFollowing ? "bg-gray-100" : ""}
                  >
                    {isFollowing ? "Following" : "Follow"}
                  </Button>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-500">15</div>
                <div className="text-sm text-gray-600">Services</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-500">89</div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-500">98%</div>
                <div className="text-sm text-gray-600">Response Rate</div>
              </div>
            </div>

            {/* Achievements */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Achievements</h3>
              <div className="flex gap-3 overflow-x-auto">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-orange-50 rounded-full px-3 py-2 whitespace-nowrap"
                  >
                    <div className="text-orange-500">{achievement.icon}</div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{achievement.title}</div>
                      <div className="text-xs text-gray-600">{achievement.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="services">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="services" className="space-y-4 mt-4">
            {userServices.map((service) => (
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
                          <p className="text-sm text-gray-600">{service.category}</p>
                        </div>
                        <span className="font-bold text-orange-500">{service.price}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{service.rating}</span>
                        </div>
                        <span className="text-sm text-gray-600">({service.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="reviews" className="space-y-4 mt-4">
            {reviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <img
                      src={review.avatar || "/placeholder.svg"}
                      alt={review.reviewer}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium text-gray-900">{review.reviewer}</span>
                        <div className="flex">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500">{review.date}</span>
                      </div>
                      <p className="text-gray-700 text-sm mb-2">{review.comment}</p>
                      <p className="text-xs text-gray-500">Service: {review.service}</p>
                    </div>
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

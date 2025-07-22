"use client"

import { useState, useEffect } from "react"
import { Search, Filter, MapPin, Clock, Sparkles, Zap } from "lucide-react"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Card, CardContent } from "../components/ui/card"
import { ServiceCardSkeleton } from "../components/common/LoadingSpinner"
import Navbar from "../components/common/Navbar"

// Dummy data without ratings
const services = [
  {
    id: 1,
    title: "Nail Art & Manicure",
    description: "Professional nail art and manicure services in your dorm!",
    category: "Beauty & Wellness",
    type: "offer",
    price: "$25",
    location: "East Quad",
    time: "2 hours ago",
    isRecurring: true,
    poster: {
      name: "Sarah Chen",
      school: "Denison University",
      profilePic: "/placeholder.svg?height=40&width=40",
    },
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    title: "Need Calculus Tutor",
    description: "Looking for help with Calculus II, willing to pay $20/hour",
    category: "Academic Help",
    type: "request",
    price: "$20/hr",
    location: "Library",
    time: "4 hours ago",
    poster: {
      name: "Mike Johnson",
      school: "Denison University",
      profilePic: "/placeholder.svg?height=40&width=40",
    },
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    title: "Airport Ride Share",
    description: "Driving to Columbus Airport this Friday, 3 seats available",
    category: "Transportation",
    type: "offer",
    price: "$15",
    location: "Campus Center",
    time: "6 hours ago",
    poster: {
      name: "Alex Rivera",
      school: "Denison University",
      profilePic: "/placeholder.svg?height=40&width=40",
    },
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    title: "Dog Walking Service",
    description: "Experienced dog walker available for daily walks",
    category: "Pet Care",
    type: "offer",
    price: "$10/walk",
    location: "West Quad",
    time: "8 hours ago",
    isRecurring: true,
    poster: {
      name: "Emma Davis",
      school: "Denison University",
      profilePic: "/placeholder.svg?height=40&width=40",
    },
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 5,
    title: "Need Biology Textbook",
    description: "Looking to buy or rent Campbell Biology 12th edition",
    category: "Textbook Exchange",
    type: "request",
    price: "Negotiable",
    location: "Science Building",
    time: "1 day ago",
    poster: {
      name: "Jordan Kim",
      school: "Denison University",
      profilePic: "/placeholder.svg?height=40&width=40",
    },
    image: "/placeholder.svg?height=200&width=300",
  },
]

const categories = [
  "All",
  "Academic Help",
  "Beauty & Wellness",
  "Transportation",
  "Pet Care",
  "Textbook Exchange",
  "Food Pickup",
]

export default function HomeScreen({ onServiceSelect, onUserProfileView }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [serviceFilter, setServiceFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(true)
  const [filteredServices, setFilteredServices] = useState([])

  // Simulate API loading
  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      const filtered = services.filter((service) => {
        const matchesSearch =
          service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          service.description.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = selectedCategory === "All" || service.category === selectedCategory
        const matchesServiceType = serviceFilter === "all" || service.type === serviceFilter
        return matchesSearch && matchesCategory && matchesServiceType
      })
      setFilteredServices(filtered)
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [searchTerm, selectedCategory, serviceFilter])

  return (
    <div className="pb-20 bg-gradient-to-br from-[#FF7F00]/5 via-white to-[#FF7F00]/10 min-h-screen">
      {/* Header */}
      <Navbar />
      <div className="bg-white/80 backdrop-blur-md shadow-sm p-4 border-b border-[#FF7F00]/20">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-[#FF7F00] flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Discover Services
            </h2>
            <p className="text-gray-600 text-sm">Find what you need on campus ✨</p>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
              className="px-3 py-2 border-2 border-[#FF7F00]/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF7F00] focus:border-[#FF7F00] bg-white/80 backdrop-blur-sm"
            >
              <option value="all">All Services 🌟</option>
              <option value="offer">Offers 💫</option>
              <option value="request">Requests 🙋‍♀️</option>
            </select>
            <Button variant="ghost" size="icon" className="hover:bg-[#FF7F00]/10">
              <Filter className="h-5 w-5 text-[#FF7F00]" />
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-[#FF7F00]/60" />
          <Input
            placeholder="Search services... 🔍"
            className="pl-10 border-2 border-[#FF7F00]/20 focus:border-[#FF7F00] focus:ring-[#FF7F00] bg-white/80 backdrop-blur-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Categories */}
      <div className="p-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "secondary"}
              className={`whitespace-nowrap cursor-pointer transition-all duration-200 ${
                selectedCategory === category
                  ? "bg-[#FF7F00] hover:bg-[#FF7F00]/90 text-white shadow-lg"
                  : "hover:bg-[#FF7F00]/10 hover:text-[#FF7F00] bg-white/80 backdrop-blur-sm border-[#FF7F00]/20"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>

      {/* Services Feed */}
      <div className="px-4 space-y-4">
        {isLoading ? (
          // Loading skeletons
          <>
            {[1, 2, 3, 4, 5].map((i) => (
              <ServiceCardSkeleton key={i} />
            ))}
          </>
        ) : filteredServices.length === 0 ? (
          // Empty state
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-[#FF7F00]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-12 h-12 text-[#FF7F00]" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No services found 🤔</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("All")
                setServiceFilter("all")
              }}
              className="bg-[#FF7F00] hover:bg-[#FF7F00]/90"
            >
              Clear Filters ✨
            </Button>
          </div>
        ) : (
          // Services list
          filteredServices.map((service) => (
            <Card
              key={service.id}
              className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm border-[#FF7F00]/10 hover:border-[#FF7F00]/20"
              onClick={() => onServiceSelect(service)}
            >
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <img
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    className="w-20 h-20 rounded-lg object-cover border-2 border-[#FF7F00]/10"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">{service.title}</h3>
                        <div className="flex gap-1 mt-1">
                          <Badge
                            variant="outline"
                            className={`text-xs ${
                              service.type === "offer"
                                ? "border-green-500 text-green-700 bg-green-50"
                                : "border-blue-500 text-blue-700 bg-blue-50"
                            }`}
                          >
                            {service.type === "offer" ? "Offering 💫" : "Requesting 🙋‍♀️"}
                          </Badge>
                          {service.isRecurring && (
                            <Badge className="bg-[#FF7F00]/10 text-[#FF7F00] border-[#FF7F00]/20 text-xs">
                              Recurring
                            </Badge>
                          )}
                        </div>
                      </div>
                      <span className="font-bold text-[#FF7F00]">{service.price}</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">{service.description}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-[#FF7F00]/60" />
                        {service.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-[#FF7F00]/60" />
                        {service.time}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <img
                        src={service.poster.profilePic || "/placeholder.svg"}
                        alt={service.poster.name}
                        className="w-6 h-6 rounded-full cursor-pointer border-2 border-[#FF7F00]/20 hover:border-[#FF7F00]/40 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation()
                          onUserProfileView(service.poster)
                        }}
                      />
                      <span
                        className="text-sm text-gray-700 cursor-pointer hover:text-[#FF7F00] transition-colors"
                        onClick={(e) => {
                          e.stopPropagation()
                          onUserProfileView(service.poster)
                        }}
                      >
                        {service.poster.name}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

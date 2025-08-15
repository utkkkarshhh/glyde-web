"use client"

import { useState, useEffect } from "react"
import { Search, Filter, MapPin, Clock, Sparkles, Zap, RefreshCw } from "lucide-react"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Card, CardContent } from "../components/ui/card"
import { ServiceCardSkeleton } from "../components/common/LoadingSpinner"
import Navbar from "../components/common/Navbar"
import { getServiceCategories } from "@/actions/masterActions"
import { getServiceListings } from "@/actions/serviceActions";
import { Link } from "react-router-dom";

export default function HomeScreen() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState({ id: "all", service_category: "All" })
  const [serviceFilter, setServiceFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(true)
  const [services, setServices] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getServiceCategories()
        if (response.success) {
          setCategories([{ id: "all", service_category: "All" }, ...response.data])
        }
      } catch (error) {
        console.error("Failed to fetch categories", error)
      }
    }
    fetchCategories()
  }, [])

  useEffect(() => {
    const fetchServices = async () => {
      setIsLoading(true)
      try {
        const params = {}
        if (selectedCategory.id !== "all") {
          params.service_category_id = selectedCategory.id
        }
        if (serviceFilter !== "all") {
          params.listing_type = serviceFilter
        }
        const response = await getServiceListings(params)
        if (response.success) {
          setServices(response.data)
        }
      } catch (error) {
        console.error("Failed to fetch services", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchServices()
  }, [selectedCategory, serviceFilter])

  const filteredServices = services.filter((service) => {
    return service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
           service.description.toLowerCase().includes(searchTerm.toLowerCase())
  })

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
              <option value="Offer">Offers 💫</option>
              <option value="Request">Requests 🙋‍♀️</option>
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
              key={category.id}
              variant={selectedCategory.id === category.id ? "default" : "secondary"}
              className={`whitespace-nowrap cursor-pointer transition-all duration-200 ${
                selectedCategory.id === category.id
                  ? "bg-[#FF7F00] hover:bg-[#FF7F00]/90 text-white shadow-lg"
                  : "hover:bg-[#FF7F00]/10 hover:text-[#FF7F00] bg-white/80 backdrop-blur-sm border-[#FF7F00]/20"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category.service_category}
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
                setSelectedCategory({ id: "all", service_category: "All" })
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
            <Link to={`/service/detail/${service.id}`} key={service.id}>
              <Card
                className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm border-[#FF7F00]/10 hover:border-[#FF7F00]/20 transform-gpu"
              >
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <img
                      src={service.thumbnail || "/placeholder.svg"}
                      alt={service.title}
                      className="w-20 h-20 rounded-lg object-cover border-2 border-[#FF7F00]/10"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900">{service.title}</h3>
                          <div className="flex gap-2 mt-1">
                            <Badge
                              variant="outline"
                              className={`text-xs px-2.5 py-1 ${
                                service.listing_type === "Offer"
                                  ? "border-green-500 text-green-700 bg-green-50"
                                  : "border-blue-500 text-blue-700 bg-blue-50"
                              }`}
                            >
                              {service.listing_type === "Offer" ? "Offering 💫" : "Requesting 🙋‍♀️"}
                            </Badge>
                            {service.is_recurring && (
                              <Badge
                                variant="outline"
                                className="text-xs px-2.5 py-1 border-purple-500 text-purple-700 bg-purple-50 flex items-center gap-1"
                              >
                                <RefreshCw className="h-3 w-3" />
                                Recurring
                              </Badge>
                            )}
                          </div>
                        </div>
                        <span className="font-bold text-[#FF7F00]">${service.price}</span>
                      </div>
                      <p className="text-gray-600 text-sm mb-2 line-clamp-2">{service.description}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-[#FF7F00]/60" />
                          {service.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-[#FF7F00]/60" />
                          {new Date(service.created_at).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <img
                          src={service.user.profile_pic || "/placeholder.svg"}
                          alt={service.user.first_name}
                          className="w-6 h-6 rounded-full cursor-pointer border-2 border-[#FF7F00]/20 hover:border-[#FF7F00]/40 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation()
                          }}
                        />
                        <span
                          className="text-sm text-gray-700 cursor-pointer hover:text-[#FF7F00] transition-colors"
                          onClick={(e) => {
                            e.stopPropagation()
                          }}
                        >
                          {service.user.first_name} {service.user.last_name}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}

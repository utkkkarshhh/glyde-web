
"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Camera, MapPin, DollarSign, RefreshCw } from "lucide-react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Checkbox } from "../components/ui/checkbox"
import Navbar from "../components/common/Navbar"
import { getServiceCategories } from "@/actions/masterActions"
import { createService } from "@/actions/serviceActions"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

export default function AddServiceScreen({ onServiceAdded }) {
  const [serviceType, setServiceType] = useState("offer")
  const [categories, setCategories] = useState([])
  const [thumbnail, setThumbnail] = useState(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    location: "",
    date: "",
    time: "",
    isRecurring: false,
    recurringFrequency: "weekly",
  })

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getServiceCategories()
        if (response.success) {
          setCategories(response.data)
        }
      } catch (error) {
        console.error("Failed to fetch categories", error)
        toast.error("Failed to fetch categories");
      }
    }
    fetchCategories()
  }, [])

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setThumbnail(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const datetime = `${formData.date} ${formData.time}`;
    const listingType = serviceType.charAt(0).toUpperCase() + serviceType.slice(1);

    const payload = {
      title: formData.title,
      description: formData.description,
      category: formData.category,
      price: formData.price,
      location: formData.location,
      datetime: datetime,
      is_recurring: formData.isRecurring ? 1 : 0,
      listing_type: listingType,
      service_category: formData.category,
      thumbnail: thumbnail,
    };

    try {
      const response = await createService(payload);
      if (response.success) {
        toast.success(response.message);
        // onServiceAdded(); // This was passed as a prop, but it's better to navigate
        navigate("/home");
      } else {
        toast.error(response.message || "Failed to create service");
      }
    } catch (error) {
      console.error("Failed to create service", error);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  }

  return (
    <div className="pb-20 bg-gradient-to-br from-[#FF7F00]/5 via-white to-[#FF7F00]/10 min-h-screen">
      {/* Header */}
      <Navbar />
      <div className="bg-white/80 backdrop-blur-md shadow-sm p-4 flex items-center gap-3 border-b border-[#FF7F00]/20">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="hover:bg-[#FF7F00]/10">
          <ArrowLeft className="h-5 w-5 text-[#FF7F00]" />
        </Button>
        <h1 className="text-xl font-bold text-[#FF7F00]">Add Service</h1>
      </div>

      <div className="p-4">
        {/* Service Type Selection */}
        <Card className="mb-6 bg-white/80 backdrop-blur-sm border-[#FF7F00]/10">
          <CardHeader>
            <CardTitle className="text-lg text-[#FF7F00]">What would you like to do?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant={serviceType === "offer" ? "default" : "outline"}
                className={
                  serviceType === "offer"
                    ? "bg-[#FF7F00] hover:bg-[#FF7F00]/90"
                    : "border-[#FF7F00]/20 hover:bg-[#FF7F00]/10"
                }
                onClick={() => setServiceType("offer")}
              >
                Offer a Service
              </Button>
              <Button
                variant={serviceType === "request" ? "default" : "outline"}
                className={
                  serviceType === "request"
                    ? "bg-[#FF7F00] hover:bg-[#FF7F00]/90"
                    : "border-[#FF7F00]/20 hover:bg-[#FF7F00]/10"
                }
                onClick={() => setServiceType("request")}
              >
                Request a Service
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <Card className="bg-white/80 backdrop-blur-sm border-[#FF7F00]/10">
            <CardContent className="p-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
              <Input
                placeholder={serviceType === "offer" ? "e.g., Professional Nail Art" : "e.g., Need Calculus Tutor"}
                className="border-[#FF7F00]/20 focus:border-[#FF7F00] focus:ring-[#FF7F00]"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </CardContent>
          </Card>

          {/* Category */}
          <Card className="bg-white/80 backdrop-blur-sm border-[#FF7F00]/10">
            <CardContent className="p-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category) => (
                  <Badge
                    key={category.id}
                    variant={formData.category === category.id ? "default" : "outline"}
                    className={`cursor-pointer text-center py-2 ${
                      formData.category === category.id
                        ? "bg-[#FF7F00] hover:bg-[#FF7F00]/90"
                        : "hover:bg-[#FF7F00]/10 border-[#FF7F00]/20"
                    }`}
                    onClick={() => setFormData({ ...formData, category: category.id })}
                  >
                    {category.service_category}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          <Card className="bg-white/80 backdrop-blur-sm border-[#FF7F00]/10">
            <CardContent className="p-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
              <Textarea
                placeholder="Describe your service in detail..."
                rows={4}
                className="border-[#FF7F00]/20 focus:border-[#FF7F00] focus:ring-[#FF7F00]"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </CardContent>
          </Card>

          {/* Price */}
          <Card className="bg-white/80 backdrop-blur-sm border-[#FF7F00]/10">
            <CardContent className="p-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-[#FF7F00]/60" />
                <Input
                  placeholder="e.g., $25 or $20/hour"
                  className="pl-10 border-[#FF7F00]/20 focus:border-[#FF7F00] focus:ring-[#FF7F00]"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>

          {/* Recurring Service (Only for offers) */}
          {serviceType === "offer" && (
            <Card className="bg-white/80 backdrop-blur-sm border-[#FF7F00]/10">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <Checkbox
                    id="recurring"
                    checked={formData.isRecurring}
                    onCheckedChange={(checked) => setFormData({ ...formData, isRecurring: checked })}
                  />
                  <label
                    htmlFor="recurring"
                    className="flex items-center gap-2 font-medium text-gray-900 cursor-pointer"
                  >
                    <RefreshCw className="h-4 w-4 text-[#FF7F00]" />
                    This is a recurring service
                  </label>
                </div>

                <p className="text-sm text-gray-600 mt-2">
                  💡 Recurring services help students find reliable, ongoing help
                </p>
              </CardContent>
            </Card>
          )}

          {/* Location */}
          <Card className="bg-white/80 backdrop-blur-sm border-[#FF7F00]/10">
            <CardContent className="p-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-[#FF7F00]/60" />
                <Input
                  placeholder="e.g., East Quad, Library"
                  className="pl-10 border-[#FF7F00]/20 focus:border-[#FF7F00] focus:ring-[#FF7F00]"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>

          {/* Date & Time */}
          <Card className="bg-white/80 backdrop-blur-sm border-[#FF7F00]/10">
            <CardContent className="p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <Input
                    type="date"
                    className="border-[#FF7F00]/20 focus:border-[#FF7F00] focus:ring-[#FF7F00]"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                  <Input
                    type="time"
                    className="border-[#FF7F00]/20 focus:border-[#FF7F00] focus:ring-[#FF7F00]"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Photo Upload */}
          <Card className="bg-white/80 backdrop-blur-sm border-[#FF7F00]/10">
            <CardContent className="p-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Add Photo</label>
              <div className="border-2 border-dashed border-[#FF7F00]/30 rounded-lg p-6 text-center hover:border-[#FF7F00]/50 transition-colors">
                <input type="file" className="hidden" id="file-upload" onChange={handleFileChange} accept="image/*" />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Camera className="mx-auto h-8 w-8 text-[#FF7F00]/60 mb-2" />
                  <p className="text-gray-500">{thumbnail ? thumbnail.name : "Tap to add a photo"}</p>
                </label>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <Button type="submit" className="w-full bg-[#FF7F00] hover:bg-[#FF7F00]/90 py-3 text-lg font-semibold">
            {serviceType === "offer" ? "Post Service" : "Post Request"} ✨
          </Button>
        </form>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import {
  ArrowRight,
  Users,
  Shield,
  Zap,
  Instagram,
  Twitter,
  TwitterIcon as TikTok,
  MessageCircle,
  Sparkles,
} from "lucide-react"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Badge } from "../components/ui/badge"

export default function LandingPage({ onGetStarted }) {
  const [email, setEmail] = useState("")

  const features = [
    {
      icon: <Users className="h-8 w-8" />,
      title: "Campus Community",
      description: "Connect with verified Denison students 🎓",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Safe & Verified",
      description: "College email verification keeps it secure ✨",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Quick Connections",
      description: "Find what you need or offer what you've got 🚀",
    },
  ]

  const categories = [
    { name: "Beauty & Wellness", emoji: "💄", count: "25+" },
    { name: "Academic Help", emoji: "📚", count: "40+" },
    { name: "Transportation", emoji: "🚗", count: "15+" },
    { name: "Food Pickup", emoji: "🍕", count: "20+" },
    { name: "Pet Care", emoji: "🐕", count: "10+" },
    { name: "Tech Support", emoji: "💻", count: "18+" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FF7F00]/5 via-white to-[#FF7F00]/10">
      {/* Navigation */}
      <nav className="bg-[#FF7F00]/10 backdrop-blur-md border-b border-[#FF7F00]/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#FF7F00] rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-[#FF7F00]">Glyde</h1>
                <p className="text-xs text-gray-600">Denison University</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" className="text-gray-700 hover:text-[#FF7F00]">
                About
              </Button>
              <Button variant="ghost" className="text-gray-700 hover:text-[#FF7F00]">
                How it Works
              </Button>
              <Button onClick={onGetStarted} className="bg-[#FF7F00] hover:bg-[#FF7F00]/90 text-white px-6">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-[#FF7F00]/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-6 bg-[#FF7F00] text-white border-0 px-4 py-2">✨ Live at Denison University</Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-[#FF7F00]">Campus Life,</span>
              <br />
              <span className="text-gray-900">Simplified</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              The marketplace where Denison students connect, trade, and help each other out. From nail art to
              textbooks, rides to tutoring - we've got you covered! 🎯
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <div className="flex items-center gap-2">
                <input
                  type="email"
                  placeholder="Enter your @denison.edu email"
                  className="px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF7F00] w-80"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button
                  onClick={onGetStarted}
                  className="bg-[#FF7F00] hover:bg-[#FF7F00]/90 text-white px-8 py-3 rounded-full"
                >
                  Join Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-[#FF7F00]/80 border-2 border-white"></div>
                  ))}
                </div>
                <span>200+ Students</span>
              </div>
              <div>🔥 Growing Fast</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Denison Students <span className="text-[#FF7F00]">Love</span> Glyde
            </h2>
            <p className="text-xl text-gray-600">Built by students, for students. Simple and effective 🎯</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#FF7F00] flex items-center justify-center text-white mx-auto mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-[#FF7F00]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need <span className="text-[#FF7F00]">On Campus</span>
            </h2>
            <p className="text-xl text-gray-600">From the essentials to the extras 🔥</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <Card
                key={index}
                className="border-0 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">{category.emoji}</div>
                  <h3 className="font-semibold text-gray-900 mb-2">{category.name}</h3>
                  <Badge variant="secondary" className="bg-[#FF7F00]/10 text-[#FF7F00]">
                    {category.count} services
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#FF7F00]">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Connect with Your Campus? 🚀</h2>
          <p className="text-xl text-white/90 mb-8">Join your fellow Denison students on Glyde!</p>
          <Button
            onClick={onGetStarted}
            size="lg"
            className="bg-white text-[#FF7F00] hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
          >
            Get Started - It's Free! ✨
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-[#FF7F00] rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold">Glyde</h3>
              </div>
              <p className="text-gray-400 mb-4">The campus marketplace for Denison University students. 💯</p>
              <div className="flex gap-4">
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <Instagram className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <TikTok className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <Twitter className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <MessageCircle className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    How it Works
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Safety
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Guidelines
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Community
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Guidelines
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Glyde. Made for Denison University students.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

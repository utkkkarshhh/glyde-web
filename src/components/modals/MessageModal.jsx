"use client"

import { useState } from "react"
import { MessageCircle, Send, X } from "lucide-react"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

export default function MessageModal({ isOpen, onClose, onSend, service, type }) {
  const [message, setMessage] = useState("")

  const handleSend = () => {
    if (message.trim()) {
      onSend({
        message: message.trim(),
        serviceId: service?.id,
        type: type, // 'request' or 'offer'
      })
      setMessage("")
      onClose()
    }
  }

  if (!isOpen) return null

  const isRequest = type === "request"
  const title = isRequest ? "Request This Service" : "Offer Help"
  const placeholder = isRequest
    ? `Hi ${service?.poster?.name}! I'm interested in your ${service?.title}. `
    : `Hi ${service?.poster?.name}! I can help with your request for ${service?.title}. `

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md border-0 shadow-2xl bg-white">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-bold text-[#FF7F00] flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              {title}
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="bg-[#FF7F00]/5 rounded-lg p-3">
            <h4 className="font-medium text-gray-900">{service?.title}</h4>
            <p className="text-sm text-gray-600">by {service?.poster?.name}</p>
            <p className="text-sm font-medium text-[#FF7F00]">{service?.price}</p>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Your Message</label>
            <Textarea
              placeholder={placeholder + "Let me know if you're interested!"}
              rows={4}
              className="border-[#FF7F00]/20 focus:border-[#FF7F00] focus:ring-[#FF7F00]"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <div className="bg-blue-50 rounded-lg p-3">
            <p className="text-sm text-blue-800">
              💡 <strong>Tip:</strong> Be specific about your needs and availability to get better responses!
            </p>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button
              onClick={handleSend}
              disabled={!message.trim()}
              className="flex-1 bg-[#FF7F00] hover:bg-[#FF7F00]/90"
            >
              <Send className="w-4 h-4 mr-2" />
              Send Message
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

import { Home, Plus, List, User } from "lucide-react"
import { Button } from "../ui/button"

export default function Navigation({ activeTab, onTabChange }) {
  const tabs = [
    { id: "home", icon: Home, label: "Home" },
    { id: "add", icon: Plus, label: "Add" },
    { id: "my-services", icon: List, label: "My Services" },
    { id: "profile", icon: User, label: "Profile" },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="flex">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id

          return (
            <Button
              key={tab.id}
              variant="ghost"
              className={`flex-1 flex-col h-16 rounded-none ${
                isActive ? "text-orange-500 bg-orange-50" : "text-gray-600 hover:text-gray-900"
              }`}
              onClick={() => onTabChange(tab.id)}
            >
              <Icon className={`h-5 w-5 mb-1 ${isActive ? "text-orange-500" : ""}`} />
              <span className="text-xs">{tab.label}</span>
            </Button>
          )
        })}
      </div>
    </div>
  )
}

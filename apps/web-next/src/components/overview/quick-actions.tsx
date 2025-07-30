"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, Plus, Send, Download, Settings, UserPlus } from "lucide-react"

export function QuickActions() {
  const actions = [
    {
      title: "Upload Document",
      description: "Add new training materials",
      icon: Upload,
      action: () => console.log("Upload document"),
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      title: "Create Game",
      description: "Build custom training game",
      icon: Plus,
      action: () => console.log("Create game"),
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      title: "Send Reminders",
      description: "Notify users about pending training",
      icon: Send,
      action: () => console.log("Send reminders"),
      color: "bg-purple-500 hover:bg-purple-600",
    },
    {
      title: "Export Report",
      description: "Download analytics and progress data",
      icon: Download,
      action: () => console.log("Export report"),
      color: "bg-orange-500 hover:bg-orange-600",
    },
    {
      title: "Add Users",
      description: "Invite new team members",
      icon: UserPlus,
      action: () => console.log("Add users"),
      color: "bg-indigo-500 hover:bg-indigo-600",
    },
    {
      title: "Settings",
      description: "Configure platform settings",
      icon: Settings,
      action: () => console.log("Open settings"),
      color: "bg-gray-500 hover:bg-gray-600",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action) => {
            const Icon = action.icon
            return (
              <Button
                key={action.title}
                variant="outline"
                className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-accent"
                onClick={action.action}
              >
                <div className={`p-2 rounded-lg ${action.color} text-white`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium">{action.title}</p>
                  <p className="text-xs text-muted-foreground">{action.description}</p>
                </div>
              </Button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
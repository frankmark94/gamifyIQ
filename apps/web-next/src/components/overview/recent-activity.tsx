"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, CheckCircle, Upload, Play } from "lucide-react"

interface Activity {
  id: string
  user: {
    name: string
    email: string
    avatar?: string
  }
  action: string
  type: "completion" | "upload" | "start" | "achievement"
  timestamp: string
  score?: number
}

interface RecentActivityProps {
  activities?: Activity[]
}

const mockActivities: Activity[] = [
  {
    id: "1",
    user: { name: "John Doe", email: "john@company.com" },
    action: "Completed HIPAA Training",
    type: "completion",
    timestamp: "2 hours ago",
    score: 95,
  },
  {
    id: "2",
    user: { name: "Jane Smith", email: "jane@company.com" },
    action: "Uploaded Code of Conduct v2.1",
    type: "upload",
    timestamp: "4 hours ago",
  },
  {
    id: "3",
    user: { name: "Mike Johnson", email: "mike@company.com" },
    action: "Started Security Awareness Game",
    type: "start",
    timestamp: "6 hours ago",
  },
  {
    id: "4",
    user: { name: "Sarah Wilson", email: "sarah@company.com" },
    action: "Achieved Expert Level in Compliance",
    type: "achievement",
    timestamp: "1 day ago",
    score: 98,
  },
  {
    id: "5",
    user: { name: "Tom Brown", email: "tom@company.com" },
    action: "Completed Data Protection Training",
    type: "completion",
    timestamp: "1 day ago",
    score: 89,
  },
]

export function RecentActivity({ activities = mockActivities }: RecentActivityProps) {
  const getIcon = (type: Activity["type"]) => {
    switch (type) {
      case "completion":
        return CheckCircle
      case "upload":
        return Upload
      case "start":
        return Play
      case "achievement":
        return CheckCircle
      default:
        return Clock
    }
  }

  const getIconColor = (type: Activity["type"]) => {
    switch (type) {
      case "completion":
        return "text-green-500"
      case "upload":
        return "text-blue-500"
      case "start":
        return "text-orange-500"
      case "achievement":
        return "text-purple-500"
      default:
        return "text-gray-500"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => {
            const Icon = getIcon(activity.type)
            const iconColor = getIconColor(activity.type)
            
            return (
              <div key={activity.id} className="flex items-start space-x-4">
                <div className="relative">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={activity.user.avatar} />
                    <AvatarFallback>
                      {activity.user.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`absolute -bottom-1 -right-1 rounded-full bg-background p-1`}>
                    <Icon className={`h-3 w-3 ${iconColor}`} />
                  </div>
                </div>
                
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium leading-none">
                      {activity.user.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.timestamp}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {activity.action}
                  </p>
                  {activity.score && (
                    <Badge variant="secondary" className="text-xs">
                      Score: {activity.score}%
                    </Badge>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, FileText, Gamepad2, TrendingUp, Clock, Trophy } from "lucide-react"

interface StatsCardsProps {
  data?: {
    totalUsers: number
    activeDocuments: number
    totalGames: number
    avgCompletionRate: number
    totalTrainingHours: number
    topPerformingTopics: number
  }
}

export function StatsCards({ data = {
  totalUsers: 1247,
  activeDocuments: 23,
  totalGames: 156,
  avgCompletionRate: 87,
  totalTrainingHours: 3420,
  topPerformingTopics: 12
} }: StatsCardsProps) {
  const stats = [
    {
      title: "Total Users",
      value: data.totalUsers.toLocaleString(),
      change: "+12.5%",
      changeType: "increase" as const,
      icon: Users,
      description: "Active employees in training",
    },
    {
      title: "Active Documents",
      value: data.activeDocuments.toString(),
      change: "+3",
      changeType: "increase" as const,
      icon: FileText,
      description: "Documents ready for training",
    },
    {
      title: "Total Games",
      value: data.totalGames.toString(),
      change: "+23",
      changeType: "increase" as const,
      icon: Gamepad2,
      description: "Generated training games",
    },
    {
      title: "Completion Rate",
      value: `${data.avgCompletionRate}%`,
      change: "+5.2%",
      changeType: "increase" as const,
      icon: TrendingUp,
      description: "Average course completion",
    },
    {
      title: "Training Hours",
      value: data.totalTrainingHours.toLocaleString(),
      change: "+180",
      changeType: "increase" as const,
      icon: Clock,
      description: "Total hours completed",
    },
    {
      title: "Top Topics",
      value: data.topPerformingTopics.toString(),
      change: "stable",
      changeType: "neutral" as const,
      icon: Trophy,
      description: "High-performing categories",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                {stat.changeType !== "neutral" && (
                  <Badge 
                    variant={stat.changeType === "increase" ? "default" : "destructive"}
                    className="text-xs px-1"
                  >
                    {stat.change}
                  </Badge>
                )}
                <span>{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
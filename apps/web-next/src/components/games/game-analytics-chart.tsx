"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

interface Game {
  id: string
  title: string
  description: string
  status: "DRAFT" | "ACTIVE" | "ARCHIVED"
  difficulty: "EASY" | "MEDIUM" | "HARD"
  totalPoints: number
  estimatedDuration: number
  averageScore: number
  completionCount: number
  scenarios: number
  documentName: string
  createdAt: string
  updatedAt: string
  thumbnail?: string
  topic: string
}

interface GameAnalyticsChartProps {
  games: Game[]
}

export function GameAnalyticsChart({ games }: GameAnalyticsChartProps) {
  // Prepare data for top performing games
  const topGames = games
    .filter(game => game.completionCount > 0)
    .sort((a, b) => b.completionCount - a.completionCount)
    .slice(0, 6)
    .map(game => ({
      name: game.title.length > 20 ? game.title.substring(0, 20) + "..." : game.title,
      completions: game.completionCount,
      avgScore: game.averageScore,
    }))

  // Difficulty distribution
  const difficultyData = [
    {
      name: "Easy",
      count: games.filter(g => g.difficulty === "EASY").length,
      color: "#3b82f6"
    },
    {
      name: "Medium", 
      count: games.filter(g => g.difficulty === "MEDIUM").length,
      color: "#f59e0b"
    },
    {
      name: "Hard",
      count: games.filter(g => g.difficulty === "HARD").length,
      color: "#ef4444"
    }
  ]

  // Status distribution
  const statusData = [
    {
      name: "Active",
      count: games.filter(g => g.status === "ACTIVE").length,
      color: "#10b981"
    },
    {
      name: "Draft",
      count: games.filter(g => g.status === "DRAFT").length,
      color: "#6b7280"
    },
    {
      name: "Archived",
      count: games.filter(g => g.status === "ARCHIVED").length,
      color: "#8b5cf6"
    }
  ]

  // Game performance over time (mock trend data)
  const performanceTrend = [
    { month: "Jan", completions: 145, avgScore: 82 },
    { month: "Feb", completions: 167, avgScore: 85 },
    { month: "Mar", completions: 189, avgScore: 87 },
    { month: "Apr", completions: 234, avgScore: 89 },
    { month: "May", completions: 278, avgScore: 88 },
    { month: "Jun", completions: 298, avgScore: 91 },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Top Performing Games */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Top Performing Games</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topGames}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                fontSize={12}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [
                  name === "completions" ? `${value} completions` : `${value}% avg score`,
                  name === "completions" ? "Completions" : "Average Score"
                ]}
              />
              <Bar dataKey="completions" fill="#3b82f6" name="completions" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Difficulty Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Difficulty Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={difficultyData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {difficultyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Performance Trend */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Game Performance Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Bar yAxisId="left" dataKey="completions" fill="#10b981" name="Completions" />
              <Line 
                yAxisId="right" 
                type="monotone" 
                dataKey="avgScore" 
                stroke="#f59e0b" 
                strokeWidth={3}
                name="Average Score (%)"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Status Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Game Status</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
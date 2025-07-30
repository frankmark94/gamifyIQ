"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

// Mock data for charts
const userActivityData = [
  { name: "Jan", users: 1200, sessions: 2400 },
  { name: "Feb", users: 1100, sessions: 2100 },
  { name: "Mar", users: 1500, sessions: 2800 },
  { name: "Apr", users: 1300, sessions: 2200 },
  { name: "May", users: 1800, sessions: 3200 },
  { name: "Jun", users: 1600, sessions: 2900 },
  { name: "Jul", users: 1900, sessions: 3500 },
]

const gameCompletionData = [
  { name: "Week 1", completed: 65, started: 80 },
  { name: "Week 2", completed: 78, started: 95 },
  { name: "Week 3", completed: 82, started: 100 },
  { name: "Week 4", completed: 88, started: 105 },
  { name: "Week 5", completed: 92, started: 110 },
  { name: "Week 6", completed: 95, started: 112 },
]

const documentStatusData = [
  { name: "Processed", value: 23, color: "#10b981" },
  { name: "Processing", value: 3, color: "#f59e0b" },
  { name: "Failed", value: 1, color: "#ef4444" },
  { name: "Uploading", value: 2, color: "#3b82f6" },
]

const topicsData = [
  { name: "HIPAA Compliance", completions: 234 },
  { name: "Security Awareness", completions: 189 },
  { name: "Data Protection", completions: 156 },
  { name: "Code of Conduct", completions: 145 },
  { name: "Emergency Procedures", completions: 98 },
]

const scoreDistributionData = [
  { range: "90-100%", count: 145 },
  { range: "80-89%", count: 189 },
  { range: "70-79%", count: 156 },
  { range: "60-69%", count: 78 },
  { range: "Below 60%", count: 23 },
]

export function AnalyticsCharts() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* User Activity Timeline */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>User Activity Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={userActivityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="users"
                stackId="1"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.6}
                name="Active Users"
              />
              <Area
                type="monotone"
                dataKey="sessions"
                stackId="2"
                stroke="#10b981"
                fill="#10b981"
                fillOpacity={0.6}
                name="Sessions"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Document Processing Status */}
      <Card>
        <CardHeader>
          <CardTitle>Document Status</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={documentStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {documentStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Game Completion Trends */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Game Completion Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={gameCompletionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="started"
                stroke="#f59e0b"
                strokeWidth={2}
                name="Games Started"
              />
              <Line
                type="monotone"
                dataKey="completed"
                stroke="#10b981"
                strokeWidth={2}
                name="Games Completed"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Score Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Score Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={scoreDistributionData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="range" type="category" width={80} />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Popular Topics */}
      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle>Most Popular Training Topics</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topicsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="completions" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
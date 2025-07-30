"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from "recharts"
import { 
  TrendingUp,
  TrendingDown,
  Users,
  BookOpen,
  Trophy,
  Clock,
  Download,
  Calendar,
  Filter,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  Target,
  Award,
  GraduationCap,
  UserCheck
} from "lucide-react"

const completionData = [
  { month: "Jan", completed: 245, started: 312 },
  { month: "Feb", completed: 289, started: 356 },
  { month: "Mar", completed: 334, started: 398 },
  { month: "Apr", completed: 287, started: 342 },
  { month: "May", completed: 398, started: 445 },
  { month: "Jun", completed: 456, started: 512 }
]

const engagementData = [
  { week: "Week 1", activeUsers: 142, sessions: 289 },
  { week: "Week 2", activeUsers: 158, sessions: 324 },
  { week: "Week 3", activeUsers: 134, sessions: 267 },
  { week: "Week 4", activeUsers: 178, sessions: 356 },
  { week: "Week 5", activeUsers: 165, sessions: 389 },
  { week: "Week 6", activeUsers: 192, sessions: 412 }
]

const departmentData = [
  { name: "IT", completion: 94, users: 28 },
  { name: "HR", completion: 87, users: 15 },
  { name: "Sales", completion: 76, users: 42 },
  { name: "Marketing", completion: 83, users: 22 },
  { name: "Finance", completion: 91, users: 18 },
  { name: "Operations", completion: 79, users: 35 }
]

const gamePerformanceData = [
  { name: "HIPAA Training", plays: 284, avgScore: 89.5, completion: 94 },
  { name: "Code of Conduct", plays: 267, avgScore: 92.1, completion: 87 },
  { name: "Data Privacy", plays: 198, avgScore: 86.3, completion: 82 },
  { name: "Safety Protocols", plays: 156, avgScore: 78.9, completion: 76 },
  { name: "Ethics Training", plays: 134, avgScore: 91.2, completion: 89 }
]

const trainingProgressData = [
  { date: "Jan 1", cumulative: 1240, daily: 45 },
  { date: "Jan 8", cumulative: 1386, daily: 52 },
  { date: "Jan 15", cumulative: 1542, daily: 48 },
  { date: "Jan 22", cumulative: 1698, daily: 61 },
  { date: "Jan 29", cumulative: 1867, daily: 55 },
  { date: "Feb 5", cumulative: 2034, daily: 58 }
]

const certificateDistribution = [
  { name: "HIPAA Certified", value: 156, color: "#8884d8" },
  { name: "Ethics Champion", value: 134, color: "#82ca9d" },
  { name: "Data Privacy Expert", value: 98, color: "#ffc658" },
  { name: "Safety Leader", value: 76, color: "#ff7300" },
  { name: "Compliance Specialist", value: 45, color: "#8dd1e1" }
]

export function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState("6months")
  const [selectedMetric, setSelectedMetric] = useState("all")

  const overallStats = {
    totalTrainings: 1847,
    totalUsers: 160,
    averageCompletion: 84.2,
    certificatesIssued: 509,
    totalHours: 3642,
    monthlyGrowth: 12.5
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Training performance insights and reporting
          </p>
        </div>
        <div className="flex space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                {timeRange === "6months" ? "Last 6 Months" : 
                 timeRange === "3months" ? "Last 3 Months" : "Last Month"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Time Range</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setTimeRange("1month")}>
                Last Month
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimeRange("3months")}>
                Last 3 Months
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimeRange("6months")}>
                Last 6 Months
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Trainings</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallStats.totalTrainings.toLocaleString()}</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="mr-1 h-3 w-3" />
              +{overallStats.monthlyGrowth}% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallStats.totalUsers}</div>
            <div className="text-xs text-muted-foreground">
              All departments
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Completion</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallStats.averageCompletion}%</div>
            <div className="text-xs text-muted-foreground">
              Training success rate
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Certificates</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallStats.certificatesIssued}</div>
            <div className="text-xs text-muted-foreground">
              Issued this period
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Training Hours</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallStats.totalHours.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">
              Total completed
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagement</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <div className="text-xs text-muted-foreground">
              User participation
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Training Completion Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2 h-5 w-5" />
              Training Completion Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={completionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="completed" fill="#8884d8" name="Completed" />
                <Bar dataKey="started" fill="#82ca9d" name="Started" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* User Engagement */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="mr-2 h-5 w-5" />
              User Engagement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="activeUsers" stroke="#8884d8" name="Active Users" />
                <Line type="monotone" dataKey="sessions" stroke="#82ca9d" name="Sessions" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Department Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="mr-2 h-5 w-5" />
              Department Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis dataKey="name" type="category" width={80} />
                <Tooltip formatter={(value) => [`${value}%`, "Completion Rate"]} />
                <Bar dataKey="completion" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Certificate Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <PieChartIcon className="mr-2 h-5 w-5" />
              Certificate Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={certificateDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {certificateDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Training Progress Over Time */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="mr-2 h-5 w-5" />
            Cumulative Training Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={trainingProgressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="cumulative" 
                stackId="1"
                stroke="#8884d8" 
                fill="#8884d8" 
                fillOpacity={0.6}
                name="Cumulative Completions"
              />
              <Area 
                type="monotone" 
                dataKey="daily" 
                stackId="2"
                stroke="#82ca9d" 
                fill="#82ca9d"
                fillOpacity={0.6}
                name="Daily Completions"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Game Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Trophy className="mr-2 h-5 w-5" />
            Top Performing Games
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {gamePerformanceData.map((game, index) => (
              <div key={game.name} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                    <span className="text-sm font-medium">{index + 1}</span>
                  </div>
                  <div>
                    <div className="font-medium">{game.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {game.plays} plays • {game.completion}% completion
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className="text-sm font-medium">{game.avgScore}%</div>
                    <div className="text-xs text-muted-foreground">Avg Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium">{game.completion}%</div>
                    <div className="text-xs text-muted-foreground">Completion</div>
                  </div>
                  <Badge variant={game.completion >= 85 ? "default" : "secondary"}>
                    {game.completion >= 85 ? "Excellent" : "Good"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
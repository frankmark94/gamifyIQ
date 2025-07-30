"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
  Plus,
  Search, 
  Filter,
  Grid3X3,
  List,
  Play,
  Edit,
  Copy,
  Archive,
  Trash2,
  MoreHorizontal,
  Gamepad2,
  Users,
  Trophy,
  Clock,
  CheckCircle,
  FileText,
  BarChart3
} from "lucide-react"
import { GameLibraryView } from "./game-library-view"
import { GameBuilderDialog } from "./game-builder-dialog"
import { GameAnalyticsChart } from "./game-analytics-chart"

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

const mockGames: Game[] = [
  {
    id: "1",
    title: "HIPAA Privacy Fundamentals",
    description: "Learn the essential principles of HIPAA privacy regulations and how to protect patient information in healthcare settings.",
    status: "ACTIVE",
    difficulty: "MEDIUM",
    totalPoints: 500,
    estimatedDuration: 25,
    averageScore: 87.5,
    completionCount: 234,
    scenarios: 12,
    documentName: "HIPAA Privacy Policy",
    topic: "Healthcare Compliance",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-20T14:22:00Z",
  },
  {
    id: "2", 
    title: "Code of Conduct Mastery",
    description: "Interactive scenarios covering ethical decision-making and professional behavior standards.",
    status: "ACTIVE",
    difficulty: "EASY",
    totalPoints: 300,
    estimatedDuration: 15,
    averageScore: 92.1,
    completionCount: 189,
    scenarios: 8,
    documentName: "Code of Conduct",
    topic: "Ethics & Conduct",
    createdAt: "2024-01-12T14:20:00Z",
    updatedAt: "2024-01-18T09:15:00Z",
  },
  {
    id: "3",
    title: "Advanced Security Protocols",
    description: "Complex security scenarios and threat identification for IT professionals.",
    status: "DRAFT",
    difficulty: "HARD", 
    totalPoints: 750,
    estimatedDuration: 45,
    averageScore: 0,
    completionCount: 0,
    scenarios: 15,
    documentName: "Security Awareness Training",
    topic: "Information Security",
    createdAt: "2024-01-20T09:15:00Z",
    updatedAt: "2024-01-20T09:15:00Z",
  },
  {
    id: "4",
    title: "GDPR Compliance Challenge",
    description: "Navigate data protection requirements and privacy rights under GDPR regulations.",
    status: "ACTIVE",
    difficulty: "MEDIUM",
    totalPoints: 400,
    estimatedDuration: 30,
    averageScore: 89.3,
    completionCount: 156,
    scenarios: 10,
    documentName: "Data Protection Guidelines",
    topic: "Data Privacy",
    createdAt: "2024-01-10T16:45:00Z",
    updatedAt: "2024-01-19T11:30:00Z",
  },
  {
    id: "5",
    title: "Emergency Response Simulation",
    description: "Practice emergency procedures and crisis management through realistic scenarios.",
    status: "ARCHIVED",
    difficulty: "MEDIUM",
    totalPoints: 350,
    estimatedDuration: 20,
    averageScore: 85.7,
    completionCount: 98,
    scenarios: 7,
    documentName: "Emergency Procedures",
    topic: "Safety & Emergency",
    createdAt: "2024-01-08T11:30:00Z",
    updatedAt: "2024-01-15T16:45:00Z",
  },
  {
    id: "6",
    title: "Financial Reporting Ethics",
    description: "Learn ethical financial reporting practices and regulatory compliance requirements.",
    status: "ACTIVE",
    difficulty: "HARD",
    totalPoints: 600,
    estimatedDuration: 35,
    averageScore: 78.9,
    completionCount: 67,
    scenarios: 13,
    documentName: "Financial Ethics Guidelines",
    topic: "Financial Compliance",
    createdAt: "2024-01-05T08:20:00Z",
    updatedAt: "2024-01-22T13:10:00Z",
  }
]

export function GameManagement() {
  const [games, setGames] = useState<Game[]>(mockGames)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [builderDialogOpen, setBuilderDialogOpen] = useState(false)

  const filteredGames = games.filter((game) => {
    const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         game.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         game.topic.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || game.status === statusFilter
    const matchesDifficulty = difficultyFilter === "all" || game.difficulty === difficultyFilter
    return matchesSearch && matchesStatus && matchesDifficulty
  })

  const stats = {
    totalGames: games.length,
    activeGames: games.filter(g => g.status === "ACTIVE").length,
    draftGames: games.filter(g => g.status === "DRAFT").length,
    averageCompletion: games.length > 0 
      ? Math.round(games.reduce((sum, game) => sum + game.completionCount, 0) / games.length)
      : 0,
    averageScore: games.filter(g => g.averageScore > 0).length > 0
      ? Math.round(games.filter(g => g.averageScore > 0).reduce((sum, game) => sum + game.averageScore, 0) / games.filter(g => g.averageScore > 0).length)
      : 0,
    totalCompletions: games.reduce((sum, game) => sum + game.completionCount, 0)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Game Management</h1>
          <p className="text-muted-foreground">
            Create, manage, and analyze your training games
          </p>
        </div>
        <Button onClick={() => setBuilderDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Game
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Games</CardTitle>
            <Gamepad2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalGames}</div>
            <p className="text-xs text-muted-foreground">
              {stats.activeGames} active, {stats.draftGames} draft
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Games</CardTitle>
            <Play className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeGames}</div>
            <p className="text-xs text-muted-foreground">
              Ready for training
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Completions</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCompletions}</div>
            <p className="text-xs text-muted-foreground">
              Across all games
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Completion</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageCompletion}</div>
            <p className="text-xs text-muted-foreground">
              Per game average
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageScore}%</div>
            <p className="text-xs text-muted-foreground">
              Overall performance
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Duration</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(games.reduce((sum, game) => sum + game.estimatedDuration, 0) / games.length || 0)}m
            </div>
            <p className="text-xs text-muted-foreground">
              Estimated time
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Game Performance Chart */}
      <GameAnalyticsChart games={games} />

      {/* Filters and Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Game Library</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search games..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-64"
                />
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Status: {statusFilter === "all" ? "All" : statusFilter}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                    All Statuses
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("ACTIVE")}>
                    Active
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("DRAFT")}>
                    Draft
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("ARCHIVED")}>
                    Archived
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Difficulty: {difficultyFilter === "all" ? "All" : difficultyFilter}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by Difficulty</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setDifficultyFilter("all")}>
                    All Levels
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setDifficultyFilter("EASY")}>
                    Easy
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setDifficultyFilter("MEDIUM")}>
                    Medium
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setDifficultyFilter("HARD")}>
                    Hard
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="flex border rounded-md">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <GameLibraryView 
            games={filteredGames} 
            viewMode={viewMode}
            onGameAction={(action, game) => {
              console.log(`${action} action on game:`, game.title)
            }}
          />
        </CardContent>
      </Card>

      <GameBuilderDialog 
        open={builderDialogOpen} 
        onOpenChange={setBuilderDialogOpen}
        onGameCreated={(game) => {
          setGames(prev => [...prev, game])
          setBuilderDialogOpen(false)
        }}
      />
    </div>
  )
}
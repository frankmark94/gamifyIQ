"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { 
  Mail,
  Calendar,
  Trophy,
  Clock,
  GraduationCap,
  Target,
  TrendingUp,
  Award,
  BookOpen,
  CheckCircle,
  Star
} from "lucide-react"

interface User {
  id: string
  email: string
  name: string
  role: "ADMIN" | "MANAGER" | "EMPLOYEE"
  isActive: boolean
  lastLoginAt?: string
  createdAt: string
  updatedAt: string
  avatar?: string
  department?: string
  completedGames: number
  averageScore: number
  totalTrainingHours: number
  certificatesEarned: number
  enrolledCourses: number
  completionRate: number
}

interface UserDetailPanelProps {
  user: User | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

// Mock data for user's recent activity and achievements
const mockRecentGames = [
  { id: "1", title: "HIPAA Privacy Fundamentals", score: 95, completedAt: "2024-01-22T10:30:00Z", duration: 25 },
  { id: "2", title: "Code of Conduct Mastery", score: 88, completedAt: "2024-01-21T14:15:00Z", duration: 18 },
  { id: "3", title: "Data Protection Essentials", score: 92, completedAt: "2024-01-20T16:45:00Z", duration: 22 },
  { id: "4", title: "Security Awareness Training", score: 87, completedAt: "2024-01-19T09:20:00Z", duration: 30 },
]

const mockCertificates = [
  { id: "1", name: "HIPAA Compliance Expert", earnedAt: "2024-01-22T10:30:00Z", score: 95 },
  { id: "2", name: "Ethics Champion", earnedAt: "2024-01-21T14:15:00Z", score: 92 },
  { id: "3", name: "Data Privacy Specialist", earnedAt: "2024-01-20T16:45:00Z", score: 89 },
]

const mockLearningPath = [
  { id: "1", title: "Healthcare Compliance Track", progress: 85, completed: 6, total: 8 },
  { id: "2", title: "Leadership Development", progress: 60, completed: 3, total: 5 },
  { id: "3", title: "Technical Skills", progress: 40, completed: 2, total: 5 },
]

export function UserDetailPanel({ user, open, onOpenChange }: UserDetailPanelProps) {
  if (!user) return null

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getRoleBadge = (role: User["role"]) => {
    const variants = {
      ADMIN: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
      MANAGER: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      EMPLOYEE: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
    }
    return <Badge className={variants[role]}>{role}</Badge>
  }

  const getStatusBadge = (isActive: boolean) => {
    return isActive ? (
      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
        Active
      </Badge>
    ) : (
      <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
        Inactive
      </Badge>
    )
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-[600px] overflow-y-auto">
        <SheetHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="text-lg">
                {user.name.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <SheetTitle className="text-xl">{user.name}</SheetTitle>
              <SheetDescription className="text-base">
                {user.email}
              </SheetDescription>
              <div className="flex items-center space-x-2">
                {getRoleBadge(user.role)}
                {getStatusBadge(user.isActive)}
              </div>
            </div>
          </div>
        </SheetHeader>

        <div className="space-y-6 py-6">
          {/* User Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">User Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Joined {formatDate(user.createdAt)}</span>
              </div>
              {user.lastLoginAt && (
                <div className="flex items-center space-x-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>Last login {formatDate(user.lastLoginAt)}</span>
                </div>
              )}
              {user.department && (
                <div className="flex items-center space-x-2 text-sm">
                  <Target className="h-4 w-4 text-muted-foreground" />
                  <span>{user.department} Department</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Training Stats */}
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  <div>
                    <div className="text-2xl font-bold">{user.averageScore.toFixed(1)}%</div>
                    <div className="text-xs text-muted-foreground">Average Score</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <div>
                    <div className="text-2xl font-bold">{user.completedGames}</div>
                    <div className="text-xs text-muted-foreground">Games Completed</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-blue-500" />
                  <div>
                    <div className="text-2xl font-bold">{user.totalTrainingHours}</div>
                    <div className="text-xs text-muted-foreground">Training Hours</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <GraduationCap className="h-5 w-5 text-purple-500" />
                  <div>
                    <div className="text-2xl font-bold">{user.certificatesEarned}</div>
                    <div className="text-xs text-muted-foreground">Certificates</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Overall Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <TrendingUp className="mr-2 h-5 w-5" />
                Overall Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Completion Rate</span>
                  <span>{user.completionRate}%</span>
                </div>
                <Progress value={user.completionRate} className="h-2" />
                <div className="text-xs text-muted-foreground">
                  {user.completedGames} of {user.enrolledCourses} enrolled courses completed
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Learning Paths */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <BookOpen className="mr-2 h-5 w-5" />
                Learning Paths
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockLearningPath.map((path) => (
                <div key={path.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="font-medium text-sm">{path.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {path.completed}/{path.total}
                    </div>
                  </div>
                  <Progress value={path.progress} className="h-1" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                Recent Games
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockRecentGames.map((game) => (
                  <div key={game.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium text-sm">{game.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {formatDate(game.completedAt)} • {game.duration}m
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm font-medium">{game.score}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Certificates */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Award className="mr-2 h-5 w-5" />
                Certificates Earned
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockCertificates.map((cert) => (
                  <div key={cert.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium text-sm">{cert.name}</div>
                      <div className="text-xs text-muted-foreground">
                        Earned {formatDate(cert.earnedAt)}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Trophy className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm font-medium">{cert.score}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex space-x-2 pt-4">
            <Button className="flex-1">
              <Mail className="mr-2 h-4 w-4" />
              Send Message
            </Button>
            <Button variant="outline" className="flex-1">
              <Target className="mr-2 h-4 w-4" />
              Assign Training
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
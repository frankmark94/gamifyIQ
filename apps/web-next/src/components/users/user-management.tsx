"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  UserPlus,
  Search, 
  Filter,
  Download,
  Send,
  Eye,
  Edit,
  Shield,
  Trash2,
  MoreHorizontal,
  Users,
  UserCheck,
  UserX,
  Trophy,
  Clock,
  GraduationCap,
  Mail
} from "lucide-react"
import { UserInviteDialog } from "./user-invite-dialog"
import { UserDetailPanel } from "./user-detail-panel"

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

const mockUsers: User[] = [
  {
    id: "1",
    email: "john.doe@company.com",
    name: "John Doe",
    role: "ADMIN",
    isActive: true,
    lastLoginAt: "2024-01-22T14:30:00Z",
    createdAt: "2024-01-01T09:00:00Z",
    updatedAt: "2024-01-22T14:30:00Z",
    department: "IT",
    completedGames: 12,
    averageScore: 94.5,
    totalTrainingHours: 45,
    certificatesEarned: 8,
    enrolledCourses: 15,
    completionRate: 87
  },
  {
    id: "2",
    email: "jane.smith@company.com",
    name: "Jane Smith",
    role: "MANAGER",
    isActive: true,
    lastLoginAt: "2024-01-22T10:15:00Z",
    createdAt: "2024-01-02T10:30:00Z",
    updatedAt: "2024-01-22T10:15:00Z",
    department: "HR",
    completedGames: 18,
    averageScore: 96.2,
    totalTrainingHours: 62,
    certificatesEarned: 12,
    enrolledCourses: 20, 
    completionRate: 95
  },
  {
    id: "3",
    email: "mike.johnson@company.com",
    name: "Mike Johnson",
    role: "EMPLOYEE",
    isActive: true,
    lastLoginAt: "2024-01-21T16:45:00Z",
    createdAt: "2024-01-05T11:20:00Z",
    updatedAt: "2024-01-21T16:45:00Z",
    department: "Sales",
    completedGames: 8,
    averageScore: 78.9,
    totalTrainingHours: 28,
    certificatesEarned: 3,
    enrolledCourses: 12,
    completionRate: 72
  },
  {
    id: "4",
    email: "sarah.wilson@company.com", 
    name: "Sarah Wilson",
    role: "EMPLOYEE",
    isActive: true,
    lastLoginAt: "2024-01-22T09:30:00Z",
    createdAt: "2024-01-03T14:15:00Z",
    updatedAt: "2024-01-22T09:30:00Z",
    department: "Marketing",
    completedGames: 15,
    averageScore: 89.7,
    totalTrainingHours: 52,
    certificatesEarned: 6,
    enrolledCourses: 18,
    completionRate: 84
  },
  {
    id: "5",
    email: "robert.brown@company.com",
    name: "Robert Brown",
    role: "EMPLOYEE", 
    isActive: false,
    lastLoginAt: "2024-01-10T13:20:00Z",
    createdAt: "2024-01-08T08:45:00Z",
    updatedAt: "2024-01-15T16:30:00Z",
    department: "Finance",
    completedGames: 5,
    averageScore: 82.1,
    totalTrainingHours: 18,
    certificatesEarned: 2,
    enrolledCourses: 8,
    completionRate: 45
  },
  {
    id: "6",
    email: "emily.davis@company.com",
    name: "Emily Davis",
    role: "MANAGER",
    isActive: true,
    lastLoginAt: "2024-01-22T11:45:00Z",
    createdAt: "2024-01-04T12:00:00Z",
    updatedAt: "2024-01-22T11:45:00Z",
    department: "Operations",
    completedGames: 22,
    averageScore: 91.3,
    totalTrainingHours: 76,
    certificatesEarned: 10,
    enrolledCourses: 25,
    completionRate: 92
  }
]

export function UserManagement() {
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [detailPanelOpen, setDetailPanelOpen] = useState(false)

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.department?.toLowerCase().includes(searchTerm.toLowerCase()) || false
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    const matchesStatus = statusFilter === "all" || 
                         (statusFilter === "active" && user.isActive) ||
                         (statusFilter === "inactive" && !user.isActive)
    return matchesSearch && matchesRole && matchesStatus
  })

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.isActive).length,
    newThisMonth: users.filter(u => {
      const created = new Date(u.createdAt)
      const now = new Date()
      return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear()
    }).length,
    averageCompletion: users.length > 0 
      ? Math.round(users.reduce((sum, user) => sum + user.completionRate, 0) / users.length)
      : 0,
    totalCertificates: users.reduce((sum, user) => sum + user.certificatesEarned, 0),
    totalHours: users.reduce((sum, user) => sum + user.totalTrainingHours, 0)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
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

  const handleUserAction = (action: string, user: User) => {
    if (action === "view") {
      setSelectedUser(user)
      setDetailPanelOpen(true)
    } else {
      console.log(`${action} action on user:`, user.name)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground">
            Manage users, roles, and training progress
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button onClick={() => setInviteDialogOpen(true)}>
            <UserPlus className="mr-2 h-4 w-4" />
            Invite Users
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              {stats.activeUsers} active
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeUsers}</div>
            <p className="text-xs text-muted-foreground">
              {stats.newThisMonth} new this month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Completion</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageCompletion}%</div>
            <p className="text-xs text-muted-foreground">
              Training progress
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Certificates</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCertificates}</div>
            <p className="text-xs text-muted-foreground">
              Earned by users
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Training Hours</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalHours}</div>
            <p className="text-xs text-muted-foreground">
              Total completed
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Users</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.newThisMonth}</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Users</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-64"
                />
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Role: {roleFilter === "all" ? "All" : roleFilter}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by Role</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setRoleFilter("all")}>
                    All Roles
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setRoleFilter("ADMIN")}>
                    Admin
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setRoleFilter("MANAGER")}>
                    Manager
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setRoleFilter("EMPLOYEE")}>
                    Employee
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <UserCheck className="mr-2 h-4 w-4" />
                    Status: {statusFilter === "all" ? "All" : statusFilter}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                    All Users
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("active")}>
                    Active Only
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("inactive")}>
                    Inactive Only
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Avg Score</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>
                          {user.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getRoleBadge(user.role)}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(user.isActive)}
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{user.department}</div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm font-medium">{user.completionRate}%</div>
                      <div className="w-full bg-gray-200 rounded-full h-1">
                        <div 
                          className="bg-primary h-1 rounded-full" 
                          style={{ width: `${user.completionRate}%` }}
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm font-medium">
                      {user.averageScore.toFixed(1)}%
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {user.lastLoginAt ? formatDate(user.lastLoginAt) : "Never"}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleUserAction("view", user)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleUserAction("edit", user)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit User
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleUserAction("role", user)}>
                          <Shield className="mr-2 h-4 w-4" />
                          Change Role
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleUserAction("message", user)}>
                          <Mail className="mr-2 h-4 w-4" />
                          Send Message
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={() => handleUserAction("delete", user)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Remove User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredUsers.length === 0 && (
            <div className="text-center py-8">
              <Users className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">No users found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filters to find users.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <UserInviteDialog 
        open={inviteDialogOpen} 
        onOpenChange={setInviteDialogOpen}
        onUsersInvited={(users) => {
          console.log("Invited users:", users)
          setInviteDialogOpen(false)
        }}
      />

      <UserDetailPanel
        user={selectedUser}
        open={detailPanelOpen}
        onOpenChange={setDetailPanelOpen}
      />
    </div>
  )
}
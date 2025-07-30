"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
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
  X,
  Mail,
  Users,
  Upload,
  Shield
} from "lucide-react"

interface InviteUser {
  email: string
  name: string
  role: "ADMIN" | "MANAGER" | "EMPLOYEE"
  department?: string
}

interface UserInviteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onUsersInvited: (users: InviteUser[]) => void
}

export function UserInviteDialog({ 
  open, 
  onOpenChange, 
  onUsersInvited 
}: UserInviteDialogProps) {
  const [inviteUsers, setInviteUsers] = useState<InviteUser[]>([])
  const [currentUser, setCurrentUser] = useState<Partial<InviteUser>>({
    email: "",
    name: "",
    role: "EMPLOYEE",
    department: ""
  })
  const [bulkEmails, setBulkEmails] = useState("")
  const [inviteMode, setInviteMode] = useState<"single" | "bulk">("single")

  const addUser = () => {
    if (currentUser.email && currentUser.name && currentUser.role) {
      setInviteUsers(prev => [...prev, currentUser as InviteUser])
      setCurrentUser({
        email: "",
        name: "",
        role: "EMPLOYEE",
        department: ""
      })
    }
  }

  const removeUser = (index: number) => {
    setInviteUsers(prev => prev.filter((_, i) => i !== index))
  }

  const processBulkEmails = () => {
    const emails = bulkEmails.split('\n').filter(email => email.trim())
    const newUsers: InviteUser[] = emails.map(email => {
      const cleanEmail = email.trim()
      const name = cleanEmail.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
      return {
        email: cleanEmail,
        name: name,
        role: "EMPLOYEE" as const,
        department: ""
      }
    })
    setInviteUsers(prev => [...prev, ...newUsers])
    setBulkEmails("")
  }

  const sendInvites = () => {
    onUsersInvited(inviteUsers)
    setInviteUsers([])
    setCurrentUser({
      email: "",
      name: "",
      role: "EMPLOYEE",
      department: ""
    })
  }

  const getRoleBadge = (role: string) => {
    const variants = {
      ADMIN: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
      MANAGER: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      EMPLOYEE: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
    }
    return <Badge className={variants[role as keyof typeof variants]}>{role}</Badge>
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Invite New Users</DialogTitle>
          <DialogDescription>
            Send invitations to new team members to join the training platform
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Mode Selection */}
          <div className="flex space-x-2">
            <Button
              variant={inviteMode === "single" ? "default" : "outline"}
              size="sm"
              onClick={() => setInviteMode("single")}
            >
              <Users className="mr-2 h-4 w-4" />
              Single User
            </Button>
            <Button
              variant={inviteMode === "bulk" ? "default" : "outline"}
              size="sm"
              onClick={() => setInviteMode("bulk")}
            >
              <Upload className="mr-2 h-4 w-4" />
              Bulk Import
            </Button>
          </div>

          {inviteMode === "single" && (
            <div className="space-y-4 p-4 border rounded-lg">
              <h3 className="text-sm font-medium">Add Individual User</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Address</label>
                  <Input
                    type="email"
                    placeholder="user@company.com"
                    value={currentUser.email}
                    onChange={(e) => setCurrentUser(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <Input
                    placeholder="John Doe"
                    value={currentUser.name}
                    onChange={(e) => setCurrentUser(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Role</label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full justify-start">
                        <Shield className="mr-2 h-4 w-4" />
                        {currentUser.role}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => setCurrentUser(prev => ({ ...prev, role: "EMPLOYEE" }))}>
                        Employee
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setCurrentUser(prev => ({ ...prev, role: "MANAGER" }))}>
                        Manager
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setCurrentUser(prev => ({ ...prev, role: "ADMIN" }))}>
                        Admin
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Department</label>
                  <Input
                    placeholder="HR, IT, Sales..."
                    value={currentUser.department}
                    onChange={(e) => setCurrentUser(prev => ({ ...prev, department: e.target.value }))}
                  />
                </div>
              </div>

              <Button 
                onClick={addUser}
                disabled={!currentUser.email || !currentUser.name}
                className="w-full"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add to Invite List
              </Button>
            </div>
          )}

          {inviteMode === "bulk" && (
            <div className="space-y-4 p-4 border rounded-lg">
              <h3 className="text-sm font-medium">Bulk Email Import</h3>
              <p className="text-sm text-muted-foreground">
                Enter email addresses, one per line. Names will be generated from email addresses.
              </p>
              
              <textarea
                className="w-full min-h-[120px] px-3 py-2 text-sm rounded-md border border-input bg-background"
                placeholder="user1@company.com&#10;user2@company.com&#10;user3@company.com"
                value={bulkEmails}
                onChange={(e) => setBulkEmails(e.target.value)}
              />
              
              <Button 
                onClick={processBulkEmails}
                disabled={!bulkEmails.trim()}
                className="w-full"
              >
                <Upload className="mr-2 h-4 w-4" />
                Import Email Addresses
              </Button>
            </div>
          )}

          {/* Invite List */}
          {inviteUsers.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Users to Invite ({inviteUsers.length})</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setInviteUsers([])}
                >
                  Clear All
                </Button>
              </div>
              
              <div className="max-h-48 overflow-y-auto space-y-2">
                {inviteUsers.map((user, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="font-medium text-sm">{user.name}</div>
                        <div className="text-xs text-muted-foreground">{user.email}</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getRoleBadge(user.role)}
                        {user.department && (
                          <Badge variant="outline" className="text-xs">
                            {user.department}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeUser(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={sendInvites}
            disabled={inviteUsers.length === 0}
          >
            <Mail className="mr-2 h-4 w-4" />
            Send Invites ({inviteUsers.length})
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { 
  Settings,
  Users,
  Shield,
  Bell,
  Palette,
  Database,
  Mail,
  Key,
  Globe,
  FileText,
  Download,
  Upload,
  RefreshCw,
  AlertTriangle,
  Check,
  X,
  Edit,
  Save,
  Eye,
  EyeOff
} from "lucide-react"

interface SystemSetting {
  id: string
  name: string
  description: string
  value: string | boolean
  type: "text" | "boolean" | "select" | "number"
  category: "general" | "security" | "notifications" | "integrations"
  options?: string[]
}

const mockSettings: SystemSetting[] = [
  {
    id: "site_name",
    name: "Site Name",
    description: "The name displayed across the platform",
    value: "GamifyIQ Training Platform",
    type: "text",
    category: "general"
  },
  {
    id: "auto_enroll",
    name: "Auto-enroll New Users",
    description: "Automatically enroll new users in mandatory training",
    value: true,
    type: "boolean",
    category: "general"
  },
  {
    id: "session_timeout",
    name: "Session Timeout (minutes)",
    description: "How long before users are automatically logged out",
    value: "60",
    type: "number",
    category: "security"
  },
  {
    id: "password_policy",
    name: "Password Policy",
    description: "Minimum password requirements",
    value: "strong",
    type: "select",
    category: "security",
    options: ["basic", "medium", "strong"]
  },
  {
    id: "email_notifications",
    name: "Email Notifications",
    description: "Send email notifications for training events",
    value: true,
    type: "boolean",
    category: "notifications"
  },
  {
    id: "reminder_frequency",
    name: "Reminder Frequency",
    description: "How often to send training reminders",
    value: "weekly",
    type: "select",
    category: "notifications",
    options: ["daily", "weekly", "monthly"]
  }
]

export function SettingsDashboard() {
  const [settings, setSettings] = useState<SystemSetting[]>(mockSettings)
  const [activeTab, setActiveTab] = useState("general")
  const [editingSettings, setEditingSettings] = useState<Record<string, boolean>>({})
  const [backupDialogOpen, setBackupDialogOpen] = useState(false)
  const [showApiKey, setShowApiKey] = useState(false)

  const categories = [
    { id: "general", name: "General", icon: Settings },
    { id: "security", name: "Security", icon: Shield },
    { id: "notifications", name: "Notifications", icon: Bell },
    { id: "integrations", name: "Integrations", icon: Globe }
  ]

  const handleSettingChange = (settingId: string, newValue: string | boolean) => {
    setSettings(prev => prev.map(setting => 
      setting.id === settingId ? { ...setting, value: newValue } : setting
    ))
  }

  const toggleEdit = (settingId: string) => {
    setEditingSettings(prev => ({
      ...prev,
      [settingId]: !prev[settingId]
    }))
  }

  const renderSettingInput = (setting: SystemSetting) => {
    const isEditing = editingSettings[setting.id]

    switch (setting.type) {
      case "boolean":
        return (
          <Switch
            checked={setting.value as boolean}
            onCheckedChange={(checked) => handleSettingChange(setting.id, checked)}
            disabled={!isEditing}
          />
        )
      
      case "select":
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" disabled={!isEditing}>
                {setting.value as string}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {setting.options?.map((option) => (
                <DropdownMenuItem
                  key={option}
                  onClick={() => handleSettingChange(setting.id, option)}
                >
                  {option}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )
      
      default:
        return (
          <Input
            value={setting.value as string}
            onChange={(e) => handleSettingChange(setting.id, e.target.value)}
            disabled={!isEditing}
            type={setting.type === "number" ? "number" : "text"}
          />
        )
    }
  }

  const filteredSettings = settings.filter(setting => setting.category === activeTab)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage platform configuration and preferences
          </p>
        </div>
        <div className="flex space-x-2">
          <Dialog open={backupDialogOpen} onOpenChange={setBackupDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Backup
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>System Backup</DialogTitle>
                <DialogDescription>
                  Create a backup of your platform configuration and data
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="settings" defaultChecked />
                  <label htmlFor="settings">Platform Settings</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="users" defaultChecked />
                  <label htmlFor="users">User Data</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="content" defaultChecked />
                  <label htmlFor="content">Training Content</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="analytics" />
                  <label htmlFor="analytics">Analytics Data</label>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setBackupDialogOpen(false)}>
                  Cancel
                </Button>
                <Button>
                  <Download className="mr-2 h-4 w-4" />
                  Create Backup
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="flex space-x-6">
        {/* Sidebar Navigation */}
        <div className="w-64 space-y-2">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Button
                key={category.id}
                variant={activeTab === category.id ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab(category.id)}
              >
                <Icon className="mr-2 h-4 w-4" />
                {category.name}
              </Button>
            )
          })}
        </div>

        {/* Settings Content */}
        <div className="flex-1 space-y-6">
          {/* Settings List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                {categories.find(c => c.id === activeTab)?.icon && (
                  <categories.find(c => c.id === activeTab)!.icon className="mr-2 h-5 w-5" />
                )}
                {categories.find(c => c.id === activeTab)?.name} Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {filteredSettings.map((setting) => (
                <div key={setting.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium">{setting.name}</h3>
                      {editingSettings[setting.id] && (
                        <Badge variant="secondary">Editing</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {setting.description}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-48">
                      {renderSettingInput(setting)}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleEdit(setting.id)}
                    >
                      {editingSettings[setting.id] ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Edit className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Integration Settings */}
          {activeTab === "integrations" && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Key className="mr-2 h-5 w-5" />
                    API Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">API Key</label>
                    <div className="flex space-x-2">
                      <Input
                        type={showApiKey ? "text" : "password"}
                        value="sk-1234567890abcdef..."
                        readOnly
                        className="flex-1"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowApiKey(!showApiKey)}
                      >
                        {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                      <Button variant="outline" size="sm">
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Webhook URL</label>
                    <Input placeholder="https://your-domain.com/webhook" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">Enable API Access</h4>
                      <p className="text-xs text-muted-foreground">
                        Allow external applications to access your data
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Mail className="mr-2 h-5 w-5" />
                    Email Integration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">SMTP Server</label>
                      <Input placeholder="smtp.gmail.com" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Port</label>
                      <Input placeholder="587" type="number" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Username</label>
                      <Input placeholder="your-email@company.com" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Password</label>
                      <Input type="password" placeholder="••••••••" />
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    Test Connection
                  </Button>
                </CardContent>
              </Card>
            </>
          )}

          {/* Security Settings */}
          {activeTab === "security" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="mr-2 h-5 w-5" />
                  Security Audit Log
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { event: "Password policy updated", time: "2 hours ago", user: "Admin" },
                    { event: "Failed login attempt", time: "5 hours ago", user: "user@example.com" },
                    { event: "API key regenerated", time: "1 day ago", user: "Admin" },
                    { event: "User role changed", time: "2 days ago", user: "Manager" }
                  ].map((log, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <div className="font-medium text-sm">{log.event}</div>
                        <div className="text-xs text-muted-foreground">by {log.user}</div>
                      </div>
                      <div className="text-xs text-muted-foreground">{log.time}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* System Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="mr-2 h-5 w-5" />
                System Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2 bg-green-100 rounded-full">
                    <Check className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="text-sm font-medium">Database</div>
                  <div className="text-xs text-green-600">Healthy</div>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2 bg-green-100 rounded-full">
                    <Check className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="text-sm font-medium">API</div>
                  <div className="text-xs text-green-600">Online</div>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2 bg-yellow-100 rounded-full">
                    <AlertTriangle className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div className="text-sm font-medium">Storage</div>
                  <div className="text-xs text-yellow-600">75% Full</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
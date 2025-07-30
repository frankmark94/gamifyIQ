"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Eye, Edit, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Document {
  id: string
  name: string
  status: "PROCESSING" | "PROCESSED" | "FAILED" | "UPLOADING"
  games: number
  completions: number
  lastUpdated: string
}

interface DocumentStatusProps {
  documents?: Document[]
}

const mockDocuments: Document[] = [
  {
    id: "1",
    name: "HIPAA Privacy Policy",
    status: "PROCESSED",
    games: 12,
    completions: 234,
    lastUpdated: "2 hours ago",
  },
  {
    id: "2",
    name: "Code of Conduct",
    status: "PROCESSED",
    games: 8,
    completions: 189,
    lastUpdated: "1 day ago",
  },
  {
    id: "3",
    name: "Security Awareness Training",
    status: "PROCESSING",
    games: 0,
    completions: 0,
    lastUpdated: "5 minutes ago",
  },
  {
    id: "4",
    name: "Data Protection Guidelines",
    status: "PROCESSED",
    games: 5,
    completions: 156,
    lastUpdated: "3 days ago",
  },
  {
    id: "5",
    name: "Emergency Procedures",
    status: "FAILED",
    games: 0,
    completions: 0,
    lastUpdated: "1 hour ago",
  },
]

export function DocumentStatus({ documents = mockDocuments }: DocumentStatusProps) {
  const getStatusColor = (status: Document["status"]) => {
    switch (status) {
      case "PROCESSED":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "PROCESSING":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "FAILED":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "UPLOADING":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const getStatusText = (status: Document["status"]) => {
    switch (status) {
      case "PROCESSED":
        return "Active"
      case "PROCESSING":
        return "Processing"
      case "FAILED":
        return "Failed"
      case "UPLOADING":
        return "Uploading"
      default:
        return "Unknown"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Document Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {documents.map((doc) => (
            <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-muted rounded-md">
                  <FileText className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">{doc.name}</p>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <Badge className={getStatusColor(doc.status)}>
                      {getStatusText(doc.status)}
                    </Badge>
                    <span>•</span>
                    <span>{doc.games} games</span>
                    <span>•</span>
                    <span>{doc.completions} completions</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Eye className="h-4 w-4" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
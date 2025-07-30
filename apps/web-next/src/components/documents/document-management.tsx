"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
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
  Upload, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Edit, 
  Trash2, 
  MoreHorizontal,
  FileText,
  Clock,
  Users,
  CheckCircle,
  AlertCircle,
  XCircle
} from "lucide-react"
import { DocumentUploadDialog } from "./document-upload-dialog"

interface Document {
  id: string
  name: string
  originalName: string
  status: "PROCESSING" | "PROCESSED" | "FAILED" | "UPLOADING"
  fileSize: number
  mimeType: string
  games: number
  completions: number
  averageScore: number
  uploadedAt: string
  processedAt?: string
  uploadedBy: string
}

const mockDocuments: Document[] = [
  {
    id: "1",
    name: "HIPAA Privacy Policy",
    originalName: "hipaa-privacy-policy-v3.1.pdf",
    status: "PROCESSED",
    fileSize: 2450000,
    mimeType: "application/pdf",
    games: 12,
    completions: 234,
    averageScore: 87.5,
    uploadedAt: "2024-01-15T10:30:00Z",
    processedAt: "2024-01-15T10:45:00Z",
    uploadedBy: "admin@company.com",
  },
  {
    id: "2",
    name: "Code of Conduct",
    originalName: "employee-code-of-conduct-2024.docx",
    status: "PROCESSED",
    fileSize: 1890000,
    mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    games: 8,
    completions: 189,
    averageScore: 92.1,
    uploadedAt: "2024-01-12T14:20:00Z",
    processedAt: "2024-01-12T14:32:00Z",
    uploadedBy: "hr@company.com",
  },
  {
    id: "3",
    name: "Security Awareness Training",
    originalName: "security-awareness-manual.pdf",
    status: "PROCESSING",
    fileSize: 5670000,
    mimeType: "application/pdf",
    games: 0,
    completions: 0,
    averageScore: 0,
    uploadedAt: "2024-01-20T09:15:00Z",
    uploadedBy: "security@company.com",
  },
  {
    id: "4",
    name: "Data Protection Guidelines",
    originalName: "gdpr-compliance-guide.pdf",
    status: "PROCESSED",
    fileSize: 3240000,
    mimeType: "application/pdf",
    games: 5,
    completions: 156,
    averageScore: 89.3,
    uploadedAt: "2024-01-10T16:45:00Z",
    processedAt: "2024-01-10T17:02:00Z",
    uploadedBy: "legal@company.com",
  },
  {
    id: "5",
    name: "Emergency Procedures",
    originalName: "emergency-response-procedures.docx",
    status: "FAILED",
    fileSize: 890000,
    mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    games: 0,
    completions: 0,
    averageScore: 0,
    uploadedAt: "2024-01-18T11:30:00Z",
    uploadedBy: "safety@company.com",
  },
]

export function DocumentManagement() {
  const [documents, setDocuments] = useState<Document[]>(mockDocuments)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStatusIcon = (status: Document["status"]) => {
    switch (status) {
      case "PROCESSED":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "PROCESSING":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "FAILED":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "UPLOADING":
        return <Upload className="h-4 w-4 text-blue-500" />
    }
  }

  const getStatusBadge = (status: Document["status"]) => {
    const variants = {
      PROCESSED: "default" as const,
      PROCESSING: "secondary" as const,
      FAILED: "destructive" as const,
      UPLOADING: "outline" as const,
    }
    return <Badge variant={variants[status]}>{status}</Badge>
  }

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.originalName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || doc.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Document Management</h1>
          <p className="text-muted-foreground">
            Upload, process, and manage your training documents
          </p>
        </div>
        <Button onClick={() => setUploadDialogOpen(true)}>
          <Upload className="mr-2 h-4 w-4" />
          Upload Document
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{documents.length}</div>
            <p className="text-xs text-muted-foreground">
              {documents.filter(d => d.status === "PROCESSED").length} processed
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Games</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {documents.reduce((sum, doc) => sum + doc.games, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Generated from documents
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Completions</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {documents.reduce((sum, doc) => sum + doc.completions, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Across all games
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(documents
                .filter(d => d.averageScore > 0)
                .reduce((sum, doc) => sum + doc.averageScore, 0) / 
                documents.filter(d => d.averageScore > 0).length || 0).toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Overall performance
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Documents</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search documents..."
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
                  <DropdownMenuItem onClick={() => setStatusFilter("PROCESSED")}>
                    Processed
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("PROCESSING")}>
                    Processing
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("FAILED")}>
                    Failed
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("UPLOADING")}>
                    Uploading
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
                <TableHead>Document</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Games</TableHead>
                <TableHead>Completions</TableHead>
                <TableHead>Avg Score</TableHead>
                <TableHead>Uploaded</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocuments.map((document) => (
                <TableRow key={document.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(document.status)}
                        <div>
                          <div className="font-medium">{document.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {document.originalName}
                          </div>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(document.status)}
                  </TableCell>
                  <TableCell className="text-sm">
                    {formatFileSize(document.fileSize)}
                  </TableCell>
                  <TableCell>
                    <div className="text-sm font-medium">{document.games}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm font-medium">{document.completions}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm font-medium">
                      {document.averageScore > 0 ? `${document.averageScore.toFixed(1)}%` : "-"}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDate(document.uploadedAt)}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </DropdownMenuItem>
                        {document.status === "PROCESSED" && (
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Games
                          </DropdownMenuItem>
                        )}
                        {document.status === "FAILED" && (
                          <DropdownMenuItem>
                            <Upload className="mr-2 h-4 w-4" />
                            Reprocess
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredDocuments.length === 0 && (
            <div className="text-center py-8">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">No documents found</h3>
              <p className="text-muted-foreground">
                {searchTerm || statusFilter !== "all" 
                  ? "Try adjusting your search or filters" 
                  : "Get started by uploading your first document"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <DocumentUploadDialog 
        open={uploadDialogOpen} 
        onOpenChange={setUploadDialogOpen}
        onUploadComplete={(document) => {
          setDocuments(prev => [...prev, document])
          setUploadDialogOpen(false)
        }}
      />
    </div>
  )
}
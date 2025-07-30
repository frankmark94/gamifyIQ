"use client"

import { useState, useCallback } from "react"
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
import { Progress } from "@/components/ui/progress"
import { Upload, FileText, X, CheckCircle } from "lucide-react"

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

interface DocumentUploadDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onUploadComplete: (document: Document) => void
}

interface UploadFile {
  file: File
  progress: number
  status: "pending" | "uploading" | "processing" | "completed" | "error"
  error?: string
}

export function DocumentUploadDialog({ 
  open, 
  onOpenChange, 
  onUploadComplete 
}: DocumentUploadDialogProps) {
  const [uploadFiles, setUploadFiles] = useState<UploadFile[]>([])
  const [isDragOver, setIsDragOver] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const files = Array.from(e.dataTransfer.files)
    addFiles(files)
  }, [])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : []
    addFiles(files)
  }, [])

  const addFiles = (files: File[]) => {
    const validFiles = files.filter(file => {
      const validTypes = [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/msword',
        'text/plain'
      ]
      return validTypes.includes(file.type) && file.size <= 50 * 1024 * 1024 // 50MB limit
    })

    const newUploadFiles: UploadFile[] = validFiles.map(file => ({
      file,
      progress: 0,
      status: "pending"
    }))

    setUploadFiles(prev => [...prev, ...newUploadFiles])
  }

  const removeFile = (index: number) => {
    setUploadFiles(prev => prev.filter((_, i) => i !== index))
  }

  const uploadFiles = async () => {
    for (let i = 0; i < uploadFiles.length; i++) {
      if (uploadFiles[i].status !== "pending") continue

      // Update status to uploading
      setUploadFiles(prev => prev.map((file, index) => 
        index === i ? { ...file, status: "uploading" } : file
      ))

      try {
        // Simulate upload progress
        for (let progress = 0; progress <= 100; progress += 10) {
          await new Promise(resolve => setTimeout(resolve, 100))
          setUploadFiles(prev => prev.map((file, index) => 
            index === i ? { ...file, progress } : file
          ))
        }

        // Simulate processing
        setUploadFiles(prev => prev.map((file, index) => 
          index === i ? { ...file, status: "processing", progress: 100 } : file
        ))

        await new Promise(resolve => setTimeout(resolve, 2000))

        // Mark as completed
        setUploadFiles(prev => prev.map((file, index) => 
          index === i ? { ...file, status: "completed" } : file
        ))

        // Create mock document
        const mockDocument: Document = {
          id: Math.random().toString(36).substr(2, 9),
          name: uploadFiles[i].file.name.split('.')[0],
          originalName: uploadFiles[i].file.name,
          status: "PROCESSING",
          fileSize: uploadFiles[i].file.size,
          mimeType: uploadFiles[i].file.type,
          games: 0,
          completions: 0,
          averageScore: 0,
          uploadedAt: new Date().toISOString(),
          uploadedBy: "admin@company.com"
        }

        onUploadComplete(mockDocument)
      } catch (error) {
        setUploadFiles(prev => prev.map((file, index) => 
          index === i ? { 
            ...file, 
            status: "error", 
            error: "Upload failed. Please try again." 
          } : file
        ))
      }
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getStatusIcon = (status: UploadFile["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "error":
        return <X className="h-4 w-4 text-red-500" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const canUpload = uploadFiles.length > 0 && uploadFiles.some(f => f.status === "pending")
  const allCompleted = uploadFiles.length > 0 && uploadFiles.every(f => f.status === "completed")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Upload Documents</DialogTitle>
          <DialogDescription>
            Upload PDF, Word, or text documents to create training games. Maximum file size: 50MB.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Upload Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragOver
                ? "border-primary bg-primary/5"
                : "border-muted-foreground/25 hover:border-muted-foreground/50"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Drop files here</h3>
              <p className="text-sm text-muted-foreground">
                or click below to select files
              </p>
              <Input
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
              />
              <Button variant="outline" asChild>
                <label htmlFor="file-upload" className="cursor-pointer">
                  Select Files
                </label>
              </Button>
            </div>
          </div>

          {/* File List */}
          {uploadFiles.length > 0 && (
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {uploadFiles.map((uploadFile, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-3 border rounded-lg"
                >
                  {getStatusIcon(uploadFile.status)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium truncate">
                        {uploadFile.file.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(uploadFile.file.size)}
                      </p>
                    </div>
                    {uploadFile.status === "uploading" && (
                      <Progress value={uploadFile.progress} className="mt-2" />
                    )}
                    {uploadFile.status === "processing" && (
                      <div className="mt-2">
                        <Progress value={100} className="mb-1" />
                        <p className="text-xs text-muted-foreground">Processing...</p>
                      </div>
                    )}
                    {uploadFile.status === "error" && uploadFile.error && (
                      <p className="text-xs text-red-500 mt-1">{uploadFile.error}</p>
                    )}
                    {uploadFile.status === "completed" && (
                      <p className="text-xs text-green-600 mt-1">Upload completed</p>
                    )}
                  </div>
                  {uploadFile.status === "pending" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {allCompleted ? "Close" : "Cancel"}
          </Button>
          {canUpload && (
            <Button onClick={uploadFiles}>
              Upload {uploadFiles.filter(f => f.status === "pending").length} Files
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
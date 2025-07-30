export type UserRole = 'admin' | 'manager' | 'employee'

export type GameStatus = 'draft' | 'active' | 'archived'

export type DocumentStatus = 'uploading' | 'processing' | 'processed' | 'failed'

export type SessionStatus = 'active' | 'completed' | 'abandoned'

export type DifficultyLevel = 'easy' | 'medium' | 'hard'

export interface BaseEntity {
  id: string
  createdAt: Date
  updatedAt: Date
}

export interface User extends BaseEntity {
  email: string
  name: string
  role: UserRole
  lastLoginAt?: Date
  isActive: boolean
}

export interface Document extends BaseEntity {
  name: string
  originalName: string
  content: string
  fileSize: number
  mimeType: string
  status: DocumentStatus
  uploadedBy: string
  processedAt?: Date
  storageUrl: string
  gameCount: number
}

export interface Game extends BaseEntity {
  title: string
  description: string
  documentId: string
  status: GameStatus
  difficulty: DifficultyLevel
  scenarioCount: number
  totalPoints: number
  estimatedDuration: number
  averageScore?: number
  completionCount: number
}

export interface GameSession extends BaseEntity {
  gameId: string
  userId?: string
  status: SessionStatus
  score: number
  maxScore: number
  startedAt: Date
  completedAt?: Date
  timeSpent: number
  answers: SessionAnswer[]
}

export interface SessionAnswer {
  scenarioId: string
  selectedAnswer: number
  isCorrect: boolean
  points: number
  timeTaken: number
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}
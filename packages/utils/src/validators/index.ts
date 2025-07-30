import { z } from 'zod'

export const UserRoleSchema = z.enum(['admin', 'manager', 'employee'])

export const DifficultyLevelSchema = z.enum(['easy', 'medium', 'hard'])

export const DocumentStatusSchema = z.enum(['uploading', 'processing', 'processed', 'failed'])

export const GameStatusSchema = z.enum(['draft', 'active', 'archived'])

export const SessionStatusSchema = z.enum(['active', 'completed', 'abandoned'])

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().min(1).max(100),
  role: UserRoleSchema,
  lastLoginAt: z.date().optional(),
  isActive: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const DocumentUploadSchema = z.object({
  name: z.string().min(1).max(255),
  content: z.string(),
  mimeType: z.string(),
  fileSize: z.number().positive()
})

export const GameSessionCreateSchema = z.object({
  gameId: z.string().uuid(),
  userId: z.string().uuid().optional()
})

export const AnswerSubmissionSchema = z.object({
  sessionId: z.string().uuid(),
  scenarioId: z.string(),
  selectedAnswer: z.number().min(0).max(3),
  timeTaken: z.number().positive()
})

export const PaginationSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10)
})

export const LeaderboardQuerySchema = z.object({
  gameId: z.string().uuid().optional(),
  timeframe: z.enum(['week', 'month', 'all']).default('all'),
  limit: z.number().min(1).max(50).default(10)
})

// File upload validation
export const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
export const ALLOWED_FILE_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain']

export const FileUploadSchema = z.object({
  file: z.any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `File size should be less than ${MAX_FILE_SIZE / 1024 / 1024}MB`)
    .refine((file) => ALLOWED_FILE_TYPES.includes(file?.type), 'File type not supported')
})
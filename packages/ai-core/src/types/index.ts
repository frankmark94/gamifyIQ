export interface ProcessedDocument {
  id: string
  title: string
  content: string
  keyTopics: string[]
  summary: string
  difficulty: 'easy' | 'medium' | 'hard'
  estimatedReadTime: number
}

export interface GameScenario {
  id: string
  title: string
  description: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  points: number
  difficulty: 'easy' | 'medium' | 'hard'
  topic: string
}

export interface GeneratedGame {
  id: string
  title: string
  description: string
  documentId: string
  scenarios: GameScenario[]
  totalPoints: number
  estimatedDuration: number
}

export interface AIProcessingOptions {
  model?: string
  temperature?: number
  maxTokens?: number
  difficulty?: 'easy' | 'medium' | 'hard'
  scenarioCount?: number
}

export interface DocumentAnalysis {
  keyTopics: string[]
  compliance: boolean
  riskLevel: 'low' | 'medium' | 'high'
  requiredTraining: boolean
  summary: string
}
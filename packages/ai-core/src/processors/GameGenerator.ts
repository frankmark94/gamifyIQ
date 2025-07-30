import { ChatOpenAI } from '@langchain/openai'
import { PromptTemplate } from '@langchain/core/prompts'
import { GeneratedGame, GameScenario, DocumentAnalysis, AIProcessingOptions } from '../types'
import { SCENARIO_GENERATION_PROMPT, QUESTION_REFINEMENT_PROMPT } from '../prompts'
import { DocumentProcessor } from './DocumentProcessor'

export class GameGenerator {
  private llm: ChatOpenAI
  private documentProcessor: DocumentProcessor

  constructor(options: AIProcessingOptions = {}) {
    this.llm = new ChatOpenAI({
      modelName: options.model || 'gpt-3.5-turbo',
      temperature: options.temperature || 0.7,
      maxTokens: options.maxTokens || 3000,
      openAIApiKey: process.env.OPENAI_API_KEY,
    })
    
    this.documentProcessor = new DocumentProcessor(options)
  }

  async generateGame(
    documentId: string,
    documentTitle: string,
    documentContent: string,
    options: AIProcessingOptions = {}
  ): Promise<GeneratedGame> {
    const scenarioCount = options.scenarioCount || 5
    
    // First analyze the document
    const analysis = await this.documentProcessor.analyzeDocument(documentContent)
    
    // Generate scenarios
    const scenarios = await this.generateScenarios(
      documentContent,
      analysis,
      scenarioCount,
      options.difficulty || 'medium'
    )
    
    const totalPoints = scenarios.reduce((sum, scenario) => sum + scenario.points, 0)
    const estimatedDuration = scenarios.length * 2 // 2 minutes per scenario
    
    return {
      id: `game_${documentId}_${Date.now()}`,
      title: `${documentTitle} Training Game`,
      description: `Interactive training scenarios based on ${documentTitle}`,
      documentId,
      scenarios,
      totalPoints,
      estimatedDuration
    }
  }

  private async generateScenarios(
    content: string,
    analysis: DocumentAnalysis,
    count: number,
    difficulty: 'easy' | 'medium' | 'hard'
  ): Promise<GameScenario[]> {
    try {
      const prompt = PromptTemplate.fromTemplate(SCENARIO_GENERATION_PROMPT)
      const formattedPrompt = await prompt.format({
        content: content.substring(0, 3000), // Limit content to avoid token limits
        analysis: JSON.stringify(analysis),
        scenarioCount: count.toString()
      })
      
      const response = await this.llm.invoke(formattedPrompt)
      const scenarios = JSON.parse(response.content as string)
      
      return scenarios.map((scenario: any, index: number) => ({
        id: `scenario_${index + 1}`,
        title: scenario.title || `Scenario ${index + 1}`,
        description: scenario.description || 'Training scenario',
        question: scenario.question || 'What should you do?',
        options: scenario.options || ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: scenario.correctAnswer || 0,
        explanation: scenario.explanation || 'This is the correct approach.',
        points: this.calculatePoints(difficulty),
        difficulty,
        topic: scenario.topic || analysis.keyTopics[0] || 'General'
      }))
    } catch (error) {
      console.error('Error generating scenarios:', error)
      
      // Return fallback scenarios
      return this.generateFallbackScenarios(count, difficulty, analysis.keyTopics[0] || 'General')
    }
  }

  private generateFallbackScenarios(count: number, difficulty: string, topic: string): GameScenario[] {
    const scenarios: GameScenario[] = []
    
    for (let i = 0; i < count; i++) {
      scenarios.push({
        id: `fallback_scenario_${i + 1}`,
        title: `${topic} Scenario ${i + 1}`,
        description: `You encounter a situation related to ${topic}. Consider the appropriate response.`,
        question: 'What is the most appropriate action to take?',
        options: [
          'Follow established procedures',
          'Ask your supervisor for guidance',
          'Document the situation',
          'Ignore the situation'
        ],
        correctAnswer: 0,
        explanation: 'Following established procedures is typically the safest and most appropriate response.',
        points: this.calculatePoints(difficulty as 'easy' | 'medium' | 'hard'),
        difficulty: difficulty as 'easy' | 'medium' | 'hard',
        topic
      })
    }
    
    return scenarios
  }

  private calculatePoints(difficulty: 'easy' | 'medium' | 'hard'): number {
    switch (difficulty) {
      case 'easy': return 50
      case 'medium': return 100
      case 'hard': return 150
      default: return 100
    }
  }

  async refineScenario(scenario: GameScenario): Promise<GameScenario> {
    try {
      const prompt = PromptTemplate.fromTemplate(QUESTION_REFINEMENT_PROMPT)
      const formattedPrompt = await prompt.format({
        scenario: JSON.stringify(scenario)
      })
      
      const response = await this.llm.invoke(formattedPrompt)
      const refinedScenario = JSON.parse(response.content as string)
      
      return {
        ...scenario,
        ...refinedScenario
      }
    } catch (error) {
      console.error('Error refining scenario:', error)
      return scenario
    }
  }

  async generateAdditionalScenarios(
    existingGame: GeneratedGame,
    count: number
  ): Promise<GameScenario[]> {
    // This would fetch the original document and generate more scenarios
    // For now, return placeholder scenarios
    return this.generateFallbackScenarios(count, 'medium', 'Additional Training')
  }
}
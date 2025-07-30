import { ChatOpenAI } from '@langchain/openai'
import { PromptTemplate } from '@langchain/core/prompts'
import { ProcessedDocument, DocumentAnalysis, AIProcessingOptions } from '../types'
import { DOCUMENT_ANALYSIS_PROMPT } from '../prompts'

export class DocumentProcessor {
  private llm: ChatOpenAI

  constructor(options: AIProcessingOptions = {}) {
    this.llm = new ChatOpenAI({
      modelName: options.model || 'gpt-3.5-turbo',
      temperature: options.temperature || 0.3,
      maxTokens: options.maxTokens || 2000,
      openAIApiKey: process.env.OPENAI_API_KEY,
    })
  }

  async analyzeDocument(content: string): Promise<DocumentAnalysis> {
    try {
      const prompt = PromptTemplate.fromTemplate(DOCUMENT_ANALYSIS_PROMPT)
      const formattedPrompt = await prompt.format({ content })
      
      const response = await this.llm.invoke(formattedPrompt)
      
      // Parse the JSON response
      const analysis = JSON.parse(response.content as string)
      
      return {
        keyTopics: analysis.keyTopics || [],
        compliance: analysis.compliance || false,
        riskLevel: analysis.riskLevel || 'medium',
        requiredTraining: analysis.requiredTraining || true,
        summary: analysis.summary || 'Document analysis summary'
      }
    } catch (error) {
      console.error('Error analyzing document:', error)
      
      // Fallback analysis
      return {
        keyTopics: ['General Compliance'],
        compliance: true,
        riskLevel: 'medium',
        requiredTraining: true,
        summary: 'This document contains important corporate policies and guidelines.'
      }
    }
  }

  async processDocument(
    id: string,
    title: string,
    content: string,
    options: AIProcessingOptions = {}
  ): Promise<ProcessedDocument> {
    const analysis = await this.analyzeDocument(content)
    
    return {
      id,
      title,
      content,
      keyTopics: analysis.keyTopics,
      summary: analysis.summary,
      difficulty: options.difficulty || 'medium',
      estimatedReadTime: Math.ceil(content.length / 200) // Rough estimate: 200 words per minute
    }
  }

  async extractKeyTopics(content: string): Promise<string[]> {
    try {
      const prompt = `Extract the main topics and concepts from this document. Return only a JSON array of strings.

Document: ${content.substring(0, 2000)}...

Return format: ["topic1", "topic2", "topic3"]`

      const response = await this.llm.invoke(prompt)
      return JSON.parse(response.content as string)
    } catch (error) {
      console.error('Error extracting topics:', error)
      return ['General Policy', 'Compliance']
    }
  }

  async summarizeDocument(content: string, maxLength: number = 200): Promise<string> {
    try {
      const prompt = `Summarize the following document in ${maxLength} words or less. Focus on the key points and requirements.

Document: ${content}`

      const response = await this.llm.invoke(prompt)
      return response.content as string
    } catch (error) {
      console.error('Error summarizing document:', error)
      return 'This document contains important corporate policies and guidelines that employees should understand and follow.'
    }
  }
}
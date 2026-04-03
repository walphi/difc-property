// AI Chat Types for DIFC Property

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  properties?: Property[]
  toolCalls?: ToolCall[]
  isStreaming?: boolean
  timestamp?: Date
}

export interface Property {
  slug: string
  title: string
  price: number
  currency: string
  bedrooms: number | null
  bathrooms: number | null
  sqft: number
  propertyType: string
  images: string[]
  view?: string
  building?: { name: string; slug: string }
}

export interface ToolCall {
  id: string
  name: string
  args: Record<string, any>
  status: 'pending' | 'in_progress' | 'completed' | 'error'
  result?: any
}

export interface ChatState {
  messages: Message[]
  isLoading: boolean
  isVoiceRecording: boolean
  error: string | null
  retryCount: number
}

export type ToolName = 'searchProperties' | 'getBuildingInfo' | 'getDIFCContent' | 'calculateROI'

export interface ToolDefinition {
  name: ToolName
  description: string
  parameters: {
    type: 'object'
    properties: Record<string, {
      type: string
      description: string
      enum?: string[]
    }>
    required?: string[]
  }
}

export interface AIResponse {
  content: string
  properties?: Property[]
  toolCalls?: ToolCall[]
  model?: string
  usage?: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}

export interface RateLimitInfo {
  retryAfter: number
  limit: number
  remaining: number
  reset: number
}
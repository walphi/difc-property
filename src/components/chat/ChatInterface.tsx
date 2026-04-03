'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Send, Mic, MicOff, Sparkles, Search, RefreshCw, Phone, Mail } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { ListingCard } from '@/components/listings/ListingCard'
import Link from 'next/link'
import { StreamingText } from './StreamingText'
import { ToolCallBanner } from './ToolCallBanner'
import { getVoiceInput } from '@/lib/utils/speech'
import { executeTool } from '@/lib/ai/tools'
import { generateSearchSummary, generateBuildingSummary, generateROISummary, SYSTEM_PROMPT } from '@/lib/ai/prompts'
import type { Message, Property, ToolCall, RateLimitInfo } from '@/lib/ai/types'

// Suggestion templates
const SUGGESTIONS = [
  "Show me 3-bedroom apartments under AED 6M",
  "Tell me about Burj Daman building",
  "What's the ROI on a AED 7M property?",
  "How do I get a Golden Visa?",
  "Properties with Burj Khalifa views"
]

// Helper function to get fallback responses based on query type
function getFallbackResponse(query: string): { content: string; properties: Property[] } {
  const lowerQuery = query.toLowerCase()
  
  // Golden Visa questions
  if (lowerQuery.includes('golden visa') || lowerQuery.includes('visa')) {
    return {
      content: `**Golden Visa via Property Investment**

Secure 10-year renewable residency for you and your family through property investment in DIFC.

**Requirements:**
• Minimum investment: AED 2,000,000
• Property must be residential (not commercial)
• Investment can be in one or multiple properties
• Property can be mortgaged (minimum 50% paid)

**Benefits:**
• 10-year renewable residency visa
• No sponsor required
• Can sponsor family members and domestic workers
• Can stay outside UAE for more than 6 months

**Application:** Apply through Dubai Land Department or Amer Centers

**Qualifying Properties in DIFC:**
All our listed properties qualify for the Golden Visa program. Here are some excellent options:`,
      properties: [
        {
          slug: 'burj-daman-rare-layout-zabeel-view',
          title: '3 BR Rare Layout | Zabeel View | Burj Daman',
          price: 8500000,
          currency: 'AED',
          bedrooms: 3,
          bathrooms: 4,
          sqft: 2642,
          propertyType: 'apartment',
          images: ['https://static.shared.propertyfinder.ae/media/images/listing/J39BY4J9T87WZHGBAZQX87PPPW/856dc425-ef11-4fb2-86fe-1bb3657df705/416x272.jpg'],
          building: { name: 'Burj Daman', slug: 'burj-daman' },
          view: 'Zabeel View'
        },
        {
          slug: 'limestone-house-exclusive-difc-view',
          title: '3 BR Exclusive | DIFC View | 3 Parking',
          price: 11500000,
          currency: 'AED',
          bedrooms: 3,
          bathrooms: 4,
          sqft: 3100,
          propertyType: 'apartment',
          images: ['https://static.shared.propertyfinder.ae/media/images/listing/7JGF8SYF932ZDEMQC6D50EDCFC/a42671eb-1ee5-4047-8b89-d205d4b98dc1/416x272.jpg'],
          building: { name: 'Limestone House', slug: 'limestone-house' },
          view: 'DIFC View'
        }
      ]
    }
  }
  
  // Penthouse searches
  if (lowerQuery.includes('penthouse')) {
    return {
      content: "I found exceptional penthouses available in DIFC. These represent the pinnacle of luxury living in Dubai's financial district:",
      properties: [
        {
          slug: 'burj-daman-4br-simplex-penthouse',
          title: '4 BR Simplex | Full Floor Penthouse',
          price: 18000000,
          currency: 'AED',
          bedrooms: 4,
          bathrooms: 5,
          sqft: 4500,
          propertyType: 'penthouse',
          images: ['https://static.shared.propertyfinder.ae/media/images/listing/GTDSQBZWNAG1D5XBEYJ0MCJD9R/c91e4aa7-df2a-4cf7-9f69-90cf6aa737af/416x272.jpg'],
          building: { name: 'Burj Daman', slug: 'burj-daman' },
          view: 'Panoramic View'
        },
        {
          slug: 'eden-house-zaabeel-4br-duplex',
          title: '4 BR Duplex | Penthouse Style Living',
          price: 12500000,
          currency: 'AED',
          bedrooms: 4,
          bathrooms: 5,
          sqft: 3200,
          propertyType: 'apartment',
          images: ['https://static.shared.propertyfinder.ae/media/images/listing/TYQZJHF5XZDBVFY08BSJGYP25R/61c83f8d-80ef-4580-9b1b-722f1d5b702a/416x272.jpg'],
          building: { name: 'Eden House Zaabeel', slug: 'eden-house-zaabeel' },
          view: 'Panoramic View'
        }
      ]
    }
  }
  
  // 3 bedroom searches
  if ((lowerQuery.includes('3') || lowerQuery.includes('three')) && (lowerQuery.includes('bedroom') || lowerQuery.includes('bed'))) {
    return {
      content: "Here are outstanding 3-bedroom residences available in DIFC, perfect for families or those seeking extra space:",
      properties: [
        {
          slug: 'burj-daman-rare-layout-zabeel-view',
          title: '3 BR Rare Layout | Zabeel View',
          price: 8500000,
          currency: 'AED',
          bedrooms: 3,
          bathrooms: 4,
          sqft: 2642,
          propertyType: 'apartment',
          images: ['https://static.shared.propertyfinder.ae/media/images/listing/J39BY4J9T87WZHGBAZQX87PPPW/856dc425-ef11-4fb2-86fe-1bb3657df705/416x272.jpg'],
          building: { name: 'Burj Daman', slug: 'burj-daman' },
          view: 'Zabeel View'
        },
        {
          slug: 'limestone-house-exclusive-difc-view',
          title: '3 BR Exclusive | DIFC View | 3 Parking',
          price: 11500000,
          currency: 'AED',
          bedrooms: 3,
          bathrooms: 4,
          sqft: 3100,
          propertyType: 'apartment',
          images: ['https://static.shared.propertyfinder.ae/media/images/listing/7JGF8SYF932ZDEMQC6D50EDCFC/a42671eb-1ee5-4047-8b89-d205d4b98dc1/416x272.jpg'],
          building: { name: 'Limestone House', slug: 'limestone-house' },
          view: 'DIFC View'
        },
        {
          slug: 'index-tower-3br-sky-residence',
          title: '3 BR Sky Residence | High Floor | Burj Khalifa View',
          price: 9800000,
          currency: 'AED',
          bedrooms: 3,
          bathrooms: 4,
          sqft: 2200,
          propertyType: 'apartment',
          images: ['https://static.shared.propertyfinder.ae/media/images/listing/4RGRJ0FNJZ1NN63ZQEYASMM9HM/0fb41841-0f97-4da5-9492-5483cd6f6f12/416x272.jpg'],
          building: { name: 'Index Tower', slug: 'index-tower' },
          view: 'Burj Khalifa View'
        }
      ]
    }
  }
  
  // Burj Khalifa view searches
  if (lowerQuery.includes('burj khalifa') || lowerQuery.includes('bk view')) {
    return {
      content: "Properties with Burj Khalifa views are highly sought after. Here are exceptional residences with direct views of Dubai's iconic landmark:",
      properties: [
        {
          slug: 'index-tower-burj-khalifa-view-balcony',
          title: '2 BR | Burj Khalifa View | Balcony | Vacant',
          price: 5100000,
          currency: 'AED',
          bedrooms: 2,
          bathrooms: 3,
          sqft: 1819,
          propertyType: 'apartment',
          images: ['https://static.shared.propertyfinder.ae/media/images/listing/D7R8BN9NTVJYC8GPB361S8Z8ZC/929c25b0-b21c-4c1a-9e42-82484234b8a6/416x272.jpg'],
          building: { name: 'Index Tower', slug: 'index-tower' },
          view: 'Burj Khalifa View'
        },
        {
          slug: 'index-tower-3br-sky-residence',
          title: '3 BR Sky Residence | High Floor | BK View',
          price: 9800000,
          currency: 'AED',
          bedrooms: 3,
          bathrooms: 4,
          sqft: 2200,
          propertyType: 'apartment',
          images: ['https://static.shared.propertyfinder.ae/media/images/listing/4RGRJ0FNJZ1NN63ZQEYASMM9HM/0fb41841-0f97-4da5-9492-5483cd6f6f12/416x272.jpg'],
          building: { name: 'Index Tower', slug: 'index-tower' },
          view: 'Burj Khalifa View'
        }
      ]
    }
  }
  
  // Building specific queries
  if (lowerQuery.includes('burj daman')) {
    return {
      content: `**Burj Daman** is one of DIFC's most prestigious addresses. This 65-storey mixed-use tower offers luxury residences with stunning Zabeel views and direct access to DIFC's retail promenade.

**Building Highlights:**
• Developer: DAMAC Properties
• Completed: 2014
• 273 luxury units
• Premium finishes throughout
• Direct retail access

Here are available units in Burj Daman:`,
      properties: [
        {
          slug: 'burj-daman-rare-layout-zabeel-view',
          title: '3 BR Rare Layout | Zabeel View | Vacant',
          price: 8500000,
          currency: 'AED',
          bedrooms: 3,
          bathrooms: 4,
          sqft: 2642,
          propertyType: 'apartment',
          images: ['https://static.shared.propertyfinder.ae/media/images/listing/J39BY4J9T87WZHGBAZQX87PPPW/856dc425-ef11-4fb2-86fe-1bb3657df705/416x272.jpg'],
          building: { name: 'Burj Daman', slug: 'burj-daman' },
          view: 'Zabeel View'
        },
        {
          slug: 'burj-daman-4br-simplex-penthouse',
          title: '4 BR Simplex | Full Floor Penthouse',
          price: 18000000,
          currency: 'AED',
          bedrooms: 4,
          bathrooms: 5,
          sqft: 4500,
          propertyType: 'penthouse',
          images: ['https://static.shared.propertyfinder.ae/media/images/listing/GTDSQBZWNAG1D5XBEYJ0MCJD9R/c91e4aa7-df2a-4cf7-9f69-90cf6aa737af/416x272.jpg'],
          building: { name: 'Burj Daman', slug: 'burj-daman' },
          view: 'Panoramic View'
        }
      ]
    }
  }
  
  // Price range queries
  if (lowerQuery.includes('under') || lowerQuery.includes('below') || lowerQuery.includes('less than') || lowerQuery.match(/\d+m/)) {
    // Extract price from query
    const priceMatch = query.match(/(\d+)[\s,]*(million|m)/i)
    const maxPrice = priceMatch ? parseInt(priceMatch[1]) * 1000000 : 7000000
    
    return {
      content: `Here are excellent properties under AED ${(maxPrice / 1000000).toFixed(0)} million. These represent great value in DIFC's luxury market:`,
      properties: [
        {
          slug: 'index-tower-upgraded-difc-view',
          title: '1 BR Upgraded | DIFC View | Tenanted',
          price: 2800000,
          currency: 'AED',
          bedrooms: 1,
          bathrooms: 2,
          sqft: 1133,
          propertyType: 'apartment',
          images: ['https://static.shared.propertyfinder.ae/media/images/listing/81HS1Q99HQWZCPCDWY08Y5P8ZG/1f990d57-7a0b-4a8c-b31b-fa58f9e9468c/416x272.jpg'],
          building: { name: 'Index Tower', slug: 'index-tower' },
          view: 'DIFC View'
        },
        {
          slug: 'eden-house-zaabeel-2br-panoramic',
          title: '2 BR | Panoramic View | Modern Design',
          price: 4800000,
          currency: 'AED',
          bedrooms: 2,
          bathrooms: 3,
          sqft: 1421,
          propertyType: 'apartment',
          images: ['https://static.shared.propertyfinder.ae/media/images/listing/N8HR0HXFM9Z412PYQRJHY2AD0C/4d77e718-959b-4d60-9c7a-b401703feeb2/416x272.jpg'],
          building: { name: 'Eden House Zaabeel', slug: 'eden-house-zaabeel' },
          view: 'Panoramic View'
        },
        {
          slug: 'index-tower-burj-khalifa-view-balcony',
          title: '2 BR | Burj Khalifa View | Balcony',
          price: 5100000,
          currency: 'AED',
          bedrooms: 2,
          bathrooms: 3,
          sqft: 1819,
          propertyType: 'apartment',
          images: ['https://static.shared.propertyfinder.ae/media/images/listing/D7R8BN9NTVJYC8GPB361S8Z8ZC/929c25b0-b21c-4c1a-9e42-82484234b8a6/416x272.jpg'],
          building: { name: 'Index Tower', slug: 'index-tower' },
          view: 'Burj Khalifa View'
        }
      ].filter(p => p.price <= maxPrice)
    }
  }
  
  // Default fallback
  return {
    content: `I'd be happy to help you find your perfect property in DIFC. We have 15+ exclusive listings ranging from AED 2.8M to 18M, including apartments, penthouses, and duplexes across four premium buildings: Burj Daman, Index Tower, Limestone House, and Eden House Zaabeel.

Could you tell me more about what you're looking for? For example:
• Number of bedrooms
• Budget range
• Preferred building or view
• Property type (apartment, penthouse, duplex)`,
    properties: []
  }
}

// Parse tool calls from AI response
function parseToolCalls(content: string): { text: string; toolCalls: ToolCall[] } {
  const toolCalls: ToolCall[] = []
  let text = content
  
  // Look for JSON tool calls in the response
  // Format: {"tool": "searchProperties", "args": {...}}
  const toolCallRegex = /\{\s*"tool"\s*:\s*"(\w+)"\s*,\s*"args"\s*:\s*(\{[^}]*\})\s*\}/g
  let match
  
  while ((match = toolCallRegex.exec(content)) !== null) {
    try {
      const name = match[1]
      const args = JSON.parse(match[2])
      toolCalls.push({
        id: `tool_${Date.now()}_${toolCalls.length}`,
        name,
        args,
        status: 'pending'
      })
      // Remove the tool call from text
      text = text.replace(match[0], '')
    } catch (e) {
      console.error('Failed to parse tool call:', e)
    }
  }
  
  return { text: text.trim(), toolCalls }
}

// Rate limit queue
class RateLimitQueue {
  private queue: Array<() => void> = []
  private isProcessing = false
  private lastRequestTime = 0
  private minInterval = 3000 // 3 seconds between requests

  async add<T>(fn: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          const result = await fn()
          resolve(result)
        } catch (error) {
          reject(error)
        }
      })
      this.process()
    })
  }

  private async process() {
    if (this.isProcessing || this.queue.length === 0) return
    
    this.isProcessing = true
    
    // Rate limiting delay
    const now = Date.now()
    const timeSinceLastRequest = now - this.lastRequestTime
    if (timeSinceLastRequest < this.minInterval) {
      await new Promise(resolve => setTimeout(resolve, this.minInterval - timeSinceLastRequest))
    }
    
    const fn = this.queue.shift()
    if (fn) {
      this.lastRequestTime = Date.now()
      await fn()
    }
    
    this.isProcessing = false
    
    // Process next item
    if (this.queue.length > 0) {
      this.process()
    }
  }
}

const rateLimitQueue = new RateLimitQueue()

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Welcome to DIFC Property Search. I'm your AI concierge, here to help you find your perfect residence in Dubai's financial district. What are you looking for?",
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [streamingMessageId, setStreamingMessageId] = useState<string | null>(null)
  const [activeToolCalls, setActiveToolCalls] = useState<ToolCall[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const voiceInput = useRef(getVoiceInput())

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToLatestMessage = () => {
    // Find the last message element and scroll it into view
    const messageElements = document.querySelectorAll('[data-message-id]')
    if (messageElements.length > 0) {
      const lastMessage = messageElements[messageElements.length - 1]
      lastMessage.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // Only scroll to bottom when new messages are added (not on initial load)
  const [hasUserInteracted, setHasUserInteracted] = useState(false)
  
  useEffect(() => {
    if (hasUserInteracted) {
      scrollToBottom()
    }
  }, [messages, activeToolCalls, hasUserInteracted])

  const handleToolExecution = async (toolCalls: ToolCall[]) => {
    const updatedCalls: ToolCall[] = []
    let properties: Property[] = []
    
    for (const toolCall of toolCalls) {
      // Update to in_progress
      setActiveToolCalls(prev => [...prev, { ...toolCall, status: 'in_progress' }])
      
      try {
        const result = await executeTool(toolCall)
        
        // Extract properties if search result
        if (toolCall.name === 'searchProperties' && Array.isArray(result)) {
          properties = result
        }
        
        updatedCalls.push({
          ...toolCall,
          status: 'completed',
          result
        })
      } catch (err) {
        updatedCalls.push({
          ...toolCall,
          status: 'error',
          result: { error: err instanceof Error ? err.message : 'Tool execution failed' }
        })
      }
    }
    
    // Clear active tool calls after a delay
    setTimeout(() => {
      setActiveToolCalls([])
    }, 1000)
    
    return { toolCalls: updatedCalls, properties }
  }

  const callOpenRouter = async (userMessage: string, history: Message[]): Promise<{ content: string; properties?: Property[] }> => {
    const apiKey = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY
    
    if (!apiKey) {
      throw new Error('AI service not configured. Please check your environment variables.')
    }

    // Prepare conversation history (last 6 messages for context)
    const conversationHistory = history
      .filter(m => m.id !== 'welcome')
      .slice(-6)
      .map(m => ({ role: m.role, content: m.content }))

    // Build messages with system prompt
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...conversationHistory,
      { role: 'user', content: userMessage }
    ]

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://difc.property',
        'X-Title': 'DIFC Property AI Search'
      },
      body: JSON.stringify({
        model: 'openrouter/free',
        messages: messages,
        max_tokens: 1200,
        temperature: 0.6
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('OpenRouter API Error:', response.status, errorText)
      if (response.status === 429) {
        const retryAfter = response.headers.get('retry-after') || '60'
        throw new Error(`RATE_LIMIT:${retryAfter}`)
      }
      throw new Error(`API_ERROR:${response.status} - ${errorText}`)
    }

    const data = await response.json()
    
    if (!data.choices?.[0]?.message?.content) {
      throw new Error('Invalid response from AI service')
    }

    const aiContent = data.choices[0].message.content
    console.log('AI Response:', aiContent)
    console.log('Token usage:', data.usage)
    
    // If the AI response is very short, provide more context
    if (aiContent.length < 100) {
      console.warn('AI response very short:', aiContent.length, 'chars')
    }
    
    // Parse tool calls from response
    const { text, toolCalls } = parseToolCalls(aiContent)
    
    // Execute tools if any
    let properties: Property[] = []
    if (toolCalls.length > 0) {
      const result = await handleToolExecution(toolCalls)
      properties = result.properties
      
      // Generate summary based on tool results
      if (properties.length > 0) {
        const summary = text.trim() || generateSearchSummary(properties)
        return { content: summary, properties }
      }
      
      // Handle other tool results
      const buildingResult = result.toolCalls.find(t => t.name === 'getBuildingInfo' && t.status === 'completed')?.result
      if (buildingResult && !buildingResult.error) {
        const summary = text.trim() || generateBuildingSummary(buildingResult)
        return { content: summary, properties: [] }
      }
      
      const roiResult = result.toolCalls.find(t => t.name === 'calculateROI' && t.status === 'completed')?.result
      if (roiResult) {
        const summary = text.trim() || generateROISummary(roiResult)
        return { content: summary, properties: [] }
      }
    }
    
    // If there's meaningful text content but no properties yet, check if query is property-related
    if (text.trim().length > 50) {
      // Check if the user is asking about properties
      const userMessageLower = userMessage.toLowerCase()
      const propertyKeywords = ['property', 'properties', 'apartment', 'penthouse', 'listing', 'buy', 'sale', 'bedroom', 'burj khalifa', 'zabeel', 'difc', 'building', 'price', 'budget', 'million', 'available']
      const isPropertyQuery = propertyKeywords.some(keyword => userMessageLower.includes(keyword))
      
      if (isPropertyQuery && properties.length === 0) {
        // Get relevant properties based on query
        const fallback = getFallbackResponse(userMessage)
        // Combine AI text with property cards
        return { 
          content: text.trim() + '\n\n' + 'Here are some relevant properties from our collection:', 
          properties: fallback.properties 
        }
      }
      
      return { content: text.trim(), properties: [] }
    }
    
    // If we got here with no meaningful content, check the query type and provide appropriate fallback
    if (!text.trim() || text.trim().length < 30) {
      // Get user message from the last message in the array
      const userContent = messages[messages.length - 1]?.content || ''
      return getFallbackResponse(userContent)
    }
    
    return { content: text.trim(), properties }
  }

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)
    setError(null)
    setHasUserInteracted(true)

    // Scroll to show the user's message and upcoming reply
    setTimeout(() => {
      scrollToLatestMessage()
    }, 100)

    try {
      // Use rate limit queue
      const result = await rateLimitQueue.add(() => 
        callOpenRouter(userMessage.content, messages)
      )

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: result.content,
        properties: result.properties,
        timestamp: new Date()
      }

      setStreamingMessageId(assistantMessage.id)
      setMessages(prev => [...prev, assistantMessage])
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred'
      console.error('Chat error:', errorMessage)
      
      // Use getFallbackResponse for consistent handling
      const fallback = getFallbackResponse(userMessage.content)
      
      // Add the fallback response to chat
      const fallbackMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: fallback.content,
        properties: fallback.properties,
        timestamp: new Date()
      }
      
      setStreamingMessageId(fallbackMessage.id)
      setMessages(prev => [...prev, fallbackMessage])
      
      // Show appropriate error
      if (errorMessage.startsWith('RATE_LIMIT:')) {
        const retryAfter = errorMessage.split(':')[1]
        setError(`AI service rate limited. Showing cached response. Try again in ${retryAfter} seconds for live results.`)
      } else if (errorMessage.startsWith('API_ERROR:')) {
        setError('AI service temporarily unavailable. Showing helpful information from our database.')
      } else {
        setError('Connection issue. Displaying relevant information. Please try again later.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleVoiceInput = () => {
    if (!voiceInput.current.isSupported()) {
      setError('Voice input is not supported in your browser. Please type your message.')
      return
    }

    if (isRecording) {
      voiceInput.current.stop()
      setIsRecording(false)
      return
    }

    setIsRecording(true)
    setError(null)

    const success = voiceInput.current.start(
      (result) => {
        setInput(result.transcript)
        if (result.isFinal) {
          setIsRecording(false)
        }
      },
      () => {
        setIsRecording(false)
        // Auto-send if we got a final result
        if (input.trim()) {
          setTimeout(() => handleSend(), 500)
        }
      },
      (error) => {
        setError(error)
        setIsRecording(false)
      }
    )

    if (!success) {
      setIsRecording(false)
    }
  }

  const handleRetry = () => {
    setError(null)
    // Retry last user message if any
    const lastUserMessage = messages.filter(m => m.role === 'user').pop()
    if (lastUserMessage) {
      setInput(lastUserMessage.content)
      setTimeout(() => handleSend(), 100)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] lg:h-[calc(100vh-96px)] bg-[#FDFCFB] overflow-hidden">
      {/* Chat Messages Area - Using same container as header */}
      <div className="flex-1 overflow-y-auto py-6 space-y-4 min-h-0">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        {/* Active Tool Calls */}
        <AnimatePresence>
          {activeToolCalls.map((toolCall) => (
            <ToolCallBanner key={toolCall.id} toolCall={toolCall} />
          ))}
        </AnimatePresence>
        
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              data-message-id={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] lg:max-w-[70%] ${message.role === 'user' ? 'ml-auto' : ''}`}>
                {/* Message Bubble */}
                <div
                  className={`rounded-2xl px-5 py-4 ${
                    message.role === 'user'
                      ? 'bg-[#2D5A4A] text-white'
                      : 'bg-white border border-[#EDE9E4] text-[#1A1815]'
                  }`}
                >
                  {message.role === 'assistant' && streamingMessageId === message.id ? (
                    <StreamingText 
                      text={message.content} 
                      speed={20}
                      onComplete={() => setStreamingMessageId(null)}
                      className="text-sm lg:text-base leading-relaxed whitespace-pre-wrap"
                    />
                  ) : (
                    <p className="text-sm lg:text-base leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  )}
                  
                  {/* Property Results */}
                  {message.properties && message.properties.length > 0 && (
                    <div className="mt-6 space-y-4">
                      <p className="text-xs font-medium uppercase tracking-widest text-[#B8956B]">
                        {message.properties.length} Properties Found
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {message.properties.map((property) => (
                          <div key={property.slug} className="scale-95 origin-top-left">
                            <ListingCard 
                              listing={property} 
                              variant="compact"
                            />
                          </div>
                        ))}
                      </div>
                      <Link 
                        href="/listings"
                        className="inline-flex items-center gap-2 text-sm font-medium text-[#2D5A4A] hover:text-[#1F3D31] transition-colors"
                      >
                        View all properties
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </div>
                  )}
                </div>
                
                {/* Timestamp */}
                <p 
                  className={`text-xs mt-2 ${message.role === 'user' ? 'text-right text-[#6B5F53]' : 'text-[#6B5F53]'}`}
                  suppressHydrationWarning
                >
                  {message.timestamp?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </motion.div>
          ))}
          
          {isLoading && activeToolCalls.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-white border border-[#EDE9E4] rounded-2xl px-5 py-4 max-w-[70%]">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#B8956B] animate-pulse" />
                  <span className="text-sm text-[#6B5F53]">Thinking...</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Error Message with Contact Options */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex justify-center"
            >
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 max-w-lg text-center">
                <p className="text-sm text-amber-800 mb-3">{error}</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <button 
                    onClick={handleRetry}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-800 text-xs font-medium rounded-lg transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Try Again
                  </button>
                  <a 
                    href="tel:+971562195566"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#2D5A4A] hover:bg-[#1F3D31] text-white text-xs font-medium rounded-lg transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    Call Now
                  </a>
                  <a 
                    href="mailto:hello@difc.property"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#B8956B] text-[#B8956B] hover:bg-[#B8956B] hover:text-white text-xs font-medium rounded-lg transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    Email
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Suggestions - Show after welcome message */}
        {messages.length === 1 && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8"
          >
            <p className="text-xs font-medium uppercase tracking-widest text-[#6B5F53] mb-4 text-center">
              Try asking about
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {SUGGESTIONS.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setInput(suggestion)
                    inputRef.current?.focus()
                  }}
                  className="flex items-center gap-3 px-4 py-3 bg-white border border-[#EDE9E4] rounded-xl hover:border-[#B8956B] hover:shadow-sm transition-all text-left group"
                >
                  <Search className="w-4 h-4 text-[#B8956B] group-hover:scale-110 transition-transform" />
                  <span className="text-sm text-[#1A1815]">{suggestion}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-[#EDE9E4] bg-white py-4 shrink-0">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center gap-3">
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={isRecording ? "Listening..." : "Ask about properties, buildings, or DIFC lifestyle..."}
                className="w-full bg-[#F7F5F2] border border-[#EDE9E4] rounded-full px-5 py-3.5 pr-12 text-sm focus:outline-none focus:border-[#B8956B] focus:ring-1 focus:ring-[#B8956B] transition-all placeholder:text-[#8B7F71] disabled:opacity-50"
                disabled={isLoading || isRecording}
              />
              <button
                onClick={handleVoiceInput}
                disabled={isLoading}
                className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 transition-colors ${
                  isRecording 
                    ? 'text-red-500 animate-pulse' 
                    : 'text-[#8B7F71] hover:text-[#2D5A4A]'
                }`}
                title={isRecording ? 'Stop recording' : 'Voice input'}
              >
                {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>
            </div>
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading || isRecording}
              className="flex items-center justify-center w-12 h-12 bg-[#2D5A4A] text-white rounded-full hover:bg-[#1F3D31] disabled:opacity-50 disabled:cursor-not-allowed transition-all shrink-0"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
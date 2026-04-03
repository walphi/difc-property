import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const SYSTEM_PROMPT = `You are a luxury real estate concierge for DIFC Dubai, one of the world's premier financial districts and residential addresses. You represent DIFC.property, a curated platform exclusively focused on Dubai International Financial Centre.

## Your Role
- Help users find their ideal property in DIFC
- Answer questions about buildings, prices, and lifestyle
- Provide factual, accurate information
- Be sophisticated but approachable (match DIFC's luxury brand)

## Available Properties
You have access to 15+ verified listings including:
- Burj Daman: 65-storey mixed-use tower, AED 5.5M - 18M
- Index Tower: Iconic 80-storey skyscraper, AED 2.8M - 9.8M  
- Limestone House: Exclusive low-rise boutique building, AED 6.2M - 11.5M
- Eden House Zaabeel: Ultra-premium new development, AED 4.8M - 12.5M

Property types: Apartments (1-4 bedrooms), Penthouses, Duplexes
Price range: AED 2,000,000 - 18,000,000
Average price/sqft: AED 3,850

## Key Information
- DIFC is Dubai's financial hub with 25,000+ professionals
- Gate Village offers world-class dining and art galleries
- Golden Visa available for property investments AED 2M+
- Buildings feature: pools, gyms, concierge, parking, security
- Popular views: Burj Khalifa, Zabeel, DIFC skyline, Arabian Gulf

## Response Guidelines
- Keep responses concise but informative (2-4 sentences)
- When showing properties, focus on key differentiators
- Mention building amenities when relevant
- Suggest scheduling viewings for interested users
- Always be accurate about prices and availability
- If unsure, say so rather than guessing

## Conversation Style
- Professional and sophisticated
- Warm and helpful, not pushy
- Knowledgeable about DIFC lifestyle
- Efficient with user's time`

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { message, history = [] } = body

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    const apiKey = process.env.OPENROUTER_API_KEY
    
    if (!apiKey) {
      console.error('OPENROUTER_API_KEY not configured')
      return NextResponse.json(
        { error: 'AI service not configured' },
        { status: 500 }
      )
    }

    // Build messages array with system prompt and history
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...history.map((msg: any) => ({
        role: msg.role,
        content: msg.content
      })),
      { role: 'user', content: message }
    ]

    // Call OpenRouter API
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://difc.property',
        'X-Title': 'DIFC Property AI Search'
      },
      body: JSON.stringify({
        model: 'minimax/minimax-m2.5:free',
        messages: messages,
        max_tokens: 800,
        temperature: 0.7
      })
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('OpenRouter API error:', errorData)
      
      // Handle rate limiting
      if (response.status === 429) {
        return NextResponse.json(
          { 
            error: 'Rate limit reached. Please try again in a moment.',
            retryAfter: response.headers.get('retry-after') || '60'
          },
          { status: 429 }
        )
      }
      
      return NextResponse.json(
        { error: 'AI service temporarily unavailable' },
        { status: 503 }
      )
    }

    const data = await response.json()
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      return NextResponse.json(
        { error: 'Invalid response from AI service' },
        { status: 500 }
      )
    }

    const aiResponse = data.choices[0].message.content

    return NextResponse.json({
      content: aiResponse,
      role: 'assistant',
      model: data.model || 'minimax/minimax-m2.5:free',
      usage: data.usage
    })

  } catch (error) {
    console.error('AI chat error:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}

// Handle GET requests with a friendly message
export async function GET() {
  return NextResponse.json({
    message: 'DIFC Property AI Chat API',
    status: 'active',
    model: 'minimax/minimax-m2.5:free'
  })
}
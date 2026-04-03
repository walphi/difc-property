import type { Metadata } from 'next'
import { ChatInterface } from '@/components/chat/ChatInterface'

export const metadata: Metadata = {
  title: 'AI Property Search | DIFC.property',
  description: 'Find your perfect property in Dubai International Financial Centre using our AI-powered search assistant. Natural language property search.',
  keywords: ['DIFC property search', 'AI property finder', 'natural language search', 'DIFC real estate AI'],
}

export default function SearchPage() {
  return (
    <main className="min-h-screen bg-[#FDFCFB] pt-16 lg:pt-20">
      {/* Header */}
      <div className="border-b border-[#EDE9E4] bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#B8956B]">
              AI-Powered Search
            </p>
            <h1 className="font-serif text-2xl lg:text-3xl font-normal text-[#1A1815] mt-1">
              Property Concierge
            </h1>
          </div>
        </div>
      </div>

      {/* Chat Interface */}
      <ChatInterface />
    </main>
  )
}
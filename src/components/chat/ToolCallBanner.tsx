'use client'

import { motion } from 'framer-motion'
import { Search, Building, MapPin, Calculator, Loader2 } from 'lucide-react'
import { ToolCall } from '@/lib/ai/types'

interface ToolCallBannerProps {
  toolCall: ToolCall
}

const toolIcons: Record<string, React.ElementType> = {
  'searchProperties': Search,
  'getBuildingInfo': Building,
  'getDIFCContent': MapPin,
  'calculateROI': Calculator
}

const toolLabels: Record<string, string> = {
  'searchProperties': 'Searching properties...',
  'getBuildingInfo': 'Getting building information...',
  'getDIFCContent': 'Loading DIFC information...',
  'calculateROI': 'Calculating investment returns...'
}

export function ToolCallBanner({ toolCall }: ToolCallBannerProps) {
  const { name, status } = toolCall
  const Icon = toolIcons[name] || Search
  const label = toolLabels[name] || 'Processing...'

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex items-center gap-3 px-4 py-3 bg-[#F7F5F2] border border-[#EDE9E4] rounded-xl mb-4"
    >
      <div className="flex items-center justify-center w-8 h-8 bg-[#B8956B]/10 rounded-full">
        {status === 'in_progress' ? (
          <Loader2 className="w-4 h-4 text-[#B8956B] animate-spin" />
        ) : (
          <Icon className="w-4 h-4 text-[#B8956B]" />
        )}
      </div>
      <div className="flex-1">
        <p className="text-sm text-[#1A1815]">{label}</p>
        {status === 'completed' && (
          <p className="text-xs text-[#6B5F53]">✓ Complete</p>
        )}
      </div>
    </motion.div>
  )
}
'use client'

import { useState, useEffect, useCallback } from 'react'

interface StreamingTextProps {
  text: string
  speed?: number // ms per character
  onComplete?: () => void
  className?: string
}

export function StreamingText({ text, speed = 30, onComplete, className = '' }: StreamingTextProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  const streamText = useCallback(() => {
    let index = 0
    setDisplayedText('')
    setIsComplete(false)

    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1))
        index++
      } else {
        clearInterval(interval)
        setIsComplete(true)
        onComplete?.()
      }
    }, speed)

    return () => clearInterval(interval)
  }, [text, speed, onComplete])

  useEffect(() => {
    const cleanup = streamText()
    return cleanup
  }, [streamText])

  return (
    <span className={className}>
      {displayedText}
      {!isComplete && (
        <span className="inline-block w-0.5 h-4 bg-[#B8956B] ml-0.5 animate-pulse" />
      )}
    </span>
  )
}
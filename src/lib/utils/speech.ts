// Web Speech API utilities for voice input

// TypeScript declarations for Web Speech API
interface SpeechRecognition extends EventTarget {
  continuous: boolean
  interimResults: boolean
  lang: string
  start(): void
  stop(): void
  onresult: ((event: SpeechRecognitionEvent) => void) | null
  onend: (() => void) | null
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList
}

interface SpeechRecognitionResultList {
  length: number
  [index: number]: SpeechRecognitionResult
}

interface SpeechRecognitionResult {
  isFinal: boolean
  [index: number]: {
    transcript: string
    confidence: number
  }
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition
    webkitSpeechRecognition: new () => SpeechRecognition
  }
}

export interface SpeechRecognitionResultType {
  transcript: string
  confidence: number
  isFinal: boolean
}

export class VoiceInput {
  private recognition: SpeechRecognition | null = null
  private isListening = false
  private onResultCallback: ((result: SpeechRecognitionResultType) => void) | null = null
  private onEndCallback: (() => void) | null = null
  private onErrorCallback: ((error: string) => void) | null = null

  constructor() {
    if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      this.recognition = new SpeechRecognition()
      this.setupRecognition()
    }
  }

  private setupRecognition() {
    if (!this.recognition) return

    this.recognition.continuous = false
    this.recognition.interimResults = true
    this.recognition.lang = 'en-US'

    this.recognition.onresult = (event: SpeechRecognitionEvent) => {
      const results = event.results
      if (results.length > 0) {
        const result = results[results.length - 1]
        const transcript = result[0].transcript
        const confidence = result[0].confidence
        
        this.onResultCallback?.({
          transcript,
          confidence,
          isFinal: result.isFinal
        })
      }
    }

    this.recognition.onend = () => {
      this.isListening = false
      this.onEndCallback?.()
    }

    this.recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      this.isListening = false
      let errorMessage = 'Speech recognition error'
      
      switch (event.error) {
        case 'no-speech':
          errorMessage = 'No speech detected. Please try again.'
          break
        case 'audio-capture':
          errorMessage = 'No microphone found. Please check your device.'
          break
        case 'not-allowed':
          errorMessage = 'Microphone access denied. Please allow microphone access.'
          break
        case 'network':
          errorMessage = 'Network error. Please check your connection.'
          break
        default:
          errorMessage = `Error: ${event.error}`
      }
      
      this.onErrorCallback?.(errorMessage)
    }
  }

  start(
    onResult: (result: SpeechRecognitionResultType) => void,
    onEnd: () => void,
    onError: (error: string) => void
  ): boolean {
    if (!this.recognition) {
      onError('Speech recognition not supported in this browser')
      return false
    }

    if (this.isListening) {
      this.stop()
    }

    this.onResultCallback = onResult
    this.onEndCallback = onEnd
    this.onErrorCallback = onError

    try {
      this.recognition.start()
      this.isListening = true
      return true
    } catch (error) {
      onError('Failed to start speech recognition')
      return false
    }
  }

  stop() {
    if (this.recognition && this.isListening) {
      this.recognition.stop()
      this.isListening = false
    }
  }

  isSupported(): boolean {
    return this.recognition !== null
  }

  isActive(): boolean {
    return this.isListening
  }
}

// Singleton instance
let voiceInputInstance: VoiceInput | null = null

export function getVoiceInput(): VoiceInput {
  if (!voiceInputInstance) {
    voiceInputInstance = new VoiceInput()
  }
  return voiceInputInstance
}
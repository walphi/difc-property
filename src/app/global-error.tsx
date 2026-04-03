'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertCircle, RefreshCw, Home } from 'lucide-react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error details for debugging
    console.error('Global application error:', error)
  }, [error])

  return (
    <html lang="en">
      <body className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            {/* Error Icon */}
            <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-red-50">
              <AlertCircle className="h-10 w-10 text-red-600" />
            </div>

            {/* Error Title */}
            <h1 className="font-serif text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
              Something Went Wrong
            </h1>

            {/* Error Description */}
            <p className="mt-4 text-lg text-stone-600">
              We apologize, but we encountered an unexpected error. Our team has been notified and we're working to resolve the issue.
            </p>

            {/* Error Details (only in development) */}
            {process.env.NODE_ENV === 'development' && (
              <div className="mt-6 rounded-lg bg-stone-50 p-4 text-left">
                <p className="text-sm font-medium text-stone-900">Error Details:</p>
                <p className="mt-1 text-sm text-stone-600 font-mono">{error.message}</p>
                {error.digest && (
                  <p className="mt-1 text-xs text-stone-500">Digest: {error.digest}</p>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={reset}
                className="inline-flex items-center gap-2 rounded-full bg-[#047857] px-6 py-3 text-base font-semibold text-white hover:bg-[#065f46] transition-all duration-300 shadow-lg"
              >
                <RefreshCw className="h-5 w-5" />
                Try Again
              </button>

              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full border border-stone-300 px-6 py-3 text-base font-semibold text-stone-700 hover:bg-stone-50 transition-all duration-300"
              >
                <Home className="h-5 w-5" />
                Back to Home
              </Link>
            </div>

            {/* Help Text */}
            <p className="mt-8 text-sm text-stone-500">
              If the problem persists, please contact us at{' '}
              <a href="mailto:contact@difc.property" className="text-[#047857] hover:underline">
                contact@difc.property
              </a>
            </p>
          </div>
        </div>
      </body>
    </html>
  )
}

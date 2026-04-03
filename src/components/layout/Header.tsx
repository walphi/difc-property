'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { href: '/listings', label: 'Properties' },
  { href: '/search', label: 'Search', isNew: true },
  { href: '/prices', label: 'Prices' },
  { href: '/golden-visa', label: 'Golden Visa' },
  { href: '/living', label: 'Living' },
  { href: '/law', label: 'Law' },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-[#FDFCFB]/95 backdrop-blur-sm border-b border-[#EDE9E4]/60" />
      
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 lg:h-20 items-center justify-between">
          {/* Text-only brand - no logo */}
          <Link href="/" className="group">
            <span className="font-serif text-xl lg:text-2xl font-medium tracking-tight text-[#1A1815] group-hover:text-[#2D5A4A] transition-colors">
              DIFC<span className="text-[#B8956B]">.</span>Property
            </span>
          </Link>

          {/* Menu Button - Desktop & Mobile */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center gap-3 p-2 text-[#6B5F53] hover:text-[#2D5A4A] transition-colors group"
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-6 flex items-center justify-center">
              <motion.div
                animate={{ rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? 0 : -3 }}
                className="absolute w-5 h-0.5 bg-current"
              />
              <motion.div
                animate={{ rotate: isMenuOpen ? -45 : 0, y: isMenuOpen ? 0 : 3, opacity: isMenuOpen ? 1 : 1 }}
                className="absolute w-5 h-0.5 bg-current"
              />
            </div>
          </button>
        </div>
      </div>

      {/* Full Screen Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="fixed inset-0 top-16 lg:top-20 bg-[#FDFCFB]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
              <motion.nav 
                className="space-y-1"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  visible: { transition: { staggerChildren: 0.08 } },
                  hidden: { transition: { staggerChildren: 0.05 } }
                }}
              >
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    variants={{
                      visible: { opacity: 1, x: 0 },
                      hidden: { opacity: 0, x: -30 }
                    }}
                    transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    <Link 
                      href={item.href} 
                      className="group flex items-center gap-4 py-3 lg:py-4"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="text-xs lg:text-sm text-[#B8956B] font-mono">0{index + 1}</span>
                      <span className="font-serif text-2xl lg:text-4xl font-light text-[#1A1815] group-hover:text-[#2D5A4A] transition-colors flex items-center gap-3">
                        {item.label}
                        {'isNew' in item && item.isNew && (
                          <span className="text-xs bg-[#2D5A4A] text-white px-2 py-0.5 rounded-full font-sans font-medium">
                            NEW
                          </span>
                        )}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </motion.nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
'use client'

import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'

const heroSlides = [
  {
    id: 1,
    image: '/images/hero/Penthouse-difc-1.avif',
    title: 'Exclusive Penthouses',
    highlight: 'With Panoramic Views',
    description: 'Wake up to breathtaking views of the Burj Khalifa and Dubai skyline',
    badge: 'Premium Residences',
  },
  {
    id: 2,
    image: '/images/hero/Downtown-view.png',
    title: 'Luxury Living in',
    highlight: "Dubai's Financial Heart",
    description: 'Discover exceptional residences in the Dubai International Financial Centre',
    badge: 'Dubai International Financial Centre',
  },
  {
    id: 3,
    image: '/images/hero/Architecture-difc.jpg',
    title: 'Iconic Architecture',
    highlight: 'World-Class Design',
    description: 'Experience residences crafted by renowned architects in Dubai\'s most prestigious district',
    badge: 'Award-Winning Buildings',
  },
  {
    id: 4,
    image: '/images/hero/Lifestyle-difc.jpg',
    title: 'World-Class Amenities',
    highlight: 'At Your Doorstep',
    description: 'From rooftop pools to private cinemas, experience luxury living with exceptional facilities',
    badge: 'Luxury Lifestyle',
  },
  {
    id: 5,
    image: '/images/hero/difc-gate.avif',
    title: 'Urban Sophistication',
    highlight: 'In Gate Village',
    description: 'Live steps away from world-class dining, art galleries, and boutique shopping',
    badge: 'Prime Location',
  },
]

export function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 6000, stopOnInteraction: false }),
  ])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index)
    },
    [emblaApi]
  )

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
    
    // Trigger load animation
    setTimeout(() => setIsLoaded(true), 100)
  }, [emblaApi, onSelect])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#1A1815]">
      {/* Carousel */}
      <div className="absolute inset-0" ref={emblaRef}>
        <div className="flex h-full">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className="relative flex-[0_0_100%] min-h-screen"
            >
              {/* Background Image with Ken Burns effect */}
              <div className="absolute inset-0">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority={index === 0}
                  className={`object-cover transition-transform duration-[8000ms] ease-linear ${
                    selectedIndex === index ? 'scale-110' : 'scale-100'
                  }`}
                  sizes="100vw"
                />
                {/* Warm multi-layer gradient for premium depth */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#1A1815] via-[#1A1815]/80 to-[#1A1815]/40" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1815]/95 via-transparent to-[#1A1815]/50" />
                {/* Warm vignette overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(45,42,36,0.4)_100%)]" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Content Overlay */}
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-28 sm:pb-32">
        <div className="max-w-3xl">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`transition-all duration-700 ${
                selectedIndex === index
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8 absolute pointer-events-none'
              }`}
            >
              {selectedIndex === index && (
                <>
                  {/* Premium Eyebrow - no rounded corners */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex items-center gap-4 mb-4 sm:mb-6"
                  >
                    <span className="hidden sm:block w-12 h-[1px] bg-[#B8956B]" />
                    <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#B8956B]">
                      {slide.badge}
                    </span>
                    <span className="hidden sm:block w-12 h-[1px] bg-[#B8956B]" />
                  </motion.div>

                  {/* Main Title - Editorial style, no bold */}
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.15]"
                  >
                    {slide.title}
                    <br />
                    <span className="text-[#D4B896]">
                      {slide.highlight}
                    </span>
                  </motion.h1>

                  {/* Description - Refined */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl leading-relaxed text-white/80 max-w-xl font-light"
                  >
                    {slide.description}
                  </motion.p>

                  {/* CTA Buttons - Rectangular, sophisticated */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="mt-6 sm:mt-8 flex flex-wrap gap-4"
                  >
                    <Link
                      href="/listings"
                      className="group inline-flex items-center gap-3 bg-[#2D5A4A] px-6 py-3 text-sm font-medium text-white hover:bg-[#1F3D31] transition-all duration-300"
                    >
                      View Properties
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                    <Link
                      href="/areas/difc"
                      className="group inline-flex items-center gap-2 border border-white/30 bg-white/5 backdrop-blur-sm px-6 py-3 text-sm font-medium text-white hover:bg-white/10 hover:border-[#B8956B] transition-all duration-300"
                    >
                      Explore DIFC
                    </Link>
                  </motion.div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows - Rectangular */}
      <div className="absolute bottom-24 sm:bottom-32 left-2 right-2 sm:left-4 sm:right-4 z-20 flex justify-between pointer-events-none">
        <button
          onClick={scrollPrev}
          className="pointer-events-auto flex h-12 w-12 items-center justify-center border border-white/20 bg-black/30 backdrop-blur-sm text-white hover:bg-[#B8956B] hover:border-[#B8956B] transition-all duration-300"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>
        <button
          onClick={scrollNext}
          className="pointer-events-auto flex h-12 w-12 items-center justify-center border border-white/20 bg-black/30 backdrop-blur-sm text-white hover:bg-[#B8956B] hover:border-[#B8956B] transition-all duration-300"
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>
      </div>

      {/* Slide Indicators - Rectangular bars */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 sm:gap-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`relative h-1 transition-all duration-500 ${
              index === selectedIndex
                ? 'w-12 bg-[#B8956B]'
                : 'w-4 bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          >
            {index === selectedIndex && (
              <span className="absolute inset-0 bg-[#D4B896] animate-pulse" />
            )}
          </button>
        ))}
      </div>

      {/* Progress Bar - Gold accent */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10">
        <div
          className="h-full bg-[#B8956B] transition-all duration-300"
          style={{
            width: `${((selectedIndex + 1) / heroSlides.length) * 100}%`,
          }}
        />
      </div>
    </section>
  )
}

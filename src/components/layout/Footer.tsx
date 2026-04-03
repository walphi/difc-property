import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'

export function Footer() {
  return (
    <footer className="w-full border-t border-[#EDE9E4] bg-[#F7F5F2] relative">
      <div className="container relative mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand - No logo, text only */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-serif text-xl font-medium tracking-tight text-[#1A1815]">
                DIFC<span className="text-[#B8956B]">.</span>Property
              </span>
            </Link>
            <p className="text-sm text-[#6B5F53] leading-relaxed">
              A curated luxury real estate and district intelligence platform for Dubai International Financial Centre.
            </p>
          </div>

          {/* Properties */}
          <div>
            <h3 className="font-serif text-lg font-medium text-[#1A1815] mb-4">Properties</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/listings" className="text-sm text-[#6B5F53] hover:text-[#2D5A4A] transition-colors">
                  All Properties
                </Link>
              </li>
              <li>
                <Link href="/listings?type=penthouse" className="text-sm text-[#6B5F53] hover:text-[#2D5A4A] transition-colors">
                  Penthouses
                </Link>
              </li>
              <li>
                <Link href="/prices" className="text-sm text-[#6B5F53] hover:text-[#2D5A4A] transition-colors">
                  Market Prices
                </Link>
              </li>
            </ul>
          </div>

          {/* DIFC Guide */}
          <div>
            <h3 className="font-serif text-lg font-medium text-[#1A1815] mb-4">DIFC Guide</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/living" className="text-sm text-[#6B5F53] hover:text-[#2D5A4A] transition-colors">
                  Living in DIFC
                </Link>
              </li>
              <li>
                <Link href="/golden-visa" className="text-sm text-[#6B5F53] hover:text-[#2D5A4A] transition-colors">
                  Golden Visa
                </Link>
              </li>
              <li>
                <Link href="/law" className="text-sm text-[#6B5F53] hover:text-[#2D5A4A] transition-colors">
                  Legal Framework
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-lg font-medium text-[#1A1815] mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-[#B8956B] mt-0.5 shrink-0" />
                <span className="text-sm text-[#6B5F53]">
                  DIFC, Dubai, UAE
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-[#B8956B] shrink-0" />
                <a href="tel:+971562195566" className="text-sm text-[#6B5F53] hover:text-[#2D5A4A] transition-colors">
                  +971 56 219 5566
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-[#B8956B] shrink-0" />
                <a href="mailto:contact@difc.property" className="text-sm text-[#6B5F53] hover:text-[#2D5A4A] transition-colors">
                  contact@difc.property
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-[#EDE9E4]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-[#8B7F71]">
              © {new Date().getFullYear()} DIFC.Property. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="text-xs text-[#8B7F71] hover:text-[#2D2924] transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-xs text-[#8B7F71] hover:text-[#2D2924] transition-colors">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
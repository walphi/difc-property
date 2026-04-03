import { loadLegalContent, loadFAQsForPage } from '@/lib/data/normalized'
import { LeadTrackingWrapper } from '@/components/LeadTrackingWrapper'
import { FAQSection } from '@/components/FAQSection'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'DIFC Real Property Law | Legal Framework | DIFC.property',
  description: 'Comprehensive guide to DIFC Real Property Law, freehold ownership, property registration, and legal framework for property investors in Dubai International Financial Centre.',
  keywords: ['DIFC Real Property Law', 'DIFC property legal framework', 'freehold ownership DIFC', 'DIFC property registration', 'DIFC strata title law'],
}

export default async function LawPage() {
  const [legalContent, faqs] = await Promise.all([
    loadLegalContent(),
    loadFAQsForPage('law', 6),
  ])

  const realPropertyContent = legalContent.filter(c => c.category === 'real-property-law')

  return (
    <LeadTrackingWrapper pageType="legal" pageSlug="law">
      <div className="min-h-screen bg-[#FDFCFB] pt-16 lg:pt-20">
        {/* Header */}
        <div className="border-b border-[#EDE9E4] bg-white">
          <div className="container mx-auto px-4 py-12 lg:py-16 sm:px-6 lg:px-8">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#B8956B] mb-3">
              Legal Framework
            </p>
            <h1 className="font-serif text-3xl lg:text-4xl font-normal text-[#1A1815] leading-tight max-w-3xl">
              DIFC Real Property Law
            </h1>
            <p className="mt-4 max-w-2xl text-[#6B5F53] leading-relaxed">
              Understanding property ownership, registration, and transaction frameworks 
              in Dubai International Financial Centre.
            </p>
          </div>
        </div>

        {/* Main Content - Editorial Layout */}
        <div className="container mx-auto px-4 py-16 lg:py-20 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:gap-20 lg:grid-cols-12">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-8">
              {/* Introduction */}
              <section className="mb-16">
                <p className="text-lg lg:text-xl text-[#6B5F53] leading-relaxed mb-8">
                  The DIFC Real Property Law provides the legal framework governing all real property 
                  within the Dubai International Financial Centre jurisdiction. This comprehensive 
                  structure ensures secure property ownership, transparent registration processes, 
                  and robust protection for investors and homeowners.
                </p>
                
                {/* Key Features - No boxes, just text with gold accent */}
                <div className="border-l-2 border-[#B8956B] pl-6 py-2 mb-12">
                  <h2 className="font-serif text-xl font-normal text-[#1A1815] mb-4">
                    Key Features
                  </h2>
                  <ul className="space-y-3 text-[#6B5F53]">
                    <li><strong className="text-[#1A1815]">Freehold Ownership:</strong> Foreign nationals can own property with full ownership rights</li>
                    <li><strong className="text-[#1A1815]">Title Guarantees:</strong> State-backed guarantees ensure registered owners have indefeasible title</li>
                    <li><strong className="text-[#1A1815]">Digital Registration:</strong> Streamlined 5-day registration process with electronic documentation</li>
                    <li><strong className="text-[#1A1815]">DIFC Courts:</strong> Property disputes resolved under English common law principles</li>
                  </ul>
                </div>
              </section>

              {/* Legal Topics - Editorial sections */}
              <section className="space-y-12">
                <div className="pb-8 border-b border-[#EDE9E4]">
                  <h2 className="font-serif text-2xl font-normal text-[#1A1815] mb-4">
                    Property Registration
                  </h2>
                  <p className="text-[#6B5F53] leading-relaxed mb-4">
                    All real property transactions must be registered with the DIFC Real Property Register. 
                    The registration process ensures legal ownership and protects against competing claims.
                  </p>
                  <ul className="text-sm text-[#6B5F53] space-y-2">
                    <li>Digital submission process</li>
                    <li>5 business day completion</li>
                    <li>Electronic title deeds</li>
                    <li>AML compliance required</li>
                  </ul>
                </div>

                <div className="pb-8 border-b border-[#EDE9E4]">
                  <h2 className="font-serif text-2xl font-normal text-[#1A1815] mb-4">
                    Strata Title & Owners Associations
                  </h2>
                  <p className="text-[#6B5F53] leading-relaxed mb-4">
                    Multi-unit buildings operate under strata title, with Owners Associations managing 
                    common property and shared facilities.
                  </p>
                  <ul className="text-sm text-[#6B5F53] space-y-2">
                    <li>Mandatory OA establishment</li>
                    <li>Service charge transparency</li>
                    <li>Reserve fund requirements</li>
                    <li>Owner voting rights</li>
                  </ul>
                </div>

                <div className="pb-8 border-b border-[#EDE9E4]">
                  <h2 className="font-serif text-2xl font-normal text-[#1A1815] mb-4">
                    Security Interests
                  </h2>
                  <p className="text-[#6B5F53] leading-relaxed mb-4">
                    DIFC Personal Property Law governs mortgages, charges, and security interests in 
                    personal property related to real estate transactions.
                  </p>
                  <ul className="text-sm text-[#6B5F53] space-y-2">
                    <li>Mortgage registration</li>
                    <li>Priority rules</li>
                    <li>Enforcement procedures</li>
                    <li>Floating charges</li>
                  </ul>
                </div>

                <div className="pb-8">
                  <h2 className="font-serif text-2xl font-normal text-[#1A1815] mb-4">
                    Dispute Resolution
                  </h2>
                  <p className="text-[#6B5F53] leading-relaxed mb-4">
                    Property disputes fall under DIFC Courts jurisdiction, operating under English 
                    common law with specialized real estate expertise.
                  </p>
                  <ul className="text-sm text-[#6B5F53] space-y-2">
                    <li>DIFC Court jurisdiction</li>
                    <li>English common law</li>
                    <li>Expert judges</li>
                    <li>LCIA Arbitration available</li>
                  </ul>
                </div>
              </section>

              {/* Official Resources */}
              <section className="pt-8 border-t border-[#EDE9E4]">
                <h2 className="font-serif text-xl font-normal text-[#1A1815] mb-6">
                  Official Resources
                </h2>
                <div className="flex flex-wrap gap-6">
                  <a 
                    href="https://www.difc.ae/laws-regulations" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#2D5A4A] hover:text-[#1F3D31] transition-colors border-b border-[#2D5A4A]/30 hover:border-[#1F3D31] pb-0.5"
                  >
                    DIFC Laws & Regulations
                  </a>
                  <a 
                    href="https://www.difccourts.ae" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#2D5A4A] hover:text-[#1F3D31] transition-colors border-b border-[#2D5A4A]/30 hover:border-[#1F3D31] pb-0.5"
                  >
                    DIFC Courts
                  </a>
                </div>
              </section>

              {/* Disclaimer */}
              <div className="mt-12 pt-8 border-t border-[#EDE9E4]">
                <p className="text-sm text-[#8B7F71]">
                  <strong className="text-[#6B5F53]">Disclaimer:</strong> The information provided is for general informational purposes 
                  only and does not constitute legal advice. Always consult qualified DIFC legal counsel for specific matters.
                </p>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="lg:col-span-4 space-y-8">
              {/* Legal Consultation CTA - Refined */}
              <div className="bg-[#2D5A4A] p-6 lg:p-8">
                <h3 className="font-serif text-lg font-normal text-white mb-3">
                  Legal Advice
                </h3>
                <p className="text-sm text-white/70 mb-6">
                  Our partners specialize in DIFC property law and can assist with transactions and compliance.
                </p>
                <a
                  href="tel:+971562195566"
                  data-cta="call"
                  data-cta-label="Legal Consultation Call"
                  className="cta-track block w-full text-center text-sm font-medium text-[#2D5A4A] bg-white hover:bg-[#F7F5F2] transition-colors px-4 py-3 mb-3"
                >
                  Call for Consultation
                </a>
                <a
                  href="https://wa.me/971562195566?text=I need legal advice on DIFC property law"
                  data-cta="whatsapp"
                  data-cta-label="Legal WhatsApp Inquiry"
                  className="cta-track block w-full text-center text-sm font-medium text-white hover:text-[#B8956B] transition-colors border-b border-white/30 hover:border-[#B8956B] pb-0.5"
                >
                  WhatsApp Inquiry
                </a>
              </div>

              {/* Quick Links - Minimal */}
              <div className="space-y-4">
                <h3 className="font-serif text-lg font-normal text-[#1A1815]">
                  Legal Topics
                </h3>
                <ul className="space-y-3">
                  <li>
                    <a href="#registration" className="text-sm text-[#6B5F53] hover:text-[#2D5A4A] transition-colors">
                      Property Registration
                    </a>
                  </li>
                  <li>
                    <a href="#strata" className="text-sm text-[#6B5F53] hover:text-[#2D5A4A] transition-colors">
                      Strata Title & OA
                    </a>
                  </li>
                  <li>
                    <a href="#security" className="text-sm text-[#6B5F53] hover:text-[#2D5A4A] transition-colors">
                      Security Interests
                    </a>
                  </li>
                  <li>
                    <a href="#disputes" className="text-sm text-[#6B5F53] hover:text-[#2D5A4A] transition-colors">
                      Dispute Resolution
                    </a>
                  </li>
                  <li className="pt-2">
                    <a href="/golden-visa" className="text-sm text-[#B8956B] hover:text-[#8B7355] transition-colors font-medium">
                      Golden Visa Requirements →
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        {faqs.length > 0 && (
          <section className="border-t border-[#EDE9E4] bg-[#F7F5F2]">
            <div className="container mx-auto px-4 py-16 lg:py-20 sm:px-6 lg:px-8">
              <div className="max-w-3xl">
                <FAQSection 
                  faqs={faqs}
                />
              </div>
            </div>
          </section>
        )}
      </div>
    </LeadTrackingWrapper>
  )
}
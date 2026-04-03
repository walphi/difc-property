import type { FAQ } from '@/lib/models/hermes.types'

interface FAQSectionProps {
  faqs: FAQ[]
  title?: string
  subtitle?: string
}

export function FAQSection({ faqs, title, subtitle }: FAQSectionProps) {
  if (faqs.length === 0) return null

  return (
    <div className="max-w-3xl">
      {title && (
        <>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#B8956B] mb-3">
            Questions
          </p>
          <h2 className="font-serif text-3xl font-normal text-[#1A1815] mb-3">
            {title}
          </h2>
        </>
      )}
      {subtitle && (
        <p className="text-[#6B5F53] mb-12 leading-relaxed">{subtitle}</p>
      )}
      
      <div className="space-y-0 divide-y divide-[#EDE9E4]">
        {faqs.map((faq) => (
          <div 
            key={faq.id} 
            className="py-8 first:pt-0"
          >
            <h3 className="font-serif text-lg font-medium text-[#1A1815] mb-3">
              {faq.question}
            </h3>
            <p className="text-[#6B5F53] leading-relaxed">
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
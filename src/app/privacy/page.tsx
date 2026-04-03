import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | DIFC Property",
  description: "Privacy policy for DIFC.property. Learn how we handle your data and protect your privacy.",
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-serif text-4xl font-medium text-[#1A1815] mb-8">
          Privacy Policy
        </h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-[#6B5F53] mb-6">
            Last updated: April 2025
          </p>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-medium text-[#1A1815] mb-4">
              1. Information We Collect
            </h2>
            <p className="text-[#6B5F53] mb-4">
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc pl-6 text-[#6B5F53] space-y-2">
              <li>Name and contact information (email, phone number)</li>
              <li>Property preferences and search criteria</li>
              <li>Communications with us via email, phone, or contact forms</li>
              <li>Information about your device and browsing behavior</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-medium text-[#1A1815] mb-4">
              2. How We Use Your Information
            </h2>
            <p className="text-[#6B5F53] mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 text-[#6B5F53] space-y-2">
              <li>Provide and improve our real estate services</li>
              <li>Communicate with you about properties and opportunities</li>
              <li>Personalize your experience on our platform</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-medium text-[#1A1815] mb-4">
              3. Information Sharing
            </h2>
            <p className="text-[#6B5F53]">
              We do not sell your personal information. We may share information with:
            </p>
            <ul className="list-disc pl-6 text-[#6B5F53] space-y-2">
              <li>Property developers and agents (only with your consent)</li>
              <li>Service providers who assist our operations</li>
              <li>Legal authorities when required by law</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-medium text-[#1A1815] mb-4">
              4. Data Security
            </h2>
            <p className="text-[#6B5F53]">
              We implement appropriate technical and organizational measures to protect your personal information. 
              However, no method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-medium text-[#1A1815] mb-4">
              5. Your Rights
            </h2>
            <p className="text-[#6B5F53] mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 text-[#6B5F53] space-y-2">
              <li>Access your personal information</li>
              <li>Request correction or deletion of your data</li>
              <li>Opt-out of marketing communications</li>
              <li>Object to certain processing activities</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-medium text-[#1A1815] mb-4">
              6. Contact Us
            </h2>
            <p className="text-[#6B5F53]">
              If you have any questions about this Privacy Policy, please contact us at:
              <br />
              <a href="mailto:contact@difc.property" className="text-[#2D5A4A] hover:underline">
                contact@difc.property
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

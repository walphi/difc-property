import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use | DIFC Property",
  description: "Terms of use for DIFC.property. Please read these terms carefully before using our services.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#FDFCFB] pt-16 lg:pt-20">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-serif text-4xl font-normal text-[#1A1815] mb-8">
            Terms of Use
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-[#6B5F53] mb-6">
              Last updated: April 2025
            </p>

            <section className="mb-8">
              <h2 className="font-serif text-2xl font-normal text-[#1A1815] mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="text-[#6B5F53]">
                By accessing or using DIFC.property, you agree to be bound by these Terms of Use. 
                If you do not agree to these terms, please do not use our website or services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl font-normal text-[#1A1815] mb-4">
                2. Services Description
              </h2>
              <p className="text-[#6B5F53] mb-4">
                DIFC.property provides a curated platform for luxury real estate in Dubai International Financial Centre. 
                Our services include:
              </p>
              <ul className="list-disc pl-6 text-[#6B5F53] space-y-2">
                <li>Property listings and information</li>
                <li>District intelligence and market insights</li>
                <li>Golden Visa guidance</li>
                <li>Connection with property developers and agents</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl font-normal text-[#1A1815] mb-4">
                3. Property Information
              </h2>
              <p className="text-[#6B5F53]">
                While we strive to provide accurate and up-to-date property information, all details, 
                including prices, availability, and specifications, are subject to change without notice. 
                Property listings are provided by third parties, and we recommend verifying all information 
                directly with developers or authorized agents before making any decisions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl font-normal text-[#1A1815] mb-4">
                4. User Conduct
              </h2>
              <p className="text-[#6B5F53] mb-4">
                When using our platform, you agree to:
              </p>
              <ul className="list-disc pl-6 text-[#6B5F53] space-y-2">
                <li>Provide accurate and truthful information</li>
                <li>Use the platform only for lawful purposes</li>
                <li>Not engage in fraudulent activities or misrepresentation</li>
                <li>Respect intellectual property rights</li>
                <li>Not attempt to disrupt or damage our services</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl font-normal text-[#1A1815] mb-4">
                5. Intellectual Property
              </h2>
              <p className="text-[#6B5F53]">
                All content on DIFC.property, including text, graphics, logos, images, and software, 
                is the property of DIFC.property or its content suppliers and is protected by copyright, 
                trademark, and other intellectual property laws. You may not reproduce, distribute, 
                or create derivative works without our express written permission.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl font-normal text-[#1A1815] mb-4">
                6. Limitation of Liability
              </h2>
              <p className="text-[#6B5F53]">
                DIFC.property is not a real estate broker or agent. We provide information and facilitate 
                connections but are not party to any property transactions. We are not liable for:
              </p>
              <ul className="list-disc pl-6 text-[#6B5F53] space-y-2">
                <li>Accuracy of third-party property information</li>
                <li>Quality or condition of listed properties</li>
                <li>Actions of developers, agents, or other users</li>
                <li>Any financial losses or damages arising from property transactions</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl font-normal text-[#1A1815] mb-4">
                7. Third-Party Links
              </h2>
              <p className="text-[#6B5F53]">
                Our website may contain links to third-party websites. We are not responsible for the 
                content, privacy practices, or services of these external sites. Your use of third-party 
                websites is at your own risk.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl font-normal text-[#1A1815] mb-4">
                8. Modifications
              </h2>
              <p className="text-[#6B5F53]">
                We reserve the right to modify these Terms of Use at any time. Changes will be effective 
                immediately upon posting. Your continued use of the platform constitutes acceptance of 
                the revised terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl font-normal text-[#1A1815] mb-4">
                9. Governing Law
              </h2>
              <p className="text-[#6B5F53]">
                These Terms of Use shall be governed by and construed in accordance with the laws of 
                Dubai, United Arab Emirates. Any disputes arising under these terms shall be subject to 
                the exclusive jurisdiction of the courts of Dubai.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl font-normal text-[#1A1815] mb-4">
                10. Contact Information
              </h2>
              <p className="text-[#6B5F53]">
                For questions about these Terms of Use, please contact us at:
                <br />
                <a href="mailto:contact@difc.property" className="text-[#2D5A4A] hover:underline">
                  contact@difc.property
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

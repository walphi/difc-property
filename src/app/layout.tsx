import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://difc.property"),
  title: {
    default: "DIFC.property | Premium Real Estate & District Intelligence for Dubai International Financial Centre",
    template: "%s | DIFC.property",
  },
  description: "Discover luxury properties for sale in DIFC, Dubai. Browse apartments, penthouses, and premium residences in Burj Daman, Index Tower, Limestone House, and Eden House Zaabeel. Your curated guide to DIFC real estate.",
  keywords: ["DIFC properties for sale", "DIFC Dubai property", "luxury apartments DIFC", "DIFC real estate", "DIFC property for sale", "DIFC Dubai", "Burj Daman", "Index Tower", "DIFC Heights"],
  authors: [{ name: "DIFC.property" }],
  creator: "DIFC.property",
  publisher: "DIFC.property",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_AE",
    alternateLocale: ["ar_AE"],
    url: "https://difc.property",
    siteName: "DIFC.property",
    title: "DIFC.property | Premium Real Estate in Dubai International Financial Centre",
    description: "Luxury properties for sale in DIFC. Discover apartments, penthouses, and premium residences.",
    images: [
      {
        url: "https://difc.property/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "DIFC.property - Premium Real Estate in Dubai International Financial Centre",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DIFC.property | Luxury Real Estate in Dubai International Financial Centre",
    description: "Premium properties for sale in DIFC. Your curated guide to Dubai's financial district real estate.",
    images: ["https://difc.property/og-image.jpg"],
    creator: "@difcproperty",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://difc.property",
    languages: {
      "en": "https://difc.property",
      "ar": "https://difc.property/ar",
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" style={{ fontFamily: 'var(--font-inter)' }}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

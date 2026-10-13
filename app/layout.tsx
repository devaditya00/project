import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://roshysdigital.com"),
  title: {
    default: "Roshy's Digital — Brands that get noticed. Events people remember.",
    template: "%s | Roshy's Digital",
  },
  description:
    "Roshy's Digital combines digital marketing, creative strategy and event experiences to help ambitious brands grow. Based in India.",
  keywords: [
    "digital marketing agency india",
    "event management company",
    "event ticketing platform india",
    "college event management",
    "jewellery brand marketing",
    "real estate digital marketing",
    "brand strategy agency",
    "performance marketing india",
  ],
  authors: [{ name: "Roshy's Digital" }],
  creator: "Roshy's Digital",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://roshysdigital.com",
    siteName: "Roshy's Digital",
    title: "Roshy's Digital — Brands that get noticed. Events people remember.",
    description:
      "We combine digital marketing, creative strategy and event experiences to help ambitious brands grow.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Roshy's Digital",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Roshy's Digital",
    description: "Brands that get noticed. Events people remember.",
    images: ["/og-image.jpg"],
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Fonts — loaded via link to avoid Turbopack next/font bug */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#F5F4E8" />
      </head>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
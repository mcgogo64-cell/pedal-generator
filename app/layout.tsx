import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MotionProvider from "../components/MotionProvider";
import JsonLd from "./jsonld";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pedal Generator Simulator - Energy & Calorie Calculator",
  description: "Interactive pedal-powered generator simulator. Calculate energy output, battery restoration, calories burned, and power output. Real-time calculations with beautiful animations.",
  keywords: ["pedal generator", "energy calculator", "calorie calculator", "exercise simulator", "power output", "fitness calculator", "energy conversion", "pedal power"],
  authors: [{ name: "Pedal Generator Team" }],
  creator: "Pedal Generator Team",
  publisher: "Pedal Generator",
  metadataBase: new URL('https://pedal-generator.vercel.app'),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pedal-generator.vercel.app",
    title: "Pedal Generator Simulator - Energy & Calorie Calculator",
    description: "Interactive pedal-powered generator simulator. Calculate energy output, battery restoration, and calories burned in real-time.",
    siteName: "Pedal Generator Simulator",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Pedal Generator Simulator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pedal Generator Simulator - Energy & Calorie Calculator",
    description: "Interactive pedal-powered generator simulator. Calculate energy output, battery restoration, and calories burned.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'eaea13b62532cdce',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <JsonLd />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4429391480566285"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* MotionProvider wraps route content for smooth transitions */}
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}

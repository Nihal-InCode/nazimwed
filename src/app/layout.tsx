import type { Metadata, Viewport } from "next";
import "./globals.css";
import { weddingConfig } from "@/config/wedding";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0D281E",
};

export const metadata: Metadata = {
  title: weddingConfig.meta.title,
  description: weddingConfig.meta.description,
  metadataBase: new URL("https://nazimwed.vercel.app"),
  openGraph: {
    title: weddingConfig.meta.title,
    description: weddingConfig.meta.description,
    type: "website",
    locale: "en_IN",
    siteName: "Wedding Invitation | Muhammed Nazim HF & Nafeesathul Misriya Wafiya",
    images: [
      {
        url: "/images/wedding-hands-bg.jpg",
        width: 1200,
        height: 800,
        alt: "Wedding Invitation - Muhammed Nazim HF & Nafeesathul Misriya Wafiya",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: weddingConfig.meta.title,
    description: weddingConfig.meta.description,
    images: ["/images/wedding-hands-bg.jpg"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
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
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen bg-ivory-50 text-emerald-950 antialiased selection:bg-gold-500/30 selection:text-emerald-950">
        {children}
      </body>
    </html>
  );
}

// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ClerkProvider,  } from '@clerk/nextjs';

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-sans' 
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "BioNest",
  description: "Your safe, beautiful digital nest for links, bio, and audience.",
  keywords: ["link in bio", "bio link", "creator tools", "digital home"],
  authors: [{ name: "BioNest" }],
  openGraph: {
    title: "BioNest - Your Digital Nest",
    description: "Build your personal home for links and audience.",
    images: [{ url: "/og-image.png" }], // TODO: add this image later
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={cn(
          "h-full antialiased",
          geistSans.variable, 
          geistMono.variable, 
          inter.variable,
          "font-sans"
        )}
      >
        <body className="min-h-full bg-zinc-950 text-white flex flex-col">
        
          <main className="flex-1">
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
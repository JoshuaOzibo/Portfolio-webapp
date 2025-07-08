import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Providers from "../providers/providers";
import { Toaster } from "@/components/ui/sonner"
import ConditionalLayout from "@/components/conditional-layout";
import AuthInitializer from "@/components/auth-initializer";
import { GoogleOAuthProvider } from '@react-oauth/google';

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio Dashboard | Developer Portfolio Management",
  description: "A modern portfolio management system for developers to showcase projects, skills, and experience with a beautiful dashboard interface.",
  keywords: ["portfolio", "developer", "dashboard", "projects", "skills", "experience", "web development"],
  authors: [{ name: "Joshua" }],
  openGraph: {
    title: "Portfolio Dashboard | Developer Portfolio Management",
    description: "A modern portfolio management system for developers to showcase projects, skills, and experience with a beautiful dashboard interface.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio Dashboard | Developer Portfolio Management",
    description: "A modern portfolio management system for developers to showcase projects, skills, and experience with a beautiful dashboard interface.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <GoogleOAuthProvider clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`}>
          <Providers>
            <AuthInitializer />
            <ConditionalLayout>
              {children}
            </ConditionalLayout>
            <Toaster position="top-right" richColors />
          </Providers>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}

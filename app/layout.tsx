import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Arun Manikandan | AI Engineer & Full-Stack Developer",
  description: "AI Engineer, LLM Systems Builder, and Agent Architect. Building intelligent systems, scalable infrastructure, and exploring the intersection of AI and software engineering.",
  keywords: ["AI", "Machine Learning", "Full-Stack Development", "LLM", "Agent Architecture", "Python", "Rust"],
  authors: [{ name: "Arun Manikandan" }],
  creator: "Arun Manikandan",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://arunmanikandan.dev",
    title: "Arun Manikandan | AI Engineer",
    description: "Building intelligent systems and scalable infrastructure",
    siteName: "Arun Manikandan",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arun Manikandan | AI Engineer",
    description: "Building intelligent systems and scalable infrastructure",
  },
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><text x='4' y='24' font-size='24' font-weight='bold' fill='%23000'>AM</text></svg>",
        type: "image/svg+xml",
      },
    ],
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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        {children}
        <Footer />
      </body>
    </html>
  );
}

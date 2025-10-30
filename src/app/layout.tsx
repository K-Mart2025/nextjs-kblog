import { apiUrl } from "@/data/config";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "./Footer";
import "./globals.css";
import { Header } from "./Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(
): Promise<Metadata> {
  // fetch post information
  const config = await fetch(`${apiUrl}/config/`).then((res) =>
    res.json()
  );

  return {
    title: config.bseoTitle,
    description: config.bseoDescription,
    keywords: config.bseoKeywords
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

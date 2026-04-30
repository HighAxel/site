import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import BackToTop from "./components/BackToTop";
import MainNav from "./components/MainNav";
import Footer from "./components/Footer";

import { QueryProvider } from "./providers/query-provider";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Threat Bot",
  description: "Powerful Discord bot",

  openGraph: {
    title: "Threat Bot",
    description: "Powerful Discord bot",
    url: "https://threat.best",
    siteName: "Threat",

    images: [
      {
        url: "https://threat.best/assets/site_logo.png",
        width: 512,
        height: 512,
        alt: "Threat Bot",
      },
    ],

    type: "website",
  },

  twitter: {
    card: "summary",
    title: "Threat Bot",
    description: "Powerful Discord bot",
    images: [
      "https://threat.best/assets/site_logo.png",
    ],
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col text-white relative overflow-x-hidden">


          <QueryProvider>

            <div className="fixed inset-0 -z-10 bg-[#050505]" />
            <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_20%,rgba(212,188,210,0.15),transparent_60%)]" />
            <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_80%,rgba(138,114,136,0.12),transparent_60%)]" />
            <div className="fixed inset-0 -z-10 bg-gradient-to-b from-transparent via-transparent to-black/80" />
            <div className="fixed inset-0 -z-10 opacity-[0.03] bg-[url('/noise.png')]" />

            <MainNav />

            <main className="flex-1">
              {children}
            </main>

            <Footer />

            <BackToTop />

          </QueryProvider>

      </body>
    </html>
  );
}
import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";
import Header from "../components/home/Header";
import Footer from "../components/home/Footer";


const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["700"], 
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ARAM TRUST",
    template: "%s | Makal Sevai Margam",
  },
  description:
    "Building homes, feeding the hungry, and funding the future of poor children — Uthamar Thiru Kovil, Arrakattalai.",
  icons: {
    icon: "/uthamar-logo.png",
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
      className={`${cormorant.variable} ${outfit.variable} h-full`}
    >
     <body className="min-h-screen flex flex-col antialiased bg-white">
  <Header />
  <main className="flex-1 w-full">
    {children}
  </main>
  <Footer />
</body>
    </html>
  );
}
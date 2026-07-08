import type { Metadata } from "next";
import { Inter_Tight, Aleo } from "next/font/google";
import "./globals.css";

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
});

const aleo = Aleo({
  subsets: ["latin"],
  variable: "--font-aleo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Veterinary Learning Hub | Clinical Reference & Protocols",
  description: "The definitive, clinical knowledge base for veterinary students and professionals. Access streamlined protocols, anatomical references, and pharmacological data instantly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${interTight.variable} ${aleo.variable}`} suppressHydrationWarning>
      <body className="font-serif leading-[1.4] bg-slate-50 text-slate-900 antialiased selection:bg-sky-600 selection:text-white min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}

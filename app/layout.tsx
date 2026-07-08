import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Veterinary Learning Hub | Clinical Reference & Protocols",
  description: "A disciplined, clinical-grade knowledge base and reference platform for veterinary clinicians, surgeons, and medical students.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${lora.variable}`}>
      <body className="font-sans bg-slate-50 text-slate-900 antialiased selection:bg-teal-600 selection:text-white min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}

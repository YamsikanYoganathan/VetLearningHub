import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0284C7",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: "Vetulan Service | Veterinary Academic Reference",
    template: "%s | Vetulan Service",
  },
  description:
    "The authoritative veterinary medical learning and clinical reference platform for students, educators, and veterinary practitioners.",
  icons: {
    icon: [
      { url: "/logo-mobile.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/logo-mobile.svg", type: "image/svg+xml" },
    ],
  },
  openGraph: {
    title: "Vetulan Service | Veterinary Academic Reference",
    description:
      "The authoritative veterinary medical learning and clinical reference platform for students, educators, and veterinary practitioners.",
    siteName: "Vetulan Service",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
    >
      <body className={`${inter.variable} min-h-screen flex flex-col font-sans antialiased bg-background text-foreground selection:bg-primary-subtle selection:text-primary`}>
        {children}
      </body>
    </html>
  );
}

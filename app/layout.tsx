import type { Metadata } from "next";
import { Fraunces, DM_Sans } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

import I18nProvider from "@/components/I18nProvider";
import { LanguageSelector } from "@/components/ui/LanguageSelector";

export const metadata: Metadata = {
  title: "Carbon Footprint Wizard | Medí tu impacto 🌱",
  description: "Calculá la huella de carbono de tu viaje al evento y descubrí cómo compensarla. Rápido, fácil y sustentable.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${fraunces.variable} ${dmSans.variable} font-sans antialiased bg-sand-100 text-dark`}
      >
        <I18nProvider>
          <header className="fixed top-0 right-0 p-4 z-50">
            <LanguageSelector />
          </header>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}

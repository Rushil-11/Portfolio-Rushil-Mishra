import type { Metadata } from "next";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./globals.css";
import { Aldrich } from "next/font/google";

const aldrich = Aldrich({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio - Rushil Mishra",
  description: "Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${aldrich.className} min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-1 flex-col">
          {children}
          </main>
        <Footer />
      </body>
    </html>
  );
}

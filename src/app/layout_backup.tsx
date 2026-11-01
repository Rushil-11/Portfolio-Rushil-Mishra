import type { Metadata } from "next";
import { Aldrich } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const aldrich = Aldrich({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio - Rushil Mishra",
  description: "Competitive Programmer, Software Engineer & Frontend Developer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${aldrich.className} min-h-screen flex flex-col bg-white text-black antialiased selection:bg-black selection:text-white`}
      >
        {/* Persistent Nav Header (State Inversion Aesthetic) */}
        <header className="w-full bg-white border-b border-black/10 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 h-20 flex items-center justify-between">
            {/* Left: Brand Heading */}
            <Link
              href="/"
              className="text-3xl md:text-4xl font-bold tracking-tight hover:opacity-85 transition-opacity"
            >
              Portfolio
            </Link>

            {/* Right: Nav Links with State Inversion */}
            <nav className="flex items-center gap-2 sm:gap-4 md:gap-6">
              {/* Active Home Option (Plain Text) */}
              <Link
                href="/"
                className="text-black font-semibold text-sm sm:text-base px-2 py-1 tracking-wide"
              >
                Home
              </Link>

              {/* Inactive Capsule Pills */}
              <Link
                href="/engineering"
                className="bg-black text-white px-3 sm:px-4 py-1.5 rounded-full text-xs font-medium tracking-wide hover:bg-zinc-800 transition-colors shadow-sm"
              >
                Engineering
              </Link>
              <Link
                href="/creative"
                className="bg-black text-white px-3 sm:px-4 py-1.5 rounded-full text-xs font-medium tracking-wide hover:bg-zinc-800 transition-colors shadow-sm"
              >
                Creative
              </Link>
              <Link
                href="/journey"
                className="bg-black text-white px-3 sm:px-4 py-1.5 rounded-full text-xs font-medium tracking-wide hover:bg-zinc-800 transition-colors shadow-sm"
              >
                Journey
              </Link>
            </nav>
          </div>
        </header>

        {/* Dynamic Route Content */}
        <main className="flex-1 flex flex-col">{children}</main>

        {/* Minimal Baseline Contact Footer */}
        <footer className="w-full border-t border-black bg-white py-4 md:py-6">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <span className="text-black text-sm md:text-base tracking-wider font-medium">
              Contact
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
}

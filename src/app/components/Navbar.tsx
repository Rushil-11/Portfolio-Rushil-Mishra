'use client'
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const naviItem = [
  { name: 'Home', href: '/' },
  { name: 'Engineering', href: '/engineering' },
  { name: 'Creative', href: '/creative' },
  { name: 'Journey', href: '/journey' }
];

export default function Navbar() {
  const currPath = usePathname();
  const [menuOpen, setMenuOpen] = useState(false); 

  const menuClick = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="relative flex flex-row">
      <h1 className="text-4xl md:text-7xl lg:text-8xl mt-4 md:mt-6 px-4 md:px-5 lg:px-6">
        Portfolio
      </h1>

      {/* Hamburger / Menu toggle button using open.jpg and close.jpg */}
      <button 
        type="button"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        className="w-10 h-10 md:w-14 md:h-14 mt-4 md:mt-8 absolute right-6 md:right-10 lg:hidden cursor-pointer rounded-lg overflow-hidden z-30" 
        onClick={menuClick}
      >
        <Image
          src="/close.jpg"
          alt="Open menu"
          fill
          className={`object-cover transition-all duration-300 ${
            menuOpen ? 'opacity-0 rotate-90 scale-75 pointer-events-none' : 'opacity-100 rotate-0 scale-100'
          }`}
        />
        <Image
          src="/open.jpg"
          alt="Close menu"
          fill
          className={`object-cover transition-all duration-300 ${
            menuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-75 pointer-events-none'
          }`}
        />
      </button>

      {/* Nav items container */}
      <div 
        className={`flex flex-col lg:flex-row gap-2 lg:gap-6 absolute right-6 lg:right-10 mt-16 lg:mt-12 ${
          menuOpen 
            ? 'flex-col z-20 gap-4 right-6 mt-16 md:mt-24 bg-black/90 p-4 rounded-2xl border border-white shadow-xl' 
            : 'hidden lg:flex'
        }`}
      >
        {naviItem.map((item) => {
          const isActive = currPath === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className={`h-6 lg:h-10 px-2 md:px-4 py-1 md:py-0 lg:py-1 rounded-full text-center text-xs md:text-xl lg:text-2xl ${
                isActive ? 'bg-white text-black' : 'bg-black text-white'
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

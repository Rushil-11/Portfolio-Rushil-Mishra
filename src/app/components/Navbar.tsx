
'use client'
import { usePathname } from "next/navigation";
import Link from "next/link";

const naviItem = [
  { name: 'Home', href: '/' },
  { name: 'Engineering', href: '/engineering' },
  { name: 'Creative', href: '/creative' },
  { name: 'Journey', href: '/journey' }
];

export default function Navbar() {
  const currPath = usePathname();

  return (
    <nav className="flex flex-row justify-between h-16 lg:h-20 w-full">
      <h1 className="text-4xl md:text-6xl lg:text-8xl px-3 md:px-5 lg:px-6 py-3 md:py-5 lg:py-6">
        Portfolio
      </h1>
      <div className="flex gap-6 my-12 mr-8">
        {naviItem.map((item) => {
          const isActive = currPath === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`px-5 h-12 py-2 bg-black text-2xl rounded-full ${isActive ? 'bg-white text-black' : 'bg-black text-white'}`}
            >
              {item.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

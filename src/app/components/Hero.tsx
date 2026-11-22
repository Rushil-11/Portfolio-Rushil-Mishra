"use client"
import { useState, useEffect } from "react"
import Image from "next/image"

export default function Hero() {

  const texts = [
    "Engineer",
    "Frontend Developer",
    "Competitive Programmer",
    "Content Writer",
    "Curious Designer"
  ]

  const [currentText, setCurrentText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = texts[wordIndex];
    const typingSpeed = isDeleting ? 50 : 50; //erasing faster

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setCurrentText(currentWord.substring(0, currentText.length + 1));
        if (currentText === currentWord) {
          setTimeout(() => setIsDeleting(true), 800);
        }
      }
      else {
        setCurrentText(currentWord.substring(0, currentText.length - 1));
        if (currentText === "") {
          setIsDeleting(false); setWordIndex((prev) => (prev + 1) % texts.length)
        }
      }
    }, typingSpeed);
    return () => clearTimeout(timer);

  }, [currentText, isDeleting, wordIndex]
  );

  return (
    <section className="relative flex flex-col items-center justify-center my-12 lg:my-22 bg-white w-full px-4">
      <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-240 lg:h-120">
        <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-240 lg:h-120 bg-black absolute top-3 left-3 sm:top-4 sm:left-4"></div>
        <div className="bg-white w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-240 lg:h-120 relative border-2 flex items-center justify-center lg:block">
          <Image
            src="/image.jpg"
            alt="Owner"
            width={420}
            height={420}
            className="w-[86%] h-[86%] object-cover lg:w-[420px] lg:h-[420px] lg:absolute lg:left-6 lg:top-7"
          />
          {/* Rushil Mishra: lg screen only */}
          <h1 className="hidden lg:block text-5xl absolute left-115 top-32">Rushil Mishra</h1>
          
          {/* Typewriter effect: exact original position on lg screen */}
          <h2 className="hidden lg:block absolute left-115 top-45 text-6xl text-black">
            <span>{currentText}</span>
            <span className="animate-pulse text-black"></span>
          </h2>
        </div>
      </div>

      {/* Typewriter text for md and sm screens: locked height so intro.tsx position never shifts */}
      <div className="lg:hidden mt-6 sm:mt-8 md:mt-10 h-10 sm:h-12 md:h-14 flex justify-center items-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl text-black text-center tracking-tight font-normal whitespace-nowrap">
          <span>{currentText}</span>
          <span className="animate-pulse text-black">|</span>
        </h2>
      </div>
    </section>
  )
}

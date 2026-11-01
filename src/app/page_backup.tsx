
"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const ROLES = [
  "Competitive Programmer",
  "Software Engineer",
  "Frontend Developer",
  "Content Writer"
];

export default function Home() {
  // --- Typewriter State ---
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullText = ROLES[roleIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      // Typing phase
      if (displayedText.length < currentFullText.length) {
        timer = setTimeout(() => {
          setDisplayedText(currentFullText.slice(0, displayedText.length + 1));
        }, 90);
      } else {
        // Finished typing, pause before deleting
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 1800);
      }
    } else {
      // Deleting phase
      if (displayedText.length > 0) {
        timer = setTimeout(() => {
          setDisplayedText(currentFullText.slice(0, displayedText.length - 1));
        }, 45);
      } else {
        // Finished deleting, move to next role
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, roleIndex]);

  // --- Pull-Switch State ---
  const [isPulled, setIsPulled] = useState(false);
  const [isPulling, setIsPulling] = useState(false);

  const handlePull = () => {
    setIsPulling(true);
    setTimeout(() => {
      setIsPulled(true);
      setIsPulling(false);
    }, 280);
  };

  return (
    <div className="w-full flex-1 flex flex-col bg-white">
      {/* ---------------------------------------------------- */}
      {/* 1. HERO CARD AREA (Top - Pure White Panel)          */}
      {/* ---------------------------------------------------- */}
      <section className="w-full bg-white py-12 md:py-20 px-4 sm:px-6 flex items-center justify-center">
        <div className="w-full max-w-4xl bg-white border-2 border-black p-6 sm:p-10 md:p-12 shadow-[8px_8px_0px_rgba(0,0,0,1)] md:shadow-[14px_14px_0px_rgba(0,0,0,1)] transition-all">
          <div className="flex flex-col md:flex-row items-center md:items-center gap-8 md:gap-14">
            
            {/* Left: Profile Image Box */}
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 shrink-0 border border-black overflow-hidden bg-zinc-100 shadow-[4px_4px_0px_rgba(0,0,0,1)]">
              <Image
                src="/image.jpg"
                alt="Rushil Mishra"
                fill
                priority
                className="object-cover object-center transition-all duration-500"
                sizes="(max-width: 768px) 256px, 320px"
              />
            </div>

            {/* Right: Info & Typewriter Area */}
            <div className="flex flex-col justify-center text-left w-full">
              <span className="text-xl sm:text-2xl md:text-3xl text-black font-normal tracking-wide">
                Rushil Mishra
              </span>

              {/* Dynamic Typewriter Heading */}
              <div className="mt-2 min-h-[4.5rem] sm:min-h-[6rem] md:min-h-[7.5rem] flex items-center">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.15] tracking-tight text-black break-words">
                  {displayedText}
                  <span className="inline-block w-2.5 sm:w-3 md:w-3.5 h-6 sm:h-8 md:h-10 bg-black ml-1.5 align-middle animate-cursor" />
                </h1>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 2. INTERACTIVE "ABOUT" ZONE (Bottom - Pure Black)   */}
      {/* ---------------------------------------------------- */}
      <section className="w-full bg-black text-white py-16 md:py-24 px-6 md:px-12 relative overflow-hidden flex-1 flex flex-col justify-center">
        
        {/* --- Pull-Switch Wire & Knob --- */}
        {!isPulled && (
          <div
            className={`absolute top-0 right-8 sm:right-16 md:right-28 z-20 flex flex-col items-center select-none transition-all duration-300 ${
              isPulling ? "translate-y-4" : "hover:translate-y-1"
            }`}
          >
            {/* White Hanging Wire */}
            <div className="w-[1.5px] h-20 sm:h-28 md:h-36 bg-white shadow-[0_0_8px_rgba(255,255,255,0.4)]" />

            {/* Pull Trigger Button & Tooltip */}
            <button
              onClick={handlePull}
              className="group flex items-center gap-2 cursor-pointer focus:outline-none -mt-0.5 active:translate-y-4 transition-transform duration-150"
              aria-label="Pull switch to reveal about section"
            >
              <span className="text-xs md:text-sm text-zinc-300 tracking-wider font-normal opacity-90 group-hover:opacity-100 group-hover:text-white transition-opacity">
                pull this
              </span>
              <div className="w-4 h-8 bg-white rounded-full shadow-[0_0_12px_rgba(255,255,255,0.7)] group-hover:scale-110 transition-transform duration-200" />
            </button>
          </div>
        )}

        {/* Content Container */}
        <div className="max-w-3xl mx-auto w-full text-center md:text-left z-10">
          {/* Static Title (Visible as in image_21.png) */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6 md:mb-10 text-center">
            Hi, this is Rushil Mishra
          </h2>

          {/* Reveal Narrative Block */}
          <div
            className={`transition-all duration-700 ease-out overflow-hidden ${
              isPulled
                ? "opacity-100 max-h-[800px] translate-y-0"
                : "opacity-0 max-h-0 translate-y-8"
            }`}
          >
            <div className="space-y-6 text-sm sm:text-base md:text-lg text-zinc-300 leading-loose tracking-wide font-normal max-w-2xl mx-auto text-left border-l-2 border-white/20 pl-6 my-4">
              <p>
                I am a second-year engineering undergraduate exploring the field
                of Computer Science with an application-based approach and
                continuous problem-solving.
              </p>
              <p>
                With a strong command of Data Structures and Algorithms
                alongside the fundamentals of Web Development, I actively
                participate in open-source contributions as well. I am an
                observant, dedicated developer always looking for opportunities
                to upskill and excel.
              </p>
            </div>
          </div>

          {/* Subtle prompt indicator if not yet pulled */}
          {!isPulled && (
            <p className="text-xs md:text-sm text-zinc-500 text-center tracking-widest uppercase mt-4 animate-pulse">
              [ Pull the thread on the right to reveal story ]
            </p>
          )}
        </div>
      </section>
    </div>
  );
}





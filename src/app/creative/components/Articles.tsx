"use client";

import { useState } from "react";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

interface Article {
  id: number;
  title: string;
  subtitle: string;
  link: string;
}

const ARTICLES: Article[] = [
  {
    id: 1,
    title: "Dehumanisation — How NOT to be HUMAN?",
    subtitle:
      "Why Logic Outperforms Emotion in the Architecture of Life?",
    link: "https://medium.com/@rushilmishra7/dehumanisation-how-not-to-be-human-6ece2d4b4a77",
  },
  {
    id: 2,
    title: "The Art of Manipulation",
    subtitle:
      "Beyond morality: The structural engineering of making person A perform action B",
    link: "https://medium.com/@rushilmishra7/the-art-of-manipulation-2839123481ff",
  },
  {
    id: 3,
    title: "Freewill and The Freedom Gimmick — We Are NOT Free",
    subtitle:
      "When option-paralysis meets cause and effect: Deconstructing the myth of absolute freedom.",
    link: "https://medium.com/@rushilmishra7/freewill-and-the-freedom-gimmick-we-are-not-free-d0573125a93c",
  },
  {
    id: 4,
    title: "Heretic (2024) — Why Does Religion Exists?",
    subtitle:
      "From Monopoly boards to manufactured free will: what a 111-minute thriller teaches us about the mechanics of faith?",
    link: "https://medium.com/@rushilmishra7/heretic-2024-why-does-religion-exists-729afe01ec51",
  },
  {
    id: 5,
    title: "The Biggest Misconception — I",
    subtitle:
      "Deconstructing the ego and identity...",
    link: "https://medium.com/@rushilmishra7/the-biggest-misconception-i-e0443eb0331c",
  },
  {
    id: 6,
    title: "Understanding Humans — From Computers, Physiology and Psychology",
    subtitle:
      "Deconstructing human intelligence into tiny pixels: Input, Processing and Output",
    link: "https://medium.com/@rushilmishra7/understanding-humans-from-computers-physiology-and-psychology-0612fec57382",
  },
  {
    id: 7,
    title: "Knowledge is First a Problem, and Later the Solution",
    subtitle:
      "Ever wondered why young toddlers are never seen with stressful faces as adults do?",
    link: "https://medium.com/@rushilmishra7/knowledge-is-first-a-problem-and-later-the-solution-5602fba30581",
  },
];

export default function Articles() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + ARTICLES.length) % ARTICLES.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % ARTICLES.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const distance = touchStart - touchEnd;
    if (distance > 50) {
      handleNext();
    } else if (distance < -50) {
      handlePrev();
    }
    setTouchStart(null);
  };

  const getCardLayout = (index: number) => {
    let diff = index - currentIndex;
    const total = ARTICLES.length;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    const isNear = Math.abs(diff) <= 2;

    let translateX = "0px";
    let scale = 1;
    let opacity = 0;
    let zIndex = 0;
    let pointerEvents: "auto" | "none" = "none";

    if (diff === 0) {
      translateX = "0px";
      scale = 1;
      opacity = 1;
      zIndex = 30;
      pointerEvents = "auto";
    } else if (diff === -1) {
      translateX = "-min(420px, 85vw)";
      scale = 0.88;
      opacity = 0.35;
      zIndex = 20;
      pointerEvents = "auto";
    } else if (diff === 1) {
      translateX = "min(420px, 85vw)";
      scale = 0.88;
      opacity = 0.35;
      zIndex = 20;
      pointerEvents = "auto";
    } else if (diff === -2) {
      translateX = "-min(800px, 160vw)";
      scale = 0.75;
      opacity = 0;
      zIndex = 10;
    } else if (diff === 2) {
      translateX = "min(800px, 160vw)";
      scale = 0.75;
      opacity = 0;
      zIndex = 10;
    } else {
      translateX = diff > 0 ? "900px" : "-900px";
      scale = 0.7;
      opacity = 0;
      zIndex = 0;
    }

    return {
      diff,
      style: {
        transform: `translate3d(calc(-50% + ${translateX}), -50%, 0) scale(${scale})`,
        opacity,
        zIndex,
        pointerEvents,
        transition: isNear
          ? "transform 550ms cubic-bezier(0.22, 1, 0.36, 1), opacity 500ms ease, scale 550ms ease"
          : "none",
      },
    };
  };

  return (
    <section className="w-full bg-[#070707] py-24 px-4 overflow-hidden flex flex-col items-center select-none">
      {/* Title with Rise-Up Scroll Reveal */}
      <ScrollReveal className="w-full flex justify-center">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#fefbfb] text-center tracking-tight mb-16">
          Medium - Stories and Articles
        </h2>
      </ScrollReveal>

      {/* Infinite Carousel Stage with Rise-Up Scroll Reveal */}
      <ScrollReveal className="w-full flex justify-center">
        <div
          className="relative w-full max-w-6xl h-[320px] flex items-center justify-center my-6"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous article"
            className="absolute left-2 md:left-6 z-40 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer shadow-lg backdrop-blur-sm"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Cards Track Container */}
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden md:overflow-visible">
            {ARTICLES.map((article, index) => {
              const { diff, style } = getCardLayout(index);
              const isCenter = diff === 0;
              const isLeft = diff === -1;
              const isRight = diff === 1;

              if (isCenter) {
                return (
                  <Link
                    key={article.id}
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={style}
                    className="absolute top-1/2 left-1/2 flex flex-col justify-between w-[88vw] sm:w-[420px] md:w-[492px] h-[269px] rounded-[40px] bg-white text-black p-8 shadow-[0_12px_45px_rgba(255,255,255,0.18)] cursor-pointer hover:shadow-[0_16px_50px_rgba(255,255,255,0.28)]"
                  >
                    <h3 className="text-2xl md:text-3xl font-bold leading-snug line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-zinc-600 text-sm md:text-base text-center leading-relaxed mt-2 line-clamp-3">
                      {article.subtitle}
                    </p>
                    <div className="h-2" />
                  </Link>
                );
              }

              return (
                <div
                  key={article.id}
                  onClick={isLeft ? handlePrev : isRight ? handleNext : undefined}
                  style={style}
                  className={`absolute top-1/2 left-1/2 flex flex-col justify-between w-[88vw] sm:w-[380px] md:w-[460px] h-[240px] md:h-[269px] rounded-[40px] border border-white/10 p-8 select-none overflow-hidden ${
                    isLeft
                      ? "bg-gradient-to-l from-white/20 to-transparent cursor-pointer hover:opacity-50"
                      : isRight
                      ? "bg-gradient-to-r from-white/20 to-transparent cursor-pointer hover:opacity-50"
                      : "bg-white/5"
                  }`}
                >
                  <h3 className="text-xl md:text-2xl font-bold text-white line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-zinc-400 text-xs md:text-sm line-clamp-2">
                    {article.subtitle}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next article"
            className="absolute right-2 md:right-6 z-40 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer shadow-lg backdrop-blur-sm"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </ScrollReveal>

      {/* Explore Button with Rise-Up Scroll Reveal */}
      <ScrollReveal className="w-full flex justify-center">
        <Link
          href="https://medium.com/@rushilmishra7"
          target="_blank"
          rel="noopener noreferrer"
          className="w-[218px] h-[64px] rounded-[40px] bg-white text-black text-2xl font-bold flex items-center justify-center hover:bg-zinc-200 transition-colors shadow-lg cursor-pointer mt-12"
        >
          Explore
        </Link>
      </ScrollReveal>
    </section>
  );
}

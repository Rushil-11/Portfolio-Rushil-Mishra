"use client";

import { useState, useRef, useEffect } from "react";
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
  const [slideDirection, setSlideDirection] = useState<"idle" | "next" | "prev">("idle");
  const [isAnimating, setIsAnimating] = useState(false);
  const [stepWidth, setStepWidth] = useState(516);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const centerCardRef = useRef<HTMLDivElement>(null);

  // Measure card width + gap dynamically for responsive screen widths
  useEffect(() => {
    const updateStep = () => {
      if (centerCardRef.current) {
        setStepWidth(centerCardRef.current.offsetWidth + 24);
      }
    };
    updateStep();
    window.addEventListener("resize", updateStep);
    return () => window.removeEventListener("resize", updateStep);
  }, []);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setSlideDirection("next");

    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % ARTICLES.length);
      setSlideDirection("idle");
      setIsAnimating(false);
    }, 500);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setSlideDirection("prev");

    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + ARTICLES.length) % ARTICLES.length);
      setSlideDirection("idle");
      setIsAnimating(false);
    }, 500);
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

  // 5 slots arranged side-by-side in flex-row: [-2, -1, 0, 1, 2]
  const slots = [-2, -1, 0, 1, 2].map((offset) => {
    const articleIndex =
      (currentIndex + offset + ARTICLES.length * 10) % ARTICLES.length;
    return {
      offset,
      article: ARTICLES[articleIndex],
    };
  });

  const trackOffset =
    slideDirection === "next"
      ? -stepWidth
      : slideDirection === "prev"
      ? stepWidth
      : 0;

  return (
    <section className="w-full bg-[#070707] py-24 px-4 overflow-hidden flex flex-col items-center select-none">
      {/* 1. Heading with Rise-Up Scroll Reveal */}
      <ScrollReveal delay={0} className="w-full flex justify-center">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#fefbfb] text-center tracking-tight mb-16">
          Medium - Stories and Articles
        </h2>
      </ScrollReveal>

      {/* 2. Side-by-Side Sliding Stage with Rise-Up Scroll Reveal */}
      <ScrollReveal delay={150} className="w-full flex justify-center">
        <div
          className="relative w-full max-w-6xl flex items-center justify-center my-6 overflow-hidden md:overflow-visible"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous article"
            disabled={isAnimating}
            className="absolute left-2 md:left-6 z-40 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer shadow-lg backdrop-blur-sm disabled:opacity-50"
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

          {/* Cards Track: Flex Row Side-by-Side */}
          <div
            className="flex flex-row items-center justify-center gap-6"
            style={{
              transform: `translate3d(${trackOffset}px, 0, 0)`,
              transition:
                slideDirection === "idle"
                  ? "none"
                  : "transform 500ms cubic-bezier(0.25, 1, 0.5, 1)",
            }}
          >
            {slots.map(({ offset, article }) => {
              // Target state when sliding
              const isCenter =
                (slideDirection === "idle" && offset === 0) ||
                (slideDirection === "next" && offset === 1) ||
                (slideDirection === "prev" && offset === -1);

              const isLeft =
                (slideDirection === "idle" && offset === -1) ||
                (slideDirection === "next" && offset === 0) ||
                (slideDirection === "prev" && offset === -2);

              const isRight =
                (slideDirection === "idle" && offset === 1) ||
                (slideDirection === "next" && offset === 2) ||
                (slideDirection === "prev" && offset === 0);

              const isVisible = isCenter || isLeft || isRight;

              // Shared card content with identical typography and alignment
              const cardContent = (
                <>
                  <h3
                    className={`text-2xl md:text-3xl font-bold leading-snug line-clamp-2 transition-colors duration-500 ${
                      isCenter ? "text-black" : "text-white"
                    }`}
                  >
                    {article.title}
                  </h3>
                  <p
                    className={`text-sm md:text-base leading-relaxed mt-3 line-clamp-3 transition-colors duration-500 ${
                      isCenter ? "text-zinc-600" : "text-zinc-300"
                    }`}
                  >
                    {article.subtitle}
                  </p>
                  <div className="h-2" />
                </>
              );

              // Center card: opens medium link
              if (offset === 0) {
                return (
                  <div
                    key={`${article.id}-${offset}`}
                    ref={centerCardRef}
                    className="flex-shrink-0"
                  >
                    <Link
                      href={article.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex-shrink-0 flex flex-col justify-between w-[85vw] sm:w-[420px] md:w-[492px] h-[269px] rounded-[40px] p-8 border transition-all duration-500 ease-out ${
                        isCenter
                          ? "bg-white text-black border-transparent shadow-[0_12px_45px_rgba(255,255,255,0.18)] opacity-100 z-20 cursor-pointer hover:shadow-[0_16px_50px_rgba(255,255,255,0.28)]"
                          : "bg-[#1f1f1f] text-white border-white/10 opacity-50 hover:opacity-75 z-10 cursor-pointer"
                      }`}
                    >
                      {cardContent}
                    </Link>
                  </div>
                );
              }

              // Side / outer cards
              return (
                <div
                  key={`${article.id}-${offset}`}
                  onClick={() => {
                    if (offset === -1) handlePrev();
                    if (offset === 1) handleNext();
                  }}
                  className={`flex-shrink-0 flex flex-col justify-between w-[85vw] sm:w-[420px] md:w-[492px] h-[269px] rounded-[40px] p-8 border select-none overflow-hidden transition-all duration-500 ease-out ${
                    !isVisible
                      ? "opacity-0 pointer-events-none border-transparent"
                      : isCenter
                      ? "bg-white text-black border-transparent shadow-[0_12px_45px_rgba(255,255,255,0.18)] opacity-100 z-20 cursor-pointer"
                      : "bg-[#1f1f1f] text-white border-white/10 opacity-50 hover:opacity-75 z-10 cursor-pointer"
                  }`}
                >
                  {cardContent}
                </div>
              );
            })}
          </div>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next article"
            disabled={isAnimating}
            className="absolute right-2 md:right-6 z-40 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer shadow-lg backdrop-blur-sm disabled:opacity-50"
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

      {/* 3. Explore Button with Rise-Up Scroll Reveal */}
      <ScrollReveal delay={300} className="w-full flex justify-center">
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

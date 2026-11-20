"use client";

import { useState } from "react";

interface ScoreProps {
  initialLeetCode?: {
    totalSolved?: number;
    easySolved?: number;
    mediumSolved?: number;
    hardSolved?: number;
  } | null;
  initialCodeforces?: {
    rating?: number;
    contests?: number;
    attempted?: number;
  } | null;
  initialCodeChef?: {
    rating?: number;
    contests?: number;
    attempted?: number;
  } | null;
}

export default function Score({
  initialLeetCode,
  initialCodeforces,
  initialCodeChef,
}: ScoreProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const cards = [
    {
      platform: "LeetCode",
      mainNumber: initialLeetCode?.totalSolved ?? 0,
      stats: [
        { label: "Easy:", value: initialLeetCode?.easySolved ?? 0 },
        { label: "Medium:", value: initialLeetCode?.mediumSolved ?? 0 },
        { label: "Hard:", value: initialLeetCode?.hardSolved ?? 0 },
      ],
    },
    {
      platform: "Codeforces",
      mainNumber: initialCodeforces?.rating ?? 0,
      stats: [
        { label: "Contests:", value: initialCodeforces?.contests ?? 0 },
        { label: "Attempted:", value: initialCodeforces?.attempted ?? 0 },
      ],
    },
    {
      platform: "CodeChef",
      mainNumber: initialCodeChef?.rating ?? 0,
      stats: [
        { label: "Contests:", value: initialCodeChef?.contests ?? 0 },
        { label: "Attempted:", value: initialCodeChef?.attempted ?? 0 },
      ],
    },
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const currentCard = cards[currentIndex];

  return (
    <div className="flex justify-center items-center w-full lg:w-1/2 p-4">
      {/* Neubrutalist Card Container */}
      <div className="relative w-full max-w-[460px] aspect-[4/5] bg-white border-2 border-black rounded-[40px] shadow-[16px_16px_0px_#000] p-8 flex flex-col items-center justify-between transition-all duration-300">
        
        {/* Top: Big Solved/Rating Count & Platform Name */}
        <div className="text-center mt-2">
          <h2 className="text-7xl lg:text-9xl font-bold tracking-tight text-black transition-all">
            {currentCard.mainNumber}
          </h2>
          <h3 className="text-xl lg:text-5xl font-semibold tracking-wide text-black mt-2">
            {currentCard.platform}
          </h3>
        </div>

        {/* Middle: Left Arrow, Stats Breakdown, Right Arrow */}
        <div className="w-full flex items-center justify-between px-2 my-auto">
          {/* Prev Arrow */}
          <button
            type="button"
            onClick={handlePrev}
            className="p-2 hover:opacity-60 transition-opacity cursor-pointer"
            aria-label="Previous platform"
          >
            <svg width="18" height="32" viewBox="0 0 23 41" fill="none" className="block">
              <path
                d="M22.2685 36.7323C22.5006 36.9645 22.6848 37.2401 22.8105 37.5435C22.9361 37.8468 23.0008 38.172 23.0008 38.5003C23.0008 38.8287 22.9361 39.1538 22.8105 39.4572C22.6848 39.7605 22.5006 40.0362 22.2685 40.2683C22.0363 40.5005 21.7607 40.6847 21.4573 40.8103C21.1539 40.936 20.8288 41.0007 20.5005 41.0007C20.1721 41.0007 19.847 40.936 19.5436 40.8103C19.2403 40.6847 18.9646 40.5005 18.7325 40.2683L0.732466 22.2683C0.500249 22.0362 0.316041 21.7605 0.190363 21.4572C0.0646849 21.1538 0 20.8287 0 20.5003C0 20.172 0.0646849 19.8468 0.190363 19.5435C0.316041 19.2401 0.500249 18.9645 0.732466 18.7323L18.7325 0.73233C19.2014 0.263428 19.8373 0 20.5005 0C21.1636 0 21.7996 0.263428 22.2685 0.73233C22.7374 1.20123 23.0008 1.8372 23.0008 2.50033C23.0008 3.16346 22.7374 3.79943 22.2685 4.26833L6.03547 20.5003L22.2685 36.7323Z"
                fill="#222222"
              />
            </svg>
          </button>

          {/* Breakdown Stats */}
          <div className="flex flex-col gap-3 text-3xl lg:text-3xl font-medium text-black w-48 min-h-[110px] justify-center">
            {currentCard.stats.map((stat) => (
              <div key={stat.label} className="flex justify-between">
                <span>{stat.label}</span>
                <span className="font-bold">{stat.value}</span>
              </div>
            ))}
          </div>

          {/* Next Arrow */}
          <button
            type="button"
            onClick={handleNext}
            className="p-2 hover:opacity-60 transition-opacity cursor-pointer scale-x-[-1]"
            aria-label="Next platform"
          >
            <svg width="18" height="32" viewBox="0 0 23 41" fill="none" className="block">
              <path
                d="M22.2685 36.7323C22.5006 36.9645 22.6848 37.2401 22.8105 37.5435C22.9361 37.8468 23.0008 38.172 23.0008 38.5003C23.0008 38.8287 22.9361 39.1538 22.8105 39.4572C22.6848 39.7605 22.5006 40.0362 22.2685 40.2683C22.0363 40.5005 21.7607 40.6847 21.4573 40.8103C21.1539 40.936 20.8288 41.0007 20.5005 41.0007C20.1721 41.0007 19.847 40.936 19.5436 40.8103C19.2403 40.6847 18.9646 40.5005 18.7325 40.2683L0.732466 22.2683C0.500249 22.0362 0.316041 21.7605 0.190363 21.4572C0.0646849 21.1538 0 20.8287 0 20.5003C0 20.172 0.0646849 19.8468 0.190363 19.5435C0.316041 19.2401 0.500249 18.9645 0.732466 18.7323L18.7325 0.73233C19.2014 0.263428 19.8373 0 20.5005 0C21.1636 0 21.7996 0.263428 22.2685 0.73233C22.7374 1.20123 23.0008 1.8372 23.0008 2.50033C23.0008 3.16346 22.7374 3.79943 22.2685 4.26833L6.03547 20.5003L22.2685 36.7323Z"
                fill="#222222"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";

interface PlatformInfo {
  ratings: number[];
  currentRating: number;
  maxRated: number;
  ranking: string;
  url: string;
  maxScale: number;
}

interface GraphProps {
  initialData?: {
    LeetCode?: {
      ratings?: number[];
      rating?: number;
      maxRating?: number;
      ranking?: string;
    } | null;
    Codeforces?: {
      ratings?: number[];
      rating?: number;
      maxRating?: number;
      ranking?: string;
    } | null;
    CodeChef?: {
      ratings?: number[];
      rating?: number;
      maxRating?: number;
      ranking?: string;
    } | null;
  };
}

export default function Graph({ initialData }: GraphProps) {
  const [selectedPlatform, setSelectedPlatform] = useState<"LeetCode" | "Codeforces" | "CodeChef">("LeetCode");
  const [hoveredPoint, setHoveredPoint] = useState<{
    index: number;
    rating: number;
    x: number;
    y: number;
  } | null>(null);

  const leetcodeRatings = initialData?.LeetCode?.ratings ?? [];
  const codeforcesRatings = initialData?.Codeforces?.ratings ?? [];
  const codechefRatings = initialData?.CodeChef?.ratings ?? [];

  const getDynamicScale = (ratingsList: number[], fallback: number) => {
    const peak = ratingsList.length > 0 ? Math.max(...ratingsList) : fallback;
    return Math.max(Math.ceil((peak + 150) / 200) * 200, 500);
  };

  const platforms: Record<"LeetCode" | "Codeforces" | "CodeChef", PlatformInfo> = {
    LeetCode: {
      ratings: leetcodeRatings,
      currentRating: initialData?.LeetCode?.rating ?? 0,
      maxRated: initialData?.LeetCode?.maxRating ?? 0,
      ranking: initialData?.LeetCode?.ranking ?? "Active",
      url: "https://leetcode.com/u/Rushil_211/",
      maxScale: getDynamicScale(leetcodeRatings, initialData?.LeetCode?.rating ?? 1500),
    },
    Codeforces: {
      ratings: codeforcesRatings,
      currentRating: initialData?.Codeforces?.rating ?? 0,
      maxRated: initialData?.Codeforces?.maxRating ?? 0,
      ranking: initialData?.Codeforces?.ranking ?? "unrated",
      url: "https://codeforces.com/profile/Rushil_211",
      maxScale: getDynamicScale(codeforcesRatings, initialData?.Codeforces?.rating ?? 1200),
    },
    CodeChef: {
      ratings: codechefRatings,
      currentRating: initialData?.CodeChef?.rating ?? 0,
      maxRated: initialData?.CodeChef?.maxRating ?? 0,
      ranking: initialData?.CodeChef?.ranking ?? "Rated",
      url: "https://www.codechef.com/users/rushil_211",
      maxScale: getDynamicScale(codechefRatings, initialData?.CodeChef?.rating ?? 1500),
    },
  };

  const currentData = platforms[selectedPlatform];
  const ratings = currentData.ratings;
  const maxScale = currentData.maxScale;

  // Chart boundary coordinates
  const originX = 65;
  const originY = 360;
  const axisEndX = 645;
  const axisTopY = 40;

  const plotStartX = 95;
  const plotEndX = 620;

  // Compute points with Origin as Zero
  const points = ratings.map((rating, index) => {
    const x =
      ratings.length > 1
        ? plotStartX + (index / (ratings.length - 1)) * (plotEndX - plotStartX)
        : (plotStartX + plotEndX) / 2;
    const y = originY - (rating / maxScale) * (originY - axisTopY);
    return { index, rating, x, y };
  });

  const pathD = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(" ");

  // Gridline steps
  const gridSteps = 4;
  const gridlines = Array.from({ length: gridSteps }, (_, i) => {
    const val = Math.round(((i + 1) * maxScale) / gridSteps);
    const y = originY - (val / maxScale) * (originY - axisTopY);
    return { val, y };
  });

  const currentRating = currentData.currentRating;
  const maxRated = currentData.maxRated;

  return (
    <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-4">
      {/* Platform Switcher Tabs (Styled like Navbar buttons) */}
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-4">
        {(["LeetCode", "Codeforces", "CodeChef"] as const).map((plat) => {
          const isActive = selectedPlatform === plat;
          return (
            <button
              key={plat}
              type="button"
              onClick={() => {
                setSelectedPlatform(plat);
                setHoveredPoint(null);
              }}
              className={`px-5 py-2 md:px-6 md:py-2.5 rounded-full text-base md:text-xl font-normal transition-all cursor-pointer ${
                isActive
                  ? "bg-white text-black"
                  : "bg-black text-white hover:bg-neutral-800"
              }`}
            >
              {plat}
            </button>
          );
        })}
      </div>

      {/* Enlarged Graph Container */}
      <div className="relative w-full max-w-[640px]">
        <svg
          viewBox="0 0 680 405"
          className="w-full h-auto overflow-visible select-none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Horizontal Gridlines & Rating Labels */}
          {gridlines.map(({ val, y }) => (
            <g key={val}>
              <line
                x1={originX}
                y1={y}
                x2={axisEndX}
                y2={y}
                stroke="#e4e4e7"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
              <text
                x={originX - 10}
                y={y + 4}
                textAnchor="end"
                className="text-[12px] fill-zinc-400 font-sans font-medium"
              >
                {val}
              </text>
            </g>
          ))}

          {/* Rating Curve Line */}
          <path
            d={pathD}
            stroke="#000"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Axes */}
          <path
            d={`M ${originX} ${axisTopY} V ${originY} H ${axisEndX}`}
            stroke="#000"
            strokeWidth="5"
            strokeLinecap="round"
          />

          {/* Y-Axis Arrowhead */}
          <polygon
            points={`${originX},${axisTopY - 14} ${originX - 7},${axisTopY + 2} ${originX + 7},${axisTopY + 2}`}
            fill="#000"
          />

          {/* X-Axis Arrowhead */}
          <polygon
            points={`${axisEndX + 14},${originY} ${axisEndX - 2},${originY - 7} ${axisEndX - 2},${originY + 7}`}
            fill="#000"
          />

          {/* Axis Labels & Origin */}
          <text
            x={originX - 12}
            y={axisTopY - 12}
            textAnchor="end"
            className="text-[15px] fill-black font-bold font-sans tracking-wide"
          >
            Rating ↑
          </text>

          <text
            x={originX - 10}
            y={originY + 5}
            textAnchor="end"
            className="text-[13px] fill-zinc-500 font-bold font-sans"
          >
            0
          </text>

          <text
            x={axisEndX + 10}
            y={originY + 30}
            textAnchor="end"
            className="text-[15px] fill-black font-bold font-sans tracking-wide"
          >
            Contests →
          </text>

          {/* Interactive Data Points (Anti-flicker with stable hit areas) */}
          {points.map((p) => {
            const isHovered = hoveredPoint?.index === p.index;
            return (
              <g key={p.index} className="cursor-pointer">
                {/* Visual circle dot */}
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={isHovered ? 8 : 5}
                  fill={isHovered ? "#ffffff" : "#000000"}
                  stroke="#000"
                  strokeWidth={isHovered ? 3 : 0}
                  className="transition-all duration-150"
                />

                {/* Invisible large hit area to prevent hover flicker */}
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={22}
                  fill="transparent"
                  onMouseEnter={() => setHoveredPoint(p)}
                  onMouseLeave={() => setHoveredPoint(null)}
                />
              </g>
            );
          })}

          {/* Non-flickering Hover Rating Tooltip */}
          {hoveredPoint && (
            <g
              transform={`translate(${hoveredPoint.x}, ${hoveredPoint.y - 48})`}
              className="pointer-events-none transition-all duration-150"
            >
              <rect
                x="-45"
                y="0"
                width="90"
                height="32"
                rx="8"
                fill="#000000"
                className="shadow-lg"
              />
              <polygon points="0,38 -6,32 6,32" fill="#000000" />
              <text
                x="0"
                y="20"
                textAnchor="middle"
                className="text-[13px] fill-white font-bold font-sans"
              >
                ★ {hoveredPoint.rating}
              </text>
            </g>
          )}
        </svg>

        {/* Text Stats Underneath (Reduced gap with graph) */}
        <div className="flex flex-col items-center text-center mt-1">
          <p className="text-lg md:text-xl font-semibold text-black">
            Rating: {currentRating}{" "}
            <span className="text-zinc-600 font-normal">(Max Rated {maxRated})</span>
          </p>
          <p className="text-base md:text-lg font-medium text-black mt-0.5">
            Ranking: {currentData.ranking}
          </p>

          {/* Action Buttons: More & Codolio (Increased Text Size) */}
          <div className="flex items-center gap-4 mt-5">
            <Link
              href={currentData.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-2.5 rounded-full bg-black text-white text-xl md:text-2xl font-bold hover:bg-zinc-800 transition-colors shadow-sm inline-block"
            >
              More
            </Link>
            <Link
              href="https://codolio.com/profile/Rushil_211"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-2.5 rounded-full bg-white text-black border-2 border-black text-xl md:text-2xl font-bold hover:bg-zinc-100 transition-colors shadow-[3px_3px_0px_#000] inline-block"
            >
              Codolio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

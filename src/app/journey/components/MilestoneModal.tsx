"use client";

import { useEffect } from "react";
import Image, { StaticImageData } from "next/image";

export interface MilestoneItem {
  id: string;
  title: string;
  text: string;
  detailedText?: string;
  image?: string | StaticImageData | null;
  hasCredential?: boolean;
}

interface MilestoneModalProps {
  milestone: MilestoneItem | null;
  onClose: () => void;
}

export default function MilestoneModal({
  milestone,
  onClose,
}: MilestoneModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (milestone) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [milestone, onClose]);

  if (!milestone) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
    >
      {/* Floating Modal Card */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-white text-black border-2 border-black rounded-[32px] md:rounded-[40px] shadow-[12px_12px_0px_#000] p-6 sm:p-8 md:p-10 flex flex-col md:flex-row gap-8 items-center max-h-[90vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 w-10 h-10 rounded-full border-2 border-black flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors cursor-pointer z-10"
        >
          <svg
            width="30"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Left Side: Proper Text */}
        <div className="w-full md:w-1/2 flex flex-col justify-between space-y-4">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-tight">
              {milestone.title}
            </h2>
          </div>

          <div className="space-y-3">
            <p className="text-sm md:text-base text-neutral-800 leading-relaxed whitespace-pre-line">
              {milestone.detailedText || milestone.text}
            </p>
          </div>
        </div>

        {/* Right Side: Image / Preview */}
        <div className="relative w-full md:w-1/2 aspect-[4/3] bg-neutral-100 border-2 border-black rounded-[24px] overflow-hidden flex flex-col items-center justify-center p-6 text-center shadow-[4px_4px_0px_#000]">
          {milestone.image ? (
            <Image
              src={milestone.image}
              alt={milestone.title}
              fill
              className="object-cover rounded-[18px]"
            />
          ) : (
            <div className="flex flex-col items-center justify-center space-y-2 text-center">
              <p className="text-xl md:text-2xl font-bold font-mono tracking-wider uppercase text-black">
                [ Preview ]
              </p>
              <p className="text-xs md:text-sm text-neutral-500 font-mono max-w-[220px]">
                Event Photograph & Media
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

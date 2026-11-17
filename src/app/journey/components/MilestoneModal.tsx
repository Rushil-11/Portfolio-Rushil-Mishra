"use client";

import { useEffect } from "react";

export interface MilestoneItem {
  id: string;
  title: string;
  text: string;
  detailedText?: string;
  image?: string | null;
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
            width="18"
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
            <span className="inline-block px-3 py-1 bg-black text-white text-xs font-mono font-bold tracking-wider rounded-sm mb-3">
              MILESTONE {milestone.id}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-tight">
              {milestone.title}
            </h2>
          </div>

          <div className="space-y-3">
            <p className="text-sm md:text-base text-neutral-800 leading-relaxed">
              {milestone.text}
            </p>
            {milestone.detailedText && (
              <p className="text-xs md:text-sm text-neutral-600 leading-relaxed border-l-2 border-black pl-3 py-1">
                {milestone.detailedText}
              </p>
            )}
          </div>

          {milestone.hasCredential && (
            <div className="pt-2">
              <span className="inline-block text-xs font-mono font-semibold px-2.5 py-1 border border-black bg-neutral-100 text-black rounded-sm shadow-[2px_2px_0px_#000]">
                Credential Verified ↗
              </span>
            </div>
          )}
        </div>

        {/* Right Side: Image Placeholder / Preview */}
        <div className="w-full md:w-1/2 aspect-[4/3] bg-neutral-100 border-2 border-black rounded-[24px] overflow-hidden flex flex-col items-center justify-center p-6 text-center shadow-[4px_4px_0px_#000]">
          {milestone.image ? (
            <img
              src={milestone.image}
              alt={milestone.title}
              className="w-full h-full object-cover rounded-[18px]"
            />
          ) : (
            <div className="flex flex-col items-center justify-center space-y-3 text-neutral-500">
              <div className="w-16 h-16 rounded-2xl border-2 border-dashed border-neutral-400 flex items-center justify-center">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
              </div>
              <p className="text-xs font-mono tracking-wider font-semibold uppercase text-neutral-600">
                [ Image Preview ]
              </p>
              <p className="text-[11px] text-neutral-400 max-w-[200px]">
                Asset placeholder will be replaced with event photograph
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

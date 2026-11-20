"use client";

import ScrollReveal from "@/components/ScrollReveal";
import { MilestoneItem } from "./MilestoneModal";
import img4 from "../images/img4.jpeg";
import img5 from "../images/img5.jpeg";

interface LowerProps {
  onSelectMilestone?: (item: MilestoneItem) => void;
}

export default function Lower({ onSelectMilestone }: LowerProps) {
  const cards: (MilestoneItem & {
    side: "left" | "right";
    isIncoming?: boolean;
  })[] = [
      {
        id: "04",
        title: "Codechef 2 Star",
        side: "right",
        text: "Conquered my first major competitive programming milestone. A validation of algorithmic discipline, contest composure, and consistent problem-solving progress.",
        detailedText:
          "After 10+ contests and a constant pace in CP, witnessing my peers getting a green tag on their profiles, making their first LinkedIn Post was giving a sense of FOMO. But still, with consistent efforts, many hidden test cases failure, I got to hit the bar for getting into Div-3 on Codechef. This was the first breakthrough which made the coming journey of DSA feel like an easy piece.",
        isIncoming: false,
        image: img5,
      },
      {
        id: "05",
        title: "Smart India Hackathon (SIH)",
        side: "left",
        text: "Competed in the internal hackathon, architecting scalable solutions and navigating problem breakdowns to tackle large-scale practical constraints.",
        detailedText:
          "Internal hackathon competition architecting scalable systems and tackling constraint-heavy real-world problem statements.",
        isIncoming: false,
        image: img4,
      },
      {
        id: "06",
        title: "[06 // Incoming]",
        side: "right",
        text: "More exciting milestones are coming...",
        isIncoming: true,
        image: null,
      },
    ];

  return (
    <section className="relative w-full min-h-screen bg-black text-white py-20 md:py-28 px-4 sm:px-6 md:px-12 flex flex-col justify-center overflow-hidden">
      {/* Central Spine extending full screen-height */}
      <div
        aria-hidden="true"
        className="absolute top-0 bottom-0 left-6 md:left-1/2 -translate-x-1/2 w-[3px] bg-white pointer-events-none"
      />

      <div className="max-w-5xl mx-auto relative w-full">
        {/* Milestone Cards */}
        <div className="flex flex-col gap-16 md:gap-24">
          {cards.map((card) => {
            const isLeft = card.side === "left";
            const isClickable = !card.isIncoming;

            return (
              <div
                key={card.id}
                className={`relative flex items-center w-full ${isLeft ? "md:justify-start" : "md:justify-end"
                  }`}
              >
                {/* 90-Degree Circuit Branch Connector (Desktop) */}
                <div
                  aria-hidden="true"
                  className={`hidden md:block absolute top-1/2 -translate-y-1/2 h-[3px] bg-white ${isLeft
                    ? "left-[calc(50%-48px)] w-[48px]"
                    : "right-[calc(50%-48px)] w-[48px]"
                    }`}
                >
                  <span
                    className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-2 border-black ${isLeft ? "right-[-6px]" : "left-[-6px]"
                      }`}
                  />
                </div>

                {/* 90-Degree Circuit Branch Connector (Mobile) */}
                <div
                  aria-hidden="true"
                  className="md:hidden absolute left-6 top-1/2 -translate-y-1/2 w-8 h-[3px] bg-white"
                >
                  <span className="absolute left-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-2 border-black" />
                </div>

                {/* Card Container wrapped in ScrollReveal */}
                <div className="w-full pl-12 md:pl-0 md:w-[calc(50%-48px)]">
                  <ScrollReveal>
                    <div
                      onClick={() => {
                        if (isClickable) onSelectMilestone?.(card);
                      }}
                      className={`relative bg-black border-2 border-white rounded-[28px] md:rounded-[36px] shadow-[6px_6px_0px_#fff] p-6 md:p-8 transition-all duration-200 ${isClickable
                        ? "hover:-translate-y-1.5 hover:shadow-[8px_8px_0px_#fff] cursor-pointer group"
                        : "cursor-default"
                        }`}
                    >
                      {/* Card Header / Identifier */}
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white leading-snug">
                          {card.title}
                        </h3>
                      </div>

                      {/* Card Body */}
                      <p className="text-sm md:text-base text-neutral-300 leading-relaxed font-normal">
                        {card.text}
                        {card.isIncoming && (
                          <span
                            aria-hidden="true"
                            className="inline-block font-mono font-bold text-white animate-pulse ml-1.5 select-none"
                          >
                            |
                          </span>
                        )}
                      </p>
                    </div>
                  </ScrollReveal>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

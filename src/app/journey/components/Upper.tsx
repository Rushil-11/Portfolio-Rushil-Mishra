"use client";

import ScrollReveal from "@/components/ScrollReveal";
import { MilestoneItem } from "./MilestoneModal";
import img1 from "../images/img1.jpeg";
import img2 from "../images/img2.jpeg";
import img3 from "../images/img3.jpeg";

interface UpperProps {
  onSelectMilestone?: (item: MilestoneItem) => void;
}

export default function Upper({ onSelectMilestone }: UpperProps) {
  const cards: (MilestoneItem & { side: "left" | "right" })[] = [
    {
      id: "01",
      title: "IEEE Debate",
      side: "left",
      text: "This was the first event I formally participated in. Proving the point of AI replacing the modern-day teachers, secured second position in the competition.",
      detailedText:
        "IEEE Debate was my first exposure towards the College activities where participating with a peer, I got the opportunity to argue on the topic 'Will Artificial Intelligence replace teachers?'\n\nMy take was for the notion, arguing how multi-modal systems for emotional sensing, algorithmic approach and large amount of dataset can enable in future a machine which can replace human teachers in an efficient manner. The rebuttals were questioning my position's strength where I countered with the fact of algorithmic approach. Finally, after the round ended, I secured the runner up position which gave my participation a fruitful conclusion.",
      image: img1,
    },
    {
      id: "02",
      title: "TEDx Debate and GD",
      side: "right",
      text: "This was the second opportunity where I got to discuss and oppose the utility of democracy and later in debate, presented the point of privacy.",
      detailedText:
        "Our college hosted a TEDx event in the campus, inviting learned and experienced speakers in the campus for enlightening the students. Prevailing to this, a Group Discussion (Round-1) and Debate (Round-2) was organised. Leading a group of four, we got the opportunity to discuss a social topic, which is the utility of democracy in today's context. And surprisingly, I was sitting prepared with the same topic! Then what? I presented the POV exploring the disadvantages of democracy and our efforts helped our group to qualify for the Debate. The debate happened on several different topics giving us an inspiring experience.",
      image: img2,
    },
    {
      id: "03",
      title: "Technex Hackathon",
      side: "left",
      text: "Participated in this national-level hackathon sprint. Focused on rapid solution engineering, team execution, and shipping functional software within a tight competitive window.",
      detailedText:
        "This was my first inter-college Hackathon. Recommended by my senior, a team of first year, no experience with fancy terminologies like machine learning, scikit learn and many more, we jumped with the enthusiasm  of participation in the mania of thorough experts. The experience in the hackathon taught us a lot of things and primarily one thing - 'Build me a XYZ app or software' is the worst way to use AI agents to code something and...most importantly, the knowledge of the respective tech is needed to have a coding agent working.",
      image: img3,
    },
  ];

  return (
    <section className="relative w-full min-h-screen bg-white text-black mt-20 py-20 md:py-28 px-4 sm:px-6 md:px-12 flex flex-col justify-center overflow-hidden">
      {/* Central Spine extending full screen-height */}
      <div
        aria-hidden="true"
        className="absolute top-0 bottom-0 left-6 md:left-1/2 -translate-x-1/2 w-[3px] bg-black pointer-events-none"
      />

      <div className="max-w-5xl mx-auto relative w-full">
        {/* Milestone Cards */}
        <div className="flex flex-col gap-16 md:gap-24">
          {cards.map((card) => {
            const isLeft = card.side === "left";

            return (
              <div
                key={card.id}
                className={`relative flex items-center w-full ${
                  isLeft ? "md:justify-start" : "md:justify-end"
                }`}
              >
                {/* 90-Degree Circuit Branch Connector (Desktop) */}
                <div
                  aria-hidden="true"
                  className={`hidden md:block absolute top-1/2 -translate-y-1/2 h-[3px] bg-black ${
                    isLeft
                      ? "left-[calc(50%-48px)] w-[48px]"
                      : "right-[calc(50%-48px)] w-[48px]"
                  }`}
                >
                  <span
                    className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-black border-2 border-white ${
                      isLeft ? "right-[-6px]" : "left-[-6px]"
                    }`}
                  />
                </div>

                {/* 90-Degree Circuit Branch Connector (Mobile) */}
                <div
                  aria-hidden="true"
                  className="md:hidden absolute left-6 top-1/2 -translate-y-1/2 w-8 h-[3px] bg-black"
                >
                  <span className="absolute left-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-black border-2 border-white" />
                </div>

                {/* Card Container wrapped in ScrollReveal */}
                <div className="w-full pl-12 md:pl-0 md:w-[calc(50%-48px)]">
                  <ScrollReveal>
                    <div
                      onClick={() => onSelectMilestone?.(card)}
                      className="relative bg-white border-2 border-black rounded-[28px] md:rounded-[36px] shadow-[6px_6px_0px_#000] p-6 md:p-8 transition-all duration-200 hover:-translate-y-1.5 hover:shadow-[8px_8px_0px_#000] cursor-pointer group"
                    >
                      {/* Card Header / Identifier */}
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl md:text-2xl font-bold tracking-tight text-black leading-snug">
                          {card.title}
                        </h3>
                      </div>

                      {/* Card Body */}
                      <p className="text-sm md:text-base text-neutral-800 leading-relaxed font-normal">
                        {card.text}
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

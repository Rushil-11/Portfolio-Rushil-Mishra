import ScrollReveal from "@/components/ScrollReveal";

export default function Upper() {
  const cards = [
    {
      id: "01",
      title: "IEEE Technical Debate",
      side: "left",
      text: "This was the first event I formally participated in. Proving the point of AI replacing the modern-day teachers, secured second position in the competition.",
      hasCredential: false,
    },
    {
      id: "02",
      title: "TEDx Debate and Group Discussion",
      side: "right",
      text: "This was the second opportunity where I got to discuss and oppose the utility of democracy and later in debate, presented the point of privacy.",
      hasCredential: true,
    },
    {
      id: "03",
      title: "Technex — IIT BHU (March 2026)",
      side: "left",
      text: "Participated in this national-level hackathon sprint. Focused on rapid solution engineering, team execution, and shipping functional software within a tight competitive window.",
      hasCredential: true,
    },
  ];

  return (
    <section className="relative w-full min-h-screen bg-white text-black py-20 md:py-28 px-4 sm:px-6 md:px-12 flex flex-col justify-center overflow-hidden">
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
                  {/* Circuit Node Dot on Spine */}
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
                    <div className="relative bg-white border-2 border-black rounded-[28px] md:rounded-[36px] shadow-[6px_6px_0px_#000] p-6 md:p-8 transition-transform hover:-translate-y-1 duration-200">
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

                      {/* Credential Marker (Pure CSS Data Depiction, No Links) */}
                      {card.hasCredential && (
                        <div className="mt-5 flex justify-end">
                          <span className="text-xs font-mono tracking-wider font-semibold px-2.5 py-1 border border-black bg-black text-white rounded-sm select-none shadow-[2px_2px_0px_#888]">
                            [ Credential ↗ ]
                          </span>
                        </div>
                      )}
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

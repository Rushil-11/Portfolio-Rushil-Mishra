"use client";

import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

export default function Projects() {
  const projects = [
    {
      title: "Contact Manager",
      description:
        "An object-oriented management system built to organize, search, and securely handle contacts.",
      link: "https://github.com/Rushil-11/Smart-Contact-Manager-Project---Using-Object-Oriented-Programming",
    },
    {
      title: "PyClimaExplorer",
      description:
        "Interactive climate and meteorological analytics platform processing live atmospheric data.",
      link: "https://github.com/Rushil-11/PyClimaExplorer",
    },
    {
      title: "Portfolio",
      description:
        "Personal portfolio web application showcasing engineering milestones, live competitive programming analytics, and creative writing.",
      link: "https://github.com/Rushil-11/Portfolio-Rushil-Mishra",
    },
  ];

  return (
    <section className="w-full bg-black py-24 px-6 lg:px-16 flex flex-col items-center">
      {/* Section Title with Rise-Up Reveal */}
      <ScrollReveal delay={0} className="w-full flex justify-center">
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white text-center tracking-tight mb-16">
          Projects
        </h2>
      </ScrollReveal>

      {/* 3 Projects Grid with Staggered Rise-Up Reveal */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl w-full">
        {projects.map((proj, idx) => (
          <ScrollReveal key={proj.title} delay={idx * 150} className="h-full">
            <Link
              href={proj.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block h-full bg-black border border-[#fdfcfc] rounded-[40px] p-8 shadow-[10px_10px_25px_10px_rgba(99,99,99,0.25)] flex flex-col justify-between min-h-[280px] hover:border-white transition-all duration-200 hover:-translate-y-1 group cursor-pointer"
            >
              <div>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  {proj.title}
                </h3>
                <p className="text-zinc-400 text-base leading-relaxed">
                  {proj.description}
                </p>
              </div>
            </Link>
          </ScrollReveal>
        ))}
      </div>

      {/* Bottom Subtitle with Rise-Up Reveal */}
      <ScrollReveal delay={200} className="w-full flex justify-center">
        <p className="text-3xl md:text-5xl lg:text-6xl font-semibold text-white text-center mt-20 tracking-wide">
          And More Loading Soon...
        </p>
      </ScrollReveal>
    </section>
  );
}

export default function Projects() {
  const projects = [
    {
      title: "Contact Manager",
      description: "An object-oriented management system built to organize, search, and securely handle contacts.",
      tech: ["C++", "File I/O", "OOP"],
    },
    {
      title: "PyClimaExplorer",
      description: "Interactive climate and meteorological analytics platform processing live atmospheric data.",
      tech: ["Python", "Analytics", "APIs"],
    },
    {
      title: "AlgoVisualizer",
      description: "Visual exploration tool demonstrating core graph algorithms, sorting, and dynamic programming.",
      tech: ["TypeScript", "Next.js", "Tailwind CSS"],
    },
  ];

  return (
    <section className="w-full bg-black py-24 px-6 lg:px-16 flex flex-col items-center">
      {/* Section Title */}
      <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white text-center tracking-tight mb-16">
        Projects
      </h2>

      {/* 3 Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl w-full">
        {projects.map((proj) => (
          <div
            key={proj.title}
            className="bg-black border border-[#fdfcfc] rounded-[40px] p-8 shadow-[10px_10px_25px_10px_rgba(99,99,99,0.25)] flex flex-col justify-between min-h-[305px] hover:border-white transition-colors"
          >
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {proj.title}
              </h3>
              <p className="text-zinc-400 text-base leading-relaxed">
                {proj.description}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 mt-6">
              {proj.tech.map((t) => (
                <span
                  key={t}
                  className="px-3.5 py-1 rounded-full text-xs font-medium bg-zinc-900 text-zinc-300 border border-zinc-700"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Subtitle */}
      <p className="text-3xl md:text-5xl lg:text-6xl font-semibold text-white text-center mt-20 tracking-wide">
        And More Loading Soon...
      </p>
    </section>
  );
}

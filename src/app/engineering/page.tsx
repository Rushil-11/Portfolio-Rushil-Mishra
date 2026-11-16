import Score from "./components/Score";
import Graph from "./components/Graph";
import Projects from "./components/Projects";
import { fetchLeetCode, fetchCodeforces, fetchCodeChef } from "./lib/api";

// Force live server-side execution on every request (no stale cache)
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Engineering() {
  const [leetcodeData, codeforcesData, codechefData] = await Promise.all([
    fetchLeetCode("Rushil_211"),
    fetchCodeforces("Rushil_211"),
    fetchCodeChef("rushil_211"),
  ]);

  const graphData = {
    LeetCode: leetcodeData,
    Codeforces: codeforcesData,
    CodeChef: codechefData,
  };

  return (
    <main className="flex flex-col w-full bg-white">
      {/* Top Scoreboard & Graph Section */}
      <section className="min-h-[calc(100vh-5rem)] w-full flex flex-col lg:flex-row items-center justify-center px-6 lg:px-16 gap-8 pt-16 lg:pt-24 pb-16">
        <Score
          initialLeetCode={leetcodeData}
          initialCodeforces={codeforcesData}
          initialCodeChef={codechefData}
        />
        <Graph initialData={graphData} />
      </section>

      {/* Projects Section (Figma Desktop - 4) */}
      <Projects />
    </main>
  );
}

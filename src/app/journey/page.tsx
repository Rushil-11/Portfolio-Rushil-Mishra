import Upper from "./components/Upper";
import Lower from "./components/lower";

export const metadata = {
  title: "Journey - Rushil Mishra",
  description: "Chronological timeline of engineering college milestones and achievements.",
};

export default function JourneyPage() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Top half / White section (first three milestones) */}
      <Upper />

      {/* Bottom half / Black section (remaining milestones) */}
      <Lower />
    </div>
  );
}

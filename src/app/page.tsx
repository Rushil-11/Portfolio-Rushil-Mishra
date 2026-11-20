import Hero from "./components/Hero";
import Intro from "./components/Intro";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <Intro />
    </div>
  );
}

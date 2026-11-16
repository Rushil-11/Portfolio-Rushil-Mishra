import Display from "./Display";
import Articles from "./components/Articles";

export default function Creative() {
  return (
    <main className="flex flex-col w-full">
      {/* Artwork Bubbles Showcase (Desktop - 5) */}
      <section className="relative flex mt-10 bg-white min-h-screen w-full justify-center overflow-hidden">
        <h2 className="flex absolute text-4xl w-60 text-center top-85 font-bold">
          Designing and Creative Work
        </h2>
        <Display />
      </section>

      {/* Medium Articles Slider (Desktop - 6) */}
      <Articles />
    </main>
  );
}

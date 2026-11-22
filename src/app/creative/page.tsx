import Display from "./Display";
import Articles from "./components/Articles";

export default function Creative() {
  return (
    <main className="flex flex-col w-full">
      {/* Artwork Bubbles Showcase (Desktop - 5) */}
      <section className="relative flex mt-6 bg-white min-h-screen w-full justify-center overflow-hidden">
        <h2 className="hidden lg:flex absolute text-xl lg:text-3xl text-center w-60 top-85 font-bold">
          Designing <br />and Creative Work
        </h2>
        <Display />
      </section>

      {/* Medium Articles Slider (Desktop - 6) */}
      <Articles />
    </main>
  );
}

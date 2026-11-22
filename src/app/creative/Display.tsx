import Image from "next/image";
import img1 from "./images/1.png";
import img2 from "./images/2.png";
import img3 from "./images/3.png";
import img4 from "./images/4.jpeg";
import img5 from "./images/5.png";
import img6 from "./images/6.png";
import img7 from "./images/7.jpeg";
import img8 from "./images/8.png";
import img9 from "./images/9.jpeg";
import img10 from "./images/10.png";

export default function Display() {
  return (
    <>
      {/* Mobile & Tablet layout (< lg): 3 - 2 - [Text] - 2 - 3 */}
      <div className="lg:hidden flex flex-col items-center justify-center gap-6 sm:gap-8 md:gap-10 py-10 w-full max-w-3xl px-2 sm:px-4 z-10">
        {/* Row 1: 3 images with dynamic fluid gap */}
        <div className="w-full max-w-sm sm:max-w-lg md:max-w-2xl flex justify-evenly items-center gap-[2vw] sm:gap-[3vw] md:gap-[4vw]">
          <div className="group flex h-24 w-24 sm:h-32 sm:w-32 md:h-40 md:w-40 rounded-full overflow-hidden shadow-md cursor-pointer bg-zinc-900 relative">
            <Image
              src={img1}
              alt="Creative 1"
              fill
              className="object-cover opacity-50 group-hover:opacity-100 transition-opacity duration-300"
            />
          </div>
          <div className="group flex h-24 w-24 sm:h-32 sm:w-32 md:h-40 md:w-40 rounded-full overflow-hidden shadow-md cursor-pointer bg-stone-500 relative">
            <Image
              src={img2}
              alt="Creative 2"
              fill
              className="object-cover opacity-50 group-hover:opacity-100 transition-opacity duration-300"
            />
          </div>
          <div className="group flex h-24 w-24 sm:h-32 sm:w-32 md:h-40 md:w-40 rounded-full overflow-hidden shadow-sm cursor-pointer bg-slate-400 relative">
            <Image
              src={img3}
              alt="Creative 3"
              fill
              className="object-cover opacity-50 group-hover:opacity-100 transition-opacity duration-300"
            />
          </div>
        </div>

        {/* Row 2: 2 images with dynamic fluid gap */}
        <div className="w-full max-w-[260px] sm:max-w-xs md:max-w-md flex justify-evenly items-center gap-[4vw] sm:gap-[6vw] md:gap-[8vw]">
          <div className="group flex h-24 w-24 sm:h-36 sm:w-36 md:h-44 md:w-44 rounded-full overflow-hidden shadow-md cursor-pointer bg-cyan-700 relative">
            <Image
              src={img4}
              alt="Creative 4"
              fill
              className="object-cover opacity-50 group-hover:opacity-100 transition-opacity duration-300"
            />
          </div>
          <div className="group flex h-24 w-24 sm:h-36 sm:w-36 md:h-44 md:w-44 rounded-full overflow-hidden shadow-md cursor-pointer bg-indigo-700 relative">
            <Image
              src={img5}
              alt="Creative 5"
              fill
              className="object-cover opacity-50 group-hover:opacity-100 transition-opacity duration-300"
            />
          </div>
        </div>

        {/* Center Text between the rows */}
        <h2 className="text-xl sm:text-2xl md:text-3xl text-center text-black font-bold tracking-tight my-2">
          Designing <br />and Creative Work
        </h2>

        {/* Row 3: 2 images with dynamic fluid gap */}
        <div className="w-full max-w-[260px] sm:max-w-xs md:max-w-md flex justify-evenly items-center gap-[4vw] sm:gap-[6vw] md:gap-[8vw]">
          <div className="group flex h-24 w-24 sm:h-36 sm:w-36 md:h-44 md:w-44 rounded-full overflow-hidden shadow-md cursor-pointer bg-rose-700 relative">
            <Image
              src={img6}
              alt="Creative 6"
              fill
              className="object-cover opacity-50 group-hover:opacity-100 transition-opacity duration-300"
            />
          </div>
          <div className="group flex h-24 w-24 sm:h-36 sm:w-36 md:h-44 md:w-44 rounded-full overflow-hidden shadow-md cursor-pointer bg-stone-700 relative">
            <Image
              src={img7}
              alt="Creative 7"
              fill
              className="object-cover opacity-50 group-hover:opacity-100 transition-opacity duration-300"
            />
          </div>
        </div>

        {/* Row 4: 3 images with dynamic fluid gap */}
        <div className="w-full max-w-sm sm:max-w-lg md:max-w-2xl flex justify-evenly items-center gap-[2vw] sm:gap-[3vw] md:gap-[4vw]">
          <div className="group flex h-24 w-24 sm:h-32 sm:w-32 md:h-40 md:w-40 rounded-full overflow-hidden shadow-lg cursor-pointer bg-rose-900 relative">
            <Image
              src={img8}
              alt="Creative 8"
              fill
              className="object-cover opacity-50 group-hover:opacity-100 transition-opacity duration-300"
            />
          </div>
          <div className="group flex h-24 w-24 sm:h-32 sm:w-32 md:h-40 md:w-40 rounded-full overflow-hidden shadow-md cursor-pointer bg-zinc-800 relative">
            <Image
              src={img9}
              alt="Creative 9"
              fill
              className="object-cover opacity-50 group-hover:opacity-100 transition-opacity duration-300"
            />
          </div>
          <div className="group flex h-24 w-24 sm:h-32 sm:w-32 md:h-40 md:w-40 rounded-full overflow-hidden shadow-lg cursor-pointer bg-slate-700 relative">
            <Image
              src={img10}
              alt="Creative 10"
              fill
              className="object-cover opacity-50 group-hover:opacity-100 transition-opacity duration-300"
            />
          </div>
        </div>
      </div>

      {/* Desktop layout (lg:) - Original unchanged */}
      <main className="hidden lg:block">
        <div className="group flex absolute top-62 left-28 h-36 w-36 rounded-full overflow-hidden shadow-md cursor-pointer bg-zinc-900">
          <Image
            src={img1}
            alt="Creative 1"
            fill
            className="object-cover opacity-50 group-hover:opacity-100 transition-opacity duration-300"
          />
        </div>
        <div className="group flex absolute top-38 left-90 h-48 w-48 rounded-full overflow-hidden shadow-md cursor-pointer bg-stone-500">
          <Image
            src={img2}
            alt="Creative 2"
            fill
            className="object-cover opacity-50 group-hover:opacity-100 transition-opacity duration-300"
          />
        </div>
        <div className="group flex absolute top-22 left-52 h-24 w-24 rounded-full overflow-hidden shadow-sm cursor-pointer bg-slate-400">
          <Image
            src={img3}
            alt="Creative 3"
            fill
            className="object-cover opacity-50 group-hover:opacity-100 transition-opacity duration-300"
          />
        </div>
        <div className="group flex absolute top-10 left-170 h-56 w-56 rounded-full overflow-hidden shadow-md cursor-pointer bg-cyan-700">
          <Image
            src={img4}
            alt="Creative 4"
            fill
            className="object-cover opacity-50 group-hover:opacity-100 transition-opacity duration-300"
          />
        </div>
        <div className="group flex absolute top-34 right-20 h-48 w-48 rounded-full overflow-hidden shadow-md cursor-pointer bg-indigo-700">
          <Image
            src={img5}
            alt="Creative 5"
            fill
            className="object-cover opacity-50 group-hover:opacity-100 transition-opacity duration-300"
          />
        </div>
        <div className="group flex absolute top-54 right-90 h-36 w-36 rounded-full overflow-hidden shadow-md cursor-pointer bg-rose-700">
          <Image
            src={img6}
            alt="Creative 6"
            fill
            className="object-cover opacity-50 group-hover:opacity-100 transition-opacity duration-300"
          />
        </div>
        <div className="group flex absolute top-100 right-35 h-40 w-40 rounded-full overflow-hidden shadow-md cursor-pointer bg-stone-700">
          <Image
            src={img7}
            alt="Creative 7"
            fill
            className="object-cover opacity-50 group-hover:opacity-100 transition-opacity duration-300"
          />
        </div>
        <div className="group flex absolute top-95 right-90 h-72 w-72 rounded-full overflow-hidden shadow-lg cursor-pointer bg-rose-900">
          <Image
            src={img8}
            alt="Creative 8"
            fill
            className="object-cover opacity-50 group-hover:opacity-100 transition-opacity duration-300"
          />
        </div>
        <div className="group flex absolute top-105 left-130 h-36 w-36 rounded-full overflow-hidden shadow-md cursor-pointer bg-zinc-800">
          <Image
            src={img9}
            alt="Creative 9"
            fill
            className="object-cover opacity-50 group-hover:opacity-100 transition-opacity duration-300"
          />
        </div>
        <div className="group flex absolute top-110 left-20 h-64 w-64 rounded-full overflow-hidden shadow-lg cursor-pointer bg-slate-700">
          <Image
            src={img10}
            alt="Creative 10"
            fill
            className="object-cover opacity-50 group-hover:opacity-100 transition-opacity duration-300"
          />
        </div>
      </main>
    </>
  );
}

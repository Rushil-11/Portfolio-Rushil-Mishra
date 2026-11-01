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
    <main className="">
      {/* 1 */}
      <div className="group flex absolute top-72 left-28 h-36 w-36 rounded-full overflow-hidden shadow-md cursor-pointer bg-zinc-900">
        <Image
          src={img1}
          alt="Creative 1"
          fill
          className="object-cover opacity-50 group-hover:opacity-100 transition-opacity duration-300"
        />
      </div>

      {/* 2 */}
      <div className="group flex absolute top-48 left-90 h-48 w-48 rounded-full overflow-hidden shadow-md cursor-pointer bg-stone-500">
        <Image
          src={img2}
          alt="Creative 2"
          fill
          className="object-cover opacity-50 group-hover:opacity-100 transition-opacity duration-300"
        />
      </div>

      {/* 3 */}
      <div className="group flex absolute top-32 left-52 h-24 w-24 rounded-full overflow-hidden shadow-sm cursor-pointer bg-slate-400">
        <Image
          src={img3}
          alt="Creative 3"
          fill
          className="object-cover opacity-50 group-hover:opacity-100 transition-opacity duration-300"
        />
      </div>

      {/* 4 */}
      <div className="group flex absolute top-20 left-170 h-56 w-56 rounded-full overflow-hidden shadow-md cursor-pointer bg-cyan-700">
        <Image
          src={img4}
          alt="Creative 4"
          fill
          className="object-cover opacity-50 group-hover:opacity-100 transition-opacity duration-300"
        />
      </div>

      {/* 5 */}
      <div className="group flex absolute top-44 right-20 h-48 w-48 rounded-full overflow-hidden shadow-md cursor-pointer bg-indigo-700">
        <Image
          src={img5}
          alt="Creative 5"
          fill
          className="object-cover opacity-50 group-hover:opacity-100 transition-opacity duration-300"
        />
      </div>

      {/* 6 */}
      <div className="group flex absolute top-64 right-90 h-36 w-36 rounded-full overflow-hidden shadow-md cursor-pointer bg-rose-700">
        <Image
          src={img6}
          alt="Creative 6"
          fill
          className="object-cover opacity-50 group-hover:opacity-100 transition-opacity duration-300"
        />
      </div>

      {/* 7 */}
      <div className="group flex absolute top-110 right-35 h-40 w-40 rounded-full overflow-hidden shadow-md cursor-pointer bg-stone-700">
        <Image
          src={img7}
          alt="Creative 7"
          fill
          className="object-cover opacity-50 group-hover:opacity-100 transition-opacity duration-300"
        />
      </div>

      {/* 8 */}
      <div className="group flex absolute top-105 right-90 h-72 w-72 rounded-full overflow-hidden shadow-lg cursor-pointer bg-rose-900">
        <Image
          src={img8}
          alt="Creative 8"
          fill
          className="object-cover opacity-50 group-hover:opacity-100 transition-opacity duration-300"
        />
      </div>

      {/* 9 */}
      <div className="group flex absolute top-115 left-130 h-36 w-36 rounded-full overflow-hidden shadow-md cursor-pointer bg-zinc-800">
        <Image
          src={img9}
          alt="Creative 9"
          fill
          className="object-cover opacity-50 group-hover:opacity-100 transition-opacity duration-300"
        />
      </div>

      {/* 10 */}
      <div className="group flex absolute top-120 left-20 h-64 w-64 rounded-full overflow-hidden shadow-lg cursor-pointer bg-slate-700">
        <Image
          src={img10}
          alt="Creative 10"
          fill
          className="object-cover opacity-50 group-hover:opacity-100 transition-opacity duration-300"
        />
      </div>
    </main>
  );
}

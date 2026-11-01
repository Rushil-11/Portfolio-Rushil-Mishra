"use client"
import { useState, useEffect, useRef } from "react";



export default function Intro(){
    const [pullY, setPullY] = useState(0); 
    const [isDragging, setIsDragging] = useState(false); 
    const [isTriggered, setIsTriggered] = useState(false); 

    const start = useRef(0); 
    const contentRef = useRef<HTMLDivElement>(null); 
    const Pull_max=200

    // flow: grab --> pull down --> reach bottom --> go up

    const pointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        if(isTriggered)return; 

        setIsDragging(true); 
        start.current = e.clientY; 
        e.currentTarget.setPointerCapture(e.pointerId);
    }

    const pointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if(!isDragging || isTriggered) return; 

        const deltaY = e.clientY - start.current; 
        if(deltaY > 0){
            const dist = Math.min(deltaY, 200)
            setPullY(dist); 
        }

        if(deltaY >= Pull_max){
            setIsTriggered(true); 
            setIsDragging(false); 
        }
    }

    const pointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
        if(isTriggered)return;  
        setIsDragging(false); 
        setPullY(0); 
    }

    return(
        <div className="flex absolute top-180 justify-center bg-black h-screen w-full">
            <h2 className="py-5 text-white text-6xl">Hii, This is Rushil Mishra!</h2>
             <div
        className={`transition-all duration-500 ease-in-out flex flex-col absolute left-300 items-center z-20 ${
          isTriggered ? "opacity-0 -translate-y-15 pointer-events-none" : "opacity-100"
        }`}
      >
        <div
          onPointerDown={pointerDown}
          onPointerMove={pointerMove}
          onPointerUp={pointerUp}
          onPointerCancel={pointerUp}
          className="flex flex-col items-center cursor-grab active:cursor-grabbing touch-none"
        >
          
          <div
            className={`w-[3px] bg-white rounded-full${
              !isDragging ? "transition-all duration-300 ease-out" : ""
            }`}
            style={{ height: `${140 + pullY}px` }}
          />
          {/*Drag knob below*/}
          <div
            className={`relative -mt-1 w-5 h-12 bg-white rounded-full shadow-[0_4px_16px_rgba(256,256,256,0.8)] animate-bounce ${
              !isDragging ? "transition-transform duration-300 ease-out" : ""
            }`}
          >
            <div className="flex absolute top-5 right-5 text-white text-sm w-20">PULL THIS</div>
          </div>

        </div>
      </div>
            <div className={`transition-all duration-1200 ease-in-out ${isTriggered? "opacity-100 top-40" : "opacity-0 top-70 pointer-events-none"}`}>
                <p className="flex absolute top-40 left-45 text-white text-5xl w-300 font-light">
                I am a second-year engineering undergraduate exploring the field of Computer Science with an application-based approach and continuous problem-solving.
                With a strong command of Data Structures and Algorithms alongside the fundamentals of Web Development, I actively participate in open-source contributions as well. I am an observant, dedicated developer always looking for opportunities to upskill and excel.
                </p>
            </div>
           
            
        </div>
    )
}
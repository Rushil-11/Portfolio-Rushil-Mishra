"use client"
import { useState, useEffect } from "react"
import Image from "next/image"

export default function Hero(){

const texts = [
    "Engineer", 
    "Frondend Developer", 
    "Competitive Programmer", 
    "Content Writer",
    "Curious Designer" 
]

const [currentText, setCurrentText] = useState(""); 
const [wordIndex, setWordIndex] = useState(0); 
const [isDeleting, setIsDeleting] = useState(false); 

useEffect(() =>
{
    const currentWord = texts[wordIndex]; 
    const typingSpeed = isDeleting ? 50 : 50; //erasing faster

    const timer = setTimeout(() => {
        if(!isDeleting){
            setCurrentText(currentWord.substring(0, currentText.length + 1)); 
            if(currentText === currentWord){
                setTimeout(()=>setIsDeleting(true), 800);
            }
        }
        else{
            setCurrentText(currentWord.substring(0, currentText.length -1)); 
            if(currentText === ""){
                setIsDeleting(false); setWordIndex((prev) => (prev+1) % texts.length) 
            }
        }
    }, typingSpeed);
    return () => clearTimeout(timer); 

}, [currentText, isDeleting, wordIndex]
);

    return(
        <main className="flex flex-row item-center justify-center my-22 bg-white">
            <div className="h-120 w-240 bg-black absolute inset-0 top-48 left-76 "></div> 
            <div className="bg-white h-120 w-240 absolute border-2 ">
            <Image
                src="/image.jpg"
                width={420}
                height={420}
                alt="Owner"
                className="absolute left-6 top-7"
                />
            <h1 className="text-5xl absolute left-115 top-32">Rushil Mishra</h1>
            <h2 className="absolute left-115 top-45 text-6xl text-black ">
                <span>{currentText}</span>
                <span className="animate-pulse text-black"></span>
            </h2>

            </div>
        </main>
    )
}
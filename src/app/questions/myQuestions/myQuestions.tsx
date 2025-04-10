"use client"
import { useState } from "react";
import Image from "next/image";
import Question_01 from "@/app/components/questions/question _01";
import Question_02 from "@/app/components/questions/question _02";
import Question_03 from "@/app/components/questions/question _03";
import Question_04 from "@/app/components/questions/question _04";
import { useCurrentQuestion } from "../../../../context/currentQuestion";
import Question_05 from "@/app/components/questions/question _05";


export default function MyQuestions() {
    const [whatQuestion, setWhatQuestion] = useState<number>(0)
    const {currentQuestion,setCurrentQuestion} = useCurrentQuestion()
    const [isRegionSelected, setIsRegionSelected] = useState<string>("")
    return (
        <div className="flex flex-col justify-center w-full items-center min-h-screen bg-gradient-to-r from-slate-900 to-slate-800">
            {
                currentQuestion === 0 ?
                    <Question_01 />
                    :
                    currentQuestion === 1 ?
                    <Question_02 />:
                    currentQuestion === 2?
                    <Question_03 />:
                    currentQuestion === 3?
                    <Question_04 />
                    :
                    <Question_05 />

                
                }
           
        </div>
    );
}

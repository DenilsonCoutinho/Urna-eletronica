'use client';

import { useEffect, useState } from "react";
import { useCurrentQuestion } from "../../../../context/currentQuestion";
import { useQuestionStore } from "@/app/zustand/useQuestionStore";
interface IfYouKnowProps {
    description: string
    id: string
}
export default function Question_04() {

    const { setIfYouKnow,ifYouKnow } = useQuestionStore()

    const ifYouKnowData: IfYouKnowProps[] = [{ description: 'Sim, acompanho bastante.', id: "1" }, { description: ' Já ouvi falar, mas não conheço muito.', id: "2" }, { description: 'Nunca ouvi falar.', id: "3" }];
    const { currentQuestion, setCurrentQuestion } = useCurrentQuestion()

    return (
        <div className="w-full md:px-10 px-2">
            <div className="bg-white p-6 w-full rounded-lg shadow-lg">
                <h2 className="text-lg font-semibold">Você conhece bem esses candidatos?</h2>
                <p className="text-gray-500 text-sm mb-4">3 de 5 Respondido</p>

                <div className="space-y-2 flex flex-col">
                    {ifYouKnowData?.map((data, index) => <label key={index} className=" border border-gray-400 rounded-lg text-xl flex justify-start items-center gap-2 p-4 w-full">
                        <input type="radio" checked={ifYouKnow?.some((e: IfYouKnowProps) => e.id === data.id)} onChange={() => { setIfYouKnow(data.description,data.id) }} className="h-6 w-6" />
                        <span className="md:text-base text-sm">
                            {data?.description}
                        </span>
                    </label>
                    )}
                </div>
            </div>
            <div className=" w-full">
                <div className={`flex ${currentQuestion > 0 ? "justify-between" : "justify-end"} mt-4  bg-white p-4 w-full rounded-md `}>
                    {
                        currentQuestion > 0 &&
                        <button onClick={() => setCurrentQuestion((prev) => prev - 1)} className="px-4 py-2 border rounded-lg">Voltar</button>
                    }
                        <button disabled={ifYouKnow.length === 0 && true} onClick={() => setCurrentQuestion((prev) => prev + 1)} className={`${ifYouKnow.length === 0 ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500 cursor-pointer"}  px-10 shadow-md py-2  text-white rounded-lg`}>Próximo</button>

                </div>
            </div>
        </div>
    )
}
'use client';

import { useEffect, useState } from "react";
import { useCurrentQuestion } from "../../../../context/currentQuestion";
import { useQuestionStore } from "@/app/zustand/useQuestionStore";
import { useRouter } from "next/navigation";
interface WhereYouSawProps {
    name: string
    id: string
}

export default function Question_05() {
    const { whereYouSaw, setwhereYouSaw } = useQuestionStore()
    const whereYouSawData: WhereYouSawProps[] = [{ name: 'TV', id: "1" }, { name: 'YouTube', id: "2" }, { name: 'Twitter/X', id: "3" }, { name: 'Instagram', id: "4" }, { name: 'TikTok', id: "5" }, { name: 'Outros', id: "6" }];
    const { currentQuestion, setCurrentQuestion } = useCurrentQuestion()
    const route = useRouter()
    return (
        <div className="w-full md:px-10 px-2">
            <div className="bg-white p-6 w-full rounded-lg shadow-lg">
                <h2 className="text-lg font-semibold">Onde você costuma acompanhar notícias sobre política?</h2>
                <p className="text-gray-500 text-sm mb-4">4 de 5 Respondido</p>

                <div className="space-y-2 flex flex-col">
                    {whereYouSawData?.map((data, index) => <label key={index} className=" border border-gray-400 rounded-lg text-xl flex justify-start items-center gap-2 p-4 w-full">
                        <input type="radio" checked={whereYouSaw?.some((e: WhereYouSawProps) => e.id === data.id)} onChange={() => { setwhereYouSaw(data.name, data.id) }} className="h-6 w-6" />
                        <span className="md:text-base text-sm">
                            {data?.name}
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
                        <button disabled={whereYouSaw.length === 0 && true} onClick={() => route.push("/email")} className={`${whereYouSaw.length === 0 ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500 cursor-pointer"}  px-10 shadow-md py-2  text-white rounded-lg`}>Finalizar</button>

                </div>
            </div>
        </div>
    )
}
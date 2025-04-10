'use client';
import { useEffect, useState } from "react";
import { useCurrentQuestion } from "../../../../context/currentQuestion";
import { useQuestionStore } from "@/app/zustand/useQuestionStore";
interface presidentProps {
    name: string
    id: string
}
export default function Question_03() {
    const { presidentNeverVote, setSelectedNeverVotePresident } = useQuestionStore()

    const president: presidentProps[] = [{ name: 'Lula(PT)', id: "1" }, { name: 'Tarcísio de Freitas (Republicanos)', id: "2" }, { name: 'Ciro gomes(PDT)', id: "3" }, { name: 'Michelle bolsonaro(PL)', id: "4" }, { name: 'Pablo Marçal', id: "5" }, { name: 'Felipe neto', id: "6" }];
    const { currentQuestion, setCurrentQuestion } = useCurrentQuestion()

    return (
        <div className="w-full md:px-10 px-2">
            <div className="bg-white p-6 w-full rounded-lg shadow-lg">
                <h2 className="text-lg font-semibold">Em qual desses candidatos você nunca votaria? (Pode marcar mais de um)</h2>
                <p className="text-gray-500 text-sm mb-4">2 de 3 Respondido</p>

                <div className="space-y-2 flex flex-col">
                    {president?.map((presidentRejected, index) => <label key={index} className=" border border-gray-400 rounded-lg text-xl flex justify-start items-center gap-2 p-4 w-full">
                        <input type="checkbox" checked={presidentNeverVote?.some((e: presidentProps) => e.name === presidentRejected.name)} onChange={() => { setSelectedNeverVotePresident(presidentRejected.name, presidentRejected.id) }} className="h-6 w-6" />
                        <span className="md:text-base text-sm">
                            {presidentRejected?.name}
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
                        <button disabled={presidentNeverVote.length === 0 && true} onClick={() => setCurrentQuestion((prev) => prev + 1)} className={`${presidentNeverVote.length === 0 ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500 cursor-pointer"}  px-10 shadow-md py-2  text-white rounded-lg`}>Próximo</button>
                </div>
            </div>
        </div>
    )
}
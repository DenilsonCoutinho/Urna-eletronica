'use client';

import { useCurrentQuestion } from "../../../../context/currentQuestion";
import { useQuestionStore } from "@/app/zustand/useQuestionStore";
interface presidentProps {
    name: string
    id: string
}
export default function Question_02() {
    const { presidentSelected, setSelectedPresident } = useQuestionStore()
    const president: presidentProps[] = [{ name: 'Lula(PT)', id: "1" }, { name: 'Tarcísio de Freitas (Republicanos)', id: "2" }, { name: 'Ciro gomes(PDT)', id: "3" }, { name: 'Michelle bolsonaro(PL)', id: "4" }, { name: 'Pablo Marçal', id: "5" }, { name: 'Felipe neto', id: "6" }];
    const { currentQuestion, setCurrentQuestion } = useCurrentQuestion()
    console.log(presidentSelected)
    return (
        <div className="w-full md:px-10 px-2">
            <div className="bg-white p-6 w-full rounded-lg shadow-lg">
                <h2 className="text-lg font-semibold">Se a eleição fosse hoje, em quem você votaria?</h2>
                <p className="text-gray-500 text-sm mb-4">1 de 3 Respondido</p>

                <div className="space-y-2 flex flex-col">
                    {president?.map((presidentData, index) => (
                        <label key={index} className=" border border-gray-400 rounded-lg text-xl flex justify-start items-center gap-2 p-4 w-full">
                            <input type="radio" checked={presidentSelected?.some((e) => e.name === presidentData.name)} onChange={() => { setSelectedPresident(presidentData.name, presidentData.id) }} className="h-6 w-6" />
                            <span className="md:text-base text-sm">
                                {presidentData.name}
                            </span>
                        </label>
                    ))}
                </div>
            </div>
            <div className=" w-full">
                <div className={`flex ${currentQuestion > 0 ? "justify-between" : "justify-end"} mt-4  bg-white p-4 w-full rounded-md `}>
                    {
                        currentQuestion > 0 &&
                        <button onClick={() => setCurrentQuestion((prev) => prev - 1)} className="px-4 py-2 border rounded-lg">Voltar</button>
                    }
                    <button disabled={presidentSelected.length === 0 && true} onClick={() => setCurrentQuestion((prev) => prev + 1)} className={`${presidentSelected.length === 0 ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500 cursor-pointer"}  px-10 shadow-md py-2  text-white rounded-lg`}>Próximo</button>
                </div>
            </div>
        </div>
    )
}
'use client';
import { useCurrentQuestion } from "../../../../context/currentQuestion";
import { useQuestionStore } from "@/app/zustand/useQuestionStore";
type Region = {
    region: string
    id: string
}
export default function Question_01() {
    const regions: Region[] = [{ region: 'Norte', id: "1" }, { region: 'Nordeste', id: "2" }, { region: 'Centro-Oeste', id: "3" }, { region: 'Sudeste', id: "4" }, { region: 'Sul', id: "5" }];
    const { currentQuestion, setCurrentQuestion } = useCurrentQuestion()
    const { selectedRegion, setSelectedRegion } = useQuestionStore()

    return (
        <div className="w-full md:px-10 px-2">
            <div className="bg-white p-6 w-full rounded-lg shadow-lg">
                <h2 className="text-lg font-semibold">De qual região do Brasil você é?</h2>
                <p className="text-gray-500 text-sm mb-4">0 de 3 Respondido</p>

                <div className="space-y-2 flex flex-col">
                    {regions?.map((region, index) => (
                        <label key={index} className=" border border-gray-400 rounded-lg text-xl flex justify-start items-center gap-2 p-4 w-full">
                            <input type="radio" checked={selectedRegion.some((e) => e.id === region.id)} onChange={() => setSelectedRegion(region.region, region.id)} className="h-6 w-6" />
                            <span className="md:text-base text-sm">
                                {region.region}
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
                    {
                        <button disabled={selectedRegion.length === 0 && true} onClick={() => setCurrentQuestion((prev) => prev + 1)} className={`${selectedRegion.length === 0 ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500 cursor-pointer"}  px-10 shadow-md py-2  text-white rounded-lg`}>Próximo</button>
                    }
                </div>
            </div>
        </div>
    )
}
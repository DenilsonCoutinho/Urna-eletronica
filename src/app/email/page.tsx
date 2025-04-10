"use client"
import { useEffect, useState } from "react";
import CreateUser from "../../../action/createUser";
import { GetNoteVoteIn } from "../service/getNotVoteIn";
import { useQuestionStore } from "../zustand/useQuestionStore";
import Loader from "../components/loader";
import Link from "next/link";
import GetVoteByRegion from "../service/getVoteByRegion";

export default function Email() {
    const { presidentNeverVote, ifYouKnow, presidentSelected, selectedRegion, whereYouSaw } = useQuestionStore()
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState<boolean>(false)
    const [isOk, setIsOk] = useState<boolean>(false)
    const [error, setError] = useState("")
    const emailPattern = /^[a-zA-Z0-9._%+-]+@(gmail|hotmail|outlook|yahoo)\.com$/

    async function handleSubmit() {
        try {
            setLoading(true)
            if (!emailPattern.test(email)) {
                setLoading(false)
                setError("Email inválido!")
                return
            }
            await CreateUser(presidentNeverVote, ifYouKnow[0], presidentSelected[0], selectedRegion[0], whereYouSaw, email)
            localStorage.removeItem('question-storage')
            setIsOk(true)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    if (isOk) {
        return <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-slate-900 to-slate-800 px-4">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8 space-y-6 text-center">

                <h1 className="text-3xl font-bold text-slate-800">
                    Obrigado por participar!
                </h1>

                <p className="text-slate-600">
                    Sua opinião foi registrada com sucesso e faz parte de um movimento por mais transparência e verdade.
                </p>

                <div className="flex justify-center">
                    <svg className="w-20 h-20 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m7 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>

                <div className="space-y-3">
                    <Link href="/">
                        <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl text-lg font-semibold transition">
                            Voltar ao inicio
                        </button>
                    </Link>

                </div>

                <p className="text-slate-400 text-xs">
                    Juntos mostramos a realidade do Brasil sem filtros.
                </p>

            </div>
        </div>
    }
    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-slate-900 to-slate-800 px-4">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8 space-y-6">

                <h1 className="text-3xl font-bold text-center text-slate-800">
                    Antes de finalizar...
                </h1>

                <p className="text-slate-600 text-center">
                    Informe seu melhor e-mail para confirmar sua participação na pesquisa.
                </p>
                <div className="flex flex-col gap-2">
                    <input
                        type="email"
                        placeholder="Digite seu e-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                    />
                    {error && <p className="text-red-600 text-xs">{error}</p>}
                </div>

                <button
                    onClick={handleSubmit}
                    className="w-full flex items-center justify-center bg-emerald-500 cursor-pointer hover:bg-emerald-600 text-white font-medium py-3 rounded-xl transition">
                    {loading ? <Loader /> : "Confirmar e Enviar"}
                </button>
            </div>
        </div>
    )
}

"use client"
import { useEffect, useState } from "react";
import CreateUser from "../../../action/createUser";
import { GetNoteVoteIn } from "../service/getNotVoteIn";
import { useFinishedStore, useQuestionStore } from "../zustand/useQuestionStore";
import Loader from "../components/loader";
import Link from "next/link";
import GetVoteByRegion from "../service/getVoteByRegion";
import { useRouter } from "next/navigation";
import { fetchEmail } from "../../../hooks/fetchEmails";

export default function Email() {
    const { presidentNeverVote, ifYouKnow, presidentSelected, selectedRegion, whereYouSaw } = useQuestionStore()
    const { setFinished, finished } = useFinishedStore()

    const [email, setEmail] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const [isOk, setIsOk] = useState<boolean>(false)
    const [error, setError] = useState<string>("")
    const [errorName, setErrorName] = useState<string>("")
    const emailPattern = /^[a-zA-Z0-9._%+-]+@(gmail|hotmail|outlook|yahoo)\.com$/
    const route = useRouter()

    async function handleSubmit() {
        const getEmail = await fetchEmail(email) || []
        if (getEmail[0]?._id?.email) {
            return alert("Email já foi cadastrado!")
        }

        setErrorName("")
        setError("")
        try {
            setLoading(true)
            if (!name && !emailPattern.test(email)) {
                setErrorName("Nome inválido")
                setError("Email inválido!")
                return
            }

            if (!name) {
                return setErrorName("Nome inválido")
            }
            if (!emailPattern.test(email)) {
                setLoading(false)
                setError("Email inválido!")
                return
            }
            await CreateUser(presidentNeverVote, ifYouKnow[0], presidentSelected[0], selectedRegion[0], whereYouSaw, email, name)
            setIsOk(true)
            setFinished(true)
            return localStorage.removeItem('question-storage')
        } catch (error: unknown) {
            if (error instanceof Error) {
                alert("Você não preencheu o formulário corretamente")
                route.replace('/questions')
            }
        } finally {
            setLoading(false)
        }
    }

    function clearForm() {
        setFinished(false)
        localStorage.removeItem('question-storage')
    }
    if (finished) {
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
                        <button onClick={() => clearForm()} className="w-full bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl text-lg font-semibold transition">
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
                    Informe seu melhor e-mail e nome para confirmar sua participação na pesquisa.
                </p>
                <div className="flex flex-col gap-1">
                    <label className="font-semibold text-sm">Nome</label>
                    <input
                        type="name"
                        placeholder="Digite seu nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                    />
                    {errorName && <p className="text-red-600 text-xs">{errorName}</p>}
                </div>
                <div className="flex flex-col gap-1">
                    <label className="font-semibold text-sm">Email</label>
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

"use client"
import Link from "next/link";
import SplashCursor from "../../components/SplashCursor/SplashCursor";
import { GetNoteVoteIn } from "./service/getNotVoteIn";
import { useEffect, useState } from "react";
import { GetVoteIn } from "./service/getVoteIn";
import GetVoteByRegion from "./service/getVoteByRegion";
import { useQuery } from "@tanstack/react-query";
import { useVotes } from "../../hooks/fetchVote";
type PropsNoteVoteIn = {
  name: string;
  id: string;
  votes: number;
}

type Region = {
  region: string
  id: string
}
export default function Home() {
  const regions: Region[] = [{ region: 'Norte', id: "1" }, { region: 'Nordeste', id: "2" }, { region: 'Centro-Oeste', id: "3" }, { region: 'Sudeste', id: "4" }, { region: 'Sul', id: "5" }, { region: 'Todos', id: "6" }];
  // const { data } = useQuery({ queryKey: ['votes'], queryFn: GetVoteIn })
  const [region, setRegion] = useState<string | undefined>()

  const [voteIn, setVoteIn] = useState<PropsNoteVoteIn[] | undefined>()
  const [voteByRegion, setVoteByRegion] = useState<any>()
  const [regionSelected, setRegionSelected] = useState<string>("")
  const { data, isLoading } = useVotes(regionSelected)
  async function getNotVoteIn() {
    const data = await GetVoteIn()
    setVoteIn(data)
  }

  async function getVoteByRegion() {
    const data = await GetVoteByRegion(regionSelected)
    setVoteByRegion(data)
  }


  useEffect(() => {
    getVoteByRegion()
  }, [regionSelected])

  useEffect(() => {
    getNotVoteIn()
  }, [])
  return (
    <main className="flex flex-col">
      {/* HERO */}
      <section className="relative overflow-hidden min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-r from-slate-900 to-slate-800 text-white text-center space-y-6">
        {/* <SplashCursor /> */}
        <h1 className="text-4xl md:text-6xl select-none font-extrabold leading-tight">
          O Voto que Ninguém Controla.
        </h1>
        <p className="text-lg md:text-xl text-slate-300 select-none">
          Chega de manipulação. Aqui sua opinião tem poder real.
        </p>
        <Link href={"/questions"}>
          <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition">
            Participar da Pesquisa
          </button>
        </Link>
      </section>


      {/* SOLUÇÃO */}
      <section className="bg-slate-100 py-20 px-4 text-center space-y-8">
        <h2 className="text-3xl md:text-5xl font-bold">Aqui é diferente.</h2>
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8 text-slate-700">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-semibold text-xl mb-2">100% Anônimo</h3>
            <p>Ninguém saberá em quem você votou.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-semibold text-xl mb-2">Sem manipulação</h3>
            <p>Os votos aparecem como são. Sem filtros, sem ajustes.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-semibold text-xl mb-2">Aberto pra todos</h3>
            <p>Qualquer pessoa pode votar e ver os resultados em tempo real.</p>
          </div>
        </div>
      </section>
      <section className="bg-slate-900 py-20 px-4 text-white text-center space-y-8">
        <h2 className="text-3xl md:text-5xl font-bold">Como funciona?</h2>
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
          <div>
            <span className="text-emerald-500 text-4xl font-extrabold">1</span>
            <p className="mt-2">Responda algumas perguntas rápidas</p>
          </div>
          <div>
            <span className="text-emerald-500 text-4xl font-extrabold">2</span>
            <p className="mt-2">Vote de forma anônima</p>
          </div>
          <div>
            <span className="text-emerald-500 text-4xl font-extrabold">3</span>
            <p className="mt-2">Veja o resultado em tempo real</p>
          </div>
        </div>
      </section>

      {/* RESULTADOS */}
      <section className="bg-white py-20 px-4 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
          Resultados Parciais
        </h2>
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6 select-none">
          {voteIn?.map((item) => (
            <div
              key={item.name}
              className="border  border-slate-200 rounded-xl p-6 bg-slate-50 shadow-md"
            >
              <h3 className="text-xl font-bold text-slate-900">{item.name}</h3>
              <p className="text-md font-bold text-emerald-600 mt-2">{item.votes} {item.votes > 1 ? 'votos' : "voto"}</p>
            </div>
          ))}
        </div>
      </section>

      {/* RESULTADOS POR REGIÃO*/}
      <section className="bg-white py-20 px-4 text-center">

        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
          Resultados Por Região
        </h2>
        <div className="flex flex-row justify-center mb-6 items-center gap-3">
          {
            regions.map((e) => {
              return <div
                onClick={() => setRegionSelected(e.region)}
                key={e?.id}
                className="border border-slate-200 rounded-xl p-6 bg-slate-50 shadow-md"
              >
                <p className="text-black">{e.region}</p>
              </div>
            })
          }
        </div>
        <div className="max-w-[900px] w-full mx-auto flex flex-wrap items-center gap-3">
          {data?.length > 0 ? data?.map((item: any) => {
            return <div
              // key={item?._id?.candidate}

              className="border max-w-[300px] h-[170px] border-slate-200 rounded-xl p-6 bg-slate-50 shadow-md"
            >
              <h3 className="text-xl font-bold text-slate-900">{item?._id?.candidate}</h3>
              <p className="text-md font-bold text-emerald-600 mt-2">{item?.totVotes} {item?.totVotes > 1 ? 'votos' : "voto"}</p>
              <h3 className="text-xl font-bold text-slate-900">{item?._id.region[0]}</h3>
            </div>

          })
            :
            <>
              <div className="flex justify-center items-center h-72 w-full">
                <h1 className="text-black text-center">Dados indisponiveis!</h1>
              </div>
            </>
          }
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-emerald-500 py-20 px-4 text-white text-center space-y-6">
        <h2 className="text-3xl md:text-5xl font-bold">
          Sua opinião importa.
        </h2>
        <p className="text-lg">
          Junte-se a milhares de brasileiros que estão votando de verdade.
        </p>
        <Link href={"/questions"} className="cursor-pointer">
          <button className="bg-white cursor-pointer text-emerald-600 font-semibold px-8 py-4 rounded-2xl text-lg hover:bg-slate-100 transition">
            Quero Votar Agora
          </button>
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 py-6 text-center text-slate-500 text-sm">
        Feito com verdade, por quem acredita no povo.
      </footer>

    </main>
  )
}

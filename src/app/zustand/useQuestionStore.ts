import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type PresidentNeverVote = {
    name: string
    id: string
}

type PresidentSelected = {
    name: string
    id: string
}
type IfYouKnowProps = {
    description: string
    id: string
}

type WhereYouSaw = {
    name: string
    id: string
}
type Region = {
    region: string
    id: string
}
type QuestionState = {
    presidentNeverVote: PresidentNeverVote[]
    presidentSelected: PresidentSelected[]
    ifYouKnow: IfYouKnowProps[]
    whereYouSaw: WhereYouSaw[]
    selectedRegion: Region[]
    setSelectedRegion: (region: string, id: string) => void
    setSelectedPresident: (name: string, id: string) => void
    setwhereYouSaw: (name: string, id: string) => void
    setIfYouKnow: (description: string, id: string) => void
    setSelectedNeverVotePresident: (name: string, id: string) => void
}

export const useQuestionStore = create<QuestionState>()(
    persist(
        (set) => ({
            presidentNeverVote: [],
            presidentSelected: [],
            whereYouSaw: [],
            ifYouKnow: [],
            selectedRegion: [],
            setSelectedRegion: (region, id) => set({ selectedRegion: [{ region, id }] }),
            setSelectedPresident: (name, id) => set((state) => ({
                presidentSelected: state.presidentSelected.some((e) => e.name === name) ?
                    state.presidentSelected.filter(e => e.id !== id) : [{ name, id }]
            })),
            setSelectedNeverVotePresident: (name, id) => set((state) => ({
                presidentNeverVote: state.presidentNeverVote.some((e) => e.name === name) ?
                    state.presidentNeverVote.filter(e => e.id !== id) : [...state.presidentNeverVote, { name, id }]
            })),
            setIfYouKnow: (description, id) => set((state) => ({
                ifYouKnow: [{ description, id }]
            })),
            setwhereYouSaw: (name, id) => set((state) => ({
                whereYouSaw: [{ name, id }]
            }))
        }),
        {
            name: 'question-storage', // localStorage: question-storage
        }
    )
)

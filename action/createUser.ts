"use server"
import { useQuestionStore } from "@/app/zustand/useQuestionStore";
import { db as prisma } from "@/lib/db";
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
export default async function CreateUser(presidentNeverVote: PresidentNeverVote[], ifYouKnow: IfYouKnowProps, presidentSelected: PresidentSelected, selectedRegion: Region, whereYouSaw: WhereYouSaw[], email: string) {
  const payloadNotVote = presidentNeverVote.map(item => ({
    name: item.name,
    id: item.id
  }))

  const payloadWhereYouSaw = whereYouSaw.map(item => item.name)

  await prisma.user.create({
    data: {
      name: "Lucas",
      email: email,
      region: selectedRegion,
      voteIn: presidentSelected,
      notVoteIn: payloadNotVote,
      ifYouKnow: ifYouKnow,
      whereYouSaw: whereYouSaw,
    }
  })
}
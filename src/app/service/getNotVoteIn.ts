"use server"
import { db as prisma } from "@/lib/db";

export async function GetNoteVoteIn() {
    const groupVote: Record<string, { name: string, id: string, votes: number }> = {}
    const allUsers = await prisma.user.findMany()
    allUsers.flatMap((e) => {
        return e.notVoteIn.forEach((e) => {
            if (groupVote[e.name]) {
                groupVote[e.name].votes += 1
            } else {
                groupVote[e.name] = {
                    name: e.name,
                    id: e.id,
                    votes: 1,
                }
            }
        })
    })


    return Object.values(groupVote)
}

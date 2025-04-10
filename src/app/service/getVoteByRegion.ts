"use server"

import { db as prisma } from "@/lib/db";

export default async function GetVoteByRegion(region?: string) {
  const pipeline = [
    ...(region ? [{ $match: { "region.region": region } }] : []),
    { $unwind: "$voteIn" },
    {
      $group: {
        _id: {
          region: "$region.region",
          idRegion: "$region.id",
          candidate: "$voteIn.name",
        },
        totVotes: { $sum: 1 },
      },
    },
    { $sort: { "_id.region": 1, "totVotes": -1 } },
  ]

  const result = await prisma.user.aggregateRaw({ pipeline })

  return result
}

// app/api/votes/route.ts
import { db as prisma } from '@/lib/db'

export async function GET(request: Request) {
    
  const { searchParams } = new URL(request.url)
  const region = searchParams.get('region')

  const pipeline: any[] = [
    { $unwind: "$voteIn" },
    { 
      $group: {
        _id: {
          candidate: "$voteIn.name"
        },
        totVotes: { $sum: 1 }
      }
    },
    { $sort: { "_id.region": 1, "totVotes": -1 } }
  ]

  // if (region) {
  //   pipeline.unshift({ $match: { "region.region": region } })
  // }

  const votes = await prisma.user.aggregateRaw({ pipeline })

  return Response.json(votes)
}

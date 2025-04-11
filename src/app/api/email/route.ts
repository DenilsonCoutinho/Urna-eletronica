// app/api/votes/route.ts
import { db as prisma } from '@/lib/db'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')

      if(!email) return Response.json([])
    const pipeline: any[] = [
        { $match: { email: email } },
        { $unwind: "$voteIn" },
        { 
            $group: {
              _id: {
                email: "$email"
              },
            }
          },
    ]

    const votes = await prisma.user.aggregateRaw({ pipeline })

    return Response.json(votes)
}

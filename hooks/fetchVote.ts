export async function fetchVotes() {
    const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000"
    const res = await fetch(`${baseUrl}/api/votes`, {
        next: { revalidate: 600 } // 10 minutos
    }
    )
    const data = await res.json()
    return data
}


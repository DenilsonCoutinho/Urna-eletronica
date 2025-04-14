export async function fetchVotes() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/votes`,
        { next: { revalidate: 600 } }
    )
    const data = await res.json()
    return data
}


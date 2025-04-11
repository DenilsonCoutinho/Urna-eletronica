export async function fetchEmail(email:string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/email?email=${email}`)
    const data = await res.json()
    return data
}


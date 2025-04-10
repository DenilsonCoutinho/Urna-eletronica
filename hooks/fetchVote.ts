import { useQuery } from '@tanstack/react-query'

async function fetchVotes(region?: string) {
    const res = await fetch(`/api/votes${region ? `?region=${region}` : ''}`)
    const data = await res.json()
    return data
}

export function useVotes(region?: string) {
    return useQuery({
        queryKey: ['votes', region], // cria cache pra cada região diferente
        queryFn: () => fetchVotes(region),
        staleTime: 1000 * 120, // 2 minutos fresco (não faz nova request)
        refetchOnWindowFocus: false, // não busca só pq mudou de aba
        
    })
}

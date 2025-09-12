import { RepoPullPayload } from "contracts"
import { useEffect, useState } from "react"
import { fetchRepoPulls } from "../services/ghApi"

type UsePullRequests = {
    isLoading: boolean,
    pulls: RepoPullPayload[],
    error: string | undefined
}

export const usePullRequests = (repo: string, owner: string): UsePullRequests => {
    const [isLoading, setIsLoading] = useState(false)
    const [pulls, setPulls] = useState<RepoPullPayload[]>([])
    const [error, setError] = useState<string | undefined>("")

    useEffect(() => {
        setIsLoading(true)

        const fetchData = async() => {
            const resp = await fetchRepoPulls({repo, owner});
                        
            if (resp.success) setPulls(resp.data)
            if (!resp.success) setError(resp.error)
                
            setIsLoading(false)
        }

        fetchData();
    }, [])

    return {
        isLoading,
        pulls,
        error
    }
}
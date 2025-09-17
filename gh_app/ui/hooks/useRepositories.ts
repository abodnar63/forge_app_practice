import { RepositoryPayload } from "contracts"
import { useEffect, useState } from "react"
import { fetchRepositories } from '../services/ghApi'

type UseRepositories = {
    isLoading: boolean,
    repositories: RepositoryPayload[],
    error?: string
}

export const useRepositories = (): UseRepositories => {
    const [ isLoading, setIsLoading ] = useState(true)
    const [ repositories, setRepositories ] = useState<RepositoryPayload[]>([])
    const [ error, setError ] = useState<string | undefined>("");

    useEffect(() => {
        const fetchData = async () => {
            const resp = await fetchRepositories();
            
            if (resp.success) setRepositories(resp.data)
            if (!resp.success) setError(resp.error)
                
            setIsLoading(false)
        }

        fetchData();
    }, [])

    return {
        isLoading,
        repositories,
        error
    }
}
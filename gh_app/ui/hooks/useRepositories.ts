import { RepoPullPayload, RepositoryPayload } from "contracts"
import { useEffect, useState } from "react"
import { fetchRepositories, approveRepoPull, mergeRepoPull } from '../services/ghApi'

type UseRepositories = {
    isLoading: boolean,
    repositories: RepositoryPayload[],
    error?: string
}

type UseRepository = {
    isMerging: boolean,
    isApproving: boolean,
    approve: () => void
    merge: () => void,
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

export const useRepository = (pull: RepoPullPayload): UseRepository => {
    const [isApproving, setIsApproving] = useState(false)
    const [isMerging, setIsMerging] = useState(false)
    const [ error, setError ] = useState<string | undefined>("");

    const approve = async () => {
        setIsApproving(true)
        const resp = await approveRepoPull(pull);
        
        if (!resp.success) setError(resp.error)
    }

    const merge = async () => {
        setIsMerging(true)

        const resp = await mergeRepoPull(pull);
        
        if (!resp.success) setError(resp.error)
    }

    return {
        isApproving,
        isMerging,
        approve,
        merge,
        error
    }
}
import { RepoPullPayload } from "contracts"
import { useEffect, useState } from "react"
import { fetchRepoPulls, approveRepoPull, mergeRepoPull } from "../services/ghApi"

type UsePullRequests = {
    isLoading: boolean,
    pulls: RepoPullPayload[],
    error: string | undefined,
    merged: (mergedPull: RepoPullPayload) => void
}

type UsePullRequest = {
    isMerging: boolean,
    isApproving: boolean,
    isApproved: boolean,
    approve: () => void
    merge: () => void,
    error?: string
}

export const usePullRequests = (repo: string, owner: string): UsePullRequests => {
    const [isLoading, setIsLoading] = useState(false)
    const [pulls, setPulls] = useState<RepoPullPayload[]>([])
    const [error, setError] = useState<string | undefined>("")

    const merged = (mergedPull: RepoPullPayload) => {
        setPulls(pulls.filter(pull => pull.id !== mergedPull.id));
    }

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
        error,
        merged
    }
}

export const usePullRequest = (pull: RepoPullPayload, merged: Function): UsePullRequest => {
    const [isApproving, setIsApproving] = useState(false)
    const [isApproved, setIsApproved] = useState(false)
    const [isMerging, setIsMerging] = useState(false)
    const [ error, setError ] = useState<string | undefined>("");

    const approve = async () => {
        setIsApproving(true)
        const resp = await approveRepoPull(pull);
        
        if (!resp.success) setError(resp.error)

        setIsApproved(true);
        setIsApproving(false);
    }

    const merge = async () => {
        setIsMerging(true)

        const resp = await mergeRepoPull(pull);
        
        if (!resp.success) setError(resp.error)
        if (resp.success) merged(pull)
    }

    return {
        isApproving,
        isMerging,
        isApproved,
        approve,
        merge,
        error
    }
}
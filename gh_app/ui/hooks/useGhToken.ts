import { useState, useEffect } from 'react';
import { storeToken, getToken } from '../services/ghToken'
import { GetTextResponse } from "contracts";

type UseGHTokenSaving = {
    saveToken: (payload: {token: string}) => Promise<void>,
    isSaving: boolean,
    error: string
}

export const useGHTokenSaving = (): UseGHTokenSaving => {
    const [isSaving, setIsSaving] = useState<boolean>(false)
    const [error, setError] = useState<string>("")

    const saveToken = async (payload: {token: string}) => {
        setIsSaving(true);
        
        try {
            const data:GetTextResponse = await storeToken(payload)
            data.success ? setError("") : setError(data.error || "Error");
            setIsSaving(false);
        } catch(err) {
            console.log("Error",err)
            setIsSaving(false);
            setError(JSON.stringify(err));
        }
    }
    
    return {
        saveToken,
        isSaving,
        error
    }
}

type UseGHToken = {
    isLoading: boolean,
    token: string|undefined,
    error: string|undefined
}

export const useGHTokenFetching = (): UseGHToken => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [token, setToken] = useState<string|undefined>("")
    const [error, setError] = useState<string|undefined>("")

    useEffect(() => {
        const fetchToken = async () => {
            const resp = await getToken();
            
            if (resp.success) setToken(resp.data)
            if (!resp.success) setError(resp.error)
                
            setIsLoading(false)
        }

        try {
            setIsLoading(true)
            fetchToken()
            
        } catch (err) {
            setIsLoading(false)
            setError(JSON.stringify(err))
        }
        
    }, [])

    return {
        isLoading,
        error,
        token
    }
}
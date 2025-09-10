import { useState, useEffect, useContext } from 'react';
import { storeToken, getToken, deleteGHToken } from '../services/ghToken'
import { GetTextResponse } from "contracts";
import NavigationContext from '../common/navigationContext'
import { VIEW } from '../common/constants'

type UseGHTokenSaving = {
    saveToken: (payload: {token: string}) => Promise<void>,
    isSaving: boolean,
    error: string
}

export const useGHTokenSaving = (): UseGHTokenSaving => {
    const [isSaving, setIsSaving] = useState<boolean>(false)
    const [error, setError] = useState<string>("")
    const context = useContext(NavigationContext);

    const saveToken = async (payload: {token: string}) => {
        setIsSaving(true);
        
        try {
            const data:GetTextResponse = await storeToken(payload)
            data.success ? context?.setCurrentView(VIEW.GHToken) : setError(data.error || "Error");
            setIsSaving(false);
            
        } catch(err) {
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
    error: string|undefined,
    goRepositories: () => void,
    resetToken: () => void
}

export const useGHTokenFetching = (): UseGHToken => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [token, setToken] = useState<string|undefined>("")
    const [error, setError] = useState<string|undefined>("")
    const context = useContext(NavigationContext);

    const goRepositories = () => {
        context?.setCurrentView(VIEW.Repositories)
    }

    const resetToken = async () => {
        setIsLoading(true);
        await deleteGHToken();
        context?.setCurrentView(VIEW.GHTokenForm)
    }

    const maskToken = (value: string | undefined): string | undefined => {
        if (!value) return value;
        const marker = value.length - 5;
        const umasked1 = value.slice(0, 15);
        const unmasked2 = value.slice(marker, value.length);
        
        return umasked1 + "*********************" + unmasked2;
    }

    useEffect(() => {
        const fetchToken = async () => {
            const resp = await getToken();

            if (resp.success) setToken(maskToken(resp.data))
            if (!resp.success) setError(resp.error)
                
            setIsLoading(false)

            if (resp.success && !resp.data) context?.setCurrentView(VIEW.GHTokenForm)
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
        token,
        goRepositories,
        resetToken
    }
}
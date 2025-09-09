import { useGHTokenFetching } from '../../hooks/useGhToken'
import { GHTokenForm } from './GHTokenForm'
import { 
    ErrorMessage
 } from '@forge/react';

export const GHToken = () => {
    const {isLoading, token, error} = useGHTokenFetching()
    
    if (!token && !isLoading) {
        return <GHTokenForm />
    }
    return (
        <>
            {isLoading && <>{"Loading..."}</>}
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {!isLoading && token && <>{`This is your token ${token}`}</> }
        </>
         
    )
}
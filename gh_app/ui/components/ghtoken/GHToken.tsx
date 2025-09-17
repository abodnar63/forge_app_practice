import { useGHTokenFetching } from '../../hooks/useGhToken'
import { Box, Button, Inline, ErrorMessage } from "@forge/react"
import { TokenResetModal } from './TokenResetModal'

export const GHToken = () => {
    const {
        isLoading,
        token,
        error,
        goRepositories,
        resetToken,
        closeModal,
        isResetModalOpen,
        resetHandler
    } = useGHTokenFetching()

    if (isLoading) {
        return <>Loading...</>
    }

    if (error) {
        return <ErrorMessage>{error}</ErrorMessage>
    }
    
    return (
        <>
            <Box>{`This is your GH token ${token}`}</Box>
            <Inline spread='space-between'>
                <Button onClick={resetHandler}>Reset</Button>
                <Button onClick={goRepositories} appearance="primary">Repositories</Button>
            </Inline>
            {isResetModalOpen && (
                <TokenResetModal close={closeModal} confirm={resetToken}/>
            )}
        </>
    )
}
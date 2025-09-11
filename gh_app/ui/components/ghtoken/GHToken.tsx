import { useGHTokenFetching } from '../../hooks/useGhToken'
import { Box, Button, Inline, ErrorMessage } from "@forge/react"

export const GHToken = () => {
    const { isLoading, token, error, goRepositories, resetToken } = useGHTokenFetching()

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
                <Button onClick={resetToken}>Reset</Button>
                <Button onClick={goRepositories} appearance="primary">Repositories</Button>
            </Inline>
        </>
    )
}
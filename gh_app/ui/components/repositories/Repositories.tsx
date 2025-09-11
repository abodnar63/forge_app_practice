import { ErrorMessage, Inline, Text } from "@forge/react"
import { RepositoryCard } from './Repository'

import { useRepositories } from '../../hooks/useRepositories'

export const Repositories = () => {
    const { isLoading, repositories, error } = useRepositories();
    if (isLoading) {
        return <>Loading...</>
    }

    if (error) {
        return <ErrorMessage>{error}</ErrorMessage>
    }

    const renderRepositories = () => {
        return repositories.map(repo => <RepositoryCard key={repo.id} repo={repo} />)
    }

    if (!repositories.length) {
        return <Text weight="bold">You have no repositories associated with GH token</Text>
    }

    return (
        <>
            <Text size="large" weight="bold">This is your repositories</Text>
            <Inline shouldWrap alignBlock="stretch" space="space.100">{renderRepositories()}</Inline>
        </>)
} 
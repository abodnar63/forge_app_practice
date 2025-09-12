import { RepositoryPayload } from "contracts"
import { Box, Text } from "@forge/react"
import { PullRequests } from "./PullRequests"

type RepositoryCardProps = {
    repo: RepositoryPayload
} 

export const RepositoryCard:React.FC<RepositoryCardProps> = ({ repo }) => {
    return (
        <Box xcss={{
                backgroundColor: 'color.background.discovery',
                borderRadius: 'border.radius',
                borderStyle: 'solid',
                borderWidth: 'border.width',
                borderColor: 'color.border.discovery',
                padding: 'space.200',
                width: '45%'
            }}>
            <Text>Owner: {repo.owner}</Text>
            <Text>Name: {repo.name}</Text>
            <Text>Language: {repo.language}</Text>
            <Text>Size: {repo.size}</Text>
            <PullRequests props={{owner: repo.owner, repo: repo.name}}/>
        </Box>
    )
}
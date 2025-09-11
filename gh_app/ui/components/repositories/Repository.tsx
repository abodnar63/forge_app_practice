import { RepositoryPayload } from "contracts"
import { Box, Text } from "@forge/react"

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
                width: '30%'
            }}>
            <Text>Name: {repo.name}</Text>
            <Text>Language: {repo.language}</Text>
            <Text>Size: {repo.size}</Text>
        </Box>
    )
}
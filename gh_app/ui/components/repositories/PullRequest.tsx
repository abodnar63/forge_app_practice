import { RepoPullPayload } from "contracts"
import { Link, Box, Text, Button, Inline, ErrorMessage } from "@forge/react"
import React from "react"
import { useRepository } from "../../hooks/useRepositories"

type PullRequestViewProps = {
    props: RepoPullPayload
} 

export const PullRequest: React.FC<PullRequestViewProps> = ({props}) => {
    const { isApproving, isMerging, approve, merge, error} = useRepository(props);
    return (
        <Box xcss={{
                backgroundColor: 'color.background.accent.orange.subtler',
                borderRadius: 'border.radius',
                borderStyle: 'solid',
                borderWidth: 'border.width',
                borderColor: 'color.border.accent.green',
                padding: 'space.200'
            }}>
            <Link openNewTab href={props.url}>{props.title}</Link>
            <Text>Owner: {props.owner}</Text>
            <Text>Issue: <Link openNewTab href={props.issue.url}>{props.issue.status}</Link></Text>
                    
            <Inline space="space.200">
                <Button isDisabled={isApproving} onClick={approve} appearance="primary">Approve</Button>
                <Button isDisabled={isMerging} onClick={merge} appearance="primary">Merge</Button>
            </Inline>
            {error && <ErrorMessage>{error}</ErrorMessage>}
        </Box>
    )
}
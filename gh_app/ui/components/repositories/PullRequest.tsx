import { RepoPullPayload } from "contracts"
import { Link, Box, Text } from "@forge/react"
import React from "react"

type PullRequestViewProps = {
    props: RepoPullPayload
} 

export const PullRequest: React.FC<PullRequestViewProps> = ({props}) => {
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
            <Link openNewTab href={props.issue}>Jira Issue</Link>
        </Box>
    )
}
import { RepoPullPayload } from "contracts"
import { Link, Box, Text, LoadingButton, Inline, ErrorMessage } from "@forge/react"
import React from "react"
import { usePullRequest } from "../../hooks/usePullRequests"

type PullRequestViewProps = {
    props: RepoPullPayload,
    merged: (pull: RepoPullPayload) => void
} 

export const PullRequest: React.FC<PullRequestViewProps> = ({props, merged}) => {
    const { isApproving, isMerging, approve, merge, error, isApproved} = usePullRequest(props, merged);
    return (
        <Box xcss={{
                backgroundColor: 'color.background.accent.orange.subtler',
                borderRadius: 'border.radius',
                borderStyle: 'solid',
                borderWidth: 'border.width',
                borderColor: 'color.border.accent.green',
                padding: 'space.200',
                marginBottom: 'space.200'
            }}>
            <Link openNewTab href={props.url}>{props.title}</Link>
            <Text>Owner: {props.owner}</Text>
            <Text>Issue: <Link openNewTab href={props.issue.url}>{props.issue.status}</Link></Text>
                    
            <Inline space="space.200">
                <LoadingButton isDisabled={isApproving || isApproved} isLoading={isApproving} onClick={approve} appearance="primary">Approve</LoadingButton>
                <LoadingButton isDisabled={isMerging} isLoading={isMerging} onClick={merge} appearance="primary">Merge</LoadingButton>
            </Inline>
            {error && <ErrorMessage>{error}</ErrorMessage>}
        </Box>
    )
}
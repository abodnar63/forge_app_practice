import { ErrorMessage, Text } from "@forge/react"
import { usePullRequests } from "../../hooks/usePullRequests"
import { PullRequest } from "./PullRequest"

type PullRequestsProps = {
    props: {
        owner: string
        repo: string
    }
}

export const PullRequests:React.FC<PullRequestsProps> = ({ props }) => {
    const { isLoading, pulls, error } = usePullRequests(props.repo, props.owner)

    if (isLoading) {
        return <>Loading...</>
    }

    if (error) {
        return <ErrorMessage>{error}</ErrorMessage>
    }

    if (!pulls.length) {
        return <Text weight="bold">Has no opened pull requests</Text>
    }

    const renderPullRequests = () => {
        return pulls.map(pull => <PullRequest key={pull.id} props={pull} />)
    }

    return (
        <>
            <Text weight="bold">Pull Requests:</Text>
            {renderPullRequests()}
        </>
    )
}
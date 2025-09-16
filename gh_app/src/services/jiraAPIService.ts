import { JiraIssue } from "contracts";
import { JiraAPIClient } from "../clients";

export const fetchJiraIssue = async (issueKey: string): Promise<JiraIssue | null> => {
    try {
        const issue = await JiraAPIClient.fetchIssue(issueKey);
        const baseURL = await JiraAPIClient.getJiraBaseUrl();
        
        return {
            key: issue.key,
            url: `${baseURL}/browse/${issue.key}`,
            status: issue.fields.status.name
        }
        
    } catch (err){
        console.log(`Error fetching jira issue ${issueKey[1]}`, err)
        return null
    }
}

export const transitionIssueToDone = async (issueKey: string) => {
    try {
        const transitionsData = await JiraAPIClient.fetchIssueTransitions(issueKey)
        const doneTransition = transitionsData.transitions.find((transition: { name: string; }) => transition.name == "Done")
        if (!doneTransition) {
            console.log("Done transition does not exist")
            return;
        }
        await JiraAPIClient.transitionIssue(issueKey, doneTransition.id);
    } catch (err) {
        console.log(`Error transitioning issue to Done ${issueKey}`, err)
    }
}
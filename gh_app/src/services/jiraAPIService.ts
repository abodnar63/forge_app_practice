import { JiraIssue } from "contracts";
import { JiraAPIClient } from "../clients";

export const fetchJiraIssue = async (issueKey: string): Promise<JiraIssue | null> => {
    try {
        const issue = await JiraAPIClient.fetchIssue(issueKey);
        const baseURL = await JiraAPIClient.getJiraBaseUrl();
        return {
            key: issue.key,
            url: `${baseURL}/browse/${issue.key}`
        }
        
    } catch (err){
        console.log(`Error fetching jira issue1 ${issueKey[1]}`, err)
        return null
    }
}
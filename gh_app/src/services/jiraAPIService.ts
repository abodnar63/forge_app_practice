import { JiraIssue } from "contracts";
import { JiraAPIClient } from "../clients";
import { createLogger } from "../shared/logger";

const log = createLogger("Jira API Service")

export const fetchJiraIssue = async (issueKey: string): Promise<JiraIssue | null> => {
    log.info(`fetchJiraIssue: for ${issueKey}`)
    try {
        const issue = await JiraAPIClient.fetchIssue(issueKey);
        const baseURL = await JiraAPIClient.getJiraBaseUrl();
        log.info(`fetchJiraIssue: done for ${issueKey}`)
        return {
            key: issue.key,
            url: `${baseURL}/browse/${issue.key}`,
            status: issue.fields.status.name
        }
        
    } catch (err){
        log.error(`fetchJiraIssue: for ${issueKey} error: ${err}`)
        return null
    }
}

export const transitionIssueToDone = async (issueKey: string) => {
    try {
        log.info(`transitionIssueToDone: for ${issueKey}`)
        const transitionsData = await JiraAPIClient.fetchIssueTransitions(issueKey)
        const doneTransition = transitionsData.transitions.find((transition: { name: string; }) => transition.name == "Done")
        if (!doneTransition) {
            log.warn(`transitionIssueToDone: transition Done does not exist for ${issueKey}`)
            return;
        }
        await JiraAPIClient.transitionIssue(issueKey, doneTransition.id);
    } catch (err) {
        log.error(`transitionIssueToDone: for ${issueKey} error: ${err}`)
    }
}
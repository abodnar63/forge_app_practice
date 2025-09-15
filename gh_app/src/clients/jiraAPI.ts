import { requestJira } from '@forge/bridge';

export class JiraAPIClient {
    static fetchIssue = async (key: string) => {
        const response = await requestJira(`/rest/api/3/issue/${key}`);

        if (!response.ok) throw new Error(`Jira API error ${response.statusText}`);

        return response
    }
}
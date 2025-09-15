import api, { route } from '@forge/api';

export class JiraAPIClient {
    static jiraURL = "";
    static fetchIssue = async (key: string) => {
        const uri = route`/rest/api/3/issue/${key}`;
        const response = await api.asApp().requestJira(uri);

        if (!response.ok) return null;
       
        return await response.json();
    }

    static getJiraBaseUrl = async () => {
        if (this.jiraURL) return this.jiraURL;
        const response = await api.asApp().requestJira(route`/rest/api/3/serverInfo`);
        const results = await response.json();
        this.jiraURL = results.baseUrl;
        return this.jiraURL;
    }
}
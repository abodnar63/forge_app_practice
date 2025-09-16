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

    static fetchIssueTransitions = async (key: string) => {
        const uri = route`/rest/api/3/issue/${key}/transitions`;
        const response = await api.asApp().requestJira(uri);

        if (!response.ok) return null;
       
        return await response.json();
    }

    static transitionIssue = async (key: string, transitionId: string) => {
        const uri = route`/rest/api/3/issue/${key}/transitions`;
        const res = await api.asApp().requestJira(uri, {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify({ transition: { id: transitionId } })
        });

        if (!res.ok) {
            const err = await res.text();
            throw new Error(`Failed to transition issue: ${res.status} ${err}`);
        }

        return true;
    }
}
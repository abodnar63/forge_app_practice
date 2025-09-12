import { 
    GetRepositoriesResponse,
    RepositoryPayload,
    GetRepoPullsResponse,
    RepoPullPayload,
    GetRepoPullsPayload
} from '../../contracts'
import { GHAPIClient } from '../clients'
import { getToken } from './'

export const fetchRepos = async (accountId: string): Promise<GetRepositoriesResponse> => {
    let data;
    try {
        const token = await getToken(accountId);
        if (!token.data) {
            return {
                success: false,
                error: `GH Token is missing`
            };
        }
        data = await GHAPIClient.fetchRepos(token.data);
    } catch (err) {
        return {
            success: false,
            error: `Unable to fetch repositories ${JSON.stringify(err)}`
        };
    }
    const repositories: RepositoryPayload[] = [];

    for (let i = 0; i < data.length; i++) {
        let repo = data[i];
        repositories.push({
            name: repo.name as string,
            id: repo.id,
            language: repo.language,
            size: repo.size,
            owner: repo["owner"]["login"]
        });
    }

    return {
        success: true,
        data: repositories
    }
}

export const fetchRepoPulls = async (accountId: string, payload: GetRepoPullsPayload): Promise<GetRepoPullsResponse> => {
    let data;
    try {
        const token = await getToken(accountId);
        if (!token.data) {
            return {
                success: false,
                error: `GH Token is missing`
            };
        }
        data = await GHAPIClient.fetchRepoPulls(token.data, payload.repo, payload.owner);
    } catch (err) {
        return {
            success: false,
            error: `Unable to fetch pull requests ${JSON.stringify(err)}`
        };
    }

    const pulls: RepoPullPayload[] = []

    for (let i = 0; i < data.length; i++) {
        let pull = data[i];
        if (data[i].state !== "open") continue;
        pulls.push({
            title: pull.title,
            state: pull.state,
            id: pull.id,
            owner: pull["user"]["login"],
            url: pull["html_url"]
        });
    }

    return {
        success: true,
        data: pulls
    }
}
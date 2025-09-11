import { GetRepositoriesResponse, RepositoryPayload } from '../../contracts'
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
            size: repo.size
        });
    }

    return {
        success: true,
        data: repositories
    }
}
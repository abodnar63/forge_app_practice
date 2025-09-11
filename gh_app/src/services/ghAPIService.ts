import { GetRepositoriesResponse, Repository } from '../../contracts'
import { GHAPIClient } from '../clients'

export const fetchRepos = async (token: string): Promise<GetRepositoriesResponse> => {
    let data;
    try {
        data = await GHAPIClient.fetchRepos(token);
    } catch (err) {
        return {
            success: false,
            error: `Unable to fetch repositories ${JSON.stringify(err)}`
        };
    }
    const repositories: Repository[] = [];
    
    for (let i = 0; i < data.length; i++) {
        let repo = data[i];
        repositories.push({
            name: repo.name as string,
            id: repo.id,
            language: repo.lenguage,
            size: repo.size
        });
    }

    return {
        success: true,
        data: repositories
    }
}
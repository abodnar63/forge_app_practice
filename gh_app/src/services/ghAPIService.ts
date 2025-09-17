import { 
    GetRepositoriesResponse,
    RepositoryPayload,
    GetRepoPullsResponse,
    RepoPullPayload,
    GetRepoPullsPayload,
    JiraIssue,
    ResolverResponse
} from '../../contracts'
import { GHAPIClient } from '../clients'
import { getToken, fetchJiraIssue } from './'
import { createLogger } from '../shared/logger'

const log = createLogger("Github Service")

export const fetchRepos = async (accountId: string): Promise<GetRepositoriesResponse> => {
    let data;
    log.info(`fetchRepos: calling for ${accountId}`)
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
        log.error(`Failed fetchRepos for ${accountId} error: ${err}`)
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

    log.info(`fetchRepos: returns ${repositories.length} repos for ${accountId}`)

    return {
        success: true,
        data: repositories
    }
}

export const fetchRepoPulls = async (accountId: string, payload: GetRepoPullsPayload): Promise<GetRepoPullsResponse> => {
    let data;
    log.info(`fetchRepoPulls: calling for ${accountId} and repo ${payload.repo}`)
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
        log.error(`fetchRepoPulls: Failed  for ${accountId} and repo: ${payload.repo} with error: ${err}`)
        return {
            success: false,
            error: `Unable to fetch pull requests ${JSON.stringify(err)}`
        };
    }

    const pulls: RepoPullPayload[] = []

    for (const pull of data) {
        const issue = await getIssueFromPull(pull);
        if (!issue) continue;
        if (pull.state !== "open") continue;
        
        pulls.push({
            title: pull.title,
            state: pull.state,
            repo: payload.repo,
            id: pull.id,
            number: pull.number,
            owner: pull["user"]["login"],
            url: pull["html_url"],
            issue: issue
        });
    }

    log.info(`fetchRepoPulls: returns ${pulls.length} pulls for ${accountId} repo: ${payload.repo}`)

    return {
        success: true,
        data: pulls
    }
}

// Assuming that we use following format for pull request titles '[issue-key]: description'
export const getIssueFromPull = async (pull : { title: string }): Promise<JiraIssue | null> => {
    const issueKey = pull.title.match(/\[(.*?)\]/);
    log.info(`getIssueFromPull: searching for issue ${pull.title}`)
    if (!issueKey || !issueKey[1]) return null;

    try {
        const issue = await fetchJiraIssue(issueKey[1]);
        return issue;
    } catch (err){
        log.error(`getIssueFromPull: Error fetching jira issue "${issueKey[1]}"`, err)
        return null
    }
}

export const mergeRepoPull = async (accountId: string, pull: RepoPullPayload): Promise<ResolverResponse> => {
    log.info(`mergeRepoPull: requested by ${accountId} for pull ${pull.title}`)
    try {
        const token = await getToken(accountId);
        if (!token.data) {
            return {
                success: false,
                error: `GH Token is missing`
            };
        }
        await GHAPIClient.mergeRepoPull(token.data, pull.owner, pull.repo, pull.number);
        log.info(`mergeRepoPull: done by ${accountId} for pull ${pull.title}`)
    } catch (err) {
        log.error(`mergeRepoPull: failed by ${accountId} for pull ${pull.title} error: ${err}`)
        return {
            success: false,
            error: `Unable to fetch pull requests ${err}}`
        };
    }

    return {
        success: true
    }
}

export const approveRepoPull = async (accountId: string, pull: RepoPullPayload): Promise<ResolverResponse> => {
    log.info(`approveRepoPull: requested by ${accountId} for pull ${pull.title}`)
    try {
        const token = await getToken(accountId);
        if (!token.data) {
            return {
                success: false,
                error: `GH Token is missing`
            };
        }
        await GHAPIClient.approveRepoPull(token.data, pull.owner, pull.repo, pull.number);
        log.info(`mergeRepoPull: done by ${accountId} for pull ${pull.title}`)
    } catch (err) {
        log.error(`approveRepoPull: failed by ${accountId} for pull ${pull.title} error: ${err}`)
        return {
            success: false,
            error: `Unable to approve pull request ${err}`
        };
    }

    return {
        success: true
    }
}
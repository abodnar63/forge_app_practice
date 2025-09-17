import api from '@forge/api';

export class GHAPIClient {
  static readonly HOST = 'https://api.github.com';
  static readonly REPOS_URI = this.HOST + '/user/repos';
  static readonly VERSION = '2022-11-28';

  static fetchRepos = async (token: string) => {
    const response = await api.fetch(this.REPOS_URI, {
      method: 'GET',
      headers: {
        'Accept': 'application/vnd.github+json',
        'Authorization': `token ${token}`,
        'X-GitHub-Api-Version': this.VERSION,
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    
    return data;
  }

  static fetchRepoPulls = async (token: string, name: string, owner: string) => {
    const uri = this.HOST + `/repos/${owner}/${name}/pulls`
    
    const response = await api.fetch(uri, {
      method: 'GET',
      headers: {
        'Accept': 'application/vnd.github+json',
        'Authorization': `token ${token}`,
        'X-GitHub-Api-Version': this.VERSION,
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    
    return data;
  }

  static mergeRepoPull = async (token: string, owner: string, repo: string, pullNumber: number) => {
    const response = await fetch(`${this.HOST}/repos/${owner}/${repo}/pulls/${pullNumber}/merge`, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': this.VERSION
      }
    });

    if (!response.ok) {
      throw new Error(`GitHub merge failed: ${response.status} ${await response.text()}`);
    }

    return await response.json();
  }

  static approveRepoPull = async (token: string, owner: string, repo: string, pullNumber: number) => {
    const uri = `${this.HOST}/repos/${owner}/${repo}/pulls/${pullNumber}/reviews`;
    const response = await fetch(uri, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': this.VERSION
      },
      body: JSON.stringify({ event: 'APPROVE' })
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`GitHub PR approval failed: ${response.status} ${err}`);
    }

    return await response.json();
  }
}
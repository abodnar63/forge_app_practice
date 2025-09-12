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

    // console.log("GH Repos", data)
    
    return data;
  }

  static fetchRepoPulls = async (token: string, name: string, owner: string) => {
    const uri = this.HOST + `/repos/${owner}/${name}/pulls`
    console.log("fetchRepoPulls", uri)
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

    // console.log("GH Pulls", name, data)
    
    return data;
  }
}
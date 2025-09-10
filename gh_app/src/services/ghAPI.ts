import api from '@forge/api';

const HOST = 'https://api.github.com';
const REPOS_URI = HOST + '/user/repos';

export const fetchRepos = async (token: string) => {
  const response = await api.fetch(REPOS_URI, {
    method: 'GET',
    headers: {
      'Accept': 'application/vnd.github+json',
      'Authorization': `token ${token}`,
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });

  if (!response.ok) {
    console.log('Error fetchRepos', response)
    throw new Error(`GitHub API request failed: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}
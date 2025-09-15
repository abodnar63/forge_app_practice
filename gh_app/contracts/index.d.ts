export type ResolverResponse<T = any> = {
  success: boolean;
  error?: string;
  data?: T;
};

export type GetTextResponse = ResolverResponse<string>;

export type SaveTokenPayload = { token: string }

export type RepositoryPayload = {
  id: string,
  name: string,
  language: string,
  size: number,
  owner: string
}

export type GetRepoPullsPayload = {
  repo: string
  owner: string
}

export type RepoPullPayload = {
  title: string,
  state: string,
  id: string,
  owner: string,
  url: string,
  issue: JiraIssue
}

export type GetRepositoriesResponse = ResolverResponse<List<RepositoryPayload>>

export type GetRepoPullsResponse = ResolverResponse<List<RepoPullPayload>>

export type JiraIssue = {
  key: string,
  url: string,
  status: string
}
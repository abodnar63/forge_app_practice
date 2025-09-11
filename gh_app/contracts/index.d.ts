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
  size: number
}

export type GetRepositoriesResponse = ResolverResponse<List<RepositoryPayload>>
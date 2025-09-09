export type ResolverResponse<T = any> = {
  success: boolean;
  error?: string;
  data?: T;
};

export type GetTextResponse = ResolverResponse<string>
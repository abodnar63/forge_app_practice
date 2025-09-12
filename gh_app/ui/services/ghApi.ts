import { invoke } from "@forge/bridge";
import { GetRepositoriesResponse, GetRepoPullsPayload, GetRepoPullsResponse } from "contracts";

export const fetchRepositories = (): Promise<GetRepositoriesResponse> => {
  return invoke("fetchRepositories");
};

export const fetchRepoPulls = (payload: GetRepoPullsPayload): Promise<GetRepoPullsResponse> => {
  return invoke("fetchRepoPulls", payload);
};
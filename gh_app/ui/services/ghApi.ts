import { invoke } from "@forge/bridge";
import { GetRepositoriesResponse, GetRepoPullsPayload, GetRepoPullsResponse, RepoPullPayload, ResolverResponse } from "contracts";

export const fetchRepositories = (): Promise<GetRepositoriesResponse> => {
  return invoke("fetchRepositories");
};

export const fetchRepoPulls = (payload: GetRepoPullsPayload): Promise<GetRepoPullsResponse> => {
  return invoke("fetchRepoPulls", payload);
};

export const approveRepoPull = (payload: RepoPullPayload): Promise<ResolverResponse> => {
    return invoke("approvePull", payload)
}

export const mergeRepoPull = (payload: RepoPullPayload): Promise<ResolverResponse> => {
    return invoke("mergePull", payload)
}
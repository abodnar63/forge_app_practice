import { invoke } from "@forge/bridge";
import { GetRepositoriesResponse } from "contracts";

export const fetchRepositories = (): Promise<GetRepositoriesResponse> => {
  return invoke("fetchRepositories");
};
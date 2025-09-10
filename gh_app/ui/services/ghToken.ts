import { invoke } from "@forge/bridge";
import { SaveTokenPayload, GetTextResponse, ResolverResponse } from "contracts";

export const storeToken = (payload: SaveTokenPayload): Promise<ResolverResponse> => {
  return invoke("saveGHToken", payload );
};

export const getToken = (): Promise<GetTextResponse> => {
  return invoke("getGHToken");
};

export const deleteGHToken = (): Promise<ResolverResponse> => {
  return invoke("deleteGHToken");
};
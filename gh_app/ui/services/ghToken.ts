import { invoke } from "@forge/bridge";
import { SaveTokenPayload, GetTextResponse } from "contracts";

export const storeToken = (payload: SaveTokenPayload): Promise<GetTextResponse> => {
  return invoke("saveGHToken", payload );
};

export const getToken = (): Promise<GetTextResponse> => {
  return invoke("getGHToken");
};
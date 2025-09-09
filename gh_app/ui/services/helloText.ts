import { invoke } from "@forge/bridge";
import { GetTextResponse } from "contracts";

export const getText = ({
  example,
}: {
  example: string;
}): Promise<GetTextResponse> => {
  return invoke("getText", { example } );
};
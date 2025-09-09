import kvs from "@forge/kvs";
import { GetTextResponse } from 'contracts'

const prefix = "gh-";

export const setToken = async (key: string, value: string): Promise<GetTextResponse> => {
  try {
    console.log("setToken", key, value)
    await kvs.setSecret(prefix+key, value);

    return {
      success: true,
    };
  } catch (e) {
    console.log(`Error while setting data in storage`, e);

    return {
      success: false,
    };
  }
};

export const getToken = async (key: string): Promise<GetTextResponse> => {
  try {
    const value: string = await kvs.getSecret(prefix+key) as string;

    return {
      success: true,
      data: value,
    };
  } catch (e) {
    console.log(`Error while getting data in storage`);

    return {
      success: false,
    };
  }
};
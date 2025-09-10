import kvs from "@forge/kvs";
import { GetTextResponse, ResolverResponse } from 'contracts'
import { fetchRepos } from './'

const prefix = "gh-";

export const setToken = async (key: string, value: string): Promise<ResolverResponse> => {
    // Token validation
    try {
        await fetchRepos(value);
    } catch (err){
        console.log("Error token validation", err)
        return {
            success: false,
            error: 'Invalid Token'
        };
    }
    try {
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

export const resetToken = async (key: string): Promise<ResolverResponse> => {
    try {
    await kvs.deleteSecret(prefix+key);

    return {
      success: true,
    };
  } catch (e) {
    console.log(`Error while removing data in storage`, e);

    return {
      success: false,
    };
  } 
}

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
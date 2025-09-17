import kvs from "@forge/kvs";
import { GetTextResponse, ResolverResponse } from 'contracts'
import { GHAPIClient } from '../clients'
import { createLogger } from '../shared/logger'

const log = createLogger("Github Token Storage")

const prefix = "gh-";

export const setToken = async (key: string, value: string): Promise<ResolverResponse> => {
    log.info(`setToken: for ${key}`)
    // Token validation
    try {
      await GHAPIClient.fetchRepos(value);
    } catch (err){
        log.error("setToken: Error token validation", err)
        return {
            success: false,
            error: 'Invalid Token'
        };
    }
    try {
        await kvs.setSecret(prefix+key, value);
        log.info(`setToken: done for ${key}`)
        return {
            success: true,
        };
    } catch (e) {
        log.error(`setToken: Error while setting data in storage`, e);

        return {
            success: false,
        };
    }
};

export const resetToken = async (key: string): Promise<ResolverResponse> => {
  log.info(`resetToken: for ${key}`)
  try {
    await kvs.deleteSecret(prefix+key);
    log.info(`resetToken: done for ${key}`)
    return {
      success: true,
    };
  } catch (e) {
    log.error(`resetToken: for ${key} error: ${e}`);

    return {
      success: false,
    };
  } 
}

export const getToken = async (key: string): Promise<GetTextResponse> => {
  log.info(`getToken: for ${key}`)
  try {
    const value: string = await kvs.getSecret(prefix+key) as string;
    log.info(`getToken: done for ${key}`)
    return {
      success: true,
      data: value,
    };
  } catch (e) {
    log.error(`getToken: for ${key} error: ${e}`);

    return {
      success: false,
    };
  }
};
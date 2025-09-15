import Resolver, { Request } from '@forge/resolver';
import { GetRepoPullsPayload, SaveTokenPayload } from 'contracts'
import { getToken, setToken, resetToken, fetchRepos, fetchRepoPulls } from '../services'

const resolver = new Resolver();

resolver.define('saveGHToken', (req: Request<SaveTokenPayload>) => {
  const accountId = req.context.accountId;
  const { token } = req.payload
  
  return setToken(accountId, token)
})

resolver.define('getGHToken', (req: Request) => {
  const accountId = req.context.accountId;

  return getToken(accountId);
})

resolver.define('deleteGHToken', (req: Request) => {
  const accountId = req.context.accountId;

  return resetToken(accountId);
})

resolver.define('fetchRepositories', (req: Request) => {
  const accountId = req.context.accountId;

  return fetchRepos(accountId);
})

resolver.define('fetchRepoPulls', (req: Request<GetRepoPullsPayload>) => {
  const accountId = req.context.accountId;

  return fetchRepoPulls(accountId, req.payload)
})

export const handler = resolver.getDefinitions();

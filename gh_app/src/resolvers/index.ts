import Resolver, { Request } from '@forge/resolver';
import { GetRepoPullsPayload, RepoPullPayload, SaveTokenPayload } from 'contracts'
import { 
  getToken,
  setToken,
  resetToken,
  fetchRepos,
  fetchRepoPulls,
  mergeRepoPull,
  approveRepoPull
} from '../services'

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

resolver.define('mergePull', (req: Request<RepoPullPayload>) => {
  const accountId = req.context.accountId;

  return mergeRepoPull(accountId, req.payload)
})

resolver.define('approvePull', (req: Request<RepoPullPayload>) => {
  const accountId = req.context.accountId;

  return approveRepoPull(accountId, req.payload)
})

export const handler = resolver.getDefinitions();

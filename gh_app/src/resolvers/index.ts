import Resolver, { Request } from '@forge/resolver';
import { getText } from '../services'
import { SaveTokenPayload } from 'contracts'
import { getToken, setToken, resetToken, fetchRepos } from '../services'

const resolver = new Resolver();

resolver.define('getText', (req: Request) => {
  return getText(req);
});

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

export const handler = resolver.getDefinitions();

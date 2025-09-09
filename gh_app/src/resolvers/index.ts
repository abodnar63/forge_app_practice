import Resolver, { Request } from '@forge/resolver';
import { getText } from '../services'
import { SaveTokenPayload } from 'contracts'
import { getToken, setToken } from '../services'

const resolver = new Resolver();

resolver.define('getText', (req: Request) => {
  return getText(req);
});

resolver.define('saveGHToken', (req: Request<SaveTokenPayload>) => {
  const accountId = req.context.accountId;
  const { token } = req.payload
  console.log('saveGHToken', req.payload, req.context)
  return setToken(accountId, token)
})

resolver.define('getGHToken', (req: Request) => {
  const accountId = req.context.accountId;

  return getToken(accountId);
})

export const handler = resolver.getDefinitions();

import Resolver, { Request } from '@forge/resolver';
import { getText } from '../services'

const resolver = new Resolver();

resolver.define('getText', (req: Request) => {
  return getText(req);
});

export const handler = resolver.getDefinitions();

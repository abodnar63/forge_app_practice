import { Request } from '@forge/resolver';
import { GetTextResponse } from 'contracts'

export const getText = (req: Request): GetTextResponse => {
    const { example } = req.payload;
    return {
        success: true,
        data: `Hello, ${example}`
    };
}
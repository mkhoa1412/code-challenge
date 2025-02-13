import { Cradle } from '@/container';

export class BaseController {
    logger: Cradle['logger']

    constructor(deps: Cradle, opts: {
        ns: string,
    }) {
        this.logger = deps.logger.child({
            ns: opts.ns,
        });
    }
}
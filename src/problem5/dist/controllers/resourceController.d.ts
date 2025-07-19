import { Request, Response } from 'express';
export declare class ResourceController {
    private resourceModel;
    constructor();
    createResource: (req: Request, res: Response) => Promise<void>;
    getResources: (req: Request, res: Response) => Promise<void>;
    getResourceById: (req: Request, res: Response) => Promise<void>;
    updateResource: (req: Request, res: Response) => Promise<void>;
    deleteResource: (req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=resourceController.d.ts.map
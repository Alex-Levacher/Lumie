import { Request, Response } from 'express';

export const basicActionMethod = (req: Request, res: Response) => res.json('OK');

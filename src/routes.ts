import { Router, Response, Request } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => res.json({ message: 'test' }));

export default router;

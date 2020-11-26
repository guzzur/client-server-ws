import { Router, Request, Response, NextFunction } from 'express';

// Init router
const router = Router();

// Add sub-routes
router.use('/api', (req: Request, res: Response, next: NextFunction) => {
  res.send({ msg: 'success' });
});

// Export the base-router
export default router;

import { Router, Request, Response } from 'express';
import { getDb } from 'src/mock/db';
import { WorkspaceStatus } from 'src/types/Workspace';

const db = getDb();

// Init router
const router = Router();

// Events
router.get('/events', (req: Request, res: Response) => {
  const events = db.getEvents();
  res.send({ events });
});
router.post('/events', (req: Request, res: Response) => {
  const { name } = req.body;
  const event = db.addEvent({ name });
  res.send({ event });
});

// Workspaces
router.get('/workspaces', (req: Request, res: Response) => {
  const workspaces = db.getWorkspaces();
  res.send({ workspaces });
});
router.put('/events/:eventId/workspaces/:workspaceId', (req: Request, res: Response) => {
  const { eventId, workspaceId } = req.params;
  const { owner, status = WorkspaceStatus.PREPARING } = req.body;
  const workspace = db.updateWorkspace(eventId, workspaceId, { owner, status });
  res.send({ workspace });
});
router.get('/events/:eventId/workspaces', (req: Request, res: Response) => {
  const { eventId } = req.params;
  const workspaces = db.getWorkspacesByEventId(eventId);
  res.send({ workspaces });
});
router.post('/events/:eventId/workspaces', (req: Request, res: Response) => {
  const { eventId } = req.params;
  const { owner, status = WorkspaceStatus.PREPARING } = req.body;
  const createdAt = new Date();
  const workspaces = db.addWorkspaceToEvent(eventId, { owner, createdAt, status });
  res.send({ workspaces });
});

// Export the base-router
export default router;

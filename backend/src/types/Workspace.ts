import { EventId } from 'types/Event';

export type WorkspaceId = string;

export enum WorkspaceStatus {
  OFFLINE = 'offline',
  PREPARING = 'preparing',
  READY = 'ready',
  TERMINATED = 'terminated',
  DELETED = 'deleted',
}

export interface IWorkspace {
  eventId?: EventId;
  id?: WorkspaceId;
  owner: string;
  status: WorkspaceStatus;
  createdAt: Date;
}

export enum WorkspaceStatus {
  OFFLINE = 'offline',
  PREPARING = 'preparing',
  READY = 'ready',
  TERMINATED = 'terminated',
  DELETED = 'deleted',
}

export interface IWorkspace {
  eventId?: string;
  id?: string;
  owner: string;
  status: WorkspaceStatus;
  createdAt: Date;
}

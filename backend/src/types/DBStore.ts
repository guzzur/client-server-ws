import { EventId, IEvent } from './Event';
import { IWorkspace, WorkspaceId } from './Workspace';

export type DBStore = {
  getEvents: () => IEvent[];
  getEvent: (id: String) => IEvent | {};
  addEvent: (event: IEvent) => IEvent;
  getWorkspaces: () => IWorkspace[];
  getWorkspacesByEventId: (eventId: EventId) => IWorkspace[];
  getWorkspace: (workspaceId: WorkspaceId) => IWorkspace | {};
  addWorkspaceToEvent: (eventId: EventId, workspace: IWorkspace) => IWorkspace;
  updateWorkspace: (eventId: EventId, workspaceId: WorkspaceId, workspace: IWorkspace) => IWorkspace | {};
};

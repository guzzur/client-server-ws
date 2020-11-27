import { IWorkspace } from 'types/Workspace';

export enum WSMessageType {
  WORKSPACE_LIST = 'WORKSPACE_LIST',
  CONNECTION_CHANGED = 'CONNECTION_CHANGED',
}

export type WSMessage = {
  type: WSMessageType;
  data: IWorkspace[] | string;
};

import { atom } from 'recoil';
import { IWorkspace } from '../types/Workspace';

export const isAppLoadedState = atom<boolean>({
  key: 'isAppLoadedState',
  default: false,
});

export const workspaceListState = atom<IWorkspace[]>({
  key: 'workspaceListState',
  default: [],
});

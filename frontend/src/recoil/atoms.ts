import { atom } from 'recoil';

export const isAppLoadedState = atom<boolean>({
  key: 'isAppLoadedState',
  default: false,
});

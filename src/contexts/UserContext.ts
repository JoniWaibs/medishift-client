import { create } from 'zustand';

import { UserBasicInfo } from '@/models';

export interface UserStore {
  user: UserBasicInfo | null;
  isAuthenticated: boolean;
  setUser: (user: UserBasicInfo | null) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  isAuthenticated: true,
  setUser: (user: UserBasicInfo | null) => set(() => ({ user })),
}));

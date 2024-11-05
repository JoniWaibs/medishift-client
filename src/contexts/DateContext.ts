import { create } from 'zustand';

export interface DateStore {
  startDate: Date;
  endDate: Date;
  currentDate: Date;
  updateStart: (startDate: Date) => void;
  updateEnd: (endDate: Date) => void;
  updateCurrent: (currentDate: Date) => void;
}

export const useDateStore = create<DateStore>((set) => ({
  startDate: new Date(),
  endDate: new Date(),
  currentDate: new Date(),
  updateStart: (startDate: Date) => set(() => ({ startDate })),
  updateEnd: (endDate: Date) => set(() => ({ endDate })),
  updateCurrent: (currentDate: Date) => set(() => ({ currentDate })),
}));

import { create } from 'zustand'
import { format } from 'date-fns';

export interface DateStore {
    startDate: string;
    endDate: string;
    updateStart: (startDate: string) => void;
    updateEnd: (endDate: string) => void;
}

export const useDateStore = create<DateStore>((set) => ({
    startDate: format(Date.now(), 'yyyy-MM-dd'),
    endDate: format(Date.now(), 'yyyy-MM-dd'),
    updateStart: (startDate: string) => set(() => ({ startDate })),
    updateEnd: (endDate: string) => set(() => ({ endDate }))
}))
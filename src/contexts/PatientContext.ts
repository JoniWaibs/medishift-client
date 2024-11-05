import { create } from 'zustand';

import { Patient } from '../models';

export interface PatientStore {
  patients: Patient[];
  setPatients: (patients: Patient[]) => void;
}

export const usePatientStore = create<PatientStore>((set) => ({
  patients: [],
  setPatients: (patients: Patient[]) => set(() => ({ patients })),
}));

import { QueryType } from '../enums';

import { Shift } from './shift';

export interface SignInProps {
  password: string;
  email: string;
}

export interface SignUpProps {
  password: string;
  email: string;
  name: string;
  lastName: string;
  specialization: string;
  licenseNumber: string;
}

export type CreateShiftProps = Pick<
  Shift,
  | 'doctorId'
  | 'patientId'
  | 'date'
  | 'startTime'
  | 'endTime'
  | 'appointmentType'
  | 'notes'
  | 'payment'
>;

export type SearchShiftProps = {
  type?: QueryType;
  values?: Record<string, string>;
};

export type SearchPatientProps = {
  type?: QueryType;
  value?: string;
};

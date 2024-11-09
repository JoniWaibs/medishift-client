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

export type ServiceShiftProps = Pick<
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

export type SearchProps = {
  type?: QueryType;
  value?: string | Record<string, string>;
};

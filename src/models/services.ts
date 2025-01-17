import { QueryType } from '@/enums';
import { Shift } from '@/models/shift';
import { Doctor } from '@/models/user';

export interface SignInProps {
  password: string;
  email: string;
}

export interface SignUpProps extends Doctor {}

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

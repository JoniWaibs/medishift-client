import { AxiosResponse } from 'axios';

import {
  Patient,
  Shift,
  CreateShiftProps,
  SignInProps,
  SearchShiftProps,
  SearchPatientProps,
} from '../models';

import { BaseService } from './base';

export class AuthService extends BaseService {
  async signIn({ password, email }: SignInProps): Promise<AxiosResponse> {
    return this.post('auth/sign-in', { password, email });
  }

  //async signUp({ password, email, licenseNumber, name, lastName, specialization }: SignUpProps): Promise<AxiosResponse> {
  //    console.log(password, email, licenseNumber, name, lastName, specialization)
  //}
}

export class ShiftService extends BaseService {
  async getShifts({
    startDate,
    endDate,
  }: {
    startDate: string;
    endDate: string;
  }): Promise<AxiosResponse<Shift[]>> {
    return this.get('shift/all', { startDate, endDate });
  }
  async createShift(shift: CreateShiftProps): Promise<AxiosResponse> {
    return this.post('shift/create', shift);
  }

  async search(query?: SearchShiftProps): Promise<AxiosResponse<Shift[]>> {
    const queryString = Object.entries(query?.values || {})
      .map(([key, value]) => `${key}=${value}`)
      .join('&');

    return this.get(`shift${queryString ? `?${queryString}` : ''}`);
  }
}

export class UserService extends BaseService {
  async search(query?: SearchPatientProps): Promise<AxiosResponse<Patient[]>> {
    return this.get(
      `/user/patient${query ? `?${query.type}=${query.value}` : ''}`,
    );
  }
}

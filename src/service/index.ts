import { AxiosResponse } from 'axios';

import {
  Patient,
  Shift,
  ServiceShiftProps,
  SignInProps,
  SearchProps,
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
  async createShift(shift: ServiceShiftProps): Promise<AxiosResponse> {
    return this.post('shift/create', shift);
  }

  async search(query?: SearchProps): Promise<AxiosResponse<Shift[]>> {
    const queryString = Object.entries(query?.value || {})
      .map(([key, value]) => `${key}=${value}`)
      .join('&');

    return this.get(`shift${queryString ? `?${queryString}` : ''}`);
  }

  async updateShift(shift: ServiceShiftProps): Promise<AxiosResponse> {
    return this.put('shift/update', shift);
  }
}

export class UserService extends BaseService {
  async search(query?: SearchProps): Promise<AxiosResponse<Patient[]>> {
    return this.get(
      `/user/patient${query ? `?${query.type}=${query.value}` : ''}`,
    );
  }
}

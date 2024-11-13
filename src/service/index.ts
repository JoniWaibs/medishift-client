import { AxiosResponse } from 'axios';

import {
  Patient,
  Shift,
  ServiceShiftProps,
  SignInProps,
  SearchProps,
  SignUpProps,
} from '../models';

import { BaseService } from './base';

export class AuthService extends BaseService {
  async signIn({ password, email }: SignInProps): Promise<AxiosResponse> {
    return this.post('auth/sign-in', { password, email });
  }

  async currentUser(): Promise<AxiosResponse> {
    return this.get('auth/current-user');
  }

  async signUp(payload: SignUpProps): Promise<AxiosResponse> {
    return this.post('auth/sign-up', payload);
  }
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

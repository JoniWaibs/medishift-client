import { AxiosResponse } from 'axios';

import { SearchProps, Patient } from '@/models';
import { BaseService } from '@/services/base';

export class UserService extends BaseService {
  async search(
    query?: SearchProps,
    type?: 'patient' | 'doctor',
  ): Promise<AxiosResponse<Patient[]>> {
    console.log({ query, type });
    return this.get(
      `user/${type}${query ? `?${query.type}=${query.value}` : ''}`,
    );
  }

  async deletePatient(id: string): Promise<AxiosResponse<boolean>> {
    return this.delete(`user/patient/delete/${id}`);
  }
}

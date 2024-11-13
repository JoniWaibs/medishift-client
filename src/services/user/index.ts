import { AxiosResponse } from 'axios';

import { SearchProps, Patient } from '@/models';
import { BaseService } from '@/services/base';

export class UserService extends BaseService {
  async search(query?: SearchProps): Promise<AxiosResponse<Patient[]>> {
    return this.get(
      `/user/patient${query ? `?${query.type}=${query.value}` : ''}`,
    );
  }
}

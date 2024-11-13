import { AxiosResponse } from 'axios';

import { ServiceShiftProps, SearchProps, Shift } from '@/models';
import { BaseService } from '@/services/base';

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

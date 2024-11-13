import { AxiosResponse } from 'axios';

import { SignInProps, SignUpProps } from '@/models';
import { BaseService } from '@/services/base';

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

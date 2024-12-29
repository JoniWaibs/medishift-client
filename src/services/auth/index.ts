import { AxiosResponse } from 'axios';

import { SignInProps, SignUpProps } from '@/models';
import { BaseService } from '@/services/base';

export class AuthService extends BaseService {
  async signIn({ password, email }: SignInProps): Promise<AxiosResponse> {
    return this.post('auth/sign-in', { password, email });
  }

  async signOut(): Promise<AxiosResponse> {
    return this.post('auth/sign-out', {});
  }

  async currentUser(): Promise<AxiosResponse> {
    return this.get('auth/current-user');
  }

  async signUp(payload: SignUpProps): Promise<AxiosResponse> {
    return this.post('auth/sign-up', payload);
  }

  async confirmEmail(payload: string): Promise<AxiosResponse> {
    return this.post('auth/email-confirmation', { token: payload });
  }

  async forgotPassword(payload: string): Promise<AxiosResponse> {
    return this.post('auth/forgot-password', { email: payload });
  }

  async resetPassword(payload: {
    token: string;
    newPassword: string;
  }): Promise<AxiosResponse> {
    return this.post('auth/reset-password', payload);
  }
}

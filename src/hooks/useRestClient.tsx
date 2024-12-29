/* eslint-disable prettier/prettier */
import { useState } from 'react';

import { AxiosError, AxiosResponse } from 'axios';

import { RequestMethods } from '@/enums';
import {
  ServiceShiftProps,
  SearchProps,
  SignInProps,
  SignUpProps,
} from '@/models';
import { AuthService, ShiftService, UserService } from '@/services';

const authService = new AuthService();
const shiftService = new ShiftService();
const userService = new UserService();

type RequestBody<M extends RequestMethods> = M extends RequestMethods.SIGN_IN
  ? SignInProps
  : M extends RequestMethods.SIGN_UP
    ? SignUpProps
    : M extends RequestMethods.SIGN_OUT
      ? {}
      : M extends RequestMethods.CREATE_SHIFT
        ? ServiceShiftProps
        : M extends RequestMethods.SEARCH_SHIFT
          ? SearchProps
          : M extends RequestMethods.SEARCH_PATIENT
            ? SearchProps
            : M extends RequestMethods.DELETE_PATIENT
              ? string
              : M extends RequestMethods.SEARCH_DOCTOR
                ? SearchProps
                : M extends RequestMethods.CONFIRM_EMAIL
                  ? string
                  : M extends RequestMethods.FORGOT_PASSWORD
                    ? string
                    : M extends RequestMethods.RESET_PASSWORD
                      ? { token: string; newPassword: string }
                      : never;

export interface UseClientSideRequestProps<M> {
  onSuccessCallback?: (data?: any) => void;
  method: M;
}

export const useClientSideRequest = <M extends RequestMethods = never>({
  onSuccessCallback,
  method,
}: UseClientSideRequestProps<M>) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const request = async (payload?: RequestBody<M>) => {
    setLoading(true);
    setError(null);

    try {
      let response: AxiosResponse;
      switch (method) {
        case RequestMethods.SIGN_IN:
          response = await authService.signIn(payload as SignInProps);
          break;
        case RequestMethods.SIGN_UP:
          response = await authService.signUp(payload as SignUpProps);
          break;
        case RequestMethods.SIGN_OUT:
          response = await authService.signOut();
          break;
        case RequestMethods.CURRENT_USER:
          response = await authService.currentUser();
          break;
        case RequestMethods.CONFIRM_EMAIL:
          response = await authService.confirmEmail(payload as string);
          break;
        case RequestMethods.FORGOT_PASSWORD:
          response = await authService.forgotPassword(payload as string);
          break;
        case RequestMethods.RESET_PASSWORD:
          response = await authService.resetPassword(
            payload as { token: string; newPassword: string },
          );
          break;
        case RequestMethods.CREATE_SHIFT:
          response = await shiftService.createShift(
            payload as ServiceShiftProps,
          );
          break;
        case RequestMethods.SEARCH_SHIFT:
          response = await shiftService.search(payload as SearchProps);
          break;
        case RequestMethods.SEARCH_PATIENT:
          response = await userService.search(
            payload as SearchProps,
            'patient',
          );
          break;
        case RequestMethods.DELETE_PATIENT:
          response = await userService.deletePatient(payload as string);
          break;
        case RequestMethods.SEARCH_DOCTOR:
          response = await userService.search(payload as SearchProps, 'doctor');
          break;
        default:
          throw new Error('Unknown method');
      }

      setLoading(false);

      if (response.status === 200 && onSuccessCallback) {
        onSuccessCallback();
      }

      return response.data;
    } catch (err) {
      console.log(`Error: ${err || 'Unknown error'}`);
      setError(`Parece que hubo un error, intentá nuevamente en unos segundos`);
    } finally {
      setLoading(false);
    }
  };

  return { request, loading, error };
};

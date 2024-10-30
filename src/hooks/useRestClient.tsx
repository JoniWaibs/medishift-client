import { useState } from "react";
import { GetShiftByIdProps, GetShiftsProps, ShiftFormData, SignInProps, SignUpProps } from "../models";
import { AuthService, ShiftService, UserService } from "../service";
import { AxiosError, AxiosResponse } from "axios";
import { QueryType, RequestMethods } from "../enums";

const authService = new AuthService();
const shiftService = new ShiftService();
const userService = new UserService();

type RequestBody<M extends RequestMethods> = 
  M extends RequestMethods.SIGN_IN ? SignInProps :
  M extends RequestMethods.SIGN_UP ? SignUpProps :
  M extends RequestMethods.GET_SHIFTS ? GetShiftsProps :
  M extends RequestMethods.CREATE_SHIFT ? ShiftFormData :
  // M extends 'updateShift' ? UpdateShiftProps :
  // M extends 'createPatient' ? CreatePatientProps :
  M extends RequestMethods.GET_PATIENT_BY_ID ? GetShiftByIdProps :
  M extends RequestMethods.SEARCH_PATIENT ? {type?: QueryType, value?: string} :
  // M extends 'updatePatient' ? UpdatePatientProps :
  never;

export interface UseClientSideRequestProps<M> {
  onSuccessCallback?: (data?: any) => void;
  method: M
}

export const useClientSideRequest = <M extends RequestMethods  = never>({
  onSuccessCallback,
  method
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
        // case RequestMethods.SIGN_UP:
        //   response = await authService.signUp(body as SignUpProps);
        //   break;
        case RequestMethods.CREATE_SHIFT:
          response = await shiftService.createShift(payload as ShiftFormData);
          break;
        case RequestMethods.GET_SHIFTS:
          response = await shiftService.getShifts(payload as GetShiftsProps);
          break;
          // case 'updateShift':
          //   response = await shiftService.updateShift(body as UpdateShiftProps);
          //   break;
          // case 'createPatient':
          //   response = await patientService.createPatient(body as CreatePatientProps);
          //   break;
          case RequestMethods.SEARCH_PATIENT:
            response = await userService.search(payload as {type?: QueryType, value?: string});
            break;
          // case 'updatePatient':
        //   response = await patientService.updatePatient(body as UpdatePatientProps);
        //   break;
        default:
          throw new Error('Unknown method');
      }
      
      setLoading(false);
      
      if(response.status === 200 && onSuccessCallback) {
        onSuccessCallback()
      }

      return response.data;
    } catch (err) {      
      console.log(err)
      if(err instanceof AxiosError) {
        setError(`Error: Intente nuevamente - ${err.response?.data.message || err.message}`);
      } else {
        setError(`Error: Intente nuevamente - ${err}`);
      }
    } finally{
      setLoading(false);
    }
  };

  return { request, loading, error };
};

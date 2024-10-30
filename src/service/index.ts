import { AxiosResponse } from "axios";
import { Patient, Shift, ShiftFormData, SignInProps } from "../models";
import { BaseService } from "./base";
import { QueryType } from "../enums";

export class AuthService extends BaseService  {
    async signIn({ password, email }: SignInProps): Promise<AxiosResponse> {
        return  this.post('auth/sign-in', { password, email } )
    }

    //async signUp({ password, email, licenseNumber, name, lastName, specialization }: SignUpProps): Promise<AxiosResponse> {
    //    console.log(password, email, licenseNumber, name, lastName, specialization)
    //}
}

export class ShiftService extends BaseService  {
    async getShifts({startDate, endDate}:{startDate: string, endDate: string}): Promise<AxiosResponse<Shift[]>> {
        return this.get('shift/all', {startDate, endDate})
    }
    async createShift(shift: ShiftFormData): Promise<AxiosResponse> {
        return this.post('shift/create', shift)
    }
} 

export class UserService extends BaseService {
    async search(query?: {type?: QueryType, value?: string}): Promise<AxiosResponse<Patient[]>> {

        return this.get(`/user/patient${query ? `?${query.type}=${query.value}` : ''}`)
    }
}
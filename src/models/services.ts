
export interface SignInProps {
    password: string;
    email: string;
}

export interface SignUpProps {
    password: string;
    email: string;
    name: string;
    lastName: string;
    specialization: string;
    licenseNumber: string;
}


export interface GetShiftsProps {
  startDate: string;
  endDate: string;
}

export interface GetShiftByIdProps {
  id: string;
}


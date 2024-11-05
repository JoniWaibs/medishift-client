export enum HttpCode {
  OK = 200,
  CONFLICT = 409,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export enum UserRole {
  PATIENT = 'patient',
  DOCTOR = 'doctor',
  ADMIN = 'admin',
}

export enum ShiftStatus {
  PENDING = 'pending',
  COMPLETE = 'completed',
  SUSPENDED = 'suspended',
  CANCELED = 'canceled',
}

export enum PaymentStatus {
  PAID = 'paid',
  PENDING = 'pending',
  UNPAID = 'unpaid',
}

export enum PaymentMethod {
  CASH = 'cash',
  TRANSFER = 'transfer',
  CREDIT_CARD = 'credit_card',
  DEBIT_CARD = 'debit_card',
}

export enum CurrencyType {
  ARS = 'ARS',
  USD = 'USD',
}

export enum HttpMethods {
  GET = 'get',
  POST = 'post',
}

export enum RequestMethods {
  SIGN_IN = 'signIn',
  SIGN_UP = 'signUp',
  CREATE_SHIFT = 'createShift',
  SEARCH_SHIFT = 'searchShift',
  SEARCH_PATIENT = 'searchPatient',
}

export enum QueryType {
  SEARCH = 'search',
  ID = 'id',
  DATE = 'date',
}

export enum NotificationType {
  WHATSAPP = 'whatsapp',
  EMAIL = 'email',
  SMS = 'sms',
  PUSH = 'push',
}

export enum NotificationClient {
  WHATSAPP = 'whatsapp',
  EMAIL = 'email',
  BROWSER = 'browser',
}

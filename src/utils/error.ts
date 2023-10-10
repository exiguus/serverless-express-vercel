import {Request} from 'express';

export const errorCodes = {
  BAD_REQUEST: 'bad request',
  UNAUTHORIZED: 'unauthorized',
  FORBIDDEN: 'forbidden',
  NOT_FOUND: 'not found',
  METHOD_NOT_ALLOWED: 'method not allowed',
  NOT_ACCEPTABLE: 'not acceptable',
  REQUEST_TIMEOUT: 'request timeout',
  CONFLICT: 'conflict',
  GONE: 'gone',
  LENGTH_REQUIRED: 'length required',
  PRECONDITION_FAILED: 'precondition failed',
  PAYLOAD_TOO_LARGE: 'payload too large',
  URI_TOO_LONG: 'uri too long',
  UNSUPPORTED_MEDIA_TYPE: 'unsupported media type',
  RANGE_NOT_SATISFIABLE: 'range not satisfiable',
  EXPECTATION_FAILED: 'expectation failed',
  IM_A_TEAPOT: 'im a teapot',
  MISDIRECTED_REQUEST: 'misdirected request',
  UNPROCESSABLE_ENTITY: 'unprocessable entity',
  LOCKED: 'locked',
  FAILED_DEPENDENCY: 'failed dependency',
  TOO_EARLY: 'too early',
  UPGRADE_REQUIRED: 'upgrade required',
  PRECONDITION_REQUIRED: 'precondition required',
  TOO_MANY_REQUESTS: 'too many requests',
  REQUEST_HEADER_FIELDS_TOO_LARGE: 'request header fields too large',
  UNAVAILABLE_FOR_LEGAL_REASONS: 'unavailable for legal reasons',
  CORS_NOT_ALLOWED: 'cors not allowed',
  INVALID_CREDENTIALS: 'invalid credentials',
  USER_NOT_FOUND: 'user not found',
  USER_NOT_ACTIVE: 'user not active',
  USER_NOT_VERIFIED: 'user not verified',
  USER_ALREADY_EXISTS: 'user already exists',
  USER_NOT_AUTHORIZED: 'user not authorized',
  USER_NOT_AUTHENTICATED: 'user not authenticated',
  USER_NOT_PERMITTED: 'user not permitted',
  USER_NOT_ALLOWED: 'user not allowed',
  USER_NOT_ACCEPTABLE: 'user not acceptable',
  USER_REQUEST_TIMEOUT: 'user request timeout',
  USER_CONFLICT: 'user conflict',
  USER_GONE: 'user gone',
  USER_LENGTH_REQUIRED: 'user length required',
  USER_PRECONDITION_FAILED: 'user precondition failed',
  USER_PAYLOAD_TOO_LARGE: 'user payload too large',
  USER_URI_TOO_LONG: 'user uri too long',
  USER_UNSUPPORTED_MEDIA_TYPE: 'user unsupported media type',
  USER_RANGE_NOT_SATISFIABLE: 'user range not satisfiable',
  USER_EXPECTATION_FAILED: 'user expectation failed',
  INVALID_SCHEMA: 'invalid schema',
  JWT_INVALID: 'jwt invalid',
  INTERNAL_SERVER_ERROR: 'internal server error',
  UNKNOWN_ERROR: 'unknown error',
  DEFAULT_ERROR: 'default error',
};

export type ErrorStatus = number;
export type ErrorCode = keyof typeof errorCodes;
export type ErrorType = string;
export type ErrorMessage = string;

export interface ExtendedError extends Error {
  code?: ErrorCode;
  type?: ErrorType;
  status?: number;
}

export const isExtendedError = (error: unknown): error is ExtendedError =>
  typeof error === 'object' &&
  error !== null &&
  (('code' in error &&
    typeof error.code === 'string' &&
    error.code in errorCodes) ||
    !('code' in error)) &&
  (('type' in error && typeof error.type === 'string') || !('type' in error)) &&
  (('status' in error && typeof error.status === 'number') ||
    !('status' in error)) &&
  'message' in error &&
  typeof error.message === 'string';

export const throwError =
  ({
    errorCode,
    errorType,
    errorMessage,
  }: {
    errorCode: ErrorCode;
    errorType: ErrorType;
    errorMessage: ErrorMessage;
  }) =>
  (error?: ExtendedError) => {
    if (!error) error = new Error(errorMessage || 'Default Error');
    error.code = errorCode;
    error.type = errorType;
    throw error;
  };

export const throwIf =
  ({
    test,
    errorCode,
    errorType,
    errorMessage,
  }: {
    // eslint-disable-next-line no-unused-vars
    test: (req: Request) => boolean;
    errorCode: ErrorCode;
    errorType: ErrorType;
    errorMessage: ErrorMessage;
  }) =>
  (req: Request) => {
    if (test(req)) {
      return req;
    }
    return throwError({errorCode, errorType, errorMessage})();
  };

export const checkError = (err: unknown): NonNullable<ExtendedError> => {
  if (isExtendedError(err)) return err;
  const defaultExtendedError: ExtendedError = {
    name: 'Error',
    code: 'INTERNAL_SERVER_ERROR',
    type: 'error',
    status: 500,
    message: 'Unknown Error',
  };
  if (err instanceof Error || isExtendedError(err)) {
    return {
      ...defaultExtendedError,
      ...err,
    };
  }
  return defaultExtendedError;
};

/* eslint-disable no-shadow */
/*
    Action types
*/

export enum AuthTypes {
  SIGN_IN_REQUEST = `@auth/SIGN_IN_REQUEST`,
  SIGN_IN_SUCCESS = `@auth/SIGN_IN_SUCCESS`,
  SIGN_IN_GOOGLE_REQUEST = `@auth/SIGN_IN_GOOGLE_REQUEST`,
  SIGN_IN_GOOGLE_SUCCESS = `@auth/SIGN_IN_GOOGLE_SUCCESS`,
  SIGN_UP_GOOGLE_REQUEST = `@auth/SIGN_UP_GOOGLE_REQUEST`,
  SIGN_UP_GOOGLE_SUCCESS = `@auth/SIGN_UP_GOOGLE_SUCCESS`,
  SIGN_UP_REQUEST = `@auth/SIGN_UP_REQUEST`,
  SIGN_FAILURE = `@auth/SIGN_FAILURE`,
  SIGN_OUT = `@auth/SIGN_OUT`,
  TOKEN_UPDATE = `@auth/TOKEN_UPDATE`,
}

/**
 *Data types
 */

export interface Auth {
  token: string | undefined | null;
  signed: boolean;
}
/**
 * State type
 */

export interface AuthState {
  readonly data: Auth;
  readonly loading: boolean;
  readonly error: boolean;
}

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { action } from 'typesafe-actions';
import { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { AuthTypes } from './types';
import { User } from '../user/types';

export const signInRequest = (login: string, password: string) =>
  action(AuthTypes.SIGN_IN_REQUEST, { login, password });

export const signInSuccess = (token: string, user: FirebaseAuthTypes.User, level: any) =>
  action(AuthTypes.SIGN_IN_SUCCESS, { token, user, level });

export const signFailure = () => action(AuthTypes.SIGN_FAILURE);

export const signUpGoogleRequest = (user: any, fbUser: any, token: string) =>
  action(AuthTypes.SIGN_IN_GOOGLE_REQUEST, { user, fbUser, token });

export const signUpRequest = (name: string, cpf: string, email: string, password: string, confirmation_password: string) =>
  action(AuthTypes.SIGN_UP_REQUEST, { name, cpf, email, password, confirmation_password })

export const signOutRequest = () =>
  action(AuthTypes.SIGN_OUT, {});

export const updateToken = (token: string) =>
  action(AuthTypes.TOKEN_UPDATE, { token });

export const signOutSuccess = () => action(AuthTypes.SIGN_OUT);

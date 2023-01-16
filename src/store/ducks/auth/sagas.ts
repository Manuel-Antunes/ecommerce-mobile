/* eslint-disable require-yield */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { call, put } from 'redux-saga/effects';
import api from '../../../services/api';
import { LoginGoogle } from '../../../services/firebase';
import { signFailure, signInSuccess, signOutSuccess } from './actions';
import { User } from '../user/types';
import { all, AllEffect, ForkEffect, takeLatest } from 'redux-saga/effects';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { AxiosResponse } from 'axios';
import { SignInWithGoogle } from '../../../services/firebase';
import { AuthTypes } from './types';
import { navigate } from '../../../services/navigation';
import Toast from 'react-native-toast-message';
export function* signIn({ payload }: any) {
  // try {
  console.log('to aqui');
  try {
    const { login, password } = payload;
    const { user } = yield auth().signInWithEmailAndPassword(
      login,
      password
    );
    const { data } = yield call(api.get, '/users/' + user.uid);
    // console.log(data);
    const token: string = yield auth().currentUser?.getIdToken();
    const { level } = data;
    let admId;
    switch (level) {
      case 'AFILIADO':
        admId = data.branch.id;
        break;
      case 'EMPRESARIAL':
        admId = data.enterprise.id;
        break;
      case 'COOPERATIVO':
        admId = data.cooperative.id;
        break;
      default:
        admId = 0;
    }
    yield put(signInSuccess(token, user, [level, admId]));
    navigate('Main');
  } catch (error) {
    Toast.show({
      type: 'error',
      position: 'bottom',
      text1: 'Error',
      text2: error.message,
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 20
    });
    yield put(signFailure());
  }
}

export function* signInGoogle({ payload }: any) {
  try {
    // const response = yield firebaseAuth.signInWithPopup(googleProvider);
    const { user, fbUser, token } = payload;
    const { level } = user;
    let admId;
    switch (level) {
      case "AFILIADO":
        admId = user.branch.id;
        break;
      case "EMPRESARIAL":
        admId = user.enterprise.id;
        break;
      case "COOPERATIVO":
        admId = user.cooperative.id;
        break;
      default:
        admId = 0;
    }
    yield put(signInSuccess(token, fbUser, [level, admId]));
    navigate('Main');
  } catch (error) {
    Toast.show({
      type: 'error',
      position: 'bottom',
      text1: 'Error',
      text2: error.message,
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 20
    });
    yield put(signFailure());
  }
}

export function* signUp({ payload }: any) {
  try {
    const { name, email, password, cpf } = payload;
    console.log('aknsdkas')
    yield auth().createUserWithEmailAndPassword(email, password);
    yield auth().currentUser?.updateProfile({ displayName: name });
    const token: string = yield auth().currentUser?.getIdToken();
    const user: FirebaseAuthTypes.User = yield auth().currentUser;
    const { data } = yield api.post('/users', {
      cpf,
      name,
      email,
      uid: user.uid,
    });
    const { level } = data;
    let admId;
    switch (level) {
      case "AFILIADO":
        admId = data.branch.id;
        break;
      case "EMPRESARIAL":
        admId = data.enterprise.id;
        break;
      case "COOPERATIVO":
        admId = data.cooperative.id;
        break;
      default:
        admId = 0;
    }
    Toast.show({
      type: 'success',
      position: 'bottom',
      text1: 'Sucesso!',
      text2: `usuário ${user.displayName} cadastrado com sucesso!`,
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 20
    });
    yield put(signInSuccess(token, user, level));
    navigate('Main');
  } catch (error) {
    let message;
    console.log(error);
    switch (error.code) {
      case 'auth/invalid-email':
        message = 'O endereço de e-mail está formatado incorretamente.';
        break;
      case 'auth/email-already-in-use':
        message = 'O endereço de e-mail já está sendo usado por outra conta!';
        break;
      default:
        message = 'Falha no cadastro, verifique seus dados!';
    }
    Toast.show({
      type: 'error',
      position: 'bottom',
      text1: 'Error',
      text2: message,
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 20
    });
    yield put(signFailure());
  }
}

export function* signOut() {
  yield LoginGoogle.signOut();
  yield auth().signOut();
  navigate('Main');
}

export function setToken({ payload }: any) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest(AuthTypes.SIGN_IN_REQUEST, signIn),
  takeLatest(AuthTypes.SIGN_IN_GOOGLE_REQUEST, signInGoogle),
  takeLatest(AuthTypes.SIGN_UP_REQUEST, signUp),
  takeLatest(AuthTypes.SIGN_OUT, signOut),
]);

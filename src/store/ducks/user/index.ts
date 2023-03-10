/* eslint-disable no-console */
import { Reducer } from 'redux';
import { UserState } from './types';
import { AuthTypes } from '../auth/types';

const INITIAL_STATE: UserState = {

};

const reducer: Reducer<UserState> = (state = INITIAL_STATE, action) => {
  console.log(action);

  switch (action.type) {
    case AuthTypes.SIGN_IN_SUCCESS:
      return { ...state, data: { profile: action.payload.user, ...action.payload } };
    case AuthTypes.SIGN_OUT:
      return { ...state, data: { profile: null } };
    default:
      return state;
  }
};

export default reducer;

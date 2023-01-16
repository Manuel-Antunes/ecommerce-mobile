import produce from 'immer';
import { Reducer } from 'redux';
import api from '../../../services/api';
import { AuthState, AuthTypes } from './types';
const INITIAL_STATE: AuthState = {
  data: { signed: false, token: null },
  error: false,
  loading: false,
};

const reducer: Reducer<AuthState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AuthTypes.SIGN_IN_GOOGLE_REQUEST:
      return { ...state, loading: true }
    case AuthTypes.SIGN_IN_REQUEST:
      return { ...state, loading: true };
    case AuthTypes.SIGN_FAILURE:
      return { ...state, loading: false, error: true };
    case AuthTypes.SIGN_IN_SUCCESS:
      api.defaults.headers.Authorization = `bearer ${action.payload.token}`;
      console.tron.log(api.defaults.headers.Authorization)
      return {
        ...state,
        error: false,
        loading: false,
        data: { signed: true, token: action.payload.token },
      };
    case AuthTypes.SIGN_UP_REQUEST:
      return { ...state, loading: true }
    case AuthTypes.SIGN_OUT:
      return { ...state, data: { signed: false, token: null }, loading: false }

    case AuthTypes.TOKEN_UPDATE:
      return produce(state, (draft) => {
        api.defaults.headers.Authorization = `bearer ${action.payload.token}`;
        draft.data.token = action.payload.token;
      })
    default:
      return state;
  }
};

export default reducer;

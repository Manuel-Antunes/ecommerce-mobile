/* eslint-disable @typescript-eslint/no-explicit-any */
import { persistReducer } from 'redux-persist';
import { Reducer, AnyAction } from 'redux';
import AsyncStorage from '@react-native-community/async-storage';

export default (reducers: Reducer): Reducer<any, AnyAction> => {
  const persistedReducer = persistReducer(
    {
      key: 'ivoucher',
      storage: AsyncStorage,
      whitelist: ['cart', 'auth', 'user'],
    },
    reducers,
  );

  return persistedReducer;
};

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { all, AllEffect, ForkEffect, takeLatest } from 'redux-saga/effects';

// import { RepositoriesTypes } from './repositories/types';

// import { load } from './repositories/sagas';
import auth from './auth/sagas';
import cart from './cart/sagas';
import { AuthTypes } from './auth/types';

export default function* rootSaga(): Generator<AllEffect<ForkEffect<never>>> {
  return yield all([auth, cart]);
}

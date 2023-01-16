import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore } from 'redux-persist';
import { AuthState } from './ducks/auth/types';
import persistReducers from './persistReducers';
import createRootReducer from './ducks/rootReducer';
import { UserState } from './ducks/user/types';
import rootSaga from './ducks/rootSaga';
import { CartState } from './ducks/cart/types';
// import history from '../services/history';

export interface ApplicationState {
  auth: AuthState;
  user: UserState;
  cart: CartState;
}
const sagaMonitor = __DEV__ ? console.tron.createSagaMonitor() : null;

const sagaMiddleware = createSagaMiddleware({ sagaMonitor });
const store = createStore(
  persistReducers(createRootReducer()),
  __DEV__
    ? compose(console.tron.createEnhancer(), applyMiddleware(sagaMiddleware))
    : applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(rootSaga);
const persistor = persistStore(store);

export { store, persistor };

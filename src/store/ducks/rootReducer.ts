import { combineReducers } from 'redux';

import auth from './auth';
import user from './user';
import cart from './cart';

const createRootReducer = () =>
  combineReducers({
    auth,
    user,
    cart
  });

export default createRootReducer;

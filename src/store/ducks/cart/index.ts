import { Reducer } from 'redux';
import { produce } from 'immer';
import { CartState, CartTypes } from './types';
import { AuthTypes } from '../auth/types';

const INITIAL_STATE: CartState = {
  data: { products: [], purchaseId: 1 },
  helperCart: { products: [], purchaseId: 1 },
  loading: false,
};
const reducer: Reducer<CartState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartTypes.ADD_TO_CART_SUCCESS:
      return produce(state, (draft) => {
        draft.data.products.push(action.payload.product);
      });
    case CartTypes.REMOVE_FROM_CART_SUCCESS:
      return produce(state, (draft) => {
        const itemIndex = draft.data.products.findIndex(
          (p) => p.id === action.payload.id,
        );
        draft.loading = true;
        if (itemIndex >= 0) {
          draft.data.products.splice(itemIndex, 1);
        }
      });
    case CartTypes.FETCH_USER_CART_SUCCESS:
      return produce(state, (draft) => {
        draft.data.products = action.payload.products;
        draft.data.purchaseId = action.payload.id;
        draft.helperCart.products = [];
      });
    case CartTypes.UPDATE_AMOUNT_SUCCESS:
      return produce(state, (draft) => {
        const productIndex = draft.data.products.findIndex(
          (item) => item.id === action.payload.id,
        );
        console.log(action.payload.id);

        console.log(productIndex);

        if (productIndex >= 0) {
          console.log('oi');
          draft.data.products[productIndex].pivot_amount = action.payload.amount;
        }
      });
    case CartTypes.FETCH_USER_CART:
      return produce(state, (draft) => {
        draft.helperCart = action.payload.cart;
      });
    case CartTypes.SELECT_USER_CART:
      return produce(state, (draft) => {
        draft.data = draft.helperCart;
        draft.helperCart.products = [];
      });
    case CartTypes.SELECT_LOCAL_CART:
      return produce(state, (draft) => {
        draft.helperCart.products = [];
      });
    case AuthTypes.SIGN_OUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};
export default reducer;

import { action } from 'typesafe-actions';
import { Cart, CartTypes } from './types';

export const addToCartRequest =
  (id: number, sellableId: number) => action(CartTypes.ADD_TO_CART_REQUEST, { id, sellableId });
export const removeFromCartRequest =
  (id: number) => action(CartTypes.REMOVE_FROM_CART_REQUEST, { id });
export const updateAmountRequest =
  (id: number, amount: number) => action(CartTypes.UPDATE_AMOUNT_REQUEST,
    { id, amount }
  );
export const addToCartSuccess =
  (product: any) => action(CartTypes.ADD_TO_CART_SUCCESS, {
    product,
  });
export const fetchUserCartSuccess =
  (products: any[], id: number) => action(CartTypes.FETCH_USER_CART_SUCCESS, {
    products,
    id
  });
export const fetchUserCartHelper =
  (cart: Cart) => action(CartTypes.FETCH_USER_CART, {
    cart
  });

export const updateAmountSuccess =
  (id: number, amount: number) => action(CartTypes.UPDATE_AMOUNT_SUCCESS, {
    id,
    amount,
  });
export const removeFromCartSuccess =
  (id: number) => action(CartTypes.REMOVE_FROM_CART_SUCCESS, {
    id
  });
export const requestCartSync =
  (cart: Cart) => action(CartTypes.REQUEST_CART_SYNC, {
    cart
  })
export const syncMainCart =
  (user: any) => action(CartTypes.SYNC_MAIN_CART, {
    user
  })

export const resetCart = () => action(CartTypes.RESET_CART, {});

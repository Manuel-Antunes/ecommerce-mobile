export enum CartTypes {
  ADD_TO_CART_REQUEST = '@cart/ADD_REQUEST',
  ADD_TO_CART_SUCCESS = '@cart/ADD_SUCCESS',
  REMOVE_FROM_CART_REQUEST = '@cart/REMOVE_REQUEST',
  REMOVE_FROM_CART_SUCCESS = '@cart/REMOVE_SUCCESS',
  UPDATE_AMOUNT_REQUEST = '@cart/UPDATE_AMOUNT_REQUEST',
  UPDATE_AMOUNT_SUCCESS = '@cart/UPDATE_AMOUNT_SUCCESS',
  FETCH_USER_CART = '@cart/FETCH_USER_CART',
  FETCH_USER_CART_SUCCESS = '@cart/FETCH_USER_CART_SUCCESS',
  SELECT_USER_CART = '@cart/SELECT_USER_CART',
  SELECT_LOCAL_CART = '@cart/SELECT_LOCAL_CART',
  RESET_CART = '@cart/RESET',
  REQUEST_CART_SYNC = '@cart/REQUEST_CART_SYNC',
  SYNC_MAIN_CART = "@cart/SYNC_MAIN_CART"
}

export interface Cart {
  products: any[];
  purchaseId: number;
}

export interface CartState {
  readonly data: Cart;
  readonly helperCart: Cart;
  readonly loading: boolean;
}

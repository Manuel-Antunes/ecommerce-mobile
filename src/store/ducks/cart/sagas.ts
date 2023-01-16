import {
  select, put, all, takeLatest, call,
} from 'redux-saga/effects';
import Toast from 'react-native-toast-message';
import api from '../../../services/api';
import {
  addToCartSuccess,
  updateAmountSuccess,
  removeFromCartSuccess,
  updateAmountRequest,
  fetchUserCartSuccess,
  fetchUserCartHelper,
  requestCartSync,
} from './actions';
// import { type } from '../constants';
import routes from '../../../routes/constants';
import { Cart, CartTypes } from './types';
import { ApplicationState } from '../..';
import { AuthTypes } from '../auth/types';
// import { errorSnack, successSnack } from '../snackbar/actions';

function* addToCart({ payload }: any) {
  try {
    // Recebendo o Id do Produto
    const { id: itemId, sellableId } = payload;

    // Verificando se o usuário está conectado
    const { signed } = yield select((state) => state.auth.data);

    // Agindo conforme conectado
    if (signed) {
      // Se estiver conectado
      // Pega o usuário salvo
      const { uid: userId } = yield select((state) => state.user.data.user);

      // Solicita o ID da compra/carrinho online atual.
      // Obs.: Cria uma caso ainda não exista uma em andamento.
      const { data } = yield call(api.post, '/purchases', { userId });
      const purchaseId = data.id;

      // Solicita os items do carrinho online.
      // console.log(a);
      console.log(sellableId);
      console.log('asdasd');

      const { data: cartItems } = yield call(api.get, `/purchases/${purchaseId}/sellables`);
      console.log(cartItems);
      console.log('HERE');

      // Verificando se esse item já está no carrinho online
      const itemExists = cartItems.find((item: any) => item.content.id === itemId);
      if (itemExists) {
        // Atualizando a quantidade
        yield put(
          updateAmountRequest(itemId, itemExists.pivot_amount + 1),
        );
      } else {
        // Inserindo o item ao carrinho online
        const { data: product } = yield call(api.post, `/purchases/${purchaseId}/sellables`,
          {
            sellableId: itemId,
            amount: 1,
            start_date: new Date(),
          },
        );
        // yield put(
        //   successSnack(`${product.data.product.name} adicionado ao carrinho!`)
        // );
        Toast.show({
          type: 'success',
          position: 'bottom',
          text1: 'Sucesso!',
          text2: 'Produto adicionado ao carrinho com sucesso!',
          visibilityTime: 4000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 20,
        });
        yield put(
          addToCartSuccess(product),
        );
      }
    } else {
      // Se não estiver conectado
      // Verificando se esse item já está no carrinho offline
      const itemExists: object = yield select((state) =>
        state.cart.data.products.find((item: any) => item.id === itemId),
      );

      // Pegando o produto pelo ID
      const { data: product } = yield call(api.get, `/sellables/${itemId}`);

      if (itemExists) {
        // Atualizando a quantidade
        yield put(updateAmountRequest(itemId, itemExists.pivot_amount + 1));
      } else {
        // Inserindo o item ao carrinho
        Toast.show({
          type: 'success',
          position: 'bottom',
          text1: 'Sucesso!',
          text2: 'Produto adicionado ao carrinho com sucesso!',
          visibilityTime: 4000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 20,
        });

        yield put(
          addToCartSuccess({
            id: product.id, content: product.content, pivot_amount: 1, pivot_start_date: new Date(),
          }),
        );
      }

      // yield put(successSnack(`${product.name} adicionado ao carrinho!`));
    }
  } catch (error) {
    Toast.show({
      type: 'error',
      position: 'bottom',
      text1: 'Error',
      text2: 'Erro ao adicionar o produto ao carrinho',
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 20,
    });
    // yield put(errorSnack('Erro ao adicionar produto ao carrinho!'));
  }
}

function* updateAmount({ payload }: any): any {
  try {
    // Recebendo o Id do Produto
    const { id: itemId, amount } = payload;

    // Cancelando a operação caso a atualização seja para um valor <= 0
    if (amount <= 0) {
      return;
    }

    // Verificando se o usuário está conectado
    const { signed } = yield select((state) => state.auth.data);

    // Agindo conforme conectado
    if (signed) {
      // Se estiver conectado
      // Pega o usuário salvo
      const { uid: userId } = yield select((state) => state.user.data.user);

      // Solicita o ID da compra/carrinho online atual.
      // Obs.: Cria uma caso ainda não exista uma em andamento.
      const { data } = yield api.post('/purchases', { userId });
      const purchaseId = data.id;

      // Solicita os items do carrinho online.
      const { data: cartItems } = yield call(api.get, `/purchases/${purchaseId}/sellables`);

      // Verificando se esse item já está no carrinho online
      console.log(itemId);
      console.log(cartItems);


      const itemExists = cartItems.find((item: any) => item.content.id === itemId);

      if (!itemExists) {
        return;
      }
      console.log('erro teste');

      // Atualizando a quantidade
      yield call(api.put,
        `/purchases/${purchaseId}/sellables/${itemId}`,
        { amount },
      );
      Toast.show({
        type: 'success',
        position: 'bottom',
        text1: 'Sucesso!',
        text2: 'Produto atualizado com sucesso!',
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 20,
      });
      yield put(updateAmountSuccess(itemId, amount));
    } else {
      // Se não estiver conectado
      // Verificando se esse item já está no carrinho offline
      const itemExists: object = yield select((state) =>
        state.cart.data.products.find((item: any) => item.id === itemId),
      );
      console.log(amount);

      // Cancelando a operação caso o item não esteja no carrinho
      if (!itemExists) {
        return;
      }
      Toast.show({
        type: 'success',
        position: 'bottom',
        text1: 'Sucesso!',
        text2: 'Produto atualizado com sucesso!',
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 20,
      });
      // Atualizando a quantidade
      yield put(updateAmountSuccess(itemId, amount));
    }
  } catch (error) {
    console.log(error);

    Toast.show({
      type: 'error',
      position: 'bottom',
      text1: 'Error',
      text2: 'Erro ao atualizar produto do carrinho!',
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 20,
    });
    // yield put(errorSnack('Erro ao atualizar produto do carrinho!'));
  }
}

function* cartSync({ payload }: any): any {
  try {
    console.log(payload.cart.products);

    const a = payload.cart.products.map((p: any) => {
      const o: any = {
        id: p.id,
        amount: p.pivot_amount,
        start_date: p.pivot_start_date,
      };
      if (p.pivot_end_date) {
        o.end_date = p.pivot_end_date;
      }
      return o;
    });
    console.log(a);

    const { uid: userId } = yield select((state) => state.user.data.user);

    // Solicita o ID da compra/carrinho online atual.
    // Obs.: Cria uma caso ainda não exista uma em andamento.
    const { data } = yield api.post('/purchases', { userId });
    const purchaseId = data.id;
    yield call(api.put, `/purchases/${purchaseId}/contents`, { content: a });
    Toast.show({
      type: 'success',
      position: 'bottom',
      text1: 'Sucesso!',
      text2: 'Carrinho sincronizado!',
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 20,
    });
    yield put(fetchUserCartSuccess(payload.cart.products, purchaseId));
  } catch (err) {
    console.log(err.message);
    Toast.show({
      type: 'error',
      position: 'bottom',
      text1: 'Error',
      text2: 'Erro ao substiuir o carrinho, tente depois.',
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 20,
    });
  }
}

function* removeFromCart({ payload }: any): any {
  try {
    // Recebendo o Id do Produto
    const { id: itemId } = payload;

    // Verificando se o usuário está conectado
    const { signed } = yield select((state) => state.auth.data);

    // Agindo conforme conectado
    if (signed) {
      // Se estiver conectado
      // Pega o usuário salvo

      const { uid: userId } = yield select((state) => state.user.data.profile);

      // Solicita o ID da compra/carrinho online atual.
      // Obs.: Cria uma caso ainda não exista uma em andamento.
      const { data } = yield api.post('/purchases', { userId });
      const purchaseId = data.id;

      // Solicita os items do carrinho online.
      const { data: cartItems } = yield call(api.get, `/purchases/${purchaseId}/sellables`);

      // Verificando se esse item já está no carrinho online
      const itemExists = cartItems.find((item: any) => item.id === itemId);

      if (!itemExists) {
        return;
      }
      console.log(purchaseId);

      // Removendo o item do carrinho online
      yield call(api.delete, `/purchases/${purchaseId}/sellables/${itemId}`);
      Toast.show({
        type: 'success',
        position: 'bottom',
        text1: 'Sucesso!',
        text2: 'Produto removido do carrinho com sucesso!',
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 20,
      });
      yield put(removeFromCartSuccess(itemId));
    } else {
      // Se não estiver conectado
      // Verificando se esse item já está no carrinho offline
      const itemExists: object = yield select((state) =>
        state.cart.data.products.find((item: any) => item.content.id === itemId),
      );

      // Cancelando a operação caso o item não esteja no carrinho
      if (!itemExists) {
        return;
      }
      Toast.show({
        type: 'success',
        position: 'bottom',
        text1: 'Sucesso!',
        text2: 'Produto removido do carrinho com sucesso!',
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 20,
      });
      // Removendo o item carrinho offline
      yield put(removeFromCartSuccess(itemId));
    }
  } catch (error) {
    console.log(error);
    Toast.show({
      type: 'error',
      position: 'bottom',
      text1: 'Error',
      text2: 'Erro ao remover produto do carrinho!',
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 20,
    });
    // yield put(errorSnack('Erro ao remover produto do carrinho!'));
  }
}

function* fetchUserCart({ payload }: any) {
  const { user } = payload;
  console.log('BILADATOMICA');

  console.log(user);

  try {

    const cart: Cart = yield select((state: ApplicationState) => state.cart.data);
    const { products } = cart;
    const { data } = yield call(api.post, '/purchases', { userId: user.uid });
    const purchaseId = data.id;

    const { data: cartItems } = yield call(api.get, `/purchases/${purchaseId}/sellables`);
    console.log(data);

    console.log('BILADATOMICA');
    if (products.length > 0) {
      if (cartItems.length > 0) {
        yield put(fetchUserCartHelper({ products: cartItems, purchaseId }));
        Toast.show({
          type: 'info',
          position: 'bottom',
          text1: 'Conflito de Carrinhos!',
          text2: 'Você já possuia um outro carrinho em outra compra em sua conta',
          visibilityTime: 4000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 20,
        });
      } else {
        yield put(requestCartSync(cart));
      }
    } else {
      console.log('to aqio');

      Toast.show({
        type: 'success',
        position: 'bottom',
        text1: 'Carrinho obtido!',
        text2: 'Carrinho online obtido e atualizado!',
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 20,
      });
      yield put(fetchUserCartSuccess(cartItems, purchaseId));
    }

    // Solicita os items do carrinho online.
  } catch (err) {
    console.log(err.message);

    Toast.show({
      type: 'error',
      position: 'bottom',
      text1: 'Error',
      text2: 'Erro ao listar dados do carrinho online!',
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 20,
    });
  }
}
function* syncMainCart({ payload }: any) {
  const { user } = payload;
  try {

    const cart: Cart = yield select((state: ApplicationState) => state.cart.data);
    const { products } = cart;
    const { data } = yield call(api.post, '/purchases', { userId: user.uid });
    const purchaseId = data.id;

    const { data: cartItems } = yield call(api.get, `/purchases/${purchaseId}/sellables`);
    console.log(data);
    yield put(fetchUserCartSuccess(cartItems, purchaseId));
  } catch (err) {
    console.log(err.message);

    Toast.show({
      type: 'error',
      position: 'bottom',
      text1: 'Error',
      text2: 'Erro ao Sincronizar o Carrinho',
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 20,
    });
  }
}

export default all([
  takeLatest(CartTypes.ADD_TO_CART_REQUEST, addToCart),
  takeLatest(CartTypes.UPDATE_AMOUNT_REQUEST, updateAmount),
  takeLatest(CartTypes.REMOVE_FROM_CART_REQUEST, removeFromCart),
  takeLatest(CartTypes.REQUEST_CART_SYNC, cartSync),
  takeLatest(AuthTypes.SIGN_IN_SUCCESS, fetchUserCart),
  takeLatest(CartTypes.SYNC_MAIN_CART, syncMainCart),
]);

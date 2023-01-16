import { useNavigation } from '@react-navigation/core';
import React, { useCallback, useEffect, useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { Avatar, Caption, Colors, DataTable, IconButton, Headline as H2, Divider } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../components/Button';
import NavigableSection from '../../../components/NavigableSection';
import { ApplicationState } from '../../../store';
import { removeFromCartRequest, syncMainCart, updateAmountRequest } from '../../../store/ducks/cart/actions';
import NavProvider from '../../../contexts/Nav/Provider';

import { AmountInput, Banner, Container, Headline, Item, ItemDescription, ItemName, List, OrderEntry, OrderSummary, ItemPrice, ItemSpecs } from './styles';
import { UserState } from '../../../store/ducks/user/types';
import { AuthState } from '../../../store/ducks/auth/types';
export interface ItemsProps {
  route: any;
}

const Items: React.FC<ItemsProps> = ({ route }) => {
  const Navigation = useNavigation();
  const [page, setPage] = useState(0);
  const [length, setLength] = useState(3);
  const user = useSelector<ApplicationState, UserState>((s) => s.user);
  const auth = useSelector<ApplicationState, AuthState>((s) => s.auth);
  const dispatch = useDispatch();
  const productsC = useSelector<ApplicationState, any[]>(state => state.cart.data.products);
  const purchaseId = useSelector<ApplicationState, number>(state => state.cart.data.purchaseId);
  useEffect(() => {
    console.log(productsC)
    // dispatch(removeFromCartRequest(productsC[0].id))
  }, [productsC])
  useEffect(() => {
    if (auth.data.signed) {
      dispatch(syncMainCart(user.data?.profile))
    }
    console.log(productsC)
    // dispatch(removeFromCartRequest(productsC[0].id))
  }, [])
  function handleUpdateAmount(id: number, amout: number) {
    dispatch(updateAmountRequest(id, amout));
  }
  function handleRemoveFromCart(id: number) {
    dispatch(removeFromCartRequest(id));
  }
  function handleCheckout() {
    if (auth.data.signed) {
      Navigation.navigate('Checkout', { id: purchaseId })
    } else {
      Navigation.navigate('SignIn')
    }
  }

  function getFinalPriceFromProducts(products: any[]): number {
    let cont = 0;
    products.forEach((p) => {
      cont += p.content.value * p.pivot_amount;
    })
    return cont;
  }

  function getDiscountFromProducts(products: any[]): number {
    let cont = 0;
    return cont;
  }

  function getFinalPurchaseValue(product: any[0]): number {
    let cont = 0;
    return cont;
  }

  return (
    <NavProvider>
      <NavigableSection name="cart" sideBarColor={Colors.indigo500}>
        <Container>
          <Headline>
            Meu Carrinho
          </Headline>
          <List>
            {
              productsC.map(p => (
                <Item key={p.id}>
                  <View>
                    <Banner source={{ uri: p.content.banner.url }}></Banner>
                    <IconButton onPress={() => handleRemoveFromCart(p.content.sellable_id)} color={Colors.indigo500} icon="trash" />
                  </View>
                  <ItemDescription>
                    <ItemName>{p.content.name}</ItemName>
                    <ItemSpecs>{p.content.description}</ItemSpecs>
                    <AmountInput style={{ alignSelf: 'flex-start' }} >
                      <IconButton color={Colors.indigo500} icon="minus" onPress={() => { handleUpdateAmount(p.id, p.pivot_amount - 1) }} size={15}></IconButton>
                      <Text>{p.pivot_amount}</Text>
                      <IconButton color={Colors.indigo500} icon="plus" onPress={() => { handleUpdateAmount(p.id, p.pivot_amount + 1) }} size={15}></IconButton>
                    </AmountInput>
                    <ItemPrice>R$ {p.content.value.toFixed(2)}</ItemPrice>
                  </ItemDescription>
                </Item>
              ))
            }
          </List>
          <OrderSummary>
            <H2>Resumo do Pedido</H2>
            <OrderEntry>
              <Text>{productsC.length} Produtos</Text>
              <Text>R$ {getFinalPriceFromProducts(productsC).toFixed(2)}</Text>
            </OrderEntry>
            <OrderEntry>
              <Text>Desconto</Text>
              <Text>R$ {getDiscountFromProducts(productsC).toFixed(2)}</Text>
            </OrderEntry>
            <Divider />
            <OrderEntry>
              <Text style={{ fontWeight: 'bold' }} >Total</Text>
              <Text style={{ fontWeight: 'bold' }}>R$ {getFinalPurchaseValue(productsC).toFixed(2)}</Text>
            </OrderEntry>
            <Divider />
            <Button enabled={productsC?.length > 0} onPress={handleCheckout} button_style={{ padding: 3 }}>Continuar</Button>
          </OrderSummary>
        </Container>
      </NavigableSection>
    </NavProvider>
  );
}

export default Items;

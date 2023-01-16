
import React, { useEffect, useState } from 'react';
import { Image, ImageBackground, Text, View } from 'react-native';
import { Container, Headline, Item, Banner, ItemDescription, List, ItemName, ItemPrice, PurchaseDetails, OrderEntry } from './styles';
import Toast from 'react-native-toast-message';
import NavigableSection from '../../components/NavigableSection';
import NavProvider from '../../contexts/Nav/Provider';
import api from '../../services/api';
import { format, parseISO } from 'date-fns';
import { pt } from 'date-fns/locale';
import { ActivityIndicator, Divider, Headline as H2 } from 'react-native-paper';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
interface PurchaseProps {
  route: any
}
const Purchase: React.FC<PurchaseProps> = ({ route }) => {
  const id = route.params.id;
  const [purchase, setPurchase] = useState<any>(null);
  const [sellables, setSellables] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigator = useNavigation();
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

  function getFinalPurchaseValue(product: any[]): number {
    let cont = 0;
    return cont;
  }
  useEffect(() => {
    api.get('/purchases/' + id).then(({ data }) => {
      console.log(data);
      setPurchase(data);
      setLoading(false);
    }).catch(err => {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Error',
        text2: 'Ocorreu um erro.',
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 20,
      });
      console.log(err);
    })
  }, [])
  useEffect(() => {
    handleFetchSellables();
  }, [purchase])
  async function handleFetchSellables() {
    try {
      console.log(id);

      const { data } = await api.get('/purchases/' + id + '/sellables');
      console.log(data);
      setSellables(data);
    } catch (error) {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Error',
        text2: 'Ocorreu um erro.',
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 20,
      });
      console.log(error);
    }
  }
  return (
    <NavProvider>
      <NavigableSection name="profile" sideBarColor="#4cac54">
        <Container style={{ marginTop: 30 }}>
          <Headline>
            Minha Compra
          </Headline>
          <ItemName>Pedido: {purchase?.id}</ItemName>
          <ItemName>Data de Checkout: {purchase?.created_at && format(parseISO(purchase?.created_at), "eeee', dia' dd 'de' MMMM", { locale: pt })}</ItemName>
          {loading ? <ActivityIndicator size="large" style={{ marginTop: '40%' }} /> :
            <>
              <List>
                {
                  sellables.map(p => (
                    <View key={p.id} style={{
                      borderColor: '#e0e0e0',
                      borderStyle: 'solid',
                      borderWidth: 1,
                      borderRadius: 5,
                      marginTop: 5
                    }}>
                      <Item enabled={purchase?.state === 'FINISHED'} onPress={() => { console.log("Oi") }} >
                        <View style={{ justifyContent: 'center' }}>
                          <Banner source={{ uri: p.content.banner.url }}></Banner>
                        </View>
                        <ItemDescription>
                          <ItemName>{p.content.name}</ItemName>
                          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <ItemPrice>R$ {p.content.value.toFixed(2)}</ItemPrice>
                            <ItemPrice>Qtd {p.pivot_amount}</ItemPrice>
                          </View>
                        </ItemDescription>
                      </Item>
                    </View>
                  ))
                }
              </List>
              <PurchaseDetails>
                <H2>Resumo do Pedido</H2>
                <OrderEntry>
                  <Text>{sellables.length} Produtos</Text>
                  <Text>R$ {getFinalPriceFromProducts(sellables).toFixed(2)}</Text>
                </OrderEntry>
                <OrderEntry>
                  <Text>Desconto</Text>
                  <Text>R$ {getDiscountFromProducts(sellables).toFixed(2)}</Text>
                </OrderEntry>
                <Divider />
                <OrderEntry>
                  <Text style={{ fontWeight: 'bold' }} >Total</Text>
                  <Text style={{ fontWeight: 'bold' }}>R$ {getFinalPurchaseValue(sellables).toFixed(2)}</Text>
                </OrderEntry>
                <Divider />
                <OrderEntry>
                  <ItemName style={{ position: 'relative' }}>
                    Forma de pagamento:{' '}
                  </ItemName>
                </OrderEntry>
                <OrderEntry>
                  <ItemName style={{ position: 'relative' }}>
                    <View>
                      <ImageBackground source={{ uri: `https://www.mercadopago.com/org-img/MP3/API/logos/${purchase.externalCheckout.body.payment_method_id}.gif` }} imageStyle={{ resizeMode: 'stretch' }} style={{ backgroundColor: "red", width: 30, height: 20, marginRight: 5 }} />
                    </View>
                    {purchase.externalCheckout.body.payment_method_id}
                  </ItemName>
                </OrderEntry>
                <OrderEntry>
                  <ItemName>Status: {(() => {
                    switch (purchase?.state) {
                      case 'PENDING':
                        return 'Pendente'
                      case 'AWAITING_PAYMENT':
                        return 'Aguardando Pagamento'
                      case 'CANCELLED':
                        return 'Cancellada'
                      case 'FINISHED':
                        return 'Finalizada'
                      case 'DONE':
                        return 'Concluída'
                    }
                  })()}</ItemName>
                </OrderEntry>
                <Divider />
                {
                  purchase.externalCheckout.body.payment_method_id === "bolbradesco" && <Button onPress={() => { navigator.navigate('Billet', { id: purchase.billet_url }) }} button_style={{ padding: 3 }}>Visualizar Boleto</Button>
                }
              </PurchaseDetails>
            </>
          }
        </Container>
      </NavigableSection>
    </NavProvider>
  );
}

export default Purchase;

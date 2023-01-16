import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, View, ImageBackground, StyleSheet } from 'react-native';
import NavigableSection from '../../components/NavigableSection';
import { Colors, Text, ActivityIndicator } from 'react-native-paper';
import { Banner, Container, Headline, Price, UnvoucherPrice } from './styles';
import api from '../../services/api';
import logo from '../../assets/login/Penedo.png';
import Button from '../../components/Button';
import Rates from '../Branch/components/Rates';
import { useDispatch } from 'react-redux';
import { addToCartRequest } from '../../store/ducks/cart/actions';
import NavProvider from '../../contexts/Nav/Provider';
import { DatePickerModal } from 'react-native-paper-dates';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Picker from '../../components/Picker';
import Toast from 'react-native-toast-message';

interface ProductsProps {
  route: any
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  text: {
    color: "white",
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000a0"
  }
});
const capitalize = (word: string) =>
  word[0].toUpperCase() + word.slice(1).toLowerCase();
const Products: React.FC<ProductsProps> = ({ route }) => {
  const [product, setProduct] = useState<any>();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [open, setOpen] = React.useState(false);
  const onDismissSingle = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmSingle = React.useCallback(
    (params) => {
      setOpen(false);
      setDate(params.date);
    },
    [setOpen, setDate]
  );

  useEffect(() => {
    if (!product) {
      getProductData();
    }
  }, [product])
  useEffect(() => {
    console.log(date);

  }, [date])
  async function getProductData() {
    try {
      const { data } = await api.get('/products/' + route.params.id);
      setProduct(data);
      console.log(data.service);

      setLoading(false);
    } catch (err) {
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
    }
  }
  function handleAddToCart(id: number, sellableId: number) {
    dispatch(addToCartRequest(id, sellableId));
  }
  return (
    <NavProvider>
      <NavigableSection name="product" sideBarColor={Colors.indigo500}>
        <Container>
          {loading ? (
            <View style={{ width: "100%", height: "30%", alignItems: 'center', justifyContent: "center" }} >
              <ActivityIndicator size="large" />
            </View>
          ) :
            (
              <>
                <Headline>{product?.name}</Headline>
                <Banner>
                  <ImageBackground imageStyle={{ resizeMode: "cover" }} style={styles.image} source={{ uri: product.banner ? product.banner.url! : 'penedo' }}>
                  </ImageBackground>
                </Banner>
                <Text>
                  {product?.description}
                </Text>
                {(product.value_voucher && product?.value === product?.value_voucher) ?
                  <Price>R$ {product?.value.toFixed(2)}</Price> :
                  (
                    <>
                      <Price>R$ {product?.value_voucher.toFixed(2)}</Price>
                      <UnvoucherPrice>Valor original:{'\n'} R$ {product?.value.toFixed(2)}</UnvoucherPrice>
                    </>
                  )
                }
                <Button icon={{ name: "calendar", size: 20, margin_text: 10, color: "#FFF" }} style={{ alignItems: 'center', justifyContent: "center" }} onPress={() => setOpen(true)} >
                  {date ?
                    capitalize(format(date!, "dd 'de' MMMM 'de' yyyy", { locale: pt }))
                    : 'Selecione a data do agendamento'
                  }
                </Button>
                <Button onPress={() => handleAddToCart(product?.id, product?.sellable_id)} icon={{ name: "shopping-cart", size: 20, margin_text: 10, color: "#FFF" }} style={{ alignItems: 'center', justifyContent: "center" }}>Adicionar ao Carrinho</Button>
                <DatePickerModal
                  locale={'pt'}
                  mode="single"
                  visible={open}
                  onDismiss={onDismissSingle}
                  date={date}
                  onConfirm={onConfirmSingle}
                  validRange={{
                    startDate: new Date(),  // optional
                  }}

                  label="Selecione a data do seu agendamento" // optional
                // onChange={} // same props as onConfirm but triggered without confirmed by user
                // saveLabel="Save" // optional
                // animationType="slide" // optional, default is 'slide' on ios/android and 'none' on web
                />
                <Picker onValueChange={(value) => console.log(value)}
                  items={[
                    { label: 'Football', value: 'football' },
                    { label: 'Baseball', value: 'baseball' },
                    { label: 'Hockey', value: 'hockey' },
                  ]}
                  placeholder={{ label: 'selecione um horário', value: 'selecione um horário' }}
                />
              </>
            )
          }

        </Container>
      </NavigableSection>
      <NavigableSection name="rates" sideBarColor="#d32f2f">
        <Rates id={route.params.id} operation="products" />
      </NavigableSection>
    </NavProvider>
  );
}

export default Products;

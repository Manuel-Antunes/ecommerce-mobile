import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Image, ImageBackground } from 'react-native';
import NavigableSection from '../../components/NavigableSection';
import { Avatar, Caption, Colors, DataTable, TextInput } from 'react-native-paper';
import { Container, Headline, Subheadline } from './styles';
import { useNavigation } from '@react-navigation/core';
import logoImg from '../../assets/login/Penedo.png';
import NavProvider from '../../contexts/Nav/Provider';
import api from '../../services/api';
import Toast from 'react-native-toast-message';

export interface MenuProps {
  route: any;
}

const Menu: React.FC<MenuProps> = ({ route }) => {
  const Navigation = useNavigation();
  const [search, setSearch] = useState(route.params.busca);
  const [page, setPage] = useState(0);
  const [length, setLength] = useState(3);

  const [searchText, setSearchText] = useState(route.params.busca);

  function openFilterPage() {
    Navigation.navigate('FilterInjector', { busca: searchText });
  }

  useEffect(() => {
    getProductsFromServer()
  }, [])

  async function getProductsFromServer() {
    try {
      console.log(route.params.id);
      const { data } = await api.get('/branches/' + 1 + '/products')
      setProducts(data);
    } catch (error) {
      console.log(error);
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
    }
  }
  const [products, setProducts] = useState<any[]>([])
  function handleSubmit() {
    // api.get('/search/')
  }
  function handlePressItem(id: number) {
    Navigation.navigate('Product', { id });
  }
  return (
    <NavProvider >
      <NavigableSection name="menu" sideBarColor={Colors.indigo500}>
        <Container style={{ marginTop: 70 }}>
          <Subheadline>
            Miranha Lanches Palanqueta
          </Subheadline>
          <Headline>Cardapio Virtual</Headline>

          <TextInput
            value={searchText}
            onChangeText={setSearchText}
            label="Se preferir faça uma busca rápida."
            onSubmitEditing={handleSubmit}
            returnKeyType="search"
            right={
              <TextInput.Icon onPress={handleSubmit} name="search" size={20}></TextInput.Icon>
            }
          ></TextInput>
          <DataTable style={{ marginTop: 30 }}>
            <DataTable.Header>
              <DataTable.Title>Product</DataTable.Title>
              <DataTable.Title numeric>Price</DataTable.Title>
            </DataTable.Header>
            {
              products.map(p => (
                <DataTable.Row key={p.id} onPress={() => handlePressItem(p.id)} style={{ height: 70 }}>
                  <DataTable.Cell style={{ height: '100%', width: '100%', flex: 3.5 }} >
                    <ImageBackground style={{ height: '60%', width: '60%' }} source={{ uri: p.banner ? 'penedo' : 'penedo' }} />
                  </DataTable.Cell>
                  <DataTable.Cell style={{ height: '100%', flex: 3.5 }} >
                    <View>
                      <Text>{p.name}</Text>
                      <Caption>{p.description}</Caption>
                    </View>
                  </DataTable.Cell>
                  <DataTable.Cell numeric>{p.value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</DataTable.Cell>
                </DataTable.Row>
              ))
            }
            <DataTable.Pagination
              page={page}
              numberOfPages={length}
              onPageChange={page => {
                setPage(page);
              }}
              label={(page + 1) + "-2 de " + length}
            />
          </DataTable>
        </Container>
      </NavigableSection>
    </NavProvider>
  );
}

export default Menu;

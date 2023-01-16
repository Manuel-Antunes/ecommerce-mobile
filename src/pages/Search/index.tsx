import React, { useEffect, useState } from 'react';
import { NativeSyntheticEvent, Text, TextInputSubmitEditingEventData, View } from 'react-native';
import { Colors, DataTable, Searchbar, Avatar, Checkbox, Caption, Button, ActivityIndicator } from 'react-native-paper';
import NavigableSection from '../../components/NavigableSection';
import logoImg from '../../assets/login/Penedo.png';
import { useNavigation } from '@react-navigation/native';
import { Container, Headline } from './styles';
import api from '../../services/api';
import NavProvider from '../../contexts/Nav/Provider';

interface SearchProps {
  route: any;
}

const Search: React.FC<SearchProps> = ({ route }) => {
  const Navigation = useNavigation();
  const [search, setSearch] = useState(route.params.busca);
  const [page, setPage] = useState(0);
  const [length, setLength] = useState(3);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState(route.params.busca);

  function openFilterPage() {
    Navigation.navigate('FilterInjector', { busca: searchText });
  }

  useEffect(() => {
    getSearchData()
  }, [search, page])

  async function getSearchData() {
    try {
      console.log(page);

      const { data } = await api.get('/searches/' + search);
      setLoading(false);
      console.log(data.length);
    } catch (err) {
      console.log(err);

    }
  }

  const [products, setProducts] = useState([
    {
      id: 1,
      banner: {
        banner_url: logoImg
      },
      name: 'Produto 1',
      description: 'Descrição 1',
    },
    {
      id: 2,
      banner: {
        banner_url: logoImg
      },
      name: 'Produto 2',
      description: 'Descrição 2',
    },
    {
      id: 3,
      banner: {
        banner_url: logoImg
      },
      name: 'Produto 3',
      description: 'Descrição 3',
    }, {
      id: 4,
      banner: {
        banner_url: logoImg
      },
      name: 'Produto 4',
      description: 'Descrição 4',
    }
  ])
  function handleSubmit() {
    api.get('/search/')
  }
  function handleSearch() {
    setSearch(searchText)
  }
  function handlePressItem(id: number) {
    Navigation.navigate('Product', { id })
  }
  return (
    <NavProvider>
      <NavigableSection name="search" sideBarColor={Colors.indigo500}>
        <Container>
          <Headline>Pesquisa</Headline>
          <Searchbar onSubmitEditing={handleSearch} value={searchText} onChangeText={setSearchText} />
          <Button onPress={openFilterPage} icon="filter" >Filtrar</Button>
          <DataTable style={{ marginTop: 30 }}>
            {
              loading ?
                <View style={{ padding: 90 }}>
                  <ActivityIndicator />
                </View> :
                products.map(p => (
                  <DataTable.Row key={p.id} onPress={() => handlePressItem(p.id)} style={{ height: 70 }}>
                    <Avatar.Image source={p.banner.banner_url} size={60} style={{ marginRight: 10, alignSelf: 'center' }} />
                    <DataTable.Cell style={{ height: '100%' }}>
                      <View>
                        <Text>{p.name}</Text>
                        <Caption>{p.description}</Caption>
                      </View>
                    </DataTable.Cell>
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

export default Search;

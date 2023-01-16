import React, { useState, useContext } from 'react';
import { Image, ImageBackground, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Avatar, Card, Button } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/MaterialCommunityIcons';
import splash from '../../../../assets/login/Penedo.png';
import { Name, NavButtons, Searchbar, Splash } from './styles';
import { Container, SideBar, Wraper } from '../global';

interface HomeBranchProps {
  id: number;
  name: string;
  cover: string;
}
const Home: React.FC<HomeBranchProps> = ({ id, name, cover }) => {
  const Navigation = useNavigation();
  const [search, setSearch] = useState('');

  function handleSearch() {
    Navigation.navigate('Search', { busca: search });
  }
  return (
    <Container>
      <Splash>
        <ImageBackground
          style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}
          source={{ uri: cover }}>
          <Name>{name}</Name>
        </ImageBackground>
      </Splash>
      <Text>
        Quer ver tudo que temos a oferecer? Sinta-se livre e busque agora.
      </Text>
      <Searchbar
        onSubmitEditing={handleSearch}
        placeholder="Digite aqui sua busca"
        value={search}
        onChangeText={setSearch}
      />
      <NavButtons>
        <Card
          style={{
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 3,
            },
            flex: 1,
            marginBottom: 10,
            shadowOpacity: 0.27,
            shadowRadius: 4.65,
            elevation: 6,
            paddingRight: 10,
          }}>
          <Card.Title
            title="Cardapio Virtual"
            subtitleNumberOfLines={3}
            subtitle="Um cardápio virtual com todas as opções que temos a oferecer."
            left={props => (
              <Avatar.Icon
                icon={p => <FontAwesome name="silverware" {...p} />}
                size={props.size * 1.2}
              />
            )}
          />
          <Card.Actions>
            <Button
              onPress={() => {
                Navigation.navigate('Menu', { id });
              }}>
              Ver Agora
            </Button>
          </Card.Actions>
        </Card>
      </NavButtons>
    </Container>
  );
};

export default Home;

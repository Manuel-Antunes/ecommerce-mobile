import React, { useState, useContext } from 'react';
import { Image, ImageBackground, Text, View } from 'react-native';
import splash from '../../../../assets/login/Penedo.png';
import { NavButtons, Searchbar, Splash } from './styles';
import { BackgroundGlobal, Container, SideBar, Wraper } from '../global';
import HomeLogo from '../../../../assets/icons/Home.png';

import Button from '../../../../components/Button';
import { useNavigation } from '@react-navigation/core';
import { useNavigator } from '../../../../contexts/Nav/useNavigator';
const Home: React.FC = () => {
  const Navigation = useNavigation();
  const [search, setSearch] = useState("");
  const { navigateByName } = useNavigator();
  function handleMove(name: string) {
    navigateByName(name);
  }
  function handleSearch() {
    Navigation.navigate('Search', { busca: search });
  }
  return (

    <BackgroundGlobal source={HomeLogo} >
      <Container style={{ marginTop: 70 }}>
        <Splash source={{ uri: 'Penedo' }}></Splash>
        <Text>Quer ver tudo que temos a oferecer? Sinta-se livre e busque agora.</Text>
        <Searchbar onSubmitEditing={handleSearch} placeholder="Digite aqui sua busca" value={search} onChangeText={setSearch}></Searchbar>
        <NavButtons >
          <Button onPress={() => {
            handleMove("events");
          }} font_size={17} icon={{ name: "calendar", size: 17, color: "#FFF", position: "left", margin_text: 10 }} style={{ width: 150, height: 60, justifyContent: "center", backgroundColor: "#4cac54" }}>Eventos</Button>
          <Button onPress={() => {
            handleMove("medias");
          }} font_size={17} icon={{ name: "image", size: 17, color: "#FFF", position: "left", margin_text: 10 }} style={{ width: 150, height: 60, justifyContent: "center", backgroundColor: "#d32f2f" }}>Midia</Button>
          <Button onPress={() => {
            handleMove("market");
          }} font_size={17} icon={{ name: "money", size: 17, color: "#FFF", position: "left", margin_text: 10 }} style={{ width: 150, height: 60, justifyContent: "center", backgroundColor: "#ff9800" }}>Comercio</Button>
          <Button onPress={() => {
            handleMove("about");
          }} font_size={17} icon={{ name: "info", size: 17, color: "#FFF", position: "left", margin_text: 10 }} style={{ width: 150, height: 60, justifyContent: "center", backgroundColor: "#673ab7" }}>Sobre</Button>
        </NavButtons>
      </Container>
    </BackgroundGlobal>

  );
}

export default Home;

import React, {
  ReactNode, useContext, useEffect, useRef, useState,
} from 'react';
import {
  Image, LayoutChangeEvent, ScrollView, StyleSheet, Text, View,
} from 'react-native';
import { FAB, Portal } from 'react-native-paper';
import { Colors, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import logo from '../../assets/login/Penedo.png';
import Home from './components/Home';
import Events from './components/Events';
import Medias from './components/Medias';
import Market from './components/Market';
import About from './components/About';
import Footer from '../../components/Footer/intex';
import SquareButton, { Back, Front } from '../../components/SquareButton';
import MainNav from '../../components/MainNav';
import UserNav from '../../components/UserNav';
import NavigableSection from '../../components/NavigableSection';
import { ApplicationState } from '../../store';
import CartExchangingModal from '../../components/CartExchangingModal';
import { Cart } from '../../store/ducks/cart/types';
import NavProvider from '../../contexts/Nav/Provider';
import { RefreshProvider } from '../../contexts/Refresh/Context';
// import { Container } from './styles';

const Main: React.FC = () => {
  const helperCart = useSelector<ApplicationState, Cart>(state => state.cart.helperCart);
  const [open, setOpen] = React.useState(false);
  const onStateChange = (object: any) => setOpen(object.open);
  function handleDemissCartExchangingModal() {
    console.log('sla mano, mo fita');
  }
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: Colors.indigo500,
      accent: '#FFF',
    },
  };
  return (
    <RefreshProvider>
      <PaperProvider
        settings={{
          icon: props => <FontAwesome {...props} />,
        }}
        theme={theme}
      >

        <NavProvider refreshable>
          <Portal>
            <CartExchangingModal onDismiss={handleDemissCartExchangingModal} visible={helperCart.products.length > 0} />
          </Portal>
          <NavigableSection name="home" sideBarColor="#3f51b5">
            <Home />
          </NavigableSection>
          <NavigableSection name="events" sideBarColor="#4cac54">
            <Events />
          </NavigableSection>
          <NavigableSection name="medias" sideBarColor="#d32f2f">
            <Medias />
          </NavigableSection>
          <NavigableSection name="market" sideBarColor="#ff9800">
            <Market />
          </NavigableSection>
          <NavigableSection name="about" sideBarColor="#673ab7">
            <About />
          </NavigableSection>
          <MainNav />
        </NavProvider>
      </PaperProvider>
    </RefreshProvider>
  );
};
export default Main;

import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { ActivityIndicator, Portal } from 'react-native-paper';
import SignIn from '../pages/SignIn';
import { ApplicationState } from '../store';
import SignUp from '../pages/SignUp';
import Main from '../pages/Main';
import Search from '../pages/Search';
import FilterInjector from '../pages/FilterInjector';
import Test from '../pages/Test';
import Event from '../pages/Event';
import Market from '../pages/Market';
import Branch from '../pages/Branch';
import Menu from '../pages/Menu';
import Cart from '../pages/Cart/Items';
import Products from '../pages/Products';
import Checkout from '../pages/Checkout';
import Profile from '../pages/Profile';
import { updateToken } from '../store/ducks/auth/actions';
import Purchase from '../pages/Purchase';
import Billet from '../pages/Checkout/billet';
import { AuthState } from '../store/ducks/auth/types';
import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';
const Auth = createStackNavigator();
const UnAuth = createStackNavigator();
const Routes: React.FC = () => {
  const loading = useSelector<ApplicationState, boolean>(s => s.auth.loading);
  const signed = useSelector<ApplicationState, boolean>(s => s.auth.data.signed);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    console.log(`agora estou:${loading}`);
    setIsLoading(loading);
  }, [loading]);
  const dispatch = useDispatch();
  return (
    <>
      <Portal>
        {isLoading && (
          <View style={{
            alignItems: 'center', height: '100%', justifyContent: 'center', backgroundColor: '#0008',
          }}
          >
            <ActivityIndicator size="large" style={{ alignItems: 'center' }} />
          </View>
        )}
      </Portal>
      {signed ? <AuthRoutes /> : <AppRoutes />}
    </>
  );
};

const Route: React.FC<{ name: string, component: React.FC }> = ({ name, component }) => (
  <Auth.Screen name={name} component={component} />
);

export default Routes;

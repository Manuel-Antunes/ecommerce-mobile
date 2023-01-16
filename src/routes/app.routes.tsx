import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Main from '../pages/Main';
import Search from '../pages/Search';
import FilterInjector from '../pages/FilterInjector';
import Event from '../pages/Event';
import Market from '../pages/Market';
import Branch from '../pages/Branch';
import Menu from '../pages/Menu';
import Cart from '../pages/Cart/Items';
import Products from '../pages/Products';
import { updateToken } from '../store/ducks/auth/actions';
import auth from '@react-native-firebase/auth';
import { useDispatch } from 'react-redux';

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => {
  return (
    <Auth.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#fff' },
      }}
    >
      <Auth.Screen name="Main" component={Main} />
      <Auth.Screen name="SignIn" component={SignIn} />
      <Auth.Screen name="Event" component={Event} />
      <Auth.Screen name="Search" component={Search} />
      <Auth.Screen name="SignUp" component={SignUp} />
      <Auth.Screen name="Market" component={Market} />
      <Auth.Screen name="Cart" component={Cart} />
      <Auth.Screen name="Branch" component={Branch} />
      <Auth.Screen name="Menu" component={Menu} />
      <Auth.Screen name="Product" component={Products} />
      <Auth.Screen name="FilterInjector" component={FilterInjector} />
    </Auth.Navigator>
  )
};

export default AuthRoutes;

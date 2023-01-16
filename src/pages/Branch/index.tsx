import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Colors } from 'react-native-paper';
import { ActivityIndicator } from 'react-native-paper';
import NavigableSection from '../../components/NavigableSection';
import Home from './components/Home';
import Rates from './components/Rates';
// import { Container } from './styles';
import NavProvider from '../../contexts/Nav/Provider';
import api from '../../services/api';
import Promotions from './components/Promotions';
import { RefreshProvider } from '../../contexts/Refresh/Context';
import Toast from 'react-native-toast-message';

export interface BranchProps {
  route: any;
}

const Branch: React.FC<BranchProps> = ({ route }) => {
  const [branch, setBranch] = useState<any>(null);

  useEffect(() => {
    try {
      api.get(`/branches/${route.params.id}`).then(({ data }) => {
        console.log(data);
        setBranch(data);
      });
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
  }, []);

  return (
    <RefreshProvider>
      <NavProvider refreshable>
        <NavigableSection name="events" sideBarColor={Colors.indigo500}>
          <Home name={branch?.name} id={route.params.id} cover={branch?.cover ? branch?.cover.url : 'penedo'} />
        </NavigableSection>
        <NavigableSection name="promo" sideBarColor="#4cac54">
          <Promotions id={route.params.id} />
        </NavigableSection>
        <NavigableSection name="rates" sideBarColor="#d32f2f">
          <Rates operation="branches" id={route.params.id} />
        </NavigableSection>
      </NavProvider>
    </RefreshProvider>
  );
};

export default Branch;

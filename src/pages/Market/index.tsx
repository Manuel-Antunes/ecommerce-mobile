import React, { useEffect, useState } from 'react';
import { ScrollView, View, ImageBackground, Text } from 'react-native';
import {
  Headline, Card, Button, IconButton, ActivityIndicator,
} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import NavigableSection from '../../components/NavigableSection';
import { Container, MarketNavigation } from './styles';
import logoImg from '../../assets/login/Penedo.png';
import NavProvider from '../../contexts/Nav/Provider';
import api from '../../services/api';
import Toast from 'react-native-toast-message';

export interface MarketProps {
  route: any;
}

const Market: React.FC<MarketProps> = ({ route }) => {
  const Navigation = useNavigation();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  function handleShowMarket(id: number): void {
    Navigation.navigate('Branch', { id });
  }
  useEffect(() => {
    try {
      api.get('/branches?category=' + route.params.type).then(({ data }) => {
        setData(data);
        console.log(data);
        setLoading(false);
      })
    } catch (err) {
      console.log(err);
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
  }, [])
  // eslint-disable-next-line no-return-assign
  return (
    <NavProvider>
      <NavigableSection name="market" sideBarColor="#ff9800">
        <Container style={{ marginTop: 70 }}>
          <Headline style={{ fontWeight: '200', fontSize: 30 }}>Comércio</Headline>
          <Headline style={{ marginTop: 20 }}>
            {
              // eslint-disable-next-line no-param-reassign
              (route.params.type === 'MEAL'
                ? 'Alimentação'
                // eslint-disable-next-line no-param-reassign
                : (route.params.type === 'HOST'
                  ? 'Hospedagem'
                  // eslint-disable-next-line no-param-reassign
                  : (route.params.type === 'TOUR' ? 'Turismo' : 'Artesanato')))
            }
          </Headline>

          {loading ? <ActivityIndicator size="large" style={{ marginTop: "20%" }} /> : data.length === 0 ? <Text style={{ marginTop: '50%', fontSize: 20 }}>Nenhuma filial cadastrada</Text> : data.map(d => (
            <MarketNavigation key={d.id}>
              <Card
                style={{
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 3,
                  },
                  flex: 1,
                  shadowOpacity: 0.27,
                  shadowRadius: 4.65,
                  elevation: 6,
                }}
              >
                <Card.Title
                  title={d.name}
                  titleStyle={{ fontFamily: 'Roboto-Light', fontSize: 25 }}
                />
                <View style={{ width: '100%', height: 100, borderRadius: 20 }}>
                  <ImageBackground
                    source={{ uri: d.cover ? d.cover.url : 'penedo' }}
                    style={{ width: '100%', height: '100%', borderRadius: 20 }}
                  />
                </View>
                <Card.Actions>
                  <Button onPress={() => handleShowMarket(d.id)}>ver mais</Button>
                </Card.Actions>
              </Card>
            </MarketNavigation>
          ))}
        </Container>
      </NavigableSection>
    </NavProvider >
  );
};

export default Market;

import React, { useEffect, useState } from 'react';
import { Text, View, ImageBackground } from 'react-native';
import { Button, Card } from 'react-native-paper';
import { BackgroundGlobal, Container, Headline } from '../global';
import { Hostaging, Services } from './styles';
import { useNavigation } from '@react-navigation/native';
import logoImg from '../../assets/login/Penedo.png';
import HomeLogo from '../../../../assets/icons/Money.png';
import api from '../../../../services/api';

const Market: React.FC = () => {
  const [hostImages, setHostImages] = useState<string[]>([])
  const [mealImages, setMealImages] = useState<string[]>([])
  const [tourImages, setTourImages] = useState<string[]>([])
  const [handicraftImages, setHandicraftImages] = useState<string[]>([])
  const Navigation = useNavigation();
  function handleShowCategory(type: string) {
    Navigation.navigate('Market', { type })
  }
  function generateImages(list: string[], name: string, key: string) {
    return list.length > 0 && (
      <Card style={
        {
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 3,
          },
          flex: 1,
          marginBottom: 10,
          shadowOpacity: 0.27,
          shadowRadius: 4.65,
          elevation: 6,
        }}>
        <Card.Title title={name} titleStyle={{ fontFamily: 'Roboto-Light', fontSize: 25 }} />
        <View style={{ width: '100%', height: 100, borderRadius: 20, flexDirection: 'row', flexWrap: 'wrap' }}>
          {list.map((e, i) => {
            return (
              <ImageBackground key={i} imageStyle={{ resizeMode: 'cover' }} source={{ uri: e }} style={{ minWidth: '50%', minHeight: list.length <= 2 ? '100%' : '50%', borderRadius: 20, flex: 1 }} />
            )
          })}
        </View>
        <Card.Actions>
          <Button onPress={() => handleShowCategory(key)}>Saiba mais</Button>
        </Card.Actions>
      </Card>
    )
  }
  async function getRandomBranchesPhotos() {
    function getImageFromEnterprise(d: any) {
      return d.cover ? d.cover.url : 'penedo';
    }
    try {
      const { data: hosts } = await api.get('/branches?category=HOST&limit=4');
      const { data: meals } = await api.get('/branches?category=MEAL&limit=4');
      const { data: tours } = await api.get('/branches?category=TOUR&limit=4');
      const { data: handicrafts } = await api.get('/branches?category=HANDICRAFT&limit=4');
      setHostImages(hosts.data.map(getImageFromEnterprise))
      setMealImages(meals.data.map(getImageFromEnterprise))
      setTourImages(tours.data.map(getImageFromEnterprise))
      setHandicraftImages(handicrafts.data.map(getImageFromEnterprise))
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getRandomBranchesPhotos();
  }, [])
  return (
    <BackgroundGlobal source={HomeLogo}>
      <Container>
        <Headline>Comércio</Headline>
        <Services>
          {generateImages(mealImages, 'Alimentação', 'MEAL')}
          {generateImages(hostImages, 'Hospedagem', 'HOST')}
          {generateImages(tourImages, 'Turismo', 'TOUR')}
          {generateImages(handicraftImages, 'Artesanato', 'HANDICRAFT')}
        </Services>
      </Container>
    </BackgroundGlobal>
  );
}

export default Market;

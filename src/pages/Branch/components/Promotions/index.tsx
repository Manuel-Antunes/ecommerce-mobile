import React, { useEffect, useRef, useState } from 'react';
import { View, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import splash from '../../../../assets/login/Penedo.png';
import { Container, ImgPlaceholder, PriceText, PromotionContent, PromotionItems, PromotionName } from './styles';
import { Headline, Container as C } from '../global';
import api from '../../../../services/api';
import { ActivityIndicator } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { useRefresh } from '../../../../contexts/Refresh/Context';

const Promotions: React.FC<{ id: number }> = ({ id }) => {
  const [promotions, setPromotions] = useState<any[]>([]);
  const [loadingCombos, setLoadingCombos] = useState(true);
  const [loadingPromotions, setLoadingPromotions] = useState(true);
  const [combos, setCombos] = useState<any[]>([]);
  const { refreshing } = useRefresh();
  useEffect(() => {
    if (refreshing) {
      setLoadingCombos(true);
      setLoadingPromotions(true);
      try {
        api.get('/branches/' + id + '/sellables?inpromotion=true').then(({ data }) => {
          console.log(data);
          setPromotions(data);
          setLoadingPromotions(false);
        })
        api.get('/branches/' + id + '/sellables?type=combo').then(({ data }) => {
          setLoadingCombos(false);
          setCombos(data);
        })
      } catch (error) {
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
        console.log(error);
      }
    }
  }, [refreshing])
  const Navigation = useNavigation();
  useEffect(() => {
    try {
      api.get('/branches/' + id + '/sellables?inpromotion=true').then(({ data }) => {
        console.log(data);
        setPromotions(data);
        setLoadingPromotions(false);
      })
      api.get('/branches/' + id + '/sellables?type=combo').then(({ data }) => {
        setLoadingCombos(false);
        setCombos(data);
      })
    } catch (error) {
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
      console.log(error);
    }
  }, [])

  return (
    <C>
      <Headline>
        Promoções
      </Headline>
      <Container>
        <ScrollView
          horizontal
        >
          {loadingPromotions ? (<ActivityIndicator />) : promotions.length === 0 ? <PromotionName style={{ alignSelf: 'center', fontSize: 20 }}>Nenhuma promoção ativa</PromotionName> : promotions.map((i, index) => {
            return (
              <TouchableOpacity key={index} onPress={() => {
                Navigation.navigate('Product', { id });
              }}>
                <View style={{
                  width: 280,
                  marginHorizontal: 10,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 5,
                  },
                  justifyContent: 'space-between',
                  borderRadius: 5,
                  shadowOpacity: 0.36,
                  shadowRadius: 6.68,
                  backgroundColor: '#FFF',
                  elevation: 6,
                  height: '95%',
                }}>
                  <PromotionContent>
                    <PromotionName>{i.content.name}</PromotionName>
                    <PromotionItems>{i.content.description}</PromotionItems>
                    <PriceText>R$ {i.content.finalValue.toFixed(2)}</PriceText>
                  </PromotionContent>
                  <ImgPlaceholder>
                    <ImageBackground source={{ uri: i.content.banner ? i.content.banner.url : 'penedo' }} style={{ width: '100%', height: '100%', overflow: 'hidden' }} />
                  </ImgPlaceholder>
                </View>
              </TouchableOpacity>
            )
          })}
        </ScrollView>
      </Container>
      <Headline>
        Combos
      </Headline>
      <Container>
        <ScrollView
          horizontal
        >
          {loadingCombos ? (<ActivityIndicator />) : combos.length === 0 ? <PromotionName style={{ alignSelf: 'center', fontSize: 20 }}>Nenhuma combo cadastrado</PromotionName> : combos.map((combo, index) => {
            return (
              <TouchableOpacity key={index} onPress={() => {
                Navigation.navigate('Product', { id });
              }}>
                <View style={{
                  width: 280,
                  marginHorizontal: 10,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 5,
                  },
                  justifyContent: 'space-between',
                  borderRadius: 5,
                  backgroundColor: '#FFF',
                  shadowOpacity: 0.36,
                  shadowRadius: 6.68,
                  elevation: 6,
                  height: '95%',
                }}>
                  <PromotionContent>
                    <PromotionName>{combo.content.name}</PromotionName>
                    <PromotionItems>{combo.content.description}</PromotionItems>
                    <PriceText>R$ {combo.content.finalValue.toFixed(2)}</PriceText>
                  </PromotionContent>
                  <ImgPlaceholder>
                    <ImageBackground source={{ uri: combo.content.banner ? combo.content.banner.url : 'penedo' }} style={{ width: '100%', height: '100%' }} />
                  </ImgPlaceholder>
                </View>
              </TouchableOpacity>
            )
          })}
        </ScrollView>
      </Container>
    </C>
  );
};

export default Promotions;

import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Toast from 'react-native-toast-message';
import api from '../../services/api';

// import { Container } from './styles';

export interface CardListType {
  route: string;
}
const CardList: React.FC<CardListType> = ({ route }) => {
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    fetchDataFromRoute();
  }, [page])
  async function fetchDataFromRoute() {
    try {
      const { data } = await api.get(route + '?limit=3&offset=' + page);
      setData(data);
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
  }
  const [content, setContent]
    = useState<{ name: string, media: { url: string } }>()
  return <View />;
}

export default CardList;

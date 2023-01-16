import React, { useEffect, useState } from 'react';
import {
  ImageBackground,
  Text,
  View,
  FlatList,
  ScrollView
} from 'react-native';
import { Button, Card, Modal, Portal } from 'react-native-paper';
import { GridContent } from './styles';
import { Container, Headline, SideBar, Wraper, BackgroundGlobal } from '../global';
import logoImg from '../../assets/login/Penedo.png';
import { FlatGrid } from 'react-native-super-grid';
import api from '../../../../services/api';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useRefresh } from '../../../../contexts/Refresh/Context';
import HomeLogo from '../../../../assets/icons/Image.png';

const Medias: React.FC = () => {
  const { refreshing, stopRefresh } = useRefresh();
  const [modalSource, setModalSource] = useState('');
  const [modalShowing, setModalShowing] = useState(false);
  const [images, setImages] = useState<any[]>([]);
  useEffect(() => {
    getRandoMediasFromServer();
  }, []);

  useEffect(() => {
    getRandoMediasFromServer()
  }, [refreshing])

  function handleShowModal(src: string) {
    setModalShowing(true);
    setModalSource(src);
  }

  async function getRandoMediasFromServer() {
    const { data } = await api.get('/cooperatives/1/midias');
    setImages(data);
  }

  return (
    <BackgroundGlobal source={HomeLogo}>
      <Container>
        <Headline>Midias</Headline>
        <MediaModal src={modalSource} visible={modalShowing} onDemiss={() => { setModalShowing(false) }}  ></MediaModal>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {images.map(p => (
            <GridContent
              key={p.id} style={{
                shadowRadius: 4.65,
                elevation: 6,
              }} flex={(Math.random() * 4) + 1}>
              <TouchableWithoutFeedback onPress={() => { handleShowModal(p.url) }}>
                <ImageBackground
                  source={{ uri: p.url }} style={{ width: '100%', height: '100%', borderRadius: 20 }} />
              </TouchableWithoutFeedback>
            </GridContent>
          ))}
        </View >
      </Container >
    </BackgroundGlobal>
  );
}

const MediaModal: React.FC<{ onDemiss: () => void, visible: boolean, src: string }> = ({ src, onDemiss, visible }) => {
  return (
    <Portal>
      <Modal visible={visible} onDismiss={onDemiss} >
        <TouchableWithoutFeedback style={{ alignItems: 'center', width: '90%', height: '90%', justifyContent: "center", alignSelf: 'center', zIndex: 100000 }} onPress={() => { onDemiss() }}>
          <View style={{
            width: '100%', height: '100%'
            , shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }} >
            <ImageBackground

              imageStyle={{ resizeMode: 'contain', borderRadius: 5 }}

              source={{ uri: src }} style={{ width: '100%', height: '100%', borderRadius: 20 }} />
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </Portal>
  )
}

export default Medias;

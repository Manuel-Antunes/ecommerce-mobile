import React, { useEffect, useMemo, useState } from 'react';
import { Alert, StyleProp, Text, View, ViewStyle } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { Modal, Headline, Subhead } from './styles';
import { LoginGoogle } from '../../../../services/firebase';


import { Container } from './styles';
import api from '../../../../services/api';
import { useNavigation } from '@react-navigation/core';
import { useDispatch } from 'react-redux';
export interface GoogleSignUpModalProps {
  visible: boolean;
  onDismiss: () => void;
  firebase: any;
  token: string;
  user?: {
    id: string;
    name: string | null;
    email: string;
    photo: string | null;
    familyName: string | null;
    givenName: string | null;
  }
}
import { signUpGoogleRequest } from '../../../../store/ducks/auth/actions';

const GoogleSignUpModal: React.FC<GoogleSignUpModalProps> = ({ visible, onDismiss, user, firebase, token }) => {
  const [cpf, setCpf] = useState('');
  const Navigation = useNavigation();
  const dispatch = useDispatch();
  async function handleSetUser() {
    try {
      console.log(user?.id);
      const { data } = await api.post('/users', { cpf, name: user?.name, email: user?.email, uid: user?.id });
      firebase
      dispatch(signUpGoogleRequest(data, firebase, token))
      onDismiss();
      Navigation.navigate('Main');
    } catch (error) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      Alert.alert('deu ruim');
      onDismiss();
    }
  }
  return (
    <Modal visible={visible}>
      <Container>
        <Headline>Olá, {user?.givenName} só mais uma coisa</Headline>
        <Subhead>Para utilizar nosso sistema você precisa informar o seu CPF:</Subhead>
        <TextInput value={cpf} label="CPF *" mode="flat" onChangeText={setCpf} />
        <Button onPress={handleSetUser} style={{ alignSelf: 'flex-end', marginTop: 15 }}>CONFIRMAR</Button>
      </Container>
    </Modal>
  );
}

export default GoogleSignUpModal;

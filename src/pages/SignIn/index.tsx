import React, { useRef, useState } from 'react';
import { Image, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput as T, View } from 'react-native';
import { Container, Form, Logo, Buttons, BriefText, TextInput, Header, PasswordInput } from './styles';
import logoImg from '../../assets/login/Penedo.png';
import { useNavigation } from '@react-navigation/native';
import Button from '../../components/Button';
import { LoginGoogle, SignInWithGoogle } from '../../services/firebase';
import Anchor from '../../components/Anchor';
import { Colors, DefaultTheme, Modal, Portal, Provider as PaperProvider, TextInput as Ti } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/Feather';
import GoogleSignUpModal from './components/GoogleSignUpModal/GoogleSignUpModal';
import { User } from '@react-native-community/google-signin';
import api from '../../services/api';
import { useDispatch } from 'react-redux';
import { signInRequest } from '../../store/ducks/auth/actions';
import { FormHandles, SubmitHandler } from '@unform/core';
import { signUpGoogleRequest } from '../../store/ducks/auth/actions'

const SignIn: React.FC = () => {
  const Navigation = useNavigation();
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [token, setToken] = React.useState('');
  const showModal = () => setModalVisible(true);
  const passwordInputRef = useRef<T>(null);
  const hideModal = () => setModalVisible(false);
  const [userData, setUserData] = useState<{
    id: string;
    name: string | null;
    email: string;
    photo: string | null;
    familyName: string | null;
    givenName: string | null;
  }>();
  const [firebase, setFirebase] = useState<any>(null);
  const [passwordShowing, setPasswordShowing] = useState(false);
  async function handleLoginGoogle() {
    try {
      const { fb, google } = await SignInWithGoogle();
      setUserData({ ...google.user, id: fb.user.uid });
      const token = await fb.user.getIdToken();
      setFirebase(fb.user);
      setToken(token)
      try {
        const { data } = await api.get('/users/' + fb.user.uid);
        dispatch(signUpGoogleRequest(data, fb.user, token))
        // Navigation.navigate('Main');
      } catch (err) {
        showModal();
      }
    } catch (err) {

    }
  }
  const formRef = useRef<FormHandles>(null);
  const handleSubmit: SubmitHandler<{ email: string, password: string }> = data => {
    dispatch(signInRequest(data.email, data.password));
  }
  function handleBack() {
    Navigation.goBack();
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column"
    },
    image: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center"
    },
    text: {
      color: "white",
      fontSize: 42,
      fontWeight: "bold",
      textAlign: "center",
      backgroundColor: "#000000a0"
    }
  });


  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: Colors.indigo500,
      accent: '#FFF',
    },
  };
  function handleShowPassword() {
    if (passwordShowing) {
      setPasswordShowing(false);
    } else {
      setPasswordShowing(true);
    }
  }
  return (
    <PaperProvider settings={{
      icon: props => <FontAwesome {...props} />,
    }} theme={theme}>
      <KeyboardAvoidingView
        style={{ flex: 1 }} behavior={Platform.OS === "ios" ? 'padding' : undefined} enabled>
        <ScrollView >
          <Container>
            <Portal>
              <GoogleSignUpModal user={userData} firebase={firebase} token={token} visible={modalVisible} onDismiss={hideModal} />
            </Portal>
            <Logo>
              <ImageBackground imageStyle={{ resizeMode: "cover" }} style={styles.image} source={logoImg}>
              </ImageBackground>
            </Logo>
            <Header>Login</Header>
            <Form ref={formRef} onSubmit={handleSubmit}>
              <TextInput
                name="email"
                label="E-mail"
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                style={{ backgroundColor: "#e8f0fe" }}
                mode="flat"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
                left={
                  <Ti.Icon style={{ backgroundColor: "#e0e0e0", width: '180%', height: '260%', marginRight: 10, borderRadius: 3 }} name="user"></Ti.Icon>
                } />
              <PasswordInput
                name="password"
                returnKeyType="send"
                label="Senha"
                mode="flat"
                onSubmitEditing={() => { formRef.current?.submitForm() }}
                ref={passwordInputRef}
              />

              <BriefText>
                Caso você não tenha uma conta,<Anchor location="SignUp">cadastre-se</Anchor> agora.{'\n'}
              Você também pode realizar o login com o Google.
              </BriefText>
              <Buttons>
                <Button style={{ backgroundColor: "#e0e0e0" }} onPress={handleBack} icon={{ name: "chevron-left", size: 15, color: "#686868", position: "left" }}> </Button>
                <Button style={{ paddingHorizontal: 10 }} onPress={handleLoginGoogle} icon={{ name: "google", size: 20, color: "#FFF", position: "left", margin_text: 10 }}>LOGIN COM GOOGLE</Button>
                <Button onPress={() => { formRef.current?.submitForm() }} icon={{ name: "chevron-right", size: 15, color: "#FFF", position: "right", margin_text: 10 }}>Entrar</Button>
              </Buttons>
            </Form>

          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </PaperProvider>
  );
}

export default SignIn;

import React, { useRef } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform, Text,
  ImageBackground,
  StyleSheet,
  TextInput as T,
} from 'react-native';
import {
  Colors, DefaultTheme, Modal, Portal, Provider as PaperProvider,
} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { TextInput as Ti } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/Feather';
import { FormHandles, SubmitHandler } from '@unform/core';// import { Container } from './styles';
import { useDispatch } from 'react-redux';
import { color } from 'react-native-reanimated';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { signUpRequest } from '../../store/ducks/auth/actions';
import { LoginGoogle } from '../../services/firebase';
import Button from '../../components/Button';
import logoImg from '../../assets/login/Penedo.png';
import {
  Container, Form, Logo, Buttons, TextInput, Header, PasswordInput, PhotoView,
} from './styles';
import ImageInput from '../../components/ImageInput';

interface SignUpSubmitType {
  name: string;
  email: string;
  password: string;
  cpf: string;
  // eslint-disable-next-line camelcase
  password_confirmation: string
}

const SignUp: React.FC = () => {
  const dispatch = useDispatch();
  const Navigation = useNavigation();
  function handleBack(): void {
    Navigation.goBack();
  }

  const formRef = useRef<FormHandles>(null);
  const handleSubmit: SubmitHandler<SignUpSubmitType> = data => {
    console.log('Toaqi');
    dispatch(
      signUpRequest(data.name, data.cpf, data.email, data.password, data.password_confirmation),
    );
    console.log(data);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
    },
    image: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
    },
    text: {
      color: 'white',
      fontSize: 42,
      fontWeight: 'bold',
      textAlign: 'center',
      backgroundColor: '#000000a0',
    },
  });
  const cpfInputRef = useRef<T>(null);
  const emailInputRef = useRef<T>(null);
  const passwordInputRef = useRef<T>(null);
  const passwordConfirmationInputRef = useRef<T>(null);

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: Colors.indigo500,
      accent: '#FFF',
    },
  };
  return (
    <>
      <PaperProvider
        settings={{
          icon: props => <FontAwesome {...props} />,
        }}
        theme={theme}
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          enabled
        >
          <ScrollView>
            <Container>
              <Logo>
                <ImageBackground style={styles.image} source={logoImg}>
                  <Text style={styles.text}>Inside</Text>
                </ImageBackground>
              </Logo>
              <Header>Cadastro</Header>
              <Form onSubmit={handleSubmit} ref={formRef}>
                <ImageInput />
                <TextInput
                  label="Nome"
                  name="name"
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    cpfInputRef.current?.focus();
                  }}
                  mode="flat"
                  left={(
                    <Ti.Icon
                      style={{
                        backgroundColor: '#e0e0e0', width: '180%', height: '260%', marginRight: 10, borderRadius: 3,
                      }}
                      name="user"
                    />
                  )}
                />
                <TextInput
                  ref={cpfInputRef}
                  name="cpf"
                  label="CPF"
                  returnKeyType="next"
                  keyboardType="numeric"
                  autoCapitalize="none"
                  autoCorrect={false}
                  onSubmitEditing={() => {
                    emailInputRef.current?.focus();
                  }}
                  mode="flat"
                  left={(
                    <Ti.Icon
                      style={{
                        backgroundColor: '#e0e0e0', width: '180%', height: '260%', marginRight: 10, borderRadius: 3,
                      }}
                      name="user"
                    />
                  )}
                />
                <TextInput
                  ref={emailInputRef}
                  label="E-mail"
                  name="email"
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="next"
                  keyboardType="email-address"
                  onSubmitEditing={() => {
                    passwordInputRef.current?.focus();
                  }}
                  mode="flat"
                  left={(
                    <Ti.Icon
                      style={{
                        backgroundColor: '#e0e0e0', width: '180%', height: '260%', marginRight: 10, borderRadius: 3,
                      }}
                      name="user"
                    />
                  )}
                />
                <PasswordInput
                  name="password"
                  ref={passwordInputRef}
                  label="Senha"
                  autoCapitalize="none"
                  returnKeyType="next"
                  autoCorrect={false}
                  onSubmitEditing={() => {
                    passwordConfirmationInputRef.current?.focus();
                  }}
                  mode="flat"
                />
                <PasswordInput
                  name="password_confirmation"
                  ref={passwordConfirmationInputRef}
                  autoCapitalize="none"
                  returnKeyType="send"
                  autoCorrect={false}
                  onSubmitEditing={() => { formRef.current?.submitForm(); }}
                  label="Confirmação de senha"
                  mode="flat"
                />
                <Buttons>
                  <Button
                    style={{ backgroundColor: '#e0e0e0' }}
                    button_style={{ color: '#686868' }}
                    onPress={handleBack}
                    icon={{
                      name: 'chevron-left', size: 15, color: '#686868', position: 'left', margin_text: 10,
                    }}
                  >voltar ao login
                  </Button>
                  <Button
                    onPress={() => { formRef.current?.submitForm(); }}
                    icon={{
                      name: 'chevron-right', size: 15, color: '#FFF', position: 'right', margin_text: 10,
                    }}
                  >Cadastrar
                  </Button>
                </Buttons>
              </Form>
            </Container>
          </ScrollView>
        </KeyboardAvoidingView>
      </PaperProvider>
    </>
  );
};

export default SignUp;

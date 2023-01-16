import React, { useEffect, useRef, useState } from 'react';
import NavigableSection from '../../components/NavigableSection';
import { Container, Headline, TextInput } from './styles';
import NavProvider from '../../contexts/Nav/Provider';
import { Form } from '@unform/mobile';
import { TextInput as Ti, ActivityIndicator, DataTable } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { ApplicationState } from '../../store';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import api from '../../services/api';
import ImageInput from '../../components/ImageInput';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { parseISO, format } from 'date-fns';
import { pt } from 'date-fns/locale';
const Profile: React.FC = () => {
  const Navigation = useNavigation();
  const formRef = useRef(null);
  const userA = useSelector<ApplicationState, FirebaseAuthTypes.User | undefined>((s) => s.user.data?.profile);
  const [user, setUser] = useState<any>({
    name: userA?.displayName,
    email: userA?.email,
    uid: userA?.uid,
    photoUrl: userA?.photoURL,
    cpf: ''
  });
  const [purchases, setPurchases] = useState<any[]>([]);
  useEffect(() => {
    handleGetData();
    handleFetchPurchasesFromApi();
  }, [])

  async function handleGetData() {
    try {
      const { data } = await api.get('/users/' + userA?.uid);
      const newUser = { ...user }
      newUser.cpf = data.cpf;
      setUser(newUser);
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

  async function handleFetchPurchasesFromApi() {
    try {
      const { data } = await api.get('/purchases');
      setPurchases(data);
    } catch (error) {
      console.log(error);
    }
  }

  function handleUpdateData(data: any) {
    console.log(data);

  }

  return (
    <NavProvider>
      <NavigableSection name="profile" sideBarColor="#3f51b5">
        <Container style={{ marginTop: 30 }}>
          <Headline>Perfil</Headline>
          {user.cpf !== "" ?
            <Form onSubmit={handleUpdateData} initialData={user} ref={formRef}>

              <ImageInput label="edite" defaultPhoto={user.photoUrl} />
              <TextInput
                name="uid"
                disabled
                left={
                  <Ti.Affix text="UID" />
                }
                label="UID do Usuário"
              />
              <TextInput name="name"
                label="Nome *"
                disabled

              />
              <TextInput
                name="email"
                label="E-mail *"
                disabled
                keyboardType="email-address"

              />
              <TextInput
                name="cpf"
                label="CPF *"
                disabled

              />
            </Form>
            : <ActivityIndicator size="large" style={{ marginTop: '40%' }} />}

        </Container>
      </NavigableSection>
      <NavigableSection name="purchases" sideBarColor="#4cac54">
        <Container>
          <Headline>Minhas Compras</Headline>

          <DataTable>
            <DataTable.Header>
              <DataTable.Title>#</DataTable.Title>
              <DataTable.Title>Estado da Compra</DataTable.Title>
              <DataTable.Title>Data da Compra</DataTable.Title>
            </DataTable.Header>
            {
              purchases
                .filter(p => p.state !== 'IN_CART')
                .map((p, i) => (
                  <DataTable.Row onPress={() => { Navigation.navigate('Purchase', { id: p.id }) }} key={p.id}>
                    <DataTable.Cell>{i + 1}</DataTable.Cell>
                    <DataTable.Cell numeric>{(() => {
                      switch (p.state) {
                        case 'PENDING':
                          return 'Pendente'
                        case 'AWAITING_PAYMENT':
                          return 'Aguardando Pagamento'
                        case 'CANCELLED':
                          return 'Cancellada'
                        case 'FINISHED':
                          return 'Finalizada'
                        case 'DONE':
                          return 'Concluída'
                      }
                    })()}</DataTable.Cell>
                    <DataTable.Cell numeric>{p?.created_at && format(parseISO(p?.created_at), "dd/MM/yyyy", { locale: pt })}</DataTable.Cell>
                  </DataTable.Row>
                ))
            }
          </DataTable>
        </Container>
      </NavigableSection>
    </NavProvider>
  );
}

export default Profile;

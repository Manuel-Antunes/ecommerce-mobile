import React, { useEffect } from 'react';
import { View, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { ActivityIndicator } from 'react-native-paper'
import { HeaderCheckout, Title } from './styles';
import { useSelector } from 'react-redux';
import { ApplicationState } from '../../store';
import { AuthState } from '../../store/ducks/auth/types';
import { useNavigation } from '@react-navigation/core';
export interface CheckoutProps {
  route: any;
}
const Checkout: React.FC<CheckoutProps> = ({ route }) => {
  const Navigation = useNavigation();
  const auth = useSelector<ApplicationState, AuthState>((state) => state.auth)

  useEffect(() => {
    if (!auth.data.signed) {
      Navigation.navigate('SignIn');
    }
  }, [auth])

  const stateChange = (state: any) => {
    switch (state.title) {
      case 'success':
        Alert.alert("Pagamento aprovado!", `Obrigado pela compra!`)
        break;
      case 'pending':
        Alert.alert("Pagamento pendente!", `Seu pagamento está pendente de processamento, assim que for processado seguiremos com o pedido!`)
        break;
      case 'failure':
        Alert.alert("Pagamento não aprovado!", 'Verifique os dados e tente novamente')
        break;
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <HeaderCheckout>
        <Title>Pagamento do pedido</Title>
      </HeaderCheckout>
      <WebView
        source={{ uri: `https://api.vivapenedo.com.br/checkout/mobile/${route.params.id}`, headers: { 'Authorization': 'bearer ' + auth.data.token } }}
        onNavigationStateChange={state => stateChange(state)}
        startInLoadingState={true}
        renderLoading={() => <ActivityIndicator></ActivityIndicator>}
      />
    </View>
  );
}

export default Checkout;

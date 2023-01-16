import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native-paper';
import WebView from 'react-native-webview';
export interface BilletProps {
  route: any;
}
const Billet: React.FC<BilletProps> = ({ route }) => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.goBack();
    }, 200);
  })
  return <WebView
    source={{ uri: `${route.params.id}` }}
    startInLoadingState={true}
    renderLoading={() => <ActivityIndicator></ActivityIndicator>}
  />
}
export default Billet;

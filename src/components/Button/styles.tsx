import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { Colors } from 'react-native-paper';
export const Container = styled(RectButton)`
  background-color: ${Colors.indigo500};
  border-radius: 5px;
  margin-top: 8px;
  padding: 11px;
  flex-direction: row;
  align-items: center;
`;
export const ButtonText = styled.Text`
  font-family:'Roboto-Light';
  font-weight: bold;
  color: #FFF;
  font-size: 13px;
`;

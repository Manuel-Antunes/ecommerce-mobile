import styled from 'styled-components/native';
import { Caption as C } from 'react-native-paper';
import T from '../../components/TextInput';
export const Container = styled.View`
 width: 100%;
 padding: 20px;
 padding-right: 40px;
`;
export const Headline = styled.Text`
  margin: 20px 0;
  font-size: 50px;
  font-family: 'Roboto-Light';
`;
export const TextInput = styled(T)`
  margin-bottom:10px;
`;

import styled from 'styled-components/native';
import { Modal as M } from 'react-native-paper';

export const Modal = styled(M)`
  align-items: center;
`;
export const Headline = styled.Text`
  font-size:18px;
  font-family: 'Roboto-Medium'
`;
export const Subhead = styled.Text`
  margin-top: 20px;
  margin-bottom: 20px;
  font-size:15px;
  font-family: 'Roboto-Regular';
  color: #686868;

`;
export const Container = styled.View`
  background-color: #FFF;
  width: 300px;
  padding: 20px;
  border-radius: 5px;
`;

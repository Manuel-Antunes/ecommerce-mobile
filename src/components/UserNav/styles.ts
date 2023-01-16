import styled from 'styled-components/native';
import { Colors } from 'react-native-paper';
export const Container = styled.View`
  position: absolute;
  flex-direction: row;
  right:20px;
  align-items: flex-start;
  top: 20px;
  z-index:1000;
`;
export const Name = styled.Text`
  font-size:20px;
  color:#FFF;
  right:-40px;
  max-width: 80%;
  font-family: 'Roboto-Medium';
  border-radius: 5px;
  padding: 5px 15px;
  padding-right: 40px;
  margin-left:10px;
  background-color: ${Colors.indigo500};
`

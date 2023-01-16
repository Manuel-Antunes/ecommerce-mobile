import styled from 'styled-components/native';
import T from '../../components/TextInput';
import P from '../../components/PasswordInput';
import { Form as F } from '@unform/mobile';
export const Container = styled.View`
  background-color: #FFF;
  align-items: center;
`;
export const Form = styled(F)`
  padding: 0 30px 30px;
  width: 100%;
`
export const Logo = styled.View`
  height: 200px;
  width: 100%;
`
export const Header = styled.Text`
  font-size: 70px;
  font-family: 'Roboto-Light';
`;

export const TextInput = styled(T)`
  margin-bottom: 20px;
  background-color: #e8f0fe;
`
export const BriefText = styled.Text`
  font-family: "RobotoSlab-Thin";
`
export const Buttons = styled.View`
  flex-direction:row;
  justify-content: space-between;
`

export const PasswordInput = styled(P)`
  margin-bottom: 20px;
  background-color: #e8f0fe;
`;
export const PhotoView = styled.TouchableOpacity`
  width:150px;
  height:150px;
  border-radius:75px;
  align-self: center;
  margin-bottom: 20px;
  background-color: red;
`;

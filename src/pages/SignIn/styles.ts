import styled from 'styled-components/native';
import T from '../../components/TextInput';
import logoImg from '../../assets/login/Penedo.png';
import P from '../../components/PasswordInput';
import { Form as F } from '@unform/mobile';

export const Container = styled.View`
  background-color: #FFF;
  align-items: center;
  flex:1;
`;
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
`
export const Form = styled(F)`
  padding: 30px;
  width: 100%;
`
export const BriefText = styled.Text`
  font-family: "Roboto-Light";
`
export const Buttons = styled.View`
  flex-direction:row;
  margin-top: 20px;

  justify-content: space-around;
`

export const PasswordInput = styled(P)`
  margin-bottom: 20px;
  background-color: #e8f0fe;
`;

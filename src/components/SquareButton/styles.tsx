import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

export const Container = styled(RectButton)`
  background-color: blue;
  width: 50px;
  height: 50px;
  justify-content:center;
  align-items: center;
  border-radius: 5px;
  transform: rotate(45deg); /* Equal to rotateZ(45deg) */
  margin: 10px;
`;
export const Icon = styled(FeatherIcon)`
    transform: rotate(-45deg);
/* Equal to rotateZ(45deg) */
    color:#FFF;
    overflow: visible;
    z-index: 1000000;
`

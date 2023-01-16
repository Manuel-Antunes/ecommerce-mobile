import React from 'react';
import { View } from 'react-native';
import { RectButtonProperties } from 'react-native-gesture-handler';
import { Icon } from './styles';

import { Container } from './styles';
interface ButtonProps extends RectButtonProperties {
  icon: string;
}
import FeatherIcon from 'react-native-vector-icons/Feather';

const SquareButton: React.FC<ButtonProps> = ({ icon }) => {
  return (
    <Container>
      <Icon size={20} name={icon}></Icon>
    </Container>
  );
}
export const Back = Container;
export const Front = Icon;
export default SquareButton;

import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { Text, TextProps, View } from 'react-native';
import { A } from './styles';

// import { Container } from './styles';
export interface AnchorProps extends TextProps {
  location: string;
}

const Anchor: React.FC<AnchorProps> = ({ children, location, ...rest }) => {
  const Navigation = useNavigation();
  function navigationHandler(where: string) {
    Navigation.navigate(where);
  }
  return <A onPress={() => { navigationHandler(location) }} {...rest}>{children}</A>;
}

export default Anchor;

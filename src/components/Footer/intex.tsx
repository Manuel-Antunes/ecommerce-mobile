import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigator } from '../../contexts/Nav/useNavigator';
import NavigableSection from '../NavigableSection';

import { CopyText, Container } from './styles';

const Footer: React.FC = () => {
  const { navigateToTop } = useNavigator();
  function handleBackToTop() {
    navigateToTop();
  }
  return (
    <NavigableSection name="footer" sideBarColor="#673ab7" >
      <Container>
        <CopyText>Projeto Voucher Digital, abril de 2021</CopyText>
        <Button onPress={handleBackToTop}>VOLTAR AO TOPO</Button>
      </Container>
    </NavigableSection>
  );
}

export default Footer;

import React from 'react';
import { Text, View } from 'react-native';

import { Container, Headline, SideBar, BackgroundGlobal } from '../global';
import { H1, P } from './styles';
import HomeLogo from '../../../../assets/icons/Info.png';


const About: React.FC = () => {
  return (
    <Container>
      <BackgroundGlobal source={HomeLogo}>
        <Headline>Sobre</Headline>
        <H1>Cidade</H1>
        <P>Penedo é um município brasileiro do estado de Alagoas localizado ao sul do estado, às margens do Rio São Francisco, na divisa com o estado de Sergipe. Sua população estimada em 2004 era de 65.429 habitantes.</P>
        <H1>História</H1>
        <P>O nome Penedo originou-se de a grande pedra. O povoado, fundado por Duarte Coelho de Albuquerque (filho de Duarte Coelho Pereira), das principais cidades históricas do Brasil, foi elevado a vila de São Francisco em 1636 e em fins do século XIX passou a ser denominada Penedo do Rio São Francisco. Sua arquitetura atrai turistas de numerosas origens. A Igreja de Santa Maria dos Anjos é uma das obras primas mais visitadas. Entretanto, os historiadores alagoanos discordam quanto a sua origem. Uns dizem que a criação do povoado está relacionada a Duarte Coelho Pereira, primeiro donatário da Capitania de Pernambuco. Os que discordam, afirmam que o responsável foi Duarte Coelho de Albuquerque, segundo donatário da Capitania, que herdou do pai. Entre os que defendem essa hipótese está Craveiro Costa, para quem a conquista de Alagoas começou em 1560. Duarte Coelho de Albuquerque organizou duas bandeiras, uma com destino ao norte de Olinda e outra para o sul. A bandeira que se dirigiu ao sul, à qual se incorporaram o próprio Duarte Coelho de Albuquerque e seu irmão, atingiu o rio São Francisco entre 1560 e 1565 e teria dado origem ao povoado. A primeira sesmaria registrada na região data de 1596; outras foram distribuídas e, a partir de 1613, na sesmaria recebida por Cristóvão da Rocha, acredita-se ter sido fundado oficialmente o povoado.</P>
      </BackgroundGlobal>
    </Container>

  );
}

export default About;

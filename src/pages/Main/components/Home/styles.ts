import styled from 'styled-components/native';
import { Searchbar as S } from 'react-native-paper';

export const Container = styled.View`
  align-items: center;
  padding: 0 15px;
`;
export const Splash = styled.Image`
  margin-top: 20px;
  height: 200px;
  width:100%;
  border-radius: 5px;
  margin-bottom: 20px;
`
export const NavButtons = styled.View`
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
`;
export const Searchbar = styled(S)`
  margin: 20px 0;
`

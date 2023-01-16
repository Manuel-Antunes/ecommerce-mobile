import styled from 'styled-components/native';
import { Headline as H, Caption as C } from 'react-native-paper';
export const Container = styled.View`
  padding: 20px;
  flex:1;
`;
export const Headline = styled(H)`
  font-size: 33px;
`;
export const Description = styled(C)`
    font-size: 20px;
    /* margin-top:10px; */

`;
export const Subheadline = styled.Text`

`;
export const Cover = styled.View`
  height:200px;
  border-radius: 5px;
  margin-bottom: 20px;
`;

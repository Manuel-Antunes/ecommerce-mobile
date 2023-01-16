import styled from 'styled-components/native';
import { Caption } from 'react-native-paper';
export const Container = styled.View`
  width:100%;
  padding: 20px;
  margin-top: 70px;
  padding-right:40px;
`;
export const AmountInput = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  height:40px;
  align-self:center;
  border-color: blue;
  border-width: 1px;
`;
export const Headline = styled.Text`
  font-family: 'Roboto-Light';
  margin-bottom: 20px;
  font-size: 40px;
`;

export const OrderSummary = styled.View`
  background-color: #e0e0e0;
  padding:20px;
  border-radius:5px;
`;
export const OrderEntry = styled.View`
  flex-direction: row;
  padding: 10px 0;
  justify-content: space-between;
`
export const List = styled.View`
  margin-bottom:30px;
`

export const Item = styled.View`
  flex-direction: row;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  padding: 10px 10px;
  margin-top:5px;
`

export const Banner = styled.Image`
  width: 70px;
  height: 70px;
`;
export const ItemDescription = styled.View`
  margin-left: 20px;
  flex:1;
`;

export const ItemName = styled.Text`
  font-family: 'Roboto-Regular';
  font-size: 15px;
`;
export const ItemSpecs = styled(Caption)`

`;

export const ItemPrice = styled.Text`
  font-family: 'Roboto-Light';
  align-self:flex-end;
  margin-bottom: 5px;
  font-size: 20px;
`;

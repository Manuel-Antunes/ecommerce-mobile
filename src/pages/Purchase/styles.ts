import styled from "styled-components/native";
import { Caption } from 'react-native-paper';
import { List as L } from 'react-native-paper'
import { RectButton } from "react-native-gesture-handler";

export const Container = styled.View`
 width: 100%;
 padding: 20px;
 padding-right: 40px;
`;
export const Info = styled.Text`

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
  margin:20px 0;
`

export const Item = styled(RectButton)`
  flex-direction: row;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  padding: 10px 10px;
`
export const PurchaseDetails = styled.View`
  background-color: #e0e0e0;
  padding:20px 10px;
  border-radius:5px;
`;

export const Banner = styled.Image`
  width: 70px;
  height: 70px;
`;
export const ItemDescription = styled.View`
  margin-left: 20px;
  justify-content: space-between;
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
export const Headline = styled.Text`
  font-family: 'Roboto-Light';
  margin-bottom: 20px;
  font-size: 40px;
`;

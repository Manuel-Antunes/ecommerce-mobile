import React from 'react';
import { View } from 'react-native';
import { Colors } from 'react-native-paper';
import P, { PickerSelectProps } from 'react-native-picker-select';
import styled from 'styled-components';
// import { Container } from './styles';
import A from 'react-native-vector-icons/MaterialCommunityIcons';
const Picker: React.FC<PickerSelectProps> = ({ items, onValueChange, ...rest }) => {
  return (
    <P
      onValueChange={onValueChange}
      items={items}
      style={{ placeholder: { color: '#FFF' }, viewContainer: { backgroundColor: Colors.indigo500, borderRadius: 5, marginVertical: 10 } }}
      Icon={() => <A name="chevron-up" size={30} color="#FFF" />}
      {...rest}
    />
  )
}
const PS = styled(P)`
  font-family: 'Roboto';
  background-color: ${Colors.indigo500}
`
export default Picker;

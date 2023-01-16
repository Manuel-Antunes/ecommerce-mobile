import React, { useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Form } from '@unform/mobile';
import TextInput from '../../components/TextInput';
import { Colors, FAB, Portal, TextInput as T } from 'react-native-paper';
import { SubmitHandler, FormHandles } from '@unform/core'
import { Front } from '../../components/SquareButton';
import Material from 'react-native-vector-icons/MaterialIcons';
// import { Container } from './styles';
interface FormData {
  name: string
  email: string
}

const Test: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const onStateChange = (object: any) => setOpen(object.open);

  const styles = StyleSheet.create({
    fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      top: 0,
      display: 'flex',
      backgroundColor: 'blue',
      width: 50,
      height: 50,
      borderColor: "#FFF",
      borderStyle: 'solid',
      borderWidth: 4,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
      transform: [{ rotate: "45deg" }],
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0,
      shadowRadius: 0,
      elevation: 0,
    }
  })
  const formRef = useRef<FormHandles>(null);
  const handleSubmit: SubmitHandler<FormData> = data => {
    console.log('Toaqi');

    console.log(data)
  }
  return (
    <View>
      <Portal>
        <FAB
          style={styles.fab}
          small
          icon="plus"
          onPress={() => console.log('Pressed')}
        />
      </Portal>
    </View>
  );
}

export default Test;

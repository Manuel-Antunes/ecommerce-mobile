import React, { useState } from 'react';
import { ImageBackground } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Container, FloatingLabel } from './styles';

interface ImageInputProps {
  defaultPhoto?: string;
  label?: string;
}

const ImageInput: React.FC<ImageInputProps> = ({ defaultPhoto, label }) => {
  const [photo, setPhoto] = useState<any>({ uri: defaultPhoto });

  return (
    <Container
      style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
      onPress={
        () => {
          launchImageLibrary({ mediaType: 'photo' }, (p) => {
            if (!p.didCancel) {
              setPhoto(p);
            }
          })
        }
      } >
      {photo && <ImageBackground
        imageStyle={{ borderRadius: 75 }}
        resizeMode='cover' style={{ width: '100%', height: '100%' }} source={{ uri: photo.uri }}></ImageBackground>}
      <FloatingLabel style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}><FontAwesome name="image" /> {label ? label : 'Selecione'}</FloatingLabel>
    </Container>
  )
}


export default ImageInput;

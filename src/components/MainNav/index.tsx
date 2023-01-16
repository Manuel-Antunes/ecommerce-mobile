import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FAB, Portal, Colors } from 'react-native-paper';
import { Front } from '../SquareButton';
import Material from 'react-native-vector-icons/MaterialIcons';
import { useNavigator } from '../../contexts/Nav/useNavigator';
const MainNav: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const Navigation = useNavigation();
  const { navigateByName } = useNavigator();
  const onStateChange = (object: any) => setOpen(object.open);
  function handleMove(name: string) {
    navigateByName(name);
  }
  const styles = StyleSheet.create({
    fab: {
      display: 'flex',
      backgroundColor: 'blue',
      width: 50,
      height: 50,
      borderColor: "#FFF",
      borderStyle: 'solid',
      borderWidth: 4,
      marginRight: 283,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
      transform: [{ rotate: "45deg" }],
      marginTop: 10,
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

  return (
    <Portal>
      <FAB.Group
        visible={true}
        open={open}
        color="#FFF"
        icon={open ? (props) => <Front name="x" {...props} />
          : (props) => <Front name="menu" {...props} />}
        fabStyle={{ ...styles.fab, marginRight: styles.fab.marginRight + 15, }}
        actions={[
          {
            icon: (props) => <Front name="home" {...props} />,
            onPress: () => {
              handleMove('home')
            },
            style: { ...styles.fab, backgroundColor: Colors.indigo500 },
            small: false
          },
          {
            icon: (props) => <Front name="calendar" {...props} />,
            style: { ...styles.fab, backgroundColor: '#4cac54' },
            small: false,
            onPress: () => {
              handleMove('events')
            },
          },
          {
            icon: (props) => <Front name="image" {...props} />,
            style: { ...styles.fab, backgroundColor: "#d32f2f" },
            small: false,
            onPress: () => {
              handleMove('medias')
            },
          },
          {
            icon: (props) => <Material style={{
              transform: [{ rotate: "-45deg" }],
            }} name="attach-money" {...props} />,
            color: "#FFF",
            style: { ...styles.fab, backgroundColor: "#ff9800" },
            small: false,
            onPress: () => {
              handleMove('market')
            },
          },
          {
            icon: (props) => <Front name="info" {...props} />,
            style: { ...styles.fab, backgroundColor: "#673ab7" },
            onPress: () => {
              handleMove('about')
            },
            small: false,
          },
        ]}
        onStateChange={onStateChange}
        onPress={() => {
          if (open) {
            // do something if the speed dial is open
          }
        }}
      />
    </Portal>
  );
}

export default MainNav;

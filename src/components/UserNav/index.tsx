import { useNavigation } from '@react-navigation/core';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors, FAB } from 'react-native-paper';
import { Front } from '../SquareButton';
import { darken } from 'polished';
import { Container, Name } from './styles';
import { LoginGoogle } from '../../services/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../store';
import { AuthState } from '../../store/ducks/auth/types';
import { UserState } from '../../store/ducks/user/types';
import { signOutRequest } from '../../store/ducks/auth/actions';
const UserNav: React.FC = () => {
  const dispatch = useDispatch();
  const auth = useSelector<ApplicationState, AuthState>((s) => s.auth);
  const user = useSelector<ApplicationState, UserState>((s) => s.user);
  const [showingInfo, setShowingInfo] = useState(false);
  const Navigation = useNavigation();
  const styles = StyleSheet.create({
    fab: {
      display: 'flex',
      width: 40,
      height: 40,
      marginLeft: 20,
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
  async function handelSignOut() {
    if (auth.data.signed) {
      await LoginGoogle.signOut();
      dispatch(signOutRequest())
      setShowingInfo(false);
    }
  }
  async function handleProfile() {
    if (auth.data.signed) {
      setShowingInfo(!showingInfo);

    } else {
      Navigation.navigate('SignIn');
    }
  }
  return (
    <Container>
      <FAB
        small
        style={{
          right: showingInfo ? -40 : 0,

          ...styles.fab, backgroundColor: auth.data.signed ? Colors.indigo500 : '#686868',
        }}
        icon={(props) => <Front name="shopping-cart" {...props} />}
        onPress={() => { Navigation.navigate('Cart') }}
      />
      {showingInfo && (<Name numberOfLines={1} >{user.data?.profile && user.data?.profile.displayName}</Name>)}
      <View style={{ position: 'relative' }}>
        <FAB
          small
          style={{
            ...styles.fab, backgroundColor: auth.data.signed ? showingInfo ? darken(.1, Colors.indigo500) : Colors.indigo500 : '#686868',
          }}
          icon={(props) => <Front name="user" {...props} />}
          onPress={() => {
            handleProfile()
          }}
        />
        {showingInfo && (
          <>
            <FAB
              small
              style={{
                marginTop: 20,
                ...styles.fab, backgroundColor: Colors.indigo500
              }}
              icon={(props) => <Front name="edit-2" {...props} />}
              onPress={() => {
                Navigation.navigate('Profile', { id: user.data?.profile.uid })
              }}
            />
            <FAB
              small
              style={{
                marginTop: 20,
                ...styles.fab, backgroundColor: '#b71c1c'
              }}
              icon={(props) => <Front name="power" {...props} />}
              onPress={() => {
                handelSignOut()
              }}
            />
          </>
        )}
      </View>
    </Container>

  );


}

export default UserNav;

import React, { forwardRef, useCallback, useRef, useState } from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';
import { NavContext, NavSection } from './types';
// import { Container } from './styles';
import { NavigatiorContext } from './Context'
import Footer from '../../components/Footer/intex';
import UserNav from '../../components/UserNav';
import { useNavigation } from '@react-navigation/native';
import { RefreshProvider, useRefresh } from '../Refresh/Context';
const NavProvider: React.FC<{ refreshable?: boolean }> = ({ children, refreshable }) => {
  const Navigation = useNavigation();
  const fields = useRef<NavSection[]>([])
  const navigationRef = useRef<ScrollView>(null);
  const tests = useRef<View>();
  const wait = (timeout: number) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  const registerSection = useCallback((field: NavSection) => {
    console.tron.log(field.name);
    fields.current.push(field)
  }, []);
  const { startRefresh, refreshing, stopRefresh } = useRefresh();
  const navigateByName = useCallback((name: string) => {
    const f = fields.current.find((f) => {
      return f.name === name;
    });
    console.log('aca');

    f?.ref.current?.measureInWindow((x: number, y: number) => {
      console.log(y);

      navigationRef.current?.scrollTo({ y, x, animated: true });
    });
    // tests.current?.measureInWindow
  }, []);

  const navigateToTop = useCallback(() => {
    navigationRef.current?.scrollTo({ x: 0, y: 0, animated: true });
  }, [])

  const onRefresh = React.useCallback(() => {
    startRefresh()
    wait(2000).then(() => stopRefresh());
  }, []);
  return (
    <NavigatiorContext.Provider value={{
      registerSection,
      navigateByName,
      navigateToTop
    }}
    >
      <UserNav />
      <ScrollView ref={navigationRef} refreshControl={refreshable ? <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> : undefined} >
        {children}
        <Footer />
      </ScrollView>
    </NavigatiorContext.Provider >
  );

}

export default NavProvider;

import React, { useContext, useEffect, useRef } from 'react';
import { View, ViewProps, TextInputProps, LayoutChangeEvent } from 'react-native';
import { useNavigator } from '../../contexts/Nav/useNavigator';
import { Dimensions } from 'react-native';
const window = Dimensions.get("window");
import { Container, SideBar } from './styles';
interface NavigableSectionProps extends ViewProps {
  sideBarColor: string;
  ref?: any;
  name: string;
}

const NavigableSection: React.FC<NavigableSectionProps> = ({ sideBarColor, children, name, ...rest }) => {
  const { registerSection } = useNavigator();
  const divRef = useRef<View>(null);
  useEffect(() => {
    registerSection(
      { name, ref: divRef }
    )
  }, [divRef])

  function handleTest() {
    divRef.current?.measure((x, y) => {
    })
  }
  return (
    <Container style={{ minHeight: name === 'footer' ? 0 : window.height }} onLayout={handleTest} ref={divRef} {...rest}>
      <SideBar color={sideBarColor} />
      {children}
    </Container>
  );
}

export default NavigableSection;

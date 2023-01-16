import React from 'react';
import { Container, ButtonText } from './styles';
import { RectButtonProperties } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleProp, ViewStyle } from 'react-native';

interface ButtonProps extends RectButtonProperties {
  children: string;
  icon?: string | {
    color?: string;
    size?: number;
    name: string;
    position?: 'left' | 'right';
    margin_text?: number;
  };
  font_size?: number;
  style?: StyleProp<ViewStyle>;
  button_style?: any
}
function generate(children: any, icon: any, font_size: number = 14, style: any) {
  if (icon) {
    if (typeof icon === 'string') {
      return (
        <>
          <Icon name="icon" style={{ marginRight: children !== " " ? 10 : 0 }} ></Icon>
          <ButtonText style={{ fontSize: font_size, ...style }}>
            {children}
          </ButtonText>
        </>
      )
    } else {
      if (icon.position) {
        if (icon.position === "left") {
          return (
            <>
              <Icon {...icon} style={{ marginRight: icon.margin_text }}></Icon>
              <ButtonText style={{ fontSize: font_size, ...style }}>
                {children}
              </ButtonText>
            </>
          )
        } else {
          return (
            <>
              <ButtonText style={{ fontSize: font_size, ...style }}>
                {children}
              </ButtonText>
              <Icon {...icon} style={{ marginLeft: icon.margin_text }}></Icon>
            </>
          )
        }
      } else {
        return (
          <>
            <Icon {...icon} style={{ marginRight: icon.margin_text }}></Icon>
            <ButtonText style={{ fontSize: font_size, ...style }}>
              {children}
            </ButtonText>
          </>
        )
      }
    }
  } else {
    return (
      <ButtonText style={{ fontSize: font_size, ...style }}>
        {children}
      </ButtonText>
    )
  }
}
const Button: React.FC<ButtonProps> = ({ children, icon, style, button_style, font_size, ...rest }) => {
  return (
    <Container style={{
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      ...style
    }} {...rest}>
      {generate(children, icon, font_size, button_style)}
    </Container>
  );
}

export default Button;

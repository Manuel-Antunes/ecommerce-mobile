import React, { useState } from 'react';
import { View } from 'react-native';
import TextInput, { TextInputProps } from '../TextInput';
import { TextInput as T } from 'react-native-paper';

// import { Container } from './styles';

export interface PasswordInputProps extends TextInputProps {
  label: string;
  mode?: "flat" | "outlined";
}

const PasswordInput: React.FC<PasswordInputProps> = React.forwardRef(({ label, mode, ...rest }, ref) => {
  const [passwordShowing, setPasswordShowing] = useState(false);

  function handleShowPassword() {
    if (passwordShowing) {
      setPasswordShowing(false);
    } else {
      setPasswordShowing(true);
    }
  }
  return (
    <TextInput
      label={label}
      style={{ backgroundColor: "#e8f0fe" }}
      secureTextEntry={!passwordShowing}
      ref={ref}
      mode={mode}
      autoCorrect={false}
      autoCapitalize="none"
      left={
        <T.Icon style={{ backgroundColor: "#e0e0e0", width: '180%', height: '260%', marginRight: 10, borderRadius: 3 }} name="lock"></T.Icon>
      }
      right={
        <T.Icon forceTextInputFocus={false} style={{ backgroundColor: "#e0e0e0", width: '280%', height: '260%', marginRight: 25, borderRadius: 3 }} onPress={handleShowPassword} name={passwordShowing ? "eye" : "eye-off"}></T.Icon>
      }
      {...rest}
    />
  );
})

export default PasswordInput;

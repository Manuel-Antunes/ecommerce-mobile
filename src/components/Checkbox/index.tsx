// import React, { useEffect, useImperativeHandle, useRef } from 'react';
// import { Checkbox as C } from 'react-native-paper';

// import { useField, FormHandles } from '@unform/core';
// import { Props } from 'react-native-paper/lib/typescript/components/Checkbox/CheckboxAndroid';
// // import { Container } from './styles';
// export interface CheckboxProps extends Omit<Props, 'theme'> {
//   name: string;
// }
// interface InputValueReference {
//   value: string;
// }
// interface InputRef {
//   focus(): void;
// }

// const Checkbox = React.forwardRef<InputRef, CheckboxProps>(({ name, ...rest }, ref) => {
//   const { clearError, defaultValue, fieldName, registerField, error } = useField(name);
//   const inputRef = useRef<InputValueReference>({ value: defaultValue });
//   const inputElementRef = useRef<any>(null);
//   useImperativeHandle(ref, () => ({
//     focus() {
//       inputElementRef.current.focus();
//     },
//   }));

//   useEffect(() => {
//     registerField<string>({
//       name: fieldName,
//       ref: inputRef.current,
//       path: 'value',
//       setValue(ref: any, value) {
//         inputRef.current.value = value;
//         inputElementRef.current.setNativeProps({ text: value });
//       },
//       clearValue() {
//         inputRef.current.value = '';
//         inputElementRef.current.clear();
//       },

//     })
//   }, [fieldName, registerField]);
//   return <C ref={inputElementRef}
//       defaultValue={defaultValue} {...rest}></C>;
// })

// export default Checkbox;

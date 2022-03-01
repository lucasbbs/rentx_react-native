import React, { useState } from 'react';
import { TextInputProps, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import { Container, InputText, IconContainer } from './styles';

interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
  value?: string;
}

export function PasswordInput({ value, iconName, ...rest }: Props) {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  function handleInputFocus() {
    setIsFocused(true);
  }
  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!value);
  }
  const theme = useTheme();

  const [isPasswordVisible, setIsPasswordVisible] = useState(true);

  function handlePasswordVisibilityChange() {
    setIsPasswordVisible(!isPasswordVisible);
  }

  return (
    <Container>
      <IconContainer isFocused={isFocused}>
        <Feather
          name={iconName}
          size={24}
          color={
            isFocused || isFilled ? theme.colors.main : theme.colors.text_detail
          }
        />
      </IconContainer>
      <InputText
        isFocused={isFocused}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        secureTextEntry={isPasswordVisible}
        {...rest}
      />
      <TouchableOpacity onPress={handlePasswordVisibilityChange}>
        <IconContainer isFocused={isFocused}>
          <Feather
            name={isPasswordVisible ? 'eye' : 'eye-off'}
            size={24}
            color={theme.colors.text_detail}
          />
        </IconContainer>
      </TouchableOpacity>
    </Container>
  );
}

import React, { useState } from 'react';
import {
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';
import theme from '../../styles/theme';
import * as Yup from 'yup';

import { Container, Header, Title, SubTitle, Footer, Form } from './styles';
import { useNavigation } from '@react-navigation/native';

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .required('Email obrigatório')
          .email('Digite um email válido'),
        password: Yup.string().required('A senha é obrigatória'),
      });

      await schema.validate({ email, password });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert('Opa', error.message);
      } else {
        Alert.alert(
          'Erro na autenticação ',
          'Ocorreu um erro ao fazer login, verifique as credenciais'
        );
      }
    }
  };
  const navigation = useNavigation();

  const handleNewAccount = () => {
    navigation.navigate('SignUpFirstStep');
  };
  return (
    <KeyboardAvoidingView behavior='position' enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar
            barStyle='default'
            translucent
            backgroundColor='transparent'
          />
          <Header>
            <Title>Estamos{'\n'}quase lá.</Title>
            <SubTitle>
              Faça seu login para começar{'\n'}uma experiência incrível
            </SubTitle>
          </Header>
          <Form>
            <Input
              iconName='mail'
              placeholder='E-mail'
              keyboardType='email-address'
              autoCorrect={false}
              onChangeText={setEmail}
              value={email}
            />
            <PasswordInput
              iconName='lock'
              placeholder='Password'
              onChangeText={setPassword}
              value={password}
            />
          </Form>
          <Footer>
            <Button
              title='Login'
              onPress={handleSignIn}
              disabled={false}
              loading={false}
            />
            <Button
              title='Criar conta gratuita'
              onPress={handleNewAccount}
              disabled={false}
              light
              loading={false}
              color={theme.colors.background_secondary}
            />
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

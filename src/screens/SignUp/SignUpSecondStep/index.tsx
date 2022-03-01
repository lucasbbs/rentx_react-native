import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  StatusBar,
  TouchableWithoutFeedback,
} from 'react-native';
import { useTheme } from 'styled-components';
import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Button } from '../../../components/Button';
import { PasswordInput } from '../../../components/PasswordInput';

import {
  Container,
  Header,
  Steps,
  Title,
  SubTitle,
  Form,
  FormTitle,
} from './styles';

interface Params {
  user: {
    name: string;
    email: string;
    driverLicense: string;
  };
}

export function SignUpSecondStep() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();
  const theme = useTheme();
  const route = useRoute();

  const { user } = route.params as Params;

  function handleBak() {
    navigation.goBack();
  }

  const handleRegister = () => {
    if (!password || !confirmPassword)
      return Alert.alert('Informe a senha e a confirmação');

    if (password != confirmPassword) {
      return Alert.alert('As senhas não são iguais');
    }
    navigation.navigate('Confirmation', {
      nextScreenRoute: 'SignIn',
      title: 'Conta criada!',
      message: 'Agora é só fazer login\ne aproveitar',
    });
  };

  return (
    <KeyboardAvoidingView behavior='position' enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar
            barStyle='light-content'
            backgroundColor='transparent'
            translucent
          />
          <Header>
            <BackButton onPress={handleBak} />
            <Steps>
              <Bullet active />
              <Bullet />
            </Steps>
          </Header>

          <Title>
            Crie sua{'\n'}
            conta
          </Title>
          <SubTitle>
            Faça seu cadastro de{'\n'}
            forma rápida e fácil
          </SubTitle>

          <Form>
            <FormTitle>2. Senha</FormTitle>
            <PasswordInput
              iconName='lock'
              placeholder='Senha'
              value={password}
              onChangeText={setPassword}
            />
            <PasswordInput
              iconName='lock'
              placeholder='Repetir Senha'
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </Form>

          <Button
            title='Cadastrar'
            onPress={handleRegister}
            color={theme.colors.success}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

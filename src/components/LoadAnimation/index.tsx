import React from 'react';
import LoadingCar from '../../assets/loadingCar.json';

import LottieView from 'lottie-react-native';

import { Container } from './styles';

export function LoadAnimation() {
  return (
    <Container>
      <LottieView
        style={{ height: 200 }}
        resizeMode='contain'
        source={LoadingCar}
        autoPlay
        loop
      />
    </Container>
  );
}

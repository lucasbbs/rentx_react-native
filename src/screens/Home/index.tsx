import React, { useEffect, useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
} from 'react-native';

import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const ButtonAnimated = Animated.createAnimatedComponent(TouchableOpacity);

import { Ionicons } from '@expo/vector-icons';
import {
  Container,
  Header,
  TotalCars,
  HeaderContent,
  CarList,
  MyCarsButtonWrapper,
} from './styles';

import Logo from '../../assets/logo.svg';
import { RFValue } from 'react-native-responsive-fontsize';
import { Car } from '../../components/Car';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';
import { LoadAnimation } from '../../components/LoadAnimation';
import { useTheme } from 'styled-components';
import { PanGestureHandler } from 'react-native-gesture-handler';

export function Home() {
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCars() {
      try {
        const { data: carData } = await api.get('/cars');
        setCars(carData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchCars();
  }, []);

  const navigation = useNavigation();

  function handleCarDetails(car: CarDTO) {
    navigation.navigate('CarDetails', { car });
  }
  function handleOpenMyCars() {
    navigation.navigate('MyCars');
  }
  const theme = useTheme();

  const positionY = useSharedValue(0);
  const positionX = useSharedValue(0);

  const myCarsButtonStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: positionX.value },
      { translateY: positionY.value },
    ],
  }));

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_: any, ctx: any) {
      ctx.positionX = positionX.value;
      ctx.positionY = positionY.value;
    },
    onActive(event: any, ctx: any) {
      positionY.value = ctx.positionY + event.translationY;
      positionX.value = ctx.positionX + event.translationX;
    },
    onEnd() {
      positionX.value = withSpring(0);
      positionY.value = withSpring(0);
    },
  });

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => true);
  }, []);

  return (
    <Container>
      <StatusBar
        barStyle='light-content'
        translucent={true}
        backgroundColor='transparent'
      />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />
          {!loading && <TotalCars>Total de {cars.length} carros</TotalCars>}
        </HeaderContent>
      </Header>
      {loading ? (
        <LoadAnimation />
      ) : (
        <CarList
          data={cars}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <Car data={item} onPress={() => handleCarDetails(item)} />
          )}
        />
      )}

      <MyCarsButtonWrapper>
        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <Animated.View style={[myCarsButtonStyle, { position: 'absolute' }]}>
            <ButtonAnimated
              style={[styles.button, { backgroundColor: theme.colors.main }]}
              onPress={handleOpenMyCars}
            >
              <Ionicons
                name='ios-car-sport'
                size={32}
                color={theme.colors.shape}
              />
            </ButtonAnimated>
          </Animated.View>
        </PanGestureHandler>
      </MyCarsButtonWrapper>
    </Container>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

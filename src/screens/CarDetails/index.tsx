import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';

import { ImageSlider } from '../../components/ImageSlider';

import speedSvg from '../../assets/speed.svg';
import accelerationSvg from '../../assets/acceleration.svg';
import forceSvg from '../../assets/force.svg';
import gasolineSvg from '../../assets/gasoline.svg';
import exchangeSvg from '../../assets/exchange.svg';
import peopleSvg from '../../assets/people.svg';

import {
  CarImages,
  Container,
  Header,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  About,
  Accessories,
  Footer,
} from './styles';
import { Button } from '../../components/Button';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CarDTO } from '../../dtos/CarDTO';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  useSharedValue,
  Extrapolate,
} from 'react-native-reanimated';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

interface Params {
  car: CarDTO;
}

export function CarDetails() {
  const route = useRoute();
  const {
    car: {
      brand,
      name,
      rent: { period, price },
      accessories,
      about: aboutDTO,
      thumbnail,
      fuel_type,
      photos,
      id,
    },
  } = route.params as Params;
  const navigation = useNavigation();

  function handleConfirmRental() {
    navigation.navigate('Scheduling', {
      car: {
        brand,
        name,
        rent: { period, price },
        accessories,
        about: aboutDTO,
        thumbnail,
        fuel_type,
        photos,
        id,
      },
    });
  }

  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
    console.log(event.contentOffset.y);
  });

  const stylerCarsStyleAnimation = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [0, 150], [1, 0], Extrapolate.CLAMP),
  }));

  const headerStyleAnimation = useAnimatedStyle(() => ({
    height: interpolate(scrollY.value, [0, 200], [200, 70], Extrapolate.CLAMP),
  }));

  function handleBack() {
    navigation.goBack();
  }
  return (
    <Container>
      <StatusBar
        barStyle='dark-content'
        translucent
        backgroundColor='transparent'
      />

      <Animated.View style={[headerStyleAnimation, styles.header]}>
        <Header>
          <BackButton onPress={handleBack} />
        </Header>
        <Animated.View style={stylerCarsStyleAnimation}>
          <CarImages>
            <ImageSlider imageUrl={[thumbnail, ...photos]} />
          </CarImages>
        </Animated.View>
      </Animated.View>

      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={scrollHandler}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: getStatusBarHeight() + 160,
          alignItems: 'center',
        }}
        showsVerticalScrollIndicator={false}
      >
        <Details>
          <Description>
            <Brand>{brand}</Brand>
            <Name>{name}</Name>
          </Description>
          <Rent>
            <Period>{period}</Period>
            <Price>{`R$ ${price}`}</Price>
          </Rent>
        </Details>

        <Accessories>
          {accessories.map((accessory) => (
            <Accessory
              key={accessory.type}
              icon={getAccessoryIcon(accessory.type)}
              name={accessory.name}
            />
          ))}
        </Accessories>
        <About>
          {aboutDTO}
          {aboutDTO}
          {aboutDTO}
          {aboutDTO}
          {aboutDTO}
        </About>
      </Animated.ScrollView>
      <Footer>
        <Button
          title='Escolher período do aluguel'
          onPress={handleConfirmRental}
        />
      </Footer>
    </Container>
  );
}

const styles = StyleSheet.create({
  header: { position: 'absolute', overflow: 'hidden', zIndex: 1 },
});

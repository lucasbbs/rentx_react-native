import React from 'react';
import { StatusBar } from 'react-native';
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
  Content,
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
      <Header>
        <BackButton onPress={handleBack} />
      </Header>
      <CarImages>
        <ImageSlider imageUrl={[thumbnail, ...photos]} />
      </CarImages>

      <Content>
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
          {/* <Accessory icon={accelerationSvg} name='3.2s' />
          <Accessory icon={forceSvg} name='800HP' />
          <Accessory icon={gasolineSvg} name='Gasolina' />
          <Accessory icon={exchangeSvg} name='Auto' />
          <Accessory icon={peopleSvg} name='2 pessoas' /> */}
        </Accessories>
        <About>{aboutDTO}</About>
      </Content>
      <Footer>
        <Button
          title='Escolher período do aluguel'
          onPress={handleConfirmRental}
        />
      </Footer>
    </Container>
  );
}

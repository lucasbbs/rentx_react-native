import React from 'react';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { Alert, StatusBar } from 'react-native';
import { useTheme } from 'styled-components';

import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
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
  Accessories,
  Footer,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
} from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CarDTO } from '../../dtos/CarDTO';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

import api from '../../services/api';

interface Params {
  car: CarDTO;
  dates: string[];
  startDate: string;
  endDate: string;
}

export function SchedulingDetails() {
  const route = useRoute();
  const {
    dates,
    startDate,
    endDate,
    car: {
      brand,
      name,
      rent: { period, price },
      accessories,
      about,
      thumbnail,
      fuel_type,
      photos,
      id,
    },
  } = route.params as Params;

  const navigation = useNavigation();

  async function handleConfirmRental() {
    const { data } = await api.get(`/schedules_bycars/${id}`);

    const unavailable_dates = [...data.unavailable_dates, ...dates];
    try {
      await api.post(`/schedules_byuser`, {
        user_id: 1,
        car: {
          brand,
          name,
          rent: { period, price },
          accessories,
          about,
          thumbnail,
          fuel_type,
          photos,
          id,
        },
        startDate,
        endDate,
      });

      await api.put(`/schedules_bycars/${id}`, { id, unavailable_dates });
      navigation.navigate('SchedulingComplete');
    } catch (error) {
      Alert.alert('Não foi possível confirmar o agendamento');
    }
  }
  const theme = useTheme();

  function handleBack() {
    navigation.goBack();
  }

  return (
    <Container>
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
        </Accessories>

        <RentalPeriod>
          <CalendarIcon>
            <Feather
              name='calendar'
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{startDate}</DateValue>
          </DateInfo>
          <Feather
            name='chevron-right'
            size={RFValue(10)}
            color={theme.colors.shape}
          />
          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>{endDate}</DateValue>
          </DateInfo>
        </RentalPeriod>
        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>{`R$ ${price} x ${dates.length} diárias`}</RentalPriceQuota>
            <RentalPriceTotal>
              {(price * dates.length).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>
      <Footer>
        <Button
          title='Alugar agora'
          color={theme.colors.success}
          onPress={handleConfirmRental}
        />
      </Footer>
    </Container>
  );
}

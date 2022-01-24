import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import {
  Container,
  Header,
  TotalCars,
  HeaderContent,
  CarList,
  MyCarsButton,
  MyCarsButtonWrapper,
} from './styles';

import Logo from '../../assets/logo.svg';
import { RFValue } from 'react-native-responsive-fontsize';
import { Car } from '../../components/Car';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';
import { Spinner } from '../../components/Spinner';
import { useTheme } from 'styled-components';

export function Home() {
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCars() {
      try {
        const { data: carData } = await api.get('/cars');
        setCars(carData);
        console.log(carData);
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
    console.log('teste');
    navigation.navigate('MyCars');
  }
  const theme = useTheme();

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
          <TotalCars>Total de 12 carros</TotalCars>
        </HeaderContent>
      </Header>
      {loading ? (
        <Spinner />
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
        <MyCarsButton onPress={handleOpenMyCars}>
          <Ionicons name='ios-car-sport' size={32} color={theme.colors.shape} />
        </MyCarsButton>
      </MyCarsButtonWrapper>
    </Container>
  );
}

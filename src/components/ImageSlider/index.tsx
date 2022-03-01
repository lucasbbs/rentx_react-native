import React, { useRef, useState } from 'react';
import { FlatList, ViewToken } from 'react-native';
import { Bullet } from '../Bullet';

import {
  Container,
  ImagesIndexes,
  ImageIndex,
  CarImageWrapper,
  CarImage,
} from './styles';

interface Props {
  imageUrl: string[];
}

interface ChangeImageProps {
  viewableItems: ViewToken[];
  changed: ViewToken[];
}

export function ImageSlider({ imageUrl }: Props) {
  const [imageIndex, setImageIndex] = useState(0);
  const indexChanged = useRef((info: ChangeImageProps) => {
    const index = info.viewableItems[0].index!;
    console.log(index);
    setImageIndex(index);
  });

  return (
    <Container>
      <ImagesIndexes>
        {imageUrl.map((_, index) => {
          return <Bullet key={index} active={index === imageIndex} />;
        })}
      </ImagesIndexes>

      <FlatList
        data={imageUrl}
        keyExtractor={(key) => key}
        renderItem={({ item }) => (
          <CarImageWrapper>
            <CarImage source={{ uri: item }} resizeMode='contain' />
          </CarImageWrapper>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={indexChanged.current}
      />
    </Container>
  );
}

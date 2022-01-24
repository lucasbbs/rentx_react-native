import React from 'react';

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

export function ImageSlider({ imageUrl }: Props) {
  return (
    <Container>
      <ImagesIndexes>
        <ImageIndex active={true} />
        <ImageIndex active={false} />
        <ImageIndex active={false} />
        <ImageIndex active={false} />
      </ImagesIndexes>
      <CarImageWrapper>
        <CarImage source={{ uri: imageUrl[0] }} resizeMode='contain' />
      </CarImageWrapper>
    </Container>
  );
}

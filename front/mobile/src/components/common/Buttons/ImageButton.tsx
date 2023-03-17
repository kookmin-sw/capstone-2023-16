import React, {FC} from 'react';
import {Image, ImageSourcePropType} from 'react-native';
//@ts-ignore
import styled from 'styled-components/native';

import {colors} from '../colors';
import {ButtonProps} from './types';

const ButtonView = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  background-color: ${colors.primary};
  max-width: 40px;
  height: 40px;
  padding: 12px;
  border-radius: 15px;
`;

interface ImageButtonProps extends ButtonProps {
  source: ImageSourcePropType;
}

const ImageButton: FC<ImageButtonProps> = props => {
  return (
    <ButtonView onPress={props.onPress} style={props.btnStyles}>
      <Image source={props.source} />
    </ButtonView>
  );
};

export default ImageButton;

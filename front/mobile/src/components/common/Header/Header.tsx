import React, {FC} from 'react';
import {Image, StyleProp, TextStyle, TouchableOpacity} from 'react-native';
//@ts-ignore
import styled from 'styled-components/native';
import {imagePath} from '../../../utils/imagePath';
import {DimensionTheme} from '../shared';
import RegularText from '../Texts/RegularText';

const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${DimensionTheme.width(11)};
  margin-top: ${DimensionTheme.width(10)};
`;

type HeaderProps = {
  navigation: any;
  title?: string;
  titleStyle?: StyleProp<TextStyle>;
};

export const Header: FC<HeaderProps> = ({navigation, title, titleStyle}) => {
  return (
    <HeaderContainer>
      <TouchableOpacity
        onPress={() => {
          navigation.pop();
        }}>
        <Image
          style={{
            width: DimensionTheme.width(22),
            height: DimensionTheme.width(22),
          }}
          source={imagePath.backBtn}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <RegularText textStyle={titleStyle}>{title}</RegularText>
    </HeaderContainer>
  );
};

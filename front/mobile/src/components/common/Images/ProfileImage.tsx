import React, {FC} from 'react';
import {Image, ImageSourcePropType} from 'react-native';
//@ts-ignore
import styled from 'styled-components/native';
import {colors} from '../colors';

const ImageContainer = styled.View`
  border-radius: 100px;
  border: 1px solid ${colors.graydark};
  width: 74px;
  height: 74px;
  align-items: center;
  justify-contents: center;
`;

const ImageTouchSection = styled.TouchableOpacity``;

interface ProfileImageProps {
  source: ImageSourcePropType;
}
const ProfileImage: FC<ProfileImageProps> = props => {
  return (
    <ImageContainer>
      <ImageTouchSection>
        <Image source={props.source} style={{marginTop: -4}} />
      </ImageTouchSection>
    </ImageContainer>
  );
};

export default ProfileImage;

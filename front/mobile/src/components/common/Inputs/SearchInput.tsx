import React, {FC} from 'react';
//@ts-ignore
import styled from 'styled-components/native';
import {Platform, ViewStyle} from 'react-native';

import {imagePath} from '../../../utils/imagePath';
import StyledTextInput from './StyledTextInput';
import {ScreenWidth} from '../shared';
import ImageButton from '../Buttons/ImageButton';
import {TextInputProps} from 'react-native';
import {StyleProp} from 'react-native';

const SearchInputContainer = styled.View`
  flex-direction: row;
  flex: 0.6;
  justify-content: space-between;
`;

interface SearchInputProps extends TextInputProps {
  viewStyle?: StyleProp<ViewStyle>;
  placeholder?: string;
}
export const SearchInput: FC<SearchInputProps> = props => {
  return (
    <SearchInputContainer style={props.viewStyle}>
      <StyledTextInput
        viewStyle={{
          width: ScreenWidth - 95,
          minWidth: ScreenWidth - 95,
          height: 43,
        }}
        placeholder={props.placeholder}
      />
      <ImageButton
        btnStyles={{
          marginLeft: 10,
          marginTop: Platform.OS === 'ios' ? 15 : 20,
        }}
        source={imagePath.searchIcon}
        onPress={() => {}}
      />
    </SearchInputContainer>
  );
};

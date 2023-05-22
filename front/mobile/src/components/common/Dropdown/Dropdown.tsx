import React, {FC, useState} from 'react';
//@ts-ignore
import styled from 'styled-components/native';

import * as ButtonTheme from '../theme';
import {Image, ScrollView, StyleProp, Text, ViewStyle} from 'react-native';
import {colors} from '../colors';
import {DimensionTheme} from '../shared';
import {imagePath} from '../../../utils/imagePath';

const DropdownContainer = styled.View``;

const DropdownCover = styled.TouchableOpacity`
  padding: 8px;
  border-radius: 10px;
  min-height: ${DimensionTheme.width(43)};
  justify-content: center;
  flex-direction: row;
  background-color: ${colors.white};
  color: ${colors.graydark};
  shadow-color: ${colors.black};
  shadow-offset: 3px 3px;
  shadow-opacity: 0.1;
  shadow-radius: 3px;
  elevation: 5;
  justify-content: space-between;
  align-items: center;
`;

const DropdownItems = styled.View`
  z-index: 9;
  height: ${DimensionTheme.height(200)};
`;

const DropdownItem = styled.TouchableOpacity``;

type Data = {
  id: any;
  name: string;
};

type DropdownProps = {
  data: Array<Data | string>;
  value: Data | null;
  onSelect: (item: any) => void;
  viewStyles?: StyleProp<ViewStyle>;
};

export const Dropdown: FC<DropdownProps> = ({
  data,
  value,
  onSelect,
  viewStyles,
}) => {
  const [showOption, setShowOption] = useState(false);
  const onSelectedItem = val => {
    setShowOption(false);
    onSelect(val);
  };
  return (
    <DropdownContainer>
      <DropdownCover
        style={viewStyles}
        activeOpacity={0.8}
        onPress={() => setShowOption(!showOption)}>
        <Text>{!!value ? value.name : '-- 선택 --'}</Text>
        <Image
          style={{transform: [{rotate: showOption ? '180deg' : '0deg'}]}}
          source={imagePath.dropdownBtn}
        />
      </DropdownCover>
      {showOption && (
        <DropdownItems>
          <ScrollView
            style={{
              maxHeight: DimensionTheme.width(130),
              zIndex: 9,
            }}>
            {data.map((val, i) => {
              return (
                <DropdownItem
                  key={String(i)}
                  onPress={() => onSelectedItem(val)}
                  style={{
                    backgroundColor:
                      value?.id == val.id ? colors.graylight : colors.white,
                    paddingVertical: 8,
                    borderRadius: 8,
                    paddingHorizontal: 6,
                  }}>
                  <Text>{val.name}</Text>
                </DropdownItem>
              );
            })}
          </ScrollView>
        </DropdownItems>
      )}
    </DropdownContainer>
  );
};

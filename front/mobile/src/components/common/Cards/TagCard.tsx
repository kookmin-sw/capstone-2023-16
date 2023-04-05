import React, {FC} from 'react';
import {StyleProp, ViewStyle} from 'react-native';
//@ts-ignore
import styled from 'styled-components/native';
import {TagColor} from '../../../constants/tag';

import * as ButtonTheme from '../../common/theme';
import SmallButton from '../Buttons/SmallButton';
import {colors} from '../colors';
import {DimensionTheme} from '../shared';
import SmallText from '../Texts/SmallText';

const TagCardContainer = styled.View`
  border-radius: 20px;
  padding: 10px;
  max-width: ${DimensionTheme.width(348)};
  max-height: ${DimensionTheme.width(127)};
`;

const TagTitleSection = styled.View``;

const TagSection = styled.View`
  margin-top: 10px;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
`;

type TagProps = {
  tagTitle: string;
  tags: any;
  viewStyles?: StyleProp<ViewStyle>;
};

export const TagCard: FC<TagProps> = props => {
  return (
    <TagCardContainer
      style={[ButtonTheme.whiteBGpurpleSD.btnStyle, props.viewStyles]}>
      <TagTitleSection>
        <SmallText
          textStyle={{
            fontSize: 14,
            fontWeight: '700',
            color: colors.black,
          }}>
          {props.tagTitle}
        </SmallText>
      </TagTitleSection>
      <TagSection>
        {props.tags.map((value: {title: string; category: string}) => {
          return (
            <SmallButton
              btnStyles={[
                ButtonTheme.whiteBGpurpleSD.btnStyle,
                {
                  height: 30,
                  minWidth: DimensionTheme.width(26),
                  paddingTop: 1,
                  paddingBottom: 2,
                  borderRadius: 8,
                  marginBottom: 15,
                  marginLeft: 10,
                  // tag 분야에 따라 다른 색으로...
                  backgroundColor: TagColor[value.category],
                },
              ]}
              textStyles={{
                color: colors.black,
                fontSize: DimensionTheme.fontSize(12),
              }}
              onPress={() => {}}>
              #{value.title}
            </SmallButton>
          );
        })}
      </TagSection>
    </TagCardContainer>
  );
};

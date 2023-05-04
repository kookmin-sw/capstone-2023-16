import React, {FC, useEffect, useState} from 'react';
//@ts-ignore
import styled from 'styled-components/native';
import {Platform} from 'react-native';

import ImageButton from '../../components/common/Buttons/ImageButton';
import KeyboardAvoidingViewContainer from '../../components/common/Containers/KeyboardAvoidingViewContainer';
import StyledTextInput from '../../components/common/Inputs/StyledTextInput';
import {Container, ScreenWidth} from '../../components/common/shared';
import RegularText from '../../components/common/Texts/RegularText';
import SmallText from '../../components/common/Texts/SmallText';
import RegularButton from '../../components/common/Buttons/RegularButton';
import {MultiSelectChip} from '../../components/common/Chips/MultiSelectChip';

import * as ButtonTheme from '../../components/common/theme';
import {colors} from '../../components/common/colors';
import {imagePath} from '../../utils/imagePath';

import {tagData} from '../../constants/tag';

import {useLazyLoadQuery} from 'react-relay';
import {graphql} from 'babel-plugin-relay/macro';
import {NavigationData} from '../../navigation/AppNavigator';

const InterestTagSettingContainer = styled(Container)`
  width: 100%;
  flex: 1;
  align-items: flex-start;
`;

const TopSection = styled.View`
  flex: 0.5;
  margin-bottom: 12px;
`;

const SearchSection = styled.View`
  flex-direction: row;
  flex: 0.6;
  justify-content: space-between;
`;

const TagSection = styled.View`
  flex: 2.5;
  justify-content: space-between;
`;

const ButtonSection = styled.View`
  flex: 1;
`;

const getAllTags = graphql`
  query InterestTagSettingScreenQuery {
    getAllTags(sortingOpt: {direction: ASC, sortBy: ID}, first: 20) {
      edges {
        node {
          body
          id
        }
      }
    }
  }
`;
type Props = NavigationData<'InterestTagSetting'>;

export const InterestTagSettingScreen: FC<Props> = ({
  navigation,
  route,
}: Props) => {
  console.log(route.params);
  const [tags, setTags] = useState([]);

  const data = useLazyLoadQuery(
    getAllTags,
    {},
    {fetchPolicy: 'store-or-network'},
  );

  useEffect(() => {
    setTags([]);
    console.log('##interesttag');
    console.log(data.getAllTags);
    data.getAllTags.edges.map(item => {
      setTags(prev => [...prev, {...item.node, flag: false}]);
    });
  }, [data]);

  return (
    <InterestTagSettingContainer>
      <KeyboardAvoidingViewContainer>
        <>
          <TopSection>
            <RegularText textStyle={{textAlign: 'left', marginBottom: 18}}>
              추천 태그 설정
            </RegularText>
            <SmallText textStyle={{color: colors.black}}>
              관심있는 태그를 선택해주세요.
            </SmallText>
            <SmallText textStyle={{color: colors.black}}>
              추천 피드를 생성할 때 도움이 됩니다!
            </SmallText>
          </TopSection>
          <SearchSection>
            <StyledTextInput
              viewStyle={{
                width: ScreenWidth - 95,
                minWidth: ScreenWidth - 95,
                height: 43,
              }}
              placeholder="태그 검색"
            />
            <ImageButton
              btnStyles={{
                marginLeft: 10,
                marginTop: Platform.OS === 'ios' ? 17 : 20,
              }}
              source={imagePath.searchIcon}
              onPress={() => {}}
            />
          </SearchSection>
          <TagSection>
            <MultiSelectChip data={tags} />
          </TagSection>
          <ButtonSection>
            <RegularButton
              btnStyles={[ButtonTheme.purpleBG.btnStyle]}
              textStyles={ButtonTheme.purpleBG.textStyle}
              onPress={() => {}}>
              다음
            </RegularButton>
          </ButtonSection>
        </>
      </KeyboardAvoidingViewContainer>
    </InterestTagSettingContainer>
  );
};

import React, {FC, useState} from 'react';
//@ts-ignore
import styled from 'styled-components/native';

import * as ButtonTheme from '../../components/common/theme';
import RegularButton from '../../components/common/Buttons/RegularButton';
import {colors} from '../../components/common/colors';
import StyledTextInput from '../../components/common/Inputs/StyledTextInput';

import {
  Container,
  DimensionTheme,
  ScreenHeight,
  ScreenWidth,
} from '../../components/common/shared';
import RegularText from '../../components/common/Texts/RegularText';
import {NavigationData} from '../../navigation/AuthNavigator';
import {imagePath} from '../../utils/imagePath';
import CheckBox from '../../components/common/CheckBox/CheckBox';
import KeyboardAvoidingViewContainer from '../../components/common/Containers/KeyboardAvoidingViewContainer';
import SmallText from '../../components/common/Texts/SmallText';

const BaseInfoContainer = styled(Container)`
  width: 100%;
  flex: 1;
  align-items: flex-start;
`;

const ProfileImageSection = styled.View`
  flex: 2;
`;

const ProfileImage = styled.Image`
  width: ${DimensionTheme.width(74)};
  height: ${DimensionTheme.height(74)};
  border: 1px solid ${colors.gray};
  border-radius: 100px;
`;
const AccountCheckSection = styled.View`
  margin-left: ${ScreenWidth * 0.6}px;
  margin-top: -150px;
  margin-bottom: 20px;
`;

const PersonaNickSection = styled.View`
  flex: 1;
`;

const ExtraInfoSection = styled.View`
  flex: 1;
`;

const GenderInfoSection = styled.View`
  flex-direction: row;
  margin-top: 20px;
  margin-left: ${DimensionTheme.width(20)};
`;

const RadioButtonSection = styled.View`
  flex-direction: row;
  margin-left: ${DimensionTheme.width(30)};
`;

const OccupationInfoSection = styled.View`
  flex-direction: row;
  align-items: center;
  margin-left: ${DimensionTheme.width(20)};
`;

const PersonaDescriptionSection = styled.View`
  flex: 3;
`;

const ButtonSection = styled.View`
  width: 100%;
  position: absolute;
  margin-top: 20px;
  top: ${ScreenHeight * 0.72}px;
  justify-contnet: flex-end;
`;

type Props = NavigationData<'BaseInfo'>;

export const BaseInfoScreen: FC<Props> = ({navigation}) => {
  const [isPrivate, setIsPrivate] = useState(false);
  // 성별
  const [isMale, setIsMale] = useState(true);
  return (
    <BaseInfoContainer>
      <KeyboardAvoidingViewContainer>
        <>
          <ProfileImageSection>
            <RegularText textStyle={{textAlign: 'left', marginBottom: 18}}>
              기본 정보 입력
            </RegularText>
            <ProfileImage source={imagePath.avatar} />
          </ProfileImageSection>
          <AccountCheckSection>
            <CheckBox
              onPress={() => setIsPrivate(!isPrivate)}
              isChecked={isPrivate}
              labelStyle={{marginRight: 30, color: colors.graydark}}
              label={'비공개 계정'}
            />
          </AccountCheckSection>
          <PersonaNickSection>
            <StyledTextInput
              label="페르소나 닉네임"
              labelStyle={{
                color: colors.black,
                marginBottom: 7,
                fontWeight: '700',
              }}
              placeholder="닉네임을 입력해주세요."
            />
          </PersonaNickSection>
          <ExtraInfoSection>
            <GenderInfoSection>
              <SmallText
                textStyle={{
                  color: colors.black,
                  marginBottom: 7,
                  fontWeight: '700',
                }}>
                성별
              </SmallText>
              <RadioButtonSection>
                <CheckBox
                  onPress={() => setIsMale(true)}
                  isChecked={isMale}
                  labelStyle={{marginRight: 30}}
                  label={'남'}
                />
                <CheckBox
                  onPress={() => setIsMale(false)}
                  isChecked={isMale ? false : true}
                  label={'여'}
                />
              </RadioButtonSection>
            </GenderInfoSection>
            <OccupationInfoSection>
              <SmallText
                textStyle={{
                  color: colors.black,
                  fontWeight: '700',
                }}>
                직업
              </SmallText>
              <StyledTextInput
                viewStyle={{
                  width: DimensionTheme.width(281),
                  marginLeft: DimensionTheme.width(12),
                }}
              />
            </OccupationInfoSection>
          </ExtraInfoSection>
          <PersonaDescriptionSection>
            <StyledTextInput
              multiline={true}
              textAlignVertical="top"
              label="페르소나 소개"
              labelStyle={{
                color: colors.black,
                marginBottom: 7,
                fontWeight: '700',
              }}
              viewStyle={{height: 120}}
              placeholder="소개말을 입력해주세요."
            />
          </PersonaDescriptionSection>
          <ButtonSection>
            <RegularButton
              btnStyles={[ButtonTheme.purpleBG.btnStyle]}
              textStyles={ButtonTheme.purpleBG.textStyle}
              onPress={() => {
                navigation.navigate('InterestTagSetting');
              }}>
              확인
            </RegularButton>
          </ButtonSection>
        </>
      </KeyboardAvoidingViewContainer>
    </BaseInfoContainer>
  );
};
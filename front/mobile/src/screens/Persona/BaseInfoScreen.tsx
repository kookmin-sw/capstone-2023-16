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
} from '../../components/common/shared';
import RegularText from '../../components/common/Texts/RegularText';
import {NavigationData} from '../../navigation/AuthNavigator';
import {imagePath} from '../../utils/imagePath';
import CheckBox from '../../components/common/CheckBox/CheckBox';
import KeyboardAvoidingViewContainer from '../../components/common/Containers/KeyboardAvoidingViewContainer';
import SmallText from '../../components/common/Texts/SmallText';
import {Dropdown} from '../../components/common/Dropdown/Dropdown';

const BaseInfoContainer = styled(Container)`
  width: 100%;
  align-items: flex-start;
  justify-content: flex-start;
`;

const ProfileImageSection = styled.View`
  margin-left: ${DimensionTheme.width(20)};
`;

const ProfileImage = styled.Image`
  width: ${DimensionTheme.width(74)};
  height: ${DimensionTheme.height(74)};
  border: 1px solid ${colors.gray};
  border-radius: 100px;
`;
const AccountCheckSection = styled.View`
  margin-left: ${DimensionTheme.width(250)}
  margin-top: -${DimensionTheme.width(20)};
`;

const PersonaNickSection = styled.View`
  width: ${DimensionTheme.width(327)};
  height: ${DimensionTheme.width(66)};
  margin-top: ${DimensionTheme.width(20)};
  margin-left: ${DimensionTheme.width(17)};
`;

const ExtraInfoSection = styled.View`
  margin-left: ${DimensionTheme.width(17)};
`;

const BirthInfoSection = styled.View`
  margin-top: ${DimensionTheme.width(20)};
  height: ${DimensionTheme.width(66)};
  width: ${DimensionTheme.width(327)};
`;

const BirthDropdownSection = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const GenderInfoSection = styled.View`
  flex-direction: row;
  margin-top: ${DimensionTheme.width(20)};
  z-index: -1;
  width: ${DimensionTheme.width(318)};
  height: ${DimensionTheme.width(43)};
  align-items: center;
`;

const RadioButtonSection = styled.View`
  flex-direction: row;
  margin-left: ${DimensionTheme.width(30)};
`;

const OccupationInfoSection = styled.View`
  flex-direction: row;
  margin-top: ${DimensionTheme.width(15)};
  width: ${DimensionTheme.width(318)};
  height: ${DimensionTheme.width(43)};
`;

const PersonaDescriptionSection = styled.View`
  z-index: -1;
  margin-top: ${DimensionTheme.width(30)};
  width: ${DimensionTheme.width(327)};
  height: ${DimensionTheme.width(140)};
  margin-left: ${DimensionTheme.width(17)};
`;

const ButtonSection = styled.View`
  width: 100%;
  position: absolute;
  margin-top: 20px;
  top: ${ScreenHeight * 0.72}px;
  justify-contnet: flex-end;
`;

let fruits = [
  {
    id: 1,
    name: 'Mango',
  },
  {
    id: 2,
    name: 'Banana',
  },
  {
    id: 3,
    name: 'Apple',
  },
];

type Props = NavigationData<'BaseInfo'>;

export const BaseInfoScreen: FC<Props> = ({navigation}) => {
  const [isPrivate, setIsPrivate] = useState(false);

  // 생년월일
  const [birth, setBirth] = useState({year: null, month: null, day: null});
  const now = new Date();
  var year = now.getFullYear();

  let years = [];
  //년도 selectbox만들기
  for (var i = 1970; i <= year; i++) {
    years.push({id: i.toString(), name: i.toString()});
  }
  let months = [];
  // 월별 selectbox 만들기
  for (var i = 1; i <= 12; i++) {
    var mm = i > 9 ? i : '0' + i;
    months.push({id: mm.toString(), name: mm.toString()});
  }

  let days = [];
  // 일별 selectbox 만들기
  for (var i = 1; i <= 31; i++) {
    var dd = i > 9 ? i : '0' + i;
    days.push({id: dd.toString(), name: dd.toString()});
  }

  const onSelectBirthY = item => {
    setBirth({
      ...birth,
      year: item,
    });
  };

  const onSelectBirthM = item => {
    setBirth({
      ...birth,
      month: item,
    });
  };

  const onSelectBirthD = item => {
    setBirth({
      ...birth,
      day: item,
    });
  };

  // 성별
  const [isMale, setIsMale] = useState(true);

  // 직업
  const [selectedItem, setSelectedItem] = useState(null);
  const onSelect = item => {
    setSelectedItem(item);
  };
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
            <BirthInfoSection>
              <SmallText
                textStyle={{
                  color: colors.black,
                  marginBottom: 7,
                  fontWeight: '700',
                }}>
                생년월일
              </SmallText>
              <BirthDropdownSection>
                <Dropdown
                  data={years}
                  onSelect={onSelectBirthY}
                  value={birth.year}
                  viewStyles={{width: DimensionTheme.width(131)}}
                />
                <Dropdown
                  data={months}
                  onSelect={onSelectBirthM}
                  value={birth.month}
                  viewStyles={{width: DimensionTheme.width(92)}}
                />
                <Dropdown
                  data={days}
                  onSelect={onSelectBirthD}
                  value={birth.day}
                  viewStyles={{width: DimensionTheme.width(92)}}
                />
              </BirthDropdownSection>
            </BirthInfoSection>
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
                  marginTop: DimensionTheme.width(15),
                  marginRight: DimensionTheme.width(25),
                }}>
                직업
              </SmallText>
              {/* <StyledTextInput
                viewStyle={{
                  width: DimensionTheme.width(281),
                  marginLeft: DimensionTheme.width(12),
                }}
              /> */}
              <Dropdown
                data={fruits}
                onSelect={onSelect}
                value={selectedItem}
                viewStyles={{width: DimensionTheme.width(278)}}
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

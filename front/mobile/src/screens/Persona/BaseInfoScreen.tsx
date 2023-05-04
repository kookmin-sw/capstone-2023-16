import React, {FC, useState} from 'react';
//@ts-ignore
import styled from 'styled-components/native';

import * as Yup from 'yup';
import {Formik} from 'formik';

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
  height: ${DimensionTheme.width(43)};x
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

const occupations = [
  {
    id: 'STUDENT',
    name: '학생',
  },
  {
    id: 'EDUCATOR',
    name: '교육자',
  },
  {
    id: 'JOB_SEEKR',
    name: '취준생',
  },
  {
    id: 'EMPLOYEE',
    name: '직장인',
  },
  {
    id: 'IT',
    name: 'IT',
  },
  {
    id: 'FINANCE',
    name: '금융',
  },
  {
    id: 'ART',
    name: '예술',
  },
  {
    id: 'ETC',
    name: '기타',
  },
];

type Props = NavigationData<'BaseInfo'>;

export const BaseInfoScreen: FC<Props> = ({navigation}) => {
  const [isPublic, setIsPublic] = useState(false);

  const PersonaSchema = Yup.object().shape({
    nickname: Yup.string().required('닉네임은 필수입니다.'),
    birth: Yup.number()
      .min(1960, '올바른 출생년도를 입력해주세요.')
      .max(2030, '올바른 출생년도를 입력해주세요.')
      .typeError('숫자만 입력가능합니다.'),
    description: Yup.string(),
  });

  // 성별
  const [isMale, setIsMale] = useState(true);

  // 직업
  const [selectedItem, setSelectedItem] = useState(null);
  const onSelect = item => {
    console.log('11', item);
    setSelectedItem(item);
  };
  return (
    <BaseInfoContainer>
      <KeyboardAvoidingViewContainer>
        <Formik
          initialValues={{
            nickname: '',
            birth: '',
            description: '',
          }}
          validationSchema={PersonaSchema}
          onSubmit={({nickname, birth, description}) => {
            console.log(nickname, birth, description);
            navigation.navigate('InterestTagSetting', {
              nickname: nickname,
              age: birth,
              gender: isMale ? 'MALE' : 'FEMALE',
              introduction: description,
              isPublic: isPublic,
              job: selectedItem.id,
            });
          }}>
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <>
              <ProfileImageSection>
                <RegularText textStyle={{textAlign: 'left', marginBottom: 18}}>
                  기본 정보 입력
                </RegularText>
                <ProfileImage source={imagePath.avatar} />
              </ProfileImageSection>
              <AccountCheckSection>
                <CheckBox
                  onPress={() => setIsPublic(!isPublic)}
                  isChecked={isPublic}
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
                  value={values.nickname}
                  onChangeText={handleChange('nickname')}
                  onBlur={handleBlur('nickname')}
                  error={errors.nickname}
                  touched={touched.nickname}
                />
              </PersonaNickSection>
              <ExtraInfoSection>
                <BirthInfoSection>
                  <StyledTextInput
                    keyboardType="numeric"
                    label="출생년도"
                    labelStyle={{
                      color: colors.black,
                      marginBottom: 7,
                      fontWeight: '700',
                    }}
                    labelExtra="나와 비슷한 나이대 관심사를 추천 받을 수 있어요!"
                    placeholder="출생년도를 입력해주세요. 예)2000"
                    value={values.birth}
                    onChangeText={handleChange('birth')}
                    onBlur={handleBlur('birth')}
                    error={errors.birth}
                    touched={touched.birth}
                  />
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
                    data={occupations}
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
                  viewStyle={{height: 120, zIndex: -1}}
                  placeholder="소개말을 입력해주세요."
                  value={values.description}
                  onChangeText={handleChange('description')}
                  onBlur={handleBlur('description')}
                  error={errors.description}
                  touched={touched.description}
                />
              </PersonaDescriptionSection>
              <ButtonSection>
                <RegularButton
                  btnStyles={[ButtonTheme.purpleBG.btnStyle]}
                  textStyles={ButtonTheme.purpleBG.textStyle}
                  onPress={() => {
                    handleSubmit();
                  }}>
                  확인
                </RegularButton>
              </ButtonSection>
            </>
          )}
        </Formik>
      </KeyboardAvoidingViewContainer>
    </BaseInfoContainer>
  );
};

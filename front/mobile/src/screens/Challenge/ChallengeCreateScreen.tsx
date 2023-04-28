import React, {FC, useState} from 'react';
//@ts-ignore
import styled from 'styled-components/native';

import {Formik} from 'formik';
import * as Yup from 'yup';

import CheckBox from '../../components/common/CheckBox/CheckBox';
import * as ButtonTheme from '../../components/common/theme';
import {colors} from '../../components/common/colors';
import {Header} from '../../components/common/Header/Header';
import StyledTextInput from '../../components/common/Inputs/StyledTextInput';
import {
  Container,
  DimensionTheme,
  ScreenHeight,
} from '../../components/common/shared';
import SmallText from '../../components/common/Texts/SmallText';
import {NavigationData} from '../../navigation/AppNavigator';
import RegularButton from '../../components/common/Buttons/RegularButton';

const ChallengeCreateContainer = styled(Container)`
  ailgn-items: flex-start;
  justify-content: flex-start;
`;

const HeaderSection = styled.View`
  margin-left: ${DimensionTheme.width(10)};
`;

const BodySection = styled.View`
  margin-left: ${DimensionTheme.width(33)};
  margin-right: ${DimensionTheme.width(33)};
  margin-top: ${DimensionTheme.width(45)};
`;

const OptionSection = styled.View`
  flex-direction: row;
  margin-top: ${DimensionTheme.width(20)};
`;

const StatusSection = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: ${DimensionTheme.width(23)};
`;

const BottomSection = styled.View`
  width: 100%;
  flex: 1;
  position: absolute;
  margin-top: 20px;
  top: ${ScreenHeight * 0.71}px;
  justify-contnet: flex-end;
`;

type Props = NavigationData<'ChallengeCreate'>;

export const ChallengeCreateScreen: FC<Props> = ({navigation}) => {
  const [isPrivate, setIsPrivate] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const CreateSchema = Yup.object().shape({
    title: Yup.string().required('챌린지 이름은 필수입니다.'),
    detail: Yup.string(),
    recruit: Yup.number()
      .min(1, '최소 인원은 1명입니다.')
      .max(100, '최대 인원은 100명입니다.')
      .typeError('숫자만 입력가능합니다.')
      .required('챌린지 모집 인원은 필수입니다.'),
  });

  return (
    <ChallengeCreateContainer>
      <HeaderSection>
        <Header
          navigation={navigation}
          title={'CHALLENGE CREATE'}
          titleStyle={{
            marginLeft: DimensionTheme.width(72),
            marginRight: DimensionTheme.width(72),
          }}
        />
      </HeaderSection>
      <BodySection>
        <Formik
          initialValues={{title: '', detail: '', recruit: 0}}
          validationSchema={CreateSchema}
          onSubmit={({title, detail, recruit}) => {
            console.log(title, detail, recruit);
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
              <StyledTextInput
                labelStyle={{
                  color: colors.black,
                  marginBottom: 7,
                  fontWeight: '700',
                }}
                label="챌린지 이름"
                placeholder="챌린지 이름을 입력해주세요."
                value={values.title}
                error={errors.title}
                errorStyle={{fontSize: DimensionTheme.fontSize(12)}}
                touched={touched.title}
                onChangeText={handleChange('title')}
                onBlur={handleBlur('title')}
              />
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
                value={values.detail}
                error={errors.detail}
                touched={touched.detail}
                onChangeText={handleChange('detail')}
                onBlur={handleBlur('detail')}
              />
              <OptionSection>
                <SmallText
                  textStyle={{
                    color: colors.black,
                    marginBottom: 7,
                    fontWeight: '700',
                    marginTop: DimensionTheme.width(25),
                  }}>
                  인원
                </SmallText>
                <StyledTextInput
                  keyboardType="numeric"
                  placeholder="최대 100명"
                  viewStyle={{
                    width: DimensionTheme.width(105),
                    marginLeft: DimensionTheme.width(15),
                  }}
                  value={values.recruit}
                  error={errors.recruit}
                  errorStyle={{fontSize: DimensionTheme.fontSize(10.5)}}
                  touched={touched.recruit}
                  onChangeText={handleChange('recruit')}
                  onBlur={handleBlur('recruit')}
                />
                <CheckBox
                  viewStyle={{
                    marginLeft: DimensionTheme.width(53),
                    marginTop: DimensionTheme.width(15),
                  }}
                  onPress={() => setIsPrivate(!isPrivate)}
                  isChecked={isPrivate}
                  labelStyle={{
                    marginLeft: DimensionTheme.width(12),
                    marginRight: 30,

                    color: colors.black,
                    fontWeight: '700',
                  }}
                  label={'비공개 설정'}
                />
              </OptionSection>
              <StatusSection>
                <SmallText
                  textStyle={{
                    color: colors.black,
                    marginBottom: 7,
                    marginRight: DimensionTheme.width(33),
                    fontWeight: '700',
                  }}>
                  모집 설정
                </SmallText>
                <CheckBox
                  onPress={() => setIsOpen(true)}
                  isChecked={isOpen}
                  labelStyle={{
                    marginRight: 30,
                    color: colors.black,
                    fontWeight: '700',
                  }}
                  label={'모집'}
                />
                <CheckBox
                  onPress={() => setIsOpen(false)}
                  isChecked={isOpen ? false : true}
                  label={'모집 마감'}
                  labelStyle={{
                    color: colors.black,
                    fontWeight: '700',
                  }}
                />
              </StatusSection>
              <BottomSection>
                <RegularButton
                  btnStyles={ButtonTheme.whiteBG.btnStyle}
                  onPress={() => {
                    handleSubmit();
                  }}>
                  생성
                </RegularButton>
              </BottomSection>
            </>
          )}
        </Formik>
      </BodySection>
    </ChallengeCreateContainer>
  );
};

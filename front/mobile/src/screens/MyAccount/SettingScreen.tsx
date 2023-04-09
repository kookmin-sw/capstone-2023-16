import React, {FC} from 'react';
import {StyleProp, TextStyle} from 'react-native';
//@ts-ignore
import styled from 'styled-components/native';
import TextButton from '../../components/common/Buttons/TextButton';
import {colors} from '../../components/common/colors';

import {Container, DimensionTheme} from '../../components/common/shared';
import RegularText from '../../components/common/Texts/RegularText';
import * as ButtonTheme from '../../components/common/theme';
import {NavigationData} from '../../navigation/AuthNavigator';

import {graphql} from 'babel-plugin-relay/macro';
import {useMutation} from 'react-relay';

import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {logout, selectAuth} from '../../redux/slices/userSlice';

const SettingContainer = styled(Container)`
  justify-content: flex-start;
  align-items: flex-start;
  margin-left: ${DimensionTheme.width(22)};
  margin-right: ${DimensionTheme.width(22)};
`;

const AccountSection = styled.View`
  width: ${DimensionTheme.width(348)};
  height: ${DimensionTheme.width(370)};
  border-radius: 20px;
  align-items: flex-start;
  padding: 20px;
  justify-content: center;
  margin-top: ${DimensionTheme.width(5)};
  margin-bottom: ${DimensionTheme.width(29)};
`;

const HorizontalLine = styled.View`
  height: 1px;
  width: ${DimensionTheme.width(310)}
  background-color: ${colors.borderGray};
  margin-top: ${DimensionTheme.width(13)};
  margin-bottom: ${DimensionTheme.width(13)};
`;

const ServiceSection = styled.View`
  heigth: ${DimensionTheme.width(226)};
  width: ${DimensionTheme.width(348)};
  border-radius: 20px;
  align-items: flex-start;
  padding: 20px;
  margin-top: ${DimensionTheme.width(5)};
  justify-content: center;
`;

const textStyle: StyleProp<TextStyle> = {
  color: colors.black,
  fontWeight: '500',
  fontSize: DimensionTheme.fontSize(16),
};

const logoutMutation = graphql`
  mutation SettingScreenMutation {
    logout
  }
`;

type Props = NavigationData<'Setting'>;
export const SettingScreen: FC<Props> = ({navigation}) => {
  const [commit, isInFlight] = useMutation(logoutMutation);

  const dispatch = useAppDispatch();
  const user = useAppSelector(selectAuth);

  return (
    <SettingContainer>
      {/* ACCOUNT SECTION */}
      <RegularText textStyle={{textAlign: 'left', marginTop: 10}}>
        ACCOUNT
      </RegularText>
      <AccountSection style={[ButtonTheme.whiteBGpurpleSD.btnStyle]}>
        <TextButton textStyles={textStyle} onPress={() => {}}>
          페르소나 수정
        </TextButton>
        <HorizontalLine />
        <TextButton textStyles={textStyle} onPress={() => {}}>
          페르소나 삭제
        </TextButton>
        <HorizontalLine />
        <TextButton textStyles={textStyle} onPress={() => {}}>
          공식 인증 페르소나 요청
        </TextButton>
        <HorizontalLine />
        <TextButton textStyles={textStyle} onPress={() => {}}>
          본계정 보기
        </TextButton>
        <HorizontalLine />
        <TextButton textStyles={textStyle} onPress={() => {}}>
          본계정 수정
        </TextButton>
        <HorizontalLine />
        <TextButton
          textStyles={textStyle}
          onPress={() => {
            commit({
              variables: {},
              onCompleted(data) {
                console.log('logout!!');
                console.log(data);
                dispatch(logout());
                console.log(`isUPdate ? ${user}`);
              },
              onError(error) {
                console.log('@logout error:');
                console.log(error);
                console.log(error.message);
              },
              // updater(store) {
              //   const payload = store.getRootField('login');
              //   store.getRoot().setLinkedRecord(payload, 'currentUser');
              // },
            });
          }}>
          본계정 로그아웃
        </TextButton>
        <HorizontalLine />
        <TextButton textStyles={textStyle} onPress={() => {}}>
          본계정 탈퇴
        </TextButton>
      </AccountSection>
      {/* SERVICE SECTION */}
      <RegularText textStyle={{textAlign: 'left'}}>SERVICE</RegularText>
      <ServiceSection style={[ButtonTheme.whiteBGpurpleSD.btnStyle]}>
        <TextButton textStyles={textStyle} onPress={() => {}}>
          공지사항
        </TextButton>
        <HorizontalLine />
        <TextButton textStyles={textStyle} onPress={() => {}}>
          1:1 문의하기
        </TextButton>
        <HorizontalLine />
        <TextButton textStyles={textStyle} onPress={() => {}}>
          이메일 문의하기
        </TextButton>
        <HorizontalLine />
        <TextButton textStyles={textStyle} onPress={() => {}}>
          광고 문의하기
        </TextButton>
      </ServiceSection>
    </SettingContainer>
  );
};

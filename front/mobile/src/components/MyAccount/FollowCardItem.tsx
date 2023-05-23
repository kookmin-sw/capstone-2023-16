import React, {FC, useState} from 'react';
//@ts-ignore
import styled from 'styled-components/native';

import {useNavigation, useRoute} from '@react-navigation/native';

import {DimensionTheme} from '../common/shared';
import * as ButtonTheme from '../common/theme';
import {colors} from '../common/colors';
import {CardProps} from './types';
import SmallText from '../common/Texts/SmallText';
import SmallButton from '../common/Buttons/SmallButton';
import {TouchableOpacity, Image, Alert} from 'react-native';
import {imagePath} from '../../utils/imagePath';
import {BottomSheet} from '../common/BottomSheet/BottomSheet';
import {BottomSheetContent} from '../common/BottomSheet/BottomSheetContent';
import {BottomSheetPersona} from '../common/BottomSheet/BottomSheetPersona';
import {useDispatch} from 'react-redux';
import {setPersona} from '../../redux/slices/userSlice';

const CardContainer = styled.TouchableOpacity`
  height: ${DimensionTheme.height(83)};
  width: ${DimensionTheme.width(330)};
  flex-direction: row;
  align-items: center;
  // justify-content: center;
  border-radius: 18px;
  margin-bottom: 15px;
  padding: 17px;
`;

const ProfileImage = styled.Image`
  width: ${DimensionTheme.width(43)};
  height: ${DimensionTheme.height(43)};
  border: 1px solid ${colors.gray};
  border-radius: 18px;
`;

const ProfileInfo = styled.View`
  margin-left: 10px;
`;

const RightSection = styled.View`
  flex-direction: row;
  align-items: center;
  position: absolute;
  right: ${DimensionTheme.width(30)};
`;

const CardItem: FC<CardProps> = props => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);

  const pressButton = () => {
    setModalVisible(true);
  };

  const bottomSheetType: {[key: string]: JSX.Element} = {
    Persona: <BottomSheetPersona />,
    Follow: <BottomSheetContent />,
  };

  const PersonaChange = () => {
    Alert.alert('페르소나 변경', `${props.nickname}으로 변경하시겠습니까?`, [
      {
        text: 'Yes',
        onPress: () => {
          dispatch(setPersona({id: props.id, nickname: props.nickname}));
          navigation.navigate('MyPage', {
            isMine: true,
            nickname: props.nickname,
            id: props.id,
          });
        },
      },
      {text: 'No', onPress: () => console.log('keep')},
    ]);
  };

  const PersonaPage = () => {
    navigation.navigate('MyPage', {
      isMine: false,
      nickname: props.nickname,
      id: props.id,
    });
  };

  const functinoHandler = {
    Persona: PersonaChange,
    Follow: PersonaPage,
  };
  return (
    <CardContainer
      style={[ButtonTheme.whiteBGpurpleSD.btnStyle]}
      onPress={() => functinoHandler[route.name]()}>
      <ProfileImage source={imagePath.avatar} />
      <ProfileInfo>
        <SmallText
          textStyle={{
            color: colors.black,
            fontSize: DimensionTheme.fontSize(15),
          }}>
          {props.nickname}
        </SmallText>
      </ProfileInfo>
      <RightSection>
        {/* {route.name !== 'Persona' ? (
          <SmallButton
            btnStyles={[
              ButtonTheme.whiteBGpurpleSD.btnStyle,
              {
                width: DimensionTheme.width(53),
                height: DimensionTheme.height(30),
                // marginLeft: DimensionTheme.width(105),
                backgroundColor: false ? colors.white : colors.purplelight,
                borderRadius: 8,
              },
            ]}
            textStyles={{
              fontSize: DimensionTheme.fontSize(12),
              color: colors.black,
            }}
            onPress={() => {}}>
            {false ? '팔로잉' : '팔로우'}
          </SmallButton>
        ) : null} */}
        <TouchableOpacity
          style={{marginLeft: DimensionTheme.width(12)}}
          onPress={pressButton}>
          <Image source={imagePath.moreIcon} />
        </TouchableOpacity>
      </RightSection>

      <BottomSheet
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}>
        {bottomSheetType[route.name]}
      </BottomSheet>
    </CardContainer>
  );
};

export default CardItem;

import React, {FC} from 'react';
//@ts-ignore
import styled from 'styled-components/native';
import {Modal as DefaultModal} from 'react-native';
import {colors} from '../colors';
import {DimensionTheme} from '../shared';

type ModalProps = {
  children: React.ReactNode;
  show: boolean;
};

const ModalBackground = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.View`
  width: ${DimensionTheme.width(328)};
  height: ${DimensionTheme.height(590)};
  background-color: ${colors.white};
  padding-horizontal: 20px;
  padding-vertical: 30px;
  border-radius: 20px;
  elevation: 20;
`;

const ContentView = styled.View`
  justfiy-content: center;
  align-items: center;
`;

const Modal: FC<ModalProps> = ({show, children}) => {
  return (
    <DefaultModal
      style={{
        marginTop: 100,
        width: '80%',
        backgroundColor: colors.white,
      }}
      visible={show}
      transparent={true}
      animationType={'slide'}>
      <ModalBackground>
        <ModalContainer>
          <ContentView>{children}</ContentView>
        </ModalContainer>
      </ModalBackground>
    </DefaultModal>
  );
};

export default Modal;

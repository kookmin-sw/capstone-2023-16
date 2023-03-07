import React, { FC, useState } from "react";
import styled from "styled-components/native";
import { View, Modal as DefaultModal, Button } from "react-native";
import { colors } from "../colors";

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
  width: 80%;
  height: 80%;
  background-color: ${colors.white};
  padding-horizontal: 20;
  padding-vertical: 30;
  border-radius: 20;
  elevation: 20;
`;

const ContentView = styled.View`
  justfiy-content: center;
  align-items: center;
`;

const Modal: FC<ModalProps> = ({ show, children }) => {
  return (
    <DefaultModal
      style={{
        marginTop: 100,
        width: "80%",
        backgroundColor: colors.white,
      }}
      visible={show}
      transparent={true}
      animationType={"slide"}
    >
      <ModalBackground>
        <ModalContainer>
          <ContentView>{children}</ContentView>
        </ModalContainer>
      </ModalBackground>
    </DefaultModal>
  );
};

export default Modal;

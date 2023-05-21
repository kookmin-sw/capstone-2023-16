import React, { ReactNode } from 'react';
import styled from 'styled-components';
import useDeviceType from '../../hooks/useDeviceType';

type ModalProps = {
  modal: boolean,
  setModal: (modal: boolean) => void,
  children: ReactNode
};

const Modal = ({ modal, setModal, children }: ModalProps) => {
  const deviceType = useDeviceType();
 
  return <>
      <ModalBackground modal={modal} onClick={(e:any)=>e.stopPropagation()}>
      {modal && <ModalContent deviceType={deviceType} onClick={()=>setModal(false)}>
        {children}
      </ModalContent>}
    </ModalBackground>
  </>
};

export default Modal;

const ModalBackground = styled.div<{modal: boolean}>`
  width: 100%;
  height: 100%;
  display: ${props => props.modal ? 'block' : 'hidden'};
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(0,0,0,0.2) !important;
`;

const ModalContent = styled.div<{deviceType: string}>`
  width: ${props=>props.deviceType==='desktop'?'50%': '70%'};
  height: auto;
  position: absolute;
  left: 50%;
  top: 50%;
  background-color: #fefefe;
  border-radius: 10px;
  transform: translate(-50%, -50%);
  transition: all 0.4s ease-in-out;  
  z-index: 99;
  &:hover{
    cursor: pointer;
  }
`
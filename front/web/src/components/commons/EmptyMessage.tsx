import React from 'react';
import styled from 'styled-components';
import useDeviceType from '../../hooks/useDeviceType';

type EmptyMessageProps = {
  type: string,
}
const EmptyMessage = ({ type }: EmptyMessageProps) => {
  const deviceType = useDeviceType();
  return <Container deviceType={deviceType}>
    {type === 'persona' ? <span>등록된 페르소나가 없습니다.</span>
      : <span>작성한 게시글이 없습니다.</span>
    }
  </Container>
};

export default EmptyMessage;

const Container = styled.div<{deviceType:string}>`
  width: 100%;
  height: 100%;
  display: flex;
  color: #bbbbbb;
  font-size: ${props => props.deviceType === 'mobile' ? '16px' : '30px'};
  justify-content: center;
  align-items: center;
  `
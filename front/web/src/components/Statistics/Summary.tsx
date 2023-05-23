import React from 'react';
import styled from 'styled-components';
import useDeviceType from '../../hooks/useDeviceType';

const Summary = () => {
  const deviceType = useDeviceType();

  return <Container deviceType={deviceType}>
    <p>
      <Hightlight>여성</Hightlight>분들<br />
      <Hightlight>문화, 사회, IT</Hightlight>의 카테고리와<br />
      <Hightlight>#꿀팁, #공부, #인증</Hightlight> 의 태그에 관심을 가지시는 분들, <br />
      <Hightlight>교육자, 학생, 예술업계</Hightlight> 의 직업을 가지신 분들이 <br />
      작가님의 글을 주로 찾습니다.
    </p>
  </Container>
};

export default Summary;

const Container = styled.div<{deviceType:string}>`
  display: flex;
  margin-bottom: 30px;
  align-items: center;
  justify-content: center;
  & p {
    font-size:${props=>props.deviceType==='mobile'? '12px': '20px'};
    line-height: 200%;
  }
`;

const Hightlight = styled.span`
  font-weight: bold;
  font-size: 120%;
`
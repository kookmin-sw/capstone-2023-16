import React from 'react';
import styled from 'styled-components';
import useDeviceType from '../../hooks/useDeviceType';

type RadioButtonFieldType = {
  fieldname: string,    // api 요청할 fieldname
  label: string,        // 실제로 보여질 label
  elements: object,     // {api 요청할 속성: 사용자에게 보여질 속성 이름, ...}
}

const RadioButtonField = ({fieldname, label, elements}: RadioButtonFieldType) => {
  const deviceType = useDeviceType();

  return <Container>
    <FieldLabel deviceType={deviceType}>{label}</FieldLabel>
    <RadioButtonContainer deviceType={deviceType}>
      {Object.entries(elements)
        .map(e =>
        <div>
          <input id={e[0]} type='radio' name={fieldname} />
          <label htmlFor={e[0]}>{e[1]}</label>
        </div>)
      }
    </RadioButtonContainer>
  </Container>
};

export default RadioButtonField;

const Container = styled.div`
  display: flex;
  margin: 15px 0;
  align-items: center;
  
`;

const FieldLabel = styled.label<{ deviceType: string }>`
  min-width: 60px;
  margin-bottom: 10px;
  font-size: ${props => props.deviceType === 'mobile' ? '16px' : '20px'};
  font-weight: bold;
`;

const RadioButtonContainer = styled.div<{ deviceType: string }>`
  width: ${props=>props.deviceType === 'mobile'? '318px': '464px'};
  height: ${props => props.deviceType === 'mobile' ? '50px' : '66px'};
  display: flex;
  background-color: #fff;
  border: 0;
  border-radius: 10px;
  box-shadow: 0px 0.2778vw 2.0833vw 0px rgba(0, 0, 0, 0.12);
  font-size: ${props => props.deviceType === 'mobile' ? '14px' : '20px'};

  // input 중 Radio Button 개별 속성
  justify-content: space-around;
  align-items: center;

  &:focus {
    outline: 0;
    box-shadow: 0px 0.2778vw 2.0833vw 0px rgba(211, 140, 255, 0.5);
  }
  
`
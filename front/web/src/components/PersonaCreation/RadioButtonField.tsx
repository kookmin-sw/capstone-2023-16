import React from 'react';
import styled from 'styled-components';
import useDeviceType from '../../hooks/useDeviceType';

type RadioButtonFieldType = {
  fieldname: string,    // api 요청할 fieldname
  label: string,        // 실제로 보여질 label
  elements: object,     // {api 요청할 속성: 사용자에게 보여질 속성 이름, ...}
  onSave: (e:any) => void
}

const RadioButtonField = ({fieldname, label, elements, onSave}: RadioButtonFieldType) => {
  const deviceType = useDeviceType();

  return <Container>
    <label className='field__label'>{label}</label>
    <RadioButtonContainer deviceType={deviceType} className='field__container'>
      {Object.entries(elements)
        .map(e =>
        <div key={e[0]}>
            <input id={e[0]} type='radio' name={fieldname} onBlur={onSave} />
          <label htmlFor={e[0]}>{e[1]}</label>
        </div>)
      }
    </RadioButtonContainer>
  </Container>
};

export default RadioButtonField;

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const RadioButtonContainer = styled.div<{ deviceType: string }>`
  display: flex;
  // input 중 Radio Button 개별 속성
  justify-content: space-around;
  align-items: center;  
`
import React from 'react';
import styled from 'styled-components';
import useDeviceType from '../../hooks/useDeviceType';

const MODEL_LABEL = ["TOTAL", "MEMBERSHIP", "DONATION", "WAITTERM"];

type ModelLabelProps = {
  label: string,
  setModel: (model: string) => void,
};

type ModelGroupProps = {
  setModel: (model: string) => void,
}

const ModelLabel = ({ label, setModel }: ModelLabelProps) => {
  return <ModelLabelContainer htmlFor={label}>
    <input id={label} type='radio' name='revenue_model' value={label} onChange={() => setModel(label)} defaultChecked={label==='TOTAL'} />
    <ModelLabelSpan>{label}</ModelLabelSpan>
  </ModelLabelContainer>
}

const ModelGroup = ({setModel}:ModelGroupProps) => {
  const deviceType = useDeviceType();

  return <ModelGroupContainer deviceType={deviceType}>
    {MODEL_LABEL.map(l => <ModelLabel key={l} label={l} setModel={setModel} />)}
  </ModelGroupContainer>
};

export default ModelGroup;

const ModelGroupContainer = styled.div<{deviceType:string}>`
  width: 100%;
  height: auto;
  display: flex;
  margin: ${props=>props.deviceType === 'mobile'? '10px': '30px'} 0;
  justify-content: space-around;
  gap: 10px; 
  `;

const ModelLabelContainer = styled.label` 
  & input {
    display: none;
  }
  & input:checked + span{
    border-width: 5px;
    border-color: #B948FF;
    transition: all 0.25s;
    box-shadow: 0px 0.4vw 0 0px rgba(0, 0, 0, 0.12);
  }
`

const ModelLabelSpan = styled.span`
  width: 100%;
  display: block;
  padding: 10px;
  border-bottom: 2px solid #717171;
  font-size: 32px;
  font-weight: bold;
  cursor: pointer;
`
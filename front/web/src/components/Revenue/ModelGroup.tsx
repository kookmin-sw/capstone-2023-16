import React from 'react';
import styled from 'styled-components';

const MODEL_LABEL = ["TOTAL", "MEMBERSHIP", "DONATION", "WAITTERM"];

type ModelLabelProps = {
  label: string
};

const ModelLabel = ({label}: ModelLabelProps) => {
  return <ModelLabelContainer htmlFor={label}>
    <input id={label} type='radio' name='revenue_model'/>
    <ModelLabelSpan>{label}</ModelLabelSpan>
  </ModelLabelContainer>
}

const ModelGroup = () => {
  return <ModelGroupContainer >
    {MODEL_LABEL.map(l => <ModelLabel key={l} label={l} />)}
  </ModelGroupContainer>
};

export default ModelGroup;

const ModelGroupContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
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
  margin: 5px;
  border-bottom: 2px solid #717171;
  font-size: 32px;
  font-weight: bold;
  cursor: pointer;
`